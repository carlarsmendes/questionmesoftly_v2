"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { colorsData } from "@/data/colors";
import {
  getQuestionText,
  getQuestionsForPack,
  resolvePackId,
} from "@/data/questions";
import { getContrastYIQ } from "@/lib/contrast";
import {
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
} from "@/lib/locale";
import { endStateCopyByLocale } from "@/data/end-state-copy";
import { shareQuestion } from "@/lib/share-question";
import { SUPPORTED_LOCALES, type Locale, type QuestionRecord } from "@/types/content";
import styles from "./play.module.css";

type CardState = {
  started: boolean;
  exhausted: boolean;
  question?: QuestionRecord;
  backgroundColor: string;
  textColor: "black" | "white";
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function PlayPageClient() {
  const searchParams = useSearchParams();
  const packId = resolvePackId(searchParams.get("pack"));

  return <PlayExperience key={packId} packId={packId} />;
}

function PlayExperience({ packId }: { packId: ReturnType<typeof resolvePackId> }) {
  const packQuestions = useMemo(() => getQuestionsForPack(packId), [packId]);

  const colorByType = useMemo(
    () => new Map(colorsData.map((color) => [color.type, color.color])),
    [],
  );

  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());
  const [deck, setDeck] = useState<QuestionRecord[]>(() => shuffle(packQuestions));
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const [card, setCard] = useState<CardState>(() => {
    const openingColor = pickRandom(colorsData).color;

    return {
      started: false,
      exhausted: false,
      backgroundColor: openingColor,
      textColor: getContrastYIQ(openingColor),
    };
  });

  const resetDeck = useCallback(() => {
    const openingColor = pickRandom(colorsData).color;

    setDeck(shuffle(packQuestions));
    setCard({
      started: false,
      exhausted: false,
      question: undefined,
      backgroundColor: openingColor,
      textColor: getContrastYIQ(openingColor),
    });
  }, [packQuestions]);

  const nextCard = useCallback(() => {
    if (card.exhausted) {
      return;
    }

    if (deck.length === 0) {
      setCard((previous) => ({
        ...previous,
        started: true,
        exhausted: true,
        question: undefined,
      }));
      return;
    }

    const [nextQuestion, ...remaining] = deck;
    const backgroundColor = colorByType.get(nextQuestion.type) ?? "#1F6F8B";

    setDeck(remaining);
    setCard({
      started: true,
      exhausted: false,
      question: nextQuestion,
      backgroundColor,
      textColor: getContrastYIQ(backgroundColor),
    });
  }, [card.exhausted, colorByType, deck]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        nextCard();
      }
    },
    [nextCard],
  );

  const endStateCopy = endStateCopyByLocale[locale] ?? endStateCopyByLocale.en;

  const onShareCurrentQuestion = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!card.question) {
        return;
      }

      const method = await shareQuestion({
        questionId: card.question.id,
        locale,
        text: getQuestionText(card.question, locale),
      });

      if (method === "copy_link") {
        setShareFeedback("Link copied");
        window.setTimeout(() => setShareFeedback(null), 1800);
      }
    },
    [card.question, locale],
  );

  return (
    <>
      <nav className={styles.localeSwitcher} aria-label="Language selector">
        {SUPPORTED_LOCALES.map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            className={`${styles.localeButton} ${locale === nextLocale ? styles.localeButtonActive : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              setLocale(nextLocale);
            }}
            aria-pressed={locale === nextLocale}
          >
            {LOCALE_LABELS[nextLocale]}
          </button>
        ))}
      </nav>

      <Link href="/" className={styles.homeButton} aria-label="Back to landing page">
        Home
      </Link>

      {card.started && card.question && !card.exhausted ? (
        <>
          <button
            type="button"
            className={styles.shareButton}
            aria-label="Share question"
            onClick={onShareCurrentQuestion}
          >
            ↗
          </button>
          {shareFeedback ? <div className={styles.shareFeedback}>{shareFeedback}</div> : null}
        </>
      ) : null}

      <main
        className={styles.stage}
        onClick={nextCard}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Show next question"
        style={{
          backgroundColor: card.backgroundColor,
          color: card.textColor,
        }}
      >
        <article className={styles.card}>
          {card.started && card.exhausted ? (
            <div className={styles.endState}>
              <p className={styles.question}>{endStateCopy.title}</p>
              <p className={styles.endMessage}>{endStateCopy.message}</p>
              <button
                type="button"
                className={styles.restartButton}
                onClick={(event) => {
                  event.stopPropagation();
                  resetDeck();
                }}
              >
                {endStateCopy.restartLabel}
              </button>
            </div>
          ) : card.started && card.question ? (
            <>
              <p className={styles.question}>{getQuestionText(card.question, locale)}</p>
              <h2 className={styles.type}>{card.question.type}</h2>
            </>
          ) : (
            <>
              <h1 className={styles.title}>Question Me Softly</h1>
              <p className={styles.subtitle}>A questions game</p>
              <p className={styles.startHint}>(Click anywhere to start)</p>
            </>
          )}
        </article>
      </main>
    </>
  );
}

export default dynamic(async () => PlayPageClient, {
  ssr: false,
});
