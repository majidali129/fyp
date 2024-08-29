'use client'
import Image from "next/image";
import logo from "../../public/images/logoLight.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import NextPrevLink from "./NextPrevLink";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  console.log(pathname)
  if(pathname ==='/') return (
    <>
      <footer className="w-full lg:absolute lg:top-[3850px] 2xl:top-[4080px] bg-gray-900">
      {/* <footer className="w-full  bg-gray-900"> */}
        <div className="tw-container !py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr]  lg:gap-2 gap-5 md:gap-10">
            <div className="*:text-gray-white space-y-4">
              <h2>Start learning with 67.1k students around the world.</h2>
              <div className="lg:flex-start flex-center gap-3">
                <Button>Join The Family</Button>
                <Button variant={"ghost"} className="bg-gray-800">
                  Browse All Courses
                </Button>
              </div>
            </div>
            <div className="md:flex-center md:gap-10 flex flex-wrap items-center justify-center gap-5 ">
              <div className="flex-center flex-col">
                <h3 className="text-white">6.3k</h3>
                <span className="text-gray-300">Online Courses</span>
              </div>
              <div className="flex-center flex-col">
                <h3 className="text-white">6.3k</h3>
                <span className="text-gray-300">Online Courses</span>
              </div>
              <div className="flex-center flex-col">
                <h3 className="text-white">6.3k</h3>
                <span className="text-gray-300">Online Courses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-y-gray-800">
          <div className="tw-container !py-16 ">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr]  lg:gap-2 gap-10 md:gap-10">

              <div className="*:text-gray-white  space-y-6">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    height={50}
                    width={130}
                    alt="lms-logo"
                    priority
                    className="object-cover"
                  />
                </Link>{" "}
                <p className="text-gray-500">Aliquam rhoncus ligula est, non pulvinar elit
                convallis nec. Donec mattis odio at.</p>
                <div className="flex-center md:flex-start gap-2 md:gap-5">
                    <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaFacebookF className="w-5 h-5"/></Button>
                    <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaInstagram className="w-5 h-5"/></Button>
                    <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><GrLinkedinOption className="w-5 h-5"/></Button>
                    <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaTwitter className="w-5 h-5"/></Button>
                    <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaYoutube className="w-5 h-5"/></Button>
                </div>
              </div>

              <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  gap-5 max-md:px-2">
                <div className="space-y-5  ">
                    <h4 className="text-gray-white">TOP 4 CATEGORY</h4>
                    <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                    <NextPrevLink to="/" className="lg:px-0">Development</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Finance & Accounting</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Design</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Business</NextPrevLink>
                    </div>
                </div>
                <div className="space-y-5  ">
                    <h4 className="text-gray-white ">QUICK LINKS</h4>
                    <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                    <NextPrevLink to="/" className="lg:px-0">About</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Become Instructor</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Contact</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Career</NextPrevLink>
                    </div>
                </div>
                <div className="space-y-5 ">
                    <h4 className="text-gray-white text-start">Support</h4>
                    <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                    <NextPrevLink to="/" className="lg:px-0">Help Center</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">FAQs</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Terms & Conditions</NextPrevLink>
                    <NextPrevLink to="/" className="lg:px-0">Privacy Policy</NextPrevLink>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <p className=" max-sm:max-w-xs w-full max-sm:text-center mx-auto md:flex-center py-4 text-gray-500">
            &copy; 2024 - Learnist. Developed by <span className="text-gray-white ms-1 py-0.5">Majid Ali</span>. All rights reserved.
        </p>
      </footer>
    </>
  );

  return  <footer className="w-full  bg-gray-900">
    <div className="tw-container !py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr]  lg:gap-2 gap-5 md:gap-10">
        <div className="*:text-gray-white space-y-4">
          <h2>Start learning with 67.1k students around the world.</h2>
          <div className="lg:flex-start flex-center gap-3">
            <Button>Join The Family</Button>
            <Button variant={"ghost"} className="bg-gray-800">
              Browse All Courses
            </Button>
          </div>
        </div>
        <div className="md:flex-center md:gap-10 flex flex-wrap items-center justify-center gap-5 ">
          <div className="flex-center flex-col">
            <h3 className="text-white">6.3k</h3>
            <span className="text-gray-300">Online Courses</span>
          </div>
          <div className="flex-center flex-col">
            <h3 className="text-white">6.3k</h3>
            <span className="text-gray-300">Online Courses</span>
          </div>
          <div className="flex-center flex-col">
            <h3 className="text-white">6.3k</h3>
            <span className="text-gray-300">Online Courses</span>
          </div>
        </div>
      </div>
    </div>

    <div className="border-y border-y-gray-800">
      <div className="tw-container !py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr]  lg:gap-2 gap-10 md:gap-10">

          <div className="*:text-gray-white  space-y-6">
            <Link href={"/"}>
              <Image
                src={logo}
                height={50}
                width={130}
                alt="lms-logo"
                priority
                className="object-cover"
              />
            </Link>{" "}
            <p className="text-gray-500">Aliquam rhoncus ligula est, non pulvinar elit
            convallis nec. Donec mattis odio at.</p>
            <div className="flex-center md:flex-start gap-2 md:gap-5">
                <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaFacebookF className="w-5 h-5"/></Button>
                <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaInstagram className="w-5 h-5"/></Button>
                <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><GrLinkedinOption className="w-5 h-5"/></Button>
                <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaTwitter className="w-5 h-5"/></Button>
                <Button size={'icon'} className="bg-[#363B47] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500"><FaYoutube className="w-5 h-5"/></Button>
            </div>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  gap-5 max-md:px-2">
            <div className="space-y-5  ">
                <h4 className="text-gray-white">TOP 4 CATEGORY</h4>
                <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                <NextPrevLink to="/" className="lg:px-0">Development</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Finance & Accounting</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Design</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Business</NextPrevLink>
                </div>
            </div>
            <div className="space-y-5  ">
                <h4 className="text-gray-white ">QUICK LINKS</h4>
                <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                <NextPrevLink to="/" className="lg:px-0">About</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Become Instructor</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Contact</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Career</NextPrevLink>
                </div>
            </div>
            <div className="space-y-5 ">
                <h4 className="text-gray-white text-start">Support</h4>
                <div className="flex flex-col  *:text-gray-500 hover:*:text-gray-white  ">

                <NextPrevLink to="/" className="lg:px-0">Help Center</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">FAQs</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Terms & Conditions</NextPrevLink>
                <NextPrevLink to="/" className="lg:px-0">Privacy Policy</NextPrevLink>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <p className=" max-sm:max-w-xs w-full max-sm:text-center mx-auto md:flex-center py-4 text-gray-500">
        &copy; 2024 - Learnist. Developed by <span className="text-gray-white ms-1 py-0.5">Majid Ali</span>. All rights reserved.
    </p>
  </footer>
};

export default Footer;
