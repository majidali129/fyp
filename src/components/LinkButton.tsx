import React, { ReactNode } from "react";
import { Button } from "./ui/button";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import clsx from "clsx";
import Link from "next/link";

interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  to: string;
}

const LinkButton = ({ children, to, className }: LinkButtonProps) => {
  return (
    <Link
      href={to}
      className={clsx(
        "flex-center w-fit py-2.5 bg-gray-white hover:bg-gray-white/95 text-primary-500 px-5 gap-x-2.5",
        className
      )}
    >
      {children}
      <LuMoveRight />
    </Link>
  );
};

export default LinkButton;
