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
import g1 from "../../../../public/images/gallery1.png";
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

const AboutUsPage = () => {
  return (
    <section className="w-full pb-14 md:pb-0 *:py-14">
      {/* WHO WE ARE */}
      <div className="  border-b border-gray-100">
        <div className="container max-w-6xl ">
          <div className="grid md:grid-cols-[44%_auto] place-items-center lg:gap-10 gap-5">
            <div className="space-y-2.5 md:space-y-3 ">
              <h1 className="text-gray-100">2007 - 2024</h1>
              <h2 className="">We share knowledge with the world</h2>
              <p className="text-gray-600">
              We are an innovative e-learning platform dedicated to empowering learners and educators. Our mission is to provide accessible, high-quality learning experiences across various fields. Whether you&apos;re a student looking to enhance your skills, an instructor eager to share knowledge, or an organization in need of corporate training, our platform offers tailored solutions for all.
              </p>
            </div>
            <div className="relative">
              <Image
                src={
                  "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb"
                }
                alt="about us section phote"
                width={400}
                height={600}
                priority
                className="object-cover md:max-lg:object-[10%_center] h-[350px] lg:!h-[400px] md:max-w-[700px] w-full md:rounded-[2px]"
              />
              <div className="bg-white absolute h-full w-5 right-24 md:right-20 lg:right-[14.5rem] top-0"></div>
            </div>
          </div>
        </div>
      </div>
      {/* TRUSTED COMPANIES */}
      <div>
        <div className="container max-w-6xl ">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-14">
            <div className="space-y-2.5 flex flex-col justify-center">
              <h3>We Just keep growing with 6.3k companies</h3>
              <p>
              Our platform is trusted by industry leaders and top organizations to train their workforce and build skills. Some of the renowned companies we collaborate with include:
              </p>
            </div>
            <div className="grid *:shadow-[rgba(88,88,92,0.1)0px_7px_29px_0px] *:h-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 *:bg-white  *:flex-center *:rounded">
              <div>
                <Image
                  src={netflix}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={youtube}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={google}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={lenovo}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={slack}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={verizon}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={lexmark}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div>
                <Image
                  src={microsoft}
                  alt="netflix logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="md:!py-12 !pt-0">
        <div className="container max-w-6xl ">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5">
            <div className="flex gap-x-2">
              <FiUsers className="w-7 h-7 text-primary-500 mt-1" />
              <div>
                <h3>{formateNumberInK(3232)}</h3>
                <span>Students</span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <PiCertificateThin className="w-7 h-7 text-secondary-500 mt-1" />
              <div>
                <h3>{formateNumberInK(3232)}</h3>
                <span>Certified Instructors</span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <LiaGlobeEuropeSolid className="w-7 h-7 text-error-500 mt-1" />
              <div>
                <h3>{formateNumberInK(3232)}</h3>
                <span>Country Language</span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <BsPatchCheck className="w-7 h-7 text-success-500 mt-1" />
              <div>
                <h3>{formateNumberInK(3232)}</h3>
                <span>Success Rate</span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <FiLayers className="w-7 h-7 text-warning-500 mt-1" />
              <div>
                <h3>{formateNumberInK(3232)}</h3>
                <span>Trusted Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="bg-primary-100 lg:!pb-24 ">
        <div className="container max-w-6xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-14 lg:gap-y-0 ">
            <div className="relative flex justify-center md:justify-start md:max-lg:ps-32 items-start">
              <Image
                src={
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhbXN8ZW58MHx8MHx8fDA%3D"
                }
                alt="mission image"
                priority
                width={100}
                height={100}
                className=" w-[400px] rounded-[3px]"
              />
              <Image
                src={
                  "https://images.unsplash.com/photo-1552960504-34e1e1be3f53?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHx0ZWFtc3xlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="mission image"
                priority
                width={100}
                height={100}
                className="object-cover w-[230px] absolute right-3 -bottom-11 rounded-[3px]  hidden md:block"
              />
            </div>
            <div className="md:space-y-4 space-y-2.5 py-4">
              <p className="text-primary-500">OUR ONE BILLION MISSION</p>
              <h2>Our one billion mission sounds bold, we agree.</h2>
              <p>
              Our future mission is to revolutionize online education by integrating the latest technologies, personalized learning experiences, and cutting-edge content delivery. We aim to expand our global reach and collaborate with leading experts to provide top-tier educational resources for everyone, anywhere. Our focus will remain on inclusivity, adaptability, and innovation to meet the ever-changing needs of learners worldwide.
              </p>
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
                    <Image src={g1} alt="gallery 1" priority className="w-full h-[180px] rounded-[3px] col-start-2 col-span-4 object-cover "/>
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

export default AboutUsPage;


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