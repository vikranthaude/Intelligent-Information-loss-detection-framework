import { SAMPLE_DATASETS } from '../data/mockDocuments';

/**
 * Mock Document Service for managing documents, uploads, deletions, and parsing
 */

let documentStore = [...SAMPLE_DATASETS];

export async function getDocuments() {
  await new Promise(r => setTimeout(r, 150));
  return [...documentStore];
}

export async function getDocumentById(id) {
  await new Promise(r => setTimeout(r, 100));
  const doc = documentStore.find(d => d.id === id);
  return doc || documentStore[0];
}

export async function uploadDocumentPair(sourceFile, extractedFile, domain = 'Healthcare') {
  await new Promise(r => setTimeout(r, 400));
  
  const newDoc = {
    id: `doc-${Date.now()}`,
    name: sourceFile?.name || 'Uploaded_Document.pdf',
    type: sourceFile?.name?.split('.').pop()?.toUpperCase() || 'PDF',
    size: sourceFile?.size || 2500000,
    domain: domain,
    pages: 3,
    uploadDate: new Date().toISOString(),
    status: 'Verified',
    overallConfidence: 96.5,
    accuracy: 97.8,
    issuesCount: {
      total: 2,
      critical: 0,
      warnings: 1,
      minor: 1,
    },
    rawDocument: SAMPLE_DATASETS[0].rawDocument,
    extractedFields: SAMPLE_DATASETS[0].extractedFields,
  };

  documentStore = [newDoc, ...documentStore];
  return newDoc;
}

export async function deleteDocument(id) {
  await new Promise(r => setTimeout(r, 200));
  documentStore = documentStore.filter(d => d.id !== id);
  return { success: true, id };
}

export async function reanalyzeDocument(id) {
  await new Promise(r => setTimeout(r, 500));
  const doc = documentStore.find(d => d.id === id);
  if (doc) {
    doc.uploadDate = new Date().toISOString();
  }
  return { success: true, doc };
}
