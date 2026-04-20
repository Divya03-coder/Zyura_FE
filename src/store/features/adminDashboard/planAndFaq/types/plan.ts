export interface PlanFeature {
  featureName: string;
  featureLimit: string;
}

export interface Plan {
  _id: string;
  planName: string;
  price: number;
  description: string;
  billingCycle: string;
  userType: string;
  planFeatures: PlanFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface PricePlanResponse {
  success: boolean;
  message: string;
  data: Plan[];
  meta: null;
}
// create plan
export interface PlanFeaturePayload {
  featureName: string;
  featureLimit: string;
}

export interface CreatePlanPayload {
  planName: string;
  price: number;
  description: string;
  billingCycle: string;
  userType: string;
  planFeatures: PlanFeaturePayload[];
}
