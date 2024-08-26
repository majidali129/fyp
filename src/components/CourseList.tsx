import CourseCard from "./CourseCard"
import FiltersList from "./CategoryCourseFilterList"

const CourseList = () => {

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
    </ul>
  )
}

export default CourseList