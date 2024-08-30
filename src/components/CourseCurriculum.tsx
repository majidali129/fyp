import { MdOutlinePlayCircle } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { IoTimeOutline } from "react-icons/io5"
import { IoIosPlay } from "react-icons/io";

const CourseCurriculum = () => {
  return (
    <div className=" border border-gray-100 py-0 flex items-start gap-x-5 rounded-sm">
        <Accordion type="single" collapsible className="w-full *:px-5">
      <AccordionItem value="item-1">
        <AccordionTrigger className="[&>svg]:absolute [&>svg]:left-0 ps-7 [&[data-state=open]>div>h5]:text-primary-500  ">
            <div className="flex-between w-full">
                <h5 className="text-gray-900 text-lg">Geting Started</h5>
                <div className="flex-start !gap-x-3">
                <div className="flex-start">
                    <MdOutlinePlayCircle className="text-secondary-500 w-4 h-4" />
                    <span>8 Lectures</span>
                  </div>
                  <div className="flex-start">
                    <IoTimeOutline className="text-warning-500 w-4 h-4" />
                    <span>37m</span>
                  </div>
                </div>
            </div>
        </AccordionTrigger>
        <AccordionContent className="flex-between py-1">
            <div className="flex-start !gap-x-2.5">
                <IoIosPlay className="w-4 h-4" />
                <span className="text-gray-700">What is Web Development?</span>
            </div>
            <span className="text-gray-500">{'07:23'}</span>
        </AccordionContent>
        <AccordionContent className="flex-between  py-1">
            <div className="flex-start !gap-x-2.5">
                <IoIosPlay className="w-4 h-4" />
                <span className="text-gray-700">What is Web Development?</span>
            </div>
            <span className="text-gray-500">{'07:23'}</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="[&>svg]:absolute [&>svg]:left-0 ps-7 [&[data-state=open]>div>h5]:text-primary-500  ">
            <div className="flex-between w-full">
                <h5 className="text-gray-900 text-lg">HTML Basics</h5>
                <div className="flex-start !gap-x-3">
                <div className="flex-start">
                    <MdOutlinePlayCircle className="text-secondary-500 w-4 h-4" />
                    <span>8 Lectures</span>
                  </div>
                  <div className="flex-start">
                    <IoTimeOutline className="text-warning-500 w-4 h-4" />
                    <span>37m</span>
                  </div>
                </div>
            </div>
        </AccordionTrigger>
        <AccordionContent className="flex-between  py-1">
            <div className="flex-start !gap-x-2.5">
                <IoIosPlay className="w-4 h-4" />
                <span className="text-gray-700">What is Web Development?</span>
            </div>
            <span className="text-gray-500">{'07:23'}</span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default CourseCurriculum