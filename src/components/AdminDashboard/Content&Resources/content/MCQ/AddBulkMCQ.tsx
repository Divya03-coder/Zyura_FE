import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  useAddMoreMcqToMcqBankMutation,
  useUploadBulkMcqApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { setUploadIntoBank } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../ActionButtons";
import RequiredColumnsList from "../medical/studyMode/RequiredColumsList";
import UploadDropzone from "../medical/studyMode/UpdateDropZone";
import UploadPreview from "../medical/studyMode/UploadPreview";

export const columns = [
  { label: "Question", description: "The question text" },
  {
    label: "Image Description",
    description: "Description of the question image (if any)",
  },

  { label: "Option A", description: "First answer option" },
  { label: "Explanation A", description: "Explanation for option A" },

  { label: "Option B", description: "Second answer option" },
  { label: "Explanation B", description: "Explanation for option B" },

  { label: "Option C", description: "Third answer option" },
  { label: "Explanation C", description: "Explanation for option C" },

  { label: "Option D", description: "Fourth answer option" },
  { label: "Explanation D", description: "Explanation for option D" },

  { label: "Correct Option", description: "Correct answer: A, B, C, or D" },
  { label: "Difficulty", description: "Basic, Intermediate, or Advanced" },
];

const AddBulkMCQ = () => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const {
    contentType,
    formData: selectFormData,
    bankId,
    uploadIntoBank,
  } = useSelector((state: RootState) => state.staticContent);

  const [uploadBulkMcqApi, { isLoading: isUploading }] =
    useUploadBulkMcqApiMutation();

  const [addMoreMcqToMcqBank, { isLoading: isAdding }] =
    useAddMoreMcqToMcqBankMutation();

  const handleFileSelect = (file: File, detectedCount: number) => {
    setSelectedFile(file);
    setDetectedCount(detectedCount);
    console.log(`File uploaded: ${file.name}, rows detected: ${detectedCount}`);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      if (uploadIntoBank && bankId) {
        addMoreMcqToMcqBank({
          mcqBankId: bankId,
          data: formData,
          key: "bulk",
        });
        dispatch(setUploadIntoBank(false));
      } else {
        if (selectFormData) {
          formData.append("data", JSON.stringify(selectFormData));
        }
        if (formData) {
          await uploadBulkMcqApi(formData);
        }
      }
      navigate(`/admin/content-management/dashboard/${contentType}`);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <CommonBorderWrapper>
        <div className=" pt-6">
          <div className="mx-auto">
            <div className="shadow-sm p-16 mb-6 rounded border border-slate-300 bg-white">
              <UploadDropzone
                label="Upload Question files"
                acceptedFormats=".csv, .xlsx, .xls"
                maxSize="10MB"
                onFileSelect={handleFileSelect}
              />
            </div>

            <RequiredColumnsList columns={columns} />
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
          isLoading={isUploading || isAdding}
          onCancel={handleBack}
        />
      </div>
    </>
  );
};

export default AddBulkMCQ;
