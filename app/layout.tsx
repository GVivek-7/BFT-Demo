import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navigation/Navbar";
import LenisProvider from "@/components/Wrapper/LenisScroll";
import Footer from "@/components/Navigation/Footer";
import Background from "@/components/Reusable/Background";

const suisseIntl = localFont({
  src: [
    {
      path: "../fonts/SuisseIntl-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-suisseintl",
  display: "swap",
});

const heatherGreen = localFont({
  src: "../fonts/Heathergreen.otf",
  variable: "--font-heathergreen",
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
      <body
        className={`${suisseIntl.variable} ${heatherGreen.variable} antialiased`}
      >
        <LenisProvider>
          <Background>
            <Navbar />
            {children}
            <Footer />
          </Background>
        </LenisProvider>
      </body>
    </html>
  );
}
