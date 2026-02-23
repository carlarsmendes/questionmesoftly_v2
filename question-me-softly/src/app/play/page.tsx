"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { colorsData } from "@/data/colors";
import { getQuestionText, questions } from "@/data/questions";
import { getContrastYIQ } from "@/lib/contrast";
import {
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
} from "@/lib/locale";
import { SUPPORTED_LOCALES, type Locale, type QuestionRecord } from "@/types/content";
import styles from "./play.module.css";

type CardState = {
  started: boolean;
  question?: QuestionRecord;
  backgroundColor: string;
  textColor: "black" | "white";
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function PlayPage() {
  const colorByType = useMemo(
    () => new Map(colorsData.map((color) => [color.type, color.color])),
    [],
  );

  const [showHelp, setShowHelp] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const [card, setCard] = useState<CardState>(() => {
    const openingColor = pickRandom(colorsData).color;

    return {
      started: false,
      backgroundColor: openingColor,
      textColor: getContrastYIQ(openingColor),
    };
  });

  const nextCard = useCallback(() => {
    if (showHelp) {
      return;
    }

    const randomQuestion = pickRandom(questions);
    const backgroundColor = colorByType.get(randomQuestion.type) ?? "#70FFBF";

    setCard({
      started: true,
      question: randomQuestion,
      backgroundColor,
      textColor: getContrastYIQ(backgroundColor),
    });
  }, [colorByType, showHelp]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        nextCard();
      }
    },
    [nextCard],
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
            <p>What happens if we ask better questions?</p>
            <br />
            <p>Most of us think connection is something that simply happens.</p>
            <p>But meaningful conversations are choices.</p>
            <br />
            <p>A choice to pause.</p>
            <p>A choice to listen.</p>
            <p>A choice to go beyond the expected.</p>
            <br />
            <p>Most conversations move fast.</p>
            <p>This one doesn&apos;t have to.</p>
            <br />
            <p>Commit to the question in front of you.</p>
            <p>Let it shift the tone of the room.</p>
            <br />
            <p>For friends.</p>
            <p>For teams.</p>
            <p>For partners.</p>
            <p>Or for yourself.</p>
            <br />
            <p>Start with a question.</p>
            <p>See where it leads.</p>
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
          {card.started && card.question ? (
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
