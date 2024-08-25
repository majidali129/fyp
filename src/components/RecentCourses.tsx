import { LuMoveRight } from "react-icons/lu";
import CourseCard from "./CourseCard";
import LinkBtn from "./LinkButton";
import Section from "./Section";
import { Button } from "./ui/button";
import Link from "next/link";

const RecentCourses = () => {
  return (
    <Section className="lg:absolute lg:top-[2040px] 2xl:top-[2190px] ">
      <div className="tw-container ">
        <h2 className="text-center">Recently Added Courses</h2>

        <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-5 lg:gap-3 2xl:gap-6 ">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </ul>

        <p className="text-center">
          <Link href={"/courses"}>
            <Button variant={"secondaryPrimary"}>
              Browse All Courses <LuMoveRight />
            </Button>
          </Link>
        </p>
      </div>
    </Section>
  );
};

export default RecentCourses;
