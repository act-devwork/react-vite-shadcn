'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createContext, useContext, useState, type MouseEvent, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ConfirmModalOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  successMessage?: string;
  errorMessage?: string;
  closeBeforeConfirm?: boolean;
}

interface ConfirmModalContextType {
  open: (options: ConfirmModalOptions) => void;
  close: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(undefined);

export function ConfirmModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmModalOptions>({});
  const [isLoading, setIsLoading] = useState(false);

  const resetAndClose = () => {
    setIsOpen(false);
    setOptions({});
    setIsLoading(false);
  };

  const open = (modalOptions: ConfirmModalOptions) => {
    setOptions(modalOptions);
    setIsOpen(true);
  };

  const close = () => {
    if (isLoading) return;

    resetAndClose();
  };

  const handleConfirm = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isLoading) return;
    if (!options.onConfirm) {
      resetAndClose();
      return;
    }

    const closesBeforeConfirm = Boolean(options.closeBeforeConfirm);

    try {
      setIsLoading(true);
      if (closesBeforeConfirm) {
        resetAndClose();
      }
      await options.onConfirm();
    } catch {
      // Mutation hooks own user-facing error feedback.
    } finally {
      if (!closesBeforeConfirm) {
        resetAndClose();
      }
    }
  };

  const handleCancel = () => {
    options.onCancel?.();
    close();
  };

  const value = {
    open,
    close,
  };

  return (
    <ConfirmModalContext.Provider value={value}>
      {children}

      <AlertDialog
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (isLoading) return;
          if (nextOpen) {
            setIsOpen(true);
          } else {
            resetAndClose();
          }
        }}
      >
        <AlertDialogContent className="sm:max-w-125">
          <AlertDialogHeader>
            <AlertDialogTitle
              className={options.variant === 'destructive' ? 'text-destructive' : ''}
            >
              {options.title || 'Confirm'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              {options.description || 'Are you sure you want to perform this action?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
              {options.cancelText || 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isLoading}
              aria-busy={isLoading}
              className={
                options.variant === 'destructive'
                  ? 'bg-destructive hover:bg-destructive/90 focus:ring-destructive/20'
                  : ''
              }
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {options.confirmText || 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmModalContext.Provider>
  );
}

export function useConfirmModal() {
  const context = useContext(ConfirmModalContext);

  if (!context) {
    throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
  }

  return context;
}
