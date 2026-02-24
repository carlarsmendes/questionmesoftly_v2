import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Question Me Softly",
  description:
    "A minimalist questions game for deeper conversations with friends, teams, partners, or yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
