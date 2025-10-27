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

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => window.innerWidth <= 767;
    const checkTablet = () =>
      window.innerWidth > 767 && window.innerWidth <= 1023;

    setIsMobile(checkMobile());
    setIsTablet(checkTablet());

    const handleResize = () => {
      setIsMobile(checkMobile());
      setIsTablet(checkTablet());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Initialize everything
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    // Load images
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    const render = () => {
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
    imagesRef.current[0].onload = () => {
      render();

      const checkModelRef = setInterval(() => {
        if (modelGroupRef.current) {
          clearInterval(checkModelRef);
          initUnifiedTimeline();
        }
      }, 50);
    };

    const initUnifiedTimeline = () => {
      const ctx = gsap.context(() => {
        // Create master timeline
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=6000",
            scrub: 1,
            pin: true,
          },
        });

        gsap.set([ceciRef.current, tourismRef.current], {
          x: 0,
          opacity: 0,
          visibility: "hidden",
        });
        // Set initial states for all elements
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

        gsap.set([ceciRef.current, tourismRef.current], {
          x: 0,
          opacity: 0,
          visibility: "hidden",
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

        // PHASE 1: Image Sequence Animation (0-2 in timeline)
        masterTimeline

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
          // Then paragraph
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
          // First text fades out at mid-point of image sequence
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
          // Second text fades in immediately after - heading first
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
          // Then paragraph
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
          // Second text fades out near end of image sequence
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

          // Fade out image sequence and fade in 3D scene
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

          // PHASE 2: Text Split Animation (2-4)
          .to(
            ceciRef.current,
            {
              x: isMobile ? -140 : isTablet ? -260 : -460,
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
              x: isMobile ? 140 : isTablet ? 260 : 430,
              duration: 1.5,
              ease: "power2.out",
            },
            3
          )

          // PHASE 3: Point texts appear (3.5-6)
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

          // PHASE 4: Model moves up, points fade (6-8)
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
          .to(
            ceciRef.current,
            {
              x: isMobile ? -57 : isTablet ? -115 : -230,
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )
          .to(
            tourismRef.current,
            {
              x: isMobile ? 57 : isTablet ? 115 : 230,
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )

          // PHASE 5: Pioneer/Worldwide text (7-8.5)
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

          // PHASE 6: All text moves up and fades (8.5-10.5)
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

          // PHASE 7: Logo appears (10-11.5)
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

      return () => {
        ctx.revert();
      };
    };

    canvas.width = 1920;
    canvas.height = 1080;
  }, [mounted, isMobile, isTablet]);

  if (!mounted) {
    return <div className=" bg-black" />;
  }

  return (
    <div ref={containerRef} className=" bg-black">
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
              backgroundImage: "url(/framesBft/frame_0001.webp)",
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
        {/* Hero Seq Text */}
        <div className="absolute z-100 inset-0 pointer-events-none flex flex-col items-start justify-between h-[60vh] md:mt-50 my-auto md:px-[80px] text-center px-4">
          <h1
            ref={HeadTextRef}
            className="
    text-white heather tracking-wider uppercase
    text-[50px] leading-[50px]
    md:text-[70px] md:leading-[70px]
    lg:text-[70px] lg:leading-[70px]
    xl:text-[80px] xl:leading-[80px]
    2xl:text-[80px] 2xl:leading-[80px] text-left
  "
            style={{ visibility: "hidden" }}
          >
            Where vision ends, <br /> emotion begins.
          </h1>

          <p
            ref={ParaTextRef}
            className="
    text-white
    text-[16px] leading-[18px]
    md:text-[18px] md:leading-[20px]
    lg:text-[20px] lg:leading-[22px]
    xl:text-[20px] xl:leading-[22px]
    2xl:text-[20px] 2xl:leading-[22px] max-w-md text-left tracking-wider
  "
            style={{ visibility: "hidden" }}
          >
            Step into journeys that awaken every sense — hear the rhythm of
            cities, feel the breath of nature, and see with your heart.
          </p>
        </div>

        <div className="absolute z-100 inset-0 pointer-events-none flex flex-col items-start justify-between h-[65vh] md:mt-50 my-auto md:px-[80px] text-center px-4">
          <h1
            ref={HeadText2Ref}
            className="
    text-white heather tracking-wider uppercase
    text-[50px] leading-[50px]
    md:text-[70px] md:leading-[70px]
    lg:text-[70px] lg:leading-[70px]
    xl:text-[80px] xl:leading-[80px]
    2xl:text-[80px] 2xl:leading-[80px] text-left
  "
            style={{ visibility: "hidden" }}
          >
            Experience destinations <br />
            through touch, sound, and soul.
          </h1>

          <p
            ref={ParaText2Ref}
            className="
    text-white
    text-[16px] leading-[18px]
    md:text-[18px] md:leading-[20px]
    lg:text-[20px] lg:leading-[22px]
    xl:text-[20px] xl:leading-[22px]
    2xl:text-[20px] 2xl:leading-[22px] max-w-xl text-left tracking-wider
  "
            style={{ visibility: "hidden" }}
          >
            Every journey with Blindfold Trips is designed to awaken your
            senses. Feel the textures of landscapes, hear the hidden rhythms of
            cities, and immerse yourself in moments that go beyond sight.
          </p>
        </div>

        {/* Text Overlay */}
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
            C — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            e — No plans, no maps just pure moments waiting to unfold.
          </p>

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
            C — Trust the journey, not the destination.
          </p>

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
            I — Step into the unknown, let curiosity guide you.
          </p>

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
