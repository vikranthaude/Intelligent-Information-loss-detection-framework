/**
 * Formatting utility functions
 */

export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getConfidenceColor(score) {
  if (score >= 90) {
    return {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      fill: '#10b981',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      label: 'High Confidence',
    };
  } else if (score >= 70) {
    return {
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      fill: '#f59e0b',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      label: 'Medium Confidence',
    };
  } else {
    return {
      text: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      fill: '#ef4444',
      badge: 'bg-rose-100 text-rose-800 border-rose-300',
      label: 'Low Confidence (Review)',
    };
  }
}

export function getIssueTypeStyle(type) {
  switch (type) {
    case 'matched':
    case 'Matched':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Correctly Matched',
      };
    case 'missing':
    case 'Missing Information':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        label: 'Missing Information',
      };
    case 'transformation':
    case 'Incorrect Transformation':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Incorrect Transformation',
      };
    case 'duplicate':
    case 'Duplicated Information':
      return {
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        dot: 'bg-purple-500',
        label: 'Duplicated Information',
      };
    case 'mapping':
    case 'Incorrect Schema Mapping':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        label: 'Schema Mapping Issue',
      };
    default:
      return {
        bg: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-500',
        label: type,
      };
  }
}

export function getSeverityBadge(severity) {
  switch (severity?.toLowerCase()) {
    case 'critical':
    case 'high':
      return {
        badge: 'bg-red-50 text-red-700 border-red-200 font-semibold',
        dot: 'bg-red-500',
        label: 'Critical',
      };
    case 'warning':
    case 'medium':
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
        dot: 'bg-amber-500',
        label: 'Warning',
      };
    case 'minor':
    case 'low':
      return {
        badge: 'bg-blue-50 text-blue-700 border-blue-200 font-medium',
        dot: 'bg-blue-500',
        label: 'Minor',
      };
    default:
      return {
        badge: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-500',
        label: 'Normal',
      };
  }
}
