"use client";

import { NavToggleContextProvider } from "./_components/NavToggleContext";
import SideBar from "./_components/SideBar";

export default function InstructorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavToggleContextProvider>
      <section className="">
        <div className="flex min-h-screen max-h-screen">
          <SideBar />
          <main className="flex-grow">{children}</main>
        </div>
      </section>
    </NavToggleContextProvider>
  );
}
