import { ComponentProps, ReactNode } from "react";

interface SectionProp extends ComponentProps<"section"> {
  children: ReactNode;
}

const Section = ({ children, ...prop }: SectionProp) => {
  return (
    <section {...prop} className="w-full py-14">
      {children}
    </section>
  );
};

export default Section;
