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

      {/* Text Content - Fully responsive positioning */}
      <div className="absolute left-0 right-0 flex flex-col items-center px-4 bottom-[55%] xs:bottom-[58%] sm:bottom-auto sm:top-[8%] md:top-[10%] lg:top-[12%] xl:top-[12%]">
        <p className="text-white text-[18px] xs:text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-light tracking-wide mb-1 sm:mb-2 md:mb-3 relative z-50">
          The Blindfold
        </p>
        <h1 className="mont text-[#FFA726] text-[45px] xs:text-[50px] sm:text-[60px] md:text-[90px] lg:text-[110px] xl:text-[130px] 2xl:text-[140px] font-bold tracking-tighter leading-[45px] xs:leading-[50px] sm:leading-[60px] md:leading-[90px] lg:leading-[110px] xl:leading-[130px] 2xl:leading-[140px] text-center uppercase relative z-30 max-w-[95%] sm:max-w-full">
          EXPERIENCE
        </h1>
      </div>

      {/* Palace Monument at Bottom - Fills width while showing full image */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[68%] xs:h-[70%] sm:h-[62%] md:h-[60%] lg:h-[58%] xl:h-[60%] 2xl:h-[62%] z-40 pointer-events-none overflow-hidden">
        <img
          src={Mountain2}
          alt="Monument"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto min-w-full"
          loading="eager"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'bottom center'
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
