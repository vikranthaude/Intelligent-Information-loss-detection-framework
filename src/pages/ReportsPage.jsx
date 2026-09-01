import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  FileSpreadsheet, 
  Printer, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Layers, 
  Sparkles, 
  BrainCircuit,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { exportReportAsCsv, exportReportAsJson, triggerPrintReport } from '../services/exportService';

export function ReportsPage() {
  const { comparisonData, activeDocument } = useAnalysis();
  const { addToast } = useToast();

  const report = comparisonData?.reportSections || {
    overview: {
      analysisCompletedAt: new Date().toISOString(),
      totalIssues: 14,
      criticalIssues: 3,
      warnings: 6,
      minorIssues: 5,
      overallDataReliability: 92,
      processingDurationMs: 1420,
      modelEngine: 'InfoGuard-Neural-LossNet-v4.2',
    },
    section1Missing: [],
    section2Duplicated: [],
    section3Transformation: [],
    section4SchemaMapping: [],
    section5AiExplanations: []
  };

  const handleDownloadCsv = () => {
    exportReportAsCsv(comparisonData?.items || [], activeDocument?.name?.replace(/\.[^/.]+$/, ''));
    addToast({
      title: 'CSV Exported',
      message: 'Information loss audit report exported to CSV.',
      type: 'success',
    });
  };

  const handleDownloadPdf = () => {
    triggerPrintReport();
    addToast({
      title: 'Print / Save PDF',
      message: 'Opening system print dialog for executive PDF report generation.',
      type: 'info',
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Report Link Copied',
      message: 'Executive audit link copied to clipboard.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="no-print">
        <PageHeader
          title="Explainable Information-Loss Report"
          subtitle="AI-generated audit report detailing missing fields, transformation discrepancies, schema anomalies, and causal explanations with remediation steps."
          showProjectBadge={true}
        >
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={handleDownloadPdf}
          >
            Download PDF Report
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FileSpreadsheet}
            onClick={handleDownloadCsv}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Share2}
            onClick={handleShare}
          >
            Share Report
          </Button>
        </PageHeader>

        <WorkflowStepper currentStage="report" />
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm p-6 sm:p-8 font-sans space-y-8">
        {/* Report Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                AUDIT REF: INFOGUARD-XAI-2026-88
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Official Academic Framework Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Intelligent Information-Loss Detection Framework
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Document: <strong className="text-slate-800">{activeDocument?.name}</strong> • Engine: <span className="font-mono text-blue-600">{report.overview.modelEngine}</span>
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-slate-500">
            <div>Generated on: <strong className="text-slate-700">{new Date(report.overview.analysisCompletedAt).toLocaleDateString()}</strong></div>
            <div className="text-emerald-600 font-semibold mt-0.5">● Analysis Completed Successfully</div>
          </div>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Total Issues</span>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">{report.overview.totalIssues}</div>
            <span className="text-[11px] text-slate-500">Detected anomalies</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-rose-600">Critical Issues</span>
            <div className="text-xl font-extrabold text-rose-700 mt-0.5 font-mono">{report.overview.criticalIssues}</div>
            <span className="text-[11px] text-rose-600">High regulatory risk</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-amber-600">Warnings</span>
            <div className="text-xl font-extrabold text-amber-700 mt-0.5 font-mono">{report.overview.warnings || 6}</div>
            <span className="text-[11px] text-amber-600">Manual review</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-blue-600">Minor Issues</span>
            <div className="text-xl font-extrabold text-blue-700 mt-0.5 font-mono">{report.overview.minorIssues || 5}</div>
            <span className="text-[11px] text-blue-600">Format variations</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-600">Data Reliability</span>
            <div className="text-xl font-extrabold text-emerald-700 mt-0.5 font-mono">{report.overview.overallDataReliability}%</div>
            <span className="text-[11px] text-emerald-600">Calculated health</span>
          </div>
        </div>

        {/* REPORT SECTION 1: Missing Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-bold text-slate-900 text-sm">Report Section 1: Missing Information (Omission Loss)</h3>
          </div>
          <div className="space-y-2">
            {report.section1Missing?.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-900 font-mono">{item.field}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 shrink-0">{item.confidence}% Conf.</span>
              </div>
            ))}
          </div>
        </div>

        {/* REPORT SECTION 2: Duplicated Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-bold text-slate-900 text-sm">Report Section 2: Duplicated Information (Redundancy Anomaly)</h3>
          </div>
          <div className="space-y-2">
            {report.section2Duplicated?.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-900 font-mono">{item.field}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200">
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 shrink-0">{item.confidence}% Conf.</span>
              </div>
            ))}
          </div>
        </div>

        {/* REPORT SECTION 3: Incorrect Transformation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-bold text-slate-900 text-sm">Report Section 3: Incorrect Transformation (Corruption & Transposition)</h3>
          </div>
          <div className="space-y-2">
            {report.section3Transformation?.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-900 font-mono">{item.field}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      {item.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-slate-700 font-mono text-[11px]">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Original: <strong>{item.original}</strong></span>
                    <span>→</span>
                    <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200 font-bold">Extracted: {item.extracted}</span>
                  </div>
                  <p className="text-slate-600 mt-1.5 leading-relaxed">{item.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 shrink-0">{item.confidence}% Conf.</span>
              </div>
            ))}
          </div>
        </div>

        {/* REPORT SECTION 4: Incorrect Schema Mapping */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-bold text-slate-900 text-sm">Report Section 4: Incorrect Schema Mapping (Semantic Misalignment)</h3>
          </div>
          <div className="space-y-2">
            {report.section4SchemaMapping?.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900 font-mono">{item.sourceField}</span>
                    <span>mapped to</span>
                    <span className="font-bold text-rose-800 font-mono">{item.targetField}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      Expected: {item.expectedField}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 shrink-0">{item.confidence}% Conf.</span>
              </div>
            ))}
          </div>
        </div>

        {/* REPORT SECTION 5: Explainable AI Diagnosis (What / Why / Impact / Solution) */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                5
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Report Section 5: Explainable AI (XAI) Causal Breakdown</h3>
                <p className="text-xs text-slate-500">Deep neural explanations covering causal provenance, downstream risks, and remediation</p>
              </div>
            </div>
            <Badge variant="ai">Neural XAI Engine</Badge>
          </div>

          <div className="space-y-4">
            {report.section5AiExplanations?.map((xai) => (
              <div key={xai.id} className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm pb-2 border-b border-slate-200">
                  <BrainCircuit className="w-4 h-4 text-purple-600" />
                  <span>{xai.issueTitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 text-[11px] mb-1 text-blue-700">What Happened:</div>
                    <p className="text-slate-600 leading-relaxed">{xai.whatHappened}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 text-[11px] mb-1 text-purple-700">Why It May Have Happened:</div>
                    <p className="text-slate-600 leading-relaxed">{xai.whyItHappened}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 text-[11px] mb-1 text-amber-700">Potential Impact:</div>
                    <p className="text-slate-600 leading-relaxed">{xai.potentialImpact}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800 text-[11px] mb-1 text-emerald-700">Suggested Solution:</div>
                    <p className="text-slate-600 leading-relaxed">{xai.suggestedSolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
