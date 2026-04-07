"use client";

import React from "react";
import type { Spot } from "@/types/content";
import { useT } from "@/lib/i18n/context";

type SpotMapProps = {
  spots: Spot[];
  mapImageUrl?: string;
};

export const MY_MAPS_PUBLIC_URL =
  "https://www.google.com/maps/d/u/0/edit?mid=1Ile6fS2J4iviMrr4EZyDchZsljE81sw&usp=sharing";

export function SpotMap({ spots, mapImageUrl = "/images/map/seoul-map-poster.png" }: SpotMapProps) {
  const { t } = useT();

  return (
    <a
      href={MY_MAPS_PUBLIC_URL}
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-[30px] border border-black/10 bg-[#FFFDF8] shadow-float transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/42">{t("map.label")}</p>
        <p className="mt-1 text-lg font-semibold text-ink">{t("map.exploreAll")}</p>
      </div>
      <div className="relative mt-3">
        <img
          src={mapImageUrl}
          alt={t("map.altText")}
          className="mx-auto w-full max-w-[600px] object-contain"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#18212B] px-4 py-2 text-sm font-medium text-white shadow-lg md:bottom-5 md:right-5 md:px-5 md:py-3 md:text-base">
          <span>{t("map.openGoogleMaps")}</span>
          <span aria-hidden="true" className="text-base leading-none md:text-lg">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
