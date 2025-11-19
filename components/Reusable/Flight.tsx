"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FlightProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const Flight = ({ isVisible, onComplete }: FlightProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const totalFrames = 240;
  const currentFrame = (index: number) =>
    `/flight/${(index + 1).toString().padStart(4, '0')}.webp`;

  const images: HTMLImageElement[] = [];
  const imgSeq = { frame: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    canvas.width = 1920;
    canvas.height = 1080;

    // Preload all images
    let loadedCount = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Render first frame immediately
          render();
        }
      };
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

    // Play animation when visible
    let animation: gsap.core.Tween | null = null;
    
    if (isVisible) {
      imgSeq.frame = 0;
      render();
      
      animation = gsap.to(imgSeq, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "power1.inOut",
        duration: 6,
        onUpdate: render,
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <section
      ref={sectionRef}
      className="fixed inset-0 w-full h-screen overflow-hidden  z-[9999]"
      style={{
          backgroundImage:
            "url('https://ik.imagekit.io/99y1fc9mh/BFT/Experience/bft%20banner%204.png?updatedAt=1761896072995')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}

    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover"
        />
      </div>
    </section>
  );
};

export default Flight;
