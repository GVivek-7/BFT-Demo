"use client";
import { useParams, useRouter } from "next/navigation";
import ChapterNavigation from "@/components/Questionnaire/ChapterNavigation";
import { QUESTIONNAIRE_DATA } from "@/data/Questionnaire/Questionnaire";

const ChaptersPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const questionnaireData = QUESTIONNAIRE_DATA.find((q) => q.slug === slug);

  if (!questionnaireData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Questionnaire not found</p>
      </div>
    );
  }

  const handleChapterSelect = (chapterId: number) => {
    router.push(`/questionnaire/${slug}/chapter/${chapterId}`);
  };

  return (
    <ChapterNavigation
      chapters={questionnaireData.chapters}
      onChapterSelect={handleChapterSelect}
      slug={slug}
    />
  );
};

export default ChaptersPage;
