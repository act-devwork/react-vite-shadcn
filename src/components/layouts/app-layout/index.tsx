import { Outlet } from 'react-router-dom';
import { LazyLoadSuspense } from '@/components/common/lazy-load-suspense';
import { Suspense } from 'react';

export default function AppLayout() {
  return (
    <>
      <Suspense fallback={<LazyLoadSuspense />}>
        <Outlet />
      </Suspense>
    </>
  );
}
