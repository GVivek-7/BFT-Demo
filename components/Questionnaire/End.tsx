"use client";
import Image from "next/image";
import { IoAirplaneSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Button from "../Reusable/UI/Button";
import { useState, useEffect } from "react";
import { Qd1, Qd2, Qd3, Qd4 } from "@/assets/Questionnaire/Form";

const End = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  const images = [
    { img: Qd1 },
    { img: Qd2 },
    { img: Qd3 },
    { img: Qd4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="relative flex flex-col md:justify-center justify-center w-full md:px-10 px-5 md:items-start items-center gap-4 min-h-screen">
      <div className="md:mb-0 mb-4">
        <h1 className="text-[#04256C] text-[30px] md:text-[40px] tracking-tighter font-medium md:text-start text-center">
          STAY TUNED
        </h1>
        <p className="text-[#141414] md:text-[24px] text-[16px] md:text-start text-center">
          Your blindfolded adventure is on its way! Responses saved successfully!
        </p>
      </div>

      <Button
        label="BACK TO HOME PAGE"
        bgColor="#04256C"
        textColor="#FFFFFF" 
        logo={<IoAirplaneSharp size={19} color="#000" />}
        logoBg="#FFFFFF"
        height="h-12"
        width="w-58"
        onClick={handleBackToHome}
      />

      {/* Desktop Images - Right Side */}
      <div className="hidden md:flex absolute -right-15 -top-14 h-screen w-1/3 flex-col justify-center items-end pr-10 pointer-events-none z-10">
        {images.map((item, index) => {
          const parallaxOffset = scrollY * (0.05 + index * 0.02);

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-out group pointer-events-auto ${
                index === 0
                  ? "top-[10%] right-[5%] z-10"
                  : index === 1
                  ? "top-[33%] right-[4%] z-5"
                  : index === 2
                  ? "top-[52%] right-[5%] z-30"
                  : "top-[74%] right-[5%] z-40"
              }`}
              style={{
                transform: `translateY(${-parallaxOffset}px) rotate(${
                  index === 0
                    ? "-79deg"
                    : index === 1
                    ? "-18deg"
                    : index === 2
                    ? "102deg"
                    : "80deg"
                })`,
              }}
            >
              <Image
                src={item.img}
                alt={`questionnaire-decoration-${index + 1}`}
                width={300}
                height={300}
                className={`w-100 md:w-50 lg:w-50 transition-all duration-500 ease-out cursor-pointer ${
                  index === 0
                    ? "group-hover:translate-x-[-15px] group-hover:translate-y-[-15px] group-hover:scale-105"
                    : index === 1
                    ? "group-hover:translate-x-[15px] group-hover:translate-y-[-15px] group-hover:scale-105"
                    : index === 2
                    ? "group-hover:-translate-x-3 group-hover:translate-y-[-18px] group-hover:scale-105"
                    : "group-hover:translate-x-[15px] group-hover:-translate-y-2.5 group-hover:scale-105"
                } group-hover:shadow-2xl group-hover:z-50`}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Images - Bottom */}
      <div className="md:hidden absolute -bottom-20 left-0 right-0 w-full max-w-6xl h-[200px] flex justify-center items-end pb-4 pointer-events-none z-10">
        <div className="relative w-full h-full flex justify-center items-end">
          {images.map((item, index) => {
            const mobileParallaxOffset = scrollY * 0.03;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-out pointer-events-auto ${
                  index === 0
                    ? "bottom-[10%] left-[-3%] z-20"
                    : index === 1
                    ? "bottom-[25%] left-[25%] z-10"
                    : index === 2
                    ? "bottom-[25%] right-[5%] z-30"
                    : "bottom-[20%] right-[-15%] z-40"
                }`}
                style={{
                  transform: `translateY(${-mobileParallaxOffset}px) rotate(${
                    index === 0
                      ? "-35deg"
                      : index === 1
                      ? "-15deg"
                      : index === 2
                      ? "15deg"
                      : "65deg"
                  })`,
                }}
              >
                <Image
                  src={item.img}
                  alt={`questionnaire-decoration-${index + 1}`}
                  width={180}
                  height={180}
                  className="w-38 h-38 transition-all duration-300 ease-out"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default End;
