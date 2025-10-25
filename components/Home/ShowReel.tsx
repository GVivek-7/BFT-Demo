"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Mountain } from '@/assets/home';
import { FaPlay, FaTimes } from "react-icons/fa";

const ShowReel: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLImageElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    let ticking = false;
    
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
    };
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlayClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVideoOpen(true);
    }, 50);
  };

  const handleCloseClick = () => {
    setIsVideoOpen(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };
  
  return (
    <div id="showreel-section" className='h-[100dvh] w-full relative overflow-hidden'>
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
        className='absolute top-42 inset-0 flex flex-col items-center justify-start will-change-transform'
      >
        <h1 className='text-white md:text-[120px] text-[35px] font-medium font-heading tracking-tighter leading-[122px] text-center'>
          WATCH SHOWREEL
        </h1>
      </div>
      
      {/* Parallax Mountain */}
      <Image 
        ref={mountainRef}
        src={Mountain}
        alt="Mountain" 
        width={1000}
        height={1000}
        className='absolute bottom-0 w-full h-full object-cover pointer-events-none will-change-transform'
        priority
      />

      <button 
        onClick={handlePlayClick}
        className="absolute bottom-8 left-5 flex items-center bg-white text-[#FFA62B] font-semibold rounded-full pr-3 pl-1 py-1 transition-all duration-300 cursor-pointer group hover:bg-[#FFA62B] hover:text-white z-10"
      >
        <div className="bg-[#FFA62B] w-10 h-10 flex items-center justify-center rounded-full mr-3 transition-all duration-500 group-hover:bg-white">
          <FaPlay className="text-white text-base transition-all duration-500 group-hover:text-[#FFA62B]" />
        </div>
        <span className="tracking-wide text-sm sm:text-base transition-all duration-300">PLAY SHOWREEL</span>
      </button>

      {/* Video Modal */}
      {isAnimating && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
            isVideoOpen ? 'bg-black/90' : 'bg-transparent pointer-events-none'
          }`}
          onClick={handleCloseClick}
        >
          <div 
            className={`relative w-full max-w-5xl mx-4 transition-all duration-500 ${
              isVideoOpen 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-0'
            }`}
            style={{
              transformOrigin: 'bottom left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#FFA62B] hover:bg-[#FFA62B] hover:text-white transition-all duration-300 z-10 cursor-pointer"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full"
                loop 
                autoPlay
                src="https://ik.imagekit.io/99y1fc9mh/BFT/WhatsApp%20Video%202025-10-24%20at%2011.24.46%20PM.mp4?updatedAt=1761408169406"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowReel;