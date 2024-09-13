import Image from "next/image";
import contactImg from "../../../../public/images/contact.png";
import { Button } from "@/components/ui/button";
import { TfiEmail } from "react-icons/tfi";
import ContactUsForm from "../_components/ContactUsForm";

const ContactUsPage = () => {
  return (
    <section className="w-full pb-14 md:pb-0 *:py-12">
      {/* CONNECT WITH US */}
      <div className="md:!pb-0">
        <div className="container max-w-6xl ">
          <div className="grid md:grid-cols-[45%_auto] place-items-center lg:gap-10 gap-5">
            <div className="space-y-2.5 md:space-y-3 ">
              <h2 className="">Connect with us</h2>
              <p>
                Want to chat? We’d love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>
              <Button>
                <TfiEmail className="w-5 h-5" />
                Copy Email
              </Button>
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
      {/* OUR BRANCHES */}
      <div>
        <div className="container max-w-6xl">
          <div className="space-y-4 md:space-y-9">
            <div className="space-y-4 md:space-y-4 text-center">
              <h2 className="">Our branches all over the world</h2>
              <p className="md:w-1/2 mx-auto">
                Want to chat? We’d love to hear from you! Get in touch with our
                Customer Success.
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 *:w-full">
              <div className="relative">
                <Image
                  width={400}
                  height={100}
                  src={
                    "https://images.pexels.com/photos/36789/shanghai-oriental-pearl-tv-tower-night-view-people-s-republic-of-china.jpg?auto=compress&cs=tinysrgb"
                  }
                  className="object-cover h-full"
                  priority
                  alt="location1 image"
                />
                <div className="absolute  flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                  <p className="text-primary-500 text-[1rem]">MAIN BRANCH</p>
                  <h6>China</h6>
                  <span className="text-gray-500">
                    Lorem, ipsum dolor. ipsum dolor.
                  </span>
                </div>
              </div>
              <div className="relative">
                <Image
                  width={400}
                  height={100}
                  src={
                    "https://images.pexels.com/photos/1546836/pexels-photo-1546836.jpeg?auto=compress&cs=tinysrgb"
                  }
                  className="object-cover h-full"
                  priority
                  alt="location1 image"
                />
                <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                  <h6>Canada</h6>
                  <span className="text-gray-500">
                    Lorem, ipsum dolor. Lorem, ipsum dolor.
                  </span>
                </div>
              </div>
              <div className="relative">
                <Image
                  width={400}
                  height={100}
                  src={
                    "https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg?auto=compress&cs=tinysrgb"
                  }
                  className="object-cover"
                  priority
                  alt="location1 image"
                />
                <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                  <h6>Pakistan</h6>
                  <span className="text-gray-500">
                    Lorem, ipsum dolor. Lorem, ipsum dolor.
                  </span>
                </div>
              </div>
              <div className="relative">
                <Image
                  width={400}
                  height={100}
                  src={
                    "https://images.pexels.com/photos/3032330/pexels-photo-3032330.jpeg?auto=compress&cs=tinysrgb"
                  }
                  className="object-cover"
                  priority
                  alt="location1 image"
                />
                <div className="absolute flex flex-col items-center bg-gray-white rounded-[2px] w-[90%] mx-auto bottom-5 left-1/2 -translate-x-1/2 py-3.5 px-3">
                  <h6>Dubai</h6>
                  <span className="text-gray-500">
                    Lorem, ipsum dolor. Lorem, ipsum dolor.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT US */}
      <div className="bg-gray-50">
        <div className="container max-w-6xl ">
          <div className="space-y-5">
            <h2 className="text-center">Contact Us</h2>
            <div className="grid lg:grid-cols-2 lg:gap-x-32">
              <div>
                <h4 className="opacity-90">
                  Will you be in Los Angeles or any other branches any time
                  soon? Stop by the office! We&apos;d love to meet.
                </h4>
                <div className="grid md:grid-cols-2 gap-2 md:*:w-3/5 py-7 border-b border-b-gray-200 last-of-type:border-b-0">
                  <p className="text-primary-500">ADDRESS</p>
                  <p className="text-sm">
                    1702 Olympic Boulevard Santa Monica, CA 90404
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-2 md:*:w-3/5 py-7 border-b border-b-gray-200 last-of-type:border-b-0">
                  <p className="text-primary-500">PHONE NUMBER</p>
                  <div className="text-sm md:space-y-1.5">
                    <p>(480) 555-0103</p>
                    <p>(219) 555-0114</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2 md:*:w-3/5 py-7 border-b border-b-gray-200 last-of-type:border-b-0">
                  <p className="text-primary-500">EMAIL ADDRESS</p>
                  <div>
                    <div className="text-sm md:space-y-1.5">
                      <p>help.eduguard@gmail.com</p>
                      <p>career.eduguard@gamil.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[4px] p-5 lg:p-7 bg-gray-white">
                <ContactUsForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
