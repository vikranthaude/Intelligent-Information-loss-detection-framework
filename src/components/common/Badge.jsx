import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-rose-50 text-rose-700 border-rose-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse-subtle',
    ai: 'bg-purple-50 text-purple-700 border-purple-200',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  };

  const dotColors = {
    default: 'bg-slate-400',
    verified: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500',
    processing: 'bg-blue-500 animate-ping',
    ai: 'bg-purple-500',
    outline: 'bg-slate-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-md gap-1.5',
    md: 'text-xs px-2.5 py-1 font-medium rounded-md gap-1.5',
    lg: 'text-sm px-3 py-1.5 font-medium rounded-lg gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border font-sans select-none',
        variants[variant] || variants.default,
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant] || dotColors.default)} />
      )}
      <span>{children}</span>
    </span>
  );
}
