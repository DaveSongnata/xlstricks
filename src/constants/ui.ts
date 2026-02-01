// UI Constants - Evita magic numbers
export const UI_CONSTANTS = {
  ICON_SIZES: {
    XS: 16,
    SM: 20,
    MD: 24,
    LG: 28,
    XL: 48,
    XXL: 80,
  },
  TIMEOUTS: {
    SUCCESS_AUTO_DISMISS: 5000,
  },
  TRANSITIONS: {
    DEFAULT: 300,
    SLOW: 600,
  },
  GRID_PATTERN_SIZE: 40,
  MAX_FILE_SIZE_MB: 50,
} as const;

export const ARIA_LABELS = {
  UPLOAD_ZONE: 'Área de upload de arquivo',
  CLOSE_NOTIFICATION: 'Fechar notificação',
  FILE_INPUT: 'Selecionar arquivo Excel',
  LOGO: 'Logo XLSTRICKS',
} as const;
