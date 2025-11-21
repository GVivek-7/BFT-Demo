"use client";
import React from "react";
import { Mountain2, ExperienceHeroBG } from "@/assets/Experience";

const Hero: React.FC = () => {
  return (
    <div 
      id="hero-section" 
      className="relative w-full h-screen overflow-hidden bg-[#5DBBCE]" 
      suppressHydrationWarning
    >
      {/* Background Sky Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={ExperienceHeroBG}
          alt="Experience Background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Text Content - Positioned right above palace on mobile */}
      <div className="absolute left-0 right-0 flex flex-col items-center px-4 bottom-[55%] sm:bottom-auto sm:top-[10%] md:top-[12%] lg:top-[12%]">
        <p className="text-white text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-light tracking-wide mb-1 sm:mb-2 md:mb-3 relative z-50">
          The Blindfold
        </p>
        <h1 className="mont text-[#FFA726] text-[50px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] font-bold tracking-tighter leading-[50px] sm:leading-[60px] md:leading-[100px] lg:leading-[120px] xl:leading-[140px] text-center uppercase relative z-30">
          EXPERIENCE
        </h1>
      </div>

      {/* Palace Monument at Bottom - Responsive height, higher on mobile */}
      <div className="absolute bottom-0 left-0 w-full h-[72%] sm:h-[68%] md:h-[65%] lg:h-[63%] xl:h-[65%] z-40 pointer-events-none">
        <img
          src={Mountain2}
          alt="Monument"
          className="w-full h-full object-cover object-bottom"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default Hero;
