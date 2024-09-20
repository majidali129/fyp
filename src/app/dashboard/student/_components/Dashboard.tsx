import clsx from "clsx";
import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiCheckSquareOffset } from "react-icons/pi";
import { BiTrophy } from "react-icons/bi";
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
    <div className="space-y-9 *:space-y-5 *:px-5">
      <div>
        <h3>Dashboard</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <StatsCard
            className="bg-primary-100"
            title="Enrolled Courses"
            count={643}
            icon={<FaRegPlayCircle className="w-5 h-5 text-primary-500" />}
            iconBg='bg-primary-100'
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
            icon={<BiTrophy className="w-5 h-5 text-success-500" />}
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
          className="w-full md:space-y-5 space-y-[3.3rem]"
          opts={{ align: "start" }}
          orientation="horizontal"
        >
          <div className="relative">
            <h3>Let&apos;s start learning, Majid</h3>
            <CarouselPrevious className="bg-primary-100 border-none text-primary-500 md:left-auto left-0 top-14 md:top-4 md:right-10" />
            <CarouselNext className="bg-primary-100 border-none text-primary-500 md:right-0 md:top-4 top-14 right-0" />
          </div>
          <CarouselContent className=" -ml-3.5">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="!pl-3.5 md:basis-1/2 lg:basis-1/4"
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

export function StatsCard({
  title,
  count,
  icon,
  className,
  iconBg
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  className?: string;
  iconBg?: string
}) {
  return (
    <div className={clsx("p-5 flex-start !gap-x-3.5", className)}>
      <div className={clsx(`h-[3.1rem] w-[3.1rem] flex-center bg-white icon-wrapper`, iconBg)}>{icon}</div>
      <div>
        <h5 className="text-gray-800">{count}</h5>
        <span>{title}</span>
      </div>
    </div>
  );
}
