export type ReportItem = {
  _id: string;
  accountId: string;
  name: string;
  profile_photo?: string;
  report: {
    questionBankId: string;
    mcqId: string;
    text: string;
  };
  status: "IN_REVIEW" | "RESOLVED" | "REJECTED" | string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportMeta = {
  page: string;
  limit: string;
  skip: number;
  total: number;
  totalPages: number;
};

export type ReportResponse = {
  success: boolean;
  message: string;
  data: ReportItem[];
  meta: ReportMeta;
};
export type ReportResponseParam = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: ReportStatus | string;
};

export type ReportStatus = "IN_REVIEW" | "RESOLVED" | "REJECTED";
export type ReportStatusPayload = {
  status: ReportStatus;
  note: string;
};
