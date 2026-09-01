import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSearch, 
  GitFork, 
  GitCompare, 
  Target, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAnalysis } from '../../context/AnalysisContext';

const STEP_ICONS = {
  'step-1': FileSearch,
  'step-2': GitFork,
  'step-3': GitCompare,
  'step-4': Target,
  'step-5': FileText,
};

export function PipelineProgressModal() {
  const {
    isPipelineModalOpen,
    closePipelineModal,
    isPipelineRunning,
    pipelineStepIndex,
    pipelineProgress,
    pipelineComplete,
    pipelineSteps,
    navigateTo,
    activeDocument
  } = useAnalysis();

  const handleNavigate = (page) => {
    closePipelineModal();
    navigateTo(page);
  };

  return (
    <Modal
      isOpen={isPipelineModalOpen}
      onClose={isPipelineRunning ? () => {} : closePipelineModal}
      maxWidth="max-w-2xl"
      showClose={!isPipelineRunning}
    >
      <div className="text-center pb-4 border-b border-slate-100">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Neural Loss Detection Pipeline</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          {pipelineComplete ? 'Analysis Completed Successfully' : 'Executing Information-Loss Detection'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          {pipelineComplete
            ? 'Full extraction, schema mapping alignment, and semantic discrepancy checks finished.'
            : `Processing document: ${activeDocument?.name || 'Uploaded Document'}`}
        </p>
      </div>

      {/* Steps List */}
      <div className="py-6 space-y-4">
        {pipelineSteps.map((step, idx) => {
          const Icon = STEP_ICONS[step.id] || FileSearch;
          const isFinished = pipelineComplete || idx < pipelineStepIndex;
          const isCurrent = !pipelineComplete && idx === pipelineStepIndex;
          const isPending = !pipelineComplete && idx > pipelineStepIndex;

          const currentPct = isFinished ? 100 : isCurrent ? pipelineProgress : 0;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'border-blue-400 bg-blue-50/50 shadow-soft-md ring-1 ring-blue-300'
                  : isFinished
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-slate-50/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isFinished
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">
                        Step {idx + 1}: {step.name}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-100 text-blue-700 animate-pulse">
                          Processing
                        </span>
                      )}
                      {isFinished && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-700">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-700">
                  {currentPct}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isFinished
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-blue-600'
                      : 'bg-slate-300'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${currentPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Actions */}
      {pipelineComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Found 4 discrepancies & 1 critical transposition error</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigate('comparison')}
            >
              View Comparison Engine
            </Button>
            <Button
              variant="ai"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => handleNavigate('reports')}
            >
              View Full Report
            </Button>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
