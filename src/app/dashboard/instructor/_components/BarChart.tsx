"use client";

import { Bar, BarChart as MyBarChart, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 180, mobile: 80 },
  { month: "August", desktop: 129, mobile: 200 },
  { month: "September", desktop: 223, mobile: 120 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChart() {
  return (
    <div className="w-[100%] min-h-[230px] *:py-2 *:px-3.5">
      <div className="flex-between border-b border-b-gray-100  !px-4">
        <h6 className="text-gray-700">Profile View</h6>
        <span>Today</span>
      </div>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <ChartContainer
          config={chartConfig}
          className="w-[100%] min-h-[230px] h-[100%]"
        >
          <MyBarChart accessibilityLayer data={chartData}>
            <Bar
              dataKey="desktop"
              barSize={13}
              className="fill-success-500 hover:bg-red-400"
              background={{ fill: "#E1F7E3" }}
            />
          </MyBarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
