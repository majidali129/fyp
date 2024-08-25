import Image from "next/image";
import Section from "./Section";
import netflix from '../../public/images/netflix.png'
import youtube from '../../public/images/youtube.png'
import google from '../../public/images/google.png'
import lenovo from '../../public/images/lenovo.png'
import slack from '../../public/images/slack.png'
import verizon from '../../public/images/verizon.png'
import lexmark from '../../public/images/lexmark.png'
import microsoft from '../../public/images/microsoft.png'

const TopCompanies = () => {
  return (
    <Section className="lg:*:bg-white lg:absolute lg:top-[3480px] 2xl:top-[3700px] ">
      <div className="tw-container">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-2">
          <div className="space-y-2.5 flex flex-col justify-center">
            <h2>6.3k trusted companies</h2>
            <p>
              Nullam egestas tellus at enim ornare tristique. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra.
            </p>
          </div>
          <div className="grid *:shadow-[rgba(88,88,92,0.1)0px_7px_29px_0px] *:h-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 *:bg-white  *:flex-center *:rounded">
            <div >
              <Image src={netflix} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={youtube} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={google} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={lenovo} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={slack} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={verizon} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={lexmark} alt="netflix logo" width={80} height={80} priority />
            </div>
            <div >
              <Image src={microsoft} alt="netflix logo" width={80} height={80} priority />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TopCompanies;
