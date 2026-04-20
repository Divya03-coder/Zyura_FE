import { z } from "zod";

export const osceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description required"),
  scenario: z.string().min(1, "Scenario required"),
  timeLimit: z.string().min(1, "Time limit required"),
  candidateInstruction: z.string().min(1, "Candidate instruction required"),
  patientInstruction: z.string().min(1, "Patient instruction required"),

  tasks: z
    .array(
      z.object({
        taskName: z.string().min(1, "Task name required"),
        checklistItem: z.array(z.string().min(1, "Checklist item required")),
      })
    )
    .min(1, "At least one task is required"),

  tutorial: z
    .array(z.string().min(1, "Tutorial step required"))
    .min(1, "At least one tutorial step is required"),

  learningResource: z.object({
    resourceTitle: z.string().min(1, "Resource title required"),
    resourceUrl: z.string().url("Valid URL required"),
  }),
});

export type OsceFormValues = z.infer<typeof osceSchema>;
