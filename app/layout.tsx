import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://my-portfolio-omega-puce-9ainbmt4xm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kelvin Tan — Product Manager",
    template: "%s | Kelvin Tan",
  },
  description:
    "Product manager based in Singapore building consumer subscription products and exploring AI.",
  authors: [{ name: "Kelvin Tan", url: SITE_URL }],
  creator: "Kelvin Tan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Kelvin Tan",
    title: "Kelvin Tan — Product Manager",
    description:
      "Product manager based in Singapore building consumer subscription products and exploring AI.",
    images: [
      {
        url: "/og.png",      // place a 1200×630 image at public/og.png
        width: 1200,
        height: 630,
        alt: "Kelvin Tan — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelvin Tan — AI Engineer",
    description:
      "Product manager based in Singapore building consumer subscription products and exploring AI.",
    images: ["/og.png"],
    creator: "@kelvintan",   // update to your handle
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
