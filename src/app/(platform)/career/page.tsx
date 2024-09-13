import { Button } from "@/components/ui/button";
import contactImg from "../../../../public/images/contact.png";
import forkkinfe from "../../../../public/icons/forkknife.svg";
import chart from "../../../../public/icons/hchart.svg";
import armchair from "../../../../public/icons/armchair.svg";
import gift from "../../../../public/icons/gift.svg";
import creditcard from "../../../../public/icons/creditcard.svg";
import handshake from "../../../../public/icons/handshake.svg";
import trophy from "../../../../public/icons/trophy.svg";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { BsFillClipboard2DataFill } from "react-icons/bs";

interface Posiiton {
    title: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract';
    deadLine: string;
    vacancy: string
}

import Image from "next/image";
import Gallery from "../_components/Gallery";
import Companies from "../_components/Companies";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
const CareersPage = () => {

    // TODO: fetch data for open positions by admin
  return (
    <section className="w-full pb-14 md:pb-0 *:py-12">
      {/* CONNECT WITH US */}
      <div className="lg:!pb-0">
        <div className="container max-w-6xl ">
          <div className="grid md:grid-cols-[45%_auto] place-items-center lg:gap-10 gap-5">
            <div className="space-y-2.5 md:space-y-3 ">
              <h2 className="">Join the most incredible & creative team</h2>
              <p>
                Want to chat? We’d love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>
              <Button>View Open Positions</Button>
            </div>
            <Image
              src={contactImg}
              alt="contact us section phote"
              width={400}
              height={600}
              priority
              className="object-cover hidden md:block md:max-lg:object-[10%_center] md:max-w-[700px] w-full md:rounded-[2px]"
            />
          </div>
        </div>
      </div>

      {/* WHY JOIN US */}
      <div className="bg-gray-50">
        <div className="container max-w-6xl ">
          <div className="grid lg:grid-cols-2  lg:gap-20 gap-12">
            <div className="relative">
              <Image
                src={
                  "https://images.pexels.com/photos/5716003/pexels-photo-5716003.jpeg?auto=compress&cs=tinysrgb"
                }
                alt="about us section phote"
                width={400}
                height={100}
                priority
                className="object-cover md:max-lg:object-[10%_center] !h-full md:max-w-[700px] w-full rounded-[2px]"
              />
              <div className="bg-white absolute h-full w-5 right-24 md:right-32  top-0 hidden lg:block"></div>
              <div className="bg-white absolute h-full w-5 left-24 md:left-32  top-0 hidden lg:block"></div>
            </div>
            <div className="space-y-5 md:space-y-4 ">
              <h2 className="">Why you will join our team</h2>
              <p className="text-gray-600">
                We are an innovative e-learning platform dedicated to empowering
                learners and educators. Our mission is to provide accessible,
                high-quality learning experiences across various fields.
              </p>

              <div className="bg-gray-white p-7 shadow-md rounded ">
                <div className="grid grid-cols-[20px_auto] gap-x-3">
                  <IoCheckmarkCircleSharp className="w-6 h-6 text-success-500" />
                  <div className="space-y-1.5">
                    <h5>lsdklkd lskdsd lskd lkdl sdsdsdsd </h5>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus, quia illo! Tempora ad voluptatum aliquid
                      exercitationem, magni ullam et similique!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-white p-7 shadow-md rounded ">
                <div className="grid grid-cols-[20px_auto] gap-x-3">
                  <IoCheckmarkCircleSharp className="w-6 h-6 text-success-500" />
                  <div className="space-y-1.5">
                    <h5>lsdklkd lskdsd lskd lkdl sdsdsdsd </h5>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus, quia illo! Tempora ad voluptatum aliquid
                      exercitationem, magni ullam et similique!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PERKS & BENIFITS */}
      <div>
        <div className="container max-w-6xl ">
          <div className="space-y-4 md:space-y-9">
            <h2 className="text-center">Our Perks & Benefits</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              <div className="space-y-5 flex flex-col justify-between p-6 bg-primary-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={forkkinfe}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Healthy Food & Snacks</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-secondary-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={chart}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Personal Career Growth</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-success-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={armchair}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Vacation & Paid Time Off</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-primary-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={gift}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Special Allowance & Bonuse</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-success-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={creditcard}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Competitive Salary</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-error-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={handshake}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Well-being membership</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-gray-50 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={trophy}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Maternity/Paternity Benifits</p>
              </div>
              <div className="space-y-5 flex flex-col justify-between p-6 bg-secondary-100 rounded-[2px]">
                <div className="bg-white p-2.5 flex-center gap-0 w-fit">
                  <Image
                    src={forkkinfe}
                    alt="benifits icon"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
                <p className="text-gray-900">Eduguard Annual Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <Gallery />

      {/* COMPANIES */}
      <Companies />

      {/* OPEN POSITIONS */}
      {/* // TODO: setting new positions is admin's task */}
      <div className="bg-gray-50">
        <div className="container max-w-6xl ">
          <div className="space-y-4 md:space-y-9">
            <h2 className="text-center">Our all open positions</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-5 ">
                <PositionCard />
                <PositionCard />
                <PositionCard />
                <PositionCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;



function PositionCard ({position}: {position?: Posiiton}) {
    return (
        <div className="*:px-4 *:py-6 bg-gray-white shadow-lg">
        <div className="space-y-3 border-b border-b-gray-100">
          <h5>Social Media Manager</h5>
          <div className="flex items-center gap-x-2.4 *:grid *:grid-cols-[23px_auto] gap-2">
            <div>
              <MdOutlineLocationOn className="w-5 h-5 text-secondary-500" />
              <span>
                Moscow, japan
              </span>
            </div>
            <div>
              <IoBagCheckSharp className="w-4 h-4 text-success-500" />
              <span >Full-Time</span>
            </div>
            <div>
              <BsFillClipboard2DataFill className="w-4 h-4 text-warning-500" />
              <span >{"01"} Vacancy</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 border-b border-b-gray-100">
          <div className="flex items-center justify-between">
            <p><span className="text-primary-600">Deadline: </span> 30 June, 2038</p>
            <Link href={'/career-details'}>
            <Button size={'icon'} variant={'secondaryPrimary'} className="h-10 w-10"><GoArrowRight className="w-5 h-5" /></Button></Link>
          </div>
        </div>
      </div>
    )
}
