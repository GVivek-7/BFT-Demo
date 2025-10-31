"use client";
import React, { useRef, useEffect } from "react";
import Heading from "../Reusable/Ui/Heading";
import Align from "../Reusable/Align";

const Surprise: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Optimize video playback settings
    video.playbackRate = 1.0;
    video.defaultPlaybackRate = 1.0;
    
    // Handle seamless loop by restarting before end
    const handleTimeUpdate = (): void => {
      if (video.duration && video.duration - video.currentTime < 0.044) {
        video.currentTime = 0;
      }
    };
    
    // Handle video end as backup
    const handleEnded = (): void => {
      video.currentTime = 0;
      video.play().catch((err: Error) => console.log("Loop replay error:", err));
    };
    
    // Prevent buffering stalls
    const handleWaiting = (): void => {
      if (video.readyState >= 2) {
        video.play().catch((err: Error) => console.log("Resume after waiting:", err));
      }
    };
    
    // Force autoplay on mount
    const playVideo = async (): Promise<void> => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch (err) {
        console.log("Autoplay prevented:", err);
      }
    };
    
    playVideo();
    
    // Add all event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            video.play().catch((err: Error) => console.log("Play error:", err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    
    observer.observe(video);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="py-20 w-full flex items-start justify-start">
      <div className="flex flex-col items-start md:gap-5 gap-4 w-full">
        <Align className="w-full flex flex-col items-start justify-center gap-5">
          <div className="flex">
            <Heading title="THE SCIENCE OF SURPRISE" />
          </div>

          <h1 className="text-black md:text-[40px] text-[30px] md:leading-10 leading-[30px] uppercase font-heading font-semibold">
             The Psychology of Surprise
          </h1>
          <p className="text-black md:text-[20px] text-[14px] md:leading-6 leading-4 text-start max-w-5xl font-light">
            Behind every blindfold lies a crafted symphony of design and emotion. We translate your rhythm, pace, and presence into a journey that feels alive. This isn&apos;t randomness — it&apos;s resonance. <br />

          </p>
          <p className="text-black md:text-[20px] text-[14px] md:leading-6 leading-4 text-start max-w-2xl font-light">
                        Every blindfold conceals a map written in emotion. We simply follow your heartbeat to where you&apos;re meant to be.
          </p>
        </Align>
        {/* Video Section */}
        <div className="w-full mt-6">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover" 
            playsInline 
            autoPlay 
            muted 
            loop
            preload="auto"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <source
              src="https://ik.imagekit.io/99y1fc9mh/BFT/envato_video_gen_Oct_25_2025_11_16_54%20(1).mp4?updatedAt=1761399731545"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Surprise;