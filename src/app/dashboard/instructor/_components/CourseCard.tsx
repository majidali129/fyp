"use client";

import Image from "next/image";
import { formateNumberInK } from "@/helpers";
import { FaStar } from "react-icons/fa";
import img from "../../../../../public/images/courseImg.png";
import { Badge } from "@/components/ui/badge";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

const CourseCard = () => {
  const isOldPrice: boolean = true;

  return (
    <div className="rounded-sm rounded-t-[0.2rem] shadow-lg">
      <Image
        src={img}
        alt="course cover photo"
        priority
        height={180}
        className="max-sm:h-[220px] w-full object-cover rounded-t-[0.1rem] rounded-b-[0.2rem] select-none"
      />

      <div className="py-2 *:px-2 space-y-2.5">
        <div>
          <Badge className="bg-secondary-100 text-secondary-700">Music</Badge>
        </div>
        <h5 className="line-clamp-2 text-[.9rem] lg:text-[.8rem] 2xl:text-[1.1rem] font-semibold tracking-wide text-gray-700">
          Web Development With HTML CSS JAVASCRIPT node
        </h5>
        <div className="border-y border-y-gray-100 flex-between py-2">
          <div className="flex items-center gap-x-1">
            <span>
              <FaStar className="text-warning-500" />
            </span>
            <span className="text-[.75rem] text-gray-700">5.0</span>
          </div>
          <div className="space-x-1">
            <span className="text-gray-700 text-[.9rem]">
              {formateNumberInK(23232)}
            </span>
            <span className="text-gray-400 text-sm">students</span>
          </div>
        </div>

        <div className="flex-between">
          <div className="space-x-1">
            <span className="font-semibold text-primary-500">${500}</span>
            {isOldPrice && (
              <span className="text-gray-500 line-through text-sm">${800}</span>
            )}
          </div>
          <InstructorActions courseId="232" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

function InstructorActions({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleViewDetails = () => {
    router.replace(`${pathname}/course/${courseId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <BsThreeDots className="text-gray-900 w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white hover:*:bg-primary-500 *:cursor-pointer py-3.5 border-none px-0 *:px-5 hover:*:text-gray-white">
        <DropdownMenuItem onClick={handleViewDetails}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>Edit Course</DropdownMenuItem>
        <DropdownMenuItem>Delete Course</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
