import CommonHeader from "@/common/header/CommonHeader";
import { EventsOverview } from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import EventCard from "./EventCard";

interface Event {
  overview: EventsOverview;
}

export type UpcomingEventType = {
  _id: string;
  title: string;
  progress: string;
  date: string;
  time: string;
  dateTime: string;
  status: string;
};

export type RegistrationType = {
  _id: string;
  name: string;
  email: string;
  price: number;
};
const UpcomingEvent: React.FC<Event> = ({ overview }) => {
  const UpcomingEvents: UpcomingEventType[] =
    overview?.upComingEvents?.map((item) => ({
      _id: item._id,
      title: item.eventTitle,
      progress: item.meetingDetails,
      date: item.createdAt,
      time: item.startTime,
      dateTime: item.createdAt,
      status: item.status,
    })) || [];
  const registrations: RegistrationType[] =
    overview?.upComingEvents?.map((item) => ({
      _id: item._id,
      name: item.instructor,
      email: item.meetingDetails,
      price: item.eventPrice,
    })) || [];

  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-6">
      <CommonBorderWrapper className=" flex flex-col gap-4">
        <CommonHeader className="sm:!mb-9">Upcoming Events</CommonHeader>
        {UpcomingEvents?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </CommonBorderWrapper>
      <CommonBorderWrapper className=" flex flex-col gap-4">
        <CommonHeader className="sm:!mb-9">Recent Registrations</CommonHeader>
        {registrations?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </CommonBorderWrapper>
    </div>
  );
};

export default UpcomingEvent;
