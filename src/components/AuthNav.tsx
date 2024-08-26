"use client";

import Image from "next/image";
import logo from "../../public/images/logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AuthNav = () => {
  const pathName = usePathname();
  return (
    <nav className="h-16 border-b border-b-gray-100  flex items-center justify-between md:px-16">
      <Link href={"/"}>
        <Image
          src={logo}
          height={50}
          width={120}
          alt="lms-logo"
          priority
          className="object-cover"
        />
      </Link>
      <div>
        {pathName === "/sign-in" ? (
          <div>
            <span>Don&apos;t have an account? </span>
            <Link href={"/sign-up"} className="text-primary-500">Sign Up</Link>
          </div>
        ) : pathName === "/sign-up" ? (
          <div>
            <span>Already have an account? </span>
            <Link href={"/sign-in"} className="text-primary-500">Sign In</Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default AuthNav;
