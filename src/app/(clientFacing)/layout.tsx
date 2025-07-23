import type { Metadata } from "next";
import ClientNav from "@/components/clientNav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Diego Garcia, Realtor",
  description: "Diego Garcia is a realtor in the Chicago area and the surrounding suburbs. Diego assists sellers in maximizing property value, guides investors to profitable opportunities, and helps buyers find their ideal homes across the region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`antialiased`}>
      <ClientNav />
      {children}
      <Footer />
    </div>
  );
}
