import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';
import { UI_CONSTANTS } from '../constants/ui';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export function DisclaimerModal({ isOpen, onAccept, onCancel }: DisclaimerModalProps) {
  const { t } = useTranslation();
  const [checkboxes, setCheckboxes] = useState({
    ownership: false,
    understanding: false,
    responsibility: false,
  });

  const [showError, setShowError] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    const allChecked = checkboxes.ownership && checkboxes.understanding && checkboxes.responsibility;

    if (!allChecked) {
      setShowError(true);
      return;
    }

    onAccept();
  };

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
    setShowError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-2xl bg-vault-bg border-2 border-vault-error rounded-2xl shadow-2xl shadow-vault-error/20">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-vault-error/30 bg-vault-error/10">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-vault-error/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-vault-error" size={UI_CONSTANTS.ICON_SIZES.LG} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-vault-error">
                {t('disclaimer.title')}
              </h2>
              <p className="text-sm text-vault-muted mt-1">
                {t('disclaimer.warning')}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-vault-muted hover:text-vault-text transition-colors"
          >
            <X size={UI_CONSTANTS.ICON_SIZES.MD} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Legal Requirements */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold font-mono text-vault-error uppercase tracking-wider">
              {t('disclaimer.legal.title')}
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkboxes.ownership}
                  onChange={() => handleCheckboxChange('ownership')}
                  className="mt-1 w-5 h-5 rounded border-2 border-vault-error/50 bg-vault-surface/30 checked:bg-vault-error checked:border-vault-error transition-all cursor-pointer"
                />
                <span className="text-sm text-vault-muted group-hover:text-vault-text transition-colors">
                  {t('disclaimer.legal.ownership')}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkboxes.understanding}
                  onChange={() => handleCheckboxChange('understanding')}
                  className="mt-1 w-5 h-5 rounded border-2 border-vault-error/50 bg-vault-surface/30 checked:bg-vault-error checked:border-vault-error transition-all cursor-pointer"
                />
                <span className="text-sm text-vault-muted group-hover:text-vault-text transition-colors">
                  {t('disclaimer.legal.understanding')}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkboxes.responsibility}
                  onChange={() => handleCheckboxChange('responsibility')}
                  className="mt-1 w-5 h-5 rounded border-2 border-vault-error/50 bg-vault-surface/30 checked:bg-vault-error checked:border-vault-error transition-all cursor-pointer"
                />
                <span className="text-sm text-vault-muted group-hover:text-vault-text transition-colors">
                  {t('disclaimer.legal.responsibility')}
                </span>
              </label>
            </div>
          </div>

          {/* Technical Information */}
          <div className="space-y-4 pt-4 border-t border-vault-border/30">
            <h3 className="text-sm font-semibold font-mono text-vault-amber uppercase tracking-wider">
              {t('disclaimer.technical.title')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vault-amber mt-2" />
                <span className="text-vault-muted">{t('disclaimer.technical.time')}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vault-amber mt-2" />
                <span className="text-vault-muted">{t('disclaimer.technical.local')}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vault-amber mt-2" />
                <span className="text-vault-muted">{t('disclaimer.technical.privacy')}</span>
              </li>
            </ul>
          </div>

          {/* Error message */}
          {showError && (
            <div className="p-4 bg-vault-error/10 border border-vault-error/30 rounded-lg animate-slide-up">
              <p className="text-sm text-vault-error font-mono">
                {t('disclaimer.validation.allRequired')}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-vault-border/30">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-vault-border/50 hover:border-vault-border transition-colors font-mono text-sm"
          >
            {t('disclaimer.buttons.cancel')}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 rounded-lg bg-vault-error/20 border-2 border-vault-error hover:bg-vault-error/30 transition-colors font-mono text-sm text-vault-error font-semibold"
          >
            {t('disclaimer.buttons.proceed')}
          </button>
        </div>
      </div>
    </div>
  );
}
