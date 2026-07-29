import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Leandro & Thays · 06.09.2026 · Ilhabela",
  description: "Casamento de Leandro & Thays em Ilhabela, 06 de setembro de 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${greatVibes.variable} ${jost.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
