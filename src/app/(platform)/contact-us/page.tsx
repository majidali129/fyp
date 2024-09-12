import Image from "next/image";
import netflix from "../../../../public/images/netflix.png";
import youtube from "../../../../public/images/youtube.png";
import google from "../../../../public/images/google.png";
import lenovo from "../../../../public/images/lenovo.png";
import slack from "../../../../public/images/slack.png";
import verizon from "../../../../public/images/verizon.png";
import lexmark from "../../../../public/images/lexmark.png";
import microsoft from "../../../../public/images/microsoft.png";
import { RiTriangleFill } from "react-icons/ri";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import contactImg from "../../../../public/images/contact.png";
import g2 from "../../../../public/images/gallery2.png";
import g3 from "../../../../public/images/gallery3.png";
import g4 from "../../../../public/images/gallery4.png";
import g5 from "../../../../public/images/gallery5.png";
import g6 from "../../../../public/images/gallery6.png";
import g7 from "../../../../public/images/gallery7.png";
import { FiUsers } from "react-icons/fi";
import { PiCertificateThin } from "react-icons/pi";
import { LiaGlobeEuropeSolid } from "react-icons/lia";
import { FiLayers } from "react-icons/fi";
import { BsPatchCheck } from "react-icons/bs";
import { formateNumberInK } from "@/helpers";
import { Button } from "@/components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import { TESTIMONIALS, TestimonialType } from "@/data/testimonials";
import { TfiEmail } from "react-icons/tfi";

const ContactUsPage = () => {
  return (
    <section className="w-full pb-14 md:pb-0 *:py-12">
      {/* CONNECT WITH US */}
      <div className="md:!pb-0">
        <div className="container max-w-6xl ">
          <div className="grid md:grid-cols-[45%_auto] place-items-center lg:gap-10 gap-5">
            <div className="space-y-2.5 md:space-y-3 ">
              <h2 className="">Connect with us</h2>
              <p >
              Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.
              </p>
              <Button >
                <TfiEmail className="w-5 h-5" />
                Copy Email</Button>
            </div>
              <Image
                src={
                  contactImg
                }
                alt="contact us section phote"
                width={400}
                height={600}
                priority
                className="object-cover hidden md:block md:max-lg:object-[10%_center] md:max-w-[700px] w-full md:rounded-[2px]"
              />
          </div>
        </div>
      </div>
      {/* OUR BRANCHES */}
      <div className="">
        <div className="container max-w-6xl">
          <div className="space-y-4 md:space-y-9">
            <div className="space-y-4 md:space-y-4 text-center">
              <h2 className="">Our branches all over the world</h2>
              <p className="md:w-1/2 mx-auto">
              Want to chat? We’d love to hear from you! Get in touch with our Customer Success.
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 *:w-full">
                <div className="relative">
                  <Image width={400} height={100} src={'https://images.pexels.com/photos/36789/shanghai-oriental-pearl-tv-tower-night-view-people-s-republic-of-china.jpg?auto=compress&cs=tinysrgb'} className="object-cover h-full" priority alt="location1 image" />
                  <div className="absolute  flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                    <p className="text-primary-500 text-[1rem]">MAIN BRANCH</p>
                    <h6>Pakistan, Pakistan</h6>
                    <span className="text-gray-500">Lorem, ipsum dolor. ipsum dolor.</span>

                  </div>
                </div>
                <div className="relative">
                  <Image width={400} height={100} src={'https://images.pexels.com/photos/1546836/pexels-photo-1546836.jpeg?auto=compress&cs=tinysrgb'} className="object-cover h-full" priority alt="location1 image" />
                  <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                    <h6>Pakistan, Pakistan</h6>
                    <span className="text-gray-500">Lorem, ipsum dolor. Lorem, ipsum dolor.</span>

                  </div>
                </div>
                <div className="relative">
                  <Image width={400} height={100} src={'https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg?auto=compress&cs=tinysrgb'} className="object-cover" priority alt="location1 image" />
                  <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                    <h6>Pakistan, Pakistan</h6>
                    <span className="text-gray-500">Lorem, ipsum dolor. Lorem, ipsum dolor.</span>

                  </div>
                </div>
                <div className="relative">
                  <Image width={400} height={100} src={'https://images.pexels.com/photos/3032330/pexels-photo-3032330.jpeg?auto=compress&cs=tinysrgb'} className="object-cover" priority alt="location1 image" />
                  <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                    <h6>Pakistan, Pakistan</h6>
                    <span className="text-gray-500">Lorem, ipsum dolor. Lorem, ipsum dolor.</span>

                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>


      {/* GALARY */}
      <div className="bg-gray-50">
        <div className="container max-w-6xl ">
          <div className="grid lg:grid-cols-[30%_auto] place-items-center gap-5 max-lg:gap-y-8">
            <div className="space-y-2.5 md:space-y-3 ">
              <p className="text-primary-500">OUR GALLERY</p>
              <h2 className="tracking-normal">
                We&apos;ve been here almost 17 years
              </h2>
              <p className="text-gray-600">
              Our team is composed of passionate educators, experienced developers, and dedicated support staff. Together, we work towards creating an engaging, user-friendly platform that fosters growth and learning.
              </p>
              <Button>
                Join Our Team <LuMoveRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full h-full space-y-5 hidden md:block">
                <div className="grid grid-cols-12 gap-5 place-items-end  ">
                    <Image src={g2} alt="gallery 2"  priority className="w-full h-[230px] col-span-4  object-cover"/>
                    <Image src={g3} alt="gallery 3"  priority className="w-full h-[150px] object-cover rounded-[2px] col-span-2"/>
                </div>
                <div className="grid grid-cols-12 gap-5 place-items-start  ">
                    <Image src={g4} alt="gallery 4" priority className="w-full h-[210px] col-span-3 object-cover "/>
                    <Image src={g5} alt="gallery 5"  priority className="w-full h-[285px] col-span-5  object-cover"/>
                    <div className="col-span-4 grid-rows-2 grid-cols-4">
                    <Image src={g6} alt="gallery 6"  priority className="w-full object-cover"/>
                    <Image src={g7} alt="gallery 7"  priority className=" object-cover rounded-[2px] col-span-2 "/>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="  border-b border-gray-100">
        <div className="container max-w-6xl ">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-4">
            {
              TESTIMONIALS.map(review => <TestimonialCard key={review.username} review={review}/>)
            }

          </ul>
        </div>
      </div>


    </section>
  );
};

export default ContactUsPage;


function TestimonialCard ({review:{review,username,company,position}}: {review: TestimonialType}) {
  return (
     <div className="space-y-6">
      <div className="p-6 space-y-1.5 bg-gray-50 relative">
      <div className="">
        <RiDoubleQuotesL className="w-6 h-6 text-primary-500" />
      </div>
        <p className="px-1.5 text-center text-gray-900 text-[1.02rem]">{review}</p>
        <div className="flex justify-end">
        <RiDoubleQuotesR className="w-6 h-6 text-primary-500" />
        </div>
      <RiTriangleFill className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 rotate-180 text-secondary-50 h-4 w-4" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h6>{username}</h6>
        <p className="text-gray-600">{position} of <span className="text-secondary-500">{company}</span></p>
      </div>
     </div>
  )
}