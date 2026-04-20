import { FC } from "react";
import EventItem from "./EventItem";
import { DayObj, Event } from "./types";

interface CalendarDayProps {
  dayObj: DayObj;
  events: Event[];
  isToday: (dayObj: DayObj) => boolean;
  getWeekNumber: (date: Date) => number;
  index: number;
}

const CalendarDay: FC<CalendarDayProps> = ({ dayObj, events, isToday, getWeekNumber, index }) => {
  const dayEvents = events.filter(event => event.start.startsWith(
    `${dayObj.date.getFullYear()}-${String(dayObj.date.getMonth() + 1).padStart(2,'0')}-${String(dayObj.date.getDate()).padStart(2,'0')}`
  ));
  const todayClass = isToday(dayObj);
  const isWeekStart = index % 7 === 0;
  const weekNumber = getWeekNumber(dayObj.date);

  return (
    <div
      className={`border-b border-r border-gray-100 relative bg-white hover:bg-gray-50 transition-colors ${
        index % 7 === 6 ? 'border-r-0' : ''
      } ${todayClass ? 'bg-blue-50' : ''}`}
      style={{ minHeight: '90px' }} // reduced from 120px
    >
      {isWeekStart && (
        <div className="absolute -left-6 top-1 text-xs text-gray-400 font-normal w-5 text-right">
          {weekNumber}
        </div>
      )}

      <div className="p-1 h-full flex flex-col">
        {/* Day number */}
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm ${
            dayObj.isCurrentMonth 
              ? todayClass ? 'text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center font-semibold' : 'text-black font-medium' 
              : 'text-gray-400 font-normal'
          }`}>
            {dayObj.day}
          </span>
          {todayClass && <span className="text-[10px] text-blue-600 font-semibold">TODAY</span>}
        </div>

        {/* Events */}
        <div className="space-y-[2px] overflow-hidden">
          {dayEvents.slice(0, 2).map(event => (
            <EventItem key={event.id} event={event} />
          ))}
          {dayEvents.length > 2 && (
            <div className="text-[10px] text-gray-500 truncate">
              +{dayEvents.length - 2} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
