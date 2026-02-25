import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Question Me Softly",
    template: "%s | Question Me Softly",
  },
  description:
    "A minimalist questions game for deeper conversations with friends, teams, partners, or yourself.",
  openGraph: {
    title: "Question Me Softly",
    description:
      "A warm deck of prompts for thoughtful conversations with friends, teams, partners, or yourself.",
    url: siteUrl,
    siteName: "Question Me Softly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Question Me Softly - A warm deck of prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Question Me Softly",
    description:
      "A warm deck of prompts for thoughtful conversations with friends, teams, partners, or yourself.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="94253d0f-45ae-423d-b513-8d4b304ef5c9"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
