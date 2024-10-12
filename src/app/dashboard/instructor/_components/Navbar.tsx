"use client";

import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import user from "../../../../../public/images/instructor.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Helper function to format the current path
const formatCurrentPath = (pathname: string) => {
  const pathSegments = pathname.split("/").slice(1);

  if (pathSegments.length < 3) return "Dashboard";
  const lastSegment =
    pathSegments.length > 3 ? pathSegments.at(-2) : pathSegments.at(-1);

  return (
    lastSegment
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Dashboard"
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const currentPath = formatCurrentPath(pathname);

  return (
    <nav className="bg-white py-3.5">
      <div className="container max-w-6xl md:max-w-3xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-6xl max-sm:space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Good Morning</p>
            <h4>{currentPath}</h4>
          </div>

          <div className="grid grid-cols-[30px_40px] md:grid-cols-[auto_30px_40px] items-center gap-3">
            <SearchInput className="hidden md:block" />
            <Button
              variant="transparentGhost"
              size="icon"
              className="w-9 h-9 -ml-0.5"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Image
              src={user}
              width={30}
              height={30}
              priority
              alt="instructor-profile-photo"
              className="rounded-full h-9 md:h-10 w-9 md:w-10"
            />
          </div>
        </div>

        {/* Mobile Search Input */}
        <SearchInput className="md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;

function SearchInput({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input placeholder="Search" className="pl-8 bg-gray-50" />
    </div>
  );
}
