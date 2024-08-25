import Image from "next/image";
import { Badge } from "./ui/badge";
import { formateNumberInK } from "@/helpers";
import { FaStar } from "react-icons/fa";
import img from "../../public/images/courseImg.png";

const CourseCard = () => {
  return (
    <div className="rounded-sm rounded-t-[0.3rem] shadow-lg">
      <Image
        src={img}
        alt="course cover photo"
        priority
        height={180}
        className="max-sm:h-[220px] w-full object-cover rounded-t-[0.3rem] rounded-b-[0.2rem] select-none"
      />

      <div className="py-2 *:px-2 space-y-2">
        <div className="flex-between">
          <Badge>Music</Badge>
          <span className="font-semibold text-primary-500">${500}</span>
        </div>
        <h5 className="line-clamp-2 text-[.9rem] lg:text-[.8rem] 2xl:text-[1.1rem] font-semibold tracking-wide text-gray-700">
          Web Development With HTML CSS JAVASCRIPT node
        </h5>
        <div className="border-t border-t-gray-100 flex-between py-2">
          <div className="flex items-center gap-x-1">
            <span>
              <FaStar className="text-yellow-400" />
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
      </div>
    </div>
  );
};

export default CourseCard;
