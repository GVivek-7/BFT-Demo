"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group } from "three";
import { Model } from "../Reusable/Earth";
import { FullLogo } from "@/assets/home";
import {  useSceneAnimation } from "@/hooks/useSceneAnimation";
import { useResponsive } from "@/hooks/useResponsive";
import { useSceneRefs } from "@/hooks/useSceneRef";
import Image from "next/image";

const Scene: React.FC = () => {
  // Use custom hooks
  const responsiveState = useResponsive();
  const refs = useSceneRefs();
  useSceneAnimation(refs, responsiveState);

  const { mounted, isMobile, isTablet, isLg, responsiveSettings } =
    responsiveState;

  const {
    canvasRef,
    containerRef,
    imageSeqRef,
    sceneContainerRef,
    HeadTextRef,
    ParaTextRef,
    HeadText2Ref,
    ParaText2Ref,
    ceciRef,
    tourismRef,
    point1Ref,
    point2Ref,
    point3Ref,
    point4Ref,
    pioneerRef,
    worldRef,
    logoRef,
    modelGroupRef,
  } = refs;

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
  );
};

export default Scene;