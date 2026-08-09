import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { Reveal, REVEAL_BOOTSTRAP } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

/* Two faces. Archivo carries a width axis, so the display voice is the same
   family stretched to Expanded — an engraved faceplate, not a second font.
   Martian Mono is reserved for measured values. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chaar Pharmacy — Compounded on the premises",
    template: "%s — Chaar Pharmacy",
  },
  description:
    "Chaar Pharmacy prepares compounded formulations in-house. Wassim Chaar and Rabih Chaar make the preparation themselves, to the dose your prescriber wrote.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Arms the reveal hiding rule before first paint, and only where an
            observer exists to take it off again. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body className={`${archivo.variable} ${martianMono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
