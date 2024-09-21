"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
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
    <div className="w-[100%] h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full z-10 ">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default CourseOverviewChart;
