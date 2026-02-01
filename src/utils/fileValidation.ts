import { ALLOWED_MIME_TYPE, MAX_FILE_SIZE, ERROR_MESSAGES } from './constants';

export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileValidationError';
  }
}

export function validateFile(file: File): void {
  // Validate MIME type
  if (file.type !== ALLOWED_MIME_TYPE && !file.name.endsWith('.xlsx')) {
    throw new FileValidationError(ERROR_MESSAGES.INVALID_TYPE);
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new FileValidationError(ERROR_MESSAGES.FILE_TOO_LARGE);
  }

  // Validate file is not empty
  if (file.size === 0) {
    throw new FileValidationError(ERROR_MESSAGES.CORRUPTED_FILE);
  }
}

export function sanitizeFileName(fileName: string): string {
  const baseName = fileName.replace(/\.xlsx$/i, '');
  const sanitized = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  return `${sanitized}_unprotected.xlsx`;
}
