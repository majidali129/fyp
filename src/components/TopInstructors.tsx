import { instructor } from "@/data/instructors";
import CourseCard from "./CourseCard";
import InstructorCard from "./InstructorCard";
import Link from "./NextPrevLink";
import Section from "./Section";
import NextPrevLink from "./NextPrevLink";

const TopInstructors = () => {
  return (
    <Section className="lg:*:bg-white lg:absolute lg:top-[2940px] 2xl:top-[3115px]">
      <div className="tw-container lg:max-w-[1200px] 2xl:max-w-[1400px] lg:py-14 lg:!px-12 lg:shadow-md ">
        <h2 className="text-center">Top instructors of the month</h2>

        <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-3 2xl:gap-6 ">
          {instructor.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </ul>
        <p className="md:text-center text-sm">
          Thousands of students waiting for a instructor. Start teaching &
          earning now!{" "}
          <NextPrevLink
            to="/become-an-instructor"
            className="text-normal text-primary-500"
          >
            Become Instructor{" "}
          </NextPrevLink>
        </p>
      </div>
    </Section>
  );
};

export default TopInstructors;
