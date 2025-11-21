"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "@/components/Experience/Experience";
import Hero from "@/components/Experience/Hero";
import Flight from "@/components/Reusable/Flight";

const Page = () => {
  const [showFlight, setShowFlight] = useState(true);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Check if we should skip the flight animation
    const skipLoader = sessionStorage.getItem("skipLoader") === "true";
    if (skipLoader) {
      setShowFlight(false);
      sessionStorage.removeItem("skipLoader"); // Clean up
      
      // Kill all ScrollTriggers to prevent scroll locking
      setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        ScrollTrigger.refresh();
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Handle scrolling to hash after flight is hidden
    if (!showFlight && !hasScrolledRef.current) {
      const hash = window.location.hash;
      if (hash) {
        hasScrolledRef.current = true;
        // Use a longer timeout to ensure page is fully rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: "smooth", 
              block: "start" 
            });
          }
        }, 300);
      }
    }
  }, [showFlight]);

  // Reset scroll lock on mount
  useEffect(() => {
    // Ensure body is scrollable
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div>
        {showFlight && <Flight />}
        <Hero />
        <Experience />
      </div>
    </>
  );
};

export default Page;