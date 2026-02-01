import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUploader } from './components/FileUploader';
import { ProcessingStatus } from './components/ProcessingStatus';
import { HowItWorksCard } from './components/HowItWorksCard';
import { ModeToggle } from './components/ModeToggle';
import { DisclaimerModal } from './components/DisclaimerModal';
import { RecoveryProgress } from './components/RecoveryProgress';
import { LanguageToggle } from './components/LanguageToggle';
import { useFileProcessor } from './hooks/useFileProcessor';
import { ARIA_LABELS } from './constants/ui';
import { ProcessingMode } from './types';

export function App() {
  const { t } = useTranslation();
  const { state, mode, processFile, resetState, setMode, recoveryProgress } = useFileProcessor();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleModeChange = (newMode: ProcessingMode) => {
    if (newMode === 'recovery' && !disclaimerAccepted) {
      setShowDisclaimer(true);
      return;
    }
    setMode(newMode);
  };

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    setMode('recovery');
  };

  const handleDisclaimerCancel = () => {
    setShowDisclaimer(false);
  };

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-500 ${mode === 'recovery' ? 'bg-gradient-to-br from-vault-bg via-vault-error/5 to-vault-bg' : ''}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 animate-slide-up">
          <div className="flex justify-center items-center gap-4 mb-4 relative">
            <img
              src="/logo.png"
              alt={ARIA_LABELS.LOGO}
              className="h-24 w-auto rounded-2xl"
            />
            <div className="absolute right-0 top-0">
              <LanguageToggle />
            </div>
          </div>
          <p className="text-vault-muted text-lg max-w-2xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        {/* Mode Toggle */}
        <ModeToggle
          mode={mode}
          onModeChange={handleModeChange}
          disabled={state.status === 'processing'}
        />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column: Uploader + Status */}
          <div className="space-y-6">
            <FileUploader
              onFileSelect={processFile}
              status={state.status}
            />

            {/* Show recovery progress if in recovery mode and processing */}
            {mode === 'recovery' && recoveryProgress ? (
              <RecoveryProgress
                progress={recoveryProgress}
                onCancel={resetState}
              />
            ) : (
              <ProcessingStatus
                state={state}
                onDismiss={resetState}
              />
            )}
          </div>

          {/* Right column: Info card */}
          <div>
            <HowItWorksCard mode={mode} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-vault-border/30">
          <p className="text-xs text-vault-muted font-mono">
            {t('app.footer.privacy')}
          </p>
          <p className="text-xs text-vault-muted/60 mt-2">
            {t('app.footer.local')}
          </p>
        </footer>
      </div>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onCancel={handleDisclaimerCancel}
      />
    </div>
  );
}
