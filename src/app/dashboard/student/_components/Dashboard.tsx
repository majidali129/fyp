import clsx from "clsx";
import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoTrophySharp } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
const Dashboard = () => {
  return (
    <div className="space-y-9 *:space-y-5">
      <div>
        <h3>Dashboard</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <StatsCard
            className="bg-primary-100"
            title="Enrolled Courses"
            count={643}
            icon={<FaRegPlayCircle className="w-5 h-5 text-primary-500" />}
          />
          <StatsCard
            className="bg-secondary-100"
            title="Active Courses"
            count={643}
            icon={
              <PiCheckSquareOffset className="w-5 h-5 text-secondary-500" />
            }
          />
          <StatsCard
            className="bg-success-100"
            title="Completed Courses"
            count={643}
            icon={<IoTrophySharp className="w-5 h-5 text-success-500" />}
          />
          <StatsCard
            className="bg-primary-100"
            title="Course Instructors"
            count={643}
            icon={<FiUsers className="w-5 h-5 text-primary-500" />}
          />
        </div>
      </div>

      <div>
        <Carousel
          className="w-full space-y-5 "
          opts={{ align: "start" }}
          orientation="horizontal"
        >
          <div className="relative">
            <h3>Let&apos;s start learning, Majid</h3>
            <CarouselPrevious className="bg-primary-100 border-none text-primary-500 left-auto top-4 right-10" />
            <CarouselNext className="bg-primary-100 border-none text-primary-500 right-0 top-4" />
          </div>
          <CarouselContent className=" -ml-[11px]">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="!pl-3 md:basis-1/2 lg:basis-1/4"
              >
                <CourseCard isActive={index % 2 === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard;

function StatsCard({
  title,
  count,
  icon,
  className,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("p-5 flex-start !gap-x-3.5", className)}>
      <div className="h-[3.1rem] w-[3.1rem] flex-center bg-white">{icon}</div>
      <div>
        <h5 className="text-gray-800">{count}</h5>
        <span>{title}</span>
      </div>
    </div>
  );
}
