import Image from "next/image";
import feedbackUser from "../../public/images/instructor2.png";
import { FaRegComments } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import ReplyToUserForm from "./ReplyToUserForm";

const LectureComments = () => {

  return (
    <div>
      <div className="flex items-start !gap-x-3 py-3.5 border-b border-b-gray-100 last-of-type:border-b-0">
        <Image
          src={feedbackUser}
          width={40}
          height={40}
          priority
          className="rounded-full max-sm:w-[30px] max-sm:h-[30px]"
          alt="feedback user image"
        />
        <div className="space-y-0.5">
          <div className="flex-start !gap-x-3">
            <h6 className="font-normal text-[1rem]">Majid Ali</h6>
            <div className=" rounded-full bg-gray-500 p-[3px]"></div>
            <span className="text-gray-500">1 week ago</span>
          </div>
          <p className="text-[.85rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod iure
            voluptas a consectetur
          </p>
          <div className="">
            {/* <div className="space-y-1.5"> */}
              <ReplyToUserForm />
            {/* </div> */}

            <ul>
                <UserReplyToComment isAdmin={true}/>
                <UserReplyToComment isAdmin={false}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureComments;




function UserReplyToComment ({isAdmin}: {isAdmin?:boolean}) {
    return (
        <div className="flex items-start !gap-x-3 py-3">
              <Image
                src={feedbackUser}
                width={40}
                height={40}
                priority
                className="rounded-full max-sm:w-[30px] max-sm:h-[30px]"
                alt="feedback user image"
              />
              <div className="space-y-0.5">
                <div className="flex-start !gap-x-3">
                  <h6 className="font-normal text-[1rem]">Majid Ali</h6>
                  {isAdmin && <Badge className="rounded-none bg-secondary-500 text-secondary-50 tracking-wide font-normal" >ADMIN</Badge>}
                  <div className=" rounded-full bg-gray-500 p-[3px]"></div>
                  <span className="text-gray-500">1 week ago</span>
                </div>
                <p className="text-[.85rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  iure voluptas a consectetur
                </p>
                <div className="">
                  <div className="flex-start *:!text-gray-500">
                    <FaRegComments className="w-5 h-5" />
                    <span>REPLY</span>
                  </div>
                </div>
              </div>
            </div>
    )
}