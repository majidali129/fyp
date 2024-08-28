import CourseList from "./CourseList";
import Section from "./Section";
import CategoryCourseFilterList from "./CategoryCourseFilterList";
import SortBy from "./SortBy";
import PaginationDemo from "./Pagination";

const Courses = ({category}: {category: string}) => {
  // TODO: fetch courses by category and pass down to courseList

  // TODO: ferform sorting based upon sorting filters by user selections

  // TODO: Also handle paginations

  return (
    <Section>
      <div className="tw-container">
        <div className="flex-between">
          <div></div>
          <div className="flex-start">
            sort by: <SortBy />
          </div>
        </div>
        <div className="flex md:gap-x-3">
          <CategoryCourseFilterList />
          <CourseList courses={[]} />
        </div>
        <div className="flex-center">
          <PaginationDemo />
        </div>
      </div>
    </Section>
  );
};

export default Courses;
