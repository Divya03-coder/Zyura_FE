import { FC } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
  currentDate,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
}) => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 ml-2"
        >
          <Calendar className="w-4 h-4" /> Today
        </button>
      </div>
      <h2 className="text-2xl font-normal text-black">
        {monthNames[currentDate.getMonth()]} <span className="font-light">{currentDate.getFullYear()}</span>
      </h2>
      <div className="w-32"></div>
    </div>
  );
};

export default CalendarHeader;
