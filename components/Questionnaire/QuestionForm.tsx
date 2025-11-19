"use client";
import { Chapter, Question } from "@/types/questionnaire";
import { motion } from "framer-motion";
import Button from "../Reusable/UI/Button";
import { GoArrowLeft } from "react-icons/go";
import Align from "../Reusable/Align";
import { Qd1, Qd2, Qd3, Qd4 } from "@/assets/Questionnaire/Form";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoAirplaneSharp } from "react-icons/io5";

interface QuestionFormProps {
  chapter: Chapter;
  answers: Record<string, string | string[] | undefined>;
  onAnswerChange: (
    questionId: string,
    value: string | string[] | undefined
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBackToChapters: () => void;
  isFirstChapter: boolean;
  isLastChapter: boolean;
}

const QuestionForm = ({
  chapter,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onBackToChapters,
  isFirstChapter,
  isLastChapter,
}: QuestionFormProps) => {
  const title = chapter.title || chapter.name || `Chapter ${chapter.id}`;
  const [scrollY, setScrollY] = useState(0);

  const images = [
    { img: Qd1 },
    { img: Qd2 },
    { img: Qd3 },
    { img: Qd4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderQuestion = (question: Question, index: number = 0) => {
    const questionText = question.ques || question.label || "";

    switch (question.type) {
      case "radio":
        return (
          <motion.div
            key={question.id}
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="w-[3px] h-6 bg-black rounded-full inline-block"></span>
              <h3 className="text-lg md:text-[20px] font-regular">
                {questionText}
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {question.options?.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center gap-3 rounded-xl cursor-pointer
                    transition-all duration-200
                    ${
                      answers[question.id] === option.value
                        ? "text-black font-medium"
                        : "text-gray-700"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) =>
                      onAnswerChange(question.id, e.target.value)
                    }
                    className="w-5 h-5 accent-black"
                  />
                  <span className="text-base md:text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        );

      case "checkbox":
        return (
          <motion.div
            key={question.id}
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-[3px] h-6 bg-black rounded-full inline-block"></span>

              <h3 className="text-lg md:text-xl font-medium">{questionText}</h3>
            </div>
            <div className="flex flex-col gap-3">
              {question.options?.map((option) => {
                const selectedValues = Array.isArray(answers[question.id])
                  ? (answers[question.id] as string[])
                  : [];
                const isChecked = selectedValues.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className={`
                      flex items-center gap-3 p-1 rounded-xl  cursor-pointer
                      transition-all duration-200
                      ${isChecked ? "text-black font-medium" : "text-gray-700"}
                    `}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedValues, option.value]
                          : selectedValues.filter(
                              (v: string) => v !== option.value
                            );
                        onAnswerChange(question.id, newValues);
                      }}
                      className="w-5 h-5 appearance-none border-0 bg-[#E1E1E1] rounded checked:bg-[#E1E1E1] checked:border-0 cursor-pointer relative
                        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        before:w-3 before:h-3 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgNEw0LjUgNy41TDExIDEiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] 
                        before:bg-center before:bg-no-repeat before:opacity-0 checked:before:opacity-100"
                    />
                    <span className="text-base md:text-lg">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        );

      case "text":
        return (
          <motion.div
            key={question.id}
            className="mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <span className="w-[3px] h-6 bg-black rounded-full inline-block"></span>

              <h3 className="text-lg md:text-xl font-medium">{questionText}</h3>
            </div>
            <input
              type="text"
              value={answers[question.id] || ""}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-70 p-4 border-b-2 border-gray-200 focus:border-black focus:outline-none"
              placeholder="Type your answer here..."
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Align>
      <motion.div
        key={chapter.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="pt-30 py-10 "
      >
        <motion.div
          className="flex items-center justify-between max-w-xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] tracking-tighter font-medium text-black mont">
            {title}
          </h2>
          <button
            onClick={onBackToChapters}
            className="text-[#04256C]  hover:underline-offset-4 hover:underline text-sm md:text-base transition-all duration-200 hover:translate-x-[-4px]"
          >
            Back to Chapters
          </button>
        </motion.div>


        <div className="hidden md:block absolute -right-15 -top-14 h-screen w-1/3 flex flex-col justify-center items-end pr-10 pointer-events-none z-10">
          {images.map((item, index) => {
            const parallaxOffset = scrollY * (0.05 + index * 0.02);

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-out group pointer-events-auto ${
                  index === 0
                    ? "top-[10%] right-[5%] z-10"
                    : index === 1
                    ? "top-[33%] right-[4%] z-5"
                    : index === 2
                    ? "top-[52%] right-[5%] z-30"
                    : "top-[74%] right-[5%] z-40"
                }`}
                style={{
                  transform: `translateY(${-parallaxOffset}px) rotate(${
                    index === 0
                      ? "-79deg"
                      : index === 1
                      ? "-18deg"
                      : index === 2
                      ? "102deg"
                      : "80deg"
                  })`,
                }}
              >
                <Image
                  src={item.img}
                  alt={`questionnaire-decoration-${index + 1}`}
                  width={300}
                  height={300}
                  className={`w-40 md:w-50 lg:w-50 transition-all duration-500 ease-out cursor-pointer ${
                    index === 0
                      ? "group-hover:translate-x-[-15px] group-hover:translate-y-[-15px] group-hover:scale-105"
                      : index === 1
                      ? "group-hover:translate-x-[15px] group-hover:translate-y-[-15px] group-hover:scale-105"
                      : index === 2
                      ? "group-hover:-translate-x-3 group-hover:translate-y-[-18px] group-hover:scale-105"
                      : "group-hover:translate-x-[15px] group-hover:-translate-y-2.5 group-hover:scale-105"
                  } group-hover:shadow-2xl group-hover:z-50`}
                />
              </div>
            );
          })}
        </div>


         <div className="md:hidden absolute -bottom-20 left-0 right-0 w-full max-w-6xl h-[200px] flex justify-center items-end pb-4 pointer-events-none z-10">
                <div className="relative w-full h-full flex justify-center items-end">
                  {images.map((item, index) => {
                    const mobileParallaxOffset = scrollY * 0.03;
        
                    return (
                      <div
                        key={index}
                        className={`absolute transition-all duration-500 ease-out pointer-events-auto ${
                          index === 0
                            ? "bottom-[10%] left-[-3%] z-20"
                            : index === 1
                            ? "bottom-[25%] left-[25%] z-10"
                            : index === 2
                            ? "bottom-[25%] right-[5%] z-30"
                            : "bottom-[20%] right-[-15%] z-40"
                        }`}
                        style={{
                          transform: `translateY(${-mobileParallaxOffset}px) rotate(${
                            index === 0
                              ? "-35deg"
                              : index === 1
                              ? "-15deg"
                              : index === 2
                              ? "15deg"
                              : "65deg"
                          })`,
                        }}
                      >
                        <Image
                          src={item.img}
                          alt={`questionnaire-decoration-${index + 1}`}
                          width={180}
                          height={180}
                          className="w-38 h-38 transition-all duration-300 ease-out"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {chapter.questions && chapter.questions.map(renderQuestion)}

          {chapter.sections &&
            chapter.sections.map((section, idx) => (
              <motion.div
                key={idx}
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
                  {section.name}
                </h3>
                {section.questions.map(renderQuestion)}
              </motion.div>
            ))}
        </motion.div>

        <motion.div
          className="flex justify-start gap-4 items-center mt-2 mb-60 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {!isFirstChapter ? (
            <div className="bg-[#E1E1E1] p-3 rounded-full">
            <GoArrowLeft onClick={onPrevious} color="black" size={22} />
 
            </div>
          ) : (
            <div />
          )}

          <Button
            label={isLastChapter ? "CONCLUDE THE CHAPTER" : "MOVE TO NXT CHAPTER"}
            bgColor="#04256C"
            textColor="#FFFFFF"
            logo={<IoAirplaneSharp  size={19} color="#000" />}
            logoBg="#FFFFFF"
            height="h-12"
            width="w-58"
            onClick={onNext}
          />
        </motion.div>
      </motion.div>
    </Align>
  );
};

export default QuestionForm;
