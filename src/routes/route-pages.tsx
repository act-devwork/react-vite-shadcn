import withErrorBoundary from '@/components/errors/with-error-boundary';
import { lazy, type ComponentType } from 'react';

function lazyPage(loader: () => Promise<{ default: ComponentType }>) {
  return withErrorBoundary(lazy(loader));
}

export const HomePage = lazyPage(() => import('@/views/home'));
