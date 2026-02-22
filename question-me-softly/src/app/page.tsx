import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat, 'Avenir Next', Avenir, 'Segoe UI', sans-serif",
      }}
    >
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
