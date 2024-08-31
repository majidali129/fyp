import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import feedbackUser from "../../public/images/instructor2.png";
import { Button } from "./ui/button";
import Modal from "./Modal";

const StudentsFeedbacks = () => {
  return (
    <>
    <div className="space-y-3">
    <ul className="space-y-2">
      <FeedBackCard />
      <FeedBackCard />
      <FeedBackCard />
    </ul>

    <Button variant={'secondaryPrimary'}>Show all reviews</Button>
    </div>
    </>
  );
};

export default StudentsFeedbacks;



function FeedBackCard () {
    return (
        <div className="flex items-start !gap-x-3 py-3.5 border-b border-b-gray-100 last-of-type:border-b-0">
        <Image
          src={feedbackUser}
          width={50}
          height={50}
          priority
          className="rounded-full"
          alt="feedback user image"
        />
        <div className="space-y-1.5">
          <div className="flex-start !gap-x-3">
            <h5>Majid Ali</h5>
            <div className=" rounded-full bg-gray-500 p-[3px]"></div>
            <span className="text-gray-500">1 week ago</span>
          </div>
          <div className="flex-start !gap-x-1">
            <FaStar className="w-4 h-4 text-warning-500" />
            <FaStar className="w-4 h-4 text-warning-500" />
            <FaStar className="w-4 h-4 text-warning-500" />
            <FaStar className="w-4 h-4 text-warning-500" />
            <FaStar className="w-4 h-4 text-warning-500" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod iure
            voluptas a consectetur, deserunt numquam exercitationem saepe
            commodi delectus impedit soluta perspiciatis, nobis earum? Commodi
            at fuga culpa aut beatae?
          </p>
        </div>
      </div>
    )
}