"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { Model } from "../Reusable/Earth";
import { FullLogo } from "@/assets/home";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene: React.FC = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const ceciRef = useRef<HTMLHeadingElement>(null);
  const tourismRef = useRef<HTMLHeadingElement>(null);
  const point1Ref = useRef<HTMLParagraphElement>(null);
  const point2Ref = useRef<HTMLParagraphElement>(null);
  const point3Ref = useRef<HTMLParagraphElement>(null);
  const point4Ref = useRef<HTMLParagraphElement>(null);
  const pioneerRef = useRef<HTMLParagraphElement>(null);
  const worldRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<any>(null);

  // Responsive
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize responsive settings to prevent recalculation
  const responsiveSettings = useMemo(() => {
    if (!mounted) {
      return {
        cameraPosition: [0, 0, 4.9] as [number, number, number],
        parallaxStrength: 0.3,
        modelScale: 1,
        lineHeight: "110px",
      };
    }

    if (isMobile) {
      return {
        cameraPosition: [0, 0, 8] as [number, number, number],
        parallaxStrength: 0.15,
        modelScale: 0.7,
        lineHeight: "50px",
      };
    } else if (isTablet) {
      return {
        cameraPosition: [0, 0, 8] as [number, number, number],
        parallaxStrength: 0.25,
        modelScale: 0.85,
        lineHeight: "75px",
      };
    }

    return {
      cameraPosition: [0, 0, 4.9] as [number, number, number],
      parallaxStrength: 0.3,
      modelScale: 1,
      lineHeight: "110px",
    };
  }, [mounted, isMobile, isTablet]);

  // ===========================
  // ANIMATED MODEL COMPONENT
  // ===========================
  const AnimatedModel = () => {
    const groupRef = useRef<any>(null);

    useEffect(() => {
      if (groupRef.current) {
        modelGroupRef.current = groupRef.current;
      }
    }, [groupRef.current]);

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

  // ===========================
  // GSAP SCROLL TIMELINE
  // ===========================

  useEffect(() => {
    if (
      !mounted ||
      !containerRef.current ||
      !ceciRef.current ||
      !tourismRef.current ||
      !point1Ref.current ||
      !point2Ref.current ||
      !point3Ref.current ||
      !point4Ref.current ||
      !pioneerRef.current ||
      !worldRef.current ||
      !logoRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    // Wait for model ref to be available
    const checkModelRef = setInterval(() => {
      if (modelGroupRef.current) {
        clearInterval(checkModelRef);
        initAnimation();
      }
    }, 50);

    const initAnimation = () => {
      // Kill all existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const ctx = gsap.context(() => {
        // Create master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: canvasRef.current,
            anticipatePin: 1,
          },
        });

        // Initial state - both texts at center (Earth position)
        gsap.set([ceciRef.current, tourismRef.current], {
          x: 0,
          opacity: 1,
          visibility: "visible",
        });

        // Initial state - points hidden
        gsap.set(
          [
            point1Ref.current,
            point2Ref.current,
            point3Ref.current,
            point4Ref.current,
          ],
          {
            opacity: 0,
            visibility: "hidden",
            y: 20,
          }
        );

        // Initial state - pioneer and world hidden
        gsap.set([pioneerRef.current, worldRef.current], {
          opacity: 0,
          visibility: "hidden",
          y: 20,
        });

        // Initial state - logo hidden
        gsap.set(logoRef.current, {
          opacity: 0,
          visibility: "hidden",
          scale: 0.8,
        });

        // Animation sequence - move from center to sides
        tl.to(
          ceciRef.current,
          {
            x: isMobile ? -140 : isTablet ? -260 : -460,
            duration: 1.5,
            visibility: "visible",
            ease: "power2.out",
          },
          0
        )
          .to(
            tourismRef.current,
            {
              x: isMobile ? 140 : isTablet ? 260 : 430,
              duration: 1.5,
              visibility: "visible",
              ease: "power2.out",
            },
            0
          )
          // Animate point 1 (top left)
          .to(
            point1Ref.current,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            1.5
          )
          // Animate point 2 (top left)
          .to(
            point2Ref.current,
            {
              opacity: 1,
              visibility: "visible",

              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            2
          )
          // Animate point 3 (bottom right)
          .to(
            point3Ref.current,
            {
              opacity: 1,
              visibility: "visible",

              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            2.5
          )
          // Animate point 4 (bottom right)
          .to(
            point4Ref.current,
            {
              opacity: 1,
              visibility: "visible",

              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            3
          )
          // Move 3D model upward
          .to(
            modelGroupRef.current.position,
            {
              y: 5,
              visibility: "visible",

              duration: 2,
              ease: "power2.inOut",
            },
            4
          )
          // Fade out points
          .to(
            [
              point1Ref.current,
              point2Ref.current,
              point3Ref.current,
              point4Ref.current,
            ],
            {
              visibility: "hidden",
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            4
          )
          // Move texts closer together
          .to(
            ceciRef.current,
            {
              x: isMobile ? -57 : isTablet ? -115 : -230,
              visibility: "visible",

              duration: 2,
              ease: "power2.inOut",
            },
            4
          )
          .to(
            tourismRef.current,
            {
              x: isMobile ? 57 : isTablet ? 115 : 230,
              duration: 2,
              visibility: "visible",

              ease: "power2.inOut",
            },
            4
          )
          // Animate pioneer text (top left)
          .to(
            pioneerRef.current,
            {
              visibility: "visible",

              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            5
          )
          // Animate world text (bottom right)
          .to(
            worldRef.current,
            {
              visibility: "visible",

              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            5
          )
          // Move all three texts up together and fade them out
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
            6.5
          )
          // Show logo after texts are hidden
          .to(
            logoRef.current,
            {
              visibility: "visible",
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            8
          );
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    };

    return () => {
      clearInterval(checkModelRef);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted, isMobile, isTablet, isDesktop]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-[500vh] bg-black">
        <div className="w-full h-screen bg-black" />
      </div>
    );
  }

  return (
    <>
      {/* Main scroll container */}
      <div ref={containerRef} className="h-[500vh]">
        {/* Fixed canvas container */}
        <div
          ref={canvasRef}
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
          className="canvas-container bg-black w-full h-screen relative overflow-hidden"
        >
          {/* 3D Canvas */}
          <Canvas
            key={`canvas-${isMobile}-${isTablet}-${isDesktop}`}
            camera={{ position: responsiveSettings.cameraPosition, fov: 46 }}
            className="z-100 select-none"
            style={{
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <ambientLight intensity={1.5} />
            <AnimatedModel />
            <OrbitControls enableZoom={false} autoRotate enablePan={false} />
          </Canvas>

          {/* Text overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* CECI - Starts at center, moves left */}
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

            {/* TOURISM - Starts at center, moves right */}
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

            {/* Point 1 - Top Left */}
            <p
              ref={point1Ref}
              className="absolute m-0 text-white leading-relaxed"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                top: isMobile ? "12%" : isTablet ? "10%" : "12%",
                left: isMobile ? "5%" : isTablet ? "4%" : "6%",
                fontSize: isMobile
                  ? "0.875rem"
                  : isTablet
                  ? "1rem"
                  : "1.125rem",
                maxWidth: isMobile ? "75%" : isTablet ? "48%" : "34%",
                visibility: "hidden",
              }}
            >
              C — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur vitae sapien a nulla gravida aliquam. Suspendisse
              potenti.
            </p>

            {/* Point 2 - Top Left (below point 1) */}
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
              e — No plans, no maps just pure moments waiting to unfold.
            </p>

            {/* Point 3 - Bottom Right (above point 4) */}
            <p
              ref={point3Ref}
              className={`absolute m-0 text-white leading-relaxed text-right ${
                isMobile
                  ? "bottom-[22%] right-[5%] text-sm max-w-[62%]"
                  : isTablet
                  ? "bottom-[20%] right-[8%] text-base max-w-[40%]"
                  : "bottom-[20%] right-[10%] text-lg max-w-[28%]"
              }`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                visibility: "hidden",
              }}
            >
              C — Trust the journey, not the destination the magic lies in the
              mystery.
            </p>

            {/* Point 4 - Bottom Right */}
            <p
              ref={point4Ref}
              className={`absolute m-0 text-white leading-relaxed text-right ${
                isMobile
                  ? "bottom-[10%] right-[5%] text-sm max-w-[62%]"
                  : isTablet
                  ? "bottom-[12%] right-[8%] text-base max-w-[40%]"
                  : "bottom-[10%] right-[10%] text-lg max-w-[30%]"
              }`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                visibility: "hidden",
              }}
            >
              I — Step into the unknown, let curiosity guide you, and live
              stories worth remembering.
            </p>

            {/* Pioneer text - Top Left (above CECITOURISM) */}
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

            {/* World text - Bottom Right (below CECITOURISM) */}
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

            {/* Logo - appears after texts move up and hide */}
            <div
              ref={logoRef}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                isMobile ? "w-[350px]" : isTablet ? "w-[750px]" : "w-[1000px]"
              }`}
              style={{
                visibility: "hidden",
              }}
            >
              <Image
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
    </>
  );
};

export default Scene;
