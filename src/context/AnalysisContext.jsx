import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_DATASETS } from '../data/mockDocuments';
import { MOCK_COMPARISON_DATA } from '../data/mockComparisons';
import { MOCK_SCHEMA_MAPPINGS } from '../data/mockSchemas';
import { PIPELINE_STEPS, runAiPipelineSimulation } from '../services/analysisService';
import confetti from 'canvas-confetti';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeDocId, setActiveDocId] = useState('doc-001');
  const [activeDocument, setActiveDocument] = useState(SAMPLE_DATASETS[0]);
  const [documents, setDocuments] = useState(SAMPLE_DATASETS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pipeline analysis state
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineStepIndex, setPipelineStepIndex] = useState(0);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);
  const [pipelineComplete, setPipelineComplete] = useState(false);

  // Settings state
  const [confidenceThresholds, setConfidenceThresholds] = useState({
    high: 90,
    medium: 70,
  });

  const [aiSettings, setAiSettings] = useState({
    modelName: 'InfoGuard-Neural-LossNet-v4.2 (Default)',
    temperature: 0.15,
    autoRemap: true,
    strictLocale: true,
    ocrEngine: 'Hybrid PaddleOCR + Vision Transformer',
  });

  // Sync active document when id changes
  useEffect(() => {
    const found = documents.find(d => d.id === activeDocId);
    if (found) {
      setActiveDocument(found);
    }
  }, [activeDocId, documents]);

  const comparisonData = MOCK_COMPARISON_DATA[activeDocId] || MOCK_COMPARISON_DATA['doc-001'];
  const schemaData = MOCK_SCHEMA_MAPPINGS[activeDocId] || MOCK_SCHEMA_MAPPINGS['doc-001'];

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectDocument = (docId) => {
    setActiveDocId(docId);
    const found = documents.find(d => d.id === docId);
    if (found) {
      setActiveDocument(found);
    }
  };

  const startPipelineAnalysis = async (customDoc = null) => {
    setIsPipelineModalOpen(true);
    setIsPipelineRunning(true);
    setPipelineComplete(false);
    setPipelineStepIndex(0);
    setPipelineProgress(0);

    if (customDoc) {
      setDocuments(prev => [customDoc, ...prev]);
      setActiveDocId(customDoc.id);
      setActiveDocument(customDoc);
    }

    try {
      await runAiPipelineSimulation((progressObj) => {
        setPipelineStepIndex(progressObj.currentStepIndex);
        setPipelineProgress(progressObj.progress);
      });

      setPipelineComplete(true);
      setIsPipelineRunning(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#7c3aed', '#10b981', '#f59e0b']
        });
      } catch (e) {
        // ignore confetti errors
      }
    } catch (err) {
      console.error('Pipeline error:', err);
      setIsPipelineRunning(false);
    }
  };

  const closePipelineModal = () => {
    setIsPipelineModalOpen(false);
  };

  const deleteDocumentFromState = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    if (activeDocId === docId) {
      const remaining = documents.filter(d => d.id !== docId);
      if (remaining.length > 0) {
        setActiveDocId(remaining[0].id);
        setActiveDocument(remaining[0]);
      }
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        activePage,
        navigateTo,
        activeDocId,
        activeDocument,
        selectDocument,
        documents,
        setDocuments,
        comparisonData,
        schemaData,
        searchQuery,
        setSearchQuery,
        // Pipeline
        isPipelineRunning,
        pipelineStepIndex,
        pipelineProgress,
        isPipelineModalOpen,
        pipelineComplete,
        startPipelineAnalysis,
        closePipelineModal,
        pipelineSteps: PIPELINE_STEPS,
        // Settings
        confidenceThresholds,
        setConfidenceThresholds,
        aiSettings,
        setAiSettings,
        deleteDocumentFromState,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
