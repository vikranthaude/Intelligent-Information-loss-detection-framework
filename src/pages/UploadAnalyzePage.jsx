import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Database, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileType, 
  ShieldAlert,
  Info,
  Layers,
  FolderOpen
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { SAMPLE_DATASETS } from '../data/mockDocuments';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { formatBytes } from '../utils/formatters';

export function UploadAnalyzePage() {
  const { startPipelineAnalysis, selectDocument, activeDocument } = useAnalysis();
  const { addToast } = useToast();

  const [sourceFile, setSourceFile] = useState({
    name: 'Patient_Report.pdf',
    type: 'PDF',
    size: 2450000,
    status: 'Uploaded Successfully',
  });

  const [extractedFile, setExtractedFile] = useState({
    name: 'Patient_Extracted_Payload.json',
    type: 'JSON',
    size: 340000,
    status: 'Uploaded Successfully',
  });

  const [selectedDomain, setSelectedDomain] = useState('Healthcare');
  const [dragOverSource, setDragOverSource] = useState(false);
  const [dragOverExtracted, setDragOverExtracted] = useState(false);

  const sourceInputRef = useRef(null);
  const extractedInputRef = useRef(null);

  const handleSelectSample = (sample) => {
    selectDocument(sample.id);
    setSourceFile({
      name: sample.name,
      type: sample.type,
      size: sample.size,
      status: 'Uploaded Successfully',
    });
    setExtractedFile({
      name: `${sample.name.replace(/\.[^/.]+$/, '')}_Extracted_DB.json`,
      type: 'JSON',
      size: Math.round(sample.size * 0.15),
      status: 'Uploaded Successfully',
    });
    setSelectedDomain(sample.domain);
    addToast({
      title: 'Sample Loaded',
      message: `Loaded benchmark dataset: ${sample.name} (${sample.domain})`,
      type: 'info',
    });
  };

  const handleSourceUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSourceFile({
        name: file.name,
        type: file.name.split('.').pop().toUpperCase(),
        size: file.size,
        status: 'Uploaded Successfully',
      });
      addToast({
        title: 'Source Document Uploaded',
        message: `${file.name} ready for parsing`,
        type: 'success',
      });
    }
  };

  const handleExtractedUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setExtractedFile({
        name: file.name,
        type: file.name.split('.').pop().toUpperCase(),
        size: file.size,
        status: 'Uploaded Successfully',
      });
      addToast({
        title: 'Extracted Data Uploaded',
        message: `${file.name} registered for comparison`,
        type: 'success',
      });
    }
  };

  const handleStartAnalysis = () => {
    if (!sourceFile) {
      addToast({
        title: 'Source Required',
        message: 'Please upload or select an original source document.',
        type: 'warning',
      });
      return;
    }
    startPipelineAnalysis(activeDocument);
  };

  return (
    <div>
      <PageHeader
        title="Upload Document for Analysis"
        subtitle="Upload original source documents and compare them with extracted or database representations to detect missing values, transpositions, and schema mismatches."
        showProjectBadge={true}
      />

      <WorkflowStepper currentStage="upload" />

      {/* Preset Quick Loader Banner */}
      <div className="bg-white rounded-xl border border-blue-200 p-4.5 mb-6 shadow-soft-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Quick Benchmark Presets</h4>
              <p className="text-xs text-slate-500">
                Instantly load real-world multi-domain test cases with known transformation discrepancies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {SAMPLE_DATASETS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  activeDocument?.id === sample.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-soft-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <FileType className="w-3.5 h-3.5 opacity-80" />
                <span>{sample.name}</span>
                <span className={`text-[10px] px-1 rounded font-normal ${
                  activeDocument?.id === sample.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {sample.domain}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Upload Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* SECTION 1: Original Source Document */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Section 1: Original Source Document</h3>
                  <p className="text-[11px] text-slate-500">Unprocessed heterogeneous source file</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                Source Layer
              </span>
            </div>

            {/* Drag and Drop Zone */}
            <input
              type="file"
              ref={sourceInputRef}
              onChange={handleSourceUpload}
              accept=".pdf,.docx,.xlsx,.csv,.txt"
              className="hidden"
            />
            
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverSource(true); }}
              onDragLeave={() => setDragOverSource(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverSource(false);
                const file = e.dataTransfer.files[0];
                if (file) {
                  setSourceFile({
                    name: file.name,
                    type: file.name.split('.').pop().toUpperCase(),
                    size: file.size,
                    status: 'Uploaded Successfully',
                  });
                }
              }}
              onClick={() => sourceInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOverSource
                  ? 'border-blue-500 bg-blue-50/60'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-200">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800 text-sm mb-1">
                Drag and drop your document here
              </p>
              <p className="text-xs text-slate-400 mb-3">OR</p>
              <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); sourceInputRef.current?.click(); }}>
                Browse Files
              </Button>
              <p className="text-[11px] text-slate-400 mt-4">
                Supported formats: <strong className="text-slate-600">PDF, DOCX, XLSX, CSV, TXT</strong> (Max 50MB)
              </p>
            </div>
          </div>

          {/* Uploaded File Card */}
          {sourceFile && (
            <div className="mt-4 p-3.5 rounded-xl bg-blue-50/40 border border-blue-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-soft-sm">
                  {sourceFile.type}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 truncate max-w-xs">{sourceFile.name}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{formatBytes(sourceFile.size)}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {sourceFile.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSourceFile(null)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                title="Remove File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* SECTION 2: Extracted Data / Database Representation */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Section 2: Extracted Data / Database Representation</h3>
                  <p className="text-[11px] text-slate-500">Extracted database JSON, CSV record, or ETL dump</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                Target Layer
              </span>
            </div>

            {/* Drag and Drop Zone */}
            <input
              type="file"
              ref={extractedInputRef}
              onChange={handleExtractedUpload}
              accept=".json,.csv,.xlsx,.sql,.txt"
              className="hidden"
            />
            
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverExtracted(true); }}
              onDragLeave={() => setDragOverExtracted(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverExtracted(false);
                const file = e.dataTransfer.files[0];
                if (file) {
                  setExtractedFile({
                    name: file.name,
                    type: file.name.split('.').pop().toUpperCase(),
                    size: file.size,
                    status: 'Uploaded Successfully',
                  });
                }
              }}
              onClick={() => extractedInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOverExtracted
                  ? 'border-purple-500 bg-purple-50/60'
                  : 'border-slate-300 hover:border-purple-400 bg-slate-50/50 hover:bg-purple-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center mx-auto mb-3 border border-purple-200">
                <Database className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800 text-sm mb-1">
                Drag and drop your extracted representation
              </p>
              <p className="text-xs text-slate-400 mb-3">OR</p>
              <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); extractedInputRef.current?.click(); }}>
                Browse Files
              </Button>
              <p className="text-[11px] text-slate-400 mt-4">
                Supported formats: <strong className="text-slate-600">JSON, CSV, XLSX, SQL Dump, XML</strong>
              </p>
            </div>
          </div>

          {/* Uploaded File Card */}
          {extractedFile && (
            <div className="mt-4 p-3.5 rounded-xl bg-purple-50/40 border border-purple-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-soft-sm">
                  {extractedFile.type}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 truncate max-w-xs">{extractedFile.name}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{formatBytes(extractedFile.size)}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {extractedFile.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setExtractedFile(null)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                title="Remove File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Start AI Analysis CTA Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-soft-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Ready for 5-Stage Neural Loss Detection</h4>
            <p className="text-xs text-slate-500">
              Pipeline: Parsing → Schema Mapping → Content Comparison → Confidence Analysis → Explainable Report
            </p>
          </div>
        </div>

        <Button
          size="lg"
          variant="ai"
          icon={ArrowRight}
          iconPosition="right"
          onClick={handleStartAnalysis}
          className="w-full sm:w-auto px-8"
        >
          Start AI Analysis
        </Button>
      </div>
    </div>
  );
}
