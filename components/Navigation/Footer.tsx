"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navContents } from "../Constants";
import { BeginYourUnknownImage } from "../Data/Footer/BeginYourUnknownImage";
import { FooterSocailLinks } from "../Data/Footer/FooterSocials";
import Align from "../Reusable/Align";
import { GoArrowUpLeft } from "react-icons/go";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollY, setScrollY] = useState(0);
  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight + 200; // Start 200px before footer enters viewport

        if (footerTop < triggerPoint) {
          const relativeScroll = triggerPoint - footerTop;
          setScrollY(relativeScroll);
        } else {
          setScrollY(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black relative z-20" ref={footerRef}>
      <Image
        src="https://ik.imagekit.io/99y1fc9mh/BFT/Frame%20584.png?updatedAt=1760356098808"
        alt="Background Icons"
        className="object-cover w-full h-full absolute inset-0 pointer-events-none select-none"
        width={1000}
        height={1000}
      />
      <div className="md:h-[490px] h-[362px] w-full flex flex-col items-center bg-white rounded-b-[40px] overflow-hidden px-4 py-8 md:py-20 xl:h-[490px] lg:h-[490px]">
        <h1 className="font-heading text-[#141414] text-[28px] sm:text-[32px] md:text-[40px] font-semibold tracking-tighter leading-[36px] sm:leading-[42px] md:leading-[50px] mb-4 text-center">
          BEGIN YOUR UNKNOWN
        </h1>
        <p className="text-[16px] sm:text-[20px] md:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[32px] max-w-3xl text-center px-4">
          There&apos;s a wild, free version of you waiting — beyond plans,
          beyond screens, beyond control. Step forward. We&apos;ll lead with
          heart.
        </p>

        <button className="flex items-center bg-[#FFA62B] text-white font-semibold rounded-full pr-3 pl-1 py-1 transition-all duration-300 cursor-pointer group hover:bg-[#FFA62B] hover:text-white z-10 mt-5">
          <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full mr-3 transition-all duration-500 group-hover:bg-white">
            <GoArrowUpLeft
              size={25}
              className="text-[#FFA62B] text-base transition-all duration-500 group-hover:text-[#FFA62B]"
            />
          </div>
          <span className="tracking-wide text-sm sm:text-base transition-all duration-300">
            TAKE THE LEAP
          </span>
        </button>
        <div className="flex flex-row -space-x-10 mt-[6vh] z-100">
          {BeginYourUnknownImage.map((item, index) => {
            const parallaxOffset = scrollY * (0.05 + index * 0.02);

            return (
              <div
                key={index}
                className={`transition-all duration-500 ease-out group ${
                  index === 0
                    ? "mt-10 "
                    : index === 1
                    ? "mt-26 pr-1 rotate-2  "
                    : index === 2
                    ? "mt-33 pl-12 z-20 -rotate-2"
                    : "mt-25 z-10 rotate-5"
                }`}
                style={{
                  transform: `translateY(${-parallaxOffset}px) rotate(${
                    index === 0
                      ? "-14deg"
                      : index === 1
                      ? "20deg"
                      : index === 2
                      ? "-12deg"
                      : "15deg"
                  })`,
                }}
              >
                <Image
                  src={item.img}
                  alt={`unknown-${index}`}
                  width={1000}
                  height={1000}
                  className={`w-90 transition-all duration-500 ease-out cursor-pointer ${
                    index === 0
                      ? "group-hover:translate-x-[-15px] group-hover:translate-y-[-15px] group-hover:scale-103"
                      : index === 1
                      ? "group-hover:translate-x-[15px] group-hover:translate-y-[-15px] group-hover:scale-103"
                      : index === 2
                      ? "group-hover:translate-x-[-12px] group-hover:translate-y-[-18px] group-hover:scale-103"
                      : "group-hover:translate-x-[15px] group-hover:translate-y-[-10px] group-hover:scale-103"
                  } group-hover:shadow-2xl group-hover:z-50`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-black py-10 md:py-20 flex flex-col items-center">
        <Align className="w-full">
          {/* Top Navigation & Social Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap gap-6">
            {/* Nav Links */}
            <div className="flex flex-row flex-wrap gap-4 md:gap-6 justify-center">
              {navContents.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className="text-white text-[14px] md:text-[16px] transition-all duration-300 hover:text-[#E6AF2E] cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex flex-row gap-4 md:gap-5">
              {FooterSocailLinks.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className="transition-transform duration-300 hover:scale-103 cursor-pointer"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    width={40}
                    height={40}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Main Title */}
          <div className="w-full flex justify-center px-4 mt-8 md:mt-12">
            <h1
              className="font-bold text-center leading-tight break-words select-none"
              style={{
                fontSize: "clamp(3rem, 12vw, 200px)", // slightly smaller max size
                lineHeight: "clamp(3.2rem, 12.5vw, 210px)",
                background:
                  "linear-gradient(to bottom, #FFA62B 0%, #ff8900 70%, #000000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BlindFoldTrips
            </h1>
          </div>

          {/* Bottom Footer Info */}
          <div className="flex flex-col lg:flex-row justify-between text-white font-medium text-[14px] md:text-[18px] leading-[18px] md:leading-[20px] tracking-normal mt-6 md:mt-10 flex-wrap text-center lg:text-left gap-4">
            <div>© {currentYear} BlindFoldTrips. All Rights Reserved.</div>

            <div>
              Designed & Developed By{" "}
              <Link
                href="https://www.theinternetcompany.one/"
                target="_blank"
                className="relative text-white cursor-pointer transition-all duration-300
                           after:content-[''] after:absolute after:left-0 after:bottom-[-3px]
                           after:w-0 after:h-[2px] after:bg-white
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                The Internet Company
              </Link>
            </div>

            <div>
              <Link
                href="/privacy-policy"
                className="hover:text[#FFA62B]] transition-all duration-300 cursor-pointer"
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                href="/terms"
                className="hover:text-[#FFA62B] transition-all duration-300 cursor-pointer"
              >
                Terms & Condition
              </Link>
            </div>
          </div>
        </Align>
      </div>
    </div>
  );
};

export default Footer;
