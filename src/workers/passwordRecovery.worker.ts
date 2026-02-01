import { pbkdf2 } from 'hash-wasm';

interface WorkerMessage {
  type: 'start' | 'cancel';
  payload?: {
    passwords: string[];
    encryptionInfo: {
      spinCount: number;
      saltValue: string;
      hashValue: string;
      algorithmName: string;
    };
  };
}

interface WorkerResponse {
  type: 'progress' | 'found' | 'notFound' | 'error';
  payload?: {
    current?: string;
    tested?: number;
    total?: number;
    speed?: number;
    estimatedTime?: number;
    password?: string;
    error?: string;
  };
}

let shouldCancel = false;

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
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
          } as WorkerResponse);
          return;
        }

        const password = passwords[i];
        const isMatch = await verifyPassword(password, encryptionInfo);

        const elapsed = (Date.now() - startTime) / 1000;
        const speed = i > 0 ? i / elapsed : 0;
        const remaining = total - i;
        const estimatedTime = speed > 0 ? remaining / speed : 0;

        // Send progress update
        self.postMessage({
          type: 'progress',
          payload: {
            current: password,
            tested: i + 1,
            total,
            speed: Math.round(speed),
            estimatedTime: Math.round(estimatedTime),
          },
        } as WorkerResponse);

        if (isMatch) {
          self.postMessage({
            type: 'found',
            payload: { password },
          } as WorkerResponse);
          return;
        }

        // Yield control periodically
        if (i % 100 === 0) {
          await sleep(0);
        }
      }

      // Password not found
      self.postMessage({
        type: 'notFound',
      } as WorkerResponse);
    } catch (error) {
      self.postMessage({
        type: 'error',
        payload: { error: error instanceof Error ? error.message : 'Unknown error' },
      } as WorkerResponse);
    }
  }
};

async function verifyPassword(
  password: string,
  encryptionInfo: {
    spinCount: number;
    saltValue: string;
    hashValue: string;
    algorithmName: string;
  }
): Promise<boolean> {
  try {
    const salt = base64ToUint8Array(encryptionInfo.saltValue);

    const hash = await pbkdf2({
      password,
      salt,
      iterations: encryptionInfo.spinCount,
      hashLength: 32,
      hashFunction: encryptionInfo.algorithmName.toLowerCase() as any,
      outputType: 'binary',
    });

    const expectedHash = base64ToUint8Array(encryptionInfo.hashValue);

    return compareUint8Arrays(hash as Uint8Array, expectedHash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function compareUint8Arrays(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export {};
