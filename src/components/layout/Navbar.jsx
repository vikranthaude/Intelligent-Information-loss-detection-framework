import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Upload
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { useToast } from '../../context/ToastContext';

const PAGE_TITLES = {
  dashboard: 'Analytics Dashboard',
  upload: 'Upload & Analyze Document',
  parser: 'Document Parser & OCR Inspector',
  mapper: 'Interactive Schema Mapper',
  comparison: 'AI Comparison Engine',
  confidence: 'Confidence & Risk Analysis',
  reports: 'Explainable Information-Loss Report',
  history: 'Validation History & Audit Trail',
  settings: 'System & Model Settings',
};

export function Navbar({ onOpenMobileMenu }) {
  const { activePage, navigateTo, searchQuery, setSearchQuery, documents, selectDocument } = useAnalysis();
  const { addToast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDocSelector, setShowDocSelector] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleQuickUpload = () => {
    navigateTo('upload');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-soft-sm">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            InfoGuard AI Platform
          </div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            {PAGE_TITLES[activePage] || 'Dashboard'}
          </h2>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents, fields, error signatures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right: AI System Status, Notification, Quick Upload, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* AI System Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>AI System Online</span>
        </div>

        {/* Quick Action */}
        <button
          onClick={handleQuickUpload}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-soft-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-900">AI Loss Alerts</span>
                <span className="text-[10px] text-blue-600 font-medium">3 unread</span>
              </div>
              <div className="space-y-2">
                <div
                  onClick={() => { setShowNotifications(false); navigateTo('reports'); }}
                  className="p-2 rounded-lg bg-rose-50/60 hover:bg-rose-50 border border-rose-100 cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Transposition Detected</span>
                  </div>
                  <p className="text-[11px] text-rose-700/80 mt-0.5">Patient ID PT-20458 transformed to PT-20485</p>
                </div>
                <div
                  onClick={() => { setShowNotifications(false); navigateTo('mapper'); }}
                  className="p-2 rounded-lg bg-blue-50/60 hover:bg-blue-50 border border-blue-100 cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-blue-800">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Schema Auto-Map Ready</span>
                  </div>
                  <p className="text-[11px] text-blue-700/80 mt-0.5">8 extracted attributes aligned to PostgreSQL schema</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-soft-sm">
            RS
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-slate-800">Dr. Rahul Sharma</div>
            <div className="text-[10px] text-slate-400">Principal Investigator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
