"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StoriesImages } from "../../data/Home/Stories";
import Image from "next/image";
import Align from "../Reusable/Align";

const ParallaxImage = ({ src }: { src: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use pixel values instead of percentages - much faster
  const y = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up Framer Motion scroll listeners
      try {
        y.destroy?.();
        scrollYProgress.destroy?.();
      } catch {
        // Silently handle cleanup errors
      }
    };
  }, [y, scrollYProgress]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-lg w-full h-[300px] sm:h-[350px] md:h-[470px] relative"
    >
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={src}
          alt="Places"
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={false}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

const Stories = () => {
  return (
    <Align>
      <div className="py-20 flex flex-col items-center">
        <h1 className="mont text-[#141414] text-[30px] sm:text-[32px] md:text-[40px] font-semibold tracking-tighter leading-9 sm:leading-[42px] md:leading-[50px] mb-2 text-center uppercase">
          Chronicles of the Unknown
        </h1>
        <p className="text-[16px] sm:text-[20px] md:text-[24px] leading-6 sm:leading-7 md:leading-8 max-w-6xl font-light text-center px-4 tracking-normal">
          They said yes to uncertainty and found peace between surprise and
          stillness. These are stories of travelers who returned with more than
          memories — they came home to themselves.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-5 gap-2 pt-10 w-full">
          {StoriesImages.map((item, index) => (
            <ParallaxImage key={index} src={item.img} />
          ))}
        </div>
      </div>
    </Align>
  );
};

export default Stories;