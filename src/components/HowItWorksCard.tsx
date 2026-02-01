import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { ProcessingMode } from '../types';
import { UI_CONSTANTS } from '../constants/ui';

interface HowItWorksCardProps {
  mode: ProcessingMode;
}

export function HowItWorksCard({ mode }: HowItWorksCardProps) {
  const { t } = useTranslation();

  const infoItems = [
    t(`howItWorks.${mode}.items.1`),
    t(`howItWorks.${mode}.items.2`),
    t(`howItWorks.${mode}.items.3`),
    t(`howItWorks.${mode}.items.4`),
  ];

  const limitations = [
    t(`limitations.${mode}.items.1`),
    t(`limitations.${mode}.items.2`),
  ];

  const colorClass = mode === 'recovery' ? 'text-vault-error' : 'text-vault-cyan';
  const bulletColorClass = mode === 'recovery' ? 'bg-vault-error' : 'bg-vault-cyan';

  return (
    <div className="glass-panel rounded-2xl p-8 space-y-6">
      {/* How it works */}
      <div>
        <h3 className={`text-lg font-semibold font-mono mb-4 ${colorClass}`}>
          {t('howItWorks.title')}
        </h3>
        <ul className="space-y-3">
          {infoItems.map((text, index) => (
            <li key={index} className="flex items-start gap-3 text-sm group">
              <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${bulletColorClass} mt-2`} />
              <span className="text-vault-muted pt-0.5">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-vault-border/50" />

      {/* Limitations */}
      <div>
        <h3 className="text-lg font-semibold font-mono mb-4 text-vault-amber">
          {t('limitations.title')}
        </h3>
        <ul className="space-y-3">
          {limitations.map((text, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vault-amber mt-2" />
              <span className="text-vault-muted">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy badge */}
      <div className="pt-4 border-t border-vault-border/50">
        <div className="flex items-center gap-3 p-3 bg-vault-success/10 border border-vault-success/20 rounded-lg">
          <ShieldCheck className="text-vault-success flex-shrink-0" size={UI_CONSTANTS.ICON_SIZES.SM} strokeWidth={2} />
          <span className="text-xs text-vault-success font-mono">
            {t('privacy.badge')}
          </span>
        </div>
      </div>
    </div>
  );
}
