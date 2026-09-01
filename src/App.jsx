import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';
import { AppLayout } from './components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { UploadAnalyzePage } from './pages/UploadAnalyzePage';
import { DocumentParserPage } from './pages/DocumentParserPage';
import { SchemaMapperPage } from './pages/SchemaMapperPage';
import { ComparisonEnginePage } from './pages/ComparisonEnginePage';
import { ConfidenceAnalysisPage } from './pages/ConfidenceAnalysisPage';
import { ReportsPage } from './pages/ReportsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

function MainRouter() {
  const { activePage } = useAnalysis();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'upload':
        return <UploadAnalyzePage />;
      case 'parser':
        return <DocumentParserPage />;
      case 'mapper':
        return <SchemaMapperPage />;
      case 'comparison':
        return <ComparisonEnginePage />;
      case 'confidence':
        return <ConfidenceAnalysisPage />;
      case 'reports':
        return <ReportsPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {renderCurrentPage()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AnalysisProvider>
        <AppLayout>
          <MainRouter />
        </AppLayout>
      </AnalysisProvider>
    </ToastProvider>
  );
}
