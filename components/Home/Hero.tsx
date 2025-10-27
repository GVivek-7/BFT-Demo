"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onSequenceComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSequenceComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sequenceCompleteRef = useRef(false);
  const totalFrames = 181;
  const currentFrame = (index: number) =>
    `/framesBft/frame_${(index + 1).toString().padStart(4, "0")}.webp`;

  const images: HTMLImageElement[] = [];
  const imgSeq = { frame: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[imgSeq.frame];
      if (!img || !img.complete) return;
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        x,
        y,
        imgWidth * scale,
        imgHeight * scale
      );
    };

    images[0].onload = () => {
      render();

      // Timeline for sequential text animations
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=10",
          end: "+=3000",
          scrub: 1,
        },
      });

      gsap.to(imgSeq, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
           onLeave: () => {
            // Call the completion callback when hero sequence ends
            if (!sequenceCompleteRef.current) {
              sequenceCompleteRef.current = true;
              onSequenceComplete?.();
            }
          },
        },
        onUpdate: render,
      });
    };

    canvas.width = 1920;
    canvas.height = 1080;
  }, []);

  return (
    <>
    
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover z-10"
        />
      </div>
    </section>
    </>
    
  );
};

export default Hero;
