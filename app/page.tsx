import BeyondTravel from "@/components/Home/BeyondTravel";
import Experience from "@/components/Home/Experience";
import Scene from "@/components/Home/Scene";

import ShowReel from "@/components/Home/ShowReel";
import Stories from "@/components/Home/Stories";
import Surprise from "@/components/Home/Surprise";
// import SimpleFPS from "@/components/Reusable/FPSMeter";

export default function Home() {
  return (
    <>
    {/* <SimpleFPS /> */}
      <Scene /> 
      <Experience />
      <Surprise />
      <Stories />
      <ShowReel />
      <BeyondTravel />
    </>
  );
}
