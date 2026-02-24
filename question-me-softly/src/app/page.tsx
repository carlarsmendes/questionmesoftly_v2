import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1.25rem",
        fontFamily: "Montserrat, 'Avenir Next', Avenir, 'Segoe UI', sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Question Me Softly</h1>
      <p style={{ maxWidth: "34ch", lineHeight: 1.5 }}>
        A minimalist questions game for deeper conversations.
      </p>
      <Link
        href="/play"
        style={{
          fontSize: "1.125rem",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
        }}
      >
        Play
      </Link>
    </main>
  );
}
