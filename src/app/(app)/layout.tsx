import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <Navbar />

      {children}
      <Footer />
    </>
  );
}
