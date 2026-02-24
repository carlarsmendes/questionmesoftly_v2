export const SUPPORTED_LOCALES = ["en", "pt-PT", "pt-BR"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type QuestionType =
  | "Family"
  | "Unconventional questions"
  | "Dreams"
  | "Values"
  | "Career"
  | "Likes and Dislikes";

export type QuestionBase = {
  id: string;
  type: QuestionType;
  source: string;
};

export type QuestionTranslation = {
  id: string;
  language: Locale;
  text: string;
};

export type QuestionRecord = QuestionBase & {
  text: Record<Locale, string>;
};
