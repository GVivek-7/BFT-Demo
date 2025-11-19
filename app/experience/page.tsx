"use client";

import { useState, useEffect } from "react";
import Experience from "@/components/Experience/Experience";
import Hero from "@/components/Experience/Hero";
import Flight from "@/components/Reusable/Flight";

const Page = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader on mount
    setShowLoader(true);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      <Flight isVisible={showLoader} onComplete={handleLoaderComplete} />
      <div style={{ opacity: showLoader ? 0 : 1, transition: "opacity 0.3s" }}>
        <Hero />
        <Experience />
      </div>
    </>
  );
};

export default Page;