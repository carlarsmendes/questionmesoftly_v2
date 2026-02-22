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

  const [card, setCard] = useState<CardState>(() => {
    const openingColor = pickRandom(colorsData).color;

    return {
      started: false,
      backgroundColor: openingColor,
      textColor: getContrastYIQ(openingColor),
    };
  });

  const nextCard = useCallback(() => {
    const randomQuestion = pickRandom(questions as Question[]);
    const backgroundColor = colorByType.get(randomQuestion.type) ?? "#70FFBF";

    setCard({
      started: true,
      question: randomQuestion,
      backgroundColor,
      textColor: getContrastYIQ(backgroundColor),
    });
  }, [colorByType]);

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
    <main
      className={styles.stage}
      onClick={nextCard}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Show next question"
      style={{ backgroundColor: card.backgroundColor, color: card.textColor }}
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
  );
}
