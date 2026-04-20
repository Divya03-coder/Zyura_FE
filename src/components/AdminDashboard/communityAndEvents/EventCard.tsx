import CommonHeader from "@/common/header/CommonHeader";
import { toBerhanTime } from "@/help/help";
import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { RegistrationType, UpcomingEventType } from "./UpcomingEvent";

// Props for EventCard
interface EventCardProps {
  event: Partial<RegistrationType & UpcomingEventType>;
}

// Reusable EventCard component
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white p-4 md:p-5 flex justify-between border border-border rounded-xl">
      <div className="flex gap-5 items-center">
        <div
          className={`w-15 h-15 sm:flex items-center justify-center rounded-full hidden ${
            event?.price && "bg-[#DCFCE7] "
          } ${event?.progress && "bg-[#DBEAFE] "} `}
        >
          <span
            className={` ${event?.price && "text-[#15803D] "}  ${
              event?.progress && "text-[#1D4ED8] "
            } `}
          >
            <HiOutlineVideoCamera size={24} />
          </span>
        </div>
        <div>
          {event.title && (
            <CommonHeader className="!font-normal">{event.title}</CommonHeader>
          )}
          {event.name && (
            <CommonHeader className="!font-normal">{event.name}</CommonHeader>
          )}
          {event.email && (
            <CommonHeader className="!font-normal">{event.email}</CommonHeader>
          )}

          {event.dateTime && (
            <div className="flex">
              <CommonHeader className="!font-normal">
                {toBerhanTime(event.dateTime)}
              </CommonHeader>
              {/* <span>
                <BsDot size={20} />
              </span> */}
              {/* <CommonHeader className="!font-normal">
                {toBerhanTime(event.dateTime)}
              </CommonHeader> */}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        {event.progress && <CommonHeader>{event.progress}</CommonHeader>}
        {event.price && <CommonHeader>${event.price}</CommonHeader>}
        {event.status && <CommonHeader>{event.status}</CommonHeader>}
      </div>
    </div>
  );
};

export default EventCard;
