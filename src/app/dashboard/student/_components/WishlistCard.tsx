import { Button } from "@/components/ui/button";
import { formateNumber } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa6";
import courseImg from '../../../../../public/images/courseImg.png'

function WishListCard ({course}: {course?: any}) {
    return (
      <li className='py-4  grid lg:grid-cols-[3fr_1fr_2fr] gap-x-4 border-b border-b-gray-200 last-of-type:border-b-0'>
        <div className=' flex-start !gap-x-3'>
          <Image src={courseImg} className='max-w-48' priority alt='course-banner-img'/>
          <div className='flex flex-col justify-between py-1.5 h-full w-full'>
            <div>
            <div className='flex-start !gap-x-2'>
            <FaStar className="text-warning-500 w-4 h-4" />
            <p>4.6 <span className='text-gray-500'>({formateNumber(32323)} Reviews)</span></p>
            </div>
            <h5>Course Title</h5>
            </div>

            <div className='flex-start'>
            <span className='text-gray-500'>Course By:</span>
                  <p className=" *:tracking-wide flex-start">
                    <Link href={"#"}>Majid Ali</Link>
                    <span className='bg-gray-500 w-1 h-1 rounded-full'></span>
                    <Link href={"#"}>Majid Ali</Link>
                  </p>
            </div>
          </div>
        </div>
        <div className=' *:text-lg space-x-1.5 lg:flex items-center'>
          <span className='text-primary-500'>$57.00</span>
          <span className='text-gray-500 line-through'>$57.00</span>
        </div>
        <div className='grid grid-cols-[4fr_4fr_1fr] gap-x-2 lg:place-content-center'>
          <Button size={'sm'} variant={'secondaryGhost'}>Buy Now</Button>
          <Button size={'sm'}>Add To Cart</Button>
          <Button size={'icon'} variant={'secondaryPrimary'} className='h-[29px] w-[29px] '><FaHeart className='text-primary-500' /></Button>
        </div>
      </li>
    )
  }

  export default WishListCard