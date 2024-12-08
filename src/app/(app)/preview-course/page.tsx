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

export default function CoursePreview() {
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
      <h1 className="text-4xl font-bold mb-6">Course Preview</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription className="text-xl">{subTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Thumbnail</h3>
              {thumbnail && (
                <div className="relative w-full h-48">
                  <Image
                    src={URL.createObjectURL(thumbnail)}
                    alt="Course Thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Trailer</h3>
              {trailer && (
                <video controls className="w-full h-48 rounded-lg object-cover">
                  <source
                    src={URL.createObjectURL(trailer)}
                    type={trailer.type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Course Details</h3>
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
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Brief Summary</h3>
            <p className="text-gray-700">{briefSummary}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem value={`section-${index}`} key={section.id}>
                <AccordionTrigger className="text-lg">
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
              <ul className="list-disc pl-5 space-y-2">
                {whatYouWillTeach.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Target Audience</h3>
              <ul className="list-disc pl-5 space-y-2">
                {targetAudience.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Course Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {courseRequirements.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Course Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Welcome Message</h3>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
              {welcomeMessage}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Congratulation Message
            </h3>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
              {congratulationMessage}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg">Save Course</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
