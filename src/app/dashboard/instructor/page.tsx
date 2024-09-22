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
import { FaCommentDots } from "react-icons/fa";
import { BarChart } from "./_components/BarChart";
import { FaHeart } from "react-icons/fa";
import { formateNumber } from "@/helpers";
import { FaStar } from "react-icons/fa";
import { PiFoldersFill } from "react-icons/pi";
import CourseRevenueChart from "./_components/CourseRevenueChart";
import CourseRatingChart from "./_components/CourseRatingChart";
import CourseOverviewChart from "./_components/CourseOverviewChart";

enum ActivityType {
  Comment = "comment",
  Like = "like",
  Purchase = "purchase",
  Rating = "rating",
}

const InstructorHomePage = () => {

  return (
    <section className="py-5">
      <div className="space-y-5">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:bg-white *:shadow-md">
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
        <div className="grid gap-4 md:grid-cols-12 *:md:col-span-6 lg:grid-cols-24 *:bg-white">
          {/* RECENT ACTIVITIES */}
          <div className="lg:col-span-8 bg-white *:py-2 *:px-3.5 ">
            <div className="flex-between border-b border-b-gray-100">
              <h6 className="text-gray-700">Recent Activity</h6>
              <span>Today</span>
            </div>
            {/* ACTIVITY LIST */}
            <ul className="space-y-2.5 max-h-[275px] layout-scroll h-full overflow-y-auto ">
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            <UserActivityItem />
            </ul>
          </div>

          {/* REVENUE CHART */}
          <div className="lg:col-span-10  px-3 ">
              <CourseRevenueChart />
          </div>
          {/* PROFILE VIEW CHART */}
          <div className="lg:col-span-6 ">
            <BarChart />
            <div className="!px-4">
              <h5 className="text-gray-800">${formateNumber(3232)}</h5>
              <span className="text-gray-500 text-[1rem]">
                USD dollar you earned
              </span>
            </div>
          </div>
        </div>

        {/* RATING + OVERVIEW */}
        <div className="grid gap-4 lg:grid-cols-[42%_auto] *:bg-white">
        {/* <div className="grid gap-4 md:grid-cols-[1fr_1fr] lg:grid-cols-[10fr_14fr] "> */}
          {/* RECENT ACTIVITIES */}
          <div className=" ">
              <CourseRatingChart />
          </div>

          {/* REVENUE CHART */}
          <div className="">
              <CourseOverviewChart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorHomePage;

function UserActivityItem() {
  const activity: ActivityType = ActivityType.Like;

  const getActivityIcon = (activity: ActivityType): JSX.Element => {
    switch (activity) {
      case ActivityType.Like:
        return <FaHeart className="text-white w-3 h-3" />;
      case ActivityType.Purchase:
        return <PiFoldersFill className="text-white w-3 h-3" />;
      case ActivityType.Rating:
        return <FaStar className="text-white w-3 h-3" />;
      default:
        return <FaCommentDots className="text-white w-3 h-3" />;
    }
  };

  const activityIcon = getActivityIcon(activity);
  return (
    <li className="grid grid-cols-[25px_1fr] gap-2">
      <div className="w-6 h-6 bg-primary-500 flex items-center justify-center rounded-full">
        {activityIcon}
      </div>
      <div>
        <p className="text-sm [&>span]:text-gray-800 [&>span]:text-[1rem] text-gray-500 ">
          <span>Majid</span> commented on your lecture <span>user comment</span>
        </p>
        <span className="text-gray-400 text-sm">Just now</span>
      </div>
    </li>
  );
}
