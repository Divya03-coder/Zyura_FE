import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useCreateExamBulkForProfessionalMutation } from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import { useCreateExamBulkMutation } from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ActionButtons from "../../ActionButtons";
import { columns } from "../../MCQ/AddBulkMCQ";
import RequiredColumnsList from "../../medical/studyMode/RequiredColumsList";
import UploadDropzone from "../../medical/studyMode/UpdateDropZone";
import UploadPreview from "../../medical/studyMode/UploadPreview";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs",
  error: "text-red-500 text-sm mt-1",
};

interface MCQFormValues {
  onClose: () => void;
}

const BulkExamModal: React.FC<MCQFormValues> = ({ onClose }) => {
  const [detectedCount, setDetectedCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { profileType, contentFor } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const isStudent = contentFor === "student";
  const isProfessional = contentFor === "professional";

  console.log("isStudent", isStudent, "isProfessional", isProfessional);

  const bulkExamSchema = z
    .object({
      examName: z.string().min(1, { message: "Exam Name is required" }),
      subject: z.string().optional(),
      totalTime: z.number().min(1, { message: "Total Time is required" }),
    })
    .superRefine((data, ctx) => {
      if (isStudent && (!data.subject || data.subject.trim() === "")) {
        ctx.addIssue({
          path: ["subject"],
          message: "Subject is required for students",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  type BulkExamFormData = z.infer<typeof bulkExamSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BulkExamFormData>({
    resolver: zodResolver(bulkExamSchema),
    defaultValues: {
      examName: "",
      subject: "",
      totalTime: 0,
    },
  });

  const [uploadBulkMcqApi, { isLoading: isUploading }] =
    useCreateExamBulkMutation();
  const [
    uploadBulkMcqForProfessional,
    { isLoading: isUploadingForProfessional },
  ] = useCreateExamBulkForProfessionalMutation();

  const handleFileSelect = (file: File, detectedCount: number) => {
    setSelectedFile(file);
    setDetectedCount(detectedCount);
  };

  const handleImport = async (data: BulkExamFormData) => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      // Determine payload + API call
      if (isStudent) {
        const studentFormData = new FormData();
        studentFormData.append("file", selectedFile);
        studentFormData.append(
          "data",
          JSON.stringify({
            profileType,
            examName: data.examName,
            subject: data.subject!,
            totalTime: data.totalTime,
          }),
        );
        await uploadBulkMcqApi(studentFormData).unwrap();
      }

      if (isProfessional) {
        const professionalFormData = new FormData();
        professionalFormData.append("file", selectedFile);
        professionalFormData.append(
          "data",
          JSON.stringify({
            professionName: profileType,
            examName: data.examName,
            totalTime: data.totalTime,
          }),
        );
        await uploadBulkMcqForProfessional(professionalFormData).unwrap();
      }

      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload. Check console for details.");
    }
  };

  const handleCancel = () => onClose();

  const submitForm = handleSubmit(handleImport);

  return (
    <div className="w-full fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="w-[50%] max-h-[90vh] overflow-y-auto bg-white z-100 shadow p-4">
        <CommonBorderWrapper className="mb-6">
          <h2 className="text-base font-semibold mb-4">Exam Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Exam Name</label>
              <input
                {...register("examName")}
                className={inputClass.input}
                placeholder="Enter exam name"
              />
              {errors.examName && (
                <p className={inputClass.error}>{errors.examName.message}</p>
              )}
            </div>

            {isStudent && (
              <div>
                <label className={inputClass.label}>Subject</label>
                <input
                  {...register("subject")}
                  className={inputClass.input}
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className={inputClass.error}>{errors.subject.message}</p>
                )}
              </div>
            )}

            <div>
              <label className={inputClass.label}>Total Time (minutes)</label>
              <input
                type="number"
                {...register("totalTime", { valueAsNumber: true })}
                className={inputClass.input}
                placeholder="Enter total time"
              />
              {errors.totalTime && (
                <p className={inputClass.error}>{errors.totalTime.message}</p>
              )}
            </div>
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper>
          <div className="pt-6">
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
            onSavePublish={submitForm}
            isLoading={isUploading || isUploadingForProfessional}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkExamModal;
