// types.ts
export interface UserData {
  name: string;
  email: string;
  avatar: string;
  studyGoal: string;
  studyStreak: number;
  totalStudyTime: string;
  completedCourses: number;
  currentLevel: string;
  aiAssistant: boolean;
  adaptiveDifficulty: boolean;
  recommendations: boolean;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  read: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

// Each settings component props
export interface StudySettingsProps {
  userData: UserData;
  onUserDataChange: (data: UserData) => void;
}

export interface NotificationSettingsProps {
  notifications?: Notification[];
}

export interface PaymentSettingsProps {
  paymentMethods: PaymentMethod[]; // required
}

export interface PrivacySettingsProps {}

export interface SecuritySettingsProps {}
