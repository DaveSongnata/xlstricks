export const ALLOWED_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const ERROR_MESSAGES = {
  INVALID_TYPE: 'Apenas arquivos .xlsx são suportados',
  FILE_TOO_LARGE: 'Arquivo muito grande (máximo 50MB)',
  CORRUPTED_FILE: 'Arquivo corrompido ou inválido',
  NO_PROTECTION: 'Esta planilha não possui proteções',
  PROCESSING_ERROR: 'Erro ao processar arquivo',
  GENERIC: 'Ocorreu um erro inesperado'
} as const;

export const SUCCESS_MESSAGE = 'Planilha desprotegida! Download iniciado';
