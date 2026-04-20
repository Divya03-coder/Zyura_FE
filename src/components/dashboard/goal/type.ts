import { ReactNode } from "react";

// Types
export interface Subject {
  name: string;
  systems: string[];
}

export interface SelectedSubject {
  subjectName: string;
  systemNames: string[];
  fullSubject?: boolean;
}

export interface FormData {
  goalName: string;
  studyHoursPerDay: number;
  startDate: string;
  endDate: string;
}

export interface Goal {
  todayStudyHours: string | number;
  _id: string;
  goalName: string;
  studyHoursPerDay: number;
  startDate: string;
  endDate: string;
  selectedSubjects: SelectedSubject[];
  studentId: string;
  goalStatus: string;
  totalCompletedStudyHours: number;
  createdAt: string;
  updatedAt: string;
  totalDays: number;
  totalRequiredHours: number;
  completedHours: number;
  progressPercentage: number;
  daysLeft: number;
  remainingHours: number;
  accuracy?: number;
  complete?: number;
}

export interface StepIndicatorProps {
  currentStep: number;
}

export interface EmptyStateProps {
  onSetGoal: () => void;
}

export interface DashboardProps {
  goal: Goal;
  onChangeGoal: () => void;
}

export interface ModalProps {
  showModal: boolean;
  currentStep: number;
  onClose: () => void;
  children: ReactNode;
  isEditMode?: boolean;
}

export interface Step1Props {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onNext: () => void;
  onCancel: () => void;
}

export interface Step2Props {
  availableSubjects: Subject[];
  selectedSubjects: SelectedSubject[];
  onSubjectToggle: (subjectName: string) => void;
  onFullSubjectToggle: (subjectName: string) => void;
  onSystemToggle: (subjectName: string, systemName: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface Step3Props {
  formData: FormData;
  selectedSubjects: SelectedSubject[];
  availableSubjects: Subject[];
  calculateDuration: () => number;
  calculateTotalStudyHours: () => number;
  calculateHoursPerSystem: () => string;
  onPrevious: () => void;
  onCreate: () => void;
  isEditMode?: boolean;
  isLoading?: boolean;
}
