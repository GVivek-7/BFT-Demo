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
}

export interface JourneyProps {
  data: JourneyItem[];
}

const Journeys: React.FC<JourneyProps> = ({ data }) => {
  return (
    <Align>
<div className="pt-40">
      {data.map((item, index) => {
        const words = item.title.split(" ");
        const middleIndex = Math.floor(words.length / 2);

        return (
          <div key={index} className="flex flex-col items-center">
            <h1 className="text-[#141414] text-[30px] sm:text-[32px] md:text-[40px] tracking-tight leading-9 sm:leading-[42px] md:leading-[50px] mb-2 text-center uppercase">
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

            <p className="text-[20px] leading-6 text-center max-w-5xl">
              {item.desc}
            </p>

            <div className="flex py-10">
              <div className="grid md:grid-cols-2  gap-x-4 gap-y-8 max-w-6xl">
                {item.contents.map((content, cIndex) => (
                  <div
                    key={cIndex}
                    className={`flex ${
                      cIndex % 2 === 0 ? "flex-col" : "md:flex-col-reverse flex-col"
                    } items-center justify-center`}
                  >
                    <div className="flex flex-row justify-between gap-8 w-full items-center">
                      <h1
                        style={{
                          color: item.textColor,
                        }}
                        className="text-[100px] leading-[110px] font-semibold text-[#141414] mb-1"
                      >
                        {content.no}
                      </h1>
                      <div>
                        <h2 className="text-lg font-medium">
                          {content.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {content.desc}
                        </p>
                      </div>
                    </div>

                    <Image
                      src={content.img}
                      alt={content.title}
                      width={1000}
                      height={1000}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-3 items-center justify-center mt-10">
        <div className="flex flex-col gap-3 items-center mb-5 ">
 <h1 className="font-bold text-[20px] leading-[22px] tracking-tighter">
          Snip Your Mystery Ticket
        </h1>
        <p className="text-[16px] leading-[18px] font-light">
          Tap the ticket — and let the world of mysteries unfold before you
        </p>
        </div>
       
      <TearImage />

      </div>
    </div>
    </Align>
    
  );
};

export default Journeys;