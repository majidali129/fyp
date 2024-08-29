
import CourseCard from "@/components/CourseCard";
import ReusableCarousal from "@/components/Carousal";
import Section from "@/components/Section";
import { instructor } from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";
import Courses from "@/components/Courses";

const CoursesByCategoryPage = ({params}: {params: {category: string}}) => {
  const {category} = params;

  // TODO: fetch course instructors by category
  return (
    <>
      <Section>
        <div className="tw-container !space-y-11  *:space-y-7">
          <div>
            <h2 className="text-center">
              Best selling courses in Web Development
            </h2>
            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </ul>
            </div>
          </div>
          <div className="!space-y-0">
            <h4>Popular Tools</h4>
            <ReusableCarousal />
            <div className="text-gray-800 flex-start !gap-x-3">
              <b>Popular Keywords :</b>{" "}
              <ul className="flex-start gap-3 flex-wrap-reverse md:flex-wrap ">
                <li className="popular-keyword">HTML 5</li>
                <li className="popular-keyword">Web Development</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      {/* Instructors for category */}
      <Section className="bg-gray-50">
        <div className="tw-container !space-y-11  *:space-y-7">
          <div>
            <h2 className="text-center">
              Popular instructor in Web Development
            </h2>

            <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5  2xl:gap-6 ">
              {instructor.map((instructor) => (
                <InstructorCard key={instructor.name} instructor={instructor} />
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Courses />
    </>
  );
};

export default CoursesByCategoryPage;
