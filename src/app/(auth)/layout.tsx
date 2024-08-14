import AuthNav from "@/components/AuthNav";
import { Suspense } from "react";
import Loading from "./loading";

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <section className="min-h-screen overflow-y-hidden">
        <AuthNav />
        {children}
      </section>
    </Suspense>
  );
}
