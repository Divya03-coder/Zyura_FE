/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { logout } from "../features/auth/auth.slice";

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders(headers) {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      headers.set("authorization", `${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions: any,
) => {
  const result = await baseQueryAPI(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  const errorMsgFromError =
    (result?.error && (result.error.data as any)?.message) ||
    (result?.error && (result.error.data as any)?.err?.message) ||
    "";
  const errorNameFromError = (result?.error && (result.error.data as any)?.err?.name) || "";

  if (
    (result?.error && result.error.status === 401) ||
    (typeof errorMsgFromError === "string" && errorMsgFromError.toLowerCase().includes("jwt expired")) ||
    errorNameFromError === "TokenExpiredError"
  ) {
    localStorage.clear();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    api.dispatch(logout());
    toast.error("Session expired. Please login again.");
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  }

  if (
    result?.data &&
    typeof result.data === "object"
  ) {
    const d: any = result.data;
    const message = (d && (d.message || d.msg || (d.err && d.err.message))) || "";
    const errName = d?.err?.name;

    if (
      (typeof message === "string" && message.toLowerCase().includes("jwt expired")) ||
      errName === "TokenExpiredError"
    ) {
      localStorage.clear();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      api.dispatch(logout());
      toast.error("Session expired. Please login again.");
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
    }
  }

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions?.silent) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    // Error toast for non-GET methods (excluding 401 which is handled above)
    if (result?.error && result.error.status !== 401) {
      const message =
        (result.error.data as { message?: string })?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: [
    "Student",
    "Professional",
    "professionalsProfile",
    "Mentor",
    "mentorsProfile",
    "Forum",
    "Questions",
    "SocialPost",
    "Mcq",
    "SingleMcq",
    "StudyModeTree",
    "Exams",
    "studentType",
    "FlashCard",
    "Notes",
    "ClinicalCase",
    "OSCE",
    "PricePlan",
    "Goal",
    "AITutor",
    "Faq",
    "Event",
    "ResourceCarrier",
    "ResourceBooks",
    "StudyPlan",
    "WebSetting",
    "ReportResponse",
    "professionalType",
    "BioDigital",
    "payment",
    "GeneratedMCQ",
    "GeneratedNotes",
    "GeneratedFlashcard",
    "GeneratedClinicalCase",
    "Group",
    "GroupMessage",
    "Transaction",
    "Tracking",
    "Leaderboard",
    "Sessions",
    "AllExam",
    "AllExamForProfessional",
    "DailyChallenge",
  ],

  endpoints: () => ({}),
});
