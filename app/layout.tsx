import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

export const metadata: Metadata = {
  metadataBase: new URL("https://triphero.club"),
  title: "TripHero — Seoul Guides from Local Friends",
  description: "Personal Seoul guides curated by locals. Discover hidden gems through a local friend's eyes.",
  applicationName: "TripHero",
  icons: {
    icon: "/images/people/mina-favicon.png",
    shortcut: "/images/people/mina-favicon.png",
    apple: "/images/people/mina-favicon.png",
  },
  openGraph: {
    title: "TripHero — Seoul Guides from Local Friends",
    description: "Personal Seoul guides curated by locals. Discover hidden gems through a local friend's eyes.",
    url: "https://triphero.club",
    siteName: "TripHero",
    images: [
      {
        url: "/images/map/og-seoul-guide.png",
        width: 1200,
        height: 630,
        alt: "TripHero Seoul guide preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TripHero — Seoul Guides from Local Friends",
    description: "Personal Seoul guides curated by locals. Discover hidden gems through a local friend's eyes.",
    images: ["/images/map/og-seoul-guide.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = locales.includes(raw as Locale)
    ? (raw as Locale)
    : defaultLocale;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider initialLocale={locale} initialMessages={messages}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
