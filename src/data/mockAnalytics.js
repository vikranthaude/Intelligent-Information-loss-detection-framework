/**
 * Mock Analytics, KPI Metrics, Trends, and Showcase Data
 */

export const DASHBOARD_STATS = {
  documentsAnalyzed: {
    value: 1248,
    change: '+12.5%',
    period: 'from last month',
    isPositive: true,
  },
  informationLossDetected: {
    value: 86,
    unit: 'Issues',
    change: '-18.4%',
    period: 'decrease vs previous quarter',
    isPositive: true, // Less issues is positive
  },
  avgConfidenceScore: {
    value: 94.7,
    unit: '%',
    change: '+2.3%',
    period: 'higher precision',
    isPositive: true,
  },
  dataAccuracy: {
    value: 97.2,
    unit: '%',
    change: '+1.5%',
    period: 'pipeline consistency',
    isPositive: true,
  }
};

export const DOCUMENT_OVERVIEW_DATA = [
  { name: 'Successfully Processed', value: 980, color: '#10b981', percentage: 78.5 },
  { name: 'Warnings Detected', value: 182, color: '#f59e0b', percentage: 14.6 },
  { name: 'Critical Issues', value: 54, color: '#ef4444', percentage: 4.3 },
  { name: 'Active Processing', value: 32, color: '#3b82f6', percentage: 2.6 },
];

export const LOSS_TRENDS_7_DAYS = [
  { day: 'Mon', missing: 4, duplicate: 2, incorrectMapping: 3, transformation: 5 },
  { day: 'Tue', missing: 6, duplicate: 1, incorrectMapping: 2, transformation: 4 },
  { day: 'Wed', missing: 3, duplicate: 3, incorrectMapping: 1, transformation: 3 },
  { day: 'Thu', missing: 8, duplicate: 2, incorrectMapping: 4, transformation: 6 },
  { day: 'Fri', missing: 5, duplicate: 1, incorrectMapping: 3, transformation: 4 },
  { day: 'Sat', missing: 2, duplicate: 0, incorrectMapping: 1, transformation: 2 },
  { day: 'Sun', missing: 3, duplicate: 1, incorrectMapping: 2, transformation: 3 },
];

export const LOSS_TRENDS_30_DAYS = [
  { day: 'Week 1', missing: 24, duplicate: 12, incorrectMapping: 18, transformation: 28 },
  { day: 'Week 2', missing: 19, duplicate: 8, incorrectMapping: 14, transformation: 22 },
  { day: 'Week 3', missing: 15, duplicate: 7, incorrectMapping: 10, transformation: 18 },
  { day: 'Week 4', missing: 11, duplicate: 4, incorrectMapping: 8, transformation: 12 },
];

export const RECENT_ANALYSES = [
  {
    id: 'doc-001',
    name: 'Patient_Report.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: '2026-08-12 10:30 AM',
    confidence: 94.2,
    issues: 4,
    criticalCount: 1,
    status: 'Warning',
    domain: 'Healthcare',
  },
  {
    id: 'doc-002',
    name: 'Financial_Report.xlsx',
    type: 'XLSX',
    size: '1.8 MB',
    date: '2026-08-11 02:20 PM',
    confidence: 98.4,
    issues: 1,
    criticalCount: 0,
    status: 'Verified',
    domain: 'Finance',
  },
  {
    id: 'doc-003',
    name: 'Government_Record.docx',
    type: 'DOCX',
    size: '3.1 MB',
    date: '2026-08-10 09:15 AM',
    confidence: 78.5,
    issues: 5,
    criticalCount: 3,
    status: 'Critical',
    domain: 'Government',
  },
  {
    id: 'doc-004',
    name: 'Insurance_Data.pdf',
    type: 'PDF',
    size: '4.2 MB',
    date: '2026-08-09 04:45 PM',
    confidence: 96.7,
    issues: 2,
    criticalCount: 0,
    status: 'Verified',
    domain: 'Enterprise',
  },
  {
    id: 'doc-005',
    name: 'Clinical_Trial_Summary.csv',
    type: 'CSV',
    size: '850 KB',
    date: '2026-08-08 11:10 AM',
    confidence: 88.0,
    issues: 3,
    criticalCount: 1,
    status: 'Warning',
    domain: 'Healthcare',
  },
  {
    id: 'doc-006',
    name: 'Tax_Exemption_Form_16.pdf',
    type: 'PDF',
    size: '1.2 MB',
    date: '2026-08-07 03:05 PM',
    confidence: 99.1,
    issues: 0,
    criticalCount: 0,
    status: 'Verified',
    domain: 'Finance',
  }
];

