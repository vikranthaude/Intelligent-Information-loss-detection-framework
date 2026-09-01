/**
 * Schema Mapping Definitions and AI Recommendations
 */

export const MOCK_SCHEMA_MAPPINGS = {
  'doc-001': {
    sourceSchemaName: 'Healthcare_Document_Extracted_V1',
    targetSchemaName: 'EHR_Hospital_PostgreSQL_Schema',
    sourceFields: [
      { id: 'src_1', name: 'Customer_Name', label: 'Patient Name', type: 'string', sample: 'Rahul Sharma', mappedTo: 'tgt_1', status: 'correct', confidence: 98 },
      { id: 'src_2', name: 'Customer_Email', label: 'Email Address', type: 'string', sample: 'rahul.sharma@example.com', mappedTo: 'tgt_2', status: 'correct', confidence: 96 },
      { id: 'src_3', name: 'Phone_Number', label: 'Contact Phone', type: 'string', sample: '+91 98234 56789', mappedTo: 'tgt_3', status: 'correct', confidence: 97 },
      { id: 'src_4', name: 'Transaction_Amount', label: 'Total Bill Amount', type: 'numeric', sample: '₹25,000', mappedTo: 'tgt_4', status: 'correct', confidence: 92 },
      { id: 'src_5', name: 'Transaction_Date', label: 'Admission Date', type: 'timestamp', sample: '12/08/2026', mappedTo: 'tgt_5', status: 'correct', confidence: 94 },
      { id: 'src_6', name: 'Patient_Address', label: 'Permanent Address', type: 'text', sample: 'Flat 402, Sai Vihar, Pune...', mappedTo: null, status: 'unmapped', confidence: 45 },
      { id: 'src_7', name: 'Customer_ID', label: 'Patient Identifier', type: 'string', sample: 'PT-20458', mappedTo: 'tgt_7', status: 'mismatch', confidence: 52 },
      { id: 'src_8', name: 'Emergency_Contact', label: 'Emergency Contact', type: 'string', sample: 'Sunita Sharma...', mappedTo: 'tgt_8', status: 'correct', confidence: 91 },
    ],
    targetFields: [
      { id: 'tgt_1', name: 'full_name', type: 'varchar(255)', nullable: false, mappedFrom: 'src_1', required: true },
      { id: 'tgt_2', name: 'email_address', type: 'varchar(128)', nullable: true, mappedFrom: 'src_2', required: false },
      { id: 'tgt_3', name: 'mobile_number', type: 'varchar(20)', nullable: true, mappedFrom: 'src_3', required: false },
      { id: 'tgt_4', name: 'amount', type: 'decimal(12,2)', nullable: false, mappedFrom: 'src_4', required: true },
      { id: 'tgt_5', name: 'date', type: 'date', nullable: false, mappedFrom: 'src_5', required: true },
      { id: 'tgt_6', name: 'residential_address', type: 'text', nullable: true, mappedFrom: null, required: false },
      { id: 'tgt_7', name: 'employee_id', type: 'varchar(64)', nullable: true, mappedFrom: 'src_7', required: false, warning: 'Schema semantically mismatched: Patient ID mapped to Employee ID' },
      { id: 'tgt_8', name: 'guardian_contact', type: 'varchar(255)', nullable: true, mappedFrom: 'src_8', required: false },
      { id: 'tgt_9', name: 'patient_record_id', type: 'varchar(64)', nullable: false, mappedFrom: null, required: true },
    ],
    aiRecommendations: [
      {
        id: 'rec-1',
        title: 'High Confidence Alignment',
        description: 'Customer_Email has a 96% probability of mapping to email_address based on semantic NLP embeddings.',
        confidence: 96,
        type: 'success',
        suggestedAction: 'Accept Auto-Map'
      },
      {
        id: 'rec-2',
        title: 'Critical Schema Misalignment',
        description: 'Customer_ID was incorrectly mapped to Employee_ID (confidence 52%). Expected target: patient_record_id.',
        confidence: 52,
        type: 'critical',
        suggestedAction: 'Remap to patient_record_id'
      },
      {
        id: 'rec-3',
        title: 'Unmapped Required Field',
        description: 'Patient_Address (Permanent Address) has not been mapped to residential_address. 88% semantic match detected.',
        confidence: 88,
        type: 'warning',
        suggestedAction: 'Map Patient_Address → residential_address'
      }
    ]
  }
};
