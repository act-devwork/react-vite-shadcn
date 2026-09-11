import CheckAuth from '@/components/auth/check-auth';
import AppLayout from '@/components/layouts/app-layout';
import NotFoundPage from '@/views/404';
import { Route, Routes } from 'react-router-dom';
import {HomePage} from './route-pages';

export default function RouteTree() {
  return (
    <Routes>
      <Route element={<CheckAuth />}>
        {/* <Route path="auth/login" element={<LoginPage />} /> */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
