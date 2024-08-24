import CourseCard from "./CourseCard";
import Section from "./Section";

const BestSellingCourses = () => {
  return (
    <Section className="bg-gray-50 lg:h-[620px]">
      <div className="tw-container ">
        <h2 className="text-center">Best Selling Courses</h2>

        <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-3 2xl:gap-6">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </ul>
      </div>
    </Section>
  );
};

export default BestSellingCourses;
