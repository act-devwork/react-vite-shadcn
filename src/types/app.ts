export interface AppPagination {
  limit: number;
  page: 1;
  total: number;
  totalPages?: number;
}

export interface AppQueries {
  page?: number;
  limit?: number;
}

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  VIEW: 'view',
} as const;

export type FormModeEnum = (typeof FORM_MODE)[keyof typeof FORM_MODE];

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeEnum = (typeof THEME)[keyof typeof THEME];


