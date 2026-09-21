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
    default: "Nancy Ajram (Nancy) | نانسي عجرم — Music, Videos & Biography",
    template: "%s | Nancy Ajram | نانسي عجرم",
  },
  description:
    "Nancy Ajram — also searched as Nancy and نانسي عجرم — Lebanese Queen of Arab Pop. Listen to Ah W Noss, Ya Tabtab and more. Videos, gallery, biography and news.",
  keywords: [
    "Nancy",
    "Nancy Ajram",
    "Nancy Ajram songs",
    "Nancy Ajram music",
    "Nancy Ajram videos",
    "نانسي",
    "نانسي عجرم",
    "أغاني نانسي عجرم",
    "كليب نانسي عجرم",
    "Lebanese singer",
    "Arab pop",
    "Ah W Noss",
    "Ya Tabtab",
    "Queen of Arab Pop",
  ],
  openGraph: {
    title: "Nancy Ajram (Nancy) | نانسي عجرم",
    description:
      "Nancy — Nancy Ajram — نانسي عجرم. Music, official-style clips, gallery and her story from Beirut.",
    url: "/",
    siteName: "Nancy Ajram | نانسي عجرم",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    type: "website",
    images: [{ url: "/images/slide-fur.jpg", width: 1200, height: 1600, alt: "Nancy Ajram" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nancy Ajram (Nancy) | نانسي عجرم",
    description: "Nancy Ajram — نانسي عجرم. Music, videos, gallery and biography.",
    images: ["/images/slide-fur.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nancy Ajram",
  alternateName: ["Nancy", "نانسي عجرم", "نانسي", "Nancy Nabil Ajram"],
  nationality: "Lebanese",
  jobTitle: "Singer",
  birthDate: "1983-05-16",
  birthPlace: {
    "@type": "Place",
    name: "Beirut, Lebanon",
  },
  description:
    "Nancy Ajram (Nancy / نانسي عجرم) is a Lebanese singer and one of the most famous Arab pop artists in the world.",
  url: siteUrl,
  image: `${siteUrl}/images/slide-fur.jpg`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nancy Ajram",
  alternateName: ["Nancy", "Nancy Ajram fan site", "نانسي عجرم", "نانسي"],
  url: siteUrl,
  inLanguage: ["en", "ar"],
  description:
    "Fan site for Nancy Ajram (Nancy / نانسي عجرم) — music, videos, gallery, biography and news.",
  about: {
    "@type": "Person",
    name: "Nancy Ajram",
    alternateName: ["Nancy", "نانسي عجرم"],
  },
};

export default async function RootLayout({ children }) {
  const live = await fetchLiveContent();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cairo.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
