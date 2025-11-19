"use client";
import React, { useRef } from "react";
import Heading from "../Reusable/UI/Heading";
import Image from "next/image";
import Align from "../Reusable/Align";
import { ExperienceContents } from "../../data/Home/ExperinceContents";
import { GoArrowUpLeft } from "react-icons/go";
import Button from "../Reusable/UI/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Experience = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Align>
      <div className="flex lg:flex-row flex-col lg:items-center justify-center md:gap-20  gap-8  md:pt-40 pt-20 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <Heading title="OUR EXPERIENCES" />
          </div>

          <h1 className="mont text-[#141414] md:text-[40px] text-[30px] font-semibold tracking-tight md:leading-[45px] leading-[35px] md:mb-2 md:max-w-sm max-w-[280px] uppercase">
            Four Journeys. One Emotion Freedom.
          </h1>
          <p className="text-black font-light md:text-[24px] text-[14px] md:leading-7 leading-4 md:mb-8 max-w-xl">
            Every journey is a mirror — reflecting what your soul secretly
            seeks. Choose the path that speaks to your emotion, not your logic.
          </p>
             <Button
            label="SWIPE TO UNLOCK SURPRISE TRIP"
            bgColor="#FFA62B"
            textColor="#FFFFFF"
            logo={<GoArrowUpLeft size={22} color="#000" />}
            logoBg="#FFFFFF"
            height="h-12"
            width="w-75"
          />
        </div>

        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto overflow-y-hidden gap-6 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ExperienceContents.map((content, index) => (
            <div
              key={index}
              className="shrink-0 relative group cursor-pointer"
            >
              <Image
                src={content.img}
                alt={content.title}
                width={370}
                height={586}
                className="md:w-[276px] md:h-[450px] h-[380px] w-[232px] rounded-[20px] object-cover"
              />

              <div
                className={`absolute left-0 right-0 rounded-[20px] p-6 ${
                  index % 2 === 0 ? "top-0" : "bottom-0"
                }`}
              >
                <h3 className="text-white text-[22px] font-semibold mb-2 mont leading-[100%]">
                  {content.title}
                </h3>
                <p className="text-white/90 font-light text-[16px] leading-5">
                  {content.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
          aria-label="Scroll left"
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
          aria-label="Scroll right"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </Align>
  );
};

export default Experience;
