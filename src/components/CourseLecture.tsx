import { IoIosPause, IoIosPlay } from "react-icons/io";
import { Checkbox } from "./ui/checkbox";

const CourseLecture = ({
  isWatching,
  lecture
}: {
  isWatching: boolean;
  lecture: any;
}) => {
  // TODO: is lecture active? so, show indicator
  // TODO: mark lecture as completed
  // TODO: show user, whether it is paused or resume
  let isLecActive = true
  return (
    <div className={`flex-between py-2 px-2.5 ${isLecActive && isWatching? 'bg-primary-200': ''}`}>
      <div className="flex-start !gap-x-2.5">
        {isWatching ? <Checkbox className="bg-white"/> : <IoIosPlay className="w-4 h-4" />}
        <div className={`${isWatching? 'flex-start': ''}`}>
        {isWatching && <span>1.</span>}
        <span className="text-gray-700">What is Web Development?</span>
        </div>
      </div>
      <div className="flex-start !gap-x-2.5">
        {isWatching && <IoIosPlay className="w-4 h-4" />}
        {isWatching && <IoIosPause className="w-4 h-4" />}
      <span className="text-gray-500">{"07:23"}</span>
      </div>
    </div>
  );
};

export default CourseLecture;
