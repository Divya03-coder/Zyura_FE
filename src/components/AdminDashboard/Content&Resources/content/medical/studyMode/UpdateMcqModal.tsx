import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { ANSWER_OPTIONS, CorrectAnswerOption, DifficultyLevel } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
interface UpdateMCQModalProps {
  data: BackendMCQData;
  onClose: () => void;
  onSubmit: (data: BackendMCQData) => void;
  isLoading?: boolean;
}

export interface BackendMCQData {
  difficulty: DifficultyLevel;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  optionF?: string;
  imageDescription?: string;
  correctOption: CorrectAnswerOption;
  explanationA?: string;
  explanationB?: string;
  explanationC?: string;
  explanationD?: string;
  explanationE?: string;
  explanationF?: string;
}

// Zod schema
const UpdateMCQSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
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

// Options
const options = ["A", "B", "C", "D", "E", "F"] as const;
type OptionKey = (typeof options)[number];

const correctAnswerOptions = options.map((o) => ({ label: o, value: o }));
const difficultyOptions = [
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
];

const UpdateMcqModal: FC<UpdateMCQModalProps> = ({
  data,
  onClose,
  onSubmit,
  isLoading,
}) => {
  // Determine initial option count
  const getInitialOptionCount = () => {
    if (data.optionF) return 6;
    if (data.optionE) return 5;
    return 4;
  };

  const [optionCount, setOptionCount] = useState(getInitialOptionCount);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateMCQFormValues>({
    resolver: zodResolver(UpdateMCQSchema),
    defaultValues: {
      ...data,
      optionE: data.optionE ?? "",
      optionF: data.optionF ?? "",
      explanationE: data.explanationE ?? "",
      explanationF: data.explanationF ?? "",
    },
  });
  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();
  const [imagePreview, setImagePreview] = useState<string>(
    data.imageDescription ?? "",
  );

  useEffect(() => {
    reset({
      ...data,
      optionE: data.optionE ?? "",
      optionF: data.optionF ?? "",
      explanationE: data.explanationE ?? "",
      explanationF: data.explanationF ?? "",
      imageDescription: data.imageDescription ?? "",
    });
    setOptionCount(getInitialOptionCount());
    setImagePreview(data.imageDescription ?? "");
  }, [data, reset]);

  const addOption = () => {
    if (optionCount < 6) {
      setOptionCount(optionCount + 1);
    }
  };

  const removeLastOption = () => {
    if (optionCount > 4) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader title="Update MCQ" />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className={inputClass.label}>Question</label>
            <textarea
              {...register("question")}
              className={inputClass.input}
              rows={3}
              placeholder="Question text"
            />
            {errors.question && (
              <p className={inputClass.error}>{errors.question.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              className={` cursor-pointer ${inputClass.input}`}
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
                  {(opt === "E" || opt === "F") && (
                    <span className="text-gray-400 text-xs ml-1">
                      (optional)
                    </span>
                  )}
                </label>
                <input
                  {...register(`option${opt}`)}
                  className={inputClass.input}
                  placeholder={`Option ${opt} text`}
                />
                <textarea
                  {...register(
                    `explanation${opt}` as `explanation${OptionKey}`,
                  )}
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

          {/* Add / Remove Options */}
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

          {/* Correct Option & Difficulty */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={inputClass.label}>Correct Option</label>
              <Controller
                control={control}
                name="correctOption"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={correctAnswerOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>

            <div>
              <label className={inputClass.label}>Difficulty</label>
              <Controller
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={difficultyOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <CommonButton type="button" onClick={onClose}>
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

export default UpdateMcqModal;
