"use client";

import { motion } from "framer-motion";
import React from "react";
import type { Spot } from "@/types/content";
import { getSpotPalette, getSubcategoryEmoji } from "@/lib/spot-presentation";

type SpotCardProps = {
  spot: Spot;
  onSelect: (spotId: string) => void;
  index: number;
  variant?: "main" | "gem";
};

export function SpotCard({ spot, onSelect, index, variant = "main" }: SpotCardProps) {
  const palette = getSpotPalette(spot);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(spot.id)}
      className={`glass-card text-left ${variant === "gem" ? "bg-[#FFF3EA]" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="flex h-full flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
          <span>{spot.neighborhood}</span>
          <span>{spot.hiddenGem ? "Hidden gem" : spot.priceLevel}</span>
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_96px] items-start gap-4 rounded-[24px] border border-black/10 bg-white/75 p-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-black/40">
              {spot.category} {getSubcategoryEmoji(spot.subcategory)}
            </p>
            <h2 className="display-font mt-3 text-[30px] leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]">
              {spot.name}
            </h2>
            <p className="mt-2 text-sm text-black/52">{spot.koreanName}</p>
          </div>

          <div className="h-24 overflow-hidden rounded-[18px] border border-black/10 bg-white/60">
            {spot.photoUrl ? (
              <img src={spot.photoUrl} alt={`${spot.name} photo`} className="h-full w-full object-cover" />
            ) : (
              <div className={`flex h-full items-center justify-center bg-gradient-to-br ${palette.shell}`}>
                <span className="text-4xl">{getSubcategoryEmoji(spot.subcategory)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-black/70">{spot.subcategory}</p>
          <p className="mt-3 text-[15px] leading-7 text-black/68">{spot.shortPitch}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {spot.vibeTags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                variant === "gem"
                  ? "border-[#FFB89E]/50 bg-[#FFF1E8] text-black/65"
                  : "border-black/10 bg-white/70 text-black/60"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 text-sm font-medium text-black/60">
          <span>
            {spot.district} · {spot.bestTime}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
