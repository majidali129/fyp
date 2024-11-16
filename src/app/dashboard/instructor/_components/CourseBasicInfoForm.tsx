"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectOption from "./Select";
import {
  courseCategories,
  courseDurations,
  courseFormats,
  courseLanguages,
  courseLevels,
  coursePricingTypes,
  subtitleLanguages,
} from "../../_lib/filters-data";
import SubmitBtn from "@/components/SubmitBtn";
import { courseBasicInfoSchema } from "@/schemas/create-course-schemas";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { usePathname, useRouter } from "next/navigation";

type BasicInfoType = z.infer<typeof courseBasicInfoSchema>;

const defaultValues: BasicInfoType = {
  title: "",
  subTitle: "",
  category: "",
  subCategory: "",
  topic: "",
  pricingType: "",
  price: 0,
  discount: 0,
  enrollmentLimit: 0,
  format: "",
  level: "",
  duration: "",
  language: "",
  subtitleLanguage: "",
};

const CourseBasicInfoForm = ({ title }: { title?: string }) => {
  const { setMetadata } = useNewCourseProvider();
  const form = useForm<z.infer<typeof courseBasicInfoSchema>>({
    resolver: zodResolver(courseBasicInfoSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const router = useRouter();
  const path = usePathname();

  const onSubmit = (data: BasicInfoType) => {
    const result = courseBasicInfoSchema.safeParse(data);
    if (result.success) {
      setMetadata(result.data);
      handleFormReset();
      handleMoveNext()
    }
  };

  function handleFormReset() {
    form.reset(defaultValues, {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
    });
  }

  function handleMoveNext() {
    router.push(`${path}/advance-information`);
  }
  return (
    <section className="*:px-4 lg:*:px-7 space-y-5">
      {/* header */}
      <div className="md:flex-between space-y-3 py-4 border-b border-b-gray-100">
        <h4>{!title && "Basic Information"}</h4>
        <div className="md:space-x-2 max-sm:flex-end">
          <Button size="sm" variant="secondaryPrimary">
            Save
          </Button>
          <Button size="sm" variant="transparentPrimary">
            Save & Preview
          </Button>
        </div>
      </div>

      <div className="pt-2 pb-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <TextInput
              name="title"
              label="Title"
              control={form.control}
              placeholder="Your couser title"
            />
            <TextInput
              name="subTitle"
              label="Subtitle"
              control={form.control}
              placeholder="Your couser subtitle "
            />
            <div className="grid lg:grid-cols-2 gap-4 *:w-full lg:py-2">
              <SelectOption
                label="Course Category"
                name="category"
                control={form.control}
                selectItems={courseCategories}
                placeholder="Select..."
                className="ring-gray-100"
              />
              <SelectOption
                label="Course Sub-category"
                name="subCategory"
                control={form.control}
                selectItems={courseCategories}
                placeholder="Select..."
                className="ring-gray-100"
              />
            </div>
            <TextInput
              name="topic"
              label="Course Topic"
              control={form.control}
              placeholder="What is primary thought in your course?"
            />
            <TextInput
              name="price"
              label="Price"
              control={form.control}
              placeholder="Enter price"
              type="number"
            />
            <TextInput
              name="discount"
              label="Discount"
              control={form.control}
              placeholder="Enter course discount..."
              type="number"
            />
            <TextInput
              name="enrollmentLimit"
              label="Enrollment Limit"
              control={form.control}
              placeholder="Enter possible enrollment limit"
              type="number"
            />
            <SelectOption
              label="Format"
              name="format"
              control={form.control}
              selectItems={courseFormats}
              placeholder="Select a format"
              className="ring-gray-100"
            />
            <SelectOption
              label="Pricing Type"
              name="pricingType"
              control={form.control}
              selectItems={coursePricingTypes}
              placeholder="Select pricing type"
              className="ring-gray-100"
            />
            <div className="grid lg:grid-cols-4 gap-4 *:w-full lg:py-2">
              <SelectOption
                label="Course Language"
                name="language"
                control={form.control}
                selectItems={courseLanguages}
                placeholder="Select..."
                className="ring-gray-100"
              />
              <SelectOption
                label="Subtitle Language (Optional)"
                name="subtitleLanguage"
                control={form.control}
                selectItems={subtitleLanguages}
                placeholder="Select..."
                className="ring-gray-100"
              />
              <SelectOption
                label="Course Level"
                name="level"
                control={form.control}
                selectItems={courseLevels}
                placeholder="Select..."
                className="ring-gray-100"
              />
              <SelectOption
                label="Duration"
                name="duration"
                control={form.control}
                selectItems={courseDurations}
                placeholder="Select..."
                className="ring-gray-100"
              />
            </div>

            <div className="flex-between max-lg:py-2">
              <Button
                variant="outline"
                className="text-gray-900"
                type="reset"
                onClick={handleFormReset}
              >
                Cancel
              </Button>
              <SubmitBtn>Save & Next</SubmitBtn>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CourseBasicInfoForm;
