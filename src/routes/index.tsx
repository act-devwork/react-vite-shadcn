import { LazyLoadSuspense } from '@/components/common/lazy-load-suspense';
// import AuthProvider from '@/components/providers/auth-provider';
// import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteTree from './route-tree';

export function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        {/* <Suspense fallback={<LazyLoadSuspense />}> */}
          <RouteTree />
        {/* </Suspense> */}
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}
