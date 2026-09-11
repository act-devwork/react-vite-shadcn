import { ACCOUNT_ROLE, type AccountRoleEnum } from '@/types/account';

export interface AccessPolicy {
  allowedRoles: readonly AccountRoleEnum[];
}

const allRoles = Object.values(ACCOUNT_ROLE);

export const ACCESS_POLICIES = {
  all: { allowedRoles: allRoles },
} as const satisfies Record<string, AccessPolicy>;

export function hasAccess(policy: AccessPolicy, authority?: AccountRoleEnum) {
  if (!authority || !policy.allowedRoles.includes(authority)) {
    return false;
  }
}
