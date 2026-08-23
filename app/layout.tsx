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

/* Canonical domain assumed as alchaarpharmacy.com — confirm before launch. */
export const metadata: Metadata = {
  metadataBase: new URL("https://alchaarpharmacy.com"),
  title: {
    default: "Chaar Pharmacy — Compounded on the premises",
    template: "%s — Chaar Pharmacy",
  },
  description:
    "Chaar Pharmacy prepares compounded formulations in-house. Wassim Chaar and Rabih Chaar make the preparation themselves, to the dose your prescriber wrote.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "Chaar Pharmacy",
    title: "Chaar Pharmacy — Compounded on the premises",
    description:
      "Compounded formulations prepared in-house in Beirut. Wassim Chaar and Rabih Chaar make the preparation themselves, to the dose your prescriber wrote.",
    images: ["/brand/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables live on <html>: --face and --meas are custom
    // properties computed at :root, so the next/font variables must already
    // exist there — on <body> they resolve too late and type falls back.
    // suppressHydrationWarning: REVEAL_BOOTSTRAP adds `reveal-on` to <html>
    // before hydration, so the class list is expected to differ from the server's.
    <html
      lang="en"
      className={`${archivo.variable} ${martianMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Arms the reveal hiding rule before first paint, and only where an
            observer exists to take it off again. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body>
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
