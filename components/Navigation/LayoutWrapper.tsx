
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import LenisProvider from "@/wrapper/LenisScroll";
import Background from "../Reusable/Background";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes that should hide Navbar and Footer
  const hideLayout = pathname.startsWith("/questionnaire") ||  
                     ["/sign-in", "/sign-up", "/forgot-password"].includes(pathname);

  return (
    <LenisProvider key={pathname}>
         <Background>
      <Navbar />
      {children}
      {!hideLayout && <Footer />}
      </Background>
    </LenisProvider>
  );
}
