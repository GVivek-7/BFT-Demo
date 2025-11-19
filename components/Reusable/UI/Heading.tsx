import React from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div
      className="flex items-center bg-[#eeeeee] w-auto px-6 py-2 rounded-full shadow-md cursor-pointer transition-all duration-500 ease-in-out 
             hover:shadow-xl group overflow-hidden"
    >
      {/* Plane Icon */}
      <BiSolidPlaneAlt
        className="text-black md:text-2xl text-md mr-3 transform transition-all duration-500 ease-in-out
                   group-hover:rotate-[25deg] group-hover:translate-x-2 group-hover:-translate-y-1"
      />
      {/* Heading */}
      <h2
        className="md:text-md text-sm font-regular text-[#04256C] uppercase transition-colors duration-300 
                     group-hover:text-[#04256cc8]"
      >
        {title}
      </h2>
    </div>
  );
};

export default Heading;
