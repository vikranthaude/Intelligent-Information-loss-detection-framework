import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  Save, 
  Layers, 
  Database,
  RefreshCw,
  Link as LinkIcon,
  Unlink,
  Check
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { runAutoMapAi } from '../services/analysisService';

export function SchemaMapperPage() {
  const { schemaData, navigateTo } = useAnalysis();
  const { addToast } = useToast();

  const [sourceFields, setSourceFields] = useState(schemaData?.sourceFields || []);
  const [targetFields, setTargetFields] = useState(schemaData?.targetFields || []);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [isAutoMapping, setIsAutoMapping] = useState(false);

  const handleAutoMap = async () => {
    setIsAutoMapping(true);
    try {
      const res = await runAutoMapAi(sourceFields, targetFields);
      // Remap Customer_ID to patient_record_id and map address
      setSourceFields(prev => prev.map(f => {
        if (f.id === 'src_7') return { ...f, mappedTo: 'tgt_9', status: 'correct', confidence: 95 };
        if (f.id === 'src_6') return { ...f, mappedTo: 'tgt_6', status: 'correct', confidence: 88 };
        return f;
      }));
      addToast({
        title: 'Auto-Map Completed',
        message: res.message,
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Auto-Map Error',
        message: 'Failed to run embedding mapping.',
        type: 'error',
      });
    } finally {
      setIsAutoMapping(false);
    }
  };

  const handleManualMap = (tgtId) => {
    if (!selectedSourceId) {
      addToast({
        title: 'Select Source Field First',
        message: 'Click an extracted field on the left, then click the target schema field on the right.',
        type: 'info',
      });
      return;
    }

    setSourceFields(prev => prev.map(f => {
      if (f.id === selectedSourceId) {
        return {
          ...f,
          mappedTo: tgtId,
          status: 'correct',
          confidence: 92,
        };
      }
      return f;
    }));

    setSelectedSourceId(null);
    addToast({
      title: 'Mapping Connected',
      message: 'Schema relation established.',
      type: 'success',
    });
  };

  const handleSaveMapping = () => {
    addToast({
      title: 'Schema Mapping Saved',
      message: 'Schema mapping configuration persisted to pipeline state.',
      type: 'success',
    });
  };

  return (
    <div>
      <PageHeader
        title="Schema Mapping Studio"
        subtitle="Align extracted document fields with target database schema definitions to ensure lossless structured ingestion."
        showProjectBadge={true}
      >
        <Button
          variant="ai"
          size="sm"
          icon={Sparkles}
          isLoading={isAutoMapping}
          onClick={handleAutoMap}
        >
          Auto Map Using AI
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={Save}
          onClick={handleSaveMapping}
        >
          Save Mapping
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('comparison')}
        >
          Go to AI Comparison →
        </Button>
      </PageHeader>

      <WorkflowStepper currentStage="mapping" />

      {/* AI Recommendation Alert Cards */}
      <div className="mb-6 space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          AI Semantic Mapping Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemaData?.aiRecommendations?.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all ${
                rec.type === 'critical'
                  ? 'bg-rose-50/50 border-rose-200'
                  : rec.type === 'warning'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${
                  rec.type === 'critical' ? 'text-rose-800' : rec.type === 'warning' ? 'text-amber-800' : 'text-emerald-800'
                }`}>
                  {rec.title}
                </span>
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                  {rec.confidence}% Conf.
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {rec.description}
              </p>
              <button
                onClick={handleAutoMap}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group"
              >
                <span>{rec.suggestedAction}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Mapping Workspace */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-900 text-sm">Visual Schema Connector</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct Mapping
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Unmapped / Low Conf
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Schema Mismatch
            </span>
          </div>
        </div>

        {/* Two Columns Grid: Extracted (Left) vs Schema (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* LEFT: Extracted Document Fields */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Extracted Document Fields ({sourceFields.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Source Schema</span>
            </div>

            <div className="space-y-2.5">
              {sourceFields.map((src) => {
                const isSelected = selectedSourceId === src.id;
                const isMismatch = src.status === 'mismatch';
                const isUnmapped = src.status === 'unmapped' || !src.mappedTo;

                return (
                  <div
                    key={src.id}
                    onClick={() => setSelectedSourceId(isSelected ? null : src.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-300 shadow-soft-sm'
                        : isMismatch
                        ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50'
                        : isUnmapped
                        ? 'border-amber-300 bg-amber-50/30 hover:bg-amber-50'
                        : 'border-slate-200 bg-slate-50/40 hover:bg-blue-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800 font-mono">{src.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-mono">
                          {src.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Sample: <span className="font-medium text-slate-700">{src.sample}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isMismatch
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : isUnmapped
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}>
                        {src.confidence}%
                      </span>
                      <div className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Database Schema Fields */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Database Schema Target ({targetFields.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">PostgreSQL V14</span>
            </div>

            <div className="space-y-2.5">
              {targetFields.map((tgt) => {
                const mappedSource = sourceFields.find(s => s.mappedTo === tgt.id);
                const isMismatch = mappedSource?.status === 'mismatch' || tgt.warning;

                return (
                  <div
                    key={tgt.id}
                    onClick={() => handleManualMap(tgt.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isMismatch
                        ? 'border-rose-300 bg-rose-50/40'
                        : mappedSource
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-dashed border-slate-300 bg-white hover:border-blue-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800 font-mono">{tgt.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-mono border border-purple-100">
                          {tgt.type}
                        </span>
                        {tgt.required && (
                          <span className="text-[9px] text-rose-600 font-bold uppercase">Required</span>
                        )}
                      </div>

                      {mappedSource ? (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                          <LinkIcon className="w-3 h-3 text-blue-600" />
                          <span>Mapped from: <strong className="font-mono text-blue-700">{mappedSource.name}</strong></span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic mt-1">
                          Click to map from selected source field
                        </div>
                      )}

                      {tgt.warning && (
                        <div className="mt-1.5 text-[10px] text-rose-700 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{tgt.warning}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      {mappedSource ? (
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                          +
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
