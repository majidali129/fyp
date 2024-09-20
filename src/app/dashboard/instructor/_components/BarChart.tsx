"use client";

import { Bar, BarChart as MyBarChart } from "recharts";
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
  }
} satisfies ChartConfig;

export function BarChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[210px] w-full">
      <MyBarChart accessibilityLayer data={chartData}>
        <ChartTooltip labelStyle={{color: 'black'}} />
        <Bar dataKey="desktop" className="fill-success-500"  background={{fill: '#E1F7E3'}}/>
      </MyBarChart>
    </ChartContainer>
  );
}
