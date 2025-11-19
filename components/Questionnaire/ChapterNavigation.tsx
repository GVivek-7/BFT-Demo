"use client";
import { Chapter } from "@/types/questionnaire";
import { motion } from "framer-motion";
import Align from "../Reusable/Align";
import Image from "next/image";
import * as ChapterImages from "@/assets/Questionnaire/ChapterNavigation";

interface ChapterNavigationProps {
  chapters: Chapter[];
  onChapterSelect: (chapterId: number) => void;
  slug: string;
}

const ChapterNavigation = ({
  chapters,
  onChapterSelect,
}: ChapterNavigationProps) => {
  const handleChapterClick = (chapterId: number) => {
    // Smooth scroll to top before transitioning
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay to let scroll complete before transition
    setTimeout(() => onChapterSelect(chapterId), 300);
  };

  const getLineColor = (index: number) => {
    const colors = [
      '#E5E7EB', // gray-200
      '#D1D5DB', // gray-300
      '#9CA3AF', // gray-400
      '#6B7280', // gray-500
      '#4B5563', // gray-600
      '#374151', // gray-700
      '#1F2937', // gray-800
      '#111827', // gray-900
      '#0C1E3D', // dark blue
      '#04256C', // final dark blue
    ];
    return colors[Math.min(index, 9)];
  };
  return (
     <div className="pt-20 lg:pt-35">
        <h1 className="mont text-[32px] sm:text-[40px] md:text-[48px] lg:text-[40px] lg:leading-[50px] uppercase font-light tracking-tighter text-black text-center mb-4 max-w-5xl mx-auto px-5">
          Flip through the{" "}
          <span className="font-medium text-[#155A52]">
            chapters of your journey
          </span>{" "}
          and see where the story takes you
        </h1>

        {/* Horizontal Scrolling Chapter Cards */}
        <div className="relative pt-20 pb-10">
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-hide scroll-smooth">
            {chapters.map((chapter, index) => {
              const title =
                chapter.title || chapter.name || `Chapter ${chapter.id}`;
              
              // Get the chapter image - either from chapter data or fallback to numbered image
              const chapterImage = chapter.image || ChapterImages[`ChapterImage${chapter.id}` as keyof typeof ChapterImages];

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="shrink-0 w-[300px] sm:w-[380px]"
                >
                  <button
                    onClick={() => handleChapterClick(chapter.id)}
                    className="w-full rounded-2xl p-8 transition-all duration-300 hover:scale-105  text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-row items-start gap-3">
                        <motion.div 
                          className="w-40 h-0.5 rounded-full mt-3  transition-all duration-300"
                          initial={{ backgroundColor: '#E5E7EB' }}
                          animate={{ backgroundColor: getLineColor(index) }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                        <div className="flex flex-col gap-3 w-full">
                          
                          <div className="flex flex-row gap-3">
                            <span className="flex items-center justify-center min-w-8 w-8 h-8 shrink-0 rounded-lg bg-[#04256C] text-white text-md font-bold group-hover:scale-110 transition-transform duration-300">
                            {chapter.id}
                          </span>
                            <h3 className="text-xl max-w-[250px] text-[#282828] mb-1 group-hover:text-[#04256C] transition-colors duration-300">
                              {title}
                            </h3>
                          </div>

                          {chapterImage && (
                            <div className="overflow-hidden rounded-lg">
                              <Image 
                                src={chapterImage} 
                                alt={title}
                                width={200}
                                height={200}
                                className="object-contain group-hover:scale-105  transition-transform duration-300"
                              />
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
  
  );
};

export default ChapterNavigation;
