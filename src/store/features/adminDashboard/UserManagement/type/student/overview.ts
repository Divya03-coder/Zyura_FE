// interface DashboardMetric {
//   title: string;
//   total: number;
//   change: number;
//   period: string;
//   trend: "increase" | "decrease";
// }

export type DashboardResponse = {
  success: boolean;
  message: string;
  data: {
    students: {
      title: string;
      total: number;
      change: number;
      period: string;
      trend: "increase" | "decrease";
    };
    mentors: {
      title: string;
      total: number;
      change: number;
      period: string;
      trend: "increase" | "decrease";
    };
    professionals: {
      title: string;
      total: number;
      change: number;
      period: string;
      trend: "increase" | "decrease";
    };
    aiRequest: {
      title: string;
      total: number;
      change: number;
      period: string;
      trend: "increase" | "decrease";
    };
  };
  meta: null;
};

export interface ActivityStats {
  day: number;
  flashcard: number;
  mcqbank: number;
  clinicalcase: number;
  osce: number;
  user: number;
}

export interface ActivityStatsResponse {
  success: boolean;
  message: string;
  data: ActivityStats[];
  meta: null;
}
