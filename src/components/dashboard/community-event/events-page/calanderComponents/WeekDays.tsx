import { FC } from "react";

const WeekDays: FC = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="grid grid-cols-7 bg-gray-50">
      {weekDays.map(day => (
        <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-b border-gray-200">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
