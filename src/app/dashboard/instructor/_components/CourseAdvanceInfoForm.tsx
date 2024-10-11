"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import { PiImageThin } from "react-icons/pi";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { MdOutlinePlayCircle } from "react-icons/md";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitBtn from "@/components/SubmitBtn";
import RTE from "./RTE";

const profileFormSchema = z.object({
  whatYouWillTeach: z
    .array(
      z.object({
        value: z.string().min(10, "please enter a particular point"),
        placeholder: z.string().optional(),
      })
    )
    .optional(),
  targetAudience: z
    .array(
      z.object({
        value: z.string().min(10, "please enter a short details"),
        placeholder: z.string().optional(),
      })
    )
    .optional(),
  courseRequirements: z
    .array(
      z.object({
        value: z.string().min(10, "please enter a short details"),
        placeholder: z.string().optional(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  whatYouWillTeach: [
    { value: "", placeholder: "What you will teach in this course..." },
    { value: "", placeholder: "What you will teach in this course..." },
    { value: "", placeholder: "What you will teach in this course..." },
    { value: "", placeholder: "What you will teach in this course..." },
  ],
  targetAudience: [
    { value: "", placeholder: "Who this course is for..." },
    { value: "", placeholder: "Who this course is for..." },
    { value: "", placeholder: "Who this course is for..." },
    { value: "", placeholder: "Who this course is for..." },
  ],
  courseRequirements: [
    { value: "", placeholder: "What is your course requirement..." },
    { value: "", placeholder: "What is your course requirement..." },
    { value: "", placeholder: "What is your course requirement..." },
    { value: "", placeholder: "What is your course requirement..." },
  ],
};

const CourseAdvanceInfoForm = ({ title }: { title?: string }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [trailerPreview, setTrailerPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // dynamic form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields: whatYouWillTeachFields, append: appendTeachField } =
    useFieldArray({
      name: "whatYouWillTeach",
      control: form.control,
    });
  const { fields: targetAudienceFields, append: appendAudienceField } =
    useFieldArray({
      name: "targetAudience",
      control: form.control,
    });
  const {
    fields: courseRequirementFields,
    append: appendCourseRequirementField,
  } = useFieldArray({
    name: "courseRequirements",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    alert(description);
    console.log({ ...data, thumbnail, trailer, description });
  }

  const handleThumbnailUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };
  const handleTrailerUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file!);
    if (file) {
      setTrailer(file);
      setTrailerPreview(url);
    }
  };

  return (
    <section className="*:px-4 lg:*:px-7 space-y-5">
      {/* header */}
      <div className="md:flex-between space-y-3 py-4 border-b border-b-gray-100">
        <h4>{!title && "Advance Information"}</h4>
        <div className="md:space-x-2 max-sm:flex-end">
          <Button size="sm" variant="secondaryPrimary">
            Save
          </Button>
          <Button size="sm" variant="transparentPrimary">
            Save & Preview
          </Button>
        </div>
      </div>

      <div className="pt-2 pb-8 border-b border-b-gray-100">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-4">
          {/* THUMBNAIL UPLOAD */}
          <div className="space-y-2.5">
            <h6>Course Thumbnail</h6>
            <div className="grid md:grid-cols-[33%_auto] lg:grid-cols-[38%_auto] gap-4">
              <div className="h-52  md:h-28 bg-gray-50 flex items-center justify-center">
                {thumbnail && (
                  <Image
                    src={thumbnailPreview!}
                    width={200}
                    height={130}
                    priority
                    className="w-full h-full object-cover"
                    alt="course thumbnail"
                  />
                )}

                {!thumbnail && !thumbnailPreview && (
                  <PiImageThin className="w-16 h-16 lg:w-20 lg:h-20 text-gray-300" />
                )}
              </div>
              <div className="flex flex-col items-start justify-evenly gap-2.5">
                <p className="text-gray-600 text-xs *:text-gray-900">
                  Upload your course Thumbnail here. <b>Important guidelines</b>{" "}
                  : 1200x800 pixels or 12:8 Ratio. Supported format:{" "}
                  <b>.jpg, .jpeg, or .png</b>
                </p>

                <label
                  htmlFor="thumbnail"
                  className="bg-primary-100 text-sm flex-center font-semibold text-primary-500 py-1.5 md:py-2 px-4 hover:cursor-pointer"
                >
                  <Input
                    type="file"
                    name=""
                    id="thumbnail"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                  />
                  Upload Image <BsUpload className="w-5 h-5 text-primary-500" />
                </label>
              </div>
            </div>
          </div>
          {/* TRAILER VIDEO UPLOAD */}
          <div className="space-y-2.5">
            <h6>Course Trailer</h6>
            <div className="grid md:grid-cols-[33%_auto] lg:grid-cols-[38%_auto] gap-4">
              <div className="h-52  md:h-28 bg-gray-50 flex items-center justify-center">
                {trailer && (
                  <video
                    src={trailerPreview!}
                    controls
                    className="w-full h-full object-cover aspect-video"
                  />
                )}

                {!trailer && !trailerPreview && (
                  <MdOutlinePlayCircle className="w-16 h-16 lg:w-20 lg:h-20 text-gray-300" />
                )}
              </div>
              <div className="flex flex-col items-start justify-evenly gap-2.5">
                <p className="text-gray-600 text-xs *:text-gray-900">
                  Students who watch a well-made promo video are 5X more likely
                  to enroll in your course. We&apos;ve seen that statistic go up
                  to 10X for exceptionally awesome videos.
                </p>

                <label
                  htmlFor="trailer"
                  className="bg-primary-100 flex-center font-semibold text-primary-500 py-1.5 md:py-2 px-4 hover:cursor-pointer text-sm"
                >
                  <input
                    type="file"
                    name="trailer"
                    accept="video/mp4"
                    id="trailer"
                    className="hidden"
                    onChange={handleTrailerUpload}
                  />
                  Upload Video <BsUpload className="w-5 h-5 text-primary-500" />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* <DynamicForm /> */}
      </div>

      {/* COURSE DESCRIPTION */}
      <div className="space-y-2.5">
        <h6>Course Description</h6>

        <RTE value={description} setValue={setDescription} />
      </div>

      {/* DYNAMIC FORM => COURSE DETAILS */}

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* What You Will Teach */}
            <DynamicFormSection
              title="What you will teach in this course"
              fields={whatYouWillTeachFields}
              fieldName="whatYouWillTeach"
              appendField={appendTeachField}
              placeholder="What you will teach in this course..."
              formControl={form.control}
            />

            {/* Target Audience */}
            <DynamicFormSection
              title="Target Audience"
              fields={targetAudienceFields}
              fieldName="targetAudience"
              appendField={appendAudienceField}
              placeholder="Who this course is for..."
              formControl={form.control}
            />

            {/* Course Requirements */}
            <DynamicFormSection
              title="Course Requirements"
              fields={courseRequirementFields}
              fieldName="courseRequirements"
              appendField={appendCourseRequirementField}
              placeholder="What is your course requirement..."
              formControl={form.control}
            />

            <div className="md:flex-between max-sm:*:w-full space-y-3">
              <Button type="button" variant="outline">
                Previous
              </Button>
              <SubmitBtn>Save & Next</SubmitBtn>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CourseAdvanceInfoForm;

interface FormSectionProps {
  title: string;
  fields: any[];
  fieldName: string;
  appendField: (field: { value: string; placeholder: string }) => void;
  placeholder: string;
  formControl: any;
}

function DynamicFormSection({
  title,
  fields,
  fieldName,
  appendField,
  placeholder,
  formControl,
}: FormSectionProps) {
  return (
    <div className="space-y-4">
      <FormLabel className="flex justify-between items-center font-bold">
        {title && "Advance Information"} ({fields.length}/8)
        <Button
          type="button"
          variant="transparentPrimary"
          size="sm"
          disabled={fields.length === 8}
          onClick={() =>
            fields.length < 8 && appendField({ value: "", placeholder })
          }
        >
          + Add new
        </Button>
      </FormLabel>
      <div className="space-y-4">
        {fields.map((fieldItem, index) => (
          <FormField
            control={formControl}
            key={fieldItem.id}
            name={`${fieldName}.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel>{index < 9 && "0" + (index + 1)}</FormLabel>
                    <Input
                      {...field}
                      className="rounded-none"
                      placeholder={fieldItem.placeholder}
                    />
                  </>
                </FormControl>
                <FormMessage className="text-error-500" />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
