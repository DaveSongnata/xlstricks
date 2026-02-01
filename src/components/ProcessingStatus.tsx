import { Loader2, Check, X } from 'lucide-react';
import { ProcessingState } from '../types';
import { ARIA_LABELS, UI_CONSTANTS } from '../constants/ui';

interface ProcessingStatusProps {
  state: ProcessingState;
  onDismiss?: () => void;
}

export function ProcessingStatus({ state, onDismiss }: ProcessingStatusProps) {
  if (state.status === 'idle' || state.status === 'dragging') {
    return null;
  }

  const config = {
    processing: {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <Loader2 className="text-vault-cyan animate-spin" size={UI_CONSTANTS.ICON_SIZES.XL} strokeWidth={2} />
        </div>
      ),
      title: 'Processando...',
      description: 'Removendo proteções da planilha',
      bgClass: 'glass-panel',
      glowClass: 'glow-cyan',
    },
    success: {
      icon: (
        <div className="w-12 h-12 bg-vault-success/20 rounded-full flex items-center justify-center animate-unlock">
          <Check className="text-vault-success" size={UI_CONSTANTS.ICON_SIZES.LG} strokeWidth={2.5} />
        </div>
      ),
      title: 'Sucesso!',
      description: state.message || 'Download iniciado',
      bgClass: 'glass-panel border-vault-success/30',
      glowClass: 'glow-success',
    },
    error: {
      icon: (
        <div className="w-12 h-12 bg-vault-error/20 rounded-full flex items-center justify-center">
          <X className="text-vault-error" size={UI_CONSTANTS.ICON_SIZES.LG} strokeWidth={2.5} />
        </div>
      ),
      title: 'Erro',
      description: state.message || 'Não foi possível processar o arquivo',
      bgClass: 'glass-panel border-vault-error/30',
      glowClass: 'glow-error',
    },
  };

  const { icon, title, description, bgClass, glowClass } = config[state.status];

  return (
    <div className={`
      ${bgClass} ${glowClass}
      rounded-2xl p-8
      animate-slide-up
    `}>
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold font-mono mb-1">
            {title}
          </h3>
          <p className="text-vault-muted text-sm mb-2">
            {description}
          </p>
          {state.fileName && (
            <div className="flex items-center gap-2 mt-3">
              <div className="w-1 h-1 rounded-full bg-vault-cyan" />
              <span className="text-xs font-mono text-vault-muted truncate">
                {state.fileName}
              </span>
            </div>
          )}
        </div>

        {state.status === 'error' && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-vault-muted hover:text-vault-text transition-colors"
            aria-label={ARIA_LABELS.CLOSE_NOTIFICATION}
          >
            <X size={UI_CONSTANTS.ICON_SIZES.SM} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
