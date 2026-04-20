import { FC } from "react";
import { Event } from './types';

interface EventItemProps {
  event: Event;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="text-xs rounded px-2 py-1 cursor-pointer hover:opacity-90 transition-opacity"
      style={{ backgroundColor: event.backgroundColor }}
    >
      <div className="font-medium text-gray-800 truncate">{event.title}</div>
      <div className="text-gray-700">{formatTime(event.start)}</div>
    </div>
  );
};

export default EventItem;
