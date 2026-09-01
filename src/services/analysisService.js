import { MOCK_COMPARISON_DATA } from '../data/mockComparisons';
import { MOCK_SCHEMA_MAPPINGS } from '../data/mockSchemas';

/**
 * Mock Analysis Service
 * Provides asynchronous simulation of the 5-step AI pipeline and data queries.
 */

export const PIPELINE_STEPS = [
  { id: 'step-1', name: 'Document Parsing', description: 'Extracting text tokens, bounding boxes, and OCR layer', icon: 'FileSearch' },
  { id: 'step-2', name: 'Schema Mapping', description: 'Semantic alignment of extracted attributes to database columns', icon: 'GitFork' },
  { id: 'step-3', name: 'Content Comparison', description: 'Comparing source document tokens against extracted records', icon: 'GitCompare' },
  { id: 'step-4', name: 'Confidence Calculation', description: 'Computing field, document, and pipeline probabilistic scores', icon: 'Target' },
  { id: 'step-5', name: 'Report Generation', description: 'Synthesizing explainable AI diagnostic report and insights', icon: 'FileText' },
];

export async function runAiPipelineSimulation(onProgress) {
  const steps = [...PIPELINE_STEPS];
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    
    // Notify step starting
    if (onProgress) {
      onProgress({
        currentStepIndex: i,
        stepId: step.id,
        stepName: step.name,
        status: 'processing',
        progress: 15,
      });
    }

    // Simulate progress increments within step
    await new Promise(r => setTimeout(r, 220));
    if (onProgress) {
      onProgress({
        currentStepIndex: i,
        stepId: step.id,
        stepName: step.name,
        status: 'processing',
        progress: 65,
      });
    }

    await new Promise(r => setTimeout(r, 280));
    if (onProgress) {
      onProgress({
        currentStepIndex: i,
        stepId: step.id,
        stepName: step.name,
        status: 'completed',
        progress: 100,
      });
    }
    
    await new Promise(r => setTimeout(r, 120));
  }

  return {
    success: true,
    documentId: 'doc-001',
    timestamp: new Date().toISOString(),
  };
}

export async function fetchComparisonData(docId = 'doc-001') {
  await new Promise(r => setTimeout(r, 250)); // simulate network latency
  return MOCK_COMPARISON_DATA[docId] || MOCK_COMPARISON_DATA['doc-001'];
}

export async function fetchSchemaMappingData(docId = 'doc-001') {
  await new Promise(r => setTimeout(r, 200));
  return MOCK_SCHEMA_MAPPINGS[docId] || MOCK_SCHEMA_MAPPINGS['doc-001'];
}

export async function runAutoMapAi(sourceFields, targetFields) {
  await new Promise(r => setTimeout(r, 600)); // AI thinking latency
  return {
    success: true,
    mappedCount: sourceFields.length,
    averageConfidence: 94.8,
    message: 'AI Auto-Mapping successfully aligned 8 fields with semantic vector similarity.',
  };
}
