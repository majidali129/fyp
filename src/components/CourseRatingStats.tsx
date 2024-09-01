import { FaStar } from "react-icons/fa6"
import { Progress } from "./ui/progress"

const CourseRatingStats = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr_3fr_auto] *:w-full  gap-x-2.5  place-items-center">
    <div className="flex-center !gap-x-1">
    <FaStar className="text-warning-500 w-4 h-4" />
    <FaStar className="text-warning-500 w-4 h-4" />
    <FaStar className="text-warning-500 w-4 h-4" />
    <FaStar className="text-warning-500 w-4 h-4" />
    <FaStar className="text-warning-500 w-4 h-4" />
    </div>
    <p className="text-gray-600 ">5 Star Rating</p>
    <Progress className="rounded-none h-1.5 " value={75} />
    <span className="text-end">75%</span>
  </div>
  )
}

export default CourseRatingStats