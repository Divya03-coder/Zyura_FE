// src/lib/schemas.ts
import { z } from "zod";

/**
 * Profile setup:
 * Use a discriminated union to require different fields depending on the role.
 */
const studentSchema = z.object({
  role: z.literal("student"),
  subRole: z.string().min(1, "Please select student type"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  university: z.string().min(1, "University/School is required"),
  academicYear: z.string().min(1, "Academic year is required"),
});

const professionalSchema = z.object({
  role: z.literal("professional"),
  subRole: z.string().min(1, "Please select professional type"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  hospital: z.string().min(1, "Hospital/Institute is required"),
  postgraduateYear: z.string().min(1, "Postgraduate year is required"),
  experience: z.string().min(1, "Years of experience is required"),
});

const mentorSchema = z.object({
  role: z.literal("mentor"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  currentRole: z.string().min(1, "Current role is required"),
  hospitalOrInstitute: z.string().min(1, "Hospital/Institute is required"),
  specialty: z.string().min(1, "Medical specialty is required"),
  experience: z.string().min(1, "Professional experience is required"),
  postgraduateDegree: z.string().min(1, "Postgraduate degree is required"),
});

export const profileSetupSchema = z.discriminatedUnion("role", [
  studentSchema,
  professionalSchema,
  mentorSchema,
]);

export const preparingForSchema = z.object({
  exams: z.array(z.string()).min(1, "Select at least one exam/goal"),
});

export const preferencesSchema = z.object({
  subjectPreference: z.string().min(1, "Subject preference is required"),
  systemPreference: z.string().min(1, "System preference is required"),
  topic: z.string().min(1, "Topic is required"),
  subTopic: z.string().min(1, "Sub-topic is required"),
});

export const uploadProfileSchema = z.object({
  photo: z.instanceof(File).nullable(),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(300, "Bio can be at most 300 characters"),
});

// mentor onboarding details

export const verifyProfessionSchema = z.object({
  photo: z.instanceof(File, { message: "Profile photo is required" }),
  degree: z.instanceof(File, { message: "Degree is required" }),
  identity: z.instanceof(File, { message: "Identity photo is required" }),
  certificate: z.instanceof(File, { message: "Certificate is required" }),
});

export const updatePreferenceSchema = z.object({
  bio: z
    .string()
    .min(1, "Professional bio is required")
    .max(500, "Bio max 500 characters"),
  subjects: z
    .array(z.string().min(1, "Subject is required"))
    .min(1, "At least one subject is required"),
  languages: z
    .array(z.string().min(1, "Language is required"))
    .min(1, "At least one language is required"),
  hourlyRate: z.number().min(0, "Hourly rate must be positive"),
  currency: z
    .string()
    .default("USD")
    .transform((val) => val ?? "USD"),
  availability: z
    .object({
      Monday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Tuesday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Wednesday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Thursday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Friday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Saturday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
      Sunday: z.object({
        enabled: z.boolean().optional(),
        slots: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      }),
    })
    .default({
      Monday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Tuesday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Wednesday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Thursday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Friday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Saturday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
      Sunday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    }),
});

export const platformTrainingSchema = z.object({
  trainingCompleted: z.boolean().refine((val) => val === true, {
    message: "You must complete the platform training",
  }),
});

export const payoutSetupSchema = z
  .object({
    paymentMethod: z.string().min(1, "Payment method is required"),
    accountHolderName: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
    accountType: z.string().optional(),
    paypalEmail: z.string().optional(), // In case needed
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "Bank Transfer") {
      if (!data.accountHolderName)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account Holder Name is required",
          path: ["accountHolderName"],
        });
      if (!data.bankName)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bank Name is required",
          path: ["bankName"],
        });
      if (!data.accountNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account Number is required",
          path: ["accountNumber"],
        });
      if (!data.routingNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Routing Number is required",
          path: ["routingNumber"],
        });
      if (!data.accountType)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account Type is required",
          path: ["accountType"],
        });
    }
    // Add PayPal validation if needed
  });

// end mentor onboarding

// Update multiStepSchema to use discriminated union based on profile.role
export const multiStepSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("student"),
    profile: studentSchema,
    preparing: preparingForSchema,
    preferences: preferencesSchema,
    upload: uploadProfileSchema,
  }),
  z.object({
    role: z.literal("professional"),
    profile: professionalSchema,
    preparing: preparingForSchema,
    preferences: preferencesSchema,
    upload: uploadProfileSchema,
  }),
  z.object({
    role: z.literal("mentor"),
    profile: mentorSchema,
    verifyProfession: verifyProfessionSchema,
    updatePreference: updatePreferenceSchema,
    platformTraining: platformTrainingSchema,
    payoutSetup: payoutSetupSchema,
    upload: uploadProfileSchema,
  }),
]);

export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type PreparingForData = z.infer<typeof preparingForSchema>;
export type PreferencesData = z.infer<typeof preferencesSchema>;
export type UploadProfileData = z.infer<typeof uploadProfileSchema>;
export type VerifyProfessionData = z.infer<typeof verifyProfessionSchema>;
export type UpdatePreferenceData = z.infer<typeof updatePreferenceSchema>;

export type Availability = UpdatePreferenceData["availability"];
export type AvailabilitySlot = Availability["Monday"];
export type TimeSlot = AvailabilitySlot["slots"][number];

export type PlatformTrainingData = z.infer<typeof platformTrainingSchema>;
export type PayoutSetupData = z.infer<typeof payoutSetupSchema>;
export type MultiStepFormData = z.infer<typeof multiStepSchema>;

// export const multiStepSchema = z.object({
//   profile: profileSetupSchema,
//   preparing: preparingForSchema,
//   preferences: preferencesSchema,
//   upload: uploadProfileSchema,
// });

// export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
// export type PreparingForData = z.infer<typeof preparingForSchema>;
// export type PreferencesData = z.infer<typeof preferencesSchema>;
// export type UploadProfileData = z.infer<typeof uploadProfileSchema>;
// export type MultiStepFormData = z.infer<typeof multiStepSchema>;
