import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://triphero.club"),
  title: "Mina's Seoul Guide — Hidden Gems from a Local Friend",
  description:
    "A local Korean's handpicked hidden gems and favorite spots. Your friend Mina's personal Seoul guide.",
  applicationName: "Mina's Seoul Edit",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Mina's Seoul Guide — Hidden Gems from a Local Friend",
    description: "A local Korean's handpicked hidden gems and favorite spots. Your friend Mina's personal Seoul guide.",
    url: "https://triphero.club",
    siteName: "Mina's Seoul Edit",
    images: [
      {
        url: "/images/map/og-seoul-guide.png",
        width: 1200,
        height: 630,
        alt: "Illustrated Seoul guide map with Mina's portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mina's Seoul Guide — Hidden Gems from a Local Friend",
    description: "A local Korean's handpicked hidden gems and favorite spots. Your friend Mina's personal Seoul guide.",
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
