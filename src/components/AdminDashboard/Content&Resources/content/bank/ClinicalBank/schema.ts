import { z } from "zod";

export const clinicalCaseSchema = z.object({
  caseTitle: z.string().min(1, "Case title is required"),
  patientPresentation: z.string().min(1, "Patient presentation is required"),
  historyOfPresentIllness: z.string().min(1, "History is required"),
  physicalExamination: z.string().min(1, "Physical examination is required"),
  imaging: z.string().min(1, "Imaging is required"),
  difficultyLevel: z.enum(["Basic", "Intermediate", "Advance"], {
    message: "Please select a valid difficulty level",
  }),

  laboratoryResults: z.array(
    z.object({
      name: z.string().min(1, "Lab name is required"),
      value: z.string().min(1, "Lab value is required"),
    }),
  ),

  diagnosisQuestion: z.object({
    question: z.string().min(1, "Diagnosis question is required"),
    diagnosisOptions: z
      .array(
        z.object({
          optionName: z.string().min(1, "Option name is required"),
          optionValue: z.string().min(1, "Option value is required"),
          supportingEvidence: z.array(z.string()).transform((val) => val ?? []),
          refutingEvidence: z.array(z.string()).transform((val) => val ?? []),
        }),
      )
      .length(4, "Diagnosis must have exactly 4 options"),
  }),

  correctOption: z.object({
    optionName: z.string().min(1, "Correct option name is required"),
    explanation: z.string().min(1, "Explanation is required"),
  }),

  mcqs: z.array(
    z.object({
      question: z.string().min(1, "MCQ question is required"),
      options: z
        .array(
          z.object({
            option: z.string().min(1, "Option name is required"),
            optionText: z.string().min(1, "Option text is required"),
            explanation: z.string().min(1, "Explanation is required"),
          }),
        )
        .min(4, "At least 4 options are required")
        .max(6, "Maximum 6 options allowed"),
      correctOption: z.string().min(1, "Correct option is required"),
    }),
  ),

  subject: z.string().optional(),
  system: z.string().optional(),
  topic: z.string().optional(),
  subtopic: z.string().optional(),
  profileType: z.string().optional(),
  contentFor: z.enum(["student", "professional"]).optional(),
});

export type ClinicalCaseFormData = z.infer<typeof clinicalCaseSchema>;
