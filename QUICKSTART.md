# Quick Start - XLSTRICKS

## Instalação Rápida

```bash
cd c:\Projetos\xlstricks
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## Estrutura do Projeto

```
xlstricks/
├── src/
│   ├── components/           # Componentes React
│   │   ├── FileUploader.tsx      # Drag & drop
│   │   ├── ProcessingStatus.tsx  # Feedback visual
│   │   └── HowItWorksCard.tsx    # Info card
│   ├── services/
│   │   └── xlsxUnprotector.ts    # Lógica core (SOLID)
│   ├── hooks/
│   │   └── useFileProcessor.ts   # State management
│   ├── utils/
│   │   ├── fileValidation.ts     # Validações
│   │   └── constants.ts          # Constantes
│   ├── types.ts              # TypeScript interfaces
│   ├── App.tsx               # App principal
│   └── index.css             # Estilos globais
├── public/                   # Assets estáticos
├── dist/                     # Build de produção
├── package.json
├── vite.config.ts            # Config Vite + PWA
├── tailwind.config.js        # Config Tailwind
└── vercel.json               # Config deploy Vercel
```

---

## Como Funciona

### 1. Upload de arquivo
Usuário faz drag & drop ou clica para selecionar arquivo .xlsx

### 2. Validação
- Verifica MIME type
- Verifica tamanho (max 50MB)
- Verifica se não está vazio

### 3. Processamento
- Descompacta .xlsx com JSZip
- Remove tags `<sheetProtection/>` dos XMLs
- Recompacta arquivo

### 4. Download
Download automático do arquivo desprotegido

---

## Princípios SOLID

- **Single Responsibility**: Cada classe/função tem uma única responsabilidade
- **Open/Closed**: Extensível para novos formatos via interfaces
- **Dependency Inversion**: Usa abstrações (JSZip) em vez de implementações

---

## PWA (Progressive Web App)

### Instalação Desktop
1. Acesse no Chrome/Edge
2. Clique no ícone de instalação
3. Confirme

### Instalação Mobile
1. Menu → "Adicionar à tela inicial"
2. Funciona como app nativo

---

## Comandos

```bash
npm run dev      # Dev server
npm run build    # Build produção
npm run preview  # Preview build
```

---

## Deploy

Ver arquivo `DEPLOY.md` para instruções completas de deploy na Vercel, Netlify ou GitHub Pages.

---

## Licença

MIT
