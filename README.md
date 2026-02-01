# XLSTRICKS

Ferramenta web para remover proteções de planilhas Excel (.xlsx) diretamente no navegador. 100% privado, sem upload de arquivos.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

## Features

- Remove proteções de sheets e workbooks
- 100% frontend (arquivo nunca sai do navegador)
- PWA instalável (funciona offline)
- Drag & drop interface
- Processamento assíncrono (não trava UI)
- Validação de MIME type e tamanho
- TypeScript strict mode
- SOLID principles
- Zero backend necessário

## Como Funciona

Arquivos `.xlsx` são na verdade arquivos ZIP contendo XMLs. Este tool:

1. Descompacta o arquivo usando JSZip
2. Remove tags `<sheetProtection/>` e `<workbookProtection/>` dos XMLs
3. Recompacta o arquivo
4. Dispara download automático

**Tudo acontece no navegador do usuário. Privacidade total.**

## Stack Técnica

- **React 18** - UI components
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool ultrarrápido
- **Tailwind CSS 3** - Styling
- **JSZip** - Manipulação de arquivos ZIP
- **FileSaver.js** - Download de arquivos
- **Vite PWA** - Progressive Web App

## Instalação

```bash
# Instalar dependências
npm install

# Dev server (localhost:5173)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Arquitetura

```
src/
├── components/
│   ├── FileUploader.tsx       # Drag & drop zone
│   ├── ProcessingStatus.tsx   # Feedback visual
│   └── HowItWorksCard.tsx     # Info card
├── services/
│   └── xlsxUnprotector.ts     # Core logic (SOLID)
├── hooks/
│   └── useFileProcessor.ts    # State management
├── utils/
│   ├── fileValidation.ts      # Validações
│   └── constants.ts           # Constantes
├── types.ts                   # TypeScript interfaces
├── App.tsx                    # Main app
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Segurança

- MIME type whitelist estrito
- Limite de 50MB por arquivo
- Sanitização de nomes de arquivo
- Try/catch em todas operações assíncronas
- Nenhum arquivo enviado para servidor
- Headers de segurança no Vercel

## Limitações

- Funciona apenas com `.xlsx` (Excel 2007+)
- Não remove senha de **abertura de arquivo** (apenas proteções de sheet/workbook)
- Arquivos `.xls` (formato binário antigo) não são suportados

## Deploy na Vercel

```bash
# 1. Conectar repositório no Vercel
# 2. Configuração automática detectada
# 3. Build command: npm run build
# 4. Output directory: dist
# 5. Deploy
```

Ou use o botão:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## PWA - Progressive Web App

Este projeto pode ser instalado como aplicativo:

1. Acesse pelo Chrome/Edge
2. Clique no ícone de instalação na barra de endereço
3. Confirme a instalação
4. Use como aplicativo nativo

Funcionalidades PWA:
- Instalável em desktop e mobile
- Ícone na tela inicial
- Funciona offline (após primeiro acesso)
- Cache inteligente de recursos

## Licença

MIT

## Contribuindo

PRs são bem-vindos! Para mudanças grandes, abra uma issue primeiro.
