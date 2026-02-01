import { useTranslation } from 'react-i18next';
import { Loader2, AlertCircle } from 'lucide-react';
import { RecoveryProgress as RecoveryProgressType } from '../types';
import { UI_CONSTANTS } from '../constants/ui';

interface RecoveryProgressProps {
  progress: RecoveryProgressType;
  onCancel: () => void;
}

export function RecoveryProgress({ progress, onCancel }: RecoveryProgressProps) {
  const { t } = useTranslation();

  const percentage = progress.total > 0 ? (progress.tested / progress.total) * 100 : 0;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="glass-panel rounded-2xl p-8 space-y-6 border-2 border-vault-error/30 glow-error">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
          <Loader2 className="text-vault-error animate-spin" size={UI_CONSTANTS.ICON_SIZES.XL} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold font-mono text-vault-error">
            {t('status.crackingPassword')}
          </h3>
          <p className="text-sm text-vault-muted mt-1">
            {t('recovery.progress.testing')}: <span className="font-mono text-vault-text">{progress.current}</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-vault-muted font-mono">
          <span>{progress.tested.toLocaleString()} / {progress.total.toLocaleString()}</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-vault-surface/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-vault-error to-vault-amber transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-vault-surface/20 rounded-lg border border-vault-border/30">
          <p className="text-xs text-vault-muted uppercase tracking-wider mb-1">
            {t('recovery.progress.speed')}
          </p>
          <p className="text-lg font-semibold font-mono text-vault-text">
            {progress.speed.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-vault-surface/20 rounded-lg border border-vault-border/30">
          <p className="text-xs text-vault-muted uppercase tracking-wider mb-1">
            {t('recovery.progress.estimated')}
          </p>
          <p className="text-lg font-semibold font-mono text-vault-text">
            {formatTime(progress.estimatedTime)}
          </p>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-vault-amber/10 border border-vault-amber/30 rounded-lg">
        <AlertCircle className="text-vault-amber flex-shrink-0 mt-0.5" size={UI_CONSTANTS.ICON_SIZES.SM} strokeWidth={2} />
        <p className="text-xs text-vault-amber">
          {t('disclaimer.technical.time')}
        </p>
      </div>

      {/* Cancel button */}
      <button
        onClick={onCancel}
        className="w-full px-6 py-3 rounded-lg border-2 border-vault-error hover:bg-vault-error/10 transition-colors font-mono text-sm text-vault-error font-semibold"
      >
        {t('recovery.progress.cancel')}
      </button>
    </div>
  );
}
