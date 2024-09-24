"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="bg-white">
      <div className="container max-w-6xl md:max-w-3xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-6xl h-full">
        <div className="flex-between h-full">
          <div>
            <span>Good Morning</span>
            <h5>Dashboard</h5>
          </div>
          <div>slkdsd</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
