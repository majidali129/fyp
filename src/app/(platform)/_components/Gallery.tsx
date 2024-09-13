import { Button } from "@/components/ui/button"
import g1 from "../../../../public/images/gallery1.png";
import g2 from "../../../../public/images/gallery2.png";
import g3 from "../../../../public/images/gallery3.png";
import g4 from "../../../../public/images/gallery4.png";
import g5 from "../../../../public/images/gallery5.png";
import g6 from "../../../../public/images/gallery6.png";
import g7 from "../../../../public/images/gallery7.png";

import Image from "next/image"
import { LuMoveRight } from "react-icons/lu";

const Gallery = () => {
  return (
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
                <Image src={g5} alt="gallery 5"  priority className="w-full h-[286px] col-span-5  object-cover"/>
                <div className="col-span-4 grid-rows-2 grid-cols-4">
                <Image src={g6} alt="gallery 6"  priority className="w-full object-cover"/>
                <Image src={g7} alt="gallery 7"  priority className=" object-cover rounded-[2px] col-span-2 "/>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Gallery