import React, { ReactNode } from "react";
import { Button } from "./ui/button";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  direction?: "back" | "forward";
}

const LinkBtn = ({
  children,
  direction = "forward",
  ...props
}: ButtonProps) => {
  if (direction === "forward") {
    return (
      <Button variant={"link"} className="gap-x-2.5" {...props}>
        {children}
        <LuMoveRight />
      </Button>
    );
  }

  return (
    <Button variant={"link"} className="gap-x-2.5" {...props}>
      <LuMoveLeft />
      {children}
    </Button>
  );
};

export default LinkBtn;
