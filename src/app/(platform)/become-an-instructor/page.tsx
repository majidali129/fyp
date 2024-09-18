import { Button } from "@/components/ui/button";
import Image from "next/image";
import becomeInstImg from "../../../../public/images/becomeInstructor.png";

const BecomeAnInstructor = () => {
  return <section>
    <div className="container max-w-6xl">
      <div className="md:grid-cols-2 grid place-items-center py-14 md:!py-0 ">
        <div className="space-y-6 tracking-tight pe-5 lg:pe-10">
        <h1>Become an Instuctor</h1>
      <p className="text-[1.1rem]">Become an instructor & start teaching with 26k certified instructors. Create a success story with 67.1k Students — Grow yourself with 71 countries.</p>
      <Button>Get Started</Button>
        </div>
        <Image src={becomeInstImg} alt="Become an instructor" className="w-full hidden md:block" />
      </div>
    </div>
    <div className="w-full bg-primary-100 py-6">
      <div className="container max-w-6xl">
        lskdlskd
      </div>
    </div>
  </section>
};

export default BecomeAnInstructor;
