"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBarChartLine } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { IoLayersOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useToggle } from "./NavToggleContext";

const links = [
  {
    path: "/dashboard/instructor",
    label: "Dashboard",
    id: 1,
    icon: <BsBarChartLine className="md:w-5 md:h-5 w-6 h-6" />,
  },
  {
    path: "/dashboard/instructor/create-new-course",
    label: "Create New Course",
    id: 6,
    icon: <CiCirclePlus className="md:w-5 md:h-5 w-6 h-6" />,
  },
  {
    path: "/dashboard/instructor/my-courses",
    label: "My Courses",
    id: 2,
    icon: <IoLayersOutline className="md:w-5 md:h-5 w-6 h-6" />,
  },
  {
    path: "/dashboard/instructor/earnings",
    label: "Earnings",
    id: 4,
    icon: <CiMoneyCheck1 className="w-6 h-6" />,
  },
  {
    path: "/dashboard/instructor/messages",
    label: "Messages",
    id: 3,
    icon: <IoChatbubbleEllipsesOutline className="md:w-5 md:h-5 w-6 h-6" />,
  },
  {
    path: "/dashboard/instructor/settings",
    label: "Settings",
    id: 5,
    icon: <SlSettings className="md:w-5 md:h-5 w-6 h-6" />,
  },
];
const NavLinks = () => {
  const { handleSidebarToggle, isSidebarOpen } = useToggle();
  const pathname = usePathname();

  return (
    <ul className={`px-2 !space-y-2.5 py-2 lg:py-3`}>
      {links.map((link) => {
        const isActive =
          pathname === link.path ||
          (link.path === "/dashboard/instructor/create-new-course" &&
            pathname.startsWith("/dashboard/instructor/create-new-course"));

        return (
          <Link
            key={link.id}
            href={link.path}
            className=" grid"
            onClick={() => isSidebarOpen && handleSidebarToggle()}
          >
            <li
              className={`text-gray-500 hover:text-gray-100  ${
                isActive ? "bg-secondary-500 text-white" : ""
              } cursor-pointer max-sm:rounded-sm md:rounded md:px-4 px-3 h-10`}
            >
              <div
                className={`flex items-center md:gap-0.5 justify-center w-full  h-full`}
              >
                {" "}
                <div className={`lg:w-[15%] `}>{link.icon}</div>
                <div className="hidden lg:block text-nowrap flex-grow">
                  {link.label}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavLinks;
