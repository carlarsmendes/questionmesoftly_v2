import type { Locale, QuestionType } from "@/types/content";

const questionTypeLabelByLocale: Record<Locale, Partial<Record<QuestionType, string>>> = {
  en: {},
  "pt-PT": {
    "Unconventional questions": "Perguntas fora da caixa",
    "Likes and Dislikes": "Gosto ou não gosto?",
  },
  "pt-BR": {
    "Unconventional questions": "Perguntas fora da caixa",
    "Likes and Dislikes": "Gosto ou não gosto?",
  },
};

export function getQuestionTypeLabel(type: QuestionType, locale: Locale): string {
  return questionTypeLabelByLocale[locale]?.[type] ?? type;
}

