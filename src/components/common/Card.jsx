import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  children,
  className,
  header,
  headerAction,
  footer,
  hoverable = false,
  padding = 'normal',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200/90 shadow-soft-sm transition-all duration-200',
        hoverable && 'hover:shadow-soft-md hover:border-slate-300 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {(header || headerAction) && (
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between gap-4">
          {typeof header === 'string' ? (
            <h3 className="font-semibold text-slate-900 text-base">{header}</h3>
          ) : (
            header
          )}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={paddings[padding]}>{children}</div>
      {footer && (
        <div className="px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
}
