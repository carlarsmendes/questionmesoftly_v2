"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { colorsData } from "@/data/colors";
import { getQuestionById, getQuestionText } from "@/data/questions";
import { getContrastYIQ } from "@/lib/contrast";
import {
  isLocale,
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
} from "@/lib/locale";
import { shareQuestion } from "@/lib/share-question";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import styles from "@/app/play/play.module.css";

export default function QuestionPageClient({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const forcedLocale = searchParams.get("lang");

  const [locale, setLocale] = useState<Locale>(() =>
    forcedLocale && isLocale(forcedLocale)
      ? forcedLocale
      : resolveInitialLocale(),
  );
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const question = getQuestionById(id);
  const colorByType = useMemo(
    () => new Map(colorsData.map((color) => [color.type, color.color])),
    [],
  );

  if (!question) {
    return null;
  }

  const backgroundColor = colorByType.get(question.type) ?? "#1F6F8B";
  const textColor = getContrastYIQ(backgroundColor);

  const onShare = async () => {
    const method = await shareQuestion({
      questionId: question.id,
      locale,
      text: getQuestionText(question, locale),
    });

    if (method === "copy_link") {
      setShareFeedback("Link copied");
      window.setTimeout(() => setShareFeedback(null), 1800);
    }
  };

  return (
    <main
      className={styles.stage}
      style={{
        backgroundColor,
        color: textColor,
        cursor: "default",
      }}
    >
      <nav className={styles.localeSwitcher} aria-label="Language selector">
        {SUPPORTED_LOCALES.map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            className={`${styles.localeButton} ${locale === nextLocale ? styles.localeButtonActive : ""}`}
            onClick={() => setLocale(nextLocale)}
            aria-pressed={locale === nextLocale}
          >
            {LOCALE_LABELS[nextLocale]}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className={styles.shareButton}
        aria-label="Share question"
        onClick={onShare}
      >
        ↗
      </button>

      {shareFeedback ? <div className={styles.shareFeedback}>{shareFeedback}</div> : null}

      <article className={styles.card}>
        <p className={styles.question}>{getQuestionText(question, locale)}</p>
        <h2 className={styles.type}>{question.type}</h2>
      </article>
    </main>
  );
}
