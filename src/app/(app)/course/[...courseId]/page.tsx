import PathBreadCrumb from "@/components/BreadCrumb";
import { formateNumber } from "@/helpers";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { BsPatchExclamationFill } from "react-icons/bs";
import { MdLanguage, MdOutlinePlayCircle } from "react-icons/md";
import { BiSolidCaptions } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import CourseInstructorInfoCard from "@/components/CourseInstructorInfoCard";
import { FaStarHalfAlt } from "react-icons/fa";
import CourseRatingStats from "@/components/CourseRatingStats";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseCard from "@/components/CourseCard";
import CourseFeedback from "@/components/CourseFeedback";

const CourseDetailsPage = ({
  params
}: {
  params: { courseId: string | string[] };
}) => {
  console.log(params);
  return (
    <>
      <section className="w-full py-4 pb-5 bg-gray-900 ">
        <div className="tw-container ">
          <div className="grid grid-cols-[70%_1fr] ">
            <div className="space-y-3.5">
              <PathBreadCrumb />
              <h2 className="text-gray-white">
                Complete Website Responsive Design: from Figma to Webflow to
                Website Design
              </h2>

              <p className="text-gray-400">Brief Summary</p>
              <div className="flex-start ">
                <b className="text-yellow-600">4.5</b>
                <div className="flex-start !gap-x-1">
                  <FaStar className="text-yellow-600 w-4 h-4" />
                  <FaStar className="text-yellow-600 w-4 h-4" />
                  <FaStar className="text-yellow-600 w-4 h-4" />
                  <FaStar className="text-yellow-600 w-4 h-4" />
                  <FaStar className="text-yellow-600 w-4 h-4" />
                </div>
                <span className="text-secondary-400 underline">
                  (3 ratings)
                </span>
                <span className="text-gray-500">
                  {formateNumber(23232)} students
                </span>
              </div>

              <p className="text-gray-white flex-start">
                Created By:{" "}
                <ul className="space-x-1.5 *:underline *:text-secondary-400 *:tracking-wide">
                  <Link href={"#"}>Majid Ali</Link>,
                  <Link href={"#"}>Majid Ali</Link>,
                  <Link href={"#"}>Majid Ali</Link>
                </ul>
              </p>

              <div className="flex-start !gap-x-5">
                <div className="flex-start !gap-x-2">
                  <BsPatchExclamationFill className="w-4 h-4 text-gray-white" />
                  <p className="text-gray-white">Last updated {"04/2021"}</p>
                </div>
                <div className="flex-start !gap-x-2">
                  <MdLanguage className="w-4 h-4 text-gray-white" />
                  <p className="text-gray-white">English</p>
                </div>
                <div className="flex-start !gap-x-2">
                  <BiSolidCaptions className="w-4 h-4 text-gray-white" />
                  <p className="text-gray-white">English [auto] </p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <section className="py-5 mb-5">
        <div className="tw-container space-y-6">
          <div className="w-[70%] space-y-9 *:space-y-5">
            {/* description */}
            <div>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
                nihil distinctio atque quidem eaque a adipisci quaerat enim
                quisquam. Explicabo quisquam aut fugiat! Ducimus consequuntur
                asperiores similique, natus voluptates magni.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                eaque accusantium consequatur totam consectetur ea sapiente quam
                fuga cum praesentium animi officiis iusto et culpa sed nulla,
                eveniet possimus. Minus eius sapiente necessitatibus sunt
                distinctio, alias autem numquam esse voluptatem voluptate.
                Labore ipsam vero alias dicta nesciunt saepe officiis excepturi?
              </p>
            </div>

            {/* what user'll learn */}
            <div className="p-5 space-y-3.5 bg-success-100 rounded-sm">
              <h3>What you&apos;ll learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 space-y-2.5">
                <li className="flex-start !items-start !gap-x-3.5">
                  <IoMdCheckmarkCircle className="w-6 h-6 text-success-600" />
                  <span>
                    Basics of JavaScript (Data types, Loops, Arrays, Objects,
                    Functions, etc)
                  </span>
                </li>
                <li className="flex-start !items-start !gap-x-3.5">
                  <IoMdCheckmarkCircle className="w-6 h-6 text-success-600" />
                  <span>
                    Basics of JavaScript (Data types, Loops, Arrays, Objects,
                    Functions, etc)
                  </span>
                </li>
                <li className="flex-start !items-start !gap-x-3.5">
                  <IoMdCheckmarkCircle className="w-6 h-6 text-success-600" />
                  <span>
                    Basics of JavaScript (Data types, Loops, Arrays, Objects,
                    Functions, etc)
                  </span>
                </li>
                <li className="flex-start !items-start !gap-x-3.5">
                  <IoMdCheckmarkCircle className="w-6 h-6 text-success-600" />
                  <span>
                    Basics of JavaScript (Data types, Loops, Arrays, Objects,
                    Functions, etc)
                  </span>
                </li>
              </ul>
            </div>
            {/* who this course is for */}
            <div>
              <h3>Who this course is for:</h3>
              <ul className="space-y-1.5">
                <li className="flex-start">
                  <IoArrowForwardSharp className="text-primary-500 w-4 h-4" />A
                  basic understanding of HTML and CSS
                </li>
                <li className="flex-start">
                  <IoArrowForwardSharp className="text-primary-500 w-4 h-4" />A
                  basic understanding of HTML and CSS
                </li>
              </ul>
            </div>
            {/** requirements */}
            <div>
              <h3>Course Requirements</h3>
              <ul className="space-y-1.5 *:px-1.5">
                <li className="list-disc list-inside">
                  A basic understanding of HTML and CSS
                </li>
                <li className="list-disc list-inside">
                  A basic understanding version control
                </li>
              </ul>
            </div>
            {/* Instructors */}
            <div className="!space-y-5">
              <h3>
                Course Instructors{" "}
                <span className="md:text-xl text-gray-900">({"03"})</span>
              </h3>
              <CourseInstructorInfoCard />
            </div>
            {/* Curriculum */}
            <div className="!space-y-5">
              <div className="flex-between">
                <h3>Curriculum</h3>
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
              <CourseCurriculum  curriculum={[]} isWatching={false}/>
            </div>
            {/* Course Ratings */}
            <div>
              <h3>Course Rating </h3>
              <div className="grid md:grid-cols-[11rem_1fr] h-[11rem] ">
                <div className="flex-center flex-col gap-y-2 border border-gray-100">
                  <h1>4.8</h1>
                  <div className="flex-center !gap-x-1">
                    <FaStar className="text-warning-500 w-4 h-4" />
                    <FaStar className="text-warning-500 w-4 h-4" />
                    <FaStar className="text-warning-500 w-4 h-4" />
                    <FaStar className="text-warning-500 w-4 h-4" />
                    <FaStarHalfAlt className="text-warning-500 w-4 h-4" />
                  </div>
                  <p className="text-gray-900 font-medium">Course Rating</p>
                </div>
                <div className="space-y-3.5">
                  <CourseRatingStats />
                  <CourseRatingStats />
                  <CourseRatingStats />
                  <CourseRatingStats />
                  <CourseRatingStats />
                </div>
              </div>
            </div>
            {/* Feedback */}
            <div>
              <h3>Students Feedback</h3>
              <CourseFeedback />
            </div>

          </div>
            {/* Related Courses */}
            <div className="space-y-5">
              <h3>Related Courses</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </ul>
            </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailsPage;
