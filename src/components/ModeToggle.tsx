import { useTranslation } from 'react-i18next';
import { Zap, ShieldAlert } from 'lucide-react';
import { ProcessingMode } from '../types';
import { UI_CONSTANTS, ARIA_LABELS } from '../constants/ui';

interface ModeToggleProps {
  mode: ProcessingMode;
  onModeChange: (mode: ProcessingMode) => void;
  disabled?: boolean;
}

export function ModeToggle({ mode, onModeChange, disabled }: ModeToggleProps) {
  const { t } = useTranslation();

  const handleModeChange = (newMode: ProcessingMode) => {
    if (disabled) return;
    onModeChange(newMode);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-4">
      <h3 className="text-sm font-semibold font-mono text-vault-muted uppercase tracking-wider">
        {t('mode.zip')} / {t('mode.recovery')}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleModeChange('zip')}
          disabled={disabled}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300
            ${mode === 'zip'
              ? 'border-vault-cyan bg-vault-cyan/10 shadow-lg shadow-vault-cyan/20'
              : 'border-vault-border/30 hover:border-vault-cyan/50 bg-vault-surface/30'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          aria-label={ARIA_LABELS.MODE_TOGGLE}
        >
          <div className="flex flex-col items-center gap-3">
            <Zap
              className={mode === 'zip' ? 'text-vault-cyan' : 'text-vault-muted'}
              size={UI_CONSTANTS.ICON_SIZES.LG}
              strokeWidth={2}
            />
            <div className="text-center">
              <p className={`text-sm font-semibold font-mono ${mode === 'zip' ? 'text-vault-text' : 'text-vault-muted'}`}>
                {t('mode.zip')}
              </p>
              <p className="text-xs text-vault-muted mt-1">
                {t('mode.zipDescription')}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleModeChange('recovery')}
          disabled={disabled}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300
            ${mode === 'recovery'
              ? 'border-vault-error bg-vault-error/10 shadow-lg shadow-vault-error/20'
              : 'border-vault-border/30 hover:border-vault-error/50 bg-vault-surface/30'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          aria-label={ARIA_LABELS.MODE_TOGGLE}
        >
          <div className="flex flex-col items-center gap-3">
            <ShieldAlert
              className={mode === 'recovery' ? 'text-vault-error' : 'text-vault-muted'}
              size={UI_CONSTANTS.ICON_SIZES.LG}
              strokeWidth={2}
            />
            <div className="text-center">
              <p className={`text-sm font-semibold font-mono ${mode === 'recovery' ? 'text-vault-text' : 'text-vault-muted'}`}>
                {t('mode.recovery')}
              </p>
              <p className="text-xs text-vault-muted mt-1">
                {t('mode.recoveryDescription')}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
