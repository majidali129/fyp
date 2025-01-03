"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { Section } from "@/context/new-course/defs";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  createCourse,
} from "@/services/api/courses.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFile, uploadLecFile } from "@/helpers/uploadFile";

function CoursePreview() {
  let {
    title,
    subTitle,
    category,
    subCategory,
    topic,
    language,
    subtitleLanguage,
    level,
    duration,
    pricingType,
    price,
    discount,
    enrollmentLimit,
    format,
    status,
    thumbnail,
    trailer,
    briefSummary,
    description,
    whatYouWillTeach,
    targetAudience,
    courseRequirements,
    welcomeMessage,
    congratulationMessage,
    courseInstructors,
    sections,
    setMetadata,
  } = useNewCourseProvider();
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const handleCourseSave = async () => {
    setUploading(true);
    try {
      const thumbnailData = await uploadFile(thumbnail!);
      const trailerData = await uploadFile(trailer!, "trailers");

      if(!thumbnailData || !trailerData) {
        console.error("Failed to upload thumbnail or trailer. Aborting upload.");
        return;
      }

      // save lec videos
      const updatedSecs = await Promise.all(
        sections.map(async (section) => ({
          ...section,
          lectures: await Promise.all(
            section.lectures.map(async (lecture) => ({
              ...lecture,
              video: await uploadLecFile(lecture.video),
            }))
          ),
        }))
      );

      const courseData = {
        title,
        subTitle,
        category,
        subCategory,
        topic,
        language,
        subtitleLanguage,
        level,
        duration,
        pricingType,
        price,
        discount,
        enrollmentLimit,
        format,
        status,
        thumbnail: thumbnailData,
        trailer: trailerData,
        briefSummary,
        description,
        whatYouWillTeach,
        targetAudience,
        courseRequirements,
        welcomeMessage,
        congratulationMessage,
        courseInstructors,
        sections: updatedSecs,
      };

      const response = await createCourse(courseData);
      if (response.status === 201) {
        toast.success("Course created successfully!");
      } else {
        toast.error("Failed to create course.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while saving the course.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {uploading && <p>Saving course. Please wait...</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-7">
            {trailer && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Trailer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative">
                    <video
                      controls
                      className="w-full rounded-md object-cover max-h-80 h-full "
                    >
                      <source
                        src={URL.createObjectURL(trailer)}
                        type={trailer?.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h2 className="">{title}</h2>
              <p>{subTitle}</p>
              <p className="text-lg my-3">{parse(description)}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{level}</Badge>
                <Badge variant="secondary">{duration}</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <h3>Metadata</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Basic Details
                    </h3>
                    <p>
                      <strong>Category:</strong> {category}
                    </p>
                    <p>
                      <strong>Sub-category:</strong> {subCategory}
                    </p>
                    <p>
                      <strong>Topic:</strong> {topic}
                    </p>
                    <p>
                      <strong>Language:</strong> {language}
                    </p>
                    {subtitleLanguage && (
                      <p>
                        <strong>Subtitle Language:</strong> {subtitleLanguage}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Course Structure
                    </h3>
                    <p>
                      <strong>Level:</strong> {level}
                    </p>
                    <p>
                      <strong>Duration:</strong> {duration}
                    </p>
                    <p>
                      <strong>Format:</strong> {format}
                    </p>
                    <p>
                      <strong>Status:</strong> <Badge>{status}</Badge>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                    <p>
                      <strong>Type:</strong> {pricingType}
                    </p>
                    <p>
                      <strong>Price:</strong> ${price}
                    </p>
                    <p>
                      <strong>Discount:</strong> {discount}%
                    </p>
                    <p>
                      <strong>Enrollment Limit:</strong> {enrollmentLimit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {whatYouWillTeach.length > 0 &&
              targetAudience.length > 0 &&
              courseRequirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3>Course Details</h3>
                  </CardHeader>
                  <CardContent>
                    <div className=" space-y-4">
                      <div>
                        <h4 className="mb-2.5">What You Will Learn</h4>
                        <ul className="pl-3 space-y-2 columns-1 md:columns-2">
                          {whatYouWillTeach.map((item, index) => (
                            <div
                              role="li"
                              key={index}
                              className="text-gray-700 space-x-2 flex-start"
                            >
                              <span>
                                <FaCircleCheck className="text-success-500" />
                              </span>{" "}
                              {item.value}
                            </div>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2.5">Target Audience</h4>
                        <ul className="pl-3 space-y-2 columns-1 md:columns-2">
                          {targetAudience.map((item, index) => (
                            <div
                              role="li"
                              key={index}
                              className="text-gray-700 space-x-2 flex-start"
                            >
                              <span>
                                <FaCircleCheck className="text-success-500" />
                              </span>{" "}
                              {item.value}
                            </div>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2.5">Course Requirements</h4>
                        <ul className="pl-3 space-y-2 columns-1 md:columns-2">
                          {courseRequirements.map((item, index) => (
                            <div
                              role="li"
                              key={index}
                              className="text-gray-700 space-x-2 flex-start"
                            >
                              <span>
                                <FaCircleCheck className="text-success-500" />
                              </span>{" "}
                              {item.value}
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            {courseInstructors.length > 0 && (
              <Card>
                <CardHeader>
                  <h3>Course Instructors</h3>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseInstructors.map((instructor, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
                      >
                        <div className="relative w-16 h-16">
                          <Image
                            src={instructor.image}
                            alt={instructor.name}
                            layout="fill"
                            objectFit="cover"
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {instructor.name}
                          </p>
                          <p className="text-gray-600">
                            {instructor.profession}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {welcomeMessage && congratulationMessage && (
              <Card>
                <CardHeader>
                  <h3>Instructor Messages</h3>
                </CardHeader>
                <CardContent className="!space-y-3">
                  <div>
                    <h4>Welcome Message</h4>
                    <p className="text-gray-700">{welcomeMessage}</p>
                  </div>
                  <div>
                    <h5>Congratulation Message</h5>
                    <p className="text-gray-700">{congratulationMessage}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* CURRICULUM */}

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="">
                  {sections.map((section: Section, index: number) => (
                    <AccordionItem
                      value={`section-${index}`}
                      key={section.publicId}
                      className=" -mt-2 !mb-4"
                    >
                      <AccordionTrigger className="text-[1rem] [&>div]:flex-between [&>div]:px-3 [&>div]:py-2 [&>div]:!gap-x-0 ">
                        {section.title || "Section 01"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-8">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <li
                              key={lecture.id}
                              className="p-3 shadow-md flex-between"
                            >
                              <span>{lecture.title}</span>
                              <span className="text-sm text-muted-foreground">
                                23:33:10
                              </span>
                            </li>
                          ))}
                        </ul>{" "}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="my-5 flex-end">
              <Button onClick={handleCourseSave}>Save Course</Button>
            </div>
          </div>
          <div>
            {thumbnail && (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={URL.createObjectURL(thumbnail)}
                    alt={title || "Course Thumbnail"}
                    width={300}
                    height={200}
                    className="w-full h-auto mb-4 rounded-md"
                  />
                  <p className="mb-2">
                    <strong>Instructor:</strong> {courseInstructors[0]?.name}
                  </p>
                  <p className="mb-2">
                    <strong>Duration:</strong> {duration}
                  </p>
                  <p className="mb-4">
                    <strong>Level:</strong> {level}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursePreview;
