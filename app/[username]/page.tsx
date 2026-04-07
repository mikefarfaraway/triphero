import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { getHomepageData } from "@/lib/content";
import { VALID_USERNAMES, type Username } from "@/data/users/registry";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

type Params = { username: string };

export function generateStaticParams() {
  return VALID_USERNAMES.map((username) => ({ username }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { username } = await params;
  if (!VALID_USERNAMES.includes(username as Username)) return {};

  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = locales.includes(raw as Locale) ? (raw as Locale) : defaultLocale;
  const messages = await getMessages(locale);
  const tagline = messages["meta.tagline"] ?? "Hidden Gems from a Local Friend";

  const data = getHomepageData(username, locale);
  const { profile } = data;
  const ogImage = profile.mapImageUrl ?? "/images/map/seoul-map-poster.png";
  const faviconPath = `/images/people/${username}-favicon.png`;

  return {
    title: `${profile.siteTitle} — ${tagline}`,
    description: profile.subtitle,
    icons: {
      icon: faviconPath,
      shortcut: faviconPath,
      apple: faviconPath,
    },
    openGraph: {
      title: `${profile.siteTitle} — ${tagline}`,
      description: profile.subtitle,
      url: `https://triphero.club/${username}`,
      siteName: profile.siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: `${profile.curator.name}'s Seoul guide map preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.siteTitle} — ${tagline}`,
      description: profile.subtitle,
      images: [ogImage],
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;
  if (!VALID_USERNAMES.includes(username as Username)) {
    notFound();
  }

  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = locales.includes(raw as Locale) ? (raw as Locale) : defaultLocale;

  const data = getHomepageData(username, locale);
  return <HomePage data={data} />;
}
