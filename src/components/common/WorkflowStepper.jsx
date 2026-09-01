import React from 'react';
import { 
  UploadCloud, 
  FileSearch, 
  Layers, 
  GitFork, 
  GitCompare, 
  AlertTriangle, 
  Target, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const WORKFLOW_STAGES = [
  { id: 'upload', name: 'Upload Document', icon: UploadCloud, page: 'upload' },
  { id: 'parsing', name: 'Document Parsing', icon: FileSearch, page: 'parser' },
  { id: 'extraction', name: 'Structured Extraction', icon: Layers, page: 'parser' },
  { id: 'mapping', name: 'Schema Mapping', icon: GitFork, page: 'mapper' },
  { id: 'comparison', name: 'AI Comparison', icon: GitCompare, page: 'comparison' },
  { id: 'detection', name: 'Loss Detection', icon: AlertTriangle, page: 'comparison' },
  { id: 'confidence', name: 'Confidence Analysis', icon: Target, page: 'confidence' },
  { id: 'report', name: 'Explainable Report', icon: FileText, page: 'reports' },
];

export function WorkflowStepper({ currentStage }) {
  const { navigateTo } = useAnalysis();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft-sm p-3.5 mb-6 overflow-x-auto">
      <div className="flex items-center min-w-[840px] justify-between text-xs">
        {WORKFLOW_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id || currentStage === stage.page;
          const isPast = WORKFLOW_STAGES.findIndex(s => s.id === currentStage || s.page === currentStage) > idx;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => navigateTo(stage.page)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all text-left group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                    : isPast
                    ? 'text-slate-700 hover:bg-slate-50 font-medium'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isPast
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{stage.name}</span>
              </button>

              {idx < WORKFLOW_STAGES.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
