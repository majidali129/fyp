import { MdOutlinePlayCircle } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";
import { IoTimeOutline } from "react-icons/io5";
import { BiCheckDouble } from "react-icons/bi";
import CourseLecture from "./CourseLecture";

interface CurriculumProps {
  curriculum: any;
  isWatching?: boolean;
}

const CourseCurriculum = ({
  curriculum,
  isWatching
}: CurriculumProps) => {
  return (
    <div className=" border border-gray-100 py-0 flex items-start gap-x-5 rounded-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="[&>div]:relative [&>div>svg]:absolute *:py-3 [&>div]:px-3 [&>div]:ps-7 [&>div>svg]:left-1 [&>div>svg]:top-1/2 [&>div>svg]:-translate-y-1/2 [&[data-state=open]>div>div>h6]:text-primary-500  ">
            <div className="flex-between w-full">
              {/* //TODO: show finish status to user */}
              <h6 className="text-gray-800">{"Geting Started"}</h6>
              <div className="flex-between !gap-x-2">
              <div className="flex-start !gap-x-3">
                <div className="flex-start !gap-x-1">
                  <MdOutlinePlayCircle className="text-secondary-500 w-4 h-4" />
                  <span className="text-[.8rem]">{"8 Lectures"}</span>
                </div>
                <div className="flex-start !gap-x-1">
                  <IoTimeOutline className="text-warning-500 w-4 h-4" />
                  <span className="text-[.8rem]">{"37m"}</span>
                </div>
              </div>
              {isWatching && <div className="flex items-center gap-x-0.5">
                <BiCheckDouble className="w-4 h-4 text-success-500" />
                <span>25% finish</span>
                <span className="text-gray-500">(1/4)</span>
                </div>}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-1.5">
            <CourseLecture isWatching={isWatching!} lecture="" />
            <CourseLecture isWatching={isWatching!} lecture="" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="[&>div]:relative [&>div>svg]:absolute *:py-3 [&>div]:px-3 [&>div]:ps-7 [&>div>svg]:left-1 [&>div>svg]:top-1/2 [&>div>svg]:-translate-y-1/2 [&[data-state=open]>div>div>h6]:text-primary-500  ">
            <div className="flex-between w-full">
              {/* //TODO: show finish status to user */}
              <h6 className="text-gray-800">{"Geting Started"}</h6>
              <div className="flex-between !gap-x-2">
              <div className="flex-start !gap-x-3">
                <div className="flex-start !gap-x-1">
                  <MdOutlinePlayCircle className="text-secondary-500 w-4 h-4" />
                  <span className="text-[.8rem]">{"8 Lectures"}</span>
                </div>
                <div className="flex-start !gap-x-1">
                  <IoTimeOutline className="text-warning-500 w-4 h-4" />
                  <span className="text-[.8rem]">{"37m"}</span>
                </div>
              </div>
              {isWatching && <div className="flex items-center gap-x-0.5">
                <BiCheckDouble className="w-4 h-4 text-success-500" />
                <span>25% finish</span>
                <span className="text-gray-500">(1/4)</span>
                </div>}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-1.5">
            <CourseLecture isWatching={isWatching!} lecture="" />
            <CourseLecture isWatching={isWatching!} lecture="" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CourseCurriculum;
