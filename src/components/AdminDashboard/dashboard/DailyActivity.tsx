import CommonHeader from "@/common/header/CommonHeader";
import { useGetDashboardActivityQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === "quizzes" && `Quizzes:${entry.value}`}
            {entry.dataKey === "flashcards" && `Flashcard:${entry.value}`}
            {entry.dataKey === "users" && `User:${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DailyActivity() {
  const { data: activityData } = useGetDashboardActivityQuery();
  const chartData =
    activityData?.data?.map((item: any) => ({
      day: `Day ${item.day}`,
      quizzes: item.mcqbank,
      flashcards: item.flashcard,
      users: item.user,
    })) ?? [];
  return (
    <CommonBorderWrapper>
      <CommonHeader className="text-lg! mb-7.5">Daily Activity</CommonHeader>

      <div>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" />

            <XAxis
              dataKey="day"
              tick={{ fill: "#000", fontSize: 20, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 1000]}
              ticks={[0, 250, 500, 750, 1000]}
              tick={{ fill: "#000", fontSize: 20, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={50}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Lines (UNCHANGED) */}
            <Line
              type="monotone"
              dataKey="quizzes"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: "#2563eb", r: 6 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="flashcards"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ fill: "#16a34a", r: 6 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#dc2626"
              strokeWidth={0}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CommonBorderWrapper>
  );
}
