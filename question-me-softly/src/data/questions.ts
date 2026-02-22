import rawQuestions from "@/data/questions.json";
import type { Locale, QuestionRecord } from "@/types/content";

export const questions = rawQuestions as QuestionRecord[];

export function getQuestionText(question: QuestionRecord, locale: Locale): string {
  const localized = question.text[locale]?.trim();
  return localized && localized.length > 0 ? localized : question.text.en;
}
