"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Fort } from "@/assets/Contact";

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${
          scrollY * 0.3
        }px, 0)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;

        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-dvh w-full relative overflow-hidden " suppressHydrationWarning>
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/99y1fc9mh/BFT/Contact/Gemini_Generated_Image_qlcuptqlcuptqlcu%201.png?updatedAt=1762926332738')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div
        ref={textRef}
        className="absolute top-43 left-20 inset-0 flex flex-col items-start justify-start will-change-transform"
      >
        <p className="text-[34px] leading-9 text-white">Let’s Plan the Unknown</p>
        <h1 className="text-[#E6AF2E] text-[120px] font-bold mont tracking-tighter leading-[122px] text-center uppercase">
        Together
        </h1>
      </div>

      <Image
        src={Fort}
        alt="Mountain"
        width={1000}
        height={1000}
        className="absolute bottom-0 w-full h-full object-cover pointer-events-none"
        priority
      />
    </div>
  );
};

export default Hero;
