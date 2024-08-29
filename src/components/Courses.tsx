import { formateNumber } from "@/helpers"
import Section from "./Section"
import SortBy from "./SortBy"
import CategoryCourseFilterList from "./CategoryCourseFilterList"
import Paginate from "./Pagination"
import CourseList from "./CourseList"

// const Courses = ({children}: {children: ReactNode}) => {
const Courses = () => {
  return (
    <Section>
    <div className="tw-container">
      <div className="flex-between">
        <div>button to toggle CategoryCourseFilterList component</div>
        <div className="flex-start">
          sort by: <SortBy />
        </div>
      </div>
      <div className="flex-between">
        <div className="flex-start">
          Suggestions: {" "}
          <ul className="flex-start gap-2 flex-wrap-reverse md:flex-wrap ">
            <li className="text-primary-500">HTML 5</li>
          </ul>
        </div>
           <p className="text-[.9rem]"><b className="text-gray-800 opacity-100 !text-[1rem]">{formateNumber(3145684)}</b> results find for web-development</p>
      </div>
      <div className="flex md:gap-x-3">
        <CategoryCourseFilterList />
        <CourseList courses={[]}/>
      </div>
      <div className="flex-center">
        <Paginate />
      </div>
    </div>
  </Section>
  )
}

export default Courses