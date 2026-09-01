import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Sliders, 
  Layers, 
  Bell, 
  Sun, 
  Moon, 
  Key, 
  Save, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Copy,
  RefreshCw
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';

export function SettingsPage() {
  const { confidenceThresholds, setConfidenceThresholds, aiSettings, setAiSettings } = useAnalysis();
  const { addToast } = useToast();

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [apiKey, setApiKey] = useState('infoguard_live_sec_89df77a012e8bc991a');
  const [copiedKey, setCopiedKey] = useState(false);

  // Local state for sliders and toggles
  const [highThreshold, setHighThreshold] = useState(confidenceThresholds.high);
  const [medThreshold, setMedThreshold] = useState(confidenceThresholds.medium);
  const [autoRemap, setAutoRemap] = useState(true);
  const [strictLocale, setStrictLocale] = useState(true);
  const [notifyCritical, setNotifyCritical] = useState(true);
  const [multiLineStitch, setMultiLineStitch] = useState(true);

  const handleSaveSettings = () => {
    setConfidenceThresholds({
      high: Number(highThreshold),
      medium: Number(medThreshold),
    });
    setAiSettings(prev => ({
      ...prev,
      autoRemap,
      strictLocale,
    }));
    addToast({
      title: 'Settings Saved',
      message: 'Platform configurations and threshold rules updated successfully.',
      type: 'success',
    });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    addToast({
      title: 'API Key Copied',
      message: 'Bearer token copied to clipboard.',
      type: 'info',
    });
  };

  const handleGenerateApiKey = () => {
    const newKey = `infoguard_live_sec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
    addToast({
      title: 'New API Key Generated',
      message: 'Old key invalidated. Update your ETL pipeline headers.',
      type: 'warning',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="System & AI Model Settings"
        subtitle="Configure neural extraction backbones, probabilistic threshold boundaries, integration keys, and pipeline rules."
        showProjectBadge={true}
      >
        <Button
          variant="primary"
          size="sm"
          icon={Save}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CARD 1: AI Model & Inference Settings */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">AI Model & Neural Backbone</h3>
              <p className="text-[11px] text-slate-500">Transformer embedding and OCR models</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Primary Comparison Neural Model
              </label>
              <select
                defaultValue="InfoGuard-Neural-LossNet-v4.2"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="InfoGuard-Neural-LossNet-v4.2">InfoGuard-Neural-LossNet-v4.2 (Production Default)</option>
                <option value="InfoGuard-Transformer-Dense-v3">InfoGuard-Transformer-Dense-v3 (High Recall)</option>
                <option value="InfoGuard-Edge-Fast-v1.8">InfoGuard-Edge-Fast-v1.8 (Sub-50ms Low Latency)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                OCR & Layout Understanding Engine
              </label>
              <select
                defaultValue="Hybrid PaddleOCR + Vision Transformer"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Hybrid PaddleOCR + Vision Transformer">Hybrid PaddleOCR + Vision Transformer (Multimodal)</option>
                <option value="Tesseract-v5-Dense">Tesseract-v5 Dense OCR</option>
                <option value="AWS-Textract-Adapter">Enterprise Textract Adapter</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Semantic Matching Softmax Temperature</label>
                <span className="font-mono text-blue-700 font-bold">0.15</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                defaultValue="0.15"
                className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Lower temperature ensures strict deterministic matching</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Confidence Threshold Settings */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Confidence Threshold Settings</h3>
              <p className="text-[11px] text-slate-500">Triage cutoff points for automatic verification vs review</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  High Confidence Threshold (Auto-Verified)
                </span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {highThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="99"
                value={highThreshold}
                onChange={(e) => setHighThreshold(e.target.value)}
                className="w-full accent-emerald-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Fields above this score pass without human in the loop</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-amber-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Medium Confidence Threshold (Warning)
                </span>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {medThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                value={medThreshold}
                onChange={(e) => setMedThreshold(e.target.value)}
                className="w-full accent-amber-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Fields between {medThreshold}% and {highThreshold}% trigger advisory warnings</span>
            </div>

            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-rose-900 text-xs">Below Medium (&lt;{medThreshold}%)</span>
                <p className="text-[11px] text-rose-700/80">Flagged for Mandatory Manual Document Validation</p>
              </div>
              <Badge variant="critical">Manual Review</Badge>
            </div>
          </div>
        </div>

        {/* CARD 3: Document Processing Preferences */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Document Processing Preferences</h3>
              <p className="text-[11px] text-slate-500">Pipeline normalization and extraction rules</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Auto Schema Remapping</span>
                <p className="text-[11px] text-slate-500">Automatically connect unmapped fields with &gt;90% embedding similarity</p>
              </div>
              <input
                type="checkbox"
                checked={autoRemap}
                onChange={(e) => setAutoRemap(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Strict Locale Date Parsing (DD/MM vs MM/DD)</span>
                <p className="text-[11px] text-slate-500">Enforce jurisdictional date format heuristics to avoid 4-month skew</p>
              </div>
              <input
                type="checkbox"
                checked={strictLocale}
                onChange={(e) => setStrictLocale(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800">Multi-Line Bounding Box Stitching</span>
                <p className="text-[11px] text-slate-500">Prevents address and remarks omissions across margin linebreaks</p>
              </div>
              <input
                type="checkbox"
                checked={multiLineStitch}
                onChange={(e) => setMultiLineStitch(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* CARD 4: Theme Preferences & API Integration */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Theme & API Integration</h3>
              <p className="text-[11px] text-slate-500">Display mode & backend ETL pipeline webhook keys</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Theme selector - Light mode default */}
            <div>
              <label className="font-semibold text-slate-700 block mb-2">Display Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTheme('light')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 font-bold transition-all ${
                    selectedTheme === 'light'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 ring-2 ring-blue-300'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light Mode (Default)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addToast({
                      title: 'Light Theme Locked',
                      message: 'The academic specification mandates pure Light Theme.',
                      type: 'info',
                    });
                  }}
                  className="p-3 rounded-xl border border-slate-200 text-slate-400 flex items-center gap-2.5 font-medium opacity-60 cursor-not-allowed"
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode (Future)</span>
                </button>
              </div>
            </div>

            {/* API Integration Key */}
            <div className="pt-2 border-t border-slate-100">
              <label className="font-semibold text-slate-700 block mb-1">REST API & Pipeline Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  readOnly
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-xs text-slate-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyApiKey}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 shrink-0"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleGenerateApiKey}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0"
                  title="Regenerate Key"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
