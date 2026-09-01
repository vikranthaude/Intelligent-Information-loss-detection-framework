import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export function PageHeader({
  title,
  subtitle,
  children,
  showProjectBadge = true,
  className,
}) {
  return (
    <div className={cn('mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4', className)}>
      <div>
        {showProjectBadge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-semibold text-blue-700 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Intelligent Information-Loss Detection Framework</span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 text-sm sm:text-base mt-1 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
