'use client';

import { useEffect, ReactNode, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global cleanup function for animations
let cleanupCallback: (() => void) | null = null;

export const registerCleanup = (callback: () => void) => {
  cleanupCallback = callback;
};

export const triggerGlobalCleanup = () => {
  if (cleanupCallback) {
    try {
      cleanupCallback();
    } catch (e) {
      // Silently handle cleanup errors
    }
    cleanupCallback = null;
  }

  // Kill all GSAP ScrollTriggers globally
  try {
    const triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      try {
        trigger.kill(true);
      } catch (e) {
        // Silently handle individual trigger errors
      }
    });
    
    // Kill all GSAP tweens
    gsap.killTweensOf('*');
  } catch (e) {
    // Silently handle GSAP cleanup errors
  }
};

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Kill all ScrollTriggers IMMEDIATELY before initializing new Lenis
    try {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill(true);
      });
      gsap.killTweensOf('*');
    } catch (e) {
      // Silently handle cleanup errors
    }
    
    // Initialize Lenis after cleanup
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Destroy Lenis
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // Silently handle errors
        }
        lenisRef.current = null;
      }

      // Kill all ScrollTriggers and tweens
      try {
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.kill(true);
        });
        gsap.killTweensOf('*');
      } catch (e) {
        // Silently handle errors
      }
    };
  }, []); // Empty dependency - only run once per mount

  return <>{children}</>;
}