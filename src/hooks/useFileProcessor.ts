import { useState, useCallback } from 'react';
import { ProcessingState, FileProcessorHook } from '../types';
import { XlsxUnprotector } from '../services/xlsxUnprotector';

const unprotector = new XlsxUnprotector();

export function useFileProcessor(): FileProcessorHook {
  const [state, setState] = useState<ProcessingState>({
    status: 'idle'
  });

  const processFile = useCallback(async (file: File) => {
    setState({
      status: 'processing',
      fileName: file.name
    });

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
  }, []);

  const resetState = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  return { state, processFile, resetState };
}
