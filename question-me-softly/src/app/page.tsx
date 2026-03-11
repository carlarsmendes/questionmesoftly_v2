"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { colorsData } from "@/data/colors";
import {
  LOCALE_LABELS,
  LOCALE_STORAGE_KEY,
  resolveInitialLocale,
} from "@/lib/locale";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import styles from "./page.module.css";

function pickRandomColor() {
  return colorsData[Math.floor(Math.random() * colorsData.length)].color;
}

type LandingCopy = {
  headline: string;
  heroBody: string[];
  startConversation: string;
  available: string;
  manifesto: string[];
  howItWorksLabel: string;
  howItWorks: string[];
  bringLabel: string;
  bringItems: string[];
  bringBody: string[];
  finalLine: string;
  takeQuestion: string;
  supportHeading: string;
  supportLead: string[];
  supportBody: string[];
  buyCoffee: string;
  brand: string;
  analytics: string;
  privacy: string;
  teamLink: string;
};

const landingCopyByLocale: Record<Locale, LandingCopy> = {
  en: {
    headline: "What happens if we ask better questions?",
    heroBody: [
      "A warm deck of prompts designed to spark",
      "thoughtful conversations — and unexpected ones.",
    ],
    startConversation: "Start a conversation",
    available: "Available in EN · PT-PT · PT-BR",
    manifesto: [
      "Most of us think connection just happens.",
      "But the best conversations are chosen.",
      "",
      "A choice to pause.",
      "A choice to listen.",
      "A choice to go a little further than usual.",
      "",
      "Some questions are light.",
      "Some go deeper.",
      "",
      "All of them open something.",
      "",
      "Commit to the question in front of you.",
      "Let it shift the tone of the room.",
      "",
      "For friends.",
      "For teams.",
      "For partners.",
      "Or for yourself.",
      "",
      "Start with a question.",
      "See where it leads.",
    ],
    howItWorksLabel: "How it works",
    howItWorks: [
      "Draw a question.",
      "Answer, or pass.",
      "",
      "No timers.",
      "No scores.",
      "No right answers.",
    ],
    bringLabel: "Bring it to the table.",
    bringItems: ["Friends", "Teams", "Partners", "Solo reflection"],
    bringBody: ["The same question feels different", "depending on who's there."],
    finalLine: "Let's begin.",
    takeQuestion: "Take a question",
    supportHeading: "Support the deck",
    supportLead: ["If this meant something to you,", "you can help keep it going."],
    supportBody: [
      "I'm a developer who believes good products,",
      "(like good books and good workouts)",
      "should challenge you just enough to make you grow.",
    ],
    buyCoffee: "Buy me a coffee",
    brand: "Question Me Softly",
    analytics: "Anonymous usage analytics enabled.",
    privacy: "Privacy",
    teamLink: "Special experience for amazing teams",
  },
  "pt-PT": {
    headline: "Talvez seja tempo de fazer perguntas melhores",
    heroBody: [
      "Aqui está um conjunto de questões pensado para criar conversas profundas",
      "E inesperadas",
    ],
    startConversation: "Começar uma conversa",
    available: "Disponível em EN · PT-PT · PT-BR",
    manifesto: [
      "Muitos dizem que, conexão é algo que simplesmente se sente.",
      "Mas as melhores conversas são escolhas.",
      "",
      "Escolha de parar um momento.",
      "Escolha de ouvir.",
      "Escolha ir um pouco mais além.",
      "",
      "Algumas perguntas são leves.",
      "Outras vão mais fundo.",
      "",
      "Todas elas fazem questão de abrir algo.",
      "",
      "Compromete-te com a pergunta à tua frente.",
      "Deixa que ela mude o ambiente à tua volta.",
      "",
      "Para amigos.",
      "Para equipas.",
      "Para parceiros.",
      "Ou só para ti.",
      "",
      "Começa com uma pergunta.",
      "Vê onde te leva.",
    ],
    howItWorksLabel: "Como funciona",
    howItWorks: [
      "Escolhe uma pergunta.",
      "Responde, ou passa à frente.",
      "",
      "Sem tempo contado.",
      "Sem pontuações.",
      "Sem respostas certas.",
    ],
    bringLabel: "Traz todos para a mesa.",
    bringItems: ["Amigos", "Equipas", "Parceiros", "Reflexão pessoal"],
    bringBody: ["As mesmas questões mudam de acordo", "com quem está na sala."],
    finalLine: "Vamos começar.",
    takeQuestion: "Escolhe uma pergunta.",
    supportHeading: "Apoia este projeto",
    supportLead: [
      "Se isto significou algo para ti,",
      "podes ajudar a manter este projeto vivo",
    ],
    supportBody: [
      "Sou uma programadora que acredita que bons produtos",
      "(assim como bons livros e bons treinos)",
      "devem ser desafiantes o suficiente para te obrigarem a crescer",
    ],
    buyCoffee: "Paga-me um café",
    brand: "Question Me Softly",
    analytics: "Análise anónima de utilização ativadas.",
    privacy: "Privacidade",
    teamLink: "Uma experiência especial para equipas extraordinárias",
  },
  "pt-BR": {
    headline: "Talvez seja tempo de fazer perguntas melhores",
    heroBody: [
      "Aqui está um conjunto de questões pensado para criar conversas profundas",
      "E inesperadas",
    ],
    startConversation: "Começar uma conversa",
    available: "Disponível em EN · PT-PT · PT-BR",
    manifesto: [
      "Muitos dizem que, conexão é algo que simplesmente se sente.",
      "Mas as melhores conversas são escolhas.",
      "",
      "Escolha de parar um momento.",
      "Escolha de ouvir.",
      "Escolha ir um pouco mais além.",
      "",
      "Algumas perguntas são leves.",
      "Outras vão mais fundo.",
      "",
      "Todas elas fazem questão de abrir algo.",
      "",
      "Compromete-te com a pergunta à tua frente.",
      "Deixa que ela mude o ambiente à tua volta.",
      "",
      "Para amigos.",
      "Para equipas.",
      "Para parceiros.",
      "Ou só para ti.",
      "",
      "Começa com uma pergunta.",
      "Vê onde te leva.",
    ],
    howItWorksLabel: "Como funciona",
    howItWorks: [
      "Escolhe uma pergunta.",
      "Responde, ou passa à frente.",
      "",
      "Sem tempo contado.",
      "Sem pontuações.",
      "Sem respostas certas.",
    ],
    bringLabel: "Traz todos para a mesa.",
    bringItems: ["Amigos", "Equipas", "Parceiros", "Reflexão pessoal"],
    bringBody: ["As mesmas questões mudam de acordo", "com quem está na sala."],
    finalLine: "Vamos começar.",
    takeQuestion: "Escolhe uma pergunta.",
    supportHeading: "Apoia este projeto",
    supportLead: [
      "Se isto significou algo para ti,",
      "podes ajudar a manter este projeto vivo",
    ],
    supportBody: [
      "Sou uma programadora que acredita que bons produtos",
      "(assim como bons livros e bons treinos)",
      "devem ser desafiantes o suficiente para te obrigarem a crescer",
    ],
    buyCoffee: "Paga-me um café",
    brand: "Question Me Softly",
    analytics: "Análise anónima de utilização ativadas.",
    privacy: "Privacidade",
    teamLink: "Uma experiência especial para equipas extraordinárias",
  },
};

function LandingPageClient() {
  const backgroundColor = useMemo(() => pickRandomColor(), []);
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());
  const copy = landingCopyByLocale[locale] ?? landingCopyByLocale.en;

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  return (
    <main className={styles.page} style={{ backgroundColor }}>
      <div className={styles.inner}>
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

        <section className={styles.hero}>
          <h1 className={styles.headline}>{copy.headline}</h1>
          <p className={styles.paragraph}>
            {copy.heroBody[0]}
            <br />
            {copy.heroBody[1]}
          </p>
          <Link href="/play" className={styles.primaryCta} style={{ color: backgroundColor }}>
            {copy.startConversation}
          </Link>
          <p className={styles.meta}>{copy.available}</p>
        </section>

        <section className={styles.section}>
          <div className={styles.body}>
            {copy.manifesto.map((line, index) =>
              line ? <p key={`${line}-${index}`}>{line}</p> : <br key={`break-${index}`} />,
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.label}>{copy.howItWorksLabel}</h2>
          <div className={styles.bodyLight}>
            {copy.howItWorks.map((line, index) =>
              line ? <p key={`${line}-${index}`}>{line}</p> : <br key={`how-break-${index}`} />,
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.label}>{copy.bringLabel}</h2>
          <ul className={styles.list}>
            {copy.bringItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.paragraph}>
            {copy.bringBody[0]}
            <br />
            {copy.bringBody[1]}
          </p>
        </section>

        <section className={styles.finalCta}>
          <h2 className={styles.finalLine}>{copy.finalLine}</h2>
          <Link href="/play" className={styles.primaryCta} style={{ color: backgroundColor }}>
            {copy.takeQuestion}
          </Link>
        </section>

        <section className={styles.supportSection}>
          <h2 className={styles.supportHeading}>{copy.supportHeading}</h2>
          <p className={styles.supportCopy}>
            {copy.supportLead[0]}
            <br />
            {copy.supportLead[1]}
          </p>
          <p className={styles.supportCopy}>
            {copy.supportBody[0]}
            <br />
            {copy.supportBody[1]}
            <br />
            {copy.supportBody[2]}
          </p>
          <a
            href="https://buymeacoffee.com/carlarsmen8"
            target="_blank"
            rel="noreferrer"
            className={styles.supportCta}
            style={{ color: backgroundColor }}
          >
            {copy.buyCoffee}
          </a>
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerBrand}>{copy.brand}</p>
          <p className={styles.meta}>{copy.available}</p>
          <p className={styles.meta}>{copy.analytics}</p>
          <Link href="/privacy" className={styles.footerLink}>
            {copy.privacy}
          </Link>
          <Link href="/play?pack=team" className={styles.easterEgg}>
            {copy.teamLink}
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default dynamic(async () => LandingPageClient, {
  ssr: false,
});
