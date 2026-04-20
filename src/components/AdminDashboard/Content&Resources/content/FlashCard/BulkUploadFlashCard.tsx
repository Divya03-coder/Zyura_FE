import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  useAddMoreFlashcardToFlashcardBankMutation,
  useBulkUploadFlashCardMutation,
} from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { setUploadIntoBank } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../ActionButtons";
import RequiredColumnsList from "../medical/studyMode/RequiredColumsList";
import UploadDropzone from "../medical/studyMode/UpdateDropZone";
import UploadPreview from "../medical/studyMode/UploadPreview";

const columns = [
  {
    label: "Front Side:",
    description: "Front Side (Question/Term)",
  },
  {
    label: "Back Side:",
    description: "Back Side (Answer/Definition)",
  },

  {
    label: "Explanation:",
    description: "Detailed explanation for correct answer",
  },
];

const BulkUploadFlashCard = () => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    contentType,
    uploadIntoBank,
    bankId,
    formData: selectFormData,
  } = useSelector((state: RootState) => state.staticContent);
  const [addMoreFlashcardToFlashcardBank, { isLoading: addMoreLoading }] =
    useAddMoreFlashcardToFlashcardBankMutation();
  const [bulkUploadFlashCard, { isLoading: isUploading }] =
    useBulkUploadFlashCardMutation();
  const handleFileSelect = (file: File, detectedCount: number) => {
    setSelectedFile(file);
    setDetectedCount(detectedCount);
    console.log(`File uploaded: ${file.name}, rows detected: ${detectedCount}`);
  };

  const dispatch = useDispatch();

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (uploadIntoBank && bankId) {
        addMoreFlashcardToFlashcardBank({
          flashCardBankId: bankId,
          data: formData,
          key: "bulk",
        });
        dispatch(setUploadIntoBank(false));
      } else {
        if (selectFormData) {
          formData.append("data", JSON.stringify(selectFormData));
        }
        if (formData) {
          await bulkUploadFlashCard(formData);
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
          isLoading={isUploading || addMoreLoading}
          onCancel={handleBack}
        />
      </div>
    </>
  );
};

export default BulkUploadFlashCard;
