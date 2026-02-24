import questionBaseRaw from "../../content/questions.json";
import enRaw from "../../content/en/questions.json";
import ptPtRaw from "../../content/pt-pt/questions.json";
import ptBrRaw from "../../content/pt-br/questions.json";
import type {
  Locale,
  QuestionBase,
  QuestionRecord,
  QuestionTranslation,
} from "@/types/content";

const questionBase = questionBaseRaw as QuestionBase[];
const en = enRaw as QuestionTranslation[];
const ptPt = ptPtRaw as QuestionTranslation[];
const ptBr = ptBrRaw as QuestionTranslation[];

function buildTextMap(translations: QuestionTranslation[], expectedLanguage: Locale) {
  return new Map(
    translations.map((entry) => {
      const text =
        entry.language === expectedLanguage ? entry.text.trim() : "";
      return [entry.id, text];
    }),
  );
}

const enById = buildTextMap(en, "en");
const ptPtById = buildTextMap(ptPt, "pt-PT");
const ptBrById = buildTextMap(ptBr, "pt-BR");

export const questions: QuestionRecord[] = questionBase.map((question) => ({
  ...question,
  text: {
    en: enById.get(question.id) ?? "",
    "pt-PT": ptPtById.get(question.id) ?? "",
    "pt-BR": ptBrById.get(question.id) ?? "",
  },
}));

export function getQuestionText(question: QuestionRecord, locale: Locale): string {
  const localized = question.text[locale]?.trim();
  return localized && localized.length > 0 ? localized : question.text.en;
}
