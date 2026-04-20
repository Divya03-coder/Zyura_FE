import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import ToggleButtonGroup from "@/components/AdminDashboard/reuseable/ToggleButtonGroup";
import { useCreateClinicalCaseMutation } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { correctAnswerOptions, difficultyOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ActionButtons from "../ActionButtons";
import { steps } from "../medical/createContent/CreateContent";
import StepIndicator from "../medical/StepIndicator";
import AddBulkClinicalCase from "./AddBulkClinicalCase";

const caseLists = [
  {
    title: "Patient Presentation",
    field: "patientPresentation",
    description: "Detailed history of patient",
  },
  {
    title: "History of Present Illness",
    field: "historyOfPresentIllness",
    description: "Detailed history of patient",
  },
  {
    title: "Physical Examination",
    field: "physicalExamination",
    description: "Detailed history of patient",
  },
  {
    title: "Imaging",
    field: "imaging",
    description: "Detailed history of patient",
  },
];

const activeStep = 2;

const inputClass = {
  label: "block text-sm font-normal text-black  font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-black  text-xs",
  error: "text-red-500 text-sm mt-1",
};

// Zod Schemas
const DiagnosisOptionSchema = z.object({
  optionName: z.string().min(1, "Option name is required"),
  optionValue: z.string().min(1, "Option text is required"),
  supportingEvidence: z.array(z.string()).default([""]),
  refutingEvidence: z.array(z.string()).default([""]),
});

const DiagnosisQuestionSchema = z.object({
  question: z.string().min(1, "Diagnosis question is required"),
  diagnosisOptions: z.array(DiagnosisOptionSchema).min(1),
});

const McqOptionSchema = z.object({
  option: z.string().min(1, "Option identifier is required"),
  optionText: z.string().min(1, "MCQ option text is required"),
  explanation: z.string().default(""),
});

const McqSchema = z.object({
  question: z.string().min(1, "MCQ question is required"),
  options: z.array(McqOptionSchema).min(4),
  correctOption: z.string().min(1, "Correct option is required"),
});

const ClinicalCaseSchema = z.object({
  patientPresentation: z.string().min(1, "Patient Presentation is required"),
  historyOfPresentIllness: z
    .string()
    .min(1, "History of Present Illness is required"),
  physicalExamination: z.string().min(1, "Physical Examination is required"),
  imaging: z.string().min(1, "Imaging is required"),
  laboratoryResults: z.array(z.object({ name: z.string(), value: z.string() })),
  diagnosisQuestion: DiagnosisQuestionSchema,
  correctOption: z.object({
    optionName: z.string().min(1, "Option name is required"),
    explanation: z.string().min(1, "Explanation is required"),
  }),
  difficultyLevel: z.enum(["Basic", "Intermediate", "Advance"]),
  mcqs: z.array(McqSchema),
});

type ClinicalCaseForm = z.infer<typeof ClinicalCaseSchema>;

// Default values
const defaultOptions = [
  { option: "A", optionText: "Option A", explanation: "" },
  { option: "B", optionText: "Option B", explanation: "" },
  { option: "C", optionText: "Option C", explanation: "" },
  { option: "D", optionText: "Option D", explanation: "" },
];

const defaultDiagnosisOptions = [
  {
    optionName: "A",
    optionValue: "Diagnosis A",
    supportingEvidence: [""],
    refutingEvidence: [""],
  },
  {
    optionName: "B",
    optionValue: "Diagnosis B",
    supportingEvidence: [""],
    refutingEvidence: [""],
  },
  {
    optionName: "C",
    optionValue: "Diagnosis C",
    supportingEvidence: [""],
    refutingEvidence: [""],
  },
  {
    optionName: "D",
    optionValue: "Diagnosis D",
    supportingEvidence: [""],
    refutingEvidence: [""],
  },
];

const ClinicalCaseManualForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClinicalCaseForm>({
    resolver: zodResolver(ClinicalCaseSchema) as Resolver<ClinicalCaseForm>,
    defaultValues: {
      patientPresentation: "",
      historyOfPresentIllness: "",
      physicalExamination: "",
      imaging: "",
      laboratoryResults: [{ name: "Test Lab", value: "100" }],
      diagnosisQuestion: {
        question: "What is the most likely diagnosis?",
        diagnosisOptions: defaultDiagnosisOptions.map((opt) => ({
          ...opt,
          supportingEvidence: opt.supportingEvidence ?? [""],
          refutingEvidence: opt.refutingEvidence ?? [""],
        })),
      },
      correctOption: {
        optionName: "A",
        explanation: "This is the correct diagnosis because...",
      },
      difficultyLevel: "Basic",
      mcqs: [
        {
          question: "Test MCQ Question?",
          options: defaultOptions,
          correctOption: "A",
        },
      ],
    },
  });

  const {
    fields: labFields,
    append: appendLab,
    remove: removeLab,
  } = useFieldArray({ control, name: "laboratoryResults" });

  const {
    fields: mcqFields,
    append: appendMcq,
    remove: removeMcq,
  } = useFieldArray({ control, name: "mcqs" });

  const [createClinicalCase, { isLoading }] = useCreateClinicalCaseMutation();
  const { formData, contentType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const onSubmit: SubmitHandler<ClinicalCaseForm> = async (data) => {
    if (!formData) return;
    const caseTitle = formData.title?.trim();
    if (!caseTitle) {
      toast.error("Case title is required — go back to step 1 and fill “Clinical Case Title”.");
      return;
    }
    const { title: _stepTitle, type: _modeType, ...hierarchy } = formData;
    const formattedPayload = {
      ...hierarchy,
      ...data,
      caseTitle,
    };
    await createClinicalCase(formattedPayload).unwrap();
    navigate(`/admin/content-management/dashboard/${contentType}`);
  };

  const handleSavePublish = () => {
    handleSubmit(onSubmit)();
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-2);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {formData?.title?.trim() ? (
        <p className="text-sm text-[#475569] rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2">
          <span className="font-medium text-black">Case title (from step 1): </span>
          {formData.title}
        </p>
      ) : null}
      {/* Case Sections */}
      {caseLists.map((item, idx) => (
        <div key={idx}>
          <label className={inputClass.label}>{item.title}</label>
          <textarea
            className={inputClass.input}
            rows={3}
            {...register(item.field as any)}
            placeholder={item.description}
          />
          <p className={inputClass.error}>
            {errors[item.field as keyof ClinicalCaseForm]?.message as string}
          </p>
        </div>
      ))}

      {/* Laboratory Results */}
      <div>
        <label className={inputClass.label}>Laboratory Results</label>
        {labFields.map((field, index) => (
          <div key={field.id} className="flex gap-6 pb-2 max-w-xl">
            <input
              {...register(`laboratoryResults.${index}.name` as const)}
              placeholder="Name"
              className={inputClass.input}
            />
            <input
              {...register(`laboratoryResults.${index}.value` as const)}
              placeholder="Value"
              className={inputClass.input}
            />
            <CommonButton
              type="button"
              onClick={() => removeLab(index)}
              className="!px-3 !py-2 !text-[#EF4444]"
            >
              <RiDeleteBinLine />
            </CommonButton>
          </div>
        ))}
        <CommonButton
          type="button"
          onClick={() => appendLab({ name: "", value: "" })}
        >
          + Add New
        </CommonButton>
      </div>

      <div>
        <label className={inputClass.label}>Diagnosis Question</label>
        <textarea
          {...register("diagnosisQuestion.question" as const)}
          placeholder="Diagnosis Question"
          className={inputClass.input}
          rows={3}
        />
        <p className={inputClass.error}>
          {errors.diagnosisQuestion?.question?.message}
        </p>

        {/* Diagnosis Options */}
        <div className="space-y-4 mt-4">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className=" p-4 bg-[rgba(239,246,255,0.60)] border border-[#9DA4AE]/60 rounded-lg"
            >
              <div className="flex items-start gap-3 mb-3 w-full ">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium">
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1">
                  <input
                    {...register(
                      `diagnosisQuestion.diagnosisOptions.${idx}.optionValue` as const,
                    )}
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    className={inputClass.input}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <textarea
                      {...register(
                        `diagnosisQuestion.diagnosisOptions.${idx}.supportingEvidence.0` as const,
                      )}
                      placeholder="Supporting Evidence"
                      className={inputClass.input}
                    />
                    <textarea
                      {...register(
                        `diagnosisQuestion.diagnosisOptions.${idx}.refutingEvidence.0` as const,
                      )}
                      placeholder="Refuting Evidence"
                      className={inputClass.input}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correct Option Explanation */}
      <div>
        <label className={inputClass.label}>Correct Diagnosis Option</label>

        <Controller
          control={control}
          name="correctOption.optionName"
          render={({ field }) => (
            <CommonSelect
              value={field.value}
              item={
                [
                  { label: "Option A", value: "A" },
                  { label: "Option B", value: "B" },
                  { label: "Option C", value: "C" },
                  { label: "Option D", value: "D" },
                ] as const
              }
              onValueChange={field.onChange}
              className="!bg-white border-[#CBD5E1]"
            />
          )}
        />
        <textarea
          {...register("correctOption.explanation" as const)}
          placeholder="Explanation for correct diagnosis"
          className={`${inputClass.input} mt-2`}
          rows={3}
        />
        <p className={inputClass.error}>
          {errors.correctOption?.explanation?.message}
        </p>
      </div>

      <div className="mt-4">
        <label className={inputClass.label}>Difficulty</label>
        <Controller
          control={control}
          name={`difficultyLevel` as const}
          render={({ field }) => (
            <CommonSelect
              className="!bg-white border-[#CBD5E1]"
              value={field.value || "Basic"}
              item={difficultyOptions}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>

      {/* MCQs */}
      <div className="space-y-6">
        {mcqFields.map((mcq, qIndex) => (
          <div
            key={mcq.id}
            className=" p-4 bg-[rgba(239,246,255,0.60)] border border-[#9DA4AE]/60 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold">MCQ {qIndex + 1}</h2>
              {mcqFields.length > 1 && (
                <CommonButton
                  type="button"
                  onClick={() => removeMcq(qIndex)}
                  className="!px-3 !py-2 !text-[#EF4444] !bg-white"
                >
                  <RiDeleteBinLine />
                </CommonButton>
              )}
            </div>

            <textarea
              {...register(`mcqs.${qIndex}.question` as const)}
              placeholder="Enter MCQ Question"
              className={inputClass.input}
              rows={3}
            />
            <p className={inputClass.error}>
              {errors.mcqs?.[qIndex]?.question?.message}
            </p>

            <div className="space-y-2 mt-4">
              {mcq.options.map((opt, oIndex) => (
                <div
                  key={opt.option}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium">
                      {opt.option}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        {...register(
                          `mcqs.${qIndex}.options.${oIndex}.optionText` as const,
                        )}
                        placeholder={`Option ${opt.option}`}
                        className={`${inputClass.input} flex-1`}
                      />
                      <textarea
                        {...register(
                          `mcqs.${qIndex}.options.${oIndex}.explanation` as const,
                        )}
                        placeholder="Explanation (optional)"
                        className={`${inputClass.input} resize-none`}
                        rows={2}
                      />
                      <p className={inputClass.error}>
                        {
                          errors.mcqs?.[qIndex]?.options?.[oIndex]?.optionText
                            ?.message
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className={inputClass.label}>Correct Answer</label>
              <div>
                <Controller
                  control={control}
                  name={`mcqs.${qIndex}.correctOption`}
                  render={({ field }) => (
                    <CommonSelect
                      className="!bg-white border-[#CBD5E1]"
                      value={field.value}
                      item={correctAnswerOptions}
                      onValueChange={(val) => field.onChange(val)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-6 py-6">
          <CommonButton
            type="button"
            onClick={() =>
              appendMcq({
                question: "New MCQ Question?",
                options: defaultOptions,
                correctOption: "A",
              })
            }
          >
            + Add Question
          </CommonButton>

          <ActionButtons
            isLoading={isLoading}
            onSavePublish={handleSavePublish}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </form>
  );
};

const ClinicalCaseUpload: React.FC<{ breadcrumb: string }> = ({ breadcrumb }) => {
  const [mode, setMode] = useState<"manual" | "bulk">("manual");
  const { uploadIntoBank } = useAppSelector((state: RootState) => state.staticContent);

  return (
    <div>
      {!uploadIntoBank && (
        <DashboardTopSection
          title="Add Clinical Case Content"
          description={breadcrumb}
          descriptionClassName="!text-[#717182]"
        />
      )}

      <CommonSpace>
        <StepIndicator steps={steps} activeStep={activeStep} />
      </CommonSpace>

      <div className="py-10">
        <ToggleButtonGroup
          options={[
            { label: "Manual Upload", value: "manual" },
            { label: "Bulk Upload", value: "bulk" },
          ]}
          active={mode}
          onChange={setMode}
        />
      </div>

      {mode === "manual" ? <ClinicalCaseManualForm /> : <AddBulkClinicalCase />}
    </div>
  );
};

export default ClinicalCaseUpload;
