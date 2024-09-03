"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlinePlayCircle } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi2";
import { Progress } from "@/components/ui/progress";
import CourseCurriculum from "@/components/CourseCurriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LectureComments from "@/components/LectureComments";
import Modal from "@/components/Modal";
import CourseReviewForm from "@/components/CourseReviewForm";

const WatchCoursePage = () => {
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsWritingReview(true);
  };

  const handleCloseModal = () => {
    setIsWritingReview(false);
  };
  return (
    <section className="pb-10">
      <div className="py-4 px-6 bg-secondary-50 md:flex-between hidden ">
        <div className="flex-start !gap-x-3">
          <div>
            <Button
              size={"icon"}
              variant={"transparent"}
              className="rounded-full hover:ring-1 hover:ring-gray-400"
            >
              <HiArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          <div>
            <h5>
              Complete Website Responsive Design: from Figma to Webflow to
              Website Design
            </h5>
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
            onClick={handleOpenModal}
            size={"sm"}
            variant={"transparent"}
            className="bg-white hover:bg-white text-primary-500 hover:text-primary-600"
          >
            Write A Reveiw
          </Button>
          <Button size={"sm"}>Next Lecture</Button>
          <Modal
            isOpen={isWritingReview}
            onClose={handleCloseModal}
            title="Write a Review"
          >
            <CourseReviewForm onCancel={handleCloseModal} />
          </Modal>
        </div>
      </div>

      <section className="md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_38%]  lg:gap-x-3">
          <div className="border">
            <div>player</div>
          </div>
          {/* course curriculum */}
          <div className="space-y-3 hidden lg:block">
            <div className="space-y-1.5">
              <div className="flex-between">
                <h5>Course Contents</h5>
                {/* //TODO: show user how much course get completed */}
                <h6 className="text-success-500">{"15"}% Completed</h6>
              </div>
              <Progress className="h-1 rounded-none bg-gray-100 *:bg-success-500" />
            </div>
            <CourseCurriculum curriculum={[]} isWatching={true} />
          </div>

          {/* course metadata */}
          <Tabs className="*:px-3" defaultValue="overview">
            <TabsList className="border-y border-y-gray-200 py-2 md:py-2.5 *:md:font-semibold *:md:tracking-wide *:md:text-gray-800 md:flex-start !flex-between !px-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content" className="lg:hidden">
                Course Content
              </TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-3 [&>p]:text-[.9rem]">
                <h4>Course Description</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                  alias. Recusandae pariatur facilis aliquam culpa officiis!
                  Fugiat quod sunt praesentium! Necessitatibus similique iste
                  repellendus mollitia numquam officiis autem cupiditate
                  laborum.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="content" className="lg:hidden">
              {/* Curriculum */}
              <CourseCurriculum isWatching={true} curriculum={[]} />
            </TabsContent>
            <TabsContent value="notes">
              <div className="space-y-3 [&>p]:text-[.9rem]">
                <h4>Lecture Notes</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                  alias. Recusandae pariatur facilis aliquam culpa officiis!
                  Fugiat quod sunt praesentium! Necessitatibus similique iste
                  repellendus mollitia numquam officiis autem cupiditate
                  laborum.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="py-2">
                <h3>
                  Comments <span className="text-lg">{"(434)"}</span>
                </h3>
                <LectureComments />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </section>
  );
};

export default WatchCoursePage;
