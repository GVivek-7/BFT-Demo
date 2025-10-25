import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { GoArrowUpLeft } from "react-icons/go";
import { useState } from "react";

export default function SwipeButton() {
  const [swiped, setSwiped] = useState(false);
  const x = useMotionValue(0);
  
  const maxDrag = 271; 

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x > maxDrag * 0.6) {
      // Animate to the end position
      animate(x, maxDrag, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
      setSwiped(true);
      setTimeout(() => {
        setSwiped(false);
        animate(x, 0, {
          type: "spring",
          stiffness: 300,
          damping: 30
        });
      }, 1500);
    } else {
      // Snap back to start
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
    }
  };

  return (
    <div className="">
      <motion.button
        className="relative inline-flex items-center justify-between rounded-full p-1 overflow-hidden font-semibold select-none bg-[#FFA62B]"
      >
        {/* Draggable circle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          style={{ x }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="w-10 h-10 flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-md z-10 flex-shrink-0 bg-white"
        >
          <div className="text-[#FFA62B]">
            <GoArrowUpLeft size={22} />
          </div>
        </motion.div>

        {/* Text (changes during swipe) */}
        <span
          className="pointer-events-none tracking-wide text-sm font-semibold whitespace-nowrap px-4 pl-4 pr-4 text-white"
        >
          SWIPE TO UNLOCK SURPRISE TRIP
        </span>
      </motion.button>
    </div>
  );
}