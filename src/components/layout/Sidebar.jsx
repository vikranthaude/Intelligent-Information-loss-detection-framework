import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  GitFork,
  GitCompare,
  Target,
  FileText,
  History,
  Settings,
  Shield,
  HelpCircle,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload & Analyze', icon: UploadCloud, badge: 'New' },
  { id: 'parser', label: 'Document Parser', icon: FileSearch },
  { id: 'mapper', label: 'Schema Mapper', icon: GitFork },
  { id: 'comparison', label: 'Comparison Engine', icon: GitCompare },
  { id: 'confidence', label: 'Confidence Analysis', icon: Target },
  { id: 'reports', label: 'Information Loss Reports', icon: FileText, badge: 'XAI' },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ mobileOpen = false, onCloseMobile }) {
  const { activePage, navigateTo, activeDocument } = useAnalysis();

  const handleNavClick = (pageId) => {
    navigateTo(pageId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-72 h-full bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-soft-sm shadow-blue-500/20">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">InfoGuard AI</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                AI/ML
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">
              Detect. Compare. Validate.
            </p>
          </div>
        </div>

        {/* Academic Project Context Pill */}
        <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate font-medium">Neural Technics (AI)</span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-soft-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      item.badge === 'XAI'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/40">
        {/* Active Document Info */}
        {activeDocument && (
          <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 shadow-soft-sm text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Active Document</div>
            <div className="font-semibold text-slate-800 truncate mt-0.5">{activeDocument.name}</div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
              <span>{activeDocument.domain}</span>
              <span className="text-emerald-600 font-semibold">{activeDocument.overallConfidence}% Conf.</span>
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Research Admin</div>
              <div className="text-[10px] text-slate-400">Neural Technics Lab</div>
            </div>
          </div>
          <button
            onClick={() => handleNavClick('settings')}
            title="Help & Support"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
