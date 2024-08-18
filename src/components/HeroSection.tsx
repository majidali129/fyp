import Image from "next/image";
import Img from "../../public/images/hero.png";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <header className="flex md:*:w-1/2  border-t border-t-gray-200 bg-gradient-to-t from-secondary-50 to-gray-white">
      <div>
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
      <div className="hidden md:block">
        <Image src={Img} alt="hero section iamge" className="-mt-1" />
      </div>
    </header>
  );
};

export default HeroSection;
