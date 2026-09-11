import { LazyLoadSuspense } from '@/components/common/lazy-load-suspense';
import { hasAccess, type AccessPolicy } from '@/configs/access-policy';
import useRole from '@/hooks/useRole';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAccessProps {
  policy: AccessPolicy;
}

export default function RequireAccess({ policy }: RequireAccessProps) {
  const { role } = useRole();

  if (!role) {
    return <LazyLoadSuspense />;
  }

  if (!hasAccess(policy, role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
