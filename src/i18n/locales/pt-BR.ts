export default {
  app: {
    title: 'XLSTRICKS - Desproteja Planilhas Excel',
    subtitle: 'Desproteja planilhas Excel antigas removendo senhas de células e sheets',
    footer: {
      privacy: 'Código 100% no navegador • Privacidade garantida',
      local: 'Seu arquivo nunca sai do seu dispositivo',
    },
  },

  mode: {
    zip: 'Modo ZIP (Rápido)',
    recovery: 'Modo Recuperação (Avançado)',
    zipDescription: 'Remove proteção de células e planilhas',
    recoveryDescription: 'Recupera senha de abertura de arquivo',
  },

  uploader: {
    title: 'Arraste seu arquivo .xlsx aqui',
    subtitle: 'ou clique para selecionar',
    dragging: 'Solte o arquivo aqui',
    processing: 'Processando...',
  },

  status: {
    processing: 'Processando...',
    removingProtection: 'Removendo proteções da planilha',
    crackingPassword: 'Tentando recuperar senha',
    success: 'Sucesso!',
    downloadStarted: 'Download iniciado',
    passwordFound: 'Senha encontrada: {{password}}',
    error: 'Erro',
    errorGeneric: 'Não foi possível processar o arquivo',
  },

  howItWorks: {
    title: 'Como funciona',
    zip: {
      items: {
        1: 'Arquivos .xlsx são ZIPs renomeados',
        2: 'Removemos tags <sheetProtection/> do XML',
        3: 'Tudo processado no seu navegador',
        4: 'Arquivo nunca sai do seu computador',
      },
    },
    recovery: {
      items: {
        1: 'Extrai hash de senha do arquivo .xlsx',
        2: 'Testa 10k senhas mais comuns',
        3: 'Força bruta em senhas numéricas (0000-999999)',
        4: 'Tudo no navegador com Web Workers',
      },
    },
  },

  limitations: {
    title: 'Limitações',
    zip: {
      items: {
        1: 'Funciona apenas com .xlsx (Excel 2007+)',
        2: 'Não remove senha de abertura de arquivo',
      },
    },
    recovery: {
      items: {
        1: 'Pode levar horas se senha não estiver no dicionário',
        2: 'Senhas complexas/longas são impossíveis de quebrar',
      },
    },
  },

  privacy: {
    badge: '100% privado • Zero upload • Open source',
  },

  disclaimer: {
    title: 'Aviso Ético e Legal',
    warning: 'O Modo Recuperação tenta quebrar senhas de abertura de arquivo usando técnicas de força bruta. Use apenas em arquivos pessoais.',

    legal: {
      title: 'Requisitos Legais',
      ownership: 'Este é MEU arquivo pessoal',
      understanding: 'Entendo que uso impróprio pode ser ilegal',
      responsibility: 'Assumo total responsabilidade pelo uso desta ferramenta',
    },

    technical: {
      title: 'Informações Técnicas',
      time: 'Este processo pode levar de minutos a horas dependendo da senha',
      local: 'Todo processamento ocorre localmente no seu navegador',
      privacy: 'Nenhum dado é enviado para servidores externos',
    },

    buttons: {
      cancel: 'Cancelar',
      proceed: 'Aceito e Prosseguir',
    },

    validation: {
      allRequired: 'Você deve aceitar todos os termos para continuar',
    },
  },

  recovery: {
    method: {
      title: 'Método de Ataque',
      dictionary: 'Dicionário (10.000 senhas comuns)',
      bruteforce: 'Força Bruta (0000-999999)',
      hybrid: 'Híbrido (Dicionário + Força Bruta)',
    },

    acceleration: {
      title: 'Aceleração',
      webgpu: 'WebGPU (mais rápido, requer suporte)',
      webassembly: 'WebAssembly (compatível, 3-4x mais rápido)',
    },

    progress: {
      testing: 'Testando',
      speed: 'senhas/segundo',
      estimated: 'Tempo estimado',
      cancel: 'Cancelar',
      found: 'Senha encontrada',
      notFound: 'Senha não encontrada no dicionário/intervalo',
    },
  },

  errors: {
    invalidType: 'Apenas arquivos .xlsx são suportados',
    fileTooLarge: 'Arquivo muito grande (máximo 50MB)',
    notEncrypted: 'Este arquivo não possui senha de abertura',
    webgpuNotSupported: 'WebGPU não suportado neste navegador. Use WebAssembly.',
    processingError: 'Erro ao processar arquivo',
  },

  aria: {
    uploadZone: 'Área de upload de arquivo',
    closeNotification: 'Fechar notificação',
    fileInput: 'Selecionar arquivo Excel',
    logo: 'Logo XLSTRICKS',
    languageToggle: 'Alternar idioma',
    modeToggle: 'Alternar modo',
  },
};
