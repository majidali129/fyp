// import Footer from "@/components/Footer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopNav from "@/components/TopNav";

export default function StudentDashboardLayout({
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
