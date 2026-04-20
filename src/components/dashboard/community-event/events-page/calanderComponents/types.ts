export interface Event {
  id: string;
  title: string;
  start: string; // ISO string
  url: string;
  backgroundColor: string;
}

export interface DayObj {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  date: Date;
}
