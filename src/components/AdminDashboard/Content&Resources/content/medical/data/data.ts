export interface ContentItem {
  id: string;
  name: string;
  type: "MCQ" | "Flashcard" | "Clinical Case" | "OSCE" | "Notes";
  status: "Published" | "Draft";
}

export type ContentCategory =
  | "MCQ"
  | "Flashcard"
  | "ClinicalCase"
  | "OSCE"
  | "Notes";

export type ContentData = Record<ContentCategory, ContentItem[]>;

export const tableData: ContentData = {
  MCQ: [
    {
      id: "MCQ0001",
      name: "Anatomy - Skeletal System",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0002",
      name: "Physiology - Respiratory System",
      type: "MCQ",
      status: "Draft",
    },
    {
      id: "MCQ0003",
      name: "Biochemistry - Enzyme Function",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0004",
      name: "Anatomy - Nervous - Brain - Cerebrum",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0005",
      name: "Microbiology - Bacterial Structure",
      type: "MCQ",
      status: "Draft",
    },
    {
      id: "MCQ0006",
      name: "Pathology - Inflammation",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0007",
      name: "Pharmacology - Antibiotics",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0008",
      name: "Physiology - Cardiac Cycle",
      type: "MCQ",
      status: "Draft",
    },
    {
      id: "MCQ0009",
      name: "Histology - Connective Tissue",
      type: "MCQ",
      status: "Published",
    },
    {
      id: "MCQ0010",
      name: "Neuroanatomy - Brainstem",
      type: "MCQ",
      status: "Published",
    },
  ],

  Flashcard: [
    {
      id: "FC0001",
      name: "Anatomy - Muscles of Arm",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0002",
      name: "Physiology - Kidney Function",
      type: "Flashcard",
      status: "Draft",
    },
    {
      id: "FC0003",
      name: "Pharmacology - Drug Metabolism",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0004",
      name: "Biochemistry - Vitamins",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0005",
      name: "Microbiology - Viruses",
      type: "Flashcard",
      status: "Draft",
    },
    {
      id: "FC0006",
      name: "Pathology - Neoplasia",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0007",
      name: "Physiology - Blood Pressure Regulation",
      type: "Flashcard",
      status: "Draft",
    },
    {
      id: "FC0008",
      name: "Anatomy - Cranial Nerves",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0009",
      name: "Histology - Epithelium",
      type: "Flashcard",
      status: "Published",
    },
    {
      id: "FC0010",
      name: "Biochemistry - Amino Acids",
      type: "Flashcard",
      status: "Draft",
    },
  ],

  ClinicalCase: [
    {
      id: "CC0001",
      name: "Cardiac Arrest Management",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0002",
      name: "Diabetic Ketoacidosis",
      type: "Clinical Case",
      status: "Draft",
    },
    {
      id: "CC0003",
      name: "Hypertension Follow-Up",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0004",
      name: "Pneumonia Diagnosis",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0005",
      name: "Anemia Investigation",
      type: "Clinical Case",
      status: "Draft",
    },
    {
      id: "CC0006",
      name: "Stroke Rehabilitation",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0007",
      name: "Asthma Exacerbation",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0008",
      name: "Renal Failure Assessment",
      type: "Clinical Case",
      status: "Draft",
    },
    {
      id: "CC0009",
      name: "Liver Cirrhosis Management",
      type: "Clinical Case",
      status: "Published",
    },
    {
      id: "CC0010",
      name: "Epilepsy Case Review",
      type: "Clinical Case",
      status: "Published",
    },
  ],

  OSCE: [
    {
      id: "OSCE0001",
      name: "Cardiovascular Examination",
      type: "OSCE",
      status: "Published",
    },
    {
      id: "OSCE0002",
      name: "Respiratory Examination",
      type: "OSCE",
      status: "Draft",
    },
    {
      id: "OSCE0003",
      name: "Abdominal Palpation",
      type: "OSCE",
      status: "Published",
    },
    {
      id: "OSCE0004",
      name: "Neurological Examination",
      type: "OSCE",
      status: "Published",
    },
    { id: "OSCE0005", name: "Eye Examination", type: "OSCE", status: "Draft" },
    {
      id: "OSCE0006",
      name: "ENT Examination",
      type: "OSCE",
      status: "Published",
    },
    {
      id: "OSCE0007",
      name: "Musculoskeletal Assessment",
      type: "OSCE",
      status: "Published",
    },
    {
      id: "OSCE0008",
      name: "Skin Lesion Evaluation",
      type: "OSCE",
      status: "Draft",
    },
    {
      id: "OSCE0009",
      name: "Cranial Nerve Testing",
      type: "OSCE",
      status: "Published",
    },
    {
      id: "OSCE0010",
      name: "Gait Examination",
      type: "OSCE",
      status: "Published",
    },
  ],

  Notes: [
    {
      id: "NT0001",
      name: "Summary - Nervous System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0002",
      name: "Summary - Endocrine System",
      type: "Notes",
      status: "Draft",
    },
    {
      id: "NT0003",
      name: "Summary - Digestive System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0004",
      name: "Summary - Cardiovascular System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0005",
      name: "Summary - Respiratory System",
      type: "Notes",
      status: "Draft",
    },
    {
      id: "NT0006",
      name: "Summary - Muscular System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0007",
      name: "Summary - Skeletal System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0008",
      name: "Summary - Reproductive System",
      type: "Notes",
      status: "Draft",
    },
    {
      id: "NT0009",
      name: "Summary - Urinary System",
      type: "Notes",
      status: "Published",
    },
    {
      id: "NT0010",
      name: "Summary - Immune System",
      type: "Notes",
      status: "Published",
    },
  ],
};
