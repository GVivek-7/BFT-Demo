import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useResponsive } from "./useResponsive";
import { useSceneRefs } from "./useSceneRef";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useSceneAnimation = (
  refs: ReturnType<typeof useSceneRefs>,
  responsiveState: ReturnType<typeof useResponsive>
) => {
  const {
    canvasRef,
    contextRef,
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
    totalFrames,
    imagesRef,
    imgSeqRef,
    cleanupRef,
    isCleanedUpRef,
    gsapContextRef,
  } = refs;

  const { mounted, isMobile, isTablet, isLg, responsiveSettings } =
    responsiveState;

  // Local ref to track if animation has been initialized
  const isInitializedRef = useRef(false);
  const modelCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const currentFrame = (index: number) =>
    `/framesBft_new/frame_${(index + 1).toString().padStart(4, "0")}.webp`;

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;
    isCleanedUpRef.current = false;
    isInitializedRef.current = false;

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

    const initAnimation = () => {
      if (isCleanedUpRef.current || !containerRef.current || isInitializedRef.current) return;
      
      isInitializedRef.current = true;

      // Kill existing ScrollTriggers for this container BEFORE creating new context
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
            onUpdate: (self) => {
              // Store reference to ScrollTrigger instance
              scrollTriggerInstanceRef.current = self;
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
      if (isCleanedUpRef.current) return;
      
      render();

      modelCheckIntervalRef.current = setInterval(() => {
        if (isCleanedUpRef.current) {
          if (modelCheckIntervalRef.current) {
            clearInterval(modelCheckIntervalRef.current);
            modelCheckIntervalRef.current = null;
          }
          return;
        }

        if (
          modelGroupRef.current &&
          containerRef.current &&
          !isCleanedUpRef.current
        ) {
          if (modelCheckIntervalRef.current) {
            clearInterval(modelCheckIntervalRef.current);
            modelCheckIntervalRef.current = null;
          }
          
          requestAnimationFrame(() => {
            if (!isCleanedUpRef.current) {
              initAnimation();
            }
          });
        }
      }, 50);
    };

    // Enhanced cleanup function with proper order
    cleanupRef.current = () => {
      if (isCleanedUpRef.current) return;
      
      console.log("🧹 Starting cleanup...");
      isCleanedUpRef.current = true;

      // 1. Clear interval first
      if (modelCheckIntervalRef.current) {
        clearInterval(modelCheckIntervalRef.current);
        modelCheckIntervalRef.current = null;
      }

      // 2. Kill all tweens BEFORE touching ScrollTrigger
      gsap.killTweensOf("*");

      // 3. Kill the specific ScrollTrigger instance if we have it
      if (scrollTriggerInstanceRef.current) {
        try {
          scrollTriggerInstanceRef.current.kill(false); // false = don't revert
          scrollTriggerInstanceRef.current = null;
        } catch (e) {
          console.warn("ScrollTrigger instance kill failed:", e);
        }
      }

      // 4. Kill any remaining ScrollTriggers for this container
      try {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars.trigger === containerRef.current) {
            trigger.kill(false); // false = don't revert to avoid DOM manipulation
          }
        });
      } catch (e) {
        console.warn("ScrollTrigger cleanup failed:", e);
      }

      // 5. Revert GSAP context (this should be safe now)
      if (gsapContextRef.current) {
        try {
          gsapContextRef.current.revert();
        } catch (e) {
          console.warn("GSAP context revert failed:", e);
        }
        gsapContextRef.current = null;
      }

      // 6. Clear references
      imagesRef.current = [];
      modelGroupRef.current = null;
      isInitializedRef.current = false;
      
      console.log("✅ Cleanup complete");
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [
    mounted,
    isMobile,
    isTablet,
    isLg,
    responsiveSettings.modelScale,
    canvasRef,
    contextRef,
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
    totalFrames,
    imagesRef,
    imgSeqRef,
    cleanupRef,
    isCleanedUpRef,
    gsapContextRef,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 Component unmounting...");
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
  }, [cleanupRef]);
};