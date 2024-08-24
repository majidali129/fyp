import { formateNumberInK } from "@/helpers";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import img from "../../public/images/instructor.png";

interface InstructorCardProps {
  instructor: {
    name: string;
    field: string;
    rating: number;
    students: number;
    image: string;
  };
}

const InstructorCard = ({ instructor }: InstructorCardProps) => {
  const { name, field, rating, students, image } = instructor;
  return (
    <div className="shadow-lg space-y-2">
      <Image
        src={img}
        className="w-full object-cover"
        width={100}
        height={180}
        alt="instructor image"
      />
      <div>
        <div className="flex-center flex-col">
          <h5>{name}</h5>
          <span className="opacity-50">{field}</span>
        </div>
        <div className="border-t border-t-gray-200 flex-between py-2 *:px-3">
          <div className="flex items-center gap-x-1">
            <span>
              <FaStar className="text-yellow-400" />
            </span>
            <span className="text-[.75rem] text-gray-700">{rating}</span>
          </div>
          <div className="space-x-1">
            <span className="text-gray-700 text-[.9rem]">
              {formateNumberInK(23232)}
            </span>
            <span className="text-gray-400 text-sm">{students}</span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default InstructorCard;
