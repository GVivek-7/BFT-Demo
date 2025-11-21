"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FlightProps {
  isVisible?: boolean;
  onComplete?: () => void;
}

const Flight = ({ isVisible = true, onComplete }: FlightProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const text3Ref = useRef<HTMLDivElement | null>(null);
  const text4Ref = useRef<HTMLDivElement | null>(null);
  const text5Ref = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsReady(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isReady || isMobile === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    const totalFrames = isMobile ? 200 : 200;
    const currentFrame = (index: number) => {
      const folder = isMobile ? 'FlightM' : 'FlightW';
      return `/${folder}/${(index + 1).toString().padStart(4, '0')}.webp`;
    };

    const images: HTMLImageElement[] = [];
    const imgSeq = { frame: 0 };

    // Set canvas dimensions based on device type
    if (isMobile) {
      canvas.width = 1080;
      canvas.height = 1920;
    } else {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    // Preload first image
    const firstImg = new Image();
    firstImg.src = currentFrame(0);
    firstImg.onerror = () => {
      console.error(`Failed to load first image: ${firstImg.src}`);
    };
    images.push(firstImg);

    // Load remaining images
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };
      images.push(img);
    }

    console.log('Loading first image:', currentFrame(0));

    const render = () => {
      const img = images[imgSeq.frame];
      if (!img || !img.complete) return;
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        x,
        y,
        imgWidth * scale,
        imgHeight * scale
      );
    };

    let textScrollTrigger: ScrollTrigger | null = null;
    let canvasScrollTrigger: ScrollTrigger | null = null;

    const setupAnimation = () => {
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current, text5Ref.current], {
        opacity: 0,
        visibility: "hidden",
      });

      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
        },
      });

      textScrollTrigger = textTimeline.scrollTrigger as ScrollTrigger;

      textTimeline
        .to(text1Ref.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        })
        .to(text1Ref.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.4,
          ease: "power2.in",
        })
        .to(text2Ref.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.1")
        .to(text2Ref.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.4,
          ease: "power2.in",
        })
        .to(text3Ref.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.1")
        .to(text3Ref.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.4,
          ease: "power2.in",
        })
        .to(text4Ref.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.1")
        .to(text4Ref.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.4,
          ease: "power2.in",
        })
        .to(text5Ref.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.1");

      const canvasTween = gsap.to(imgSeq, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
          onLeave: () => {
            if (onComplete) {
              onComplete();
            }
          },
        },
        onUpdate: render,
      });
      canvasScrollTrigger = canvasTween.scrollTrigger as ScrollTrigger;
    };

    const initAnimation = () => {
      console.log('First image loaded successfully');
      render();
      setupAnimation();
    };

    // Check if image is already loaded (cached)
    if (images[0].complete && images[0].naturalWidth > 0) {
      console.log('First image already loaded from cache');
      initAnimation();
    } else {
      // Wait for image to load
      images[0].onload = initAnimation;
      
      // Fallback: if image doesn't load after 3 seconds, try anyway
      setTimeout(() => {
        if (!images[0].complete) {
          console.warn('First image taking too long to load, initializing anyway');
          initAnimation();
        }
      }, 3000);
    }

    return () => {
      if (textScrollTrigger) {
        textScrollTrigger.kill(true);
      }
      if (canvasScrollTrigger) {
        canvasScrollTrigger.kill(true);
      }
      
      const currentSection = sectionRef.current;
      if (currentSection) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === currentSection) {
            trigger.kill(true);
          }
        });
      }
    };
  }, [onComplete, isMobile, isReady]);

  if (!isVisible) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#BDD5E8] h-screen relative overflow-hidden"

    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-screen object-cover z-100"
        />

        <div
          ref={text1Ref}
          className="uppercase absolute text-[#04256C] md:text-[120px] text-[35px] mont font-bold left-1/2 md:top-1/3 top-2/5.5 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          BlindFoldTrips
        </div>

        <div
          ref={text2Ref}
          className="uppercase absolute text-[#04256C] xl:text-[60px] lg:text-[60px] md:text-[50px] text-[35px] mont font-bold top-[15%] left-[5%]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          TRIP Roulette
        </div>

        <div
          ref={text3Ref}
          className="uppercase absolute text-[#04256C] xl:text-[60px] lg:text-[70px] md:text-[50px] text-[35px] mont font-bold bottom-[15%] right-[5%]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          Secret Escape
        </div>

        <div
          ref={text4Ref}
          className="uppercase absolute text-[#04256C] xl:text-[60px] lg:text-[70px] md:text-[50px] text-[35px] mont font-bold top-[15%] left-[5%]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          Zero Clues
        </div>

        <div
          ref={text5Ref}
          className="uppercase absolute text-[#04256C] xl:text-[60px] lg:text-[70px] md:text-[50px] text-[35px] mont font-bold top-[15%] right-[5%]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          Feel Alive
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base font-light tracking-wider">
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
            <div className="flex items-center justify-center">
              <div className="dot-animation bg-white/50" />
            </div>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black/50 whitespace-nowrap leading-none">
              Keep scrolling
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dot-animation {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulseCircle 1.5s infinite ease-in-out;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .dot-animation { width: 8px; height: 8px; }
        }
        @media (min-width: 768px) {
          .dot-animation { width: 10px; height: 10px; }
        }
        @media (min-width: 1024px) {
          .dot-animation { width: 12px; height: 12px; }
        }
        @keyframes pulseCircle {
          0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
          50%  { opacity: 1;   transform: scale(1.2) translateX(2px); }
          100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
        }
        @media (min-width: 640px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(3px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }
        @media (min-width: 768px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(4px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }
      `}</style>
    </section>
  );
};

export default Flight;