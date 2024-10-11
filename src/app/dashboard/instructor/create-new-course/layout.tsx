"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { MdOndemandVideo, MdOutlineDateRange } from "react-icons/md";

const links: Array<{
  path: string;
  label: string;
  id: string;
  icon: ReactNode;
}> = [
  {
    path: "/dashboard/instructor/create-new-course",
    label: "Basic Information",
    id: "basic-info",
    icon: <FiLayers className="w-4 h-4" />,
  },
  {
    path: "/dashboard/instructor/create-new-course/advance-information",
    label: "Advance Information",
    id: "advance-info",
    icon: <MdOutlineDateRange className="w-4 h-4" />,
  },
  {
    path: "/dashboard/instructor/create-new-course/curriculum",
    label: "Curriculum",
    id: "curriculum",
    icon: <MdOndemandVideo className="w-4 h-4" />,
  },
  {
    path: "/dashboard/instructor/create-new-course/publish-course",
    label: "Publish Course",
    id: "publish-course",
    icon: <FaRegPlayCircle className="w-4 h-4" />,
  },
];

export default function CreateNewCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <section className="py-8">
      <ul
        className={`flex items-center justify-between *:w-full gap-1.5 bg-white border-b border-b-gray-100`}
      >
        {links.map((link) => (
          <Link key={link.id} href={link.path} className=" grid">
            <li
              className={`border-b-2 border-b-white ${
                pathname === link.path ? " !border-b-primary-500" : ""
              } cursor-pointer md:px-7 px-3 py-3`}
            >
              <div
                className={`flex items-center gap-1.5 justify-center w-full  h-full *:text-gray-500 *:hover:text-gray-900`}
              >
                <div
                  className={`lg:w-[15%] ${
                    pathname === link.path
                      ? "text-primary-500"
                      : "text-gray-500"
                  } `}
                >
                  {link.icon}
                </div>
                <div className="hidden lg:block text-nowrap flex-grow">
                  {link.label}
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="space-y-8 lg:space-y-5 *:bg-white *:rounded-sm">
        <div className=" py-1 pb-5">{children}</div>
      </div>
    </section>
  );
}
