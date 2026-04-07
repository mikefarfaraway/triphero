import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { getHomepageData } from "@/lib/content";
import { VALID_USERNAMES, type Username } from "@/data/users/registry";

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

  const data = getHomepageData(username);
  const { profile } = data;
  const ogImage = profile.mapImageUrl ?? "/images/map/seoul-map-poster.png";
  const faviconPath = `/images/people/${username}-favicon.png`;

  return {
    title: `${profile.siteTitle} — Hidden Gems from a Local Friend`,
    description: profile.subtitle,
    icons: {
      icon: faviconPath,
      shortcut: faviconPath,
      apple: faviconPath,
    },
    openGraph: {
      title: `${profile.siteTitle} — Hidden Gems from a Local Friend`,
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
      title: `${profile.siteTitle} — Hidden Gems from a Local Friend`,
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

  const data = getHomepageData(username);
  return <HomePage data={data} />;
}
