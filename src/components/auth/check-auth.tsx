import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

export default function CheckAuth() {
  const { getIsAccessTokenValid } = useAuthStore();
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  if (getIsAccessTokenValid() && path === 'auth') {
    return <Navigate to="/" replace />;
  }

  if (!getIsAccessTokenValid() && path !== 'auth') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
