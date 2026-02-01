import { useCallback, useRef, useState } from 'react';
import { Upload, LockOpen } from 'lucide-react';
import { ProcessingStatus } from '../types';
import { ARIA_LABELS, UI_CONSTANTS } from '../constants/ui';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  status: ProcessingStatus;
}

export function FileUploader({ onFileSelect, status }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const isDisabled = status === 'processing';

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label={ARIA_LABELS.UPLOAD_ZONE}
      className={`
        relative overflow-hidden
        glass-panel rounded-2xl p-12
        transition-all duration-300
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-vault-cyan/50'}
        ${isDragging ? 'border-vault-cyan border-2 glow-cyan scale-[1.02]' : ''}
      `}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-vault-cyan/20 to-transparent" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className={`
          transition-all duration-${UI_CONSTANTS.TRANSITIONS.DEFAULT}
          ${isDragging ? 'scale-110 animate-unlock' : 'scale-100'}
        `}>
          {isDragging ? (
            <LockOpen className="text-vault-cyan" size={UI_CONSTANTS.ICON_SIZES.XXL} strokeWidth={1.5} />
          ) : (
            <Upload className="text-vault-cyan" size={UI_CONSTANTS.ICON_SIZES.XXL} strokeWidth={1.5} />
          )}
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold font-mono text-vault-cyan">
            {isDragging ? 'Solte o arquivo aqui' : 'Arraste seu .xlsx aqui'}
          </h3>
          <p className="text-vault-muted text-sm">
            ou <span className="text-vault-cyan underline">clique para selecionar</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-vault-muted font-mono">
          <span className="w-2 h-2 rounded-full bg-vault-success animate-pulse" />
          Máximo {UI_CONSTANTS.MAX_FILE_SIZE_MB}MB • Apenas .xlsx
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleFileInput}
        className="hidden"
        disabled={isDisabled}
        aria-label={ARIA_LABELS.FILE_INPUT}
      />
    </div>
  );
}
