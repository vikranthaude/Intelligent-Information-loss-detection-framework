import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles,
  Check,
  Edit3,
  Eye,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../../src/context/AnalysisContext';
import { useToast } from '../../src/context/ToastContext';
import { getConfidenceColor } from '../utils/formatters';

export function DocumentParserPage() {
  const { activeDocument, navigateTo } = useAnalysis();
  const { addToast } = useToast();

  const [highlightedFieldId, setHighlightedFieldId] = useState('p_id');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [validatedFields, setValidatedFields] = useState({});

  const rawDoc = activeDocument?.rawDocument || {};
  const extractedFields = activeDocument?.extractedFields || [];

  const handleValidateField = (fieldId) => {
    setValidatedFields(prev => ({ ...prev, [fieldId]: true }));
    addToast({
      title: 'Field Validated',
      message: 'Field marked verified and updated in schema buffer.',
      type: 'success',
    });
  };

  const handleValidateAll = () => {
    const all = {};
    extractedFields.forEach(f => { all[f.id] = true; });
    setValidatedFields(all);
    addToast({
      title: 'Extraction Validated',
      message: 'All 9 extracted fields validated. Ready for Schema Mapping.',
      type: 'success',
    });
  };

  return (
    <div>
      <PageHeader
        title="Document Parser & Extraction"
        subtitle="AI-powered extraction of structured key-value pairs, tables, and bounding boxes from heterogeneous scanned documents."
        showProjectBadge={true}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleValidateAll}
          icon={FileCheck}
        >
          Validate All Fields
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('mapper')}
        >
          Proceed to Schema Mapping →
        </Button>
      </PageHeader>

      <WorkflowStepper currentStage="parsing" />

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Original Document PDF Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden flex flex-col">
          {/* Header Controls */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Original Document View</h3>
                <span className="text-[11px] text-slate-400">
                  {activeDocument?.name} • Page 1 of {activeDocument?.pages || 3}
                </span>
              </div>
            </div>

            {/* Zoom / View controls */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-soft-sm text-xs">
              <button
                onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 text-slate-600 font-bold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Realistic PDF Document Container */}
          <div className="p-4 sm:p-6 bg-slate-100/70 overflow-auto max-h-[720px] flex justify-center">
            <div
              className="document-paper bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl border border-slate-200 text-slate-800 font-serif text-xs transition-transform origin-top"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-3 mb-5 text-center">
                <div className="text-[10px] font-sans uppercase font-bold tracking-widest text-slate-500 mb-0.5">
                  {rawDoc.header || 'CLINICAL AUDIT RECORD'}
                </div>
                <h2 className="text-base font-bold font-sans tracking-tight text-slate-900">
                  {rawDoc.title || 'APEX MULTISPECIALITY HOSPITAL - PATIENT RECORD'}
                </h2>
                <div className="flex justify-center gap-4 text-[10px] font-sans text-slate-500 mt-1">
                  <span>Ref: {rawDoc.metadata?.admissionDate || '12/08/2026'}</span>
                  <span>•</span>
                  <span>Ward: {rawDoc.metadata?.ward || 'General'}</span>
                </div>
              </div>

              {/* Document Content Sections with Interactive Bounding Boxes */}
              <div className="space-y-6 font-sans">
                {rawDoc.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                      {sec.heading}
                    </h4>

                    {sec.fields && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {sec.fields.map((fld) => {
                          const isHighlighted = highlightedFieldId === fld.fieldId;
                          return (
                            <div
                              key={fld.key}
                              onClick={() => setHighlightedFieldId(fld.fieldId)}
                              className={`p-2 rounded-md transition-all cursor-pointer border ${
                                isHighlighted
                                  ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-soft-sm'
                                  : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <div className="text-[10px] font-semibold text-slate-400 uppercase">
                                {fld.key}
                              </div>
                              <div className="font-semibold text-slate-900 mt-0.5">
                                {fld.value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {sec.content && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded border border-slate-200/60 leading-relaxed">
                        "{sec.content}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Document Footer Signature Simulation */}
              <div className="mt-10 pt-4 border-t border-slate-200 flex justify-between items-end text-[10px] font-sans text-slate-400">
                <div>
                  <div>Verified by Medical Records Officer</div>
                  <div className="font-mono text-slate-600">STAMP_VALIDATED_2026</div>
                </div>
                <div className="text-right">
                  <div className="border-b border-slate-400 w-32 mb-1"></div>
                  <div>Authorized Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Extracted Structured Data (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-soft-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Extracted Structured Data</h3>
                <span className="text-[11px] text-slate-500">
                  {extractedFields.length} extracted key-value entities
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
              OCR Engine Active
            </span>
          </div>

          {/* Extracted Fields List */}
          <div className="p-4 divide-y divide-slate-100 max-h-[720px] overflow-y-auto space-y-3">
            {extractedFields.map((field) => {
              const style = getConfidenceColor(field.confidence);
              const isLow = field.confidence < 70;
              const isMedium = field.confidence >= 70 && field.confidence < 90;
              const isValidated = validatedFields[field.id];

              return (
                <div
                  key={field.id}
                  className={`pt-3 first:pt-0 p-3 rounded-xl border transition-all ${
                    isLow
                      ? 'bg-rose-50/40 border-rose-200 shadow-soft-sm'
                      : isMedium
                      ? 'bg-amber-50/30 border-amber-200'
                      : 'bg-white border-slate-200/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-800">{field.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({field.rawKey})</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 mt-1">
                        {field.value || (
                          <span className="text-rose-600 italic font-mono">[MISSING VALUE / NULL]</span>
                        )}
                      </div>
                    </div>

                    {/* Confidence Badge */}
                    <div className="text-right shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.badge}`}>
                        {field.confidence}% Conf.
                      </span>
                    </div>
                  </div>

                  {/* Notes / Warnings */}
                  {field.notes && (
                    <div className={`mt-2 text-[11px] p-2 rounded-lg flex items-start gap-1.5 ${
                      isLow ? 'bg-rose-100/70 text-rose-800' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {isLow ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      )}
                      <span>{field.notes}</span>
                    </div>
                  )}

                  {/* Field validation action */}
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400">
                      {isValidated ? '✓ Manually Verified' : 'Awaiting Review'}
                    </span>
                    <button
                      onClick={() => handleValidateField(field.id)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        isValidated
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isValidated ? 'Verified' : 'Validate'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel Footer */}
          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Extraction Quality: <strong className="text-emerald-600">97.2% Average</strong>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleValidateAll}
            >
              Validate Extracted Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
