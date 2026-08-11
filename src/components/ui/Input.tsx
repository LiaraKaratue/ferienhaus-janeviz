import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div data-ev-id="ev_332ead9196" className="flex flex-col gap-1.5">
        {label &&
        <label data-ev-id="ev_3a6eadd08a" htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        }
        <input data-ev-id="ev_1322a733eb"
        ref={ref}
        id={inputId}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...props} />

        {error && <p data-ev-id="ev_addde263d4" className="text-sm text-destructive">{error}</p>}
      </div>);

  }
);

Input.displayName = 'Input';