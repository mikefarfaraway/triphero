"use client";

import React from "react";
import type { Spot } from "@/types/content";

type SpotMapProps = {
  spots: Spot[];
};

export const MY_MAPS_PUBLIC_URL =
  "https://www.google.com/maps/d/u/0/edit?mid=1Ile6fS2J4iviMrr4EZyDchZsljE81sw&usp=sharing";

export function SpotMap({ spots }: SpotMapProps) {
  return (
    <a
      href={MY_MAPS_PUBLIC_URL}
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-[30px] border border-black/10 bg-[#FFFDF8] p-4 shadow-float transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
          Mina&apos;s Seoul Map, as a quick preview
        </p>
        <p className="mt-2 text-lg font-semibold text-ink">A still poster for fast scanning on mobile</p>
        <p className="mt-1 text-sm leading-6 text-black/60">
          Tap once to open Mina&apos;s full Seoul map in a new tab when you want real zoom, pan, and saved-pin
          behavior.
        </p>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[24px] border border-black/10 bg-[#F7F6F2]">
        <div className="relative h-[420px]">
          <img
            src="/images/map/seoul-map-poster.png"
            alt="Illustrated Seoul map poster preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/18 px-4 py-2 text-sm font-medium text-white backdrop-blur-md md:bottom-5 md:right-5 md:px-5 md:py-3 md:text-base">
            <span>Open Mina&apos;s map</span>
            <span aria-hidden="true" className="text-base leading-none md:text-lg">
              ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
