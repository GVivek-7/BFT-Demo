"use client";
import React from "react";

import { ADDRESS_INFO } from "@/data/Contact/AddressInfo";

const Location: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 py-20">
      <h1 className="mont md:text-[40px] md:leading-11 font-light uppercase tracking-tighter">
        Reach Out <span className="font-medium text-[#E6AF2E]">to Us</span>
      </h1>
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
        {/* Map */}
        <div className="w-full md:w-[70%] h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.40934811861!2d80.64390175854025!3d16.495661547955347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fabf51d8f673%3A0xabcf19782fbb3309!2sBenz%20Circle%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520010!5e0!3m2!1sen!2sin!4v1762930505259!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="rounded-[14px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address Info */}
        <div className="w-full md:w-[30%] h-[400px] flex flex-col gap-4 justify-between">
          {ADDRESS_INFO.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#EBEBEB] rounded-xl p-5 pl-13 flex flex-row items-center  gap-5 shadow-sm flex-1"
              >
                <div className="text-2xl text-black">
                  <Icon />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold mont text-[#04256C] md:text-[20px] text-[15px] md:leading-[22px]">
                    {item.title}
                  </span>
                  <span className="text-black md:text-[20px] text-[15px] md:leading-[22px]">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Location;
