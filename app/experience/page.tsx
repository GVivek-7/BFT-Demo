"use client";

import { useEffect, useRef } from "react";
import Experience from "@/components/Experience/Experience";
import Hero from "@/components/Experience/Hero";
import Flight from "@/components/Reusable/Flight";

const Page = () => {
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Check if we should scroll to a specific section
    const skipLoader = sessionStorage.getItem("skipLoader") === "true";
    
    if (skipLoader) {
      sessionStorage.removeItem("skipLoader");
      
      const hash = window.location.hash;
      if (hash && !hasScrolledRef.current) {
        hasScrolledRef.current = true;
        
        // Wait for page to fully render, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    }
  }, []);

  return (
    <>
      <div>
        <Flight />
        <Hero />
        <Experience />
      </div>
    </>
  );
};

export default Page;