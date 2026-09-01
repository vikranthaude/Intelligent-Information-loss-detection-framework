import React from 'react';
import { 
  HeartPulse, 
  BadgeDollarSign, 
  Building2, 
  Server, 
  Sparkles, 
  FileSearch, 
  GitFork, 
  BrainCircuit, 
  Activity, 
  Target,
  ShieldCheck,
  Scale,
  Zap,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { APPLICATION_AREAS, AIML_CAPABILITIES, EXPECTED_OUTCOMES } from '../../data/mockAnalytics';
import { useAnalysis } from '../../context/AnalysisContext';

const ICONS = {
  HeartPulse,
  BadgeDollarSign,
  Building2,
  Server,
  Sparkles,
  FileSearch,
  GitFork,
  BrainCircuit,
  Activity,
  Target,
  ShieldCheck,
  Scale,
  Zap,
  FileSpreadsheet,
};

export function DomainShowcase() {
  const { navigateTo } = useAnalysis();

  return (
    <div className="space-y-8 mb-8">
      {/* 1. Practical Application Areas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Practical Application Domains
            </h3>
            <p className="text-xs text-slate-500">
              Validated document transformation integrity across regulated industries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {APPLICATION_AREAS.map((area) => {
            const Icon = ICONS[area.icon] || Server;
            return (
              <div
                key={area.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm hover:shadow-soft-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {area.tag}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{area.title}</h4>
                  <div className="text-[11px] font-medium text-blue-600 mb-2">{area.subtitle}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {area.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Benchmark</span>
                  <span className="font-semibold text-emerald-600 font-mono text-[11px]">{area.metrics}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. AI/ML Capabilities Grid */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Core AI & ML Detection Capabilities
          </h3>
          <p className="text-xs text-slate-500">
            Advanced neural techniques powering the Information-Loss Detection Framework
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AIML_CAPABILITIES.map((cap) => {
            const Icon = ICONS[cap.icon] || Sparkles;
            return (
              <div
                key={cap.title}
                className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-soft-sm hover:border-blue-300 transition-all flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">{cap.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Expected Outcomes Card */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-soft-lg">
        <div className="max-w-2xl mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-blue-200 border border-white/15 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Academic Framework Impact</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Transforming Document-to-Database Integrity
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Eliminating blind spots in heterogeneous document extraction pipelines through multimodal semantic comparison and explainable loss localization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPECTED_OUTCOMES.map((outcome) => {
            const Icon = ICONS[outcome.icon] || Zap;
            return (
              <div key={outcome.title} className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2.5 border border-blue-400/30">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{outcome.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{outcome.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
