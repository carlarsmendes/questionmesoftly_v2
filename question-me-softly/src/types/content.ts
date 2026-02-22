export const SUPPORTED_LOCALES = ["en", "pt-PT", "pt-BR"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type QuestionType =
  | "Family"
  | "Unconventional questions"
  | "Dreams"
  | "Values"
  | "Career"
  | "Likes and Dislikes";

export type QuestionRecord = {
  id: string;
  type: QuestionType;
  source: string;
  text: Record<Locale, string>;
};
