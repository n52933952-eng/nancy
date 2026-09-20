import { Cairo, Cormorant_Garamond } from "next/font/google";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/components/ContentProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { fetchLiveContent } from "@/lib/content";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nancy Ajram | نانسي عجرم — Official-style Fan Site",
    template: "%s | Nancy Ajram | نانسي عجرم",
  },
  description:
    "Nancy Ajram (نانسي عجرم) — Lebanese Arab pop icon. Music, video clips, gallery, biography and news. Queen of Arab Pop.",
  keywords: [
    "Nancy Ajram",
    "Nancy",
    "نانسي عجرم",
    "نانسي",
    "Lebanese singer",
    "Arab pop",
    "Ah W Noss",
    "Ya Tabtab",
  ],
  openGraph: {
    title: "Nancy Ajram | نانسي عجرم",
    description:
      "A luxury fan site for Nancy Ajram — music, clips, portraits and her story from Beirut.",
    url: "/",
    siteName: "Nancy Ajram",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    type: "website",
    images: [{ url: "/images/slide-fur.jpg", width: 1200, height: 1600, alt: "Nancy Ajram" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nancy Ajram | نانسي عجرم",
    description: "Lebanese Arab pop icon — music, videos, gallery and biography.",
    images: ["/images/slide-fur.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nancy Ajram",
  alternateName: ["نانسي عجرم", "Nancy Nabil Ajram"],
  nationality: "Lebanese",
  jobTitle: "Singer",
  birthDate: "1983-05-16",
  birthPlace: {
    "@type": "Place",
    name: "Beirut, Lebanon",
  },
  description:
    "Nancy Ajram is a Lebanese singer and one of the most famous Arab pop artists in the world.",
  url: siteUrl,
  image: `${siteUrl}/images/slide-fur.jpg`,
};

export default async function RootLayout({ children }) {
  const live = await fetchLiveContent();

  return (
    <html
      lang="en"
      className={`${cairo.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <ContentProvider initial={live}>
            {children}
            <Footer />
          </ContentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
