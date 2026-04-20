import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useUploadBulkClinicalCasesMutation } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ActionButtons from "../ActionButtons";
import RequiredColumnsList from "../medical/studyMode/RequiredColumsList";
import UploadDropzone from "../medical/studyMode/UpdateDropZone";
import UploadPreview from "../medical/studyMode/UploadPreview";
import { FiDownload } from "react-icons/fi";

/** Column hints aligned with backend `row_to_clinical_case` (spreadsheet headers). */
export const clinicalCaseBulkColumns = [
  {
    label: "caseTitle (optional)",
    description:
      "Override per row only; otherwise uses step 1 “Clinical Case Title” in `data`",
  },
  { label: "patientPresentation", description: "Patient presentation" },
  {
    label: "historyOfPresentIllness",
    description: "History of present illness",
  },
  {
    label: "physicalExamination",
    description: "Physical examination findings",
  },
  { label: "imaging", description: "Imaging summary" },
  {
    label: "difficultyLevel",
    description: "Basic, Intermediate, or Advance",
  },
  {
    label:
      "subject, system, topic, contentFor, profileType, title (+ optional subtopic)",
    description:
      "From step 1 only — multipart `data` JSON (`title` = Clinical Case Title for every row unless a row has caseTitle column)",
  },
  { label: "lab1Name, lab1Value … lab12", description: "Laboratory pairs" },
  { label: "diagnosisQuestion", description: "Main diagnosis question text" },
  {
    label: "diagnosisOptionA–D",
    description: "Four diagnosis option texts",
  },
  { label: "diagnosisCorrectOption", description: "A, B, C, or D" },
  {
    label: "diagnosisExplanation",
    description: "Explanation for correct diagnosis",
  },
  {
    label: "diagnosisOptionX_supportingEvidence / _refutingEvidence",
    description: "Optional; separate items with | ; or newline",
  },
  {
    label: "mcqN_question, mcqN_correctOption",
    description: "N = 1…15; follow-up MCQs",
  },
  {
    label: "mcqN_optionAText…mcqN_optionFText (+ Explanation each)",
    description: "At least four non-empty options per MCQ",
  },
];

const AddBulkClinicalCase = () => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { formData, contentType } = useSelector(
    (state: RootState) => state.staticContent,
  );
  const [uploadBulkClinicalCases, { isLoading }] =
    useUploadBulkClinicalCasesMutation();
  const navigate = useNavigate();

  const handleFileSelect = (file: File, rows: number) => {
    setSelectedFile(file);
    setDetectedCount(rows);
  };

  const buildTaxonomyPayload = () => {
    if (!formData) return null;
    return {
      subject: formData.subject,
      system: formData.system,
      topic: formData.topic,
      subtopic: formData.subtopic?.trim() || undefined,
      contentFor: formData.contentFor,
      profileType: formData.profileType,
      title: formData.title,
    };
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const taxonomy = buildTaxonomyPayload();
    if (
      !taxonomy?.subject?.trim() ||
      !taxonomy.system?.trim() ||
      !taxonomy.topic?.trim() ||
      !taxonomy.contentFor ||
      !taxonomy.profileType?.trim() ||
      !formData?.title?.trim()
    ) {
      toast.error(
        "Complete step 1: Clinical Case Title, subject, system, topic, audience, and profile type (sent as `data`, not in the CSV).",
      );
      return;
    }

    const form = new FormData();
    form.append("file", selectedFile);
    form.append("data", JSON.stringify(taxonomy));

    try {
      const result = await uploadBulkClinicalCases(form).unwrap();
      toast.success(
        `Imported ${result.insertedCount} clinical case(s).${result.skippedCount > 0 ? ` Skipped ${result.skippedCount} row(s).` : ""}`,
      );
      if (result.errors?.length) {
        const first = result.errors[0];
        toast.message(`Row ${first.row}: ${first.message}`, { duration: 6000 });
      }
      navigate(`/admin/content-management/dashboard/${contentType}`);
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "data" in e
          ? String((e as { data?: { message?: string } }).data?.message ?? "")
          : "";
      toast.error(msg || "Bulk upload failed.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CommonBorderWrapper>
        <div className="pt-6">
          <div className="mx-auto">
            <div className="flex justify-end mb-6">
              <a
                className="px-2 sm:px-3 py-2 mx-1 flex items-center gap-2 border border-border rounded-md font-medium transition text-[#0F172A] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 !text-[#FFFFFF] bg-blue-600 hover:bg-blue-700"
                href="https://drive.google.com/file/d/10on5WpycZaHE1VU9IlvaOg_uShVwKwvH/view?usp=sharing"
                target="_blank"
                download
              >
               <FiDownload />
               Sample CSV

              </a>
            </div>
            <div className="shadow-sm p-16 mb-6 rounded border border-slate-300 bg-white">
              <UploadDropzone
                label="Upload clinical case file"
                acceptedFormats=".csv, .xlsx, .xls"
                maxSize="10MB"
                onFileSelect={handleFileSelect}
              />
            </div>

            <RequiredColumnsList columns={clinicalCaseBulkColumns} />
            <UploadPreview
              detectedCount={detectedCount}
              label="Upload Preview"
            />
          </div>
        </div>
      </CommonBorderWrapper>

      <div className="mb-6">
        <ActionButtons
          onSavePublish={handleImport}
          isLoading={isLoading}
          onCancel={handleBack}
        />
      </div>
    </>
  );
};

export default AddBulkClinicalCase;
