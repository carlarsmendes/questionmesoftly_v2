"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { trackEvent } from "@/lib/analytics";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import styles from "@/app/play/play.module.css";

export default function QuestionPageClient({ id }: { id: string }) {
  const router = useRouter();
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

  const goToDeckStart = () => {
    router.push("/play");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDeckStart();
    }
  };

  const onShare = async () => {
    const method = await shareQuestion({
      questionId: question.id,
      locale,
      text: getQuestionText(question, locale),
    });

    trackEvent("share_click", {
      question_id: question.id,
      locale,
      pack: "shared",
      method,
    });

    if (method === "copy_link") {
      setShareFeedback("Link copied");
      window.setTimeout(() => setShareFeedback(null), 1800);
    }
  };

  return (
    <main
      className={styles.stage}
      onClick={goToDeckStart}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Start deck from this shared question"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <nav className={styles.localeSwitcher} aria-label="Language selector">
        {SUPPORTED_LOCALES.map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            className={`${styles.localeButton} ${locale === nextLocale ? styles.localeButtonActive : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              if (locale !== nextLocale) {
                trackEvent("language_change", {
                  from: locale,
                  to: nextLocale,
                  surface: "shared_question",
                  pack: "shared",
                });
              }
              setLocale(nextLocale);
            }}
            aria-pressed={locale === nextLocale}
          >
            {LOCALE_LABELS[nextLocale]}
          </button>
        ))}
      </nav>

      <Link
        href="/"
        className={styles.homeButton}
        aria-label="Back to landing page"
        onClick={(event) => event.stopPropagation()}
      >
        Home
      </Link>

      <button
        type="button"
        className={styles.shareButton}
        aria-label="Share question"
        onClick={(event) => {
          event.stopPropagation();
          void onShare();
        }}
      >
        Share
      </button>

      {shareFeedback ? <div className={styles.shareFeedback}>{shareFeedback}</div> : null}

      <article className={styles.card}>
        <p className={styles.question}>{getQuestionText(question, locale)}</p>
        <h2 className={styles.type}>{question.type}</h2>
      </article>
    </main>
  );
}
