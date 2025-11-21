"use client";
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

  // Determine frame count based on device
  const frameCount = isMobile ? totalFrames.MOBILE : totalFrames.WEB;

  // Local ref to track if animation has been initialized
  const isInitializedRef = useRef(false);
  const modelCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isCleaningUpRef = useRef(false);

  const currentFrame = (index: number) => {
    const folder = isMobile ? "/MFrames" : "/WFrames";
    return `${folder}/${(index + 1).toString().padStart(4, "0")}.webp`;
  };

  // Pre-navigation cleanup effect - handles browser navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isCleaningUpRef.current) return;
      isCleaningUpRef.current = true;
      isCleanedUpRef.current = true;
      
      // Stop all intervals immediately
      if (modelCheckIntervalRef.current) {
        clearInterval(modelCheckIntervalRef.current);
        modelCheckIntervalRef.current = null;
      }

      // Kill GSAP animations with error handling - order matters!
      try {
        // First, kill all ScrollTriggers to stop DOM manipulation
        ScrollTrigger.getAll().forEach(trigger => {
          try {
            trigger.kill(true);
          } catch (e) {
            // Silently handle individual trigger errors
          }
        });
        
        // Then kill the timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        
        // Kill the specific scrollTrigger reference
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill(true);
          scrollTriggerRef.current = null;
        }

        // Finally revert the GSAP context
        if (gsapContextRef.current) {
          gsapContextRef.current.revert();
          gsapContextRef.current = null;
        }
        
        // Kill all remaining tweens
        gsap.killTweensOf('*');
      } catch (error) {
        // Silently handle GSAP cleanup errors
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && mounted) {
        // Page became visible again - refresh ScrollTrigger
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    };

    // Listen for route changes and visibility changes
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gsapContextRef, isCleanedUpRef, mounted]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;
    isCleanedUpRef.current = false;
    isInitializedRef.current = false;
    isCleaningUpRef.current = false;

    // Refresh ScrollTrigger on mount to handle navigation
    ScrollTrigger.refresh();

    // Set canvas dimensions based on device
    if (isMobile) {
      canvas.width = 1080;
      canvas.height = 1920;
    } else {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    // Load images
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
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

      // Ensure ScrollTrigger is registered
      gsap.registerPlugin(ScrollTrigger);

      // Create GSAP context with error handling
      const ctx = gsap.context(() => {
        if (isCleanedUpRef.current) return;
        
        // Set initial states with null checks
        if (ceciRef.current && tourismRef.current) {
          gsap.set([ceciRef.current, tourismRef.current], {
            x: 0,
            opacity: 0,
            visibility: "hidden",
          });
        }

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

        // Create master timeline
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=7000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollTriggerRef.current = self;
            },
          },
        });

        // Store timeline reference
        timelineRef.current = masterTimeline;

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
              frame: frameCount - 1,
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
              x: isMobile ? "-33vw" : isTablet ? -260 : isLg ? "-28vw" : "-30vw",
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
              x: isMobile ? "33vw" : isTablet ? 260 : isLg ? "25vw" : "27vw",
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
              x: isMobile ? -59 : isTablet ? -117 : isLg ? "-14.2vw" : "-15.5vw",
              duration: 2,
              ease: "power2.inOut",
            },
            6
          )
          .to(
            tourismRef.current,
            {
              x: isMobile ? 59 : isTablet ? 117 : isLg ? "14.2vw" : "15.5vw",
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

    // Preload first few frames for smoother start
    let loadedCount = 0;
    const framesToPreload = Math.min(10, frameCount);
    
    const checkPreloadComplete = () => {
      loadedCount++;
      if (loadedCount >= framesToPreload && !isCleanedUpRef.current) {
        render();
        
        // Wait for model to be ready
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
      }
    };

    // Attach load handlers to first few frames
    for (let i = 0; i < framesToPreload; i++) {
      if (imagesRef.current[i]) {
        if (imagesRef.current[i].complete) {
          checkPreloadComplete();
        } else {
          imagesRef.current[i].onload = checkPreloadComplete;
          imagesRef.current[i].onerror = checkPreloadComplete; // Continue even if some frames fail
        }
      }
    }

    // Cleanup function
    return () => {
      if (isCleaningUpRef.current) return;
      isCleaningUpRef.current = true;
      isCleanedUpRef.current = true;

      // Clear interval first
      if (modelCheckIntervalRef.current) {
        clearInterval(modelCheckIntervalRef.current);
        modelCheckIntervalRef.current = null;
      }

      // Kill GSAP animations in correct order - ScrollTriggers FIRST
      try {
        // CRITICAL: Kill all ScrollTriggers FIRST to stop DOM manipulation
        ScrollTrigger.getAll().forEach(trigger => {
          try {
            trigger.kill(true);
          } catch (e) {
            // Silently handle individual trigger cleanup errors
          }
        });
        
        // Then kill timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }

        // Kill specific scrollTrigger reference
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill(true);
          scrollTriggerRef.current = null;
        }

        // Finally revert GSAP context
        if (gsapContextRef.current) {
          gsapContextRef.current.revert();
          gsapContextRef.current = null;
        }
        
        // Kill all remaining tweens
        gsap.killTweensOf('*');
      } catch (error) {
        // Silently handle cleanup errors
      }

      // Clear canvas
      if (contextRef.current && canvasRef.current) {
        try {
          contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        } catch (e) {
          // Silently handle canvas cleanup errors
        }
      }

      // Reset initialization flag for next mount
      isInitializedRef.current = false;
    };
  }, [mounted, isMobile, isTablet, isLg, responsiveSettings.modelScale, canvasRef, contextRef, containerRef, imageSeqRef, sceneContainerRef, HeadTextRef, ParaTextRef, HeadText2Ref, ParaText2Ref, ceciRef, tourismRef, point1Ref, point2Ref, point3Ref, point4Ref, pioneerRef, worldRef, logoRef, modelGroupRef, totalFrames, imagesRef, imgSeqRef, cleanupRef, isCleanedUpRef, gsapContextRef, frameCount]);
};