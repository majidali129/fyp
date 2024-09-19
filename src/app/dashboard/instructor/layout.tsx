"use client";

import Layout from "./_components/Layout";
import { NavToggleContextProvider } from "./_components/NavToggleContext";

export default function InstructorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <NavToggleContextProvider>
        <Layout>
          {children}
        </Layout>
    </NavToggleContextProvider>
  );
}
