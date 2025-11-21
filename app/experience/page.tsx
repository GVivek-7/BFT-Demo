"use client";

import { useEffect, useState, useRef } from "react";
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
    }
  }, []);

  useEffect(() => {
    // Handle scrolling to hash after flight is hidden
    if (!showFlight && !hasScrolledRef.current) {
      const hash = window.location.hash;
      if (hash) {
        hasScrolledRef.current = true;
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
        }, 100);
      }
    }
  }, [showFlight]);

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