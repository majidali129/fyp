import { Button } from "@/components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import instructor from "../../../../../public/images/instructor2.png";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaStar,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { PiUsers } from "react-icons/pi";
import { GrLinkedinOption } from "react-icons/gr";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { formateNumber } from "@/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/CourseCard";
import { FeedBackCard } from "@/components/CourseFeedback";

const InstructorProfilePage = ({
  params,
}: {
  params: { username: string };
}) => {
  console.log(params);

  // TODO: fetch and render instructor's profile from the database like
  // instructor bio, courses, reviews, etc.

  return (
    <section className="">
      <div className="w-full bg-primary-100 min-h-52"></div>
      {/* <div className=" min-h-screen"> */}
      <div className=" min-h-[80vh] h-full px-3 sm:px-6 lg:px-0">
        <div className="container !px-0 md:max-w-6xl bg-white mx-auto rounded relative -top-36  ">
          <div className="w-full *:px-7 space-y-8">
            {/* INSTRUCTOR INFO CARD */}
            <div className="py-7 flex max-md:flex-col max-md:gap-y-3 md:flex-between border border-primary-200">
              <div className="flex-start !items-start lg:!items-center !gap-x-3.5  w-full">
                <Image
                  src={instructor}
                  alt="instructor"
                  priority
                  height={80}
                  width={80}
                  className="rounded-full md:w-[110px] md:h-[110px] lg:w-[145px] lg:h-[145px]"
                />
                <div className="md:flex-between w-full max-md:space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3>Majid Ali</h3>
                      <span className="text-gray-500 text-sm">
                        Frontend | Backend Engineer
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-y-1.5 lg:gap-2.5">
                      <div className="flex-start !gap-x-2">
                        <FaStar className="text-warning-500 w-4 h-4" />
                        <p>
                          4.6{" "}
                          <span className="text-gray-500">
                            ({formateNumber(32323)} Reviews)
                          </span>
                        </p>
                      </div>
                      <div className="flex-start !gap-x-2">
                        <PiUsers className="text-secondary-500 w-5 h-5" />
                        <p>
                          4.6{" "}
                          <span className="text-gray-500">
                            ({formateNumber(3323)} Students)
                          </span>
                        </p>
                      </div>
                      <div className="flex-start !gap-x-2">
                        <MdOutlinePlayCircleFilled className="text-primary-500 w-5 h-5" />
                        <p>
                          4.6{" "}
                          <span className="text-gray-500">
                            ({formateNumber(3323)} Students)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* SOCIAL LINKS */}
                  <div className="space-y-1.5 max-sm:-ml-[6rem]">
                    <Link
                      href="#"
                      className="text-blue-500 flex items-center justify-start max-md:ps-3.5 md:justify-end gap-1.5"
                    >
                      {" "}
                      <TfiWorld /> https://www.majidali.com
                    </Link>
                    <div className="flex-center md:flex-start gap-2 md:gap-5">
                      <Button
                        size={"icon"}
                        className="bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-gray-white hover:shadow-lg hover:shadow-primary-500"
                      >
                        <FaFacebookF className="w-5 h-5" />
                      </Button>
                      <Button
                        size={"icon"}
                        className="bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-gray-white hover:shadow-lg hover:shadow-primary-500"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </Button>
                      <Button
                        size={"icon"}
                        className="bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-gray-white hover:shadow-lg hover:shadow-primary-500"
                      >
                        <GrLinkedinOption className="w-5 h-5" />
                      </Button>
                      <Button
                        size={"icon"}
                        className="bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-gray-white hover:shadow-lg hover:shadow-primary-500"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </Button>
                      <Button
                        size={"icon"}
                        className="bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-gray-white hover:shadow-lg hover:shadow-primary-500"
                      >
                        <FaYoutube className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTRUCTOR BIO & COURSES & REVIEWS */}
            <div className="grid lg:grid-cols-[4fr_8fr] gap-4 max-lg:px-0">
              <div className="p-5 border border-gray-100 space-y-2 h-fit">
                <h4>ABOUT ME</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
                  doloribus incidunt eveniet! Molestiae praesentium aspernatur
                  necessitatibus vel, error dignissimos laudantium illo!
                  Eligendi atque iste minus libero tenetur animi perspiciatis
                  totam.
                </p>
              </div>
              <div>
                <Tabs defaultValue="courses" className="w-full space-y-5">
                  {/* TABS */}
                  <div className="border-b-2 border-b-gray-100">
                    <TabsList className=" -mb-0.5 tablist max-sm:*:w-full  md:!flex-start !w-full z-0 !p-0 h-auto">
                      <TabsTrigger
                        value="courses"
                        className=" border-b-2 border-b-gray-100 px-10 h-full z-30 data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500"
                      >
                        Courses
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className=" border-b-2 border-b-gray-100 px-10 h-full data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500"
                      >
                        Reviews
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  {/* TAB CONTENT */}
                  <div className="">
                    <TabsContent value="courses">
                      <div className="space-y-3.5">
                        <h4>
                          Majid Courses <span className="">(323)</span>
                        </h4>

                        <ul className="grid md:grid-cols-2 gap-4">
                          <CourseCard />
                          <CourseCard />
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <div className="space-y-3.5">
                        <h4>
                          Students Feedback
                        </h4>
                        <ul>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FeedBackCard key={i} />
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorProfilePage;
