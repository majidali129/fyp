import CourseCard from "./CourseCard";
import Section from "./Section";

const FeaturedCourses = () => {
  return (
    <Section className="lg:*:bg-white lg:absolute lg:top-[1480px] 2xl:top-[1600px]  ">
      <div className="tw-container lg:max-w-[1240px] 2xl:max-w-[1400px] lg:py-14 lg:!px-12 lg:shadow-md ">
        <h2 className="">Our Featured Courses</h2>

        <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-5 lg:gap-3 2xl:gap-6 ">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </ul>
      </div>
    </Section>
  );
};

export default FeaturedCourses;
