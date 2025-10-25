"use client";
import React from "react";
import Heading from "../Reusable/UI/Heading";
import Image from "next/image";
import Align from "../Reusable/Align";
import SwipeButton from "../Reusable/UI/Button";
import { ExperienceContents } from "../Data/Home/ExperinceContents";

const Experience = () => {
  return (
    <Align>
      <div className="flex md:flex-row flex-col items-center justify-center md:gap-20  gap-8 md:py-20 md:pt-40 pt-40 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <Heading title="OUR EXPERIENCES" />
          </div>

          <h1 className="text-[#141414] md:text-[40px] text-[30px] font-medium tracking-tight md:leading-[45px] leading-[35px] md:mb-2 md:max-w-sm max-w-[280px] uppercase">
            Four Journeys. One Emotion Freedom.
          </h1>
          <p className="text-black font-light md:text-[24px] text-[14px] md:leading-[28px] leading-[16px] md:mb-8 max-w-xl">
            Every journey is a mirror — reflecting what your soul secretly
            seeks. Choose the path that speaks to your emotion, not your logic.
          </p>
        </div>

        <div
          className="flex flex-row overflow-x-auto overflow-y-hidden gap-6 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ExperienceContents.map((content, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative group cursor-pointer"
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
                <h3 className="text-white text-[22px] font-semibold mb-2">
                  {content.title}
                </h3>
                <p className="text-white/90 text-[16px] leading-[20px]">
                  {content.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <SwipeButton />
      </div>
    </Align>
  );
};

export default Experience;
