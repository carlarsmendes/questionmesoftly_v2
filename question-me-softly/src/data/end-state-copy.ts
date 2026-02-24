import type { Locale } from "@/types/content";

export type EndStateCopy = {
  title: string;
  message: string;
  restartLabel: string;
};

export const endStateCopyByLocale: Record<Locale, EndStateCopy> = {
  en: {
    title: "That's all for now.",
    message: "Take a moment before starting again.",
    restartLabel: "Start again",
  },
  "pt-PT": {
    title: "É tudo por agora.",
    message: "Tira um momento antes de recomeçar.",
    restartLabel: "Começar de novo",
  },
  "pt-BR": {
    title: "Isso é tudo por agora.",
    message: "Tire um momento antes de recomeçar.",
    restartLabel: "Começar de novo",
  },
};
