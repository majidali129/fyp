import { ReactNode } from "react";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`container max-w-6xl md:max-w-3xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl `}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
