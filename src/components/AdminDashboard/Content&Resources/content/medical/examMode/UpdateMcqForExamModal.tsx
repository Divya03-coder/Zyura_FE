import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import { useAppSelector } from "@/store/hook";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { DuplicateWarningTooltip } from "@/components/AdminDashboard/reuseable/DuplicateWarningTooltip";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { useCheckDuplicateExamMCQMutation } from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useCheckDuplicateExamMCQMutation as useCheckDuplicateExamMCQMutationPro } from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import { SingleMCQUpdatePayloadForExam } from "@/store/features/adminDashboard/examMode/studentApi/types/allExam";
import { ANSWER_OPTIONS } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateMCQModalProps {
  data: SingleMCQUpdatePayloadForExam;
  onClose: () => void;
  onSubmit: (data: SingleMCQUpdatePayloadForExam) => void;
  isLoading?: boolean;
  examId?: string;
}

const UpdateMCQSchema = z.object({
  question: z.string().min(1, "Question is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  optionE: z.string().optional(),
  optionF: z.string().optional(),
  imageDescription: z.string().url().optional().or(z.literal("")),
  correctOption: z.enum(ANSWER_OPTIONS),
  explanationA: z.string().optional(),
  explanationB: z.string().optional(),
  explanationC: z.string().optional(),
  explanationD: z.string().optional(),
  explanationE: z.string().optional(),
  explanationF: z.string().optional(),
});

type UpdateMCQFormValues = z.infer<typeof UpdateMCQSchema>;

const inputClass = {
  label: "block text-sm font-normal text-black font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

const options = ["A", "B", "C", "D", "E", "F"] as const;
type OptionKey = (typeof options)[number];

const UpdateMcqForExamModal: FC<UpdateMCQModalProps> = ({
  data,
  onClose,
  onSubmit,
  isLoading,
  examId,
}) => {
  const getInitialOptionCount = () => {
    if (data.optionF) return 6;
    if (data.optionE) return 5;
    return 4;
  };

  const [optionCount, setOptionCount] = useState(getInitialOptionCount);
  const [duplicates, setDuplicates] = useState<any[]>([]);
  const { contentFor } = useAppSelector((state) => state.staticContent);
  const isStudent = contentFor === "student";

  // FIX: Call both hooks unconditionally, then select which one to use
  const [checkDuplicateExamMCQStudent] = useCheckDuplicateExamMCQMutation();
  const [checkDuplicateExamMCQPro] = useCheckDuplicateExamMCQMutationPro();
  const checkDuplicateExamMCQ = isStudent
    ? checkDuplicateExamMCQStudent
    : checkDuplicateExamMCQPro;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateMCQFormValues>({
    resolver: zodResolver(UpdateMCQSchema),
    defaultValues: {
      ...data,
      optionE: data.optionE ?? "",
      optionF: data.optionF ?? "",
      explanationE: data.explanationE ?? "",
      explanationF: data.explanationF ?? "",
      imageDescription: data.imageDescription ?? "",
      // FIX: ensure correctOption is always set as a string value
      correctOption: data.correctOption as (typeof ANSWER_OPTIONS)[number],
    },
  });

  const questionText = watch("question");

  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();
  const [imagePreview, setImagePreview] = useState<string>(
    data.imageDescription ?? "",
  );

  // ✅ Check for duplicates when question changes
  useEffect(() => {
    const checkDuplicates = async () => {
      if (!questionText || questionText.trim().length < 10) {
        setDuplicates([]);
        return;
      }

      try {
        const result = await checkDuplicateExamMCQ({
          question: questionText,
          examId: examId ?? null,
        }).unwrap();

        if (result.data.hasDuplicates) {
          setDuplicates(result.data.duplicates);
        } else {
          setDuplicates([]);
        }
      } catch (error) {
        console.error("Duplicate check error:", error);
      }
    };

    const debounceTimer = setTimeout(checkDuplicates, 500);
    return () => clearTimeout(debounceTimer);
  }, [questionText, examId, checkDuplicateExamMCQ]);

  // FIX: derive available correct answer options dynamically from current optionCount
  // so the dropdown only shows options that actually exist (prevents invalid selection)
  const correctAnswerOptions = useMemo(() => {
    return options.slice(0, optionCount).map((o) => ({ label: o, value: o }));
  }, [optionCount]);

  const addOption = () => {
    if (optionCount < 6) {
      setOptionCount(optionCount + 1);
    }
  };

  const removeLastOption = () => {
    if (optionCount > 4) {
      // FIX: off-by-one corrected — charCode 65 = 'A', so index optionCount-1 maps to the last option letter
      const optionToRemove = String.fromCharCode(64 + optionCount) as OptionKey;
      setValue(`option${optionToRemove}`, "");
      setValue(`explanation${optionToRemove}` as any, "");
      setOptionCount(optionCount - 1);
    }
  };

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await uploadSingleImage(formData).unwrap();
      const fileUrl = result.data.fileUrl;
      setValue("imageDescription", fileUrl, { shouldDirty: true });
      setImagePreview(fileUrl);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleFormSubmit = (formData: UpdateMCQFormValues) => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <ModalCloseButton onClick={onClose} />
        <FormHeader title="Update MCQ" />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Question */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={inputClass.label}>Question</label>
              {duplicates.length > 0 && (
                <DuplicateWarningTooltip duplicates={duplicates} />
              )}
            </div>
            <textarea
              {...register("question")}
              rows={3}
              className={`${inputClass.input} resize-none`}
              placeholder="Enter the question"
            />
            {errors.question && (
              <p className={inputClass.error}>{errors.question.message}</p>
            )}
            {duplicates.length > 0 && (
              <p className={inputClass.error}>
                {duplicates.length} similar question(s) present already
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className={inputClass.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              className={`cursor-pointer ${inputClass.input}`}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleUploadImage(e.target.files[0]);
                }
              }}
              disabled={isUploadingImage}
            />
            {isUploadingImage && (
              <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 object-contain border rounded"
                />
              </div>
            )}
            <input type="hidden" {...register("imageDescription")} />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.slice(0, optionCount).map((opt) => (
              <div key={opt}>
                <label className={inputClass.label}>
                  Option {opt}
                  {opt === "E" || opt === "F" ? (
                    <span className="text-gray-400 text-xs ml-1">
                      (optional)
                    </span>
                  ) : null}
                </label>
                <input
                  {...register(`option${opt}`)}
                  className={inputClass.input}
                  placeholder={`Option ${opt} text${
                    opt === "E" || opt === "F" ? " (optional)" : ""
                  }`}
                />
                <textarea
                  {...register(`explanation${opt}` as any)}
                  rows={2}
                  className={`${inputClass.input} mt-2 resize-none`}
                  placeholder={`Explanation for Option ${opt} (optional)`}
                />
                {errors[`option${opt}` as keyof UpdateMCQFormValues] && (
                  <p className={inputClass.error}>
                    {
                      errors[`option${opt}` as keyof UpdateMCQFormValues]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add/Remove Option Buttons */}
          <div className="flex gap-2">
            {optionCount < 6 && (
              <CommonButton
                type="button"
                onClick={addOption}
                className="!text-blue-600 text-sm"
              >
                + Add Option {String.fromCharCode(65 + optionCount)}
              </CommonButton>
            )}
            {optionCount > 4 && (
              <CommonButton
                type="button"
                onClick={removeLastOption}
                className="!text-red-500 text-sm"
              >
                - Remove Option {String.fromCharCode(64 + optionCount)}
              </CommonButton>
            )}
          </div>

          {/* Correct Option */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={inputClass.label}>Correct Option</label>
              <Controller
                control={control}
                name="correctOption"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={String(field.value ?? "")}
                    key={String(field.value)}
                    item={correctAnswerOptions}
                    onValueChange={(val) => {
                      field.onChange(val);
                    }}
                  />
                )}
              />
              {errors.correctOption && (
                <p className={inputClass.error}>
                  {errors.correctOption.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <CommonButton type="button" onClick={onClose} className="">
              Cancel
            </CommonButton>
            <CommonButton type="submit" className="!bg-blue-500 !text-white">
              {isLoading ? (
                <ButtonWithLoading title="Updating..." />
              ) : (
                "Update MCQ"
              )}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMcqForExamModal;
