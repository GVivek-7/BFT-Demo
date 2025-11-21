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

      {/* Text Content - Moved higher to show entire palace image */}
      <div className="absolute left-0 right-0 flex flex-col items-center px-4 bottom-[58%] xs:bottom-[60%] sm:bottom-auto sm:top-[3%] md:top-[4%] lg:top-[5%] xl:top-[6%]">
        <p className="text-white text-[18px] xs:text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-light tracking-wide mb-1 sm:mb-2 md:mb-3 relative z-50">
          The Blindfold
        </p>
        <h1 className="mont text-[#FFA726] text-[45px] xs:text-[50px] sm:text-[60px] md:text-[90px] lg:text-[110px] xl:text-[130px] 2xl:text-[140px] font-bold tracking-tighter leading-[45px] xs:leading-[50px] sm:leading-[60px] md:leading-[90px] lg:leading-[110px] xl:leading-[130px] 2xl:leading-[140px] text-center uppercase relative z-30 max-w-[95%] sm:max-w-full">
          EXPERIENCE
        </h1>
      </div>

      {/* Palace Monument at Bottom - Adjusted for Mac screens */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[68%] xs:h-[70%] sm:h-[62%] md:h-[60%] lg:h-[62%] xl:h-[65%] 2xl:h-[68%] z-40 pointer-events-none">
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