export const CONFIDENCE_FIELDS_DATA = [
  {
    fieldName: 'Patient Name',
    confidence: 99,
    category: 'Demographics',
    riskLevel: 'Low',
    recommendation: 'Verified (Auto-accepted)',
    sampleValue: 'Rahul Sharma',
  },
  {
    fieldName: 'Customer Email',
    confidence: 98,
    category: 'Contact',
    riskLevel: 'Low',
    recommendation: 'Verified (Syntax validated)',
    sampleValue: 'rahul.sharma@example.com',
  },
  {
    fieldName: 'Emergency Contact Phone',
    confidence: 96,
    category: 'Contact',
    riskLevel: 'Low',
    recommendation: 'Verified (E.164 verified)',
    sampleValue: '+91 98234 56789',
  },
  {
    fieldName: 'Total Bill Amount',
    confidence: 87,
    category: 'Financial',
    riskLevel: 'Medium',
    recommendation: 'Manual review recommended (Currency formatting checked)',
    sampleValue: '₹25,000',
  },
  {
    fieldName: 'Transaction Date / Admission',
    confidence: 74,
    category: 'Temporal',
    riskLevel: 'Medium',
    recommendation: 'Manual review recommended (Locale DD/MM vs MM/DD ambiguity)',
    sampleValue: '12/08/2026 vs 08/12/2026',
  },
  {
    fieldName: 'Patient Identifier (ID)',
    confidence: 62,
    category: 'Key Identity',
    riskLevel: 'High',
    recommendation: 'Revalidate source document (Transposition error suspected)',
    sampleValue: 'PT-20458 vs PT-20485',
  },
  {
    fieldName: 'Permanent Address',
    confidence: 0,
    category: 'Spatial Text',
    riskLevel: 'High',
    recommendation: 'Revalidate source document (Missing extracted entity)',
    sampleValue: '[Omitted from extracted record]',
  }
];

export const APPLICATION_AREAS = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Clinical & Patient Records',
    description: 'Patient record validation, diagnostic lab report accuracy, electronic health record (EHR) syncing, and medical prescription integrity verification.',
    tag: 'HIPAA & FHIR Ready',
    icon: 'HeartPulse',
    metrics: '99.8% Record Integrity',
    color: 'emerald',
  },
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Banking & Audit Logs',
    description: 'Transaction accuracy checks, financial ledger transformations, SEC filings verification, tax invoice validation, and reconciliation loss prevention.',
    tag: 'SOX & IFRS Compliant',
    icon: 'BadgeDollarSign',
    metrics: '0.001% Ledger Variance',
    color: 'blue',
  },
  {
    id: 'government',
    title: 'Government',
    subtitle: 'Public Registers & Census',
    description: 'Policy document parsing, national census data integrity, land cadastre registry verification, and citizen identity verification pipelines.',
    tag: 'Civic Data Reliability',
    icon: 'Building2',
    metrics: 'Zero-Loss Cadastre',
    color: 'indigo',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Systems',
    subtitle: 'Data Lake Ingestion',
    description: 'Real-time document-to-database ETL pipeline monitoring, schema drift detection, ERP migration auditing, and heterogeneous file ingestion.',
    tag: 'ETL Pipeline Shield',
    icon: 'Server',
    metrics: 'Continuous Monitoring',
    color: 'purple',
  }
];

export const AIML_CAPABILITIES = [
  {
    title: 'AI-Based Anomaly Detection',
    description: 'Detect unusual transformations, digit transpositions, and character-level optical inconsistencies.',
    icon: 'Sparkles',
    color: 'blue',
  },
  {
    title: 'Intelligent Document Understanding',
    description: 'Extract multi-line structured information and table hierarchies from heterogeneous PDFs and images.',
    icon: 'FileSearch',
    color: 'purple',
  },
  {
    title: 'Automatic Schema Mapping',
    description: 'Map unstructured extracted fields to target relational or NoSQL database schemas with semantic embeddings.',
    icon: 'GitFork',
    color: 'emerald',
  },
  {
    title: 'Explainable AI (XAI)',
    description: 'Provide natural-language root cause explanations, potential regulatory impact, and automated fixes.',
    icon: 'BrainCircuit',
    color: 'amber',
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Continuously track document-to-database transformation pipelines and trigger instant alerts on schema drift.',
    icon: 'Activity',
    color: 'indigo',
  },
  {
    title: 'Confidence Scoring',
    description: 'Measure probabilistic extraction, mapping, and transformation reliability at field, document, and system tiers.',
    icon: 'Target',
    color: 'rose',
  }
];

export const EXPECTED_OUTCOMES = [
  {
    title: 'Improved Data Reliability',
    description: 'Increase confidence in transformed and extracted information across mission-critical enterprise systems.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Reduced Compliance Risks',
    description: 'Identify information loss before it affects regulated healthcare, financial, and governmental databases.',
    icon: 'Scale',
  },
  {
    title: 'Faster Error Detection',
    description: 'Automatically isolate transformation problems in milliseconds without tedious manual line-by-line comparison.',
    icon: 'Zap',
  },
  {
    title: 'Enhanced Transparency',
    description: 'Provide explainable AI-generated audit reports detailing detected discrepancies and remediation pathways.',
    icon: 'FileSpreadsheet',
  }
];
