"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBarChartLine } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { IoLayersOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";

const links = [
  {
    path: "/dashboard/instructor",
    label: "Dashboard",
    id: 1,
    icon: BsBarChartLine,
  },
  {
    path: "/dashboard/instructor/create-new-course",
    label: "Create New Course",
    id: 6,
    icon: CiCirclePlus,
  },
  {
    path: "/dashboard/instructor/my-courses",
    label: "My Courses",
    id: 2,
    icon: IoLayersOutline,
  },
  {
    path: "/dashboard/instructor/earnings",
    label: "Earnings",
    id: 4,
    icon: BsBarChartLine,
  },
  {
    path: "/dashboard/instructor/messages",
    label: "Messages",
    id: 3,
    icon: IoChatbubbleEllipsesOutline,
  },
  {
    path: "/dashboard/instructor/settings",
    label: "Settings",
    id: 5,
    icon: SlSettings,
  },

];
const NavLinks = ({isSidebarOpen}: {isSidebarOpen: boolean}) => {
  const pathname = usePathname();
  return (
    <ul className={`px-2 ${!isSidebarOpen && 'px-2'} `}>
      {links.map((link) => (
        <li
          key={link.id}
          className={`text-gray-500 hover:text-gray-100  ${
            pathname === link.path ? "bg-secondary-500 text-white" : ""
          } cursor-pointer max-sm:rounded-sm  ${!isSidebarOpen && 'md:rounded-sm flex items-center justify-center'} md:rounded md:px-2 px-3 py-2.5`}
        >
          <Link
            href={link.path}
            className={`grid max-sm:place-items-start ${isSidebarOpen? 'grid-cols-[15%_auto]': 'grid-cols-[auto]'}  md:gap-2 text-[.9rem]`}
          >
            {" "}
            <link.icon className="md:w-5 md:h-5 w-6 h-6" />
            {isSidebarOpen && <div className="hidden sm:block text-nowrap">{link.label}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
