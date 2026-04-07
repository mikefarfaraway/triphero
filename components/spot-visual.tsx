"use client";

import React from "react";
import type { Spot } from "@/types/content";
import { getSpotPalette, getSubcategoryEmoji } from "@/lib/spot-presentation";

type SpotVisualProps = {
  spot: Spot;
  className?: string;
};

export function SpotVisual({ spot, className = "" }: SpotVisualProps) {
  const palette = getSpotPalette(spot);

  if (spot.photoUrl) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={spot.photoUrl} alt={`${spot.name} photo`} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${palette.shell} ${className}`}>
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${palette.accent} ${palette.text}`}>
          {spot.neighborhood}
        </span>
        <span className="text-4xl">{getSubcategoryEmoji(spot.subcategory)}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/20 to-transparent" />
      <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/25 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
        {spot.category}
      </div>
    </div>
  );
}
