import { Button } from "@/components/ui/button";
import { formateNumber } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa6";
import courseImg from "../../../../../public/images/courseImg.png";

function WishListCard({ course }: { course?: any }) {
  return (
    <li className="grid md:grid-cols-[3fr_9fr] lg:grid-cols-[2fr_10fr] gap-x-4 border-b border-b-gray-200 last-of-type:border-b-0 py-5">
      <Image
        src={courseImg}
        priority
        className="w-full h-full rounded-[.2rem] aspect-video"
        alt="course-banner-img"
      />

      <div className="space-y-3">
        <div className="flex-between max-sm:py-2.5">
          <div>
            <h5>Course Title</h5>
            <div className="flex-start">
              <span className="text-gray-500">Course By:</span>
              <p className=" *:tracking-wide flex-start">
                <Link href={"#"}>Majid Ali</Link>
                <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
                <Link href={"#"}>Majid Ali</Link>
              </p>
            </div>
          </div>
          <div className=" *:text-lg space-x-1.5 lg:flex items-center">
            <span className="text-primary-500">$57.00</span>
            <span className="text-gray-500 line-through hidden md:block">$53.00</span>
          </div>
        </div>

        <div className="max-sm:flex-between">
          <div className="flex-start !gap-x-2">
            <FaStar className="text-warning-500 w-4 h-4" />
            <p>
              4.6{" "}
              <span className="text-gray-500">
                ({formateNumber(32323)} Reviews)
              </span>
            </p>
          </div>
          <Button size={'icon'} variant={'secondaryPrimary'} className="group md:hidden max-sm:w-[30px] max-sm:h-[30px]">
              <FaHeart className='text-primary-500 group-hover:w-4 group-hover:h-4 transition-all duration-200 ease-in-out' />
            </Button>
        </div>
        {/* ACTIONS */}

        <div className="flex-between">
            <div className="md:space-x-2 w-full max-sm:grid grid-cols-2 max-sm:gap-x-1.5">
              <Button  variant={"secondaryGhost"}>
                Buy Now
              </Button>
              <Button >Add To Cart</Button>
            </div>
            {/* <Button
              size={"icon"}
              variant={"secondaryPrimary"}
              className="hidden md:block"
            >
              <FaHeart className="text-primary-500" />
            </Button> */}
            <Button size={'icon'} variant={'secondaryPrimary'} className="group hidden md:flex">
              <FaHeart className='text-primary-500 group-hover:w-6 group-hover:h-6 transition-all duration-200 ease-in-out' />
            </Button>
        </div>
      </div>
    </li>

  )}

  export default WishListCard;