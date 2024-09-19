import React from "react";
import SideBar from "./SideBar";
import { useToggle } from "./NavToggleContext";
import Navbar from "./Navbar";
import ContentWrapper from "./ContentWrapper";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen max-h-screen">
      <SideBar />
      <main
        className={`flex-grow overflow-y-scroll layout-scroll md:ml-[70px] lg:ml-[220px] grid grid-rows-[75px_auto_60px] bg-gray-50 `}
      >
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
