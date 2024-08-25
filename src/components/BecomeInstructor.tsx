import LinkButton from "./LinkButton";
import Section from "./Section";
import Counter from "./Counter";

const BecomeInstructor = () => {
  return (
    <Section className="bg-gray-50 lg:absolute lg:h-[430px]  lg:top-[2650px] 2xl:top-[2840px]">
      <div className="tw-container ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex-between">
            <div className="p-4 md:p-6 space-y-3.5 *:text-white bg-gradient-to-r from-primary-600 to-primary-500 ">
              <h4>Become as instructor</h4>
              <p>
                Instructors from around the world teach millions of students on
                Udemy. We provide the tools and skills to teach what you love.
              </p>
              <LinkButton
                to="/become-an-instructor"
                className="!text-primary-500"
              >
                Start Teaching
              </LinkButton>
            </div>
          </div>
          <div className="bg-gray-white p-4 md:p-6  space-y-3.5">
            <h4>Your teaching & earning steps</h4>
            <div className="grid md:grid-cols-2 gap-3 *:flex-start *:!gap-x-2">
              <div>
                <Counter>1</Counter>
                <span>Apply to become instructor</span>
              </div>
              <div>
                <Counter className="!bg-primary-100 !text-primary-500">
                  2
                </Counter>
                <span>Build & edit your profile</span>
              </div>
              <div>
                <Counter className="!bg-primary-100 !text-primary-500">
                  3
                </Counter>
                <span>Create your new course</span>
              </div>
              <div>
                <Counter className="!bg-success-100 !text-success-500">
                  4
                </Counter>
                <span>Start teaching & earning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BecomeInstructor;
