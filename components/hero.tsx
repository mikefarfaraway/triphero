"use client";

import { motion } from "framer-motion";
import React from "react";
import type { ProfileBundle } from "@/types/content";

type HeroProps = {
  profile: ProfileBundle;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="section-shell relative px-4 pt-4 sm:px-6">
      <motion.div
        className="glass-card relative mx-auto max-w-5xl overflow-hidden rounded-[32px] px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50">
            <span className="rounded-full bg-white/80 px-3 py-1">Local Seoul guide</span>
            <span className="rounded-full bg-[#C3F4D6]/70 px-3 py-1">Mobile first</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-stretch">
            <div className="space-y-5 lg:pr-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-black/55">{profile.subtitle}</p>
                <h1 className="display-font text-5xl leading-none tracking-[-0.04em] text-ink sm:text-6xl">
                  {profile.siteTitle}
                </h1>
                <p className="max-w-xl text-[15px] leading-7 text-black/70">{profile.introNote}</p>
              </div>

              <div className={`grid gap-3 ${profile.guest ? "sm:grid-cols-2" : ""}`}>
                {profile.guest ? (
                  <div className="rounded-[24px] border border-black/10 bg-white/70 p-4 lg:min-h-[232px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.24em] text-black/45">{profile.guest.role}</p>
                        <p className="mt-2 text-2xl font-semibold">{profile.guest.name}</p>
                      </div>
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border border-black/10 bg-[#FFF6EF]">
                        <img
                          src={profile.guest.heroImage}
                          alt={`${profile.guest.name} portrait`}
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition: profile.guest.heroImagePosition,
                            transform: `scale(${profile.guest.heroImageScale ?? 1})`,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-black/65">{profile.guest.shortBio}</p>
                  </div>
                ) : null}
                <div className="rounded-[24px] border border-black/10 bg-[#FFF1E8]/80 p-4 lg:min-h-[232px]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.24em] text-black/45">{profile.curator.role}</p>
                      <p className="mt-2 text-2xl font-semibold">{profile.curator.name}</p>
                    </div>
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[18px] border border-black/10 bg-[#F5FFF8]">
                      <img
                        src={profile.curator.heroImage}
                        alt={`${profile.curator.name} portrait`}
                        className="h-full w-full object-cover"
                        style={{
                          objectPosition: profile.curator.heroImagePosition,
                          transform: `scale(${profile.curator.heroImageScale ?? 1})`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-black/65">{profile.curator.shortBio}</p>
                </div>
              </div>
            </div>

            <div className="relative lg:h-full">
              <div className="absolute inset-x-6 top-6 h-20 rounded-full bg-[#FFD8C7] blur-3xl" />
              <div className="relative min-h-[340px] rounded-[28px] bg-confetti-glow p-3 lg:h-full">
                <div className="rounded-[24px] border border-black/10 bg-white/80 p-5 lg:flex lg:h-full lg:flex-col lg:justify-center">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">What this guide optimizes for</p>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-black/70 lg:text-[15px]">
                    <li>Places that feel recognizably Korean, not copy-paste tourist picks</li>
                    <li>A better first Seoul trip for visitors who care about taste and atmosphere</li>
                    <li>Enough hidden gems that the whole guide feels personally collected by {profile.curator.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
