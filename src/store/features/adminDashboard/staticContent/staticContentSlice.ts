import { SelectedNode } from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/StudyMode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ContentFor = "student" | "professional";
export type ContentModeType = "exam" | "study";
type CreateContentDataType = {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  type: ContentModeType;
  profileType: string;
  contentFor: ContentFor;
};
export type ContentType =
  | "MCQ"
  | "Flashcard"
  | "ClinicalCase"
  | "OSCE"
  | "Notes";

interface StudentState {
  profileType: string;
  formData: CreateContentDataType | null;
  contentType: ContentType;
  contentFor: ContentFor;
  uploadIntoBank: boolean;
  bankId?: string;
  type: ContentModeType;
  universalSelectNode: SelectedNode;
}

const initialState: StudentState = {
  profileType: "",
  formData: null,
  contentType: "MCQ",
  contentFor: "student",
  type: "study",
  uploadIntoBank: false,
  bankId: "",
  universalSelectNode: {
    subject: "",
    system: "",
    topic: "",
    subtopic: "",
  },
};

const staticContentSlice = createSlice({
  name: "staticContent",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<CreateContentDataType>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = null;
    },
    setProfileType: (state, action: PayloadAction<string>) => {
      state.profileType = action.payload;
    },
    setContentType: (state, action: PayloadAction<ContentType>) => {
      state.contentType = action.payload;
    },
    setContentFor: (state, action: PayloadAction<ContentFor>) => {
      state.contentFor = action.payload;
    },
    setType: (state, action: PayloadAction<ContentModeType>) => {
      state.type = action.payload;
    },
    setContentModeType: (state, action: PayloadAction<ContentModeType>) => {
      state.type = action.payload;
    },
    setUploadIntoBank: (state, action: PayloadAction<boolean>) => {
      state.uploadIntoBank = action.payload;
    },
    setBankId: (state, action: PayloadAction<string>) => {
      state.bankId = action.payload;
    },
    setUniversalSelectNode: (state, action: PayloadAction<SelectedNode>) => {
      const n = action.payload;
      state.universalSelectNode = {
        subject: n.subject.trim(),
        system: n.system.trim(),
        topic: n.topic.trim(),
        subtopic: n.subtopic.trim(),
      };
    },
  },
});

export const {
  setFormData,
  resetFormData,
  setProfileType,
  setContentFor,
  setContentType,
  setContentModeType,
  setUploadIntoBank,
  setBankId,
  setUniversalSelectNode,
} = staticContentSlice.actions;

export default staticContentSlice.reducer;
