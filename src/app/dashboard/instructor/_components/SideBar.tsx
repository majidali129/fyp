import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import logo from "../../../../../public/images/logoLight.png";
import logoForMobile from "../../../../../public/images/logoMobile.png";
import { IoMdLogOut } from "react-icons/io";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import { useToggle } from "./NavToggleContext";

const SideBar = () => {
  const { isSidebarOpen, handleSidebarToggle } = useToggle();
  return (
    <aside
      className={`bg-gray-950 min-h-dvh h-full w-[70px] lg:w-[220px] transition-all duration-200 top-0 left-0 ease-in-out fixed z-50  ${
        !isSidebarOpen ? "max-sm:absolute max-sm:-translate-x-full" : "w-[70px]"
      } `}
    >
      <div className="relative h-full">
        {/* TOGGLER */}
        <div
          onClick={() => handleSidebarToggle()}
          role="button"
          aria-expanded={isSidebarOpen}
          className={`cursor-pointer absolute bg-gray-900  rounded-full p-1.5 -right-3 top-4 md:hidden`}
        >
          {isSidebarOpen ? (
            <BsChevronDoubleLeft className="w-3 h-3 text-gray-100" />
          ) : (
            <BsChevronDoubleRight className=" w-3 h-3 text-gray-100" />
          )}
        </div>

        <nav className="flex flex-col justify-between h-full pb-4 py-2">
          <div className=" space-y-3">
            <div
              className={`h-11 flex items-center border-b border-b-gray-800 justify-start `}
            >
              <Link
                href={"/"}
                className={`px-5 flex shrink-0 transition-all duration-300 ease-in-out`}
              >
                <Image
                  src={logo}
                  alt="logo"
                  width={110}
                  className="hidden lg:block"
                  priority
                />
                <Image
                  src={logoForMobile}
                  alt="logo for mobile"
                  className={`lg:hidden`}
                  priority
                />
              </Link>
            </div>
            <NavLinks />
          </div>

          <div className=" max-sm:px-2" role="button">
            <div className="flex items-center max-sm:justify-center gap-2 py-3 max-sm:rounded-sm md:py-1.5 md:px-6 text-[.9rem] w-full text-gray-400 hover:text-white hover:bg-secondary-500">
              <IoMdLogOut className="md:w-5 md:h-5 h-6 w-6 shrink-0" />
                <div className="hidden lg:block text-nowrap">Sign-out</div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
