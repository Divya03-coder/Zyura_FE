// createEventSchema.ts
import { z } from "zod";

export const createEventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventFormat: z.string().min(1, "Event format is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  eventData: z.string().min(1, "Event data is required"),
  startTime: z.string().min(1, "Start time is required"),
  eventDuration: z.string().min(1, "Duration is required"),
  instructor: z.string().min(1, "Instructor is required"),
  eventPrice: z.number().optional(),
  meetingDetails: z.string().min(1, "Meeting link is required"),
});

export type CreateEventForm = z.infer<typeof createEventSchema>;
