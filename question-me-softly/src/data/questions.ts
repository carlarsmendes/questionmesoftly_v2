import questionBaseRaw from "../../content/questions.json";
import enRaw from "../../content/en/questions.json";
import ptPtRaw from "../../content/pt-pt/questions.json";
import ptBrRaw from "../../content/pt-br/questions.json";
import teamPackRaw from "../../content/packs/team.json";
import type {
  Locale,
  PackId,
  QuestionBase,
  QuestionPack,
  QuestionRecord,
  QuestionTranslation,
} from "@/types/content";

const questionBase = questionBaseRaw as QuestionBase[];
const en = enRaw as QuestionTranslation[];
const ptPt = ptPtRaw as QuestionTranslation[];
const ptBr = ptBrRaw as QuestionTranslation[];
const teamPack = teamPackRaw as QuestionPack;

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

const questionsById = new Map(questions.map((question) => [question.id, question]));

function getTeamPackQuestions() {
  return teamPack.questionIds
    .map((id) => questionsById.get(id))
    .filter((question): question is QuestionRecord => Boolean(question));
}

export function resolvePackId(packParam: string | null): PackId {
  return packParam?.toLowerCase() === "team" ? "team" : "general";
}

export function getQuestionsForPack(packId: PackId): QuestionRecord[] {
  if (packId === "team") {
    const teamQuestions = getTeamPackQuestions();
    return teamQuestions.length > 0
      ? teamQuestions
      : questions.filter((question) => question.packs.includes("general"));
  }

  return questions.filter((question) => question.packs.includes("general"));
}

export function hasQuestionId(id: string): boolean {
  return questionsById.has(id);
}

export function getQuestionById(id: string): QuestionRecord | undefined {
  return questionsById.get(id);
}

export function getQuestionText(question: QuestionRecord, locale: Locale): string {
  const localized = question.text[locale]?.trim();
  return localized && localized.length > 0 ? localized : question.text.en;
}
