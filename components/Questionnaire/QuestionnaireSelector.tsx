"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Align from "../Reusable/Align";
import Button from "../Reusable/UI/Button";
import { GoArrowUpLeft } from "react-icons/go";

const QUESTIONNAIRES = [
  {
    slug: "mystery-voyage",
    title: "Mystery Voyage",
    description: "Travel with strangers and discover new connections",
    color: "#04256C",
  },
  {
    slug: "Tailored-escape",
    title: "Tailored Escape",
    description: "Work trip with exploration opportunities",
    color: "#2D5F8D",
  },
  {
    slug: "purpose-retreat",
    title: "Purpose Retreat",
    description: "Find your travel vibe and purpose",
    color: "#5A8FB4",
  },
  {
    slug: "crafted-journey",
    title: "Crafted Journey",
    description: "Personalized trip designed just for you",
    color: "#87CEEB",
  },
];

const QuestionnaireSelector = () => {
  const router = useRouter();

  return (
    <Align>
      <div className="py-20 lg:py-30">
        <h1 className="mont text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-tight uppercase font-medium tracking-tighter text-[#04256C] text-center mb-4">
          Choose Your Journey
        </h1>
        <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-center mb-12 px-4">
          Select the experience that speaks to you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {QUESTIONNAIRES.map((questionnaire, index) => (
            <motion.div
              key={questionnaire.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              style={{ borderTop: `4px solid ${questionnaire.color}` }}
            >
              <h3 className="text-2xl font-semibold mb-3" style={{ color: questionnaire.color }}>
                {questionnaire.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{questionnaire.description}</p>
              <Button
                label="Start Journey"
                bgColor={questionnaire.color}
                textColor="#FFFFFF"
                logo={<GoArrowUpLeft size={20} color="#000" />}
                logoBg="#FFFFFF"
                height="h-12"
                width="w-full"
                onClick={() => router.push(`/questionnaire/${questionnaire.slug}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Align>
  );
};

export default QuestionnaireSelector;
