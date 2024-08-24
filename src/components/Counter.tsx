import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

interface CounterProps extends ComponentProps<"div"> {
  children: ReactNode;
  className?: string;
}

const Counter = ({ children, className, ...props }: CounterProps) => {
  return (
    <div
      className={clsx(
        "flex-center w-5 h-5 rounded-full text-lg font-bold bg-secondary-100 text-secondary-500 p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Counter;
