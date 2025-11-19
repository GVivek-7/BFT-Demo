"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Mountain2 } from "@/assets/Experience";

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
            "url('https://ik.imagekit.io/99y1fc9mh/BFT/Experience/bft%20banner%204.png?updatedAt=1761896072995')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div
        ref={textRef}
        className="absolute md:top-70 top-65 inset-0 flex flex-col items-center justify-start will-change-transform"
      >
        <p className="md:text-[34px] text-[24px] md:leading-9 text-white">THE BLINDFOLD</p>
        <h1 className="text-[#E6AF2E] md:text-[120px] text-[60px] font-bold font-heading tracking-tighter leading-[62px] md:leading-[122px] text-center">
          EXPERIENCE
        </h1>
      </div>

      <Image
        src={Mountain2}
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
