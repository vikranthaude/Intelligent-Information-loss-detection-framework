/**
 * Mock Comparison Data and Detailed Explainable AI Diagnostics
 */

export const MOCK_COMPARISON_DATA = {
  'doc-001': {
    summary: {
      totalFields: 156,
      matched: 142,
      missing: 6,
      duplicated: 3,
      incorrectTransformation: 5,
      schemaMappingIssue: 4,
      reliabilityScore: 92.4,
    },
    items: [
      {
        id: 'cmp-01',
        fieldName: 'Patient Name',
        category: 'Demographics',
        originalValue: 'Rahul Sharma',
        extractedValue: 'Rahul Sharma',
        issueType: 'matched',
        severity: 'normal',
        confidence: 99,
        diffDetails: 'Exact character-level match.',
        explanation: {
          whatHappened: 'Patient name was extracted with 100% lexical parity.',
          why: 'OCR bounding box and NER entity classifier identified the tokens without noise.',
          impact: 'Zero data degradation.',
          solution: 'No remediation required.'
        }
      },
      {
        id: 'cmp-02',
        fieldName: 'Patient ID',
        category: 'Demographics',
        originalValue: 'PT-20458',
        extractedValue: 'PT-20485',
        issueType: 'transformation',
        severity: 'critical',
        confidence: 96,
        diffDetails: 'Transposition of digits "58" transformed to "85".',
        explanation: {
          whatHappened: 'The Patient ID string suffered an optical character transposition: PT-20458 was digitized as PT-20485.',
          why: 'The font ligature and minor scan blur between glyphs "5" and "8" triggered a faulty sequence prediction in the extraction engine.',
          impact: 'Severe: May cross-contaminate clinical history with another patient record in the EHR database.',
          solution: 'Enable alphanumeric checksum validation on patient identifiers and revalidate against the original scan.'
        }
      },
      {
        id: 'cmp-03',
        fieldName: 'Admission Date',
        category: 'Clinical Records',
        originalValue: '12/08/2026',
        extractedValue: '08/12/2026',
        issueType: 'transformation',
        severity: 'warning',
        confidence: 91,
        diffDetails: 'Date locale inversion: DD/MM/YYYY parsed as MM/DD/YYYY (Aug 12 vs Dec 8).',
        explanation: {
          whatHappened: 'The date format was transformed from Indian standard DD/MM/YYYY into US format MM/DD/YYYY.',
          why: 'The default database ingestion pipeline assumed ISO/US date serialization heuristics.',
          impact: 'Temporal mismatch: shifts billing and treatment period by 4 months, corrupting audit trails.',
          solution: 'Enforce strict locale parsing policy (`en-IN` / `DD/MM/YYYY`) in the transformation preprocessor.'
        }
      },
      {
        id: 'cmp-04',
        fieldName: 'Permanent Address',
        category: 'Demographics',
        originalValue: 'Flat 402, Sai Vihar, Senapati Bapat Road, Pune, Maharashtra 411016',
        extractedValue: '[NULL / MISSING]',
        issueType: 'missing',
        severity: 'critical',
        confidence: 98,
        diffDetails: 'Field completely omitted in target database payload.',
        explanation: {
          whatHappened: 'The Patient Address field was not transferred to the database record.',
          why: 'The document parser failed to recognize the multi-line bounding box structure spanning two physical lines.',
          impact: 'Incomplete patient records may violate statutory healthcare compliance and disrupt insurance claims.',
          solution: 'Reprocess the document using multi-line layout-aware parsing and manually validate the field.'
        }
      },
      {
        id: 'cmp-05',
        fieldName: 'Transaction Batch ID',
        category: 'Billing',
        originalValue: 'TXN-2045',
        extractedValue: 'TXN-2045 (Row #1), TXN-2045 (Row #2)',
        issueType: 'duplicate',
        severity: 'warning',
        confidence: 94,
        diffDetails: 'Transaction identifier duplicated across multiple relational tuples.',
        explanation: {
          whatHappened: 'Transaction ID "TXN-2045" was inserted twice in the database representation.',
          why: 'A retry mechanism in the document ingestion queue triggered a double write without idempotency locks.',
          impact: 'Risk of double-counting revenue or applying double debits in financial reconciliation.',
          solution: 'Add unique constraint and idempotent transaction deduplication on the ingestion pipeline.'
        }
      },
      {
        id: 'cmp-06',
        fieldName: 'Customer_ID → Employee_ID',
        category: 'Schema Mapping',
        originalValue: 'PT-20458 (Patient Identifier)',
        extractedValue: 'Mapped to: employee_id',
        issueType: 'mapping',
        severity: 'critical',
        confidence: 89,
        diffDetails: 'Field mapped to erroneous database foreign key column.',
        explanation: {
          whatHappened: 'Customer_ID was incorrectly mapped to Employee_ID in the target database schema.',
          why: 'String token similarity caused auto-mapper to associate the ID with human resources table rather than patient master.',
          impact: 'Foreign key constraint failure or invalid employee privilege assignment.',
          solution: 'Remap schema destination to `patient_record_id` and update dictionary synonym weights.'
        }
      },
      {
        id: 'cmp-07',
        fieldName: 'Contact Phone',
        category: 'Demographics',
        originalValue: '+91 98234 56789',
        extractedValue: '+91 98234 56789',
        issueType: 'matched',
        severity: 'normal',
        confidence: 99,
        diffDetails: 'Normalized E.164 phone string matched accurately.',
        explanation: {
          whatHappened: 'Phone number accurately extracted and normalized.',
          why: 'High-contrast text line with regex pattern validation.',
          impact: 'Verified communication channel established.',
          solution: 'Ready for production pipeline.'
        }
      },
      {
        id: 'cmp-08',
        fieldName: 'Total Bill Amount',
        category: 'Billing',
        originalValue: '₹25,000',
        extractedValue: '₹25,000.00',
        issueType: 'matched',
        severity: 'normal',
        confidence: 97,
        diffDetails: 'Matched with precision decimal extension.',
        explanation: {
          whatHappened: 'Numerical value verified, formatted to 2 decimal places for database currency field.',
          why: 'Robust currency parsing regex matched INR symbol and integer digits.',
          impact: 'Financial figures accurately balanced.',
          solution: 'Verified.'
        }
      },
      {
        id: 'cmp-09',
        fieldName: 'Emergency Contact Person',
        category: 'Demographics',
        originalValue: 'Sunita Sharma (Spouse)',
        extractedValue: 'Sunita Sharma',
        issueType: 'transformation',
        severity: 'minor',
        confidence: 85,
        diffDetails: 'Relationship suffix "(Spouse)" stripped during entity extraction.',
        explanation: {
          whatHappened: 'Relationship token "(Spouse)" was omitted during name sanitization.',
          why: 'The regex name cleanser stripped parenthetical strings indiscriminately.',
          impact: 'Loss of relationship context in emergency protocols.',
          solution: 'Separate kin relationship into dedicated `kinship_relation` schema field.'
        }
      }
    ],
    // Explainable Report Sections (Sections 1 through 5)
    reportSections: {
      overview: {
        analysisCompletedAt: '2026-08-12T10:32:15Z',
        totalIssues: 14,
        criticalIssues: 3,
        warningIssues: 6,
        minorIssues: 5,
        overallDataReliability: 92,
        processingDurationMs: 1420,
        modelEngine: 'InfoGuard-Neural-LossNet-v4.2',
      },
      section1Missing: [
        {
          id: 'miss-1',
          field: 'Patient_Address',
          description: 'The field "Patient_Address" was present in the original document ("Flat 402, Sai Vihar, Pune") but missing from the extracted database representation.',
          severity: 'Critical',
          confidence: 98,
        },
        {
          id: 'miss-2',
          field: 'Discharge_Physician_Notes',
          description: 'Physician remarks block on Page 3 was unparsed due to unconventional margin placement.',
          severity: 'Warning',
          confidence: 84,
        }
      ],
      section2Duplicated: [
        {
          id: 'dup-1',
          field: 'Transaction Batch ID',
          description: 'Transaction ID "TXN-2045" was detected twice in the database representation with identical timestamps.',
          severity: 'Warning',
          confidence: 94,
        }
      ],
      section3Transformation: [
        {
          id: 'tf-1',
          field: 'Admission Date',
          original: '12/08/2026',
          extracted: '08/12/2026',
          description: 'The date format was incorrectly transformed from DD/MM/YYYY to MM/DD/YYYY.',
          severity: 'Warning',
          confidence: 91,
        },
        {
          id: 'tf-2',
          field: 'Patient ID',
          original: 'PT-20458',
          extracted: 'PT-20485',
          description: 'Optical character transposition: digits "58" swapped to "85".',
          severity: 'Critical',
          confidence: 96,
        }
      ],
      section4SchemaMapping: [
        {
          id: 'sm-1',
          sourceField: 'Customer_ID',
          targetField: 'employee_id',
          expectedField: 'patient_record_id',
          description: 'Customer_ID was incorrectly mapped to Employee_ID instead of patient_record_id.',
          severity: 'Critical',
          confidence: 89,
        }
      ],
      section5AiExplanations: [
        {
          id: 'xai-1',
          issueTitle: 'Missing Critical Patient Address',
          whatHappened: 'The Patient Address field was not transferred to the database.',
          whyItHappened: 'The document parser failed to recognize a multi-line address structure spanning bounding boxes across margin boundaries.',
          potentialImpact: 'Incomplete patient records may affect insurance billing processing, emergency dispatch, and statutory regulatory compliance.',
          suggestedSolution: 'Reprocess the document using layout-aware spatial extraction and configure fallback address regex filters.',
        },
        {
          id: 'xai-2',
          issueTitle: 'Digit Transposition in Medical Record Key',
          whatHappened: 'Patient ID PT-20458 was transformed to PT-20485.',
          whyItHappened: 'Low OCR character confidence between stylized numeric fonts 5 and 8 in the header block.',
          potentialImpact: 'Risk of record misattribution, medical history confusion, or HIPAA/EHR audit non-compliance.',
          suggestedSolution: 'Enforce Luhn/Mod-10 alphanumeric checksum enforcement on patient ID fields prior to database commit.',
        },
        {
          id: 'xai-3',
          issueTitle: 'Schema Semantic Inversion (Customer_ID → Employee_ID)',
          whatHappened: 'Customer_ID was mapped to Employee_ID column in the database table.',
          whyItHappened: 'The unsupervised embedding model matched the word token "_ID" with higher generic weight than semantic domain type.',
          potentialImpact: 'Integrity constraint violation on database commit or accidental employee privilege elevation.',
          suggestedSolution: 'Pin column dictionary mapping and whitelist patient domain schemas in the Schema Mapping settings.',
        }
      ]
    }
  }
};
