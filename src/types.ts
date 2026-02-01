export type ProcessingStatus = 'idle' | 'dragging' | 'processing' | 'success' | 'error';

export interface ProcessingState {
  status: ProcessingStatus;
  message?: string;
  fileName?: string;
}

export interface FileProcessorHook {
  state: ProcessingState;
  processFile: (file: File) => Promise<void>;
  resetState: () => void;
}
