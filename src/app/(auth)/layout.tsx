import AuthNav from "@/components/AuthNav";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen">
      <AuthNav />
      {children}
    </section>
  );
}
