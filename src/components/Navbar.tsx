import Logo from "./Logo";
import { Button } from "./ui/button";
import { VscBell } from "react-icons/vsc"; // without any notificatons
import { MdMenu } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import Search from "./Search";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from "./ui/sheet";

const isLoggedIn = false;

const Navbar = () => {
  return (
    <nav className="flex-between py-3 px-5 border-b border-b-gray-100 max-sm:border-b-gray-300">
      <div className="grid lg:grid-cols-[15%_1fr] w-full ">
        <Logo />
        <div className="hidden lg:block ">
          <Search placeholder="What do you want to learn..." />
        </div>
      </div>
      <div className="hidden lg:flex-between space-x-6">
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
          <Link href={"/sign-up"}>
            <Button variant="secondaryPrimary">Create Account</Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
      <div className=" lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MdMenu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white px-0">
            <SheetHeader className="*:px-3">
              <div className="flex-center">
                <Logo />
              </div>
              <br />
              <div>
                <Search placeholder="Search Course..." />
              </div>
              <ul className="py-5 space-y-1.5">
                <li className="flex items-center border-b px-2.5 border-b-gray-200 shadow rounded-sm gap-4 py-2.5">
                  <BiCart className="w-7 h-7" />
                  <span className="text-lg text-gray-900">Cart</span>
                </li>
                <li className="flex items-center border-b px-2.5 border-b-gray-200 shadow rounded-sm gap-4 py-2.5">
                  <VscBell className="w-7 h-7" />
                  <span className="text-lg text-gray-900">Notifications</span>
                </li>
                <li className="flex items-center border-b px-2.5 border-b-gray-200 shadow rounded-sm gap-4 py-2.5">
                  <IoMdHeartEmpty className="w-7 h-7" />
                  <span className="text-lg text-gray-900">Bookmarks</span>
                </li>
              </ul>
            </SheetHeader>
            <SheetFooter className="absolute bottom-32 w-full px-3 !inline-block ">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-y-3">
                  <Link href={"/sign-up"}>
                    <Button variant="secondaryPrimary" className="w-full">Create Account</Button>
                  </Link>
                  <Link href={"/sign-in"}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                </div>
              ) : (
                <Link href={"/sign-in"}>
                  <Button variant={"ghost"} className="w-full">Logout</Button>
                </Link>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
