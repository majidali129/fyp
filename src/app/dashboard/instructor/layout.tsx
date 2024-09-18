"use client";

import SideBar from "./_components/SideBar";
import { useState } from "react";

export default function InstructorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function handleSidebarToggle() {
    // setTimeout(() => {
      setIsSidebarOpen(!isSidebarOpen);
      // }, 300);
  }
  return (
    <section className="">
      <div className="flex min-h-screen max-h-screen">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
        <main className="flex-grow">{children}</main>
      </div>
    </section>
  );
}
