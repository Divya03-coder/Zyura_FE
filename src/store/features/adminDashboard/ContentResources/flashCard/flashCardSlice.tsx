import { baseAPI } from "@/store/api/baseApi";
import { DifficultyFilter } from "@/types";
import { UploadMode } from "../MCQ/types/addMoreMcq";
import {
  FlashCardParams,
  FlashcardResponse,
  ManualFlashCardUpload,
} from "./types/FlashCardResponse";
import {
  FlashCardInput,
  SingleFlashCardApiResponse,
} from "./types/SingleFlashCard";
export const flashCardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllFlashCards: build.query<FlashcardResponse, FlashCardParams>({
      query: (params) => ({
        url: "/flash-card/all",
        method: "GET",
        params,
      }),
      providesTags: ["FlashCard"],
    }),
    getSingleFlashCards: build.query<
      SingleFlashCardApiResponse,
      {
        id: string;
        difficulty?: DifficultyFilter;
        searchTerm?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ id, difficulty, searchTerm, page, limit }) => ({
        url: `/flash-card/single/${id}`,
        method: "GET",
        params: { difficulty, searchTerm, page, limit },
      }),
      providesTags: ["FlashCard"],
    }),
    deleteFlashCardBank: build.mutation<void, string>({
      query: (id) => ({
        url: `/flash-card/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashCard"],
    }),

    updateSingleFlashCard: build.mutation<
      void,
      { flashBankId: string; flashCardId: string; data: FlashCardInput }
    >({
      query: ({ flashBankId, flashCardId, data }) => ({
        url: `/flash-card/update/${flashBankId}/${flashCardId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),

    deleteSingleFlashCard: build.mutation<
      void,
      { flashBankId: string; flashCardId: string }
    >({
      query: ({ flashBankId, flashCardId }) => ({
        url: `/flash-card/delete-single/${flashBankId}/${flashCardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashCard"],
    }),

    manualUploadFlashCard: build.mutation<void, ManualFlashCardUpload>({
      query: (data) => ({
        url: "/flash-card/manual-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),
    bulkUploadFlashCard: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/flash-card/bulk-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),

    addMoreFlashcardToFlashcardBank: build.mutation<
      void,
      { flashCardBankId: string; data: FormData } & UploadMode
    >({
      query: ({ data, flashCardBankId, key }) => ({
        url: `/flash-card/upload-more-flash-card/${flashCardBankId}`,
        method: "PUT",
        body: data,
        params: { key },
      }),
      invalidatesTags: ["FlashCard"],
    }),
  }),
});

export const {
  useGetAllFlashCardsQuery,
  useBulkUploadFlashCardMutation,
  useManualUploadFlashCardMutation,
  useGetSingleFlashCardsQuery,
  useDeleteFlashCardBankMutation,
  useUpdateSingleFlashCardMutation,
  useDeleteSingleFlashCardMutation,
  useAddMoreFlashcardToFlashcardBankMutation,
} = flashCardApi;
