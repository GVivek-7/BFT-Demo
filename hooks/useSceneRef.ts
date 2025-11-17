import { useRef } from "react";
import gsap from "gsap";
import { Group } from "three";


export const useSceneRefs = () => {
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSeqRef = useRef<HTMLDivElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  // Text refs
  const HeadTextRef = useRef<HTMLHeadingElement>(null);
  const ParaTextRef = useRef<HTMLParagraphElement>(null);
  const HeadText2Ref = useRef<HTMLHeadingElement>(null);
  const ParaText2Ref = useRef<HTMLParagraphElement>(null);
  const ceciRef = useRef<HTMLHeadingElement>(null);
  const tourismRef = useRef<HTMLHeadingElement>(null);
  const point1Ref = useRef<HTMLParagraphElement>(null);
  const point2Ref = useRef<HTMLParagraphElement>(null);
  const point3Ref = useRef<HTMLParagraphElement>(null);
  const point4Ref = useRef<HTMLParagraphElement>(null);
  const pioneerRef = useRef<HTMLParagraphElement>(null);
  const worldRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<Group | null>(null);

  // Image sequence refs
  const totalFrames = 425;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const imgSeqRef = useRef({ frame: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);
  const isCleanedUpRef = useRef(false);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  return {
    canvasRef,
    contextRef,
    containerRef,
    imageSeqRef,
    sceneContainerRef,
    HeadTextRef,
    ParaTextRef,
    HeadText2Ref,
    ParaText2Ref,
    ceciRef,
    tourismRef,
    point1Ref,
    point2Ref,
    point3Ref,
    point4Ref,
    pioneerRef,
    worldRef,
    logoRef,
    modelGroupRef,
    totalFrames,
    imagesRef,
    imgSeqRef,
    cleanupRef,
    isCleanedUpRef,
    gsapContextRef,
  };
};