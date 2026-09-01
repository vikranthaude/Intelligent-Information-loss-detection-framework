import React from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { RECENT_ANALYSES } from '../../data/mockAnalytics';
import { Badge } from '../common/Badge';
import { useAnalysis } from '../../context/AnalysisContext';
import { exportReportAsCsv } from '../../services/exportService';
import { useToast } from '../../context/ToastContext';

export function RecentAnalysisTable() {
  const { selectDocument, navigateTo, comparisonData } = useAnalysis();
  const { addToast } = useToast();

  const handleView = (docId) => {
    selectDocument(docId);
    navigateTo('comparison');
  };

  const handleDownload = (e, item) => {
    e.stopPropagation();
    exportReportAsCsv(comparisonData?.items || [], item.name.replace(/\.[^/.]+$/, ''));
    addToast({
      title: 'Report Exported',
      message: `Exported loss detection audit trail for ${item.name}`,
      type: 'success',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="verified" dot>Verified</Badge>;
      case 'Warning':
        return <Badge variant="warning" dot>Warning</Badge>;
      case 'Critical':
        return <Badge variant="critical" dot>Critical Issues</Badge>;
      default:
        return <Badge variant="processing" dot>Processing</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden mb-8">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Recent Analysis</h3>
          <p className="text-xs text-slate-500">Live document transformation and audit logs</p>
        </div>
        <button
          onClick={() => navigateTo('history')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group self-start sm:self-auto"
        >
          <span>View All History</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 sm:px-6">Document Name</th>
              <th className="py-3 px-4">Document Type</th>
              <th className="py-3 px-4">Analysis Date</th>
              <th className="py-3 px-4">Confidence Score</th>
              <th className="py-3 px-4">Issues Found</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {RECENT_ANALYSES.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleView(item.id)}
                className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </span>
                      <div className="text-[11px] text-slate-400">
                        {item.domain} • {item.size}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {item.type}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-500">
                  {item.date}
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          item.confidence >= 90
                            ? 'bg-emerald-500'
                            : item.confidence >= 70
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800 font-mono">
                      {item.confidence}%
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  {item.issues > 0 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      {item.issues} {item.issues === 1 ? 'issue' : 'issues'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      0 issues
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4">
                  {getStatusBadge(item.status)}
                </td>

                <td className="py-3.5 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleView(item.id)}
                      title="View Details"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDownload(e, item)}
                      title="Download Report"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
