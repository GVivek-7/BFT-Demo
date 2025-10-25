"use client";
import { Mountain } from '@/assets/home';
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';


const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      const scrollY = window.scrollY
      
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`
      }
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateParallax)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='h-[100dvh] w-full relative overflow-hidden'>
    
      <div 
        ref={bgRef}
        className='absolute inset-0 w-full h-full will-change-transform'
        style={{ 
          backgroundImage: "url('https://ik.imagekit.io/99y1fc9mh/BFT/Gemini_Generated_Image_za4aliza4aliza4a%201.png?updatedAt=1760439031603')",    
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", 
          backgroundSize: "cover"
        }}
      />

      <div 
        ref={textRef}
        className='absolute top-40 inset-0 flex flex-col items-center justify-start will-change-transform'
      >
        
        <p className='text-[34px] leading-[36px] text-white'>Step Into the</p>
        <h1 className='text-[#E6AF2E] text-[120px] font-bold font-heading tracking-tighter leading-[122px] text-center'>
          UNKNOWN
        </h1>
      </div>

      <Image 
        src={Mountain}
        alt="Mountain" 
        width={1000}
        height={1000}
        className='absolute bottom-0 w-full h-full object-cover pointer-events-none'
        priority
      />




    
    </div>
  )
}

export default Hero