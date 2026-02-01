import { FileUploader } from './components/FileUploader';
import { ProcessingStatus } from './components/ProcessingStatus';
import { HowItWorksCard } from './components/HowItWorksCard';
import { useFileProcessor } from './hooks/useFileProcessor';
import { ARIA_LABELS } from './constants/ui';

export function App() {
  const { state, processFile, resetState } = useFileProcessor();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 animate-slide-up">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt={ARIA_LABELS.LOGO}
              className="h-24 w-auto"
            />
          </div>
          <p className="text-vault-muted text-lg max-w-2xl mx-auto">
            Desproteja planilhas Excel antigas removendo senhas de células e sheets
          </p>
        </header>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column: Uploader + Status */}
          <div className="space-y-6">
            <FileUploader
              onFileSelect={processFile}
              status={state.status}
            />

            <ProcessingStatus
              state={state}
              onDismiss={resetState}
            />
          </div>

          {/* Right column: Info card */}
          <div>
            <HowItWorksCard />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-vault-border/30">
          <p className="text-xs text-vault-muted font-mono">
            Código 100% no navegador • Privacidade garantida
          </p>
          <p className="text-xs text-vault-muted/60 mt-2">
            Seu arquivo nunca sai do seu dispositivo
          </p>
        </footer>
      </div>
    </div>
  );
}
