import Banner from "./_components/Banner";
import Footer from "./_components/Footer";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      {children}
      <Footer />
    </>
  );
}
