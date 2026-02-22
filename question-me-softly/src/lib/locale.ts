import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const LOCALE_STORAGE_KEY = "qms-locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  "pt-PT": "PT-PT",
  "pt-BR": "PT-BR",
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function mapBrowserLocale(value: string): Locale | null {
  const normalized = value.toLowerCase();

  if (normalized.startsWith("en")) {
    return "en";
  }

  if (normalized.startsWith("pt-br")) {
    return "pt-BR";
  }

  if (normalized.startsWith("pt")) {
    return "pt-PT";
  }

  return null;
}

export function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isLocale(stored)) {
    return stored;
  }

  for (const language of window.navigator.languages) {
    const mapped = mapBrowserLocale(language);
    if (mapped) {
      return mapped;
    }
  }

  return "en";
}
