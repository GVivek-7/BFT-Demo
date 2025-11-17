"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Welcome from "@/components/Questionnaire/Welcome";
import { QUESTIONNAIRE_DATA } from "@/data/Questionnaire/Questionnaire";

const QuestionnairePage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const questionnaireData = QUESTIONNAIRE_DATA.find((q) => q.slug === slug);

  useEffect(() => {
    if (!questionnaireData) {
      router.push("/questionnaire");
    }
  }, [questionnaireData, router]);

  if (!questionnaireData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Questionnaire not found</p>
      </div>
    );
  }

  const handleWelcomeComplete = () => {
    router.push(`/questionnaire/${slug}/chapters`);
  };

  return <Welcome onComplete={handleWelcomeComplete} slug={slug} />;
};

export default QuestionnairePage;
