"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FAQ_CONTENTS } from "@/data/Contact/Faq";



const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col md:space-y-0 space-y-5 md:pb-0 pb-10">
    <h1 className="mont md:text-[40px] md:leading-11 font-light uppercase tracking-tighter md:mb-10">
          Got Something{" "}
          <span className="font-medium text-[#155A52]">Specific in Mind?</span>
        </h1>
      <div className="flex md:flex-row flex-col-reverse  w-full md:h-[350px]">
      {/* Left Section - FAQ */}
      <div className="md:w-1/2 h-full flex flex-col justify-center md:mt-0 mt-5">
        <div className="space-y-2.5 ">
          {FAQ_CONTENTS.map((item) => (
            <div key={item.id} className=" pb-3">
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <h3 className="mont uppercase md:text-[24px] md:leading-[26px] font-light text-black transition-colors">
                  {item.ques}
                </h3>
                <motion.div
                  animate={{ rotate: openId === item.id ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mt-1"
                >
                  {openId === item.id ? (
                    <IoClose className="w-5 h-5 text-black" />
                  ) : (
                    <AiOutlinePlus className="w-5 h-5 text-black transition-colors" />
                  )}
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="md:text-[16px] leading-[18px] font-regular text-black mt-3 pr-8">
                      {item.ans}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Section - Image */}
      <div className="md:w-1/2 w-full h-full flex items-center justify-center">
        <Image
          src="https://ik.imagekit.io/99y1fc9mh/BFT/Contact/Frame%20897.png?updatedAt=1762934443975"
          alt="FAQ Illustration"
          width={500}
          height={500}
          className="object-contain md:w-[90%] w-full h-full rounded-xl"
        />
      </div>
    </div>
    </div>
  
  );
};

export default Faq;