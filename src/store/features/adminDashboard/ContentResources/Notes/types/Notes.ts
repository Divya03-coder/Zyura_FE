import {
  ContentFor,
  ContentModeType,
} from "../../../staticContent/staticContentSlice";

export interface NoteFile {
  fileId: string;
  fileType: string;
  fileUrl: string;
  fileName: string;
}

// Notes file type
export interface NoteFile {
  fileId: string;
  fileType: string;
  fileUrl: string;
  fileName: string;
}

// Main data object
export interface NotesData {
  _id: string;
  title: string;
  description: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  contentFor: ContentFor;
  profileType: string;
  type: ContentModeType;
  uploadedBy: string;
  notes: NoteFile[];
  downloadCount: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

// API response wrapper
export interface NotesResponse {
  success: boolean;
  message: string;
  data: NotesData;
  meta: null;
}
