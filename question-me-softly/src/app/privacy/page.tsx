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
        If analytics are added in future releases, this page will be updated
        with clear details on what is tracked and why.
      </p>
    </main>
  );
}
