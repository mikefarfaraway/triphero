"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import type { PersonProfile, RelatedSpot, Spot } from "@/types/content";
import { SpotVisual } from "@/components/spot-visual";
import { getSubcategoryLabel } from "@/lib/spot-presentation";
import { useT } from "@/lib/i18n/context";

type SpotDetailSheetProps = {
  spot: Spot | null;
  relatedSpots: RelatedSpot[];
  curator: PersonProfile;
  onClose: () => void;
  onSelectRelated: (spotId: string) => void;
};

export function SpotDetailSheet({
  spot,
  relatedSpots,
  curator,
  onClose,
  onSelectRelated,
}: SpotDetailSheetProps) {
  const { t } = useT();

  useEffect(() => {
    if (!spot) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [spot]);

  return (
    <AnimatePresence>
      {spot ? (
        <>
          <motion.button
            key="backdrop"
            type="button"
            aria-label={t("detail.closeDetails")}
            className="sheet-backdrop fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={`${spot.name} details`}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[86vh] max-w-[940px] overflow-hidden rounded-t-[32px] border border-black/10 bg-[#FFF9F4] md:bottom-4 md:rounded-[36px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="mx-auto flex max-w-[940px] items-start justify-between gap-4 px-5 pb-3 pt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
                  {spot.hiddenGem ? t("spot.hiddenGem") : t("spot.mainSpot")} · {spot.neighborhood}
                </p>
                <h3 className="display-font mt-2 text-4xl leading-none tracking-[-0.04em] sm:text-5xl">{spot.name}</h3>
                <p className="mt-2 text-sm text-black/55">{spot.koreanName}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium"
              >
                {t("detail.close")}
              </button>
            </div>

            <div className="hide-scrollbar max-h-[calc(86vh-88px)] overflow-y-auto px-5 pb-8">
              <div className="mx-auto max-w-[780px]">
                <SpotVisual
                  spot={spot}
                  className="h-[320px] rounded-[28px] border border-black/10 sm:h-[360px]"
                />
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-3 rounded-[24px] border border-[#18212B] bg-[#18212B] px-5 py-4 text-base font-semibold text-white shadow-float transition-transform duration-200 hover:-translate-y-0.5 sm:text-lg"
                >
                  <span className="text-xl">📍</span>
                  <span>{t("detail.openGoogleMaps")}</span>
                </a>
                <div className="mt-3 rounded-[28px] border border-black/10 bg-white/80 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/42">{t(`cat.${spot.category}`)}</p>
                  <p className="mt-3 text-2xl font-semibold leading-tight text-black/85">{getSubcategoryLabel(spot)}</p>
                  <p className="mt-4 text-xl font-semibold text-black/82">{spot.neighborhood}</p>
                  <p className="mt-1 text-sm text-black/55">{spot.district}</p>
                  <p className="mt-4 text-[15px] leading-7 text-black/70">{spot.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {spot.vibeTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/75 px-3 py-1 text-xs font-medium text-black/60">
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-5 grid max-w-[780px] gap-4 rounded-[28px] border border-black/10 bg-white/70 p-5">
                <div className="relative rounded-[22px] bg-[#18212B] p-4 pb-16 text-[#FFF9F4]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">{t("detail.localInsight", { name: curator.name })}</p>
                  <p className="mt-2 text-[15px] leading-7 text-white/84 italic">&quot;{spot.localInsight}&quot;</p>
                  <div className="absolute bottom-4 right-4 h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-lg">
                    <img
                      src={curator.heroImage}
                      alt={`${curator.name} portrait`}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: curator.heroImagePosition }}
                    />
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-black/65 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-black/10 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-black/40">{t("detail.bestTime")}</p>
                    <p className="mt-2 font-medium text-black/75">{t(spot.bestTime)}</p>
                  </div>
                  <div className="rounded-[20px] border border-black/10 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-black/40">{t("detail.priceFeel")}</p>
                    <p className="mt-2 font-medium text-black/75">{spot.priceLevel}</p>
                  </div>
                  <div className="rounded-[20px] border border-black/10 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-black/40">{t("detail.category")}</p>
                    <p className="mt-2 font-medium text-black/75">{t(`cat.${spot.category}`)}</p>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-5 max-w-[780px] rounded-[28px] border border-black/10 bg-[#F4FFF7] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/40">{t("detail.moreLikeThis")}</p>
                    <p className="mt-2 text-sm text-black/60">{t("detail.curatedFollowUps")}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {relatedSpots.length > 0 ? (
                    relatedSpots.map((relatedSpot) => (
                      <button
                        key={relatedSpot.id}
                        type="button"
                        onClick={() => onSelectRelated(relatedSpot.id)}
                        className="w-full rounded-[22px] border border-black/10 bg-white p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="display-font text-2xl leading-none tracking-[-0.04em]">{relatedSpot.name}</p>
                            <p className="mt-2 text-sm text-black/50">
                              {relatedSpot.neighborhood} · {relatedSpot.koreanName}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-black/55">
                            {relatedSpot.hiddenGem ? t("spot.hiddenGem") : relatedSpot.priceLevel}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-black/68">{relatedSpot.reason}</p>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-[22px] border border-dashed border-black/15 bg-white/70 p-4 text-sm text-black/55">
                      {t("detail.noFollowUp")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
