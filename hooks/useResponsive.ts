import { useEffect, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export const useResponsive = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLg, setIsLg] = useState(false);

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

  return {
    mounted,
    isMobile,
    isTablet,
    isLg,
    responsiveSettings,
  };
};