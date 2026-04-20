import { useState } from "react";
import CalendarHeader from "./calanderComponents/CalendarHeader";
import WeekDays from "./calanderComponents/WeekDays";
import CalendarDay from "./calanderComponents/CalendarDay";
import { Event, DayObj } from "./calanderComponents/types";

interface EventCalendarProps {
  events?: Event[];
}

const EventCalendar = ({ events = [] }: EventCalendarProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getDaysInMonth = (date: Date): DayObj[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: DayObj[] = [];
    const adjustedStartingDay =
      startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = adjustedStartingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false,
        date: new Date(year, month, day),
      });
    }

    let nextMonthDay = 1;
    while (days.length < 42) {
      days.push({
        day: nextMonthDay,
        isCurrentMonth: false,
        isPrevMonth: false,
        date: new Date(year, month + 1, nextMonthDay),
      });
      nextMonthDay++;
    }

    return days;
  };

  const isToday = (dayObj: DayObj) => {
    if (!dayObj || !dayObj.date) return false;
    return dayObj.date.toDateString() === today.toDateString();
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  };

  const goToPreviousMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const goToNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  const goToToday = () =>
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const days = getDaysInMonth(currentDate);

  console.log("EventCalendar - Total events received:", events.length);
  console.log("EventCalendar - Events:", events);

  return (
    <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg w-full">
      <div className="rounded-lg overflow-hidden bg-white">
        <CalendarHeader
          currentDate={currentDate}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          goToToday={goToToday}
        />
        <WeekDays />
        <div className="grid grid-cols-7 bg-white">
          {days.map((dayObj, index) => (
            <CalendarDay
              key={`${dayObj.date.getTime()}-${index}`}
              dayObj={dayObj}
              events={events}
              isToday={isToday}
              getWeekNumber={getWeekNumber}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;