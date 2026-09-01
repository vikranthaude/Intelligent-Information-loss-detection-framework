/**
 * Realistic Mock Datasets for InfoGuard AI
 * Represents documents across Healthcare, Finance, Government, and Enterprise domains.
 */

export const SAMPLE_DATASETS = [
  {
    id: 'doc-001',
    name: 'Patient_Report.pdf',
    type: 'PDF',
    size: 2450000, // 2.4 MB
    domain: 'Healthcare',
    pages: 3,
    uploadDate: '2026-08-12T10:30:00Z',
    status: 'Warning',
    overallConfidence: 94.2,
    accuracy: 91.8,
    issuesCount: {
      total: 4,
      critical: 1,
      warnings: 2,
      minor: 1,
    },
    // Raw text simulation for Document Parser left panel
    rawDocument: {
      title: 'APEX MULTISPECIALITY HOSPITAL - INPATIENT ADMISSION & BILLING RECORD',
      header: 'Department of Clinical Records | Registration Ref: AMH-2026-B89',
      metadata: {
        admissionDate: '12/08/2026',
        dischargeDate: '15/08/2026',
        ward: 'Cardiac ICU - Bed 04',
      },
      sections: [
        {
          heading: 'PATIENT DEMOGRAPHICS',
          fields: [
            { key: 'Patient Name', value: 'Rahul Sharma', bbox: { top: 18, left: 10, width: 35, height: 4 }, fieldId: 'p_name' },
            { key: 'Patient ID', value: 'PT-20458', bbox: { top: 18, left: 55, width: 25, height: 4 }, fieldId: 'p_id' },
            { key: 'Date of Birth / Age', value: '14/05/1988 (38 Y / Male)', bbox: { top: 23, left: 10, width: 35, height: 4 }, fieldId: 'p_dob' },
            { key: 'Contact Phone', value: '+91 98234 56789', bbox: { top: 23, left: 55, width: 30, height: 4 }, fieldId: 'p_phone' },
            { key: 'Email Address', value: 'rahul.sharma@example.com', bbox: { top: 28, left: 10, width: 40, height: 4 }, fieldId: 'p_email' },
            { key: 'Permanent Address', value: 'Flat 402, Sai Vihar, Senapati Bapat Road, Pune, Maharashtra 411016', bbox: { top: 33, left: 10, width: 80, height: 5 }, fieldId: 'p_address' },
          ]
        },
        {
          heading: 'CLINICAL & BILLING PARTICULARS',
          fields: [
            { key: 'Admission Date', value: '12/08/2026', bbox: { top: 43, left: 10, width: 25, height: 4 }, fieldId: 'p_adm_date' },
            { key: 'Attending Physician', value: 'Dr. S. K. Kulkarni, MD (Cardio)', bbox: { top: 43, left: 50, width: 45, height: 4 }, fieldId: 'p_doc' },
            { key: 'Primary Diagnosis', value: 'Acute Coronary Syndrome - Non ST Elevation', bbox: { top: 48, left: 10, width: 85, height: 4 }, fieldId: 'p_diag' },
            { key: 'Total Bill Amount', value: '₹25,000', bbox: { top: 54, left: 10, width: 30, height: 4 }, fieldId: 'p_amount' },
            { key: 'Insurance Claim No.', value: 'MED-CLM-99420', bbox: { top: 54, left: 50, width: 35, height: 4 }, fieldId: 'p_claim' },
            { key: 'Co-pay Deductible', value: '₹2,500', bbox: { top: 59, left: 10, width: 25, height: 4 }, fieldId: 'p_deductible' },
            { key: 'Emergency Contact', value: 'Sunita Sharma (Spouse) - +91 98234 56780', bbox: { top: 64, left: 10, width: 80, height: 4 }, fieldId: 'p_emg_contact' },
          ]
        },
        {
          heading: 'DISCHARGE SUMMARY NOTES',
          content: 'Patient responded well to conservative medical management. Advised rest for 14 days and scheduled follow-up on 28/08/2026. Prescribed Aspirin 75mg and Atorvastatin 40mg OD.'
        }
      ]
    },
    // Extracted structured fields for Document Parser right panel
    extractedFields: [
      { id: 'f1', label: 'Patient Name', rawKey: 'Patient Name', value: 'Rahul Sharma', confidence: 98, status: 'high', verified: true, notes: 'Exact match with OCR layer' },
      { id: 'f2', label: 'Patient ID', rawKey: 'Patient ID', value: 'PT-20485', confidence: 62, status: 'low', verified: false, notes: 'Transposition detected: original PT-20458 vs extracted PT-20485' },
      { id: 'f3', label: 'Email', rawKey: 'Email Address', value: 'rahul.sharma@example.com', confidence: 99, status: 'high', verified: true, notes: 'Regex standard format validated' },
      { id: 'f4', label: 'Phone', rawKey: 'Contact Phone', value: '+91 98234 56789', confidence: 97, status: 'high', verified: true, notes: 'E.164 phone format confirmed' },
      { id: 'f5', label: 'Admission Date', rawKey: 'Admission Date', value: '08/12/2026', confidence: 74, status: 'medium', verified: false, notes: 'Date format inverted from DD/MM/YYYY to MM/DD/YYYY' },
      { id: 'f6', label: 'Amount', rawKey: 'Total Bill Amount', value: '₹25,000', confidence: 87, status: 'medium', verified: true, notes: 'Currency symbol and integer normalized' },
      { id: 'f7', label: 'Address', rawKey: 'Permanent Address', value: null, confidence: 0, status: 'low', verified: false, notes: 'Missing in extracted record: Multiline address failed parsing' },
      { id: 'f8', label: 'Emergency Contact', rawKey: 'Emergency Contact', value: 'Sunita Sharma (Spouse) - +91 98234 56780', confidence: 93, status: 'high', verified: true, notes: 'Compound field parsed' },
      { id: 'f9', label: 'Insurance Claim No.', rawKey: 'Insurance Claim No.', value: 'MED-CLM-99420', confidence: 96, status: 'high', verified: true, notes: 'Alphanumeric policy token verified' },
    ]
  },
  {
    id: 'doc-002',
    name: 'Financial_Report.xlsx',
    type: 'XLSX',
    size: 1820000, // 1.8 MB
    domain: 'Finance',
    pages: 12,
    uploadDate: '2026-08-11T14:20:00Z',
    status: 'Verified',
    overallConfidence: 98.4,
    accuracy: 99.1,
    issuesCount: {
      total: 1,
      critical: 0,
      warnings: 1,
      minor: 0,
    },
    rawDocument: {
      title: 'GLOBAL EQUITY CORP - Q2 CONSOLIDATED CASH FLOW & BALANCE STATEMENT',
      header: 'Audited Financial Statement | Ledger REF: FIN-2026-Q2-8874',
      metadata: {
        admissionDate: '30/06/2026',
        dischargeDate: 'N/A',
        ward: 'Treasury Ops',
      },
      sections: [
        {
          heading: 'REVENUE & DISBURSEMENTS',
          fields: [
            { key: 'Organization Name', value: 'Global Equity Corp Ltd', bbox: { top: 18, left: 10, width: 45, height: 4 }, fieldId: 'fin_org' },
            { key: 'Tax Identification Number (TIN)', value: 'TIN-US-9988231', bbox: { top: 18, left: 60, width: 30, height: 4 }, fieldId: 'fin_tin' },
            { key: 'Gross Operating Revenue', value: '$14,850,000.00', bbox: { top: 25, left: 10, width: 35, height: 4 }, fieldId: 'fin_rev' },
            { key: 'Net Operating Margin', value: '28.4%', bbox: { top: 25, left: 55, width: 25, height: 4 }, fieldId: 'fin_margin' },
            { key: 'Transaction Batch ID', value: 'TXN-2045', bbox: { top: 32, left: 10, width: 30, height: 4 }, fieldId: 'fin_txnid' },
          ]
        }
      ]
    },
    extractedFields: [
      { id: 'f21', label: 'Org Name', rawKey: 'Organization Name', value: 'Global Equity Corp Ltd', confidence: 99, status: 'high', verified: true, notes: 'Validated' },
      { id: 'f22', label: 'TIN', rawKey: 'Tax Identification Number (TIN)', value: 'TIN-US-9988231', confidence: 98, status: 'high', verified: true, notes: 'Validated' },
      { id: 'f23', label: 'Gross Revenue', rawKey: 'Gross Operating Revenue', value: '$14,850,000.00', confidence: 99, status: 'high', verified: true, notes: 'Validated' },
      { id: 'f24', label: 'Transaction ID', rawKey: 'Transaction Batch ID', value: 'TXN-2045 (Duplicate row in DB table)', confidence: 65, status: 'low', verified: false, notes: 'Duplicated record detected in DB sync' },
    ]
  },
  {
    id: 'doc-003',
    name: 'Government_Record.docx',
    type: 'DOCX',
    size: 3100000,
    domain: 'Government',
    pages: 5,
    uploadDate: '2026-08-10T09:15:00Z',
    status: 'Critical',
    overallConfidence: 78.5,
    accuracy: 82.0,
    issuesCount: {
      total: 5,
      critical: 3,
      warnings: 1,
      minor: 1,
    },
    rawDocument: {
      title: 'MUNICIPAL CITIZEN REGISTRY & PROPERTY CADASTRE',
      header: 'Urban Development Authority | Gazette Ref: GOV-MH-2026-004',
      metadata: {
        admissionDate: '01/07/2026',
        dischargeDate: 'N/A',
        ward: 'District Cadastre',
      },
      sections: [
        {
          heading: 'TITLE DEED & CITIZEN DETAILS',
          fields: [
            { key: 'Citizen UID', value: 'UID-4491-8820-9901', bbox: { top: 18, left: 10, width: 40, height: 4 }, fieldId: 'gov_uid' },
            { key: 'Cadastre Survey No.', value: 'SURVEY-142/B', bbox: { top: 18, left: 55, width: 35, height: 4 }, fieldId: 'gov_survey' },
            { key: 'Assessed Property Value', value: '₹1,45,00,000', bbox: { top: 25, left: 10, width: 35, height: 4 }, fieldId: 'gov_val' },
          ]
        }
      ]
    },
    extractedFields: [
      { id: 'f31', label: 'Citizen UID', rawKey: 'Citizen UID', value: 'UID-4491-8820-9901', confidence: 99, status: 'high', verified: true, notes: 'UID verified' },
      { id: 'f32', label: 'Survey No', rawKey: 'Cadastre Survey No.', value: 'SURVEY-142/A', confidence: 58, status: 'low', verified: false, notes: 'Incorrect parcel letter: A instead of B' },
      { id: 'f33', label: 'Property Value', rawKey: 'Assessed Property Value', value: '₹14,50,000', confidence: 60, status: 'low', verified: false, notes: 'Order of magnitude error: missing zero in digit conversion' },
    ]
  },
  {
    id: 'doc-004',
    name: 'Insurance_Data.pdf',
    type: 'PDF',
    size: 4200000,
    domain: 'Enterprise',
    pages: 8,
    uploadDate: '2026-08-09T16:45:00Z',
    status: 'Verified',
    overallConfidence: 96.7,
    accuracy: 98.5,
    issuesCount: {
      total: 2,
      critical: 0,
      warnings: 2,
      minor: 0,
    },
    rawDocument: {
      title: 'PRUDENTIAL ENTERPRISE GROUP - CORPORATE POLICY DECLARATION',
      header: 'Policy Underwriting Division | Contract Ref: PEG-2026-CORP-44',
      metadata: {
        admissionDate: '15/01/2026',
        dischargeDate: '15/01/2027',
        ward: 'Group Underwriting',
      },
      sections: [
        {
          heading: 'COVERAGE SPECIFICATIONS',
          fields: [
            { key: 'Policy Holder', value: 'Nexus Technologies International', bbox: { top: 18, left: 10, width: 50, height: 4 }, fieldId: 'ins_holder' },
            { key: 'Policy Number', value: 'POL-99201-IND', bbox: { top: 18, left: 65, width: 25, height: 4 }, fieldId: 'ins_no' },
            { key: 'Aggregate Limit', value: '$5,000,000', bbox: { top: 25, left: 10, width: 30, height: 4 }, fieldId: 'ins_limit' },
          ]
        }
      ]
    },
    extractedFields: [
      { id: 'f41', label: 'Policy Holder', rawKey: 'Policy Holder', value: 'Nexus Technologies International', confidence: 99, status: 'high', verified: true, notes: 'Verified' },
      { id: 'f42', label: 'Policy Number', rawKey: 'Policy Number', value: 'POL-99201-IND', confidence: 98, status: 'high', verified: true, notes: 'Verified' },
      { id: 'f43', label: 'Aggregate Limit', rawKey: 'Aggregate Limit', value: '$5,000,000', confidence: 97, status: 'high', verified: true, notes: 'Verified' },
    ]
  }
];
