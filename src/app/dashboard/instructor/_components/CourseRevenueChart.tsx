"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Aug 01", revenue: 50000 },
  { date: "Aug 10", revenue: 70000 },
  { date: "Aug 20", revenue: 30000 },
  { date: "Aug 31", revenue: 60000 },
];

export default function CourseRevenueChart() {
  return (
    <Card className=" *:py-2 rounded-none shadow-none border-none">
      <div className="flex-between border-b border-b-gray-100">
        <h6 className="text-gray-700">Revenue</h6>
        <span>This Month</span>
      </div>
      <ResponsiveContainer className="w-[100%] min-h-[300px] ">
        <AreaChart data={data} margin={{ left: 0, right: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 6)}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
            width={35}
            tickFormatter={(value) =>
              value >= 1000000
                ? `${value / 1000000}m`
                : value >= 1000
                ? `${value / 1000}k`
                : value
            }
          />
          <Tooltip
            contentStyle={{
              background: "#333",
              border: "none",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            formatter={(value) => [`$${value}`, "Revenue"]}
            labelFormatter={(label) => `${label}`}
          />
          <Area
            type="basis"
            dataKey="revenue"
            stroke="#564FFD"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
