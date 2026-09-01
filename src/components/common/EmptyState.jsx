import React from 'react';
import { FileQuestion, AlertCircle, RefreshCw, Upload } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = 'No Documents Uploaded Yet',
  description = 'Upload your first document to start AI-powered information loss detection.',
  actionLabel = 'Upload Document',
  onAction,
  icon: Icon = FileQuestion,
}) {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto my-6 shadow-soft-sm">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} icon={Upload} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Unable to Process Document',
  description = 'Please check the file format or schema mapping rules and try again.',
  onRetry,
}) {
  return (
    <div className="bg-white rounded-xl border border-rose-200 bg-rose-50/20 p-8 text-center max-w-md mx-auto my-6 shadow-soft-sm">
      <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mx-auto mb-3 border border-rose-200">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-xs text-slate-500 mb-5 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button onClick={onRetry} icon={RefreshCw} variant="outline" size="sm">
          Retry Processing
        </Button>
      )}
    </div>
  );
}
