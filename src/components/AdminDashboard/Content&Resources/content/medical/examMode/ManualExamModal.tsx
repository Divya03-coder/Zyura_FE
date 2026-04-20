import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useCreateExamManualForProfessionalMutation } from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import {
  useCreateExamManualMutation,
} from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { correctAnswerOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ActionButtons from "../../ActionButtons";

const MCQOptionSchema = z.object({
  option: z.string(),
  optionText: z.string().optional(),
  explanation: z.string().optional(),
});

const MCQSchema = z
  .object({
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

export const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

interface CreateExamModalProps {
  onClose: () => void;
}

const ManualExamModal: React.FC<CreateExamModalProps> = ({ onClose }) => {
  const { profileType, contentFor } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  // const { data: studentData } = useGetAllExamForStudentQuery({ profileType });

  type Subject = "Emberyology";

  type SubjectOption = {
    label: string;
    value: Subject;
  };

  const subjectOptions: SubjectOption[] = [
    { label: "Emberyology", value: "Emberyology" },
  ];

  // const subjectOptions = Array.from(
  //   new Set(studentData?.data.data.map((exam) => exam.subject)),
  // ).map((subject) => ({
  //   label: subject,
  //   value: subject,
  // }));
  const FinalSchema = z
    .object({
      examName: z.string().min(1, { message: "Exam Name is required" }),
      subject: z.string().optional(),
      totalTime: z.number().min(1, { message: "Total Time is required" }),
      mcqs: z.array(MCQSchema).min(1),
    })
    .superRefine((data, ctx) => {
      // subject is required only for students
      if (
        contentFor === "student" &&
        (!data.subject || data.subject.trim() === "")
      ) {
        ctx.addIssue({
          path: ["subject"],
          message: "Subject is required for students",
          code: z.ZodIssueCode.custom,
        });
      }
    });
  type MCQFormValues = z.infer<typeof FinalSchema>;
  const isStudent = contentFor === "student";
  const isProfessional = contentFor === "professional";
  const [createExamManual, { isLoading: isUploading }] =
    useCreateExamManualMutation();
  const [
    createExamManualForProfessional,
    { isLoading: isUploadingForProfessional },
  ] = useCreateExamManualForProfessionalMutation();

  const defaultOptions = [
    { option: "A", optionText: "", explanation: "" },
    { option: "B", optionText: "", explanation: "" },
    { option: "C", optionText: "", explanation: "" },
    { option: "D", optionText: "", explanation: "" },
    { option: "E", optionText: "", explanation: "" },
    { option: "F", optionText: "", explanation: "" },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MCQFormValues>({
    resolver: zodResolver(FinalSchema),
    defaultValues: {
      examName: "",
      subject: "",
      totalTime: 0,
      mcqs: [
        {
          question: "",
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

  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();

  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>(
    {},
  );

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

  const onSubmit = async (data: MCQFormValues) => {
    try {
      const processedMcqs = data.mcqs.map((mcq) => ({
        question: mcq.question,
        imageDescription: mcq.imageDescription || "",
        options: mcq.options
          .filter((opt) => {
            return opt.optionText && opt.optionText.trim() !== "";
          })
          .map((opt) => ({
            option: opt.option as "A" | "B" | "C" | "D" | "E" | "F",
            optionText: opt.optionText!.trim(),
            explanation: opt.explanation?.trim() || "",
          })),
        correctOption: mcq.correctOption as "A" | "B" | "C" | "D" | "E" | "F",
      }));

      const payload = {
        profileType: profileType,
        examName: data.examName,
        subject: data.subject!,
        totalTime: data.totalTime,
        mcqs: processedMcqs,
      };
      const payloadForProfessional = {
        professionName: profileType,
        examName: data.examName,
        totalTime: data.totalTime,
        mcqs: processedMcqs,
      };

      if (isProfessional) {
        await createExamManualForProfessional(payloadForProfessional).unwrap();
      }
      if (isStudent) {
        await createExamManual(payload).unwrap();
      }

      setImagePreviews({});
      reset();
      onClose();
    } catch (error) {
      console.error("=== API Error ===", error);
    }
  };

  const handleSavePublish = async () => {
    await handleSubmit(onSubmit)();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <CommonBorderWrapper className="w-full max-w-3xl relative max-h-full overflow-y-auto">
        <ModalCloseButton onClick={handleCancel} />

        <FormHeader title="Create New Exam" />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Exam Metadata Fields */}
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

                  <CommonSelect
                    value={watch("subject")}
                    item={subjectOptions}
                    placeholder="Select subject"
                    onValueChange={(val) => setValue("subject", val)}
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

          {/* MCQ Questions */}
          {fields.map((field, qIndex) => (
            <CommonBorderWrapper key={field.id} className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold">
                  Question {qIndex + 1}
                </h2>

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
                  <label className={inputClass.label}>Question</label>
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
                    <p className="text-blue-500 text-sm mt-1">
                      Uploading image...
                    </p>
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
                                  errors.mcqs[qIndex]?.options?.[index]
                                    ?.optionText?.message
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
              isLoading={isUploading || isUploadingForProfessional}
              onSavePublish={handleSavePublish}
              onCancel={handleCancel}
            />
          </div>
        </form>
      </CommonBorderWrapper>
    </div>
  );
};

export default ManualExamModal;
