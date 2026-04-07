import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://triphero.club"),
  title: "TripHero — Seoul Guides from Local Friends",
  description: "Personal Seoul guides curated by locals. Discover hidden gems through a local friend's eyes.",
  applicationName: "TripHero",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
