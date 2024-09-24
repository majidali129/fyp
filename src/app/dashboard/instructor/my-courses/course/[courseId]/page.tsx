import { MoreHorizontal, Star } from "lucide-react";
import Image from "next/image";
import img from "../../../../../../../public/images/courseImg.png";
import { Button } from "@/components/ui/button";
import CourseRatingChart from "../../../_components/CourseRatingChart";
import { StatsCard } from "@/app/dashboard/student/_components/Dashboard";
import { CiFileOn } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { BiTrophy } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { PiChartBarHorizontal } from "react-icons/pi";
import CourseOverviewChart from "../../../_components/CourseOverviewChart";
import CourseRevenueChart from "../../../_components/CourseRevenueChart";

const CourseDetailsPage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;

  // TODO: fetch course details using courseID and cache it

  return (
    <section className="py-5">
      <div className="space-y-8 lg:space-y-5">
        {/* COURSE INFO CARD */}
        <div className="max-w-5xl mx-auto p-5 bg-gray-white rounded-sm">
          <div className="grid lg:grid-cols-[4fr_9fr] lg:gap-x-4 gap-y-4">
            <div>
              <Image
                src={img}
                alt="Course thumbnail"
                width={400}
                height={300}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex-start *:text-gray-500 !gap-x-3 lg:!gap-x-5 text-sm">
                <div>
                  Uploaded at <span>Jan 21, 2023</span>
                </div>
                <div>
                  Last updated <span>Sep 15, 2021</span>
                </div>
              </div>
              <h4>2021 Complete Python Bootcamp From Zero to Hero in Python</h4>
              <p className="text-sm text-gray-600">
                3 in 1 Course: Learn to design websites with Figma, build with
                Webflow, and make a living freelancing.
              </p>
              <div className="flex items-center border-b pb-3 border-b-gray-100">
                <div className="md:flex-between space-y-1.5 w-full">
                  <div className="flex-start">
                    <div className="flex -space-x-2">
                      <Image
                        src="/placeholder.svg"
                        alt="Instructor avatar"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                      />
                      <Image
                        src="/placeholder.svg"
                        alt="Instructor avatar"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                      />
                    </div>
                    <div className="*:text-sm ">
                      <p>Created by</p>
                      <p className="text-gray-800 font-semibold">
                        Kevin Gilbert • Kristin Watson
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-bold">4.8</span>
                    <span className="ml-1 text-gray-500">(51,644 Rating)</span>
                  </div>
                </div>
              </div>

              <div className="flex lg:items-center md:flex-row flex-col justify-between py-2 max-sm:space-y-2.5">
                <div className="lg:flex-start flex-between md:!gap-x-10 *:flex-col *:flex">
                  <div>
                    <span className="font-semibold text-[1rem]  text-gray-800">
                      $13.99
                    </span>
                    <span className="text-sm text-gray-500">Course price</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[1rem]  text-gray-800">
                      $131,800,455.82
                    </span>
                    <p className="text-sm text-gray-500">USD Seller Revenue</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button size={"sm"} className="rounded-none max-sm:w-full">
                    Withdraw Money
                  </Button>
                  <Button
                    size="icon"
                    variant="transparentGhost"
                    className="rounded-sm"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COURSE STATS & RATING  */}
        <div className="grid lg:grid-cols-2 gap-5 md:gap-4">
          {/* STATS */}
          <div className="grid sm:grid-cols-2 gap-4 *:bg-white">
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Lecture (219.3 GB)"
              count={1957}
              iconBg="!bg-primary-100"
              icon={<FaRegPlayCircle className="w-6 h-6 text-primary-500" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Total Comments"
              count={53539}
              iconBg="!bg-secondary-100"
              icon={<AiFillMessage className="w-6 h-6 text-secondary-300" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Students Enrolled"
              count={9323293}
              iconBg="!bg-warning-100"
              icon={<FiUsers className="w-6 h-6 text-warning-500" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Course Level"
              count={"Beginner"}
              iconBg="!bg-success-100"
              icon={
                <PiChartBarHorizontal className="w-6 h-6 text-success-500" />
              }
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Course Language"
              count={"Mandarin"}
              iconBg="!bg-gray-100"
              icon={<MdOutlineDateRange className="w-6 h-6 text-gray-900" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Attach File (23.2 GB)"
              count={142}
              iconBg="!bg-warning-100"
              icon={<CiFileOn className="w-6 h-6 text-warning-500" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]"
              title="Hours"
              count={"19:03:53"}
              iconBg="!bg-secondary-100"
              icon={<IoTimeOutline className="w-6 h-6 text-secondary-500" />}
            />
            <StatsCard
              className="!gap-x-5 [&>.icon-wrapper]:md:w-[2.7rem] [&>.icon-wrapper]:md:h-[2.7rem]  "
              title="Student Views"
              count={4239232}
              iconBg="!bg-gray-100"
              icon={<BiTrophy className="w-6 h-6 text-gray-900" />}
            />
          </div>
          <div >
            <CourseRatingChart />
          </div>
        </div>

        {/* REVENUE & OVERVIEW */}
        <div className="grid gap-4 lg:grid-cols-[45%_auto] *:bg-white">
          {/* REVENUE */}
          <div >
            <CourseRevenueChart />
          </div>

          {/* OVERVIEW CHART */}
          <div >
            <CourseOverviewChart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
