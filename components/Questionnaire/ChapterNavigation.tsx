"use client";
import { Chapter } from "@/types/questionnaire";
import { motion } from "framer-motion";
import Align from "../Reusable/Align";
import { GoArrowUpLeft } from "react-icons/go";

interface ChapterNavigationProps {
  chapters: Chapter[];
  onChapterSelect: (chapterId: number) => void;
  slug: string;
}

const ChapterNavigation = ({
  chapters,
  onChapterSelect,
}: ChapterNavigationProps) => {
  return (
    <Align>
      <div className="pt-20 lg:pt-35">
        <h1 className="mont text-[32px] sm:text-[40px] md:text-[48px] lg:text-[40px] lg:leading-[50px] uppercase font-light tracking-tighter text-black text-center mb-4">
          Flip through the <span className="font-medium text-[#155A52]">chapters of your journey</span> and
see where the story takes you
        </h1>
      

        {/* Horizontal Scrolling Chapter Cards */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-hide scroll-smooth">
            {chapters.map((chapter, index) => {
              const title = chapter.title || chapter.name || `Chapter ${chapter.id}`;
              const questionCount = chapter.questions?.length || 
                (chapter.sections?.reduce((acc, section) => acc + section.questions.length, 0) || 0);

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="shrink-0 w-[300px] sm:w-[350px]"
                >
                  <button
                    onClick={() => onChapterSelect(chapter.id)}
                    className="w-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left border-t-4 border-[#04256C]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#04256C] text-white text-xl font-bold">
                          {chapter.id}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-[#04256C] mb-1">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {questionCount} {questionCount === 1 ? "question" : "questions"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#04256C]">
                        <GoArrowUpLeft size={20} color="#FFF" className="rotate-180" />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Click to start this chapter
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Grid View for larger screens */}
        {/* <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto px-4">
          {chapters.map((chapter, index) => {
            const title = chapter.title || chapter.name || `Chapter ${chapter.id}`;
            const questionCount = chapter.questions?.length || 
              (chapter.sections?.reduce((acc, section) => acc + section.questions.length, 0) || 0);

            return (
              <motion.div
                key={`grid-${chapter.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onChapterSelect(chapter.id)}
                  className="w-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left border-t-4 border-[#04256C]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#04256C] text-white text-xl font-bold">
                        {chapter.id}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-[#04256C] mb-1">
                          {title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {questionCount} {questionCount === 1 ? "question" : "questions"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#04256C]">
                      <GoArrowUpLeft size={20} color="#FFF" className="rotate-180" />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Click to start this chapter
                    </p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div> */}
      </div>
    </Align>
  );
};

export default ChapterNavigation;
