"use client";
import { Chapter, Question } from "@/types/questionnaire";
import { motion } from "framer-motion";
import Button from "../Reusable/UI/Button";
import { GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";
import Align from "../Reusable/Align";

interface QuestionFormProps {
  chapter: Chapter;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
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

  const renderQuestion = (question: Question) => {
    const questionText = question.ques || question.label || "";

    switch (question.type) {
      case "radio":
        return (
          <div key={question.id} className="mb-8">
            <h3 className="text-lg md:text-xl font-medium mb-4">{questionText}</h3>
            <div className="flex flex-col gap-3">
              {question.options?.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
                    transition-all duration-200
                    ${
                      answers[question.id] === option.value
                        ? "border-[#04256C] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-5 h-5 text-[#04256C]"
                  />
                  <span className="text-base md:text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={question.id} className="mb-8">
            <h3 className="text-lg md:text-xl font-medium mb-4">{questionText}</h3>
            <div className="flex flex-col gap-3">
              {question.options?.map((option) => {
                const selectedValues = answers[question.id] || [];
                const isChecked = selectedValues.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className={`
                      flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
                      transition-all duration-200
                      ${
                        isChecked
                          ? "border-[#04256C] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedValues, option.value]
                          : selectedValues.filter((v: string) => v !== option.value);
                        onAnswerChange(question.id, newValues);
                      }}
                      className="w-5 h-5 text-[#04256C]"
                    />
                    <span className="text-base md:text-lg">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "text":
        return (
          <div key={question.id} className="mb-8">
            <h3 className="text-lg md:text-xl font-medium mb-4">{questionText}</h3>
            <input
              type="text"
              value={answers[question.id] || ""}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#04256C] focus:outline-none"
              placeholder="Type your answer here..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Align>
      <motion.div
        key={chapter.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto py-10 px-4"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#04256C]">
            {title}
          </h2>
          <button
            onClick={onBackToChapters}
            className="text-[#04256C] hover:underline text-sm md:text-base"
          >
            ← Back to Chapters
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {chapter.questions && chapter.questions.map(renderQuestion)}

          {chapter.sections &&
            chapter.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
                  {section.name}
                </h3>
                {section.questions.map(renderQuestion)}
              </div>
            ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          {!isFirstChapter ? (
            <Button
              label="Previous"
              bgColor="#E1E1E1"
              textColor="#000000"
              logo={<GoArrowUpRight size={22} color="#FFF" />}
              logoBg="#000000"
              height="h-12"
              width="w-40"
              onClick={onPrevious}
            />
          ) : (
            <div />
          )}

          <Button
            label={isLastChapter ? "Submit" : "Next"}
            bgColor="#04256C"
            textColor="#FFFFFF"
            logo={<GoArrowUpLeft size={22} color="#000" />}
            logoBg="#FFFFFF"
            height="h-12"
            width="w-40"
            onClick={onNext}
          />
        </div>
      </motion.div>
    </Align>
  );
};

export default QuestionForm;
