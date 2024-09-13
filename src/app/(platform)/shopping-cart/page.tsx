import Image from "next/image";

import courseImg from "../../../../public/images/courseImg.png";
import { FaStar } from "react-icons/fa6";
import { formateNumber } from "@/helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

const PublicShoppingCart = () => {
  return (
    <div className="py-20">
      <div className="container max-w-6xl">
        <div className=" space-y-4">
          <h4>
            Shopping Cart <span className=" text-xl">(08)</span>
          </h4>
          <div className="grid lg:grid-cols-[9fr_3fr] gap-8 lg:gap-4 ">
            <div className="border border-gray-100">
              <div className=" hidden lg:grid lg:grid-cols-[60%_1fr_1fr] w-full py-3 gap-x-4  border-b border-b-gray-100 px-5">
                <div>Course</div>
                <div>Price</div>
                <div>Action</div>
              </div>

              {/* WISHLIST */}
              <ul className="px-5">
                <CartItem />
                <CartItem />
              </ul>
            </div>
            <div className=" px-1.5 py-1">
              <div className="space-y-4 pb-3 border-b border-b-gray-100">
                <div className="flex-between *:text-[1rem]">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${53.5} USD</span>
                </div>
                <div className="flex-between *:text-[1rem]">
                  <span className="text-gray-500">Cupon Discount</span>
                  <span className="text-gray-900">8%</span>
                </div>
                <div className="flex-between *:text-[1rem]">
                  <span className="text-gray-500">Taxs</span>
                  <span className="text-gray-900">${53.5} USD</span>
                </div>
              </div>

              <div className="py-3 space-y-4">
                <div className="flex-between">
                    <span className="text-[1rem]">Total:</span>
                    <span className="text-[1.4rem]">$75.00 USD</span>
                </div>
                <Button className="w-full" >Proceed To Checkout <GoArrowRight className="md:w-6 h-5 w-5  md:h-6" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicShoppingCart;

function CartItem({ course }: { course?: any }) {
  return (
    <li className="relative group grid lg:grid-cols-[60%_1fr] gap-x-4 py-5 border-b border-b-gray-100 last-of-type:border-b-0">
      <div className="md:flex items-start gap-4 max-sm:space-y-3.5">
        <Image
          src={courseImg}
          width={180}
          height={300}
          priority
          alt="course image"
          className="max-sm:w-full rounded-[2px]"
        />

        <div className="flex flex-col w-full justify-around self-stretch">
          <div className="space-y-1">
            <div className="flex-start !gap-x-2">
              <FaStar className="text-warning-500 w-4 h-4" />
              <p>
                4.6{" "}
                <span className="text-gray-500">
                  ({formateNumber(32323)} Reviews)
                </span>
              </p>
            </div>
            <h6 className="text-gray-800 line-clamp-2">Course Title</h6>
          </div>
          <div className="flex-start">
            <span className="text-gray-500">Course By:</span>
            <p className=" *:tracking-wide flex-start">
              <Link href={"#"}>Majid Ali</Link>
              <span className="bg-gray-500 w-1 h-1 rounded-full"></span>
              <Link href={"#"}>Majid Ali</Link>
            </p>
          </div>
          {/* only for tablets */}
          <div className=" hidden  w-full md:max-lg:flex items-center justify-between">
            {/* PRICE */}
            <div className="space-x-1">
              <span className="lg:text-lg text-primary-500">$57.00</span>
              <span className="lg:text-lg !text-gray-300 line-through">
                $57.00
              </span>
            </div>
            {/* ACTIONS */}

            <div>
              <Button size={"sm"} variant={"transparentPrimary"}>
                Move To Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="  sm:hidden w-full flex lg:flex items-center justify-between">
        {/* PRICE */}
        <div className="space-x-1">
          <span className="lg:text-lg text-primary-500">$57.00</span>
          <span className="lg:text-lg !text-gray-300 line-through">$57.00</span>
        </div>
        {/* ACTIONS */}

        <div>
          <Button size={"sm"} variant={"transparentPrimary"}>
            Move To Wishlist
          </Button>
        </div>
      </div>

      <button className="absolute md:top-3 right-3.5 bottom-20 md:right-3.5 flex group-hover:md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 bg-gray-200 w-7 h-7 rounded-full md:hidden">
        <IoCloseOutline className="w-6 h-6 text-gray-900" />
      </button>
    </li>
  );
}
