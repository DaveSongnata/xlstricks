import JSZip from 'jszip';
import { pbkdf2 } from 'hash-wasm';
import { RecoveryProgress } from '../types';

interface EncryptionInfo {
  spinCount: number;
  saltValue: string;
  hashValue: string;
  algorithmName: string;
}

export class PasswordRecoveryService {
  private static readonly TOP_PASSWORDS = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
    'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
    'bailey', 'passw0rd', 'shadow', '123123', '654321',
    'superman', 'qazwsx', 'michael', 'football', 'welcome',
    // Add more common passwords here (expand to ~10k)
  ];

  private abortController: AbortController | null = null;

  async recoverPassword(
    file: File,
    onProgress: (progress: RecoveryProgress) => void,
    method: 'dictionary' | 'bruteforce' | 'hybrid' = 'hybrid'
  ): Promise<string | null> {
    this.abortController = new AbortController();

    const encryptionInfo = await this.extractEncryptionInfo(file);

    if (!encryptionInfo) {
      throw new Error('File is not password-protected');
    }

    let password: string | null = null;

    // Dictionary attack
    if (method === 'dictionary' || method === 'hybrid') {
      password = await this.dictionaryAttack(encryptionInfo, onProgress);
      if (password) return password;
    }

    // Brute force attack
    if (method === 'bruteforce' || method === 'hybrid') {
      password = await this.bruteForceAttack(encryptionInfo, onProgress);
      if (password) return password;
    }

    return null;
  }

  async extractEncryptionInfo(file: File): Promise<EncryptionInfo | null> {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

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
  }

  private async dictionaryAttack(
    encryptionInfo: EncryptionInfo,
    onProgress: (progress: RecoveryProgress) => void
  ): Promise<string | null> {
    const total = PasswordRecoveryService.TOP_PASSWORDS.length;
    const startTime = Date.now();

    for (let i = 0; i < total; i++) {
      if (this.abortController?.signal.aborted) {
        throw new Error('Password recovery cancelled');
      }

      const password = PasswordRecoveryService.TOP_PASSWORDS[i];
      const isMatch = await this.verifyPassword(password, encryptionInfo);

      const elapsed = (Date.now() - startTime) / 1000;
      const speed = i > 0 ? i / elapsed : 0;
      const remaining = total - i;
      const estimatedTime = speed > 0 ? remaining / speed : 0;

      onProgress({
        current: password,
        tested: i + 1,
        total,
        speed: Math.round(speed),
        estimatedTime: Math.round(estimatedTime),
      });

      if (isMatch) {
        return password;
      }

      // Yield control every 100 passwords
      if (i % 100 === 0) {
        await this.sleep(0);
      }
    }

    return null;
  }

  private async bruteForceAttack(
    encryptionInfo: EncryptionInfo,
    onProgress: (progress: RecoveryProgress) => void
  ): Promise<string | null> {
    const total = 1000000; // 000000 - 999999
    const startTime = Date.now();

    for (let i = 0; i < total; i++) {
      if (this.abortController?.signal.aborted) {
        throw new Error('Password recovery cancelled');
      }

      const password = i.toString().padStart(6, '0');
      const isMatch = await this.verifyPassword(password, encryptionInfo);

      const elapsed = (Date.now() - startTime) / 1000;
      const speed = i > 0 ? i / elapsed : 0;
      const remaining = total - i;
      const estimatedTime = speed > 0 ? remaining / speed : 0;

      onProgress({
        current: password,
        tested: i + 1,
        total,
        speed: Math.round(speed),
        estimatedTime: Math.round(estimatedTime),
      });

      if (isMatch) {
        return password;
      }

      // Yield control every 1000 passwords
      if (i % 1000 === 0) {
        await this.sleep(0);
      }
    }

    return null;
  }

  private async verifyPassword(
    password: string,
    encryptionInfo: EncryptionInfo
  ): Promise<boolean> {
    try {
      // Convert salt from base64
      const salt = this.base64ToUint8Array(encryptionInfo.saltValue);

      // Hash the password using PBKDF2
      const hash = await pbkdf2({
        password,
        salt,
        iterations: encryptionInfo.spinCount,
        hashLength: 32, // 256 bits
        hashFunction: encryptionInfo.algorithmName.toLowerCase() as any,
        outputType: 'binary',
      });

      // Convert expected hash from base64
      const expectedHash = this.base64ToUint8Array(encryptionInfo.hashValue);

      // Compare hashes
      return this.compareUint8Arrays(hash as Uint8Array, expectedHash);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private compareUint8Arrays(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  abort(): void {
    this.abortController?.abort();
  }
}
