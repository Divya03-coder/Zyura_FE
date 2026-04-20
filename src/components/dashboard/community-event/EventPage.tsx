/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
// import FeaturedEventCard from "./events-page/FeaturedEventCard";
import UpcomingEventsCard, { IEvent } from "./events-page/UpcomingEventsCard";
import EventCalander from "./events-page/EventCalander";
import { useState } from "react";
import {
  useGetAllEventsQuery,
  useGetMyEventsQuery,
  useEnrollInEventMutation,
} from "@/store/features/event/event.api";
import { toast } from "sonner";
import { CalendarDays, CalendarCheck } from "lucide-react";
import Pagination from "@/common/custom/Pagination";
import GlobalLoader2 from "@/common/GlobalLoader2";

interface Event {
  id: string;
  title: string;
  type:
    | "PLAB Prep"
    | "Workshop"
    | "Conference"
    | "Telemedicine"
    | "Health Summit";
  date: string;
  time?: string;
  description: string;
  price: string;
  status: "Free" | "Paid";
  featured?: boolean;
  startTime: string;
  endTime: string;
  color: string;
}

interface EventPageProps {
  events: Event[];
  activeEventFilter: string;
  setActiveEventFilter: (filter: string) => void;
  eventFilters: string[];
  isLoading: boolean;
  getTypeColor: (type: string) => string;
}

