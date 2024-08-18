import Logo from "./Logo";
import { Button } from "./ui/button";
import { VscBell } from "react-icons/vsc"; // without any notificatons
import { VscBellDot } from "react-icons/vsc"; // with notificatons
import { IoMdHeartEmpty } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="flex-between py-3 px-5">
      <div className="flex-start space-x-3 max-w-xl w-full">
        <Logo />
        <Search placeholder="What do you want to learn..." />
      </div>
      <div className="flex-between space-x-6">
        <div className="flex-between gap-x-2.5">
          <span>
            <VscBell className="h-6 w-6" />
          </span>
          <span>
            <IoMdHeartEmpty className="h-6 w-6" />
          </span>
          <span>
            <BiCart className="h-6 w-6" />
          </span>
        </div>
        <div className="flex-center gap-x-3">
          <Button variant="secondaryPrimary">Create Account</Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
