"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StoriesImages } from "../Data/Home/Stories";
import Image from "next/image";
import Align from "../Reusable/Align";

const ParallaxImage = ({ src }: { src: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Move image slightly as you scroll (adjust range for effect intensity)
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div 
      ref={ref} 
      className="overflow-hidden rounded-lg w-full h-[300px] sm:h-[350px] md:h-[400px] relative"
    >
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={src}
          alt="Places"
          fill
          className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg"
        />
      </motion.div>
    </div>
  );
};

const Stories = () => {
  return (
    <Align>
      <div className="py-20 flex flex-col items-center">
        <h1 className="font-heading text-[#141414] text-[30px] sm:text-[32px] md:text-[40px] font-semibold tracking-tighter leading-[36px] sm:leading-[42px] md:leading-[50px] mb-2 text-center">
          STORIES FROM THE UNSEEN
        </h1>
        <p className="text-[16px] sm:text-[20px] md:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[32px] max-w-3xl text-center px-4">
          They trusted the process, embraced the unknown, and came back changed —
          not by the places they saw, but by the peace they found.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-2 pt-10 w-full">
          {StoriesImages.map((item, index) => (
            <ParallaxImage key={index} src={item.img} />
          ))}
        </div>
      </div>
    </Align>
  );
};

export default Stories;