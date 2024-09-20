import React from "react";
import { StatsCard } from "../student/_components/Dashboard";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiCheckSquareOffset } from "react-icons/pi";
import { BiTrophy } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { CiBadgeDollar } from "react-icons/ci";
import { IoLayersOutline } from "react-icons/io5";
import { BarChart } from "./_components/BarChart";
import { formateNumber } from "@/helpers";

const InstructorHomePage = () => {
  return (
    <section className="py-5">
      <div className="space-y-5">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:bg-white">
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Enrolled Courses"
            count={643}
            iconBg="!bg-primary-100"
            icon={<FaRegPlayCircle className="w-6 h-6 text-primary-500" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Active Courses"
            count={643}
            iconBg="!bg-secondary-100"
            icon={
              <PiCheckSquareOffset className="w-6 h-6 text-secondary-500" />
            }
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Course Instructors"
            count={643}
            iconBg="!bg-warning-100"
            icon={<FiUsers className="w-6 h-6 text-warning-500" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Completed Courses"
            count={643}
            iconBg="!bg-success-100"
            icon={<BiTrophy className="w-6 h-6 text-success-500" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Students"
            count={643}
            iconBg="!bg-error-100"
            icon={<FaRegUserCircle className="w-6 h-6 text-error-500" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="Online Courses"
            count={643}
            iconBg="!bg-success-100"
            icon={<MdLiveTv className="w-6 h-6 text-success-500" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
            title="USD Total Earning"
            count={643}
            iconBg="!bg-gray-100"
            icon={<CiBadgeDollar className="w-6 h-6 text-gray-900" />}
          />
          <StatsCard
            className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem] "
            title="Sold Courses"
            count={643}
            iconBg="!bg-secondary-100"
            icon={<IoLayersOutline className="w-6 h-6 text-secondary-500" />}
          />
        </div>

        {/* ACTIVITIES */}
        {/* <div className="grid gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-[5fr_7fr_4fr] *:bg-success-200 *:h-32"> */}
        <div className="grid gap-4 md:grid-cols-12 *:md:col-span-6 lg:grid-cols-24 ">
          <div className="lg:col-span-8"></div>
          <div className="lg:col-span-10">
          </div>
          <div className="lg:col-span-6  *:p-2 bg-white">
            <div className="flex-between border-b border-b-gray-100 !px-4">
              <h6>Profile Activity</h6>
              <span>Today</span>
            </div>
            <BarChart />
            <div className="!px-4">
              <h5 className="text-gray-800">${formateNumber(3232)}</h5>
              <span className="text-gray-500 text-[1rem]">USD dollar you earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorHomePage;
