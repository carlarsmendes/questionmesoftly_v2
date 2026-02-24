import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={`${styles.band} ${styles.heroBand}`}>
        <div className={styles.inner}>
          <div className={styles.hero}>
            <p className={styles.brand}>Question Me Softly</p>
            <h1 className={styles.headline}>What happens if we ask better questions?</h1>
            <p className={styles.subhead}>
              A curated deck of reflective prompts
              <br />
              for friends, teams, partners, or yourself.
            </p>
            <Link href="/play" className={styles.primaryCta}>
              Start a conversation
            </Link>
            <p className={styles.languages}>Available in EN · PT-PT · PT-BR</p>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <div className={styles.section}>
            <p className={styles.label}>WHY THIS EXISTS</p>
            <div className={styles.body}>
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
              <p>Begin with a question.</p>
              <p>See where it leads.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandMuted}`}>
        <div className={styles.inner}>
          <div className={`${styles.section} ${styles.sectionLight}`}>
            <p className={styles.label}>HOW IT WORKS</p>
            <div className={styles.bodyLight}>
              <p>Draw a question.</p>
              <p>Answer — or pass.</p>
              <p>Stay with what opens.</p>
              <br />
              <p>No timers.</p>
              <p>No scores.</p>
              <p>No right answers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <div className={`${styles.section} ${styles.sectionLight}`}>
            <p className={styles.label}>MADE FOR</p>
            <ul className={styles.list}>
              <li>Friends</li>
              <li>Teams</li>
              <li>Partners</li>
              <li>Solo reflection</li>
            </ul>
            <p className={styles.note}>
              The same question can feel different
              <br />
              depending on who&apos;s in the room.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.finalBand}`}>
        <div className={styles.inner}>
          <div className={styles.finalCta}>
            <h2 className={styles.finalLine}>Start with a question.</h2>
            <Link href="/play" className={styles.primaryCta}>
              Begin
            </Link>
          </div>

          <footer className={styles.footer}>
            <p className={styles.footerBrand}>Question Me Softly</p>
            <p className={styles.footerMeta}>Available in EN · PT-PT · PT-BR</p>
            <Link href="/privacy" className={styles.footerLink}>
              Privacy
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}
