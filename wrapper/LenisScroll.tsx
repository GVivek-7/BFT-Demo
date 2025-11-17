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
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Trigger global cleanup on route change
    triggerGlobalCleanup();
    
    // Small delay to ensure previous cleanup completes
    const timeoutId = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1, // Increase duration for slower scrolling
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smoother easing curve
        lerp: 0.1, // Lower lerp for more inertia and slower response
        smoothWheel: true, // Ensure wheel scrolling is smooth
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        }
      }

      rafIdRef.current = requestAnimationFrame(raf);
    }, 50);

    return () => {
      // Clear timeout if component unmounts before initialization
      clearTimeout(timeoutId);

      // Cancel animation frame first
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Then destroy Lenis
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // Silently handle Lenis cleanup errors
        }
        lenisRef.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}