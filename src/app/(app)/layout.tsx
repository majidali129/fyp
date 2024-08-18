import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}