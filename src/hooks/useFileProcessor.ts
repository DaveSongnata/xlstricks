import { useState, useCallback, useRef } from 'react';
import { ProcessingState, FileProcessorHook, ProcessingMode, RecoveryProgress } from '../types';
import { XlsxUnprotector } from '../services/xlsxUnprotector';
import { PasswordRecoveryService } from '../services/passwordRecoveryService';

const unprotector = new XlsxUnprotector();

export function useFileProcessor(): FileProcessorHook {
  const [state, setState] = useState<ProcessingState>({
    status: 'idle'
  });

  const [mode, setMode] = useState<ProcessingMode>('zip');
  const [recoveryProgress, setRecoveryProgress] = useState<RecoveryProgress | null>(null);

  const recoveryServiceRef = useRef<PasswordRecoveryService | null>(null);

  const processFile = useCallback(async (file: File) => {
    setState({
      status: 'processing',
      fileName: file.name
    });

    try {
      if (mode === 'recovery') {
        // Password recovery mode
        recoveryServiceRef.current = new PasswordRecoveryService();

        const password = await recoveryServiceRef.current.recoverPassword(
          file,
          (progress: RecoveryProgress) => {
            setRecoveryProgress(progress);
          },
          'hybrid'
        );

        if (password) {
          setState({
            status: 'success',
            message: `Password found: ${password}`,
            fileName: file.name,
            foundPassword: password,
          });
        } else {
          setState({
            status: 'error',
            message: 'Password not found in dictionary/range',
            fileName: file.name,
          });
        }

        setRecoveryProgress(null);
        recoveryServiceRef.current = null;
      } else {
        // ZIP mode (current implementation)
        const result = await unprotector.process(file);

        if (result.success) {
          setState({
            status: 'success',
            message: result.message,
            fileName: file.name
          });

          // Reset to idle after 5 seconds
          setTimeout(() => {
            setState({ status: 'idle' });
          }, 5000);
        } else {
          setState({
            status: 'error',
            message: result.message,
            fileName: file.name
          });
        }
      }
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Processing error',
        fileName: file.name
      });
      setRecoveryProgress(null);
      recoveryServiceRef.current = null;
    }
  }, [mode]);

  const resetState = useCallback(() => {
    // Cancel any ongoing recovery
    if (recoveryServiceRef.current) {
      recoveryServiceRef.current.abort();
      recoveryServiceRef.current = null;
    }
    setRecoveryProgress(null);
    setState({ status: 'idle' });
  }, []);

  return {
    state,
    mode,
    processFile,
    resetState,
    setMode,
    recoveryProgress
  };
}
