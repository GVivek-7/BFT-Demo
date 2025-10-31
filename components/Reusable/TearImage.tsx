"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const TearImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [isTorn, setIsTorn] = useState(false);

  const handleTear = () => {
    if (isTorn) return;
    setIsTorn(true);

    const tl = gsap.timeline();

    // Initial grip tension
    tl.to(rightRef.current, {
      x: 3,
      duration: 0.12,
      ease: "power1.in",
    });

    // Paper fights back slightly
    tl.to(rightRef.current, {
      x: -2,
      duration: 0.08,
      ease: "power1.out",
    });

    // Tear begins - sudden break
    tl.to(rightRef.current, {
      x: 15,
      rotateY: 8,
      duration: 0.12,
      ease: "power3.in",
    });

    // Rapid peel with 3D curl
    tl.to(
      rightRef.current,
      {
        x: 180,
        y: -15,
        rotate: 8,
        rotateY: 35,
        rotateX: -5,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Paper curls more as it separates
    tl.to(
      rightRef.current,
      {
        x: 280,
        y: 40,
        rotate: 25,
        rotateY: 55,
        rotateX: -10,
        duration: 0.45,
        ease: "power1.inOut",
      },
      "-=0.1"
    );

    // Free fall with tumbling
    tl.to(
      rightRef.current,
      {
        y: "+=120",
        rotate: 85,
        rotateY: 180,
        rotateX: 30,
        opacity: 0.4,
        duration: 0.7,
        ease: "power2.in",
      },
      "-=0.15"
    );

    // Final fade
    tl.to(
      rightRef.current,
      {
        opacity: 0,
        duration: 0.25,
      },
      "-=0.2"
    );
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        ref={containerRef}
        onClick={handleTear}
        className="relative w-full max-w-6xl h-[400px] cursor-pointer"
        style={{ 
          perspective: "1200px",
          filter: isTorn ? "none" : "drop-shadow(0 10px 20px rgba(0,0,0,0.15))"
        }}
      >
        {/* Left half - 70% - STAYS STATIC */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{
            width: "70%",
            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))"
          }}
        >
          <Image
          width={1000}
          height={1000}
            src="https://ik.imagekit.io/99y1fc9mh/BFT/Experience/ticket%201%20(1).png?updatedAt=1761903677703"
            alt="Left Half"
            className="w-full h-full object-cover object-left"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Right half - 30% - PEELS OFF */}
        <div
          ref={rightRef}
          className="absolute top-0 h-full overflow-hidden"
          style={{
            left: "70%",
            width: "30%",
            transformOrigin: "left center",
            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))",
            transformStyle: "preserve-3d"
          }}
        >
          <Image
          width={1000}
          height={1000}
            src="https://ik.imagekit.io/99y1fc9mh/BFT/Experience/ticket%202%20(1).png?updatedAt=1761903677447"
            alt="Right Half"
            className="w-full h-full object-contain object-left"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Perforation line - like real ticket */}
        <div 
          className="absolute inset-y-0 w-px pointer-events-none z-10"
          style={{
            left: "70%",
            transform: "translateX(-50%)"
          }}
        >
          <div className="w-full h-full" style={{
            backgroundImage: "linear-gradient(to bottom, #888 40%, transparent 40%, transparent 60%, #888 60%)",
            backgroundSize: "1px 8px",
            opacity: isTorn ? 0 : 0.4
          }} />
        </div>
      </div>

      <div className="absolute bottom-8 text-neutral-500 text-sm">
        {isTorn ? "Torn!" : "Click to tear"}
      </div>
    </div>
  );
};

export default TearImage;