export default function PrivacyPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        maxWidth: "720px",
        margin: "0 auto",
        padding: "72px 24px",
        fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif",
        lineHeight: 1.7,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Privacy</h1>
      <p>
        Question Me Softly does not require an account and does not collect
        personal profile data in this version.
      </p>
      <p style={{ marginTop: "0.9rem" }}>
        We use anonymous usage analytics (Umami) to understand product usage
        patterns, such as shares, language changes, and deck restarts.
      </p>
    </main>
  );
}
