import { useAuthStore } from '@/stores/auth';
import { ACCOUNT_ROLE } from '@/types/account';

export default function useRole() {
  const role = useAuthStore((state) => state.user?.role);

  const isAdmin = role === ACCOUNT_ROLE.ADMIN;
  const isUser = role === ACCOUNT_ROLE.USER;
  return {
    role,
    isAdmin,
    isUser,
  };
}
