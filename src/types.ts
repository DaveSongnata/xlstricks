export type ProcessingStatus = 'idle' | 'dragging' | 'processing' | 'success' | 'error';

export type ProcessingMode = 'zip' | 'recovery';

export interface ProcessingState {
  status: ProcessingStatus;
  message?: string;
  fileName?: string;
  foundPassword?: string;
}

export interface FileProcessorHook {
  state: ProcessingState;
  mode: ProcessingMode;
  processFile: (file: File) => Promise<void>;
  resetState: () => void;
  setMode: (mode: ProcessingMode) => void;
  recoveryProgress: RecoveryProgress | null;
}

export interface RecoveryProgress {
  current: string;
  tested: number;
  total: number;
  speed: number;
  estimatedTime: number;
}
