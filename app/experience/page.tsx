  "use client";

  import { useState, useEffect, useRef } from "react";
  import { useSearchParams } from "next/navigation";
  import Experience from "@/components/Experience/Experience";
  import Hero from "@/components/Experience/Hero";
  import Flight from "@/components/Reusable/Flight";

  const Page = () => {
    const searchParams = useSearchParams();
    const [showLoader, setShowLoader] = useState(true);
    const [removeFlight, setRemoveFlight] = useState(false);
    const hasScrolledRef = useRef(false);

    // useEffect(() => {
    //   const skipLoader = searchParams.get("skipLoader") === "true";
    //   if (skipLoader) {
    //     setShowLoader(false);
    //     setRemoveFlight(true);
    //   }
    // }, [searchParams]);

    // useEffect(() => {
    //   if (!showLoader && !hasScrolledRef.current) {
    //     const hash = window.location.hash;
    //     if (hash) {
    //       hasScrolledRef.current = true;
    //       setTimeout(() => {
    //         const element = document.querySelector(hash);
    //         if (element) {
    //           const offset = 100;
    //           const elementPosition = element.getBoundingClientRect().top;
    //           const offsetPosition = elementPosition + window.pageYOffset - offset;

    //           window.scrollTo({
    //             top: offsetPosition,
    //             behavior: "smooth",
    //           });
    //         }
    //       }, 100);
    //     }
    //   }
    // }, [showLoader]);

    // const handleLoaderComplete = () => {
    //   setRemoveFlight(true);
    //   setTimeout(() => {
    //     window.scrollTo(0, 0);
    //     setShowLoader(false);
    //   }, 100);
    // };

    return (
      <>
        {/* {!removeFlight && (
          <Flight isVisible={showLoader} onComplete={handleLoaderComplete} />
        )} */}
        <div>
          <Flight />
          <Hero />
          <Experience />
        </div>
      </>
    );
  };

  export default Page;