'use client';

import { useEffect, ReactNode, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  try {
    const triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      try {
        trigger.kill(true);
      } catch (e) {
        // Silently handle individual trigger errors
      }
    });
    gsap.killTweensOf('*');
  } catch (e) {
    // Silently handle GSAP cleanup errors
  }
};

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // Only scroll to top if pathname actually changed and there's no hash
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      
      if (!window.location.hash) {
        requestAnimationFrame(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        });
      }
    }
  }, [pathname]);

  useEffect(() => {
    try {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
      gsap.killTweensOf('*');
    } catch (e) {
      // Silently handle cleanup errors
    }
    
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

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // Silently handle errors
        }
        lenisRef.current = null;
      }

      try {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        gsap.killTweensOf('*');
      } catch (e) {
        // Silently handle errors
      }
    };
  }, []);

  return <>{children}</>;
}