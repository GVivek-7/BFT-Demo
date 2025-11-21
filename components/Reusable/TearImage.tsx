"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MdFlight } from "react-icons/md";
import { useRouter } from "next/navigation";

interface TearImageProps {
  destinationUrl?: string;
  sectionId?: string;
}

const TearImage: React.FC<TearImageProps> = ({ destinationUrl = "/questionnaire", sectionId }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const [isTorn, setIsTorn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0.05); // Start at 50%

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTorn) return;
    e.preventDefault();
    
    // On mobile (touch), trigger tear immediately on click
    if ('touches' in e) {
      executeTear();
      return;
    }
    
    setIsDragging(true);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging || isTorn || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const progress = Math.max(0, Math.min(1, relativeY / rect.height));
    
    setDragProgress(progress);

    // Trigger tear at 90%
    if (progress >= 0.9) {
      executeTear();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientY);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isTorn) {
      // Smooth return to 50% if not torn
      setDragProgress(0.5);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [isDragging, isTorn]);

  const executeTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    setIsDragging(false);

    const right = rightRef.current;
    if (!right) return;

    const animations = [
      { x: 15, rotateY: 1, duration: 120, ease: "ease-in" },
      {
        x: 180,
        y: -15,
        rotateY: 25,
        duration: 500,
        ease: "ease-out",
      },
      { x: 190, y: -15, rotateY: 25, opacity: 0, duration: 250 },
    ];

    let delay = 0;
    animations.forEach((anim, i) => {
      setTimeout(() => {
        const {
          x = 0,
          y = 0,
          rotateY = 0,
          opacity = 1,
          duration,
          ease,
        } = anim;
        right.style.transition = `transform ${duration}ms ${ease}, opacity ${duration}ms ${ease}`;
        right.style.transform = `translateX(${x}px) translateY(${y}px) rotateY(${rotateY}deg)`;
        if (i === animations.length - 1) {
          right.style.opacity = opacity.toString();
        }
      }, delay);
      delay += anim.duration;
    });

    // Navigate after animation completes
    setTimeout(() => {
      // Store the section ID in sessionStorage before navigating
      if (sectionId) {
        sessionStorage.setItem('returnSection', sectionId);
      }
      router.push(destinationUrl);
    }, delay + 300);
  };

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div
        ref={containerRef}
        className="relative w-full md:max-w-6xl mx-auto h-[110px] sm:h-[250px] md:h-[400px] md:rounded-2xl rounded-md"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Left half - 77.5% - STAYS STATIC */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{
            width: "77.5%",
          }}
        >
          <Image
            src="https://ik.imagekit.io/99y1fc9mh/BFT/Experience/image-gen%201%20(1).png?updatedAt=1762856181178"
            alt="Left Half"
            className="w-full h-full object-cover rounded-2xl"
            width={1000}
            height={1000}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              width: "129.032%",
              maxWidth: "129.032%",
            }}
          />
        </div>

        {/* Right half - 22.5% - PEELS OFF */}
        <div
          ref={rightRef}
          className="absolute top-0 h-full overflow-hidden"
          style={{
            left: "77.5%",
            width: "22.5%",
            transformOrigin: "left center",
            
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="https://ik.imagekit.io/99y1fc9mh/BFT/Experience/image-gen%201%20(1).png?updatedAt=1762856181178"
            width={1000}
            height={1000}
            alt="Right Half"
            className="w-full h-full object-cover rounded-2xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              width: "444.444%",
              maxWidth: "444.444%",
              marginLeft: "-344.444%",
              transform: "translateX(0)",
            }}
          />
        </div>

        {/* Perforation line - like real ticket */}
        <div
          className="absolute inset-y-0 w-px pointer-events-none z-10 flex items-center"
          style={{
            left: "77.5%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #888 40%, transparent 40%, transparent 60%, #888 60%)",
              backgroundSize: "3px 12px",
            }}
          />
        </div>

        {/* Draggable Circle Handle - Always visible */}
        <div
          ref={handleRef}
          className="absolute z-20"
          style={{
            left: "77.5%",
            top: `${dragProgress * 100}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            transition: isDragging ? "none" : "top 0.3s ease-out",
          }}
        >
          {/* Flight icon - always visible and draggable */}
          <div 
            className={`${!isDragging && !isTorn ? 'animate-bounce' : ''}`}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{
              pointerEvents: "auto",
              cursor: isTorn ? "default" : (isDragging ? "grabbing" : "grab"),
              opacity: isTorn ? 0 : 1,
              transition: "opacity 0.3s ease-out",
            }}
          >
            <MdFlight className="rotate-180 size-8 sm:size-10 md:size-12 text-[#04256C]" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 sm:bottom-8 text-neutral-400 text-xs sm:text-sm text-center px-4">
        {isTorn ? "Redirecting..." : isDragging ? `${Math.round(dragProgress * 100)}% - ${dragProgress >= 0.9 ? 'Release to tear!' : 'Keep dragging...'}` : "Drag the icon down to tear"}
      </div>
    </div>
  );
};

export default TearImage;