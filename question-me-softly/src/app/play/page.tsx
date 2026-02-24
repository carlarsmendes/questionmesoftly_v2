"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
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
import { helpCopyByLocale } from "@/data/help-copy";
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

  const [showHelp, setShowHelp] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());
  const [deck, setDeck] = useState<QuestionRecord[]>(() => shuffle(packQuestions));

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
    if (showHelp) {
      return;
    }

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
    const backgroundColor = colorByType.get(nextQuestion.type) ?? "#70FFBF";

    setDeck(remaining);
    setCard({
      started: true,
      exhausted: false,
      question: nextQuestion,
      backgroundColor,
      textColor: getContrastYIQ(backgroundColor),
    });
  }, [card.exhausted, colorByType, deck, showHelp]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        nextCard();
      }
    },
    [nextCard],
  );

  const helpCopy = helpCopyByLocale[locale] ?? helpCopyByLocale.en;

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

      <button
        type="button"
        className={`${styles.questionMark} ${showHelp ? styles.showModal : ""}`}
        aria-label={showHelp ? "Close help" : "Open help"}
        onClick={(event) => {
          event.stopPropagation();
          setShowHelp((value) => !value);
        }}
      >
        {showHelp ? "x" : "?"}
      </button>

      {showHelp ? (
        <section className={styles.helpModal} aria-live="polite">
          <div className={styles.helpContent}>
            {helpCopy.map((line, index) =>
              line.length === 0 ? <br key={`break-${index}`} /> : <p key={`line-${index}`}>{line}</p>,
            )}
          </div>
        </section>
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
              <p className={styles.question}>That&apos;s all for now.</p>
              <p className={styles.endMessage}>
                Take a moment before starting again.
              </p>
              <button
                type="button"
                className={styles.restartButton}
                onClick={(event) => {
                  event.stopPropagation();
                  resetDeck();
                }}
              >
                Start again
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
