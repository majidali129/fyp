import { formateNumberInK } from "@/helpers";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import img from "../../public/images/instructor.png";
import { Button } from "./ui/button";

interface InstructorCardProps {
  instructor: {
    name: string;
    field: string;
    rating: number;
    students: number;
    image: string;
    isHired?: boolean;
  };
}

const InstructorCard = ({ instructor }: InstructorCardProps) => {
  const { name, field, rating, students, image, isHired } = instructor;
  return (
    <div className="shadow-lg space-y-2">
      <Image
        src={img}
        className="w-full object-cover"
        alt="instructor image"
        priority
      />
      <div >
        <div className="flex-center flex-col py-1.5">
          <h5>{name}</h5>
          <span className="opacity-50 -mt-2">{field}</span>
        </div>
        <div className="border-t border-t-gray-100 py-2.5 pb-4 space-y-2 *:px-3">
          <div className="flex-between">
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
          </div>
          {isHired && <div>
            <Button
              size={"sm"}
              className={`hover:bg-primary-500 rounded-sm w-full hover:text-white`}
              variant={"secondaryPrimary"}
            >
              Send Message
            </Button>
          </div>}
        </div>{" "}
      </div>
    </div>
  );
};

export default InstructorCard;
