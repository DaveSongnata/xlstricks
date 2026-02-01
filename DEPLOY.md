# Guia de Deploy - XLSTRICKS

## Deploy na Vercel (Recomendado)

### Método 1: Via GitHub (Automático)

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: XLSTRICKS PWA"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/xlstricks.git
   git push -u origin main
   ```

2. **Conectar na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe o repositório do GitHub
   - Configuração detectada automaticamente:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Clique em "Deploy"

3. **Pronto!**
   - URL: `https://xlstricks.vercel.app` (ou custom domain)
   - Deploy automático a cada push
   - SSL/HTTPS automático
   - PWA instalável

### Método 2: Via CLI da Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd /c/Projetos/xlstricks
vercel

# Deploy para produção
vercel --prod
```

---

## Deploy no Netlify (Alternativa)

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
cd /c/Projetos/xlstricks
npm run build
netlify deploy --prod --dir=dist
```

**Configuração Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`

---

## Deploy no GitHub Pages

1. **Instalar gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicionar script no package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configurar no GitHub**
   - Settings → Pages
   - Source: gh-pages branch
   - URL: `https://SEU_USUARIO.github.io/xlstricks`

---

## Testando PWA Localmente

### 1. Build e Preview
```bash
npm run build
npm run preview
```

### 2. Testar Instalação
1. Abra `http://localhost:4173` no Chrome/Edge
2. Clique no ícone de instalação na barra de endereço
3. Confirme a instalação
4. O app será instalado como aplicativo nativo

### 3. Verificar Service Worker
1. Abra DevTools (F12)
2. Aba "Application"
3. Seção "Service Workers"
4. Verificar se está ativo

---

## Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente no futuro:

**.env.production**
```env
VITE_APP_NAME=XLSTRICKS
VITE_APP_VERSION=1.0.0
```

**Acessar no código:**
```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

---

## Checklist Pré-Deploy

- [x] Build sem erros (`npm run build`)
- [x] Testes manuais funcionando
- [x] PWA manifest configurado
- [x] Service Worker funcionando
- [x] Ícones PWA criados
- [x] README.md atualizado
- [x] .gitignore configurado
- [ ] Criar repositório GitHub
- [ ] Deploy na Vercel

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server

# Produção
npm run build            # Build para produção
npm run preview          # Preview do build local

# Linting (se adicionar ESLint)
npm run lint             # Verificar código
npm run lint:fix         # Corrigir automaticamente
```

---

## URLs de Produção

Após deploy, o app estará disponível em:

- **Vercel**: `https://xlstricks.vercel.app`
- **Netlify**: `https://xlstricks.netlify.app`
- **GitHub Pages**: `https://SEU_USUARIO.github.io/xlstricks`

---

## Recursos PWA

### Desktop
- Instalável via Chrome/Edge (ícone na barra de endereço)
- Funciona offline após primeiro acesso
- Atualizações automáticas em background

### Mobile
- Instalável via "Adicionar à tela inicial"
- Funciona como app nativo
- Sem barra de navegação do browser
- Ícone personalizado na home screen

---

## Suporte

Para problemas no deploy:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)
