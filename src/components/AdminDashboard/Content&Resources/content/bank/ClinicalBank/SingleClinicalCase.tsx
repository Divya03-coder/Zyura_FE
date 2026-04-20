import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { useUpdateClinicalCaseMutation } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import { ClinicalCaseInput } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/types/createClinicalCase";
import { SingleClinicalCaseResponse } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/types/getClinicalCase";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import { inputClass } from "../NotesBank/SingleNote";
import { ClinicalCaseFormData, clinicalCaseSchema } from "./schema";

interface ClinicalCaseData {
  data: SingleClinicalCaseResponse;
  setBankId: (id: string) => void;
}

export const difficultyOptions = [
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
] as const;

const SingleClinicalCase: React.FC<ClinicalCaseData> = ({
  data,
  setBankId,
}) => {
  const ClinicalBank = data?.data;
  const [updateClinicalCase, { isLoading: isUpdating }] =
    useUpdateClinicalCaseMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<ClinicalCaseFormData>({
    resolver: zodResolver(clinicalCaseSchema),
    defaultValues: {
      caseTitle: ClinicalBank?.caseTitle || "",
      patientPresentation: ClinicalBank?.patientPresentation || "",
      historyOfPresentIllness: ClinicalBank?.historyOfPresentIllness || "",
      physicalExamination: ClinicalBank?.physicalExamination || "",
      imaging: ClinicalBank?.imaging || "",
      difficultyLevel: ClinicalBank?.difficultyLevel || "Basic",
      laboratoryResults: ClinicalBank?.laboratoryResults || [],
      diagnosisQuestion: ClinicalBank?.diagnosisQuestion || {
        question: "",
        diagnosisOptions: [
          {
            optionName: "A",
            optionValue: "",
            supportingEvidence: [],
            refutingEvidence: [],
          },
          {
            optionName: "B",
            optionValue: "",
            supportingEvidence: [],
            refutingEvidence: [],
          },
          {
            optionName: "C",
            optionValue: "",
            supportingEvidence: [],
            refutingEvidence: [],
          },
          {
            optionName: "D",
            optionValue: "",
            supportingEvidence: [],
            refutingEvidence: [],
          },
        ],
      },
      correctOption: ClinicalBank?.correctOption || {
        optionName: "",
        explanation: "",
      },
      mcqs: ClinicalBank?.mcqs || [],
    },
  });

  const {
    fields: labFields,
    append: appendLab,
    remove: removeLab,
  } = useFieldArray({
    control,
    name: "laboratoryResults",
  });

  const {
    fields: mcqFields,
    append: appendMcq,
    remove: removeMcq,
  } = useFieldArray({
    control,
    name: "mcqs",
  });

  const onSubmit = async (formData: ClinicalCaseFormData) => {
    try {
      const transformedData: Partial<ClinicalCaseInput> = {
        ...formData,
        // Pass non-editable fields directly from API data
        subject: ClinicalBank.subject,
        system: ClinicalBank.system,
        topic: ClinicalBank.topic,
        subtopic: ClinicalBank.subtopic,
        profileType: ClinicalBank.profileType,
        contentFor: ClinicalBank.contentFor,
        diagnosisQuestion: {
          ...formData.diagnosisQuestion,
          diagnosisOptions: formData.diagnosisQuestion.diagnosisOptions.map(
            (opt) => ({
              ...opt,
              supportingEvidence: opt.supportingEvidence || [],
              refutingEvidence: opt.refutingEvidence || [],
            }),
          ),
        },
      };

      await updateClinicalCase({ id: ClinicalBank._id, data: transformedData });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleBack = () => {
    setBankId("");
  };

  const addMcq = () => {
    appendMcq({
      question: "",
      options: [
        { option: "A", optionText: "", explanation: "" },
        { option: "B", optionText: "", explanation: "" },
        { option: "C", optionText: "", explanation: "" },
        { option: "D", optionText: "", explanation: "" },
      ],
      correctOption: "",
    });
  };

  const addMcqOption = (mcqIndex: number) => {
    const currentOptions = watch(`mcqs.${mcqIndex}.options`) || [];
    if (currentOptions.length >= 6) {
      alert("Maximum 6 options allowed");
      return;
    }
    const optionLetters = ["A", "B", "C", "D", "E", "F"];
    const nextOption = optionLetters[currentOptions.length];

    const updatedOptions = [
      ...currentOptions,
      { option: nextOption, optionText: "", explanation: "" },
    ];
    setValue(`mcqs.${mcqIndex}.options`, updatedOptions);
  };

  const removeMcqOption = (mcqIndex: number, optionIndex: number) => {
    const currentOptions = watch(`mcqs.${mcqIndex}.options`) || [];
    if (currentOptions.length <= 4) {
      alert("Minimum 4 options required");
      return;
    }

    const updatedOptions = currentOptions.filter((_, i) => i !== optionIndex);

    const optionLetters = ["A", "B", "C", "D", "E", "F"];
    const newOptions = updatedOptions.map((opt, idx) => ({
      ...opt,
      option: optionLetters[idx],
    }));

    setValue(`mcqs.${mcqIndex}.options`, newOptions);
  };

  if (!ClinicalBank) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Card */}
      <div className="border border-border rounded-lg shadow-md p-4 bg-white transition-shadow duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{ClinicalBank.caseTitle}</h2>
          <CommonButton
            type="button"
            className="!px-3 !py-2"
            onClick={() => setIsModalOpen(true)}
          >
            <MdEdit />
          </CommonButton>
        </div>

        <p className="text-sm text-black mb-1">
          <strong>Patient Presentation:</strong>{" "}
          {ClinicalBank.patientPresentation}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>History:</strong> {ClinicalBank.historyOfPresentIllness}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>Examination:</strong> {ClinicalBank.physicalExamination}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>Imaging:</strong> {ClinicalBank.imaging}
        </p>
        <div className="flex justify-end">
          <CommonButton
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBack}
          >
            Back
          </CommonButton>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-auto bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl text-black max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Edit Clinical Case</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {/* Case Title */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>Case Title</label>
                <input
                  {...register("caseTitle")}
                  className={inputClass.input}
                />
                {errors.caseTitle && (
                  <span className={inputClass.error}>
                    {errors.caseTitle.message}
                  </span>
                )}
              </div>

              {/* Patient Presentation */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>Patient Presentation</label>
                <textarea
                  {...register("patientPresentation")}
                  className={inputClass.input}
                  rows={3}
                />
                {errors.patientPresentation && (
                  <span className={inputClass.error}>
                    {errors.patientPresentation.message}
                  </span>
                )}
              </div>

              {/* History */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>History</label>
                <textarea
                  {...register("historyOfPresentIllness")}
                  className={inputClass.input}
                  rows={3}
                />
                {errors.historyOfPresentIllness && (
                  <span className={inputClass.error}>
                    {errors.historyOfPresentIllness.message}
                  </span>
                )}
              </div>

              {/* Physical Examination */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>Physical Examination</label>
                <textarea
                  {...register("physicalExamination")}
                  className={inputClass.input}
                  rows={3}
                />
                {errors.physicalExamination && (
                  <span className={inputClass.error}>
                    {errors.physicalExamination.message}
                  </span>
                )}
              </div>

              {/* Imaging */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>Imaging</label>
                <textarea
                  {...register("imaging")}
                  className={inputClass.input}
                  rows={3}
                />
                {errors.imaging && (
                  <span className={inputClass.error}>
                    {errors.imaging.message}
                  </span>
                )}
              </div>

              {/* Difficulty Level */}
              <div className="flex flex-col text-sm">
                <label className={inputClass.label}>Difficulty Level</label>
                <Controller
                  name="difficultyLevel"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      item={difficultyOptions}
                      placeholder="Select difficulty"
                    />
                  )}
                />
                {errors.difficultyLevel && (
                  <span className={inputClass.error}>
                    {errors.difficultyLevel.message}
                  </span>
                )}
              </div>

              {/* Laboratory Results */}
              <div className="mt-2">
                <h3 className="font-semibold mb-2">Laboratory Results</h3>
                {labFields.map((field, idx) => (
                  <div key={field.id} className="flex items-start gap-2 mt-2">
                    <div className="flex-1">
                      <input
                        {...register(`laboratoryResults.${idx}.name`)}
                        placeholder="Name"
                        className={inputClass.input}
                      />
                      {errors.laboratoryResults?.[idx]?.name && (
                        <span className={inputClass.error}>
                          {errors.laboratoryResults[idx]?.name?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        {...register(`laboratoryResults.${idx}.value`)}
                        placeholder="Value"
                        className={inputClass.input}
                      />
                      {errors.laboratoryResults?.[idx]?.value && (
                        <span className={inputClass.error}>
                          {errors.laboratoryResults[idx]?.value?.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLab(idx)}
                      className="mt-3"
                    >
                      <MdDelete className="cursor-pointer text-red-500 text-xl" />
                    </button>
                  </div>
                ))}
                <CommonButton
                  type="button"
                  className="mt-2"
                  onClick={() => appendLab({ name: "", value: "" })}
                >
                  <MdAdd className="inline mr-1" /> Add Lab
                </CommonButton>
              </div>

              {/* Diagnosis Question */}
              <div className="mt-2">
                <h3 className="font-semibold mb-2">Diagnosis Question</h3>
                <textarea
                  {...register("diagnosisQuestion.question")}
                  className="border p-2 rounded w-full"
                  placeholder="Question"
                  rows={3}
                />
                {errors.diagnosisQuestion?.question && (
                  <span className={inputClass.error}>
                    {errors.diagnosisQuestion.question.message}
                  </span>
                )}

                <div className="mt-2">
                  <label className="text-sm font-semibold">
                    Options (A, B, C, D)
                  </label>
                  {["A", "B", "C", "D"].map((optName, idx) => (
                    <div key={idx} className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={optName}
                        readOnly
                        className={`${inputClass.input} !w-16 bg-gray-100 text-center font-semibold`}
                      />
                      <div className="flex-1">
                        <input
                          {...register(
                            `diagnosisQuestion.diagnosisOptions.${idx}.optionValue`,
                          )}
                          placeholder={`Option ${optName} value`}
                          className={inputClass.input}
                        />
                        {errors.diagnosisQuestion?.diagnosisOptions?.[idx]
                          ?.optionValue && (
                          <span className={inputClass.error}>
                            {
                              errors.diagnosisQuestion.diagnosisOptions[idx]
                                ?.optionValue?.message
                            }
                          </span>
                        )}
                      </div>
                      <input
                        type="hidden"
                        {...register(
                          `diagnosisQuestion.diagnosisOptions.${idx}.optionName`,
                        )}
                        value={optName}
                      />
                    </div>
                  ))}
                </div>
                {errors.diagnosisQuestion?.diagnosisOptions &&
                  typeof errors.diagnosisQuestion.diagnosisOptions.message ===
                    "string" && (
                    <span className={inputClass.error}>
                      {errors.diagnosisQuestion.diagnosisOptions.message}
                    </span>
                  )}

                {/* Correct Option */}
                <div className="mt-4">
                  <label className="text-sm font-semibold block mb-2">
                    Correct Answer
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      {...register("correctOption.optionName")}
                      placeholder="Correct Option (e.g., A, B, C, or D)"
                      className={inputClass.input}
                    />
                    {errors.correctOption?.optionName && (
                      <span className={inputClass.error}>
                        {errors.correctOption.optionName.message}
                      </span>
                    )}

                    <textarea
                      {...register("correctOption.explanation")}
                      placeholder="Explanation"
                      className={inputClass.input}
                      rows={3}
                    />
                    {errors.correctOption?.explanation && (
                      <span className={inputClass.error}>
                        {errors.correctOption.explanation.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* MCQs */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">MCQs</h3>
                {mcqFields.map((mcq, mcqIdx) => {
                  const mcqOptions = watch(`mcqs.${mcqIdx}.options`) || [];

                  return (
                    <div key={mcq.id} className=" p-4 rounded mt-3">
                      <div className="mb-2">
                        <label className="text-sm font-semibold">
                          Question {mcqIdx + 1}
                        </label>
                        <textarea
                          {...register(`mcqs.${mcqIdx}.question`)}
                          placeholder="Question"
                          className={inputClass.input}
                          rows={2}
                        />
                        {errors.mcqs?.[mcqIdx]?.question && (
                          <span className={inputClass.error}>
                            {errors.mcqs[mcqIdx]?.question?.message}
                          </span>
                        )}
                      </div>

                      <label className="text-sm font-semibold block mt-3 mb-2">
                        Options
                      </label>
                      {mcqOptions.map((_opt, optIdx) => (
                        <div
                          key={optIdx}
                          className="flex items-start gap-2 mt-2"
                        >
                          <input
                            {...register(
                              `mcqs.${mcqIdx}.options.${optIdx}.option`,
                            )}
                            readOnly
                            className={`${inputClass.input} !w-16 bg-gray-100 text-center font-semibold`}
                          />
                          <div className="flex-1">
                            <input
                              {...register(
                                `mcqs.${mcqIdx}.options.${optIdx}.optionText`,
                              )}
                              placeholder="Option Text"
                              className={inputClass.input}
                            />
                            {errors.mcqs?.[mcqIdx]?.options?.[optIdx]
                              ?.optionText && (
                              <span className={inputClass.error}>
                                {
                                  errors.mcqs[mcqIdx]?.options?.[optIdx]
                                    ?.optionText?.message
                                }
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              {...register(
                                `mcqs.${mcqIdx}.options.${optIdx}.explanation`,
                              )}
                              placeholder="Explanation"
                              className={inputClass.input}
                            />
                            {errors.mcqs?.[mcqIdx]?.options?.[optIdx]
                              ?.explanation && (
                              <span className={inputClass.error}>
                                {
                                  errors.mcqs[mcqIdx]?.options?.[optIdx]
                                    ?.explanation?.message
                                }
                              </span>
                            )}
                          </div>
                          {mcqOptions.length > 4 && (
                            <button
                              type="button"
                              onClick={() => removeMcqOption(mcqIdx, optIdx)}
                              className="mt-3"
                            >
                              <MdDelete className="cursor-pointer text-red-500 text-xl" />
                            </button>
                          )}
                        </div>
                      ))}
                      {errors.mcqs?.[mcqIdx]?.options &&
                        typeof errors.mcqs[mcqIdx]?.options?.message ===
                          "string" && (
                          <span className={inputClass.error}>
                            {errors.mcqs[mcqIdx]?.options?.message}
                          </span>
                        )}

                      {mcqOptions.length < 6 && (
                        <CommonButton
                          type="button"
                          className="mt-2"
                          onClick={() => addMcqOption(mcqIdx)}
                        >
                          <MdAdd className="inline mr-1" /> Add Option
                        </CommonButton>
                      )}

                      <div className="mt-3">
                        <label className="text-sm font-semibold block mb-2">
                          Correct Answer
                        </label>
                        <input
                          {...register(`mcqs.${mcqIdx}.correctOption`)}
                          placeholder="Correct Option (e.g., A, B, C, D, E, or F)"
                          className={inputClass.input}
                        />
                        {errors.mcqs?.[mcqIdx]?.correctOption && (
                          <span className={inputClass.error}>
                            {errors.mcqs[mcqIdx]?.correctOption?.message}
                          </span>
                        )}
                      </div>

                      <CommonButton
                        type="button"
                        className="mt-3 "
                        onClick={() => removeMcq(mcqIdx)}
                      >
                        <MdDelete className="inline mr-1" /> Remove MCQ
                      </CommonButton>
                    </div>
                  );
                })}
                <CommonButton type="button" className="mt-3" onClick={addMcq}>
                  <MdAdd className="inline mr-1" /> Add MCQ
                </CommonButton>
              </div>

              <div className="flex justify-end gap-3 mt-6 ">
                <CommonButton
                  type="button"
                  className="!px-4 !py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  type="submit"
                  className="!px-4 !py-2 !bg-blue-500 !text-white hover:!bg-blue-600"
                  disabled={isUpdating}
                >
                  {}
                  {isUpdating ? (
                    <ButtonWithLoading title="Updating..." />
                  ) : (
                    "Update"
                  )}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleClinicalCase;
