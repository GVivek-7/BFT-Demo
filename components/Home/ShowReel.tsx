"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Mountain } from '@/assets/home';
import { FaTimes } from "react-icons/fa";
import { GoArrowUpLeft } from 'react-icons/go';

const ShowReel: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Smooth cursor animation
  useEffect(() => {
    const animate = () => {
      if (cursorRef.current && hoveredIndex !== null) {
        const dx = targetPositionRef.current.x - currentPositionRef.current.x;
        const dy = targetPositionRef.current.y - currentPositionRef.current.y;

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

  // Parallax scroll effect
  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const sectionTop = document.getElementById('showreel-section')?.offsetTop || 0;
      const relativeScroll = scrollY - sectionTop;
      
      if (relativeScroll > -window.innerHeight && relativeScroll < window.innerHeight) {
        if (textRef.current) {
          textRef.current.style.transform = `translate3d(0, ${relativeScroll * 0.5}px, 0)`;
        }
        if (mountainRef.current) {
          mountainRef.current.style.transform = `translate3d(0, ${relativeScroll * 0.18}px, 0)`;
        }
      }
      
      ticking = false;
      rafId = null;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetPositionRef.current = { x, y };
    currentPositionRef.current = { x, y };
    setHoveredIndex(0);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoOpen(true);
  };

  const handleCloseClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVideoOpen(false);
  };
  
  return (
    <>
      <div 
        id="showreel-section" 
        className='h-dvh w-full relative overflow-hidden cursor-none'
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handlePlayClick}
      >
        {/* Fixed Background */}
        <div 
          className='absolute inset-0 w-full h-full'
          style={{ 
            backgroundImage: "url('https://ik.imagekit.io/99y1fc9mh/BFT/image%2094.png?updatedAt=1761330849402')",    
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", 
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
          }}
        />
        
        {/* Parallax Text */}
        <div 
          ref={textRef}
          className='absolute top-42 inset-0 flex flex-col items-center justify-start will-change-transform pointer-events-none'
        >
          <h1 className='text-white md:text-[120px] text-[35px] font-medium font-heading tracking-tighter leading-[122px] text-center'>
            WATCH SHOWREEL
          </h1>
        </div>
        
        {/* Parallax Mountain */}
        <div 
          ref={mountainRef}
          className='absolute bottom-0 w-full h-full pointer-events-none will-change-transform'
        >
          <Image 
            src={Mountain}
            alt="Mountain" 
            width={1000}
            height={1000}
            className='w-full h-full object-cover'
            priority
          />
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div 
            onClick={handlePlayClick}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full backdrop-blur-md bg-white/2 border border-white/20 shadow-xl w-fit cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-center bg-white p-2 rounded-full text-white">
              <GoArrowUpLeft size={20} className="text-black" />
            </div>

            <span className="text-white font-medium text-xs tracking-wide uppercase whitespace-nowrap">
              PLAY SHOWREEL
            </span>
          </div>
        </div>

        {/* Custom Cursor for Desktop */}
        {hoveredIndex !== null && (
          <div
            ref={cursorRef}
            className="hidden lg:block absolute pointer-events-none z-50 top-0 left-0"
          >
            <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full backdrop-blur-md bg-white/2 border border-white/20 shadow-xl -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-center bg-white p-2 rounded-full text-white">
                <GoArrowUpLeft size={25} className="text-black" />
              </div>

              <span className="text-white font-medium text-sm tracking-wide uppercase whitespace-nowrap">
               PLAY SHOWREEL
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-300"
          onClick={handleCloseClick}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 animate-in zoom-in duration-500"
            style={{
              transformOrigin: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#FFA62B] hover:bg-[#FFA62B] hover:text-white transition-all duration-300 z-10 cursor-pointer"
              aria-label="Close video"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full"
                controls
                autoPlay
                src="https://ik.imagekit.io/99y1fc9mh/BFT/WhatsApp%20Video%202025-10-24%20at%2011.24.46%20PM.mp4?updatedAt=1761408169406"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowReel;