import { cn } from '@/utils';
import { LoaderCircle } from 'lucide-react';
import type { SVGProps } from 'react';

export interface LoadingSpinnerProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const LoadingSpinner = ({ className, ...props }: LoadingSpinnerProps) => {
  return (
    <LoaderCircle {...props} className={cn('size-5 animate-spin motion-reduce:animate-none', className)} />
  );
};
