"use client";
import React, { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { Sections } from "@/context/new-course/defs";
import { FaCircleCheck } from "react-icons/fa6";
import LinkButton from "./LinkButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatedDuration } from "@/helpers/calculateDuration";

function CoursePreview() {
  const {
    title,
    subTitle,
    category,
    subCategory,
    topic,
    language,
    subtitleLanguage,
    courseLevel,
    courseDuration,
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
    sections,
    welcomeMessage,
    congratulationMessage,
    courseInstructors,
  } = useNewCourseProvider();

  const [savedSections, setSavedSections] = useState<string[]>([]);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  const handleSaveSection = async (sectionId: string) => {
    setSavingSection(sectionId);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSavedSections((prev) => [...prev, sectionId]);
    setSavingSection(null);
  };

  const lecDuration = (videoUrl: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.onloadedmetadata = () => {
      return videoElement.duration;
    };
    return videoElement.duration;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-7">
            <div>
              <h2 className="">
                {title || "Learn Front End With Next JS"}
              </h2>
              <p>{subTitle || "course sub-title"}</p>
              <p className="text-lg my-3">
                {description || "Course Description"}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{courseLevel}</Badge>
                <Badge variant="secondary">{courseDuration}</Badge>
              </div>
            </div>
            {trailer && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Trailer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative">
                    <video controls className="w-full rounded-md object-cover ">
                      <source
                        src={URL.createObjectURL(trailer)}
                        type={trailer?.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                    <Button className="absolute bottom-4 left-4">
                      Watch Trailer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

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
                      <strong>Level:</strong> {courseLevel}
                    </p>
                    <p>
                      <strong>Duration:</strong> {courseDuration}
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
                <div>
                  <h4 className="my-5">Course Details</h4>
                  <div>
                    <div className=" space-y-4 grid md:grid-cols-2 gap-x-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          What You Will Learn
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
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
                        <h3 className="text-xl font-semibold mb-4">
                          Target Audience
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
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
                        <h3 className="text-xl font-semibold mb-4">
                          Course Requirements
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
                          {courseRequirements.map((item, index) => (
                            <div
                              role="li"
                              key={index}
                              className="text-gray-700space-x-2 flex-start"
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
                  </div>
                </div>
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
                <CardContent>
                  <div>
                    <h5>Welcome Message</h5>
                    <p className="text-gray-700">{welcomeMessage}</p>
                  </div>
                  <div>
                    <h5>Congratulation Message</h5>
                    <p className="text-gray-700">{congratulationMessage}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="">
                  {sections.map((section: Sections, index: number) => (
                    <AccordionItem
                      value={`section-${index}`}
                      key={section.id}
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
                              className="shadow md:grid md:grid-cols-2 gap-5 px-3"
                            >
                              <span>{lecture.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {formatedDuration(
                                  lecDuration(
                                    URL.createObjectURL(lecture.video)
                                  )
                                ) || "03:33:23"}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex justify-end">
                          <Button
                            onClick={() => handleSaveSection(section.id)}
                            disabled={
                              savedSections.includes(section.id) ||
                              savingSection === section.id ||
                              (index > 0 &&
                                !savedSections.includes(sections[index - 1].id))
                            }
                          >
                            {savingSection === section.id ? (
                              <>
                                Saving...{" "}
                                <Progress
                                  value={50}
                                  className="w-[100px] ml-2"
                                />
                              </>
                            ) : savedSections.includes(section.id) ? (
                              <>
                                Saved <CheckCircle className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              "Save Section"
                            )}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
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
                    <strong>Duration:</strong> {courseDuration}
                  </p>
                  <p className="mb-4">
                    <strong>Level:</strong> {courseLevel}
                  </p>
                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      {/* old one */}
      <div className="container hidden mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Course Preview</h1>

        <div className="space-y-5 *:p-5 *:py-6 *:shadow *:border *:border-gray-50">
          {title && enrollmentLimit ? (
            <div>
              <h4 className="my-5">Metadata</h4>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <strong>Level:</strong> {courseLevel}
                    </p>
                    <p>
                      <strong>Duration:</strong> {courseDuration}
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
                {briefSummary && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Brief Summary
                    </h3>
                    <p className="text-gray-700">{parse(briefSummary)}</p>
                  </div>
                )}
                {description && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{parse(description)}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="opacity-80 text-center">
                No Course Data Found. Please Try To Uplaod Course.
              </h4>
              <div className="flex items-center justify-center">
                {/* <Link href={"/dashboard/instructor/create-new-course"}>Lets Upload New One</Link> */}
                <LinkButton to="/dashboard/instructor/create-new-course">
                  Lets Upload New One
                </LinkButton>
              </div>
            </div>
          )}

          {thumbnail && trailer && (
            <div>
              <section className="flex items-center justify-center gap-3 ">
                <div className="w-[350px] space-y-2  max-h-80">
                  <h5>Course Thumbnail</h5>
                  <Image
                    src={URL.createObjectURL(thumbnail)}
                    alt={title}
                    width={40}
                    height={40}
                    className="!w-full h-full rounded-md object-cover"
                  />
                </div>
                <div className="w-[350px] space-y-2">
                  <h5>Course Trailer</h5>
                  <video controls className="w-full rounded-md object-cover ">
                    <source
                      src={URL.createObjectURL(trailer)}
                      type={trailer.type}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>
            </div>
          )}

          {/* {sections.length > 0 && (
          <div>
            <h4 className="my-5">Course Content</h4>
            <div>
              <Accordion type="single" collapsible className="">
                {sections.map((section: Sections, index: number) => (
                  <AccordionItem
                    value={`section-${index}`}
                    key={section.id}
                    className=" -mt-2 !mb-4"
                  >
                    <AccordionTrigger className="text-[1rem] [&>div]:flex-between [&>div]:px-3 [&>div]:py-2 [&>div]:!gap-x-0 ">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-8">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <li
                            key={lecture.id}
                            className="shadow md:grid md:grid-cols-2 gap-5 px-3"
                          >
                            <div className="h-full md:grid md:grid-rows-2 ">
                              <div>
                                <h5>Caption</h5>
                                <p className="text-gray-700 rounded-md">
                                  {lecture.caption}
                                </p>
                              </div>
                              <div>
                                <h5>Description</h5>
                                <p className="text-gray-700 rounded-md">
                                  {lecture.description}
                                </p>
                              </div>
                            </div>
                            <div className=" !w-full">
                              {lecture.video && (
                                <div className="w-full ">
                                  <h5 className="font-semibold mb-2">
                                    Lecture Video
                                  </h5>
                                  <video
                                    controls
                                    className="w-full h-72 object-cover"
                                  >
                                    <source
                                      src={URL.createObjectURL(lecture.video)}
                                      type={lecture.video.type}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              )}
                              {lecture.notes && (
                                <div>
                                  <h5 className="font-semibold mb-2">
                                    Lecture Notes
                                  </h5>
                                  <Badge variant="secondary">
                                    {lecture.notes.name}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={() => handleSaveSection(section.id)}
                          disabled={
                            savedSections.includes(section.id) ||
                            savingSection === section.id ||
                            (index > 0 &&
                              !savedSections.includes(sections[index - 1].id))
                          }
                        >
                          {savingSection === section.id ? (
                            <>
                              Saving...{" "}
                              <Progress value={50} className="w-[100px] ml-2" />
                            </>
                          ) : savedSections.includes(section.id) ? (
                            <>
                              Saved <CheckCircle className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            "Save Section"
                          )}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )} */}

          {/* {whatYouWillTeach.length > 0 &&
          targetAudience.length > 0 &&
          courseRequirements.length > 0 && (
            <div>
              <h4 className="my-5">Course Details</h4>
              <div>
                <div className=" space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      What You Will Learn
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
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
                    <h3 className="text-xl font-semibold mb-4">
                      Target Audience
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
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
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Course Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
                    {courseRequirements.map((item, index) => (
                      <div
                        role="li"
                        key={index}
                        className="text-gray-700space-x-2 flex-start"
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
            </div>
          )}

        {courseInstructors.length > 0 && (
          <div>
            <h4 className="my-5">Course Instructors</h4>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseInstructors.map((instructor, index) => (
                  <div
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
                      <p className="font-semibold text-lg">{instructor.name}</p>
                      <p className="text-gray-600">{instructor.profession}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {welcomeMessage && congratulationMessage && (
          <div>
            <h4 className="my-5">Instructor Messages</h4>
            <div>
              <section className="grid md:grid-cols-2 gap-5">
                <div>
                  <h5>Welcome Message</h5>
                  <p className="text-gray-700">{welcomeMessage}</p>
                </div>
                <div>
                  <h5>Congratulation Message</h5>
                  <p className="text-gray-700">{congratulationMessage}</p>
                </div>
              </section>
            </div>
            <div className="flex-end my-5">
              <Button >Save Course</Button>
            </div>
          </div>
        )} */}
        </div>
      </div>
    </>
  );
}

export default CoursePreview;
