"use client";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Sun", metric1: 300000, metric2: 50000 },
  { day: "Mon", metric1: 100000, metric2: 70000 },
  { day: "Tue", metric1: 200000, metric2: 200000 },
  { day: "Wed", metric1: 30000, metric2: 10000 },
  { day: "Thu", metric1: 50000, metric2: 2000 },
  { day: "Fri", metric1: 30000, metric2: 150000 },
  { day: "Sat", metric1: 90000, metric2: 5000 },
];

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const CourseOverviewChart = () => {
  return (
    <Card className=" shadow-none border-none rounded-none border *:py-2 *:px-3.5">
      <div className="flex-between border-b border-b-gray-100">
        <h6 className="text-gray-700">Course Overview</h6>
        <span>This week</span>
      </div>
      <div className="w-full h-full">
      <ResponsiveContainer  height="100%" className="min-w-[200px] max-sm:max-w-[310px] lg:w-full">
        <ChartContainer config={chartConfig} className="min-h-[300px] max-h-[420px] z-10 ">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="day" tickLine={false} />
            <YAxis
              scale="log"
              domain={[1000, "auto"]}
              width={35}
              tickLine={false}
              tickFormatter={(value) => {
                if (value >= 100000) return `${value / 1000000}M`;
                if (value >= 1000) return `${value / 1000}k`;

                return value;
              }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="metric1"
              stroke="#564FFD"
              fill="#EBEBFF"
              strokeWidth={2}
            />
            <Line
              type="basis"
              dataKey="metric1"
              stroke="#FF6636"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CourseOverviewChart;
