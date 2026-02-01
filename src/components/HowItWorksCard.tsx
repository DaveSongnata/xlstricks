import { ShieldCheck } from 'lucide-react';
import { UI_CONSTANTS } from '../constants/ui';

const infoItems = [
  { text: 'Arquivos .xlsx são ZIPs renomeados' },
  { text: 'Removemos tags <sheetProtection/> do XML' },
  { text: 'Tudo processado no seu navegador' },
  { text: 'Arquivo nunca sai do seu computador' },
];

const limitations = [
  'Funciona apenas com .xlsx (Excel 2007+)',
  'Não remove senha de abertura de arquivo',
];

export function HowItWorksCard() {
  return (
    <div className="glass-panel rounded-2xl p-8 space-y-6">
      {/* How it works */}
      <div>
        <h3 className="text-lg font-semibold font-mono mb-4 text-vault-cyan">
          Como funciona
        </h3>
        <ul className="space-y-3">
          {infoItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm group">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-vault-cyan mt-2" />
              <span className="text-vault-muted pt-0.5">
                {item.text}
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
          Limitações
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
            100% privado • Zero upload • Open source
          </span>
        </div>
      </div>
    </div>
  );
}
