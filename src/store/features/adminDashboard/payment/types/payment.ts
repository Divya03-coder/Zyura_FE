export interface OverviewResponse {
  success: boolean;
  message: string;
  data: {
    totalRevenue: number;
    activeSubscribers: number;
    thisMonthSubscribers: number;
  };
  meta: null;
}

// get subscribers
export interface SubscribersResponse {
  success: boolean;
  message: string;
  data: Subscriber[];
  meta: PaginationMeta;
}

export interface Subscriber {
  _id: string;
  accountId: Account;
  planId: Plan;
  paymentId: string;
  sessionId: string;
  successIndicator: string;
  amount: number;
  currency: string;
  checkoutMode: "WEBSITE";
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
  updatedAt: string;
  transactionId?: string;
}

export interface Account {
  _id: string;
  email: string;
  profile_type: "student_profile";
  profile_id: UserProfile;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Plan {
  _id: string;
  planName: string;
  price: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaymentParams {
  page?: number;
  limit?: number;
}
