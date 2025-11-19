"use client";
import React, { ReactNode } from "react";

interface ButtonProps {
  label: string;
  logo?: ReactNode;
  bgColor?: string;      // Button background
  textColor?: string;    // Button text color
  logoBg?: string;       // Circle background
  hoverBgColor?: string; // Hover background
  height?: string;       // Button height - now accepts Tailwind classes like "h-12"
  maxWidth?: string;     // Button max-width
  width?: string; 
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  logo,
  bgColor = "#FFA62B",
  textColor = "#FFFFFF",
  logoBg = "#FFFFFF",
  height = "h-12",
  width = "w-auto",
  maxWidth = "max-w-full",
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center font-semibold rounded-full pr-4 pl-1 py-1 transition-all duration-300 cursor-pointer group z-10 ${height} ${width} ${maxWidth} ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Circular Logo Container */}
      <div
        className="flex items-center justify-center rounded-full mr-3 transition-all duration-500"
        style={{
          backgroundColor: logoBg,
          width: "2.5rem",
          height: "2.5rem",
        }}
      >
        {logo && (
          <div className="transition-all duration-500 group-hover:scale-105">
            {logo}
          </div>
        )}
      </div>

      {/* Button Text */}
      <span className="font-light uppercase tracking-wider text-sm sm:text-[14px] transition-all duration-300">
        {label}
      </span>
    </button>
  );
};

export default Button;