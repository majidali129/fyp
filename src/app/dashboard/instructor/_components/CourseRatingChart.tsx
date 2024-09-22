"use client";

import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";
import { StarIcon } from "lucide-react";

const data = [
  { week: 1, value: 4.5 },
  { week: 2, value: 4.8 },
  { week: 3, value: 4.3 },
  { week: 4, value: 4.7 },
  { week: 5, value: 4.4 },
  { week: 6, value: 4.8 },
  { week: 7, value: 4.5 },
  { week: 8, value: 4.6 },
  { week: 9, value: 4.7 },
  { week: 10, value: 4.5 },
];

const ratingData = [
  { stars: 5, percentage: 56 },
  { stars: 4, percentage: 37 },
  { stars: 3, percentage: 8 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

export default function Component() {
  return (
    <div className="w-[100%] bg-white ">
      {/* HEADER */}
      <div className="flex-between border-b border-b-gray-100 px-3.5 py-2">
        <h6 className="text-gray-700">Overall Course Rating</h6>
        <span>This week</span>
      </div>
      {/* CONTENT */}
      <div className="*:px-3.5 *:py-3.5 lg:*:py-2.5 space-y-3.5">
        {/* CHART AREA */}
        <div className="grid md:grid-cols-[40%_auto] gap-2 border-b border-b-gray-100">
          <div className="bg-warning-100 flex items-center justify-center flex-col p-5 gap-1">
            <div className="text-5xl font-bold text-gray-900">4.6</div>
            <div className="flex items-center flex-col gap-1.5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? "text-warning-500" : "text-warning-200"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm">Overall Rating</span>
            </div>
          </div>
          <div className="">
            <ResponsiveContainer className="w-[100%] h-[100%]">
              <AreaChart data={data}>
                <Area
                  type="monotone"
                  strokeWidth={2}
                  dataKey="value"
                  stroke="#FD8E1F"
                  fillOpacity={1}
                  fill="#FFF2E5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RATING STARS */}
        <div className="space-y-2">
          {ratingData.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center">
              <div className="w-16 text-sm font-medium text-gray-600">
                {stars} Star
              </div>
              <div className="flex-grow mx-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-sm font-medium text-gray-600">
                {percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
