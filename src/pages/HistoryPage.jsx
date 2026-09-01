import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Clock,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { exportReportAsCsv } from '../services/exportService';

export function HistoryPage() {
  const { 
    documents, 
    selectDocument, 
    navigateTo, 
    startPipelineAnalysis, 
    deleteDocumentFromState,
    comparisonData 
  } = useAnalysis();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [deleteTargetDoc, setDeleteTargetDoc] = useState(null);

  const filteredDocs = documents.filter(doc => {
    if (selectedType !== 'ALL' && doc.type !== selectedType) return false;
    if (selectedStatus !== 'ALL' && doc.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.domain.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleView = (doc) => {
    selectDocument(doc.id);
    navigateTo('comparison');
  };

  const handleDownload = (doc) => {
    exportReportAsCsv(comparisonData?.items || [], doc.name.replace(/\.[^/.]+$/, ''));
    addToast({
      title: 'Audit Report Downloaded',
      message: `Exported audit logs for ${doc.name}`,
      type: 'success',
    });
  };

  const handleReanalyze = (doc) => {
    selectDocument(doc.id);
    startPipelineAnalysis(doc);
  };

  const confirmDelete = () => {
    if (deleteTargetDoc) {
      deleteDocumentFromState(deleteTargetDoc.id);
      addToast({
        title: 'Document Deleted',
        message: `${deleteTargetDoc.name} removed from history registry.`,
        type: 'info',
      });
      setDeleteTargetDoc(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Analysis History & Audit Trail"
        subtitle="Complete historical ledger of document-to-database transformation analyses, accuracy scores, and detected discrepancies."
        showProjectBadge={true}
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('upload')}
        >
          + Analyze New File
        </Button>
      </PageHeader>

      <WorkflowStepper currentStage="history" />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-soft-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by document name, domain, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="PDF">PDF</option>
              <option value="XLSX">XLSX</option>
              <option value="DOCX">DOCX</option>
              <option value="CSV">CSV</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 sm:px-6">Document Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4">Date Processed</th>
                <th className="py-3.5 px-4">Issues Found</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => handleView(doc)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                        {doc.type}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {doc.name}
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {doc.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                    {doc.type}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {doc.domain}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(doc.uploadDate).toLocaleDateString()} {new Date(doc.uploadDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  <td className="py-3.5 px-4">
                    {doc.issuesCount?.total > 0 ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        {doc.issuesCount.total} ({doc.issuesCount.critical} critical)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        0 issues
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full bg-blue-600"
                          style={{ width: `${doc.overallConfidence}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800 font-mono">
                        {doc.overallConfidence}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={doc.status === 'Verified' ? 'verified' : doc.status === 'Warning' ? 'warning' : 'critical'} dot>
                      {doc.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleView(doc)}
                        title="View Details"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        title="Download Report"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReanalyze(doc)}
                        title="Re-analyze"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetDoc(doc)}
                        title="Delete Entry"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTargetDoc}
        onClose={() => setDeleteTargetDoc(null)}
        title="Confirm Document Deletion"
        subtitle="This action cannot be undone."
        maxWidth="max-w-md"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteTargetDoc(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={confirmDelete}
            >
              Delete Record
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          Are you sure you want to remove <strong className="text-slate-900">{deleteTargetDoc?.name}</strong> from the validation registry and purge its cached comparison graph?
        </p>
      </Modal>
    </div>
  );
}
