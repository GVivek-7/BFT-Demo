import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Montserrat } from "next/font/google";
import LayoutWrapper from "@/components/Navigation/LayoutWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const glacialIndifference = localFont({
  src: "../fonts/glacial-indifference.regular.otf",
  variable: "--font-glacial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blind Fold Trips",
  description:
    "Blind Fold Trips is a mystery travel platform where your destination remains a secret until you arrive at the airport! Get ready for a fun, spontaneous, and surprise-filled adventure. It's the ultimate experience for thrill-seekers and free spirits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${glacialIndifference.variable} antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}