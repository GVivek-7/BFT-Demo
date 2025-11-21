"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import QuestionForm from "@/components/Questionnaire/QuestionForm";
import { QUESTIONNAIRE_DATA } from "@/data/Questionnaire/Questionnaire";

const ChapterPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const chapterId = parseInt(params.chapterId as string);

  const [answers, setAnswers] = useState<Record<string, string | string[] | undefined>>({});

  const questionnaireData = QUESTIONNAIRE_DATA.find((q) => q.slug === slug);

  useEffect(() => {
    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem(`questionnaire_${slug}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [slug]);

  useEffect(() => {
    // Save answers to localStorage whenever they change
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`questionnaire_${slug}`, JSON.stringify(answers));
    }
  }, [answers, slug]);

  if (!questionnaireData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Questionnaire not found</p>
      </div>
    );
  }

  const chapter = questionnaireData.chapters.find((ch) => ch.id === chapterId);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Chapter not found</p>
      </div>
    );
  }

  const handleAnswerChange = (questionId: string, value: string | string[] | undefined) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (chapterId < questionnaireData.chapters.length) {
      router.push(`/questionnaire/${slug}/chapter/${chapterId + 1}`);
    } else {
      // Last chapter - submit
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (chapterId > 1) {
      router.push(`/questionnaire/${slug}/chapter/${chapterId - 1}`);
    } else {
      router.push(`/questionnaire/${slug}/chapters`);
    }
  };

  const handleBackToChapters = () => {
    router.push(`/questionnaire/${slug}/chapters`);
  };

  const handleSubmit = () => {
    console.log("Submitting answers:", answers);
    // Handle submission logic here
    localStorage.removeItem(`questionnaire_${slug}`);
    router.push(`/questionnaire/${slug}/end`);
  };

  return (
    <QuestionForm
      chapter={chapter}
      answers={answers}
      onAnswerChange={handleAnswerChange}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onBackToChapters={handleBackToChapters}
      isFirstChapter={chapterId === 1}
      isLastChapter={chapterId === questionnaireData.chapters.length}
    />
  );
};

export default ChapterPage;
