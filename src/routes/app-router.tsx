import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('@/views/home-view')).HomeView }) },
      {
        path: 'create',
        lazy: async () => ({ Component: (await import('@/features/video-generator/views/create-video-view')).CreateVideoView }),
      },
      { path: 'projects', lazy: async () => ({ Component: (await import('@/views/projects-view')).ProjectsView }) },
      { path: 'templates', lazy: async () => ({ Component: (await import('@/views/templates-view')).TemplatesView }) },
      { path: 'settings', lazy: async () => ({ Component: (await import('@/views/settings-view')).SettingsView }) },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: '*', lazy: async () => ({ Component: (await import('@/views/not-found-view')).NotFoundView }) },
    ],
  },
])
