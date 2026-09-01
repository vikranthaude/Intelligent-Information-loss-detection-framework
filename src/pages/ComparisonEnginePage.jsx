import React, { useState } from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Layers, 
  Copy, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Search,
  BrainCircuit,
  X
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useAnalysis } from '../context/AnalysisContext';
import { getIssueTypeStyle, getSeverityBadge } from '../utils/formatters';

export function ComparisonEnginePage() {
  const { comparisonData, navigateTo } = useAnalysis();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const summary = comparisonData?.summary || {
    totalFields: 156,
    matched: 142,
    missing: 6,
    duplicated: 3,
    incorrectTransformation: 5,
    schemaMappingIssue: 4,
    reliabilityScore: 92.4,
  };

  const items = comparisonData?.items || [];

  const filteredItems = items.filter(item => {
    // Filter by type
    if (activeFilter !== 'all') {
      if (activeFilter === 'matched' && item.issueType !== 'matched') return false;
      if (activeFilter === 'missing' && item.issueType !== 'missing') return false;
      if (activeFilter === 'transformation' && item.issueType !== 'transformation') return false;
      if (activeFilter === 'duplicate' && item.issueType !== 'duplicate') return false;
      if (activeFilter === 'mapping' && item.issueType !== 'mapping') return false;
    }
    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.fieldName.toLowerCase().includes(q) ||
        (item.originalValue && item.originalValue.toLowerCase().includes(q)) ||
        (item.extractedValue && item.extractedValue.toLowerCase().includes(q)) ||
        (item.diffDetails && item.diffDetails.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div>
      <PageHeader
        title="AI Comparison & Information Loss Engine"
        subtitle="Compare original source document contents with target database representations to isolate character transpositions, omissions, and schema deviations."
        showProjectBadge={true}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigateTo('confidence')}
        >
          Confidence Analysis →
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('reports')}
        >
          Generate Explainable Report
        </Button>
      </PageHeader>

      <WorkflowStepper currentStage="comparison" />

      {/* Comparison Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-soft-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Fields</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">{summary.totalFields}</div>
          <span className="text-[10px] text-slate-500">100% Parsed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-soft-sm bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase">Matched</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-700 mt-1 font-mono">{summary.matched}</div>
          <span className="text-[10px] text-emerald-600">Parity verified</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-soft-sm bg-rose-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-rose-800 uppercase">Missing</span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-700 mt-1 font-mono">{summary.missing}</div>
          <span className="text-[10px] text-rose-600">Information Lost</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-soft-sm bg-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-800 uppercase">Transformed</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-700 mt-1 font-mono">{summary.incorrectTransformation}</div>
          <span className="text-[10px] text-amber-600">Altered tokens</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-soft-sm bg-purple-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-purple-800 uppercase">Duplicated</span>
            <span className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <div className="text-xl font-bold text-purple-700 mt-1 font-mono">{summary.duplicated}</div>
          <span className="text-[10px] text-purple-600">Redundant rows</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-soft-sm bg-blue-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-800 uppercase">Mapping Issue</span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-700 mt-1 font-mono">{summary.schemaMappingIssue}</div>
          <span className="text-[10px] text-blue-600">Wrong column</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-soft-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-soft-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Fields ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter('matched')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'matched'
                ? 'bg-emerald-600 text-white shadow-soft-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Matched
          </button>
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'missing'
                ? 'bg-rose-600 text-white shadow-soft-sm'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Missing Information
          </button>
          <button
            onClick={() => setActiveFilter('transformation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'transformation'
                ? 'bg-amber-600 text-white shadow-soft-sm'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Incorrect Transformation
          </button>
          <button
            onClick={() => setActiveFilter('duplicate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'duplicate'
                ? 'bg-purple-600 text-white shadow-soft-sm'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Duplicated
          </button>
          <button
            onClick={() => setActiveFilter('mapping')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === 'mapping'
                ? 'bg-blue-600 text-white shadow-soft-sm'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Schema Mapped
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search fields or values..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Split Comparison Screen */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-100/80 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider py-3 px-4">
          <div className="lg:col-span-3">Field & Category</div>
          <div className="lg:col-span-3">Original Document Content</div>
          <div className="lg:col-span-3">Extracted / Database Value</div>
          <div className="lg:col-span-2">Loss Type & Severity</div>
          <div className="lg:col-span-1 text-right">AI Diagnosis</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => {
            const style = getIssueTypeStyle(item.issueType);
            const sev = getSeverityBadge(item.severity);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedIssue(item)}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-0 p-4 items-center transition-colors cursor-pointer hover:bg-blue-50/30 ${
                  item.issueType === 'missing'
                    ? 'bg-rose-50/15'
                    : item.issueType === 'transformation'
                    ? 'bg-amber-50/15'
                    : item.issueType === 'duplicate'
                    ? 'bg-purple-50/15'
                    : item.issueType === 'mapping'
                    ? 'bg-blue-50/15'
                    : 'bg-white'
                }`}
              >
                {/* 1. Field Name & Category */}
                <div className="lg:col-span-3 pr-4">
                  <div className="font-bold text-xs text-slate-900">{item.fieldName}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.category}</div>
                </div>

                {/* 2. Original Value */}
                <div className="lg:col-span-3 pr-4">
                  <div className="text-xs font-mono bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-800 break-words">
                    {item.originalValue}
                  </div>
                </div>

                {/* 3. Extracted Value */}
                <div className="lg:col-span-3 pr-4">
                  <div className={`text-xs font-mono p-2 rounded-lg border break-words ${
                    item.issueType === 'missing'
                      ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold italic'
                      : item.issueType === 'transformation'
                      ? 'bg-amber-50 border-amber-200 text-amber-800 font-bold'
                      : item.issueType === 'duplicate'
                      ? 'bg-purple-50 border-purple-200 text-purple-800'
                      : item.issueType === 'mapping'
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                  }`}>
                    {item.extractedValue}
                  </div>
                </div>

                {/* 4. Loss Type & Severity */}
                <div className="lg:col-span-2 pr-2 flex flex-col gap-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${style.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded border ${sev.badge}`}>
                      {sev.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.confidence}% Conf.
                    </span>
                  </div>
                </div>

                {/* 5. Action */}
                <div className="lg:col-span-1 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedIssue(item); }}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100/70 inline-flex items-center gap-1 text-xs font-semibold"
                  >
                    <BrainCircuit className="w-4 h-4" />
                    <span className="hidden xl:inline">Explain</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Issue Details Modal */}
      <Modal
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        title={`AI Root Cause Analysis: ${selectedIssue?.fieldName}`}
        subtitle={`Discrepancy Category: ${selectedIssue?.issueType.toUpperCase()}`}
        maxWidth="max-w-xl"
      >
        {selectedIssue && (
          <div className="space-y-4 text-xs">
            {/* Value Side by Side Comparison */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Original Document</span>
                <div className="font-mono font-bold text-slate-800 mt-1 break-words">
                  {selectedIssue.originalValue}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Extracted DB Value</span>
                <div className="font-mono font-bold text-rose-700 mt-1 break-words">
                  {selectedIssue.extractedValue}
                </div>
              </div>
            </div>

            {/* Explainable 4-tier Diagnostic */}
            <div className="space-y-3">
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
                <div className="font-bold text-blue-900 text-xs mb-1">1. What Happened</div>
                <p className="text-slate-600 leading-relaxed">{selectedIssue.explanation?.whatHappened}</p>
              </div>

              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200">
                <div className="font-bold text-purple-900 text-xs mb-1">2. Why It May Have Happened</div>
                <p className="text-slate-600 leading-relaxed">{selectedIssue.explanation?.why}</p>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200">
                <div className="font-bold text-amber-900 text-xs mb-1">3. Potential Regulatory / Operational Impact</div>
                <p className="text-slate-600 leading-relaxed">{selectedIssue.explanation?.impact}</p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <div className="font-bold text-emerald-900 text-xs mb-1">4. Suggested Automated Solution</div>
                <p className="text-slate-600 leading-relaxed">{selectedIssue.explanation?.solution}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
