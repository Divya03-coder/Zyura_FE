import { baseAPI } from "@/store/api/baseApi";

export interface IMCQOption {
    option: string;
    optionText: string;
    explanation: string;
}

export interface IMCQ {
    mcqId: string;
    difficulty: string;
    question: string;
    options: IMCQOption[];
    correctOption: string;
}

export interface IDailyChallenge {
    _id: string;
    title: string;
    subject: string;
    system: string;
    topic: string;
    contentFor: string;
    profileType: string;
    subtopic: string;
    type: string;
    uploadedBy: string;
    mcqs: IMCQ[];
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface IDailyChallengeResponse {
    success: boolean;
    message: string;
    data: IDailyChallenge;
    meta: null;
}

export const trackingAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getDailyChallenge: build.query<IDailyChallengeResponse, void>({
            query: () => ({
                url: "/tracking/daily-challenge",
                method: "GET",
            }),
            providesTags: ["DailyChallenge"],
        }),
        updateDailyChallengeStatus: build.mutation<any, void>({
            query: () => ({
                url: "/tracking/daily-challenge/status",
                method: "PUT",
            }),
            invalidatesTags: ["DailyChallenge", "Goal"],
        }),
    }),
});

export const { useGetDailyChallengeQuery, useUpdateDailyChallengeStatusMutation } = trackingAPI;
