import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Question Me Softly",
  description:
    "A minimalist questions game for deeper conversations with friends, teams, partners, or yourself.",
  openGraph: {
    title: "Question Me Softly",
    description:
      "A warm deck of prompts for thoughtful conversations with friends, teams, partners, or yourself.",
    siteName: "Question Me Softly",
    type: "website",
    images: [
      {
        url: "/favicon-32x32.png",
        width: 32,
        height: 32,
        alt: "Question Me Softly",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Question Me Softly",
    description:
      "A warm deck of prompts for thoughtful conversations with friends, teams, partners, or yourself.",
    images: ["/favicon-32x32.png"],
  },
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
