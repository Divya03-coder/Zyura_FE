// import { z } from "zod";

// export const laboratoryResultSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   value: z.string().min(1, "Value is required"),
// });

// export const diagnosisOptionSchema = z.object({
//   optionName: z.enum(["A", "B", "C", "D"]),
//   optionValue: z.string().min(1, "Option value is required"),
//   supportingEvidence: z.string().array().optional(),
//   refutingEvidence: z.string().array().optional(),
// });

// export const diagnosisQuestionSchema = z.object({
//   question: z.string().min(1, "Diagnosis question is required"),
//   diagnosisOptions: z.array(diagnosisOptionSchema).length(4),
// });

// export const correctOptionSchema = z.object({
//   optionName: z.enum(["A", "B", "C", "D"]),
//   explanation: z.string().optional(),
// });

// export const mcqOptionSchema = z.object({
//   label: z.enum(["A", "B", "C", "D"]),
//   text: z.string().min(1, "Option text is required"),
//   explanation: z.string().optional(),
// });

// export const mcqSchema = z.object({
//   question: z.string().min(1, "MCQ question is required"),
//   options: z.array(mcqOptionSchema).length(4),
//   correctAnswer: z.enum(["A", "B", "C", "D"]),
// });

// export const clinicalCaseSchema = z.object({
//   caseTitle: z.string().min(1, "Case title is required"),
//   patientPresentation: z.string().min(1, "Patient presentation is required"),
//   historyOfPresentIllness: z
//     .string()
//     .min(1, "History of present illness is required"),
//   physicalExamination: z.string().min(1, "Physical examination is required"),
//   imaging: z.string().min(1, "Imaging is required"),
//   laboratoryResults: z
//     .array(laboratoryResultSchema)
//     .min(1, "At least one lab result is required"),
//   diagnosisQuestion: diagnosisQuestionSchema,
//   correctOption: correctOptionSchema,
//   difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
//   mcqs: z.array(mcqSchema).min(1),
// });

// export type ClinicalCaseFormValues = z.infer<typeof clinicalCaseSchema>;
