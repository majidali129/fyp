
import CourseCard from "@/components/CourseCard";
import Section from "@/components/Section";
import { instructor } from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";
import Courses from "@/components/Courses";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PopularToolCard from "@/components/PopularToolCard";

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
            {/* <h4>Popular Tools</h4>
            <ReusableCarousal /> */}
             <Carousel className="w-full space-y-5" orientation="horizontal">
          <div className="relative">
          <h3>Let&apos;s start learning, Majid</h3>
          <CarouselPrevious className="bg-primary-100 border-none text-primary-500 left-auto top-4 right-10" />
          <CarouselNext className="bg-primary-100 border-none text-primary-500 right-0 top-4"/>
          </div>
          <CarouselContent className=" py-4 !px-3 w-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/6 "
              >
               <PopularToolCard  />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
