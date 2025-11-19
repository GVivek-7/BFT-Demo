import { CraftedJourney } from "../../data/Experience/CraftedJourney";
import { MysteryVoyageContents } from "../../data/Experience/MysteryVoyage";
import { PurposeRetreat } from "../../data/Experience/PurposeRetreat";
import { TailoredEscape } from "../../data/Experience/TailoredEscape";
import Journeys, { JourneyItem } from "../Reusable/Journeys";
import Heading from "../Reusable/UI/Heading";

const AllJourneys: JourneyItem[][] = [
  MysteryVoyageContents,
  TailoredEscape,
  PurposeRetreat,
  CraftedJourney,
];

const Experience = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
        <Heading title="OUR EXPERIENCE" />

      <h1 className="mont text-[#141414] text-[30px] sm:text-[32px] md:text-[40px] font-semibold tracking-tighter leading-9 sm:leading-[42px] md:leading-[50px] mt-2 mb-2 text-center uppercase">
        Four Journeys. One Emotion Freedom.
      </h1>
      <p className="text-[16px] sm:text-[20px] md:text-[24px] leading-6 sm:leading-7 md:leading-8 max-w-5xl font-light text-center px-4 tracking-normal">
        Every journey is a mirror — reflecting what your soul secretly seeks.
        Choose the path that speaks to your emotion, not your logic.
      </p>

      {AllJourneys.map((item, index) => (
        <Journeys key={index} data={item} />
      ))}
      
    </div>
  );
};

export default Experience;
