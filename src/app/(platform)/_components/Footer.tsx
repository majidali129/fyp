import NextPrevLink from "@/components/NextPrevLink"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../../public/images/logoLight.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="w-full  bg-gray-900">
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
  )
}

export default Footer