import { AppRoutes } from '@/routes';
import { ToastContainer, Slide } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfirmModalProvider } from './components/providers/confirm-modal-provider';
import { useThemeStore } from './stores/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  const { theme } = useThemeStore();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfirmModalProvider>
          <AppRoutes />
        </ConfirmModalProvider>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          theme={theme}
          transition={Slide}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
