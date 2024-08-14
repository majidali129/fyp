import AuthNav from "@/components/AuthNav";
import { Suspense } from "react";
import Loading from "./loading";

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen">
      <AuthNav />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
