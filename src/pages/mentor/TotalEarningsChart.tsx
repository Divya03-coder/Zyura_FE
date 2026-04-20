// TotalEarningsChart.tsx
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TotalEarningsChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-[500px] bg-[#EFF6FF99] border border-blue-300 p-8 rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Background grid (solid lines only) */}
          <CartesianGrid stroke="#E5E7EB" />

          {/* X axis → months */}
          <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 12 }} />

          {/* Y axis → amounts */}
          <YAxis stroke="#374151" tick={{ fontSize: 12 }} />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            }}
            formatter={(value: any) => [
              `$${(value || 0).toLocaleString()}`,
              "Earnings",
            ]}
          />

          {/* Straight line (solid design) */}
          <Line
            type="linear"
            dataKey="amount"
            stroke="#C2410C"
            strokeWidth={2}
            // dot={{ r: 4, fill: "#0076F5" }}
            activeDot={{ r: 6, fill: "#1D4ED8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
