import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

interface SectionProp extends ComponentProps<"section"> {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className, ...props }: SectionProp) => {
  return (
    <section
      id="wrapper"
      className={clsx("w-full md:p-11 max-sm:py-10", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
