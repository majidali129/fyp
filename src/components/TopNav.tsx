"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/about-us",
    name: "About"
  },
  {
    path: "/courses",
    name: "Courses"
  },
  {
    path: "/contact-us",
    name: "Contact"
  }
];

const TopNav = () => {
  const pathName = usePathname();

  console.log(pathName === links[1].path);

  return (
    <nav className="hidden md:flex-between bg-gray-900  px-5 text-[.9rem]">
      <ul className="flex-between !gap-x-5  *:text-gray-500 hover:*:text-gray-white">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`link py-2 ${
              pathName === link.path
                ? " !text-gray-white border-t border-t-primary-500"
                : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default TopNav;
