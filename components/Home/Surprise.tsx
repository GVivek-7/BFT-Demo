"use client";
import React, { useRef, useEffect, useState } from "react";
import Heading from "../Reusable/UI/Heading";
import Align from "../Reusable/Align";

const Surprise: React.FC = () => {
  const [offsetY, setOffsetY] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollPercent = -rect.top / (rect.height + window.innerHeight);
            // Adjust multiplier (200) to control parallax speed
            setOffsetY(scrollPercent * 500);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="py-20 w-full flex items-start justify-start">
      <div
        ref={sectionRef}
        className="flex flex-col items-start md:gap-5 gap-4 w-full h-[740px] relative overflow-hidden"
      >
        {/* Parallax Background Layer */}
        <div
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/99y1fc9mh/BFT/Frame%20606.png?updatedAt=1762597499115')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transform: `translateY(${offsetY}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="absolute inset-0 w-full h-full"
        />

        {/* Content Layer */}
        <Align className="w-full flex flex-col items-start justify-center gap-5 py-15 relative z-10">
          <div className="flex">
            <Heading title="THE SCIENCE OF SURPRISE" />
          </div>

          <h1 className="text-white md:text-[40px] text-[30px] md:leading-10 leading-[30px] uppercase mont font-semibold">
            The Psychology of <span className="text-[#FFA62B]">Surprise</span>
          </h1>
          
          <p className="text-white md:text-[20px] text-[14px] md:leading-6 leading-4 text-start max-w-3xl font-light">
            Behind every blindfold lies a crafted symphony of design and emotion. We translate your rhythm, pace, and presence into a journey that feels alive. This isn&apos;t randomness — it&apos;s resonance.
            <br />
          </p>
          
          <p className="text-white md:text-[20px] text-[14px] md:leading-6 leading-4 text-start max-w-xl font-light">
            Every blindfold conceals a map written in emotion. We simply follow
            your heartbeat to where you&apos;re meant to be.
          </p>
        </Align>
      </div>
    </div>
  );
};

export default Surprise;