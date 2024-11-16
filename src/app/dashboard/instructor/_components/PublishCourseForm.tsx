"use client"

import { Button } from "@/components/ui/button";
import img from "../../../../../public/images/instructor2.png";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitBtn from "@/components/SubmitBtn";
import TextArea from "@/components/TextArea";
import { ChangeEvent, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { usePathname, useRouter } from "next/navigation";
// import { Textarea } from "@/components/ui/textarea";

const MessageSchema = z.object({
  welcomeMessage: z.string().min(10, {
    message: "Welcome message can not be less than 10 characters.",
  }),
  congratulationMessage: z.string().min(10, {
    message: "Welcome message can not be less than 10 characters.",
  }),
});
type MessageType = z.infer<typeof MessageSchema>;

const defaultValues = {
  welcomeMessage: "",
  congratulationMessage: "",
};

const PublishCourseForm = ({ title }: { title?: string }) => {
  const [instructors, setInstructors] = useState<Array<string> | []>([]);
  const [instructorQuery, setInstructorQuery] = useState<string>("");

  const router = useRouter()
  const currentPath = usePathname()
  const newPath = currentPath.split('/')?.slice(0,-1).join('/') + '/preview-course'

  // READ data from context
  const {sections, welcomeMessage, congratulationMessage ,setMetadata} = useNewCourseProvider()
  console.log({sections, welcomeMessage, congratulationMessage});


  // TODO: WE'LL TRIGGER API CALL AS USER WILL ENTER SOMETHING TO SEARCH FIELD;

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleInstructorSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInstructorQuery(e.target.value);
    console.log(e.target.value, instructorQuery);
    // pass e.target.value to fetch for search
  };

  const onSubmit = (data: MessageType) => {
    console.log(data);
    setMetadata({...data})
    handleMoveNext()
  };

  function handleMoveNext() {
    router.push('/preview-course');
  }

  return (
    <section className=" *:px-4 lg:*:px-7 space-y-5">
      {/* header */}
      <div className="md:flex-between space-y-3 py-4 border-b border-b-gray-100">
        <h4>{!title && "Publish Course"}</h4>
        <div className="md:space-x-2 max-sm:flex-end">
          <Button size="sm" variant="secondaryPrimary">
            Save
          </Button>
          <Button size="sm" variant="transparentPrimary">
            Save & Preview
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h6>Message</h6>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-5">
              <TextArea
                control={form.control}
                name="welcomeMessage"
                label="Welcome Message"
                placeholder="Enter course starting message here..."
              />
              <TextArea
                control={form.control}
                name="congratulationMessage"
                label="Congratulation Message"
                placeholder="Enter your course completed message here..."
              />
            </div>

            <div className="space-y-3 mt-7">
              <h6>Add Instructors (02)</h6>

              <div className="lg:w-1/2 ">
                <div className="bg-white px-2.5 grid grid-cols-[25px_auto] items-center rounded-sm border border-gray-100">
                  <GoSearch className="w-5 h-5" />
                  <Input
                    type="text"
                    className="ring-0 border-none !bg-transparent outline-none py-1.5"
                    value={instructorQuery}
                    onChange={handleInstructorSearch}
                    placeholder="Search by username"
                  />
                </div>
              </div>

              {/* SEARCH RESULTS & visible only if results found for search */}
              <ul className=" border border-gray-100  p-2 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-52 overflow-y-scroll list-scroll">
                <li className="p-2.5 grid grid-cols-[22%_auto] gap-2 items-center rounded-sm shadow border border-gray-50 cursor-pointer">
                  <Image
                    src={img}
                    width={50}
                    height={50}
                    priority
                    alt="instructor profile photo"
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <strong>Majid Ali</strong>
                    <span className="text-gray-600 line-clamp-1">
                      Web-Developer
                    </span>
                  </div>
                </li>
              </ul>

              {/* SELECTED INSTRUCTORS FOR THE COURSE */}
              <ul className="py-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-6 min-h-52 ">
                <InstructorsCard />
                <InstructorsCard />
              </ul>
            </div>

            <div className="md:flex-between max-sm:*:w-full py-2 space-y-3">
              <Button type="button" variant="outline">
                Previous
              </Button>
              <SubmitBtn>Submit For Review</SubmitBtn>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default PublishCourseForm;

function InstructorsCard({ instructor }: { instructor?: any }) {
  return (
    <li className="bg-gray-100/70 p-2.5 grid grid-cols-[22%_auto] gap-2 items-center rounded-sm h-fit relative shadow-lg">
      <Image
        src={img}
        width={50}
        height={50}
        priority
        alt="instructor profile photo"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <strong>Majid Ali</strong>
        <span className="text-gray-600 line-clamp-1">Web-Developer</span>
      </div>

      <BsXLg className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-gray-900 cursor-pointer hover:scale-105 " />
    </li>
  );
}
