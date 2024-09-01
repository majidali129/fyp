import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlinePlayCircle } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi2";
import { Progress } from "@/components/ui/progress";
import CourseCurriculum from "@/components/CourseCurriculum";

const WatchCoursePage = () => {
  return (
    <>
      <div className="py-4 px-6 bg-secondary-50 md:flex-between hidden ">
        <div className="flex-start !gap-x-3">
        <div>
            <Button size={'icon'} variant={'transparent'} className="rounded-full hover:ring-1 hover:ring-gray-400">
                <HiArrowLeft className="w-5 h-5" />
            </Button>
        </div>
        <div>
            <h5>Complete Website Responsive Design: from Figma to Webflow to Website Design</h5>
            <div className="flex-start !gap-x-3.5">
                  <div className="flex-start">
                    <FaRegFolderOpen className="text-primary-500 w-4 h-4" />
                    <span>{"6"} Sections</span>
                  </div>
                  <div className="flex-start">
                    <MdOutlinePlayCircle className="text-secondary-500 w-4 h-4" />
                    <span>202 Lectures</span>
                  </div>
                  <div className="flex-start">
                    <IoTimeOutline className="text-warning-500 w-4 h-4" />
                    <span>19h 37m</span>
                  </div>
                </div>
        </div>
        </div>
        <div className="flex-center !gap-x-3">
          <Button
            size={"sm"}
            variant={"transparent"}
            className="bg-white hover:bg-white text-primary-500 hover:text-primary-600"
          >
            Write A Reveiw
          </Button>
          <Button size={'sm'}>Next Lecture</Button>
        </div>
      </div>

      <section className="p-6 ">
        <div className="grid md:grid-cols-[1fr_38%]  md:gap-x-3">
        <div className="border">
            <div>Player</div>
        </div>
        <div className="space-y-3">
            <div className="space-y-1.5">
                <div className="flex-between">
                    <h5>Course Contents</h5>
                    {/* //TODO: show user how much course get completed */}
                    <h6 className="text-success-500">{'15'}% Completed</h6>
                </div>
                <Progress className="h-1 rounded-none bg-gray-100 *:bg-success-500" />
            </div>
            <CourseCurriculum curriculum={[]}  isWatching={true}/>
        </div>
        </div>
      </section>
    </>
  );
};

export default WatchCoursePage;
