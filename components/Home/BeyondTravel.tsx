"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { BeyondTravelContents } from "../Data/Home/BeyondTravel";



const BeyondTravel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Smooth cursor animation with lerp
  useEffect(() => {
    const animate = () => {
      if (cursorRef.current && hoveredIndex !== null) {
        const dx = targetPositionRef.current.x - currentPositionRef.current.x;
        const dy = targetPositionRef.current.y - currentPositionRef.current.y;

        // Smooth easing
        currentPositionRef.current.x += dx * 0.15;
        currentPositionRef.current.y += dy * 0.15;

        cursorRef.current.style.transform = `translate(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hoveredIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Reset both target and current position to prevent glitching
    targetPositionRef.current = { x, y };
    currentPositionRef.current = { x, y };
    setHoveredIndex(index);

    // Immediately update cursor position
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      {BeyondTravelContents.map((item, index) => (
        <div
          key={index}
          className="relative w-full h-[800px] bg-cover bg-center overflow-hidden md:cursor-none"
          style={{ backgroundImage: `url(${item.img})` }}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          {/* Content */}
          <div
            className={`absolute text-white md:p-6 p-3 ${
              index === 0 ? "top-5 left-5" : "bottom-5 left-5"
            }`}
          >
            <h2 className="font-heading md:text-[40px] text-[30px] md:leading-[50px] leading-[40px] tracking-tighter uppercase font-semibold mb-2 max-w-lg">
              {item.title}
            </h2>
            <p className="md:text-[20px] text-[14px] leading-[16px] md:leading-[26px] max-w-xl mb-4">
              {item.desc}
            </p>

            {/* Mobile: Static Button below paragraph */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full backdrop-blur-md bg-white/2 border border-white/20 shadow-xl w-fit">
                <div className="flex items-center justify-center bg-white p-2 rounded-full text-white">
                  <GoArrowUpLeft size={20} className="text-black" />
                </div>

                <span className="text-white font-medium text-xs tracking-wide uppercase whitespace-nowrap">
                  {item.buttonText}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: Glassmorphism Button Cursor */}
          {hoveredIndex === index && (
            <div
              ref={cursorRef}
              className="hidden lg:block absolute pointer-events-none z-50 top-0 left-0"
            >
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full backdrop-blur-md bg-white/2 border border-white/20 shadow-xl -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center justify-center bg-white p-2 rounded-full text-white">
                  <GoArrowUpLeft size={25} className="text-black" />
                </div>

                <span className="text-white font-medium text-sm tracking-wide uppercase whitespace-nowrap">
                  {item.buttonText}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BeyondTravel;