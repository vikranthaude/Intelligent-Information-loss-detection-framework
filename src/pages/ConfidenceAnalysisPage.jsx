import React from 'react';
import { 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Layers, 
  GitFork, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { CONFIDENCE_FIELDS_DATA } from '../../src/data/mockAnalytics';
import { useAnalysis } from '../../src/context/AnalysisContext';
import { getConfidenceColor } from '../utils/formatters';

export function ConfidenceAnalysisPage() {
  const { navigateTo, confidenceThresholds } = useAnalysis();

  const circularMetrics = [
    { title: 'Document Confidence', score: 94, icon: FileText, desc: 'Overall document integrity', color: '#10b981' },
    { title: 'Extraction Confidence', score: 97, icon: Layers, desc: 'OCR & token recognition', color: '#3b82f6' },
    { title: 'Schema Mapping Conf.', score: 89, icon: GitFork, desc: 'Column alignment precision', color: '#f59e0b' },
    { title: 'Comparison Accuracy', score: 96, icon: ShieldCheck, desc: 'Diff cross-validation', color: '#7c3aed' },
  ];

  const barChartData = CONFIDENCE_FIELDS_DATA.map(item => ({
    name: item.fieldName,
    confidence: item.confidence,
    risk: item.riskLevel,
  }));

  const getBarColor = (val) => {
    if (val >= confidenceThresholds.high) return '#10b981';
    if (val >= confidenceThresholds.medium) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div>
      <PageHeader
        title="Probabilistic Confidence Analysis"
        subtitle="Multi-tier confidence scoring measuring entity extraction certainty, schema alignment embeddings, and character-level discrepancy risks."
        showProjectBadge={true}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigateTo('settings')}
        >
          Adjust Thresholds
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('reports')}
        >
          View Explainable Report →
        </Button>
      </PageHeader>

      <WorkflowStepper currentStage="confidence" />

      {/* 4 Circular Progress Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {circularMetrics.map((item) => {
          const Icon = item.icon;
          const strokeDashoffset = 282.7 - (282.7 * item.score) / 100;

          return (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm hover:border-slate-300 transition-all flex flex-col items-center text-center justify-between"
            >
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase text-[10px]">{item.title}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>

              {/* Circular Gauge Graphic */}
              <div className="relative w-28 h-28 my-2 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    {item.score}%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Confidence
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Field Confidence Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Field-Level Confidence Distribution</h3>
            <p className="text-xs text-slate-500">
              Interactive distribution showing high (≥90%), medium (70-89%), and high-risk (&lt;70%) fields
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> High (≥{confidenceThresholds.high}%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Med ({confidenceThresholds.medium}-{confidenceThresholds.high - 1}%)
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Low (&lt;{confidenceThresholds.medium}%)
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="confidence" radius={[6, 6, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.confidence)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confidence Risk & Recommendation Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Confidence & Risk Matrix</h3>
            <p className="text-xs text-slate-500">Automated triage recommendations based on probabilistic threshold cutoffs</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Field Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Confidence Score</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4 sm:px-6">AI Automated Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {CONFIDENCE_FIELDS_DATA.map((item, idx) => {
                const style = getConfidenceColor(item.confidence);
                const isHighRisk = item.riskLevel === 'High';
                const isMediumRisk = item.riskLevel === 'Medium';

                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      {item.fieldName}
                      <div className="text-[11px] font-mono font-normal text-slate-400 mt-0.5">
                        {item.sampleValue}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {item.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${item.confidence}%`, backgroundColor: style.fill }}
                          />
                        </div>
                        <span className="font-bold font-mono text-slate-900">
                          {item.confidence}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isHighRisk
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isMediumRisk
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {isHighRisk && <AlertCircle className="w-3 h-3 text-rose-500" />}
                        {isMediumRisk && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                        {!isHighRisk && !isMediumRisk && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        {item.riskLevel} Risk
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700">
                      {item.recommendation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
