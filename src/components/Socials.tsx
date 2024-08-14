import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="socials">
      <div>
        <FcGoogle className="w-5 h-5" />
        <p className=" text-center ">Google</p>
      </div>
      <div>
        <FaFacebookF className="w-5 h-5 fill-blue-800" />
        <p className=" text-center   ">Facebook</p>
      </div>
      <div>
        <FaLinkedinIn className="w-5 h-5 fill-blue-800" />
        <p className=" text-center   ">LinkedIn</p>
      </div>
    </div>
  );
};

export default Socials;
