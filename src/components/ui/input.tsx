import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/index';

function Input({
  className,
  containerClassName,
  placeholderClassName,
  floatingPlaceholder = false,
  type,
  ...props
}: React.ComponentProps<'input'> & {
  containerClassName?: string;
  placeholderClassName?: string;
  floatingPlaceholder?: boolean;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={cn('relative', containerClassName)}>
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring/20 focus-visible:ring-ring/50 focus-visible:ring-0',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          floatingPlaceholder && 'peer placeholder:text-transparent',
          isPassword ? 'pr-10' : '',
          className,
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}

      {floatingPlaceholder && props.placeholder && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 left-3 peer-placeholder-shown:left-3 peer-focus:left-3 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground transition-[top,background-color,color,font-size,padding] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-background peer-focus:px-2 peer-focus:text-xs motion-reduce:transition-none line-clamp-1',
            placeholderClassName,
          )}
        >
          {props.placeholder}
        </span>
      )}
    </div>
  );
}

export { Input };
