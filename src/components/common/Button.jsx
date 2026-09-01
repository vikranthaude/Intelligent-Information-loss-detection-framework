import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-soft-sm hover:shadow-brand-glow focus:ring-blue-500 border border-blue-600',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-soft-sm hover:border-slate-300 focus:ring-slate-300',
    outline: 'bg-transparent hover:bg-blue-50/60 text-blue-600 border border-blue-200 hover:border-blue-400 focus:ring-blue-400',
    ai: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-soft-sm hover:shadow-ai-glow focus:ring-purple-500 border border-transparent',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-transparent focus:ring-slate-300',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-soft-sm focus:ring-rose-500 border border-rose-600',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-sm focus:ring-emerald-500 border border-emerald-600',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5 gap-1.5',
    sm: 'text-xs px-3 py-2 gap-1.5 font-medium',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
