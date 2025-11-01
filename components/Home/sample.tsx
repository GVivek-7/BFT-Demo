"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";
import { Model } from "../Reusable/Earth";
import { FullLogo } from "@/assets/home";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene: React.FC = () => {
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSeqRef = useRef<HTMLDivElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  // Text refs
  const HeadTextRef = useRef<HTMLHeadingElement>(null);
  const ParaTextRef = useRef<HTMLParagraphElement>(null);
  const HeadText2Ref = useRef<HTMLHeadingElement>(null);
  const ParaText2Ref = useRef<HTMLParagraphElement>(null);
  const ceciRef = useRef<HTMLHeadingElement>(null);
  const tourismRef = useRef<HTMLHeadingElement>(null);
  const point1Ref = useRef<HTMLParagraphElement>(null);
  const point2Ref = useRef<HTMLParagraphElement>(null);
  const point3Ref = useRef<HTMLParagraphElement>(null);
  const point4Ref = useRef<HTMLParagraphElement>(null);
  const pioneerRef = useRef<HTMLParagraphElement>(null);
  const worldRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<Group | null>(null);

  // Image sequence setup
  const totalFrames = 395;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const imgSeqRef = useRef({ frame: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);
  const isCleanedUpRef = useRef(false);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLg, setIsLg] = useState(false);

  // Check device type
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => window.innerWidth <= 767;
    const checkTablet = () =>
      window.innerWidth > 767 && window.innerWidth <= 1023;
    const checkLg = () =>
      window.innerWidth >= 1024 && window.innerWidth <= 1512;

    setIsMobile(checkMobile());
    setIsTablet(checkTablet());
    setIsLg(checkLg());

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(checkMobile());
        setIsTablet(checkTablet());
        setIsLg(checkLg());
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Responsive settings
  const responsiveSettings = useMemo(() => {
    if (!mounted) {
      return {
        cameraPosition: [0, 0, 4.9] as [number, number, number],
        modelScale: 1,
        lineHeight: "110px",
      };
    }

    if (isMobile) {
      return {
        cameraPosition: [0, 0, 8] as [number, number, number],
        modelScale: 0.7,
        lineHeight: "50px",
      };
    } else if (isTablet) {
      return {
        cameraPosition: [0, 0, 8] as [number, number, number],
        modelScale: 0.85,
        lineHeight: "75px",
      };
    }

    return {
      cameraPosition: [0, 0, 4.9] as [number, number, number],
      modelScale: 1,
      lineHeight: "110px",
    };
  }, [mounted, isMobile, isTablet]);

  // Animated Model Component
  const AnimatedModel = () => {
    const groupRef = useRef<Group>(null);

    useEffect(() => {
      if (groupRef.current) {
        modelGroupRef.current = groupRef.current;
      }
    }, []);

    return (
      <group
        ref={groupRef}
        scale={responsiveSettings.modelScale}
        position={[0, 0, 0]}
      >
        <Model />
      </group>
    );
  };

  const currentFrame = (index: number) =>
    `/framesBft_new/frame_${(index + 1).toString().padStart(4, "0")}.webp`;

  // Main effect
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;
    isCleanedUpRef.current = false;

    // Set canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;

    // Load images
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
    imagesRef.current = images;

    const render = () => {
      if (isCleanedUpRef.current) return;

      const img = imagesRef.current[imgSeqRef.current.frame];
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

    // Wait for first image and model
    let modelCheckInterval: NodeJS.Timeout;

    const initAnimation = () => {
      if (isCleanedUpRef.current || !containerRef.current) return;

      // Kill existing ScrollTriggers safely
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill(true);
        }
      });

      // Create GSAP context
      const ctx = gsap.context(() => {
        if (isCleanedUpRef.current) return;

        // Create master timeline
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=6000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (isCleanedUpRef.current) return;
            },
          },
        });

        // Set initial states
        gsap.set([ceciRef.current, tourismRef.current], {
          x: 0,
          opacity: 0,
          visibility: "hidden",
        });

        gsap.set(imageSeqRef.current, {
          visibility: "visible",
          opacity: 1,
          zIndex: 20,
        });

        gsap.set([HeadTextRef.current, ParaTextRef.current], {
          opacity: 1,
          visibility: "visible",
        });

        gsap.set([HeadText2Ref.current, ParaText2Ref.current], {
          opacity: 0,
          visibility: "hidden",
        });

        gsap.set(sceneContainerRef.current, {
          opacity: 0,
          visibility: "hidden",
          zIndex: 10,
        });

        gsap.set(
          [
            point1Ref.current,
            point2Ref.current,
            point3Ref.current,
            point4Ref.current,
          ],
          { opacity: 0, visibility: "hidden", y: 20 }
        );

        gsap.set([pioneerRef.current, worldRef.current], {
          opacity: 0,
          visibility: "hidden",
          y: 20,
        });

        gsap.set(logoRef.current, {
          opacity: 0,
          visibility: "hidden",
          scale: 0.8,
        });

        // Build timeline
        masterTimeline
          // PHASE 1: First text fade in
          .to(
            HeadTextRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0
          )
          .to(
            ParaTextRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0.15
          )

          // Image sequence
          .to(
            imgSeqRef.current,
            {
              frame: totalFrames - 1,
              snap: "frame",
              ease: "none",
              duration: 2,
              onUpdate: render,
            },
            0
          )

          // First text fade out
          .to(
            [HeadTextRef.current, ParaTextRef.current],
            {
              opacity: 0,
              y: -30,
              duration: 0.3,
              ease: "power2.inOut",
            },
            0.8
          )

          // Second text fade in
          .to(
            HeadText2Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            1.1
          )
          .to(
            ParaText2Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            1.2
          )

          // Second text fade out
          .to(
            [HeadText2Ref.current, ParaText2Ref.current],
            {
              opacity: 0,
              y: -30,
              duration: 0.3,
              ease: "power2.inOut",
            },
            1.7
          )

          // Transition to 3D scene
          .to(
            imageSeqRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            1.8
          )
          .to(
            sceneContainerRef.current,
            {
              visibility: "visible",
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            2
          )

          // PHASE 2: Text split animation
          .to(
            ceciRef.current,
            {
              x: isMobile ? -140 : isTablet ? -260 : "-27vw",
              opacity: 1,
              visibility: "visible",
              duration: 1.5,
              ease: "power2.out",
            },
            3
          )
          .to(
            tourismRef.current,
            {
              opacity: 1,
              visibility: "visible",
              x: isMobile ? 140 : isTablet ? 260 : isLg ? "26.5vw" : "27vw",
              duration: 1.5,
              ease: "power2.out",
            },
            3
          )

          // PHASE 3: Points appear
          .to(
            point1Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            3.5
          )
          .to(
            point2Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            4
          )
          .to(
            point3Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            4.5
          )
          .to(
            point4Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            5
          )

          // PHASE 4: Model moves up, points fade
          .to(
            modelGroupRef.current?.position || { y: 0 },
            {
              y: 5,
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )
          .to(
            [
              point1Ref.current,
              point2Ref.current,
              point3Ref.current,
              point4Ref.current,
            ],
            {
              opacity: 0,
              visibility: "hidden",
              duration: 1,
              ease: "power2.inOut",
            },
            6
          )

          // Text converge
          .to(
            ceciRef.current,
            {
              x: isMobile ? -57 : isTablet ? -115 : isLg ? "-13.5vw" : "-15vw",
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )
          .to(
            tourismRef.current,
            {
              x: isMobile ? 57 : isTablet ? 115 : isLg ? "13.5vw" : "15vw",
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )

          // PHASE 5: Pioneer/Worldwide text
          .to(
            pioneerRef.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            7
          )
          .to(
            worldRef.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            7
          )

          // PHASE 6: All text moves up
          .to(
            [
              ceciRef.current,
              tourismRef.current,
              pioneerRef.current,
              worldRef.current,
            ],
            {
              y: isMobile ? -300 : isTablet ? -400 : -500,
              opacity: 0,
              duration: 2,
              ease: "power2.inOut",
            },
            8.5
          )

          // PHASE 7: Logo appears
          .to(
            logoRef.current,
            {
              opacity: 1,
              visibility: "visible",
              scale: 1,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            10
          );
      }, containerRef);

      gsapContextRef.current = ctx;
    };

    imagesRef.current[0].onload = () => {
      render();

      modelCheckInterval = setInterval(() => {
        if (
          modelGroupRef.current &&
          containerRef.current &&
          !isCleanedUpRef.current
        ) {
          clearInterval(modelCheckInterval);
          requestAnimationFrame(() => {
            if (!isCleanedUpRef.current) {
              initAnimation();
            }
          });
        }
      }, 50);
    };

    // Cleanup function
    cleanupRef.current = () => {
      isCleanedUpRef.current = true;

      if (modelCheckInterval) {
        clearInterval(modelCheckInterval);
      }

      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill(true);
        }
      });

      // Kill GSAP context
      if (gsapContextRef.current) {
        try {
          gsapContextRef.current.revert();
        } catch (e) {
          console.warn("GSAP context revert failed:", e);
        }
        gsapContextRef.current = null;
      }

      // Clear references
      imagesRef.current = [];
      modelGroupRef.current = null;
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [mounted, isMobile, isTablet, isLg, responsiveSettings.modelScale]);

  // Cleanup on unmount
  useEffect(() => {
  return () => {
    console.log("🧹 Cleaning up Scene component...");
    if (cleanupRef.current) {
      try {
        cleanupRef.current();
      } catch (err) {
        console.warn("Cleanup error:", err);
      } finally {
        cleanupRef.current = null;
      }
    }
  };
}, []);

  if (!mounted) {
    return <div className="bg-black h-screen w-full" />;
  }

  return (
    <div ref={containerRef} className="bg-black">
      <div className="relative w-full h-screen bg-black">
        {/* Image Sequence Layer */}
        <div
          ref={imageSeqRef}
          className="absolute inset-0 w-full h-screen"
          style={{ zIndex: 20 }}
        >
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-screen object-cover"
            style={{
              backgroundImage: "url(/framesBft_new/frame_0001.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* 3D Scene Layer */}
        <div
          ref={sceneContainerRef}
          className="absolute inset-0 w-full h-screen"
          style={{
            zIndex: 999,
            pointerEvents: "none",
            userSelect: "none",
            visibility: "hidden",
          }}
        >
          <Canvas
            camera={{ position: responsiveSettings.cameraPosition, fov: 46 }}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 9999,
            }}
          >
            <ambientLight intensity={1.5} />
            <AnimatedModel />
            <OrbitControls enableZoom={false} autoRotate enablePan={false} />
          </Canvas>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-sm md:text-base font-light tracking-wider">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5">
              <div className="dot-animation bg-white/60"></div>
              <div
                className="dot-animation bg-white/60"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <span className="text-xs md:text-[14px] font-semibold text-white/60 whitespace-nowrap">
              KEEP SCROLLING
            </span>
          </div>
        </div>

        {/* First Hero Text */}
        <div className="absolute z-100 inset-0 pointer-events-none flex flex-col items-start justify-between h-[60vh] md:mt-50 my-auto md:px-20 text-center px-4">
          <h1
            ref={HeadTextRef}
            className="text-white heather tracking-wider uppercase text-[50px] leading-[50px] md:text-[70px] md:leading-[70px] lg:text-[70px] lg:leading-[70px] xl:text-[80px] xl:leading-20 2xl:text-[80px] 2xl:leading-20 text-left"
            style={{ visibility: "hidden" }}
          >
            Where vision ends, <br />{" "}
            <span className="text-[#FFA62B]">Adventure</span> begins.
          </h1>

          <p
            ref={ParaTextRef}
            className="text-white text-[16px] leading-[18px] md:text-[18px] md:leading-5 lg:text-[20px] lg:leading-[22px] xl:text-[20px] xl:leading-[22px] 2xl:text-[20px] 2xl:leading-[22px] max-w-lg text-left tracking-wider"
            style={{ visibility: "hidden" }}
          >
            step into journeys that awaken every sense - hear the rhythm of
            cities, feel the breath of nature, and see with your heart
          </p>
        </div>

        {/* Second Hero Text */}
        <div className="absolute z-100 inset-0 pointer-events-none flex flex-col items-start justify-between h-[65vh] md:mt-50 my-auto md:px-20 text-center px-4">
          <h1
            ref={HeadText2Ref}
            className="text-white heather tracking-wider uppercase text-[50px] leading-[50px] md:text-[70px] md:leading-[70px] lg:text-[70px] lg:leading-[70px] xl:text-[80px] xl:leading-20 2xl:text-[80px] 2xl:leading-20 text-left"
            style={{ visibility: "hidden" }}
          >
            Experience destinations <br />
            through touch, sound, and soul.
          </h1>

          <p
            ref={ParaText2Ref}
            className="text-white text-[16px] leading-[18px] md:text-[18px] md:leading-5 lg:text-[20px] lg:leading-[22px] xl:text-[20px] xl:leading-[22px] 2xl:text-[20px] 2xl:leading-[22px] max-w-2xl text-left tracking-wider"
            style={{ visibility: "hidden" }}
          >
            Every journey with blindfold trips is designed to awaken your
            senses. Feel the textures of landscapes, hear the hidden rhythms of
            cities, and immersive yourself in moments that go beyond sight.
          </p>
        </div>

        {/* Text Overlay - CECITO URISM */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <h1
            ref={ceciRef}
            className="absolute m-0 font-light text-white 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[70px] text-[35px]"
            style={{
              lineHeight: responsiveSettings.lineHeight,
              textShadow: "0 0 20px rgba(0,0,0,0.5)",
              visibility: "hidden",
            }}
          >
            CECITO
          </h1>

          <h1
            ref={tourismRef}
            className="absolute m-0 font-light text-white 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[70px] text-[35px]"
            style={{
              lineHeight: responsiveSettings.lineHeight,
              textShadow: "0 0 20px rgba(0,0,0,0.5)",
              visibility: "hidden",
            }}
          >
            URISM
          </h1>

          {/* Point Texts */}
          <p
            ref={point1Ref}
            className="absolute m-0 text-white leading-relaxed"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              top: isMobile ? "12%" : isTablet ? "10%" : "12%",
              left: isMobile ? "5%" : isTablet ? "4%" : "6%",
              fontSize: isMobile ? "0.875rem" : isTablet ? "1rem" : "1.125rem",
              maxWidth: isMobile ? "75%" : isTablet ? "48%" : "24%",
              visibility: "hidden",
            }}
          >
            C — Curated: Every journey crafted with precision and heart.
          </p>

          <p
            ref={point2Ref}
            className={`absolute m-0 text-white leading-relaxed ${
              isMobile
                ? "top-[24%] left-[5%] text-sm max-w-[60%]"
                : isTablet
                ? "top-[20%] left-[6%] text-base max-w-[40%]"
                : "top-[24%] left-[6%] text-lg max-w-[20%]"
            }`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              visibility: "hidden",
            }}
          >
            E — Experiential: Created to be lived, not just seen.
          </p>

          <p
            ref={point3Ref}
            className={`absolute m-0 text-white leading-relaxed text-right ${
              isMobile
                ? "bottom-[22%] right-[5%] text-sm max-w-[62%]"
                : isTablet
                ? "bottom-[20%] right-[8%] text-base max-w-[40%]"
                : "bottom-[20%] right-[10%] text-lg max-w-[25%]"
            }`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              visibility: "hidden",
            }}
          >
            C — Cultural: Rooted in local stories and timeless emotion.
          </p>

          <p
            ref={point4Ref}
            className={`absolute m-0 text-white leading-relaxed text-right ${
              isMobile
                ? "bottom-[10%] right-[5%] text-sm max-w-[62%]"
                : isTablet
                ? "bottom-[12%] right-[8%] text-base max-w-[40%]"
                : "bottom-[10%] right-[10%] text-lg max-w-[25%]"
            }`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              visibility: "hidden",
            }}
          >
            I — Immersive: Surrender to presence — that&apos;s where you truly
            arrive.
          </p>

          {/* Pioneer/Worldwide Text */}
          <p
            ref={pioneerRef}
            className={`absolute m-0 text-white font-light tracking-widest ${
              isMobile
                ? "top-[45%] left-[23%] text-sm"
                : isTablet
                ? "top-[43%] left-[23%] text-xl"
                : "top-[38%] left-[21%] text-2xl"
            }`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              visibility: "hidden",
            }}
          >
            PIONEERING GLOBAL
          </p>

          <p
            ref={worldRef}
            className={`absolute m-0 text-white font-light tracking-widest text-right ${
              isMobile
                ? "bottom-[45%] right-[24%] text-sm"
                : isTablet
                ? "bottom-[43%] right-[24%] text-xl"
                : "bottom-[38%] right-[22.5%] text-2xl"
            }`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              visibility: "hidden",
            }}
          >
            WORLDWIDE
          </p>

          {/* Logo */}
          <div
            ref={logoRef}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              isMobile ? "w-[350px]" : isTablet ? "w-[750px]" : "w-[1000px]"
            }`}
            style={{
              visibility: "hidden",
            }}
          >
            <img
              src={FullLogo}
              alt="Logo"
              className="w-full h-full"
              width={1000}
              height={1000}
              style={{
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
