import Image from "next/image";
import Img from "../../public/images/hero.png";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <header className="grid md:grid-cols-[55%_1fr] lg:grid-cols-2   lg:h-[400px] md:h-[300px] 2xl:h-[500px]  bg-gradient-to-t from-secondary-50 to-gray-white ">
      <div className="h-full ">
        <div className="flex-center justify-center md:items-start  max-sm:text-center max-sm:h-96 flex-col space-y-4 h-full md:max-w-sm w-full *:w-fit mx-auto px-2 md:px-0">
          <h1>Learn with expert anytime anywhere</h1>
          <p>
            Our mision is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>
          <Link href={"/sign-up"}>
            <Button>Create Account</Button>
          </Link>
        </div>
      </div>
      <Image src={Img} priority alt="hero section image" className="md:h-[302px] hidden md:block lg:h-[402px] 2xl:h-[502px] md:-mt-1 2xl:-mt-[5px]" />
    </header>
  );
};

export default HeroSection;