const EventPage: React.FC<EventPageProps> = ({
  // events,
  isLoading,
  // getTypeColor,
}) => {
  const [activeEvent, setActiveEvent] = useState("all"); // "all" or "my"
  const [allEventsPage, setAllEventsPage] = useState(1);
  const [myEventsPage, setMyEventsPage] = useState(1);
  const itemsPerPage = 8;

  const { data: allEventsResponse, isLoading: isAllEventsLoading } =
    useGetAllEventsQuery({});
  const { data: myEventsResponse, isLoading: isMyEventsLoading } =
    useGetMyEventsQuery({}, { skip: activeEvent !== "my" });

  const [enrollInEvent] = useEnrollInEventMutation();
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(
    null
  );

  const allEvents = allEventsResponse?.data?.events || [];

  // Extract registrations array from the API response
  const myEventRegistrations = myEventsResponse?.data || [];

  // Extract events from registrations for display (without unique filtering)
  const myEvents = myEventRegistrations
    .filter((registration: any) => registration.eventId) // Only include registrations with valid eventId
    .map((registration: any) => ({
      ...registration.eventId,
      registrationId: registration._id, // Keep track of which registration this is
      registeredAt: registration.createdAt,
    }));

  // const featuredEvent = events.find((e) => e.featured) || events[0];

  // Convert myEvents to calendar format - group by unique event dates to avoid calendar duplicates
  const uniqueCalendarEvents = new Map();
  myEvents.forEach((event: any) => {
    if (event._id && event.startTime && !uniqueCalendarEvents.has(event._id)) {
      uniqueCalendarEvents.set(event._id, {
        id: event._id,
        title: event.eventTitle || "Event",
        start: event.startTime,
        url: "",
        backgroundColor: "#cbd5f5",
      });
    }
  });
  // const myEventsForCalendar = Array.from(uniqueCalendarEvents.values());

  const myEventsForCalendar = myEvents
    .filter((event: any) => event._id && event.startTime)
    .map((event: any) => ({
      id: `${event._id}-${event.registrationId}`, // Unique ID combining event + registration
      title: event.eventTitle || "Event",
      start: event.startTime,
      url: "",
      backgroundColor: "#cbd5f5",
    }));

  // Registration handler
  const handleRegister = async (eventId: string) => {
    setRegisteringEventId(eventId);
    try {
      await enrollInEvent({ eventId }).unwrap();
      // toast.success("Successfully registered for the event!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to register for event");
    } finally {
      setRegisteringEventId(null);
    }
  };

  // Pagination logic for All Events
  const totalAllEventsPages = Math.ceil(allEvents.length / itemsPerPage);
  const paginatedAllEvents = allEvents.slice(
    (allEventsPage - 1) * itemsPerPage,
    allEventsPage * itemsPerPage
  );

  // Pagination logic for My Events
  const totalMyEventsPages = Math.ceil(myEvents.length / itemsPerPage);
  const paginatedMyEvents = myEvents.slice(
    (myEventsPage - 1) * itemsPerPage,
    myEventsPage * itemsPerPage
  );

  if (isLoading) {
    return <CommonSkeletonLoader />;
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          className={`
      px-4 py-2 border rounded-md transition-transform duration-200 cursor-pointer
      ${
        activeEvent === "all"
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }
      hover:scale-106
    `}
          onClick={() => setActiveEvent("all")}
        >
          All Events
        </button>

        <button
          className={`
      px-4 py-2 border rounded-md transition-transform duration-200 cursor-pointer
      ${
        activeEvent === "my"
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }
      hover:scale-106
    `}
          onClick={() => setActiveEvent("my")}
        >
          My Events
        </button>
      </div>

      {activeEvent === "all" && (
        <>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-10 mb-6">
            <div className="">
              <FeaturedEventCard
                featuredEvent={featuredEvent}
                getTypeColor={getTypeColor}
              />
            </div>
          </div>

          <div className="w-full mb-6 h-[7.75rem] md:h-32 rounded-lg flex flex-col justify-center px-8 border border-gray-200 bg-white">
            <h2 className="font-semibold text-2xl text-black/100 mb-2">
              Medical Events Calendar
            </h2>
            <p className="text-black/60">
              Stay updated with webinars, workshops, and conferences
            </p>
          </div> */}

          <div>
            {isAllEventsLoading ? (
              <GlobalLoader2 />
            ) : paginatedAllEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedAllEvents.map((event: IEvent) => (
                    <UpcomingEventsCard
                      key={event._id}
                      event={event}
                      isMyEvent={false}
                      onRegister={handleRegister}
                      isRegistering={registeringEventId === event._id}
                    />
                  ))}
                </div>
                {totalAllEventsPages > 1 && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={allEventsPage}
                      totalPages={totalAllEventsPages}
                      onPageChange={setAllEventsPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-lg">
                  No Events found
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  There are no upcoming events at the moment. Check back later!
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {activeEvent === "my" && (
        <>
          <div className="grid grid-cols-1 gap-4 md:gap-6 mt-10 mb-6">
            <div className="">
              <EventCalander events={myEventsForCalendar} />
            </div>
          </div>

          <div className="w-full mb-6 h-[7.75rem] md:h-32 rounded-lg flex flex-col justify-center px-8 border border-gray-200 bg-white">
            <h2 className="font-semibold text-2xl text-black/100 mb-2">
              My Registered Events
            </h2>
            <p className="text-black/60">
              {myEventRegistrations.length} registration
              {myEventRegistrations.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div>
            {isMyEventsLoading ? (
              <GlobalLoader2 />
            ) : paginatedMyEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedMyEvents.map((event: any) => (
                    <UpcomingEventsCard
                      key={event.registrationId}
                      event={{
                        _id: event._id,
                        eventTitle: event.eventTitle,
                        eventType: event.eventType,
                        eventFormat: event.eventFormat,
                        category: event.category,
                        description: event.description || "",
                        startTime: event.startTime,
                        eventDuration: event.eventDuration,
                        instructor: event.instructor,
                        eventPrice: event.eventPrice,
                        status: event.status,
                        totalRegistrations: event.totalRegistrations,
                        createdAt: event.createdAt || "",
                        updatedAt: event.updatedAt || "",
                      }}
                      isMyEvent={true}
                    />
                  ))}
                </div>
                {totalMyEventsPages > 1 && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={myEventsPage}
                      totalPages={totalMyEventsPages}
                      onPageChange={setMyEventsPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-lg">
                  No Registered Events
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  You haven't registered for any events yet.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EventPage;
