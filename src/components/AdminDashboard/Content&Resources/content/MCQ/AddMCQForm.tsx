import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  useAddMoreMcqToMcqBankMutation,
  useCheckDuplicateMCQMutation,
  useUploadManualMcqMutation,
  useUploadSingleImageMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { DuplicateWarningTooltip } from "@/components/AdminDashboard/reuseable/DuplicateWarningTooltip";
import { setUploadIntoBank } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { correctAnswerOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ActionButtons from "../ActionButtons";

const MCQOptionSchema = z.object({
  option: z.string(),
  optionText: z.string().optional(),
  explanation: z.string().optional(),
});

const MCQSchema = z
  .object({
    difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
    question: z.string().min(1, { message: "Question is required" }),
    imageDescription: z.string().url().optional().or(z.literal("")),
    options: z.array(MCQOptionSchema).min(4).max(6),
    correctOption: z.enum(["A", "B", "C", "D", "E", "F"]),
  })
  .superRefine((data, ctx) => {
    // A–D must have text (E and F are optional)
    data.options.forEach((opt, index) => {
      if (
        ["A", "B", "C", "D"].includes(opt.option) &&
        (!opt.optionText || opt.optionText.trim() === "")
      ) {
        ctx.addIssue({
          path: ["options", index, "optionText"],
          message: `Option ${opt.option} is required`,
          code: z.ZodIssueCode.custom,
        });
      }
    });

    // Check if correct answer has text
    const correct = data.options.find((o) => o.option === data.correctOption);
    if (!correct?.optionText?.trim()) {
      ctx.addIssue({
        path: ["correctOption"],
        message: "Correct answer must have text",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const FinalSchema = z.object({
  mcqs: z.array(MCQSchema).min(1),
});

type MCQFormValues = z.infer<typeof FinalSchema>;

const inputClass = {
  label: "block text-sm font-normal text-black font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

interface AddMCQFormProps {
  handleCancel: () => void;
}
const AddMCQForm: React.FC<AddMCQFormProps> = ({ handleCancel }) => {
  const { formData, contentType, uploadIntoBank, bankId } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const [uploadManualMcq, { isLoading: isUploading }] =
    useUploadManualMcqMutation();

  const [addMoreMcqToMcqBank, { isLoading: isAdding }] =
    useAddMoreMcqToMcqBankMutation();

  const defaultOptions = [
    { option: "A", optionText: "", explanation: "" },
    { option: "B", optionText: "", explanation: "" },
    { option: "C", optionText: "", explanation: "" },
    { option: "D", optionText: "", explanation: "" },
    { option: "E", optionText: "", explanation: "" },
    { option: "F", optionText: "", explanation: "" },
  ];
  const difficultyOptions = [
    { label: "Basic", value: "Basic" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advance", value: "Advance" },
  ] as const;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MCQFormValues>({
    resolver: zodResolver(FinalSchema),
    defaultValues: {
      mcqs: [
        {
          question: "",
          difficulty: "Basic",
          correctOption: "A",
          options: defaultOptions,
          imageDescription: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mcqs",
  });

  const [checkDuplicateMCQ] = useCheckDuplicateMCQMutation();

  const [duplicates, setDuplicates] = useState<Record<number, any[]>>({});

  const mcqs = useWatch({ control, name: "mcqs" }) || [];

  useEffect(() => {
    const timer = setTimeout(async () => {
      const newDuplicates: Record<number, any[]> = {};
      for (let qIndex = 0; qIndex < mcqs.length; qIndex++) {
        const questionText = mcqs[qIndex]?.question || '';
        if (questionText.length >= 10) {
          try {
            const result = await checkDuplicateMCQ({ question: questionText }).unwrap();
            if (result.data.hasDuplicates) {
              newDuplicates[qIndex] = result.data.duplicates;
            }
          } catch (error) {
            console.error("Duplicate check error:", error);
          }
        }
      }
      setDuplicates(newDuplicates);
    }, 500);

    return () => clearTimeout(timer);
  }, [mcqs, checkDuplicateMCQ]);

  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();

  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>(
    {},
  );

  // Track number of options for each question (default 4 = A-D)
  const [optionCounts, setOptionCounts] = useState<Record<number, number>>({
    0: 4,
  });

  const addOption = (qIndex: number) => {
    setOptionCounts((prev) => ({
      ...prev,
      [qIndex]: Math.min((prev[qIndex] || 4) + 1, 6),
    }));
  };

  const removeLastOption = (qIndex: number) => {
    setOptionCounts((prev) => ({
      ...prev,
      [qIndex]: Math.max((prev[qIndex] || 4) - 1, 4),
    }));
    // Clear the data for the removed option
    const currentCount = optionCounts[qIndex] || 4;
    if (currentCount > 4) {
      setValue(`mcqs.${qIndex}.options.${currentCount - 1}.optionText`, "");
      setValue(`mcqs.${qIndex}.options.${currentCount - 1}.explanation`, "");
    }
  };

  const handleUploadImage = async (file: File, qIndex: number) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const result = await uploadSingleImage(formData).unwrap();
      const fileUrl = result.data.fileUrl;

      setValue(`mcqs.${qIndex}.imageDescription`, fileUrl);
      setImagePreviews((prev) => ({
        ...prev,
        [qIndex]: fileUrl,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const dispatch = useDispatch();
  const onSubmit = async (data: MCQFormValues) => {
    try {
      // Filter out empty optional options (E and F) and ensure type safety
      const processedMcqs = data.mcqs.map((mcq) => ({
        ...mcq,
        options: mcq.options
          .filter((opt) => {
            // Only keep options that have text
            return opt.optionText && opt.optionText.trim() !== "";
          })
          .map((opt) => ({
            option: opt.option,
            optionText: opt.optionText!.trim(), // Use non-null assertion since we filtered
            explanation: opt.explanation?.trim() || "",
          })),
      }));

      if (uploadIntoBank && bankId) {
        const fd = new FormData();
        fd.append("data", JSON.stringify(processedMcqs));

        await addMoreMcqToMcqBank({
          mcqBankId: bankId,
          data: fd,
          key: "manual",
        }).unwrap();
        dispatch(setUploadIntoBank(false));
      } else {
        if (formData) {
          const formattedPayload = {
            ...formData,
            mcqs: processedMcqs,
          };
          await uploadManualMcq(formattedPayload).unwrap();
        }
      }
      navigate(`/admin/content-management/dashboard/${contentType}`);
      setImagePreviews({});
      reset();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSavePublish = async () => {
    await handleSubmit(onSubmit)();
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, qIndex) => (
        <CommonBorderWrapper key={field.id} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Question {qIndex + 1}</h2>

            {fields.length > 1 && (
              <CommonButton
                type="button"
                onClick={() => {
                  remove(qIndex);
                  setOptionCounts((prev) => {
                    const newCounts = { ...prev };
                    delete newCounts[qIndex];
                    return newCounts;
                  });
                }}
                className="text-red-500 "
              >
                Remove Question
              </CommonButton>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={inputClass.label}>Question</label>
{duplicates[qIndex] && duplicates[qIndex].length === 1 && (
                  <DuplicateWarningTooltip duplicates={duplicates[qIndex]} />
                )}
              </div>
              <textarea
                {...register(`mcqs.${qIndex}.question`)}
                rows={4}
                className={inputClass.input}
                placeholder="Question Text"
              />
              {errors.mcqs?.[qIndex]?.question && (
                <p className={inputClass.error}>
                  {errors.mcqs[qIndex]?.question?.message}
                </p>
              )}
{duplicates[qIndex] && duplicates[qIndex].length === 1 && (
                <p className={inputClass.error}>
                  Similar question is present already
                </p>
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
                    handleUploadImage(e.target.files[0], qIndex);
                  }
                }}
                disabled={isUploadingImage}
              />
              {isUploadingImage && (
                <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
              )}
              {imagePreviews[qIndex] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[qIndex]}
                    alt={`Preview for question ${qIndex + 1}`}
                    className="max-h-40 object-contain border rounded"
                  />
                  <p className="text-green-600 text-sm mt-1">
                    Image uploaded successfully!
                  </p>
                </div>
              )}
              <input
                type="hidden"
                {...register(`mcqs.${qIndex}.imageDescription`)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Answer Options
              </label>

              <div className="space-y-3">
                {defaultOptions
                  .slice(0, optionCounts[qIndex] || 4)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-start rounded-md border border-[#CBD5E1] bg-[#EFF6FF]/60 p-4"
                    >
                      <span className={inputClass.label}>
                        {String.fromCharCode(65 + index)}
                        {index >= 4 && (
                          <span className="text-gray-400 text-xs ml-1">
                            (optional)
                          </span>
                        )}
                      </span>

                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder={`Enter option ${String.fromCharCode(
                            65 + index,
                          )}${index >= 4 ? " (optional)" : ""}`}
                          {...register(
                            `mcqs.${qIndex}.options.${index}.optionText` as const,
                          )}
                          className={inputClass.input}
                        />

                        {errors.mcqs?.[qIndex]?.options?.[index]
                          ?.optionText && (
                          <p className={inputClass.error}>
                            {
                              errors.mcqs[qIndex]?.options?.[index]?.optionText
                                ?.message
                            }
                          </p>
                        )}

                        <textarea
                          placeholder="Explanation (optional)"
                          rows={2}
                          {...register(
                            `mcqs.${qIndex}.options.${index}.explanation` as const,
                          )}
                          className={`${inputClass.input} resize-none mt-2`}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex gap-2 mt-3">
                {(optionCounts[qIndex] || 4) < 6 && (
                  <CommonButton
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="!text-blue-600 text-sm"
                  >
                    + Add Option{" "}
                    {String.fromCharCode(65 + (optionCounts[qIndex] || 4))}
                  </CommonButton>
                )}
                {(optionCounts[qIndex] || 4) > 4 && (
                  <CommonButton
                    type="button"
                    onClick={() => removeLastOption(qIndex)}
                    className="!text-red-500 text-sm"
                  >
                    - Remove Option{" "}
                    {String.fromCharCode(64 + (optionCounts[qIndex] || 4))}
                  </CommonButton>
                )}
              </div>
            </div>

            <div>
              <label className={inputClass.label}>Correct Answer</label>
              <Controller
                control={control}
                name={`mcqs.${qIndex}.correctOption`}
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value || undefined}
                    item={correctAnswerOptions}
                    onValueChange={(val) => field.onChange(val)}
                  />
                )}
              />
              {errors.mcqs?.[qIndex]?.correctOption && (
                <p className={inputClass.error}>
                  {errors.mcqs[qIndex]?.correctOption?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Difficulty Label</label>
              <Controller
                control={control}
                name={`mcqs.${qIndex}.difficulty`}
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={difficultyOptions}
                    onValueChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>
          </div>
        </CommonBorderWrapper>
      ))}
      <div className="mb-6 flex items-center justify-between ">
        <CommonButton
          type="button"
          onClick={() => {
            const newIndex = fields.length;
            append({
              question: "",
              difficulty: "Basic",
              correctOption: "A",
              options: defaultOptions,
              imageDescription: "",
            });
            setOptionCounts((prev) => ({
              ...prev,
              [newIndex]: 4,
            }));
          }}
          className=" !text-blue-600  "
        >
          + Add Another Question
        </CommonButton>

        <ActionButtons
          isLoading={isUploading || isAdding}
          onSavePublish={handleSavePublish}
          onCancel={handleCancel}
        />
      </div>
    </form>
  );
};

export default AddMCQForm;
