import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div data-ev-id="ev_ae752e53d5"
  ref={ref}
  className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)}
  {...props} />


);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div data-ev-id="ev_60449a86cd" ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />

);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) =>
  <h3 data-ev-id="ev_9066c50c62" ref={ref} className={cn('text-xl font-semibold leading-none tracking-tight', className)} {...props} />

);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) =>
  <p data-ev-id="ev_2fbb5d154f" ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />

);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div data-ev-id="ev_d086cce83f" ref={ref} className={cn('p-6 pt-0', className)} {...props} />

);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div data-ev-id="ev_cecaf98bbb" ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />

);
CardFooter.displayName = 'CardFooter';