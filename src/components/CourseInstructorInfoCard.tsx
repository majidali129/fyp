import { formateNumber } from "@/helpers";
import Image from "next/image";
import { FaCirclePlay, FaStar } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import instructor from "../../public/images/instructor.png";

const CourseInstructorInfoCard = () => {
  return (
    <div className="p-5 border border-gray-100 flex items-start gap-x-5 rounded-sm">
      <Image
        src={instructor}
        alt="instructor profile photo"
        width={90}
        height={90}
        priority
        className="rounded-full"
      />
      <div className="space-y-2.5">
        <div>
          <h4>Majid Ali</h4>
          <span className="text-gray-600">Fullstack Developer / Engineer</span>
        </div>
        <div className="flex-start !gap-x-3.5">
          <div className="flex-start">
            <FaStar className="text-warning-500 w-4 h-4" />
            <p>
              <b className="text-gray-900">{4.9}</b> Course rating
            </p>
          </div>
          <div className="flex-start">
            <LuUsers className="text-secondary-500 w-4 h-4" />
            <p>
              <b className="text-gray-900">{formateNumber(23232)}</b> Students
            </p>
          </div>
          <div className="flex-start">
            <FaCirclePlay className="text-primary-500 w-4 h-4" />
            <p>
              <b className="text-gray-900">{formateNumber(232)}</b> Courses
            </p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta aut
          doloribus ducimus nam. Labore laudantium iste dolorem itaque error
          magni facilis autem quam. Sint, fugit porro. Temporibus facere dolore
          reprehenderit?
        </p>
      </div>
    </div>
  );
};

export default CourseInstructorInfoCard;
