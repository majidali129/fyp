
import CourseList from "./CourseList"
import Section from "./Section"
import CategoryCourseFilterList from "./CategoryCourseFilterList"

const Courses = () => {
      // TODO: fetch courses by category and pass down to courseList
      // TODO: Also handle paginations

  return (
    <Section>
        <div className="tw-container">
        <div className="flex-between">
            <div className="flex-start">
                sort by: <div>Filters</div>
            </div>
        </div>
        <div className="flex md:gap-x-3">
        <CategoryCourseFilterList />
        <CourseList  />
        </div>
        <div className="flex-center">Pagination</div>
        </div>
    </Section>
  )
}

export default Courses