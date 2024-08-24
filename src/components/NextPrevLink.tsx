import React, { ReactNode } from "react";
import { Button } from "./ui/button";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import clsx from "clsx";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  direction?: "back" | "forward";
  className?: string;
  to?: string;
}

const NextPrevLink = ({
  children,
  className,
  direction = "forward",
  to,
  ...props
}: ButtonProps) => {
  if (direction === "forward") {
    return (
      <Link href={to as string}>
        <Button
          variant={"link"}
          className={clsx("gap-x-2.5", className)}
          {...props}
        >
          {children}
          <LuMoveRight />
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={"link"}
      className={clsx("gap-x-2.5", className)}
      {...props}
    >
      <LuMoveLeft />
      {children}
    </Button>
  );
};

export default NextPrevLink;
