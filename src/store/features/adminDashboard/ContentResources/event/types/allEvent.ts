export interface SingleEvent {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventFormat: string;
  category: string;
  description: string;
  eventData: string;
  startTime: string; // ISO date string
  eventDuration: string;
  instructor: string;
  eventPrice: number;
  meetingDetails: string;
  status: string;
  totalRegistrations: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventsOverview {
  totalEvents: number;
  totalRegisteredEvents: number;
  totalRevenueGenerated: number;
  upComingEvents: SingleEvent[];
}

export interface EventsData {
  overview: EventsOverview;
  events: SingleEvent[];
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  skip: number;
}

export interface AllEventsResponse {
  success: boolean;
  message: string;
  data: EventsData;
  meta: Meta;
}
export interface GetEventsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}
