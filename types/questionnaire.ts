export type QuestionType = "radio" | "checkbox" | "text";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type?: QuestionType;
  ques?: string;
  label?: string;
  options?: QuestionOption[];
}

export interface Section {
  name: string;
  questions: Question[];
}

export interface Chapter {
  id: number;
  title?: string;
  image?: string;
  name?: string;
  questions?: Question[];
  sections?: Section[];
}

export interface QuestionnaireData {
  slug: string;
  chapters: Chapter[];
}

export type QuestionnaireDataArray = QuestionnaireData[];
