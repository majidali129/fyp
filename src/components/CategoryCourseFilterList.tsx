import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { formateNumber } from "@/helpers";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";

const CategoryCourseFilterList = () => {
  return (
    <aside className="border-t border-t-gray-100 py-2.5 w-[20rem]">
      <Accordion type="multiple" className="w-full" defaultValue={['rating', 'level', 'duration', 'price' ]}>
        <AccordionItem value="rating">
          <AccordionTrigger >Ratings</AccordionTrigger>
          <AccordionContent >
            <RatingsFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="level">
          <AccordionTrigger >Course Level</AccordionTrigger>
          <AccordionContent >
            <CourseLevelFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="duration">
          <AccordionTrigger >Duration</AccordionTrigger>
          <AccordionContent >
            <CourseDurationFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger >Price</AccordionTrigger>
          <AccordionContent >
            <FreePaidFilter />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default CategoryCourseFilterList;



function RatingsFilter() {

  return (
    <RadioGroup defaultValue="4.5" className="space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4.5" id="r1" />
                <Label htmlFor="r1" className="flex-start">
                  <div className="flex-start !gap-x-1">
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStarHalfAlt className="text-yellow-600 w-4 h-4" />
                  </div>
                  <span>4.5 & up</span>
                  <span className="opacity-80">({formateNumber(23232)})</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4.0" id="r2" />
                <Label htmlFor="r2" className="flex-start">
                  <div className="flex-start !gap-x-1">
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaRegStar className="text-yellow-600 w-4 h-4" />
                  </div>
                  <span>4.0 & up</span>
                  <span className="opacity-80">({formateNumber(232)})</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3.5" id="r3" />
                <Label htmlFor="r3" className="flex-start">
                  <div className="flex-start !gap-x-1">
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStarHalfAlt className="text-yellow-600 w-4 h-4" />
                    <FaRegStar className="text-yellow-600 w-4 h-4" />
                  </div>
                  <span>3.5 & up</span>
                  <span className="opacity-80">({formateNumber(2232)})</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3.0" id="r4" />
                <Label htmlFor="r4" className="flex-start">
                  <div className="flex-start !gap-x-1">
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaStar className="text-yellow-600 w-4 h-4" />
                    <FaRegStar className="text-yellow-600 w-4 h-4" />
                    <FaRegStar className="text-yellow-600 w-4 h-4" />
                  </div>
                  <span>3.0 & up</span>
                  <span className="opacity-80">({formateNumber(232)})</span>
                </Label>
              </div>
            </RadioGroup>
  )
}

function CourseLevelFilter () {
  return (
    <ul className="space-y-3.5 ">
    <li className="flex items-center space-x-2">
      <Checkbox id="all" />
      <label
        htmlFor="all"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        All Level ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="beginner" />
      <label
        htmlFor="beginner"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        Beginner ({formateNumber(22323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="intermediate" />
      <label
        htmlFor="intermediate"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        Intermediate ({formateNumber(64323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="expert" />
      <label
        htmlFor="expert"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        Expert ({formateNumber(233)})
      </label>
    </li>
        </ul>
  )
}

function CourseDurationFilter () {
  return (
    <ul className="space-y-3.5 ">
    <li className="flex items-center space-x-2">
      <Checkbox id="12" />
      <label
        htmlFor="12"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        6-12 Months ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="6" />
      <label
        htmlFor="6"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        3-6 Months ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="1" />
      <label
        htmlFor="1"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          1-3 Months ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="weeks" />
      <label
        htmlFor="weeks"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          1-4 Weeks ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="days" />
      <label
        htmlFor="days"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          1-7 Days ({formateNumber(2323)})
      </label>
    </li>

        </ul>
  )
}

function FreePaidFilter () {
  return (
    <ul className="space-y-3.5 ">
    <li className="flex items-center space-x-2">
      <Checkbox id="free" />
      <label
        htmlFor="free"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        Free ({formateNumber(2323)})
      </label>
    </li>
    <li className="flex items-center space-x-2">
      <Checkbox id="paid" />
      <label
        htmlFor="paid"
        className="text-[1rem] text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        Paid ({formateNumber(22323)})
      </label>
    </li>
        </ul>
  )
}



