import JSZip from 'jszip';
import { RecoveryProgress } from '../types';
import { COMMON_PASSWORDS } from '../data/commonPasswords';

interface EncryptionInfo {
  spinCount: number;
  saltValue: string;
  hashValue: string;
  algorithmName: string;
}

type RecoveryMethod = 'dictionary' | 'bruteforce' | 'hybrid';

export class PasswordRecoveryService {

  private worker: Worker | null = null;

  async recoverPassword(
    file: File,
    onProgress: (progress: RecoveryProgress) => void,
    method: RecoveryMethod = 'hybrid'
  ): Promise<string | null> {
    const encryptionInfo = await this.extractEncryptionInfo(file);

    if (!encryptionInfo) {
      throw new Error('errors.notEncrypted');
    }

    // Generate password list based on method
    const passwords = this.generatePasswordList(method);

    return new Promise((resolve, reject) => {
      try {
        // Create worker from inline script to avoid bundling issues
        const workerCode = this.getWorkerCode();
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        this.worker = new Worker(workerUrl);

        this.worker.onmessage = (event: MessageEvent) => {
          const { type, payload } = event.data;

          switch (type) {
            case 'progress':
              onProgress(payload);
              break;
            case 'found':
              this.cleanup(workerUrl);
              resolve(payload.password);
              break;
            case 'notFound':
              this.cleanup(workerUrl);
              resolve(null);
              break;
            case 'error':
              this.cleanup(workerUrl);
              reject(new Error(payload.error));
              break;
          }
        };

        this.worker.onerror = (error) => {
          this.cleanup(workerUrl);
          reject(error);
        };

        // Start the worker
        this.worker.postMessage({
          type: 'start',
          payload: { passwords, encryptionInfo },
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private generatePasswordList(method: RecoveryMethod): string[] {
    const passwords: string[] = [];

    if (method === 'dictionary' || method === 'hybrid') {
      // Use the 10k most common passwords list
      passwords.push(...COMMON_PASSWORDS);
    }

    if (method === 'bruteforce' || method === 'hybrid') {
      // Add numeric passwords (000000 - 999999)
      for (let i = 0; i < 1000000; i++) {
        passwords.push(i.toString().padStart(6, '0'));
      }
    }

    return passwords;
  }

  private async extractEncryptionInfo(file: File): Promise<EncryptionInfo | null> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Check for EncryptionInfo file (Office 2007+ encryption)
      const encryptionInfoFile = zip.file('EncryptionInfo');
      if (!encryptionInfoFile) {
        return null; // Not encrypted
      }

      const encryptionInfoContent = await encryptionInfoFile.async('string');

      // Parse XML to extract encryption parameters
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(encryptionInfoContent, 'text/xml');

      const keyData = xmlDoc.querySelector('keyData');
      if (!keyData) return null;

      const spinCount = parseInt(keyData.getAttribute('spinCount') || '100000', 10);
      const saltValue = keyData.getAttribute('saltValue') || '';
      const hashValue = keyData.getAttribute('hashValue') || '';
      const algorithmName = keyData.getAttribute('hashAlgorithm') || 'SHA512';

      return {
        spinCount,
        saltValue,
        hashValue,
        algorithmName,
      };
    } catch (error) {
      console.error('Error extracting encryption info:', error);
      return null;
    }
  }

  abort(): void {
    if (this.worker) {
      this.worker.postMessage({ type: 'cancel' });
    }
  }

  private cleanup(workerUrl: string): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    URL.revokeObjectURL(workerUrl);
  }

  private getWorkerCode(): string {
    // Inline worker code to avoid bundling issues
    return `
      importScripts('https://cdn.jsdelivr.net/npm/hash-wasm@4.11.0/dist/pbkdf2.umd.min.js');

      let shouldCancel = false;

      self.onmessage = async (event) => {
        const { type, payload } = event.data;

        if (type === 'cancel') {
          shouldCancel = true;
          return;
        }

        if (type === 'start' && payload) {
          shouldCancel = false;
          const { passwords, encryptionInfo } = payload;
          const total = passwords.length;
          const startTime = Date.now();

          try {
            for (let i = 0; i < total; i++) {
              if (shouldCancel) {
                self.postMessage({
                  type: 'error',
                  payload: { error: 'Cancelled by user' },
                });
                return;
              }

              const password = passwords[i];
              const isMatch = await verifyPassword(password, encryptionInfo);

              const elapsed = (Date.now() - startTime) / 1000;
              const speed = i > 0 ? i / elapsed : 0;
              const remaining = total - i;
              const estimatedTime = speed > 0 ? remaining / speed : 0;

              self.postMessage({
                type: 'progress',
                payload: {
                  current: password,
                  tested: i + 1,
                  total,
                  speed: Math.round(speed),
                  estimatedTime: Math.round(estimatedTime),
                },
              });

              if (isMatch) {
                self.postMessage({
                  type: 'found',
                  payload: { password },
                });
                return;
              }

              if (i % 100 === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
              }
            }

            self.postMessage({ type: 'notFound' });
          } catch (error) {
            self.postMessage({
              type: 'error',
              payload: { error: error.message || 'Unknown error' },
            });
          }
        }
      };

      async function verifyPassword(password, encryptionInfo) {
        try {
          const salt = base64ToUint8Array(encryptionInfo.saltValue);
          const hash = await hashwasm.pbkdf2({
            password,
            salt,
            iterations: encryptionInfo.spinCount,
            hashLength: 32,
            hashFunction: encryptionInfo.algorithmName.toLowerCase(),
            outputType: 'binary',
          });

          const expectedHash = base64ToUint8Array(encryptionInfo.hashValue);
          return compareUint8Arrays(hash, expectedHash);
        } catch (error) {
          console.error('Error verifying password:', error);
          return false;
        }
      }

      function base64ToUint8Array(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

      function compareUint8Arrays(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }
    `;
  }
}
