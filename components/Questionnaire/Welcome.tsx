"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Align from "../Reusable/Align";
import Button from "../Reusable/UI/Button";
import { GoArrowLeft, GoArrowUpLeft } from "react-icons/go";

const IMAGES = [
  {
    id: 1,
    img: "https://ik.imagekit.io/99y1fc9mh/BFT/Questionnaire/Container%20(21).png?updatedAt=1763189404836",
  },
  {
    id: 2,
    img: "https://ik.imagekit.io/99y1fc9mh/BFT/Questionnaire/Container%20(22).png?updatedAt=1763189404774",
  },
];

const STEP1_ITEMS = [
  "Every great story begins with a little mystery — and yours starts right here.",
  "The moment you share a few details, the universe starts weaving a journey shaped just for you. Maybe it's the sound of waves calling your name, or the hum of a city waiting to surprise you — either way, your adventure is already in motion.",
  "All it takes is one small step into the unknown. Fill in your details, get your surprise trip plan, and let curiosity lead the way. Because sometimes, the best journeys are the ones you never see coming.",
];

const STEP2_ITEMS = [
  "Before we whisk you away on a mystery adventure, let’s see if BlindfoldTrips matches your travel vibe! ✨Pick how you’d love to travel — by road, air, or maybe something a little unexpected.",
  "Just a heads-up: every traveler should be at least 10 years old, with one adult (18 or older) in the mix. Now, buckle up — your journey’s about to begin!",
];

interface WelcomeProps {
  onComplete: () => void;
  slug: string;
}

const Welcome = ({ onComplete }: WelcomeProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");

  const handleContinue = () => {
    if (userName.trim()) {
      onComplete();
    }
  };

  const handleBackToExperience = () => {
    router.push("/experience");
  };

  return (
    <Align>


      <div className="flex flex-col items-center justify-center py-30 lg:py-35 ">
        <div className="relative w-full mb-2 flex items-center justify-center">
          <button 
            onClick={handleBackToExperience}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#E1E1E1] p-3 rounded-full block cursor-pointer z-10 hover:bg-[#E1E1E1]/90 transition-colors"
          >
            <GoArrowLeft color="black" size={22} />
          </button>
          <h1 className="mont text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[30px] sm:leading-[36px] md:leading-[44px] lg:leading-[50px] uppercase font-medium tracking-tighter text-[#04256C] text-center">
            <span className="text-black font-light">The</span> BlindfoldTrips
            Travel Vibe Check
          </h1>
        </div>

        <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[20px] sm:leading-[22px] md:leading-[24px] lg:leading-[26px] text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4">
          Where the only spoiler is the destination
        </p>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-center justify-center w-full ">
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-5 shrink-0">
            {IMAGES.map((item) => (
              <Image
                key={item.id}
                src={item.img}
                alt="Image"
                width={1000}
                height={1000}
                className="w-40 sm:w-[160px] md:w-[200px] lg:w-90"
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              // step 1
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}  
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 md:gap-6 text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[24px] tracking-tight"
              >
                {STEP1_ITEMS.map((text, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="w-[3px] min-w-[3px] h-auto self-stretch bg-black rounded-sm flex-shrink-0"></span>
                    <p className="flex-1">{text}</p>
                  </div>
                ))}

                <Button
                  label="Get started!"
                  bgColor="#FFA62B"
                  textColor="#FFFFFF"
                  logo={<GoArrowUpLeft size={22} color="#000" />}
                  logoBg="#FFFFFF"
                  height="h-12"
                  width="w-45"
                  className="px-5"
                  onClick={() => setStep(2)}
                />
                
              </motion.div>
            ) : (
              // Step 2
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 md:gap-6 text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[24px] tracking-tight"
              >
                {STEP2_ITEMS.map((text, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="w-[3px] min-w-[3px] h-auto self-stretch bg-black rounded-sm shrink-0"></span>
                    <p className="flex-1">{text}</p>
                  </div>
                ))}
                <div className="flex md:flex-row flex-col md:items-center justify-start gap-3">
                  <h2 className="font-medium whitespace-nowrap">
                    What should we call you?
                  </h2>
                  <input
                    placeholder="Enter your name"
                    className="bg-[#E1E1E1] px-5 py-4 rounded-full"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <Button
                  label="Continue"
                  bgColor="#FFA62B"
                  textColor="#FFFFFF"
                  logo={<GoArrowUpLeft size={22} color="#000" />}
                  logoBg="#FFFFFF"
                  height="h-12"
                  width="w-45"
                  className="px-5"
                  onClick={handleContinue}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Align>
  );
};

export default Welcome;
