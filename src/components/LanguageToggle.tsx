import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { ARIA_LABELS, UI_CONSTANTS } from '../constants/ui';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === 'pt-BR' ? 'PT' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-vault-border/30 hover:border-vault-cyan/50 bg-vault-surface/30 hover:bg-vault-surface/50 transition-all duration-300 group"
      aria-label={ARIA_LABELS.LANGUAGE_TOGGLE}
    >
      <Languages
        className="text-vault-muted group-hover:text-vault-cyan transition-colors"
        size={UI_CONSTANTS.ICON_SIZES.SM}
        strokeWidth={2}
      />
      <span className="text-sm font-mono font-semibold text-vault-muted group-hover:text-vault-text transition-colors">
        {currentLang}
      </span>
    </button>
  );
}
