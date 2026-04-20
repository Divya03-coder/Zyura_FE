// Zod Schemas
import { z } from "zod";
const planFeatureSchema = z.object({
  featureName: z.string().nonempty("Feature name is required"),
  featureLimit: z.string().nonempty("Feature limit is required"),
});

export const planFormSchema = z.object({
  planName: z.string().nonempty("Plan name is required"),
  price: z.preprocess(
    (val) => (val === "" ? NaN : Number(val)),
    z.number().min(0, "Price cannot be negative")
  ),
  description: z.string().nonempty("Description is required"),
  billingCycle: z.enum(["Monthly", "Yearly"]),
  userType: z.string().nonempty("User type is required"),
  planFeatures: z.array(planFeatureSchema).min(1, "Add at least one feature"),
});

export type PlanFormValues = z.infer<typeof planFormSchema>;
