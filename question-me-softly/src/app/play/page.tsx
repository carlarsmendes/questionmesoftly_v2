"use client";

import { useCallback, useMemo, useState, type KeyboardEvent } from "react";
import { colorsData } from "@/data/colors";
import { questions } from "@/data/questions-en";
import { getContrastYIQ } from "@/lib/contrast";
import styles from "./play.module.css";

type Question = {
  question: string;
  type: string;
};

type CardState = {
  started: boolean;
  question?: Question;
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

    const randomQuestion = pickRandom(questions as Question[]);
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
            <p>&ldquo;Most of us think about connection as something that happens to us.</p>
            <p>But love and connection - These are actions.&rdquo;</p>
            <br />
            <p>
              Propose doing this experiment with someone you&apos;ve always thought
              was interesting but have yet to take the leap with, or your
              significant other.
            </p>
            <br />
            <p>Skip the fancy dinner.</p>
            <p>
              Instead, grab a bottle of wine and make the choice to commit to
              the magic of the questions. Allow the vulnerability of the answers
              to carry you closer together, and revel in the soul-deep
              connection that can ensue.
            </p>
            <br />
            <p>Take action.</p>
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
              <p className={styles.question}>{card.question.question}</p>
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
