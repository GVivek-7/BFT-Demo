import React from "react";
import Image from "next/image";
import TearImage from "./TearImage";
import Align from "./Align";

export interface JourneyContent {
  no: string;
  title: string;
  desc: string;
  img: string;
}

export interface JourneyItem {
  title: string;
  desc: string;
  textColor: string;
  contents: JourneyContent[];
  destinationUrl?: string;
}

export interface JourneyProps {
  data: JourneyItem[];
}

const Journeys: React.FC<JourneyProps> = ({ data }) => {
  return (
    <Align>
<div className="pt-20 sm:pt-32 md:pt-40">
      {data.map((item, index) => {
        const words = item.title.split(" ");
        const middleIndex = Math.floor(words.length / 2);

        return (
          <div key={index} className="flex flex-col items-center">
            <h1 className="text-[#141414] mont tracking-tighter text-[30px] sm:text-[32px] md:text-[40px] leading-9 sm:leading-[42px] md:leading-[50px] mb-2 text-center uppercase">
              {words.map((word, i) => {
                const isMiddle = i === middleIndex;

                return (
                  <span
                    key={i}
                    className={isMiddle ? "font-light" : "font-medium"}
                    style={{
                      color: isMiddle ? item.textColor : "inherit",
                    }}
                  >
                    {word}
                    {i < words.length - 1 && " "}
                  </span>
                );
              })}
            </h1>

            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-6 text-center max-w-5xl px-4">
              {item.desc}
            </p>

            <div className="flex py-6 sm:py-8 md:py-10 w-full">
              <div className="grid md:grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 max-w-6xl w-full">
                {item.contents.map((content, cIndex) => (
                  <div
                    key={cIndex}
                    className={`flex ${
                      cIndex % 2 === 0 ? "flex-col" : "md:flex-col-reverse flex-col"
                    } items-center justify-center gap-4`}
                  >
                    <div className="flex flex-row justify-between gap-4 sm:gap-6 md:gap-8 w-full items-center">
                      <h1
                        style={{
                          color: item.textColor,
                        }}
                        className="text-[60px] sm:text-[80px] md:text-[100px] leading-[70px] sm:leading-[90px] md:leading-[110px] font-semibold text-[#141414] mb-1 flex-shrink-0"
                      >
                        {content.no}
                      </h1>
                      <div className="flex-1">
                        <h2 className="text-base sm:text-lg font-medium mont tracking-travel">
                          {content.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {content.desc}
                        </p>
                      </div>
                    </div>

                    <Image
                      src={content.img}
                      alt={content.title}
                      width={1000}
                      height={1000}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center mt-6 sm:mt-8 md:mt-10 w-full">
              <div className="flex flex-col gap-2 sm:gap-3 items-center mb-3 sm:mb-5 ">
                <h1 className="font-bold text-[18px] sm:text-[20px] leading-[20px] mont sm:leading-[22px] tracking-tighter text-center">
                  Snip Your Mystery Ticket
                </h1>
                <p className="text-[14px] sm:text-[16px] leading-[16px] sm:leading-[18px] font-light text-center">
                  Tap the ticket — and let the world of mysteries unfold before you
                </p>
              </div>
             
              <TearImage destinationUrl={item.destinationUrl} />
            </div>
          </div>
        );
      })}
    </div>
    </Align>
    
  );
};

export default Journeys;