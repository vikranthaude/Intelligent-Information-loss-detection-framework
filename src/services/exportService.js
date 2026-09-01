/**
 * Export Service for generating client-side downloads of Explainable Reports, CSV audit trails, and JSON payloads.
 */

export function exportReportAsCsv(comparisonItems, docName = 'Patient_Report') {
  if (!comparisonItems || comparisonItems.length === 0) return;

  const headers = ['Field Name', 'Category', 'Original Value', 'Extracted Value', 'Issue Type', 'Severity', 'Confidence Score', 'Diff Details', 'What Happened', 'Why It Happened', 'Suggested Solution'];
  
  const rows = comparisonItems.map(item => [
    `"${item.fieldName || ''}"`,
    `"${item.category || ''}"`,
    `"${(item.originalValue || '').replace(/"/g, '""')}"`,
    `"${(item.extractedValue || '').replace(/"/g, '""')}"`,
    `"${item.issueType || ''}"`,
    `"${item.severity || ''}"`,
    `"${item.confidence || 0}%"`,
    `"${(item.diffDetails || '').replace(/"/g, '""')}"`,
    `"${(item.explanation?.whatHappened || '').replace(/"/g, '""')}"`,
    `"${(item.explanation?.why || '').replace(/"/g, '""')}"`,
    `"${(item.explanation?.solution || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `InfoGuard_Report_${docName}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportReportAsJson(reportData, docName = 'Patient_Report') {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `InfoGuard_Report_${docName}_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPrintReport() {
  window.print();
}
