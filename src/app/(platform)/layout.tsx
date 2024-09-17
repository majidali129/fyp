import Footer from "@/components/Footer";
import Banner from "./_components/Banner";
import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <TopNav />
    <Navbar />
      <Banner />
      {children}
      <Footer />
    </>
  );
}
