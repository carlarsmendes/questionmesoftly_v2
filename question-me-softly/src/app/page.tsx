"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { colorsData } from "@/data/colors";
import styles from "./page.module.css";

function pickRandomColor() {
  return colorsData[Math.floor(Math.random() * colorsData.length)].color;
}

function LandingPageClient() {
  const backgroundColor = useMemo(() => pickRandomColor(), []);

  return (
    <main className={styles.page} style={{ backgroundColor }}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>What happens if we ask better questions?</h1>
          <p className={styles.paragraph}>
            A warm deck of prompts designed to spark
            <br />
            thoughtful conversations — and unexpected ones.
          </p>
          <Link href="/play" className={styles.primaryCta} style={{ color: backgroundColor }}>
            Start a conversation
          </Link>
          <p className={styles.meta}>Available in EN · PT-PT · PT-BR</p>
        </section>

        <section className={styles.section}>
          <div className={styles.body}>
            <p>Most of us think connection just happens.</p>
            <p>But the best conversations are chosen.</p>
            <br />
            <p>A choice to pause.</p>
            <p>A choice to listen.</p>
            <p>A choice to go a little further than usual.</p>
            <br />
            <p>Some questions are light.</p>
            <p>Some go deeper.</p>
            <br />
            <p>All of them open something.</p>
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

        <section className={styles.section}>
          <h2 className={styles.label}>How it works</h2>
          <div className={styles.bodyLight}>
            <p>Draw a question.</p>
            <p>Answer, or pass.</p>
            <br />
            <p>No timers.</p>
            <p>No scores.</p>
            <p>No right answers.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.label}>Bring it to the table.</h2>
          <ul className={styles.list}>
            <li>Friends</li>
            <li>Teams</li>
            <li>Partners</li>
            <li>Solo reflection</li>
          </ul>
          <p className={styles.paragraph}>
            The same question feels different
            <br />
            depending on who&apos;s there.
          </p>
        </section>

        <section className={styles.finalCta}>
          <h2 className={styles.finalLine}>Let&apos;s begin.</h2>
          <Link href="/play" className={styles.primaryCta} style={{ color: backgroundColor }}>
            Take a question
          </Link>
        </section>

        <section className={styles.supportSection}>
          <h2 className={styles.supportHeading}>Support the deck</h2>
          <p className={styles.supportCopy}>
            If this meant something to you,
            <br />
            you can help keep it going.
          </p>
          <p className={styles.supportCopy}>
            I&apos;m a developer who believes good products,
            <br />
            (like good books and good workouts)
            <br />
            should challenge you just enough to make you grow.
          </p>
          <a
            href="https://buymeacoffee.com/carlarsmen8"
            target="_blank"
            rel="noreferrer"
            className={styles.supportCta}
            style={{ color: backgroundColor }}
          >
            Buy me a coffee
          </a>
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerBrand}>Question Me Softly</p>
          <p className={styles.meta}>Available in EN · PT-PT · PT-BR</p>
          <p className={styles.meta}>Anonymous usage analytics enabled.</p>
          <Link href="/privacy" className={styles.footerLink}>
            Privacy
          </Link>
          <Link href="/play?pack=team" className={styles.easterEgg}>
            Special experience for amazing teams
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default dynamic(async () => LandingPageClient, {
  ssr: false,
});
