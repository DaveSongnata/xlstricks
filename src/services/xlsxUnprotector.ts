import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { validateFile, sanitizeFileName, FileValidationError } from '../utils/fileValidation';
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from '../utils/constants';

/**
 * Interface for file processing strategy (Open/Closed Principle)
 */
export interface FileProcessor {
  process(file: File): Promise<{ success: boolean; message: string }>;
}

/**
 * XLSX Unprotector - Removes sheet protection from .xlsx files
 * Following SOLID principles:
 * - Single Responsibility: Only handles XLSX unprotection
 * - Open/Closed: Implements FileProcessor interface for extension
 * - Dependency Inversion: Depends on JSZip abstraction
 */
export class XlsxUnprotector implements FileProcessor {
  private readonly SHEET_PROTECTION_PATTERN = /<sheetProtection[^>]*\/>/gi;
  private readonly WORKBOOK_PROTECTION_PATTERN = /<workbookProtection[^>]*\/>/gi;
  private readonly SHEET_FILE_PATTERN = /^xl\/worksheets\/sheet\d+\.xml$/;

  async process(file: File): Promise<{ success: boolean; message: string }> {
    try {
      // Validate file before processing
      validateFile(file);

      // Read file as ArrayBuffer
      const arrayBuffer = await this.readFileAsArrayBuffer(file);

      // Unzip, remove protections, rezip
      const unprotectedBlob = await this.unprotectXlsx(arrayBuffer);

      // Trigger download
      const outputFileName = sanitizeFileName(file.name);
      saveAs(unprotectedBlob, outputFileName);

      return { success: true, message: SUCCESS_MESSAGE };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          resolve(e.target.result);
        } else {
          reject(new Error(ERROR_MESSAGES.CORRUPTED_FILE));
        }
      };
      reader.onerror = () => reject(new Error(ERROR_MESSAGES.CORRUPTED_FILE));
      reader.readAsArrayBuffer(file);
    });
  }

  private async unprotectXlsx(arrayBuffer: ArrayBuffer): Promise<Blob> {
    try {
      const zip = await JSZip.loadAsync(arrayBuffer);
      let foundProtection = false;

      // Process each file in the ZIP
      for (const [filePath, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;

        // Check if it's a worksheet or workbook file
        if (this.isProtectableFile(filePath)) {
          const content = await zipEntry.async('string');
          const cleanedContent = this.removeProtectionTags(content);

          if (cleanedContent !== content) {
            foundProtection = true;
            zip.file(filePath, cleanedContent);
          }
        }
      }

      if (!foundProtection) {
        throw new FileValidationError(ERROR_MESSAGES.NO_PROTECTION);
      }

      // Generate new XLSX file
      return await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
    } catch (error) {
      if (error instanceof FileValidationError) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.CORRUPTED_FILE);
    }
  }

  private isProtectableFile(filePath: string): boolean {
    return (
      this.SHEET_FILE_PATTERN.test(filePath) ||
      filePath === 'xl/workbook.xml'
    );
  }

  private removeProtectionTags(xmlContent: string): string {
    return xmlContent
      .replace(this.SHEET_PROTECTION_PATTERN, '')
      .replace(this.WORKBOOK_PROTECTION_PATTERN, '');
  }

  private handleError(error: unknown): { success: false; message: string } {
    if (error instanceof FileValidationError) {
      return { success: false, message: error.message };
    }

    if (error instanceof Error) {
      console.error('Unprotection error:', error);
      return { success: false, message: error.message };
    }

    return { success: false, message: ERROR_MESSAGES.GENERIC };
  }
}
