import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import logo from "../../../../../public/images/logoLight.png";
import logoForMobile from "../../../../../public/images/logoMobile.png";
import { IoMdLogOut } from "react-icons/io";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";

type SideBarProps = { isSidebarOpen: boolean; handleSidebarToggle: () => void };

const SideBar = ({ isSidebarOpen, handleSidebarToggle }: SideBarProps) => {
  return (
    <aside
      className={`bg-gray-950 min-h-screen md:w-[230px] transition-all duration-300 ease-in-out ${
        !isSidebarOpen
          ? "md:w-[70px] max-sm:absolute max-sm:-translate-x-full "
          : "w-[70px]"
      }`}
    >
      <div className="relative h-full">
        {/* TOGGLER */}
        <div
          onClick={() => handleSidebarToggle()}
          role="button"
          className={`cursor-pointer absolute bg-gray-900  rounded-full p-1.5 -right-6 top-4`}
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
              className={`h-11 flex items-center border-b border-b-gray-800 justify-start ${
                !isSidebarOpen && "justify-center"
              } `}
            >
              <Link
                href={"/"}
                className={`px-4 flex shrink-0 transition-all duration-300 ease-in-out ${
                  !isSidebarOpen
                    ? "md:!px-0 flex items-center justify-center"
                    : ""
                }`}
                // } border-b border-b-gray-900`}
              >
                {isSidebarOpen && (
                  <Image
                    src={logo}
                    alt="logo"
                    width={110}
                    className="hidden md:block"
                    priority
                  />
                )}
                <Image
                  src={logoForMobile}
                  alt="logo for mobile"
                  className={`md:hidden  ${!isSidebarOpen && "md:!block h-7"}`}
                  priority
                />
              </Link>
            </div>
            <NavLinks isSidebarOpen={isSidebarOpen} />
          </div>

          <div className=" max-sm:px-2" role="button">
            <div className="flex items-center max-sm:justify-center gap-2 py-3 max-sm:rounded-sm md:py-1.5 md:px-4 text-[.9rem] w-full text-gray-400 hover:text-white hover:bg-secondary-500">
              <IoMdLogOut className="md:w-5 md:h-5 h-6 w-6 shrink-0" />
              {isSidebarOpen && (
                <div className="hidden md:block text-nowrap">Sign-out</div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
