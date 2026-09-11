import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useMutation } from '@tanstack/react-query';
import type { Account } from '@/types/account';
import { accountService } from '@/services';
import { LazyLoadSuspense } from '@/components/common/lazy-load-suspense';
import { Button } from '@/components/ui/button';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();
  const isAccessTokenValid = accessToken !== '';

  const {
    mutate: getUserInfo,
    isError,
    isIdle,
    isPending,
  } = useMutation({
    mutationFn: accountService.getAccountInfo,
    onSuccess: (data: Account) => {
      setUser(data);
    },
  });

  useEffect(() => {
    if (accessToken !== '') {
      getUserInfo();
    }
  }, [accessToken, getUserInfo]);

  if (!isAccessTokenValid && location.pathname !== '/auth/login') {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAccessTokenValid && (isIdle || isPending)) {
    return <LazyLoadSuspense />;
  }

  if (isAccessTokenValid && isError) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">Unable to load your account</h1>
          <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
        </div>
        <Button onClick={() => getUserInfo()}>Try again</Button>
      </div>
    );
  }

  return <>{children}</>;
}
