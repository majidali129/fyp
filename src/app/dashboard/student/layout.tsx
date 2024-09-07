import Footer from "@/components/Footer";

export default function StudentDashboardLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>

        {children}
        <Footer />
      </>
    );
  }
