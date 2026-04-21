import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { DuplicateWarningTooltip } from "@/components/AdminDashboard/reuseable/DuplicateWarningTooltip";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import {
  useCheckDuplicateMCQMutation,
  useUploadSingleImageMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { ANSWER_OPTIONS, CorrectAnswerOption, DifficultyLevel } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UpdateMCQModalProps {
  data: BackendMCQData;
  onClose: () => void;
  onSubmit: (data: BackendMCQData) => void;
  isLoading?: boolean;
  mcqBankId?: string;
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

// ─── Constants (defined OUTSIDE component to avoid recreation) ────────────────

const OPTIONS = ["A", "B", "C", "D", "E", "F"] as const;
type OptionKey = (typeof OPTIONS)[number];

const CORRECT_ANSWER_OPTIONS = OPTIONS.map((o) => ({ label: o, value: o }));

const DIFFICULTY_OPTIONS = [
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
] as const;

const INPUT_CLASS = {
  label: "block text-sm font-normal text-black font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs",
  error: "text-red-500 text-sm mt-1",
} as const;

// ─── Schema (defined OUTSIDE component) ───────────────────────────────────────

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

// ─── Helper ───────────────────────────────────────────────────────────────────

const getInitialOptionCount = (data: BackendMCQData): number => {
  if (data.optionF) return 6;
  if (data.optionE) return 5;
  return 4;
};

const buildDefaultValues = (data: BackendMCQData): UpdateMCQFormValues => ({
  ...data,
  optionE: data.optionE ?? "",
  optionF: data.optionF ?? "",
  explanationE: data.explanationE ?? "",
  explanationF: data.explanationF ?? "",
  imageDescription: data.imageDescription ?? "",
});

// ─── Component ────────────────────────────────────────────────────────────────

const UpdateMcqModal: FC<UpdateMCQModalProps> = ({
  data,
  onClose,
  onSubmit,
  isLoading,
  mcqBankId,
}) => {
  const [optionCount, setOptionCount] = useState(() =>
    getInitialOptionCount(data),
  );
  const [duplicates, setDuplicates] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string>(
    data.imageDescription ?? "",
  );

  // Track previous data identity to avoid unnecessary resets
  const prevDataRef = useRef<BackendMCQData | null>(null);

  const [checkDuplicateMCQ] = useCheckDuplicateMCQMutation();
  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();

  // Memoize default values so zodResolver doesn't get a new object each render
  const defaultValues = useMemo(() => buildDefaultValues(data), [data]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateMCQFormValues>({
    resolver: zodResolver(UpdateMCQSchema),
    defaultValues,
  });

  // ── Sync form when `data` prop reference changes ───────────────────────────
  useEffect(() => {
    if (prevDataRef.current === data) return; // same reference → skip
    prevDataRef.current = data;

    reset(buildDefaultValues(data));
    setOptionCount(getInitialOptionCount(data));
    setImagePreview(data.imageDescription ?? "");
  }, [data, reset]);

  // ── Duplicate check with debounce ─────────────────────────────────────────
  // Use watch with a subscription instead of re-rendering on every keystroke
  const questionText = watch("question");
  const mcqBankIdRef = useRef(mcqBankId);
  mcqBankIdRef.current = mcqBankId;

  useEffect(() => {
    if (!questionText || questionText.trim().length < 10) {
      setDuplicates([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const result = await checkDuplicateMCQ({
          question: questionText,
          excludeBankId: mcqBankIdRef.current,
        }).unwrap();

        setDuplicates(
          result.data.hasDuplicates ? result.data.duplicates : [],
        );
      } catch {
        // silently ignore — duplicate check is non-critical
      }
    }, 600); // slightly longer debounce to reduce API calls

    return () => clearTimeout(timer);
    // ✅ checkDuplicateMCQ is a stable RTK mutation reference — safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionText]);

  // ── Option management ─────────────────────────────────────────────────────

  const addOption = useCallback(() => {
    setOptionCount((prev) => Math.min(prev + 1, 6));
  }, []);

  const removeLastOption = useCallback(() => {
    setOptionCount((prev) => {
      if (prev <= 4) return prev;
      const optionToRemove = String.fromCharCode(64 + prev) as OptionKey;
      setValue(`option${optionToRemove}`, "");
      setValue(`explanation${optionToRemove}` as any, "");
      return prev - 1;
    });
  }, [setValue]);

  // ── Image upload ──────────────────────────────────────────────────────────

  const handleUploadImage = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const result = await uploadSingleImage(formData).unwrap();
        const fileUrl = result.data.fileUrl;
        setValue("imageDescription", fileUrl, { shouldDirty: true });
        setImagePreview(fileUrl);
      } catch {
        console.error("Image upload failed");
      }
    },
    [uploadSingleImage, setValue],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUploadImage(file);
    },
    [handleUploadImage],
  );

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleFormSubmit = useCallback(
    (formData: UpdateMCQFormValues) => {
      onSubmit(formData);
    },
    [onSubmit],
  );

  // ── Visible options slice (memoized) ──────────────────────────────────────

  const visibleOptions = useMemo(
    () => OPTIONS.slice(0, optionCount),
    [optionCount],
  );

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader title="Update MCQ" />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Question */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={INPUT_CLASS.label}>Question</label>
              {duplicates.length > 0 && (
                <DuplicateWarningTooltip duplicates={duplicates} />
              )}
            </div>
            <textarea
              {...register("question")}
              className={INPUT_CLASS.input}
              rows={3}
              placeholder="Question text"
            />
            {errors.question && (
              <p className={INPUT_CLASS.error}>{errors.question.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className={INPUT_CLASS.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              className={`cursor-pointer ${INPUT_CLASS.input}`}
              onChange={handleFileChange}
              disabled={isUploadingImage}
            />
            {isUploadingImage && (
              <p className="text-blue-500 text-sm mt-1">Uploading image…</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 object-contain border rounded"
                  loading="lazy"
                />
              </div>
            )}
            <input type="hidden" {...register("imageDescription")} />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleOptions.map((opt) => (
              <OptionField
                key={opt}
                opt={opt}
                register={register}
                errors={errors}
              />
            ))}
          </div>

          {/* Add / Remove option buttons */}
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
              <label className={INPUT_CLASS.label}>Correct Option</label>
              <Controller
                control={control}
                name="correctOption"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={CORRECT_ANSWER_OPTIONS}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>

            <div>
              <label className={INPUT_CLASS.label}>Difficulty</label>
              <Controller
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={DIFFICULTY_OPTIONS}
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
                <ButtonWithLoading title="Updating…" />
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

// ─── Sub-component: extracted to prevent parent re-renders ────────────────────
// Keeping each option as its own component means only changed fields re-render.

interface OptionFieldProps {
  opt: OptionKey;
  register: ReturnType<typeof useForm<UpdateMCQFormValues>>["register"];
  errors: ReturnType<typeof useForm<UpdateMCQFormValues>>["formState"]["errors"];
}

const OptionField: FC<OptionFieldProps> = ({ opt, register, errors }) => {
  const isOptional = opt === "E" || opt === "F";
  return (
    <div>
      <label className={INPUT_CLASS.label}>
        Option {opt}
        {isOptional && (
          <span className="text-gray-400 text-xs ml-1">(optional)</span>
        )}
      </label>
      <input
        {...register(`option${opt}`)}
        className={INPUT_CLASS.input}
        placeholder={`Option ${opt} text`}
      />
      <textarea
        {...register(`explanation${opt}` as `explanation${OptionKey}`)}
        rows={2}
        className={`${INPUT_CLASS.input} mt-2 resize-none`}
        placeholder={`Explanation for Option ${opt} (optional)`}
      />
      {errors[`option${opt}` as keyof UpdateMCQFormValues] && (
        <p className={INPUT_CLASS.error}>
          {
            errors[`option${opt}` as keyof UpdateMCQFormValues]
              ?.message as string
          }
        </p>
      )}
    </div>
  );
};

export default UpdateMcqModal;