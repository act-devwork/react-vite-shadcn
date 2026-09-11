export interface Account {
  id: string;
  email: string;
  fullName?: string;
  profilePicture?: string;
  role: AccountRoleEnum;
  createdAt: string;
  updatedAt: string;
}

export const ACCOUNT_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type AccountRoleEnum = (typeof ACCOUNT_ROLE)[keyof typeof ACCOUNT_ROLE];
