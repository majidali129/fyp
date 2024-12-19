"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Play } from "lucide-react";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { Sections } from "@/context/new-course/defs";
import { FaCircleCheck } from "react-icons/fa6";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Course Preview</h1>

      {title && enrollmentLimit ? (
        <Card className="mb-8">
          <CardHeader>
            <h2>Metadata</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
                <p>
                  <strong>Title:</strong> {title}
                </p>
                <p>
                  <strong>SubTitle:</strong> {subTitle}
                </p>
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
                <h3 className="text-lg font-semibold mb-2">Course Structure</h3>
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
                <h3 className="text-xl font-semibold mb-2">Brief Summary</h3>
                <p className="text-gray-700">{briefSummary}</p>
              </div>
            )}
            {description && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <h4 className="opacity-80 text-center">No Course Data Found. Please Try To Uplaod Course.</h4>
          </CardHeader>
        </Card>
      )}

      {thumbnail && trailer && (
        <Card>
          <CardContent>
           <section className="grid md:grid-cols-2 *:w-full">
           <div>
              <h5>Course Thumbnail</h5>
              <Image
                src={URL.createObjectURL(thumbnail)}
                alt={title}
                width={300}
                height={200}
              />
            </div>
            <div>
              <h5>Course Trailer</h5>
              <video controls className="w-full h-40 rounded-lg object-cover">
                <source
                  src={URL.createObjectURL(trailer)}
                  type={trailer.type}
                />
                Your browser does not support the video tag.
              </video>
            </div>
           </section>
          </CardContent>
        </Card>
      )}

      {sections.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section: Sections, index: number) => (
                <AccordionItem value={`section-${index}`} key={section.id} className="border-b-0 border border-gray-100 -mt-2 !mb-4">
                  <AccordionTrigger className="text-[1rem] [&>div]:flex-between [&>div]:px-3 [&>div]:py-2 [&>div]:!gap-x-0 ">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <li
                          key={lecture.id}
                          className="border p-4 rounded-lg shadow"
                        >
                          <h4 className="font-semibold text-lg">
                            {lecture.caption}
                          </h4>
                          <p className="text-gray-600 mt-2">
                            {lecture.description}
                          </p>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lecture.video && (
                              <div>
                                <h5 className="font-semibold mb-2">
                                  Lecture Video
                                </h5>
                                <video
                                  controls
                                  className="w-full h-40 rounded-lg object-cover"
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
                    <div className="mt-6">
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
          </CardContent>
        </Card>
      )}

      {whatYouWillTeach.length > 0 &&
        targetAudience.length > 0 &&
        courseRequirements.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    What You Will Learn
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
                    {whatYouWillTeach.map((item, index) => (
                      <div role="li" key={index} className="text-gray-700 space-x-2 flex-start">
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
                      <div role="li" key={index} className="text-gray-700 space-x-2 flex-start">
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
                    <div role="li" key={index} className="text-gray-700space-x-2 flex-start">
                      <span>
                        <FaCircleCheck className="text-success-500" />
                      </span>{" "}
                      {item.value}
                    </div>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

      {courseInstructors.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Instructors</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {welcomeMessage ||
        (congratulationMessage && (
          <Card>
            <CardHeader>
              <CardTitle>Course Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Welcome Message</h3>
                <p className="text-gray-700 p-4 rounded-md">{welcomeMessage}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Congratulation Message
                </h3>
                <p className="text-gray-700 p-4 rounded-md">
                  {congratulationMessage}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg">Save Course</Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default CoursePreview;
