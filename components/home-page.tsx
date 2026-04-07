"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HomepageData } from "@/types/content";
import { Hero } from "@/components/hero";
import { MY_MAPS_PUBLIC_URL, SpotMap } from "@/components/spot-map";
import { SpotCard } from "@/components/spot-card";
import { SpotDetailSheet } from "@/components/spot-detail-sheet";

type HomePageProps = {
  data: HomepageData;
};

export function HomePage({ data }: HomePageProps) {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [showFloatingMapCta, setShowFloatingMapCta] = useState(false);
  const mapSectionRef = useRef<HTMLElement | null>(null);

  const selectedSpot = data.allSpots.find((spot) => spot.id === selectedSpotId) ?? null;
  const relatedSpots = selectedSpot ? data.relatedBySpotId[selectedSpot.id] ?? [] : [];
  const browseableSpots = data.mainSpots;

  const categories = useMemo(
    () => ["All", ...new Set(browseableSpots.map((spot) => spot.category))],
    [browseableSpots],
  );

  const subcategories = useMemo(() => {
    const scoped =
      activeCategory === "All"
        ? browseableSpots
        : browseableSpots.filter((spot) => spot.category === activeCategory);

    return ["All", ...new Set(scoped.map((spot) => spot.subcategory))];
  }, [activeCategory, browseableSpots]);

  const filteredSpots = useMemo(
    () =>
      browseableSpots.filter((spot) => {
        if (activeCategory !== "All" && spot.category !== activeCategory) {
          return false;
        }

        if (activeSubcategory !== "All" && spot.subcategory !== activeSubcategory) {
          return false;
        }

        return true;
      }),
    [activeCategory, activeSubcategory, browseableSpots],
  );

  useEffect(() => {
    const handleScroll = () => {
      const mapSection = mapSectionRef.current;

      if (!mapSection) {
        return;
      }

      const rect = mapSection.getBoundingClientRect();
      setShowFloatingMapCta(rect.bottom < 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className="pb-12">
      <Hero profile={data.profile} />

      <section className="px-4 pt-6 sm:px-6">
        <motion.div
          className="mx-auto max-w-5xl rounded-[32px] border border-black/10 bg-white/55 p-5 shadow-float backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/42">
              A Seoul guide, made by a local
            </p>
            <h2 className="display-font mt-2 text-4xl leading-none tracking-[-0.04em]">
              The side of Seoul a local friend would actually show you
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-black/65">
              Not a generic city checklist, but a local&apos;s personal shortlist: places with warmth, beauty, good
              taste, and that unmistakable Korean texture. The main spots keep your trip easy to plan, while the hidden
              gems make it feel like a local friend is quietly letting you into her own favorite version of Seoul.
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-[15px] leading-7 text-black/62">
            <li>
              • {data.mainSpots.length} main spots for broad coverage across Seoul food, cafe, and bar essentials.
            </li>
            <li>
              • {data.hiddenGems.length} hidden gems for places that feel quieter, more Korean, and less obvious to
              foreign visitors.
            </li>
            <li>• {data.neighborhoods.length} neighborhoods represented, so routes can stay compact and local.</li>
            <li>• Map exploration still sits below when a quick geographic sense-check is more useful than the list.</li>
          </ul>
        </motion.div>
      </section>

      <section ref={mapSectionRef} className="px-4 pt-6 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[30px] border border-black/10 bg-[#F6FBFF] p-5 shadow-float">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/42">Map explorer</p>
            <h2 className="display-font mt-2 text-4xl leading-none tracking-[-0.04em]">
              See where the trip clusters geographically
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-black/65">
              This is the fastest way to sense whether a place sits in the right part of town, whether a route can
              stay compact, and which hidden gems naturally belong in the same neighborhood plan.
            </p>
          </div>
          <div className="mt-5">
            <SpotMap spots={filteredSpots} />
          </div>
        </div>
      </section>

      <section className="px-4 pt-6 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[30px] border border-black/10 bg-[#FFF7F0] p-5 shadow-float">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/42">Hidden gems</p>
          <h2 className="display-font mt-2 text-4xl leading-none tracking-[-0.04em]">The more Korean, less obvious layer</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black/65">
            These eight are the ones that shift the app from “good Seoul recommendations” to “this was clearly made by
            someone local.” Private hanok dining, certified traditional confectionery, mountain views, and tea spaces
            that do not read like default tourist picks.
          </p>
        </div>
      </section>

      <section className="px-4 pt-5 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.hiddenGems.map((spot, index) => (
            <SpotCard key={spot.id} spot={spot} index={index} onSelect={setSelectedSpotId} variant="gem" />
          ))}
        </div>
      </section>

      <section className="px-4 pt-6 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[30px] border border-black/10 bg-white/60 p-5 shadow-float backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/42">Browse the full list</p>
              <h2 className="display-font mt-2 text-4xl leading-none tracking-[-0.04em]">Filter by category and subcategory</h2>
              <p className="mt-3 text-[15px] leading-7 text-black/65">
                The shortlist is big enough now that food type matters more than one long feed. Use category first,
                then narrow by subcategory when you want to compare similar places more quickly.
              </p>
            </div>
            <div className="text-sm text-black/55">{filteredSpots.length} spots visible</div>
          </div>
          <div className="hide-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setActiveCategory(name);
                  setActiveSubcategory("All");
                }}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeCategory === name
                    ? "border-[#18212B] bg-[#18212B] text-white"
                    : "border-black/10 bg-white/80 text-black/60"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {subcategories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveSubcategory(name)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeSubcategory === name
                    ? "border-[#FF8966] bg-[#FF8966] text-white"
                    : "border-black/10 bg-white/80 text-black/60"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-5 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSpots.map((spot, index) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              index={index % 9}
              onSelect={setSelectedSpotId}
              variant={spot.hiddenGem ? "gem" : "main"}
            />
          ))}
        </div>
      </section>

      <SpotDetailSheet
        spot={selectedSpot}
        relatedSpots={relatedSpots}
        onClose={() => setSelectedSpotId(null)}
        onSelectRelated={setSelectedSpotId}
      />

      {showFloatingMapCta ? (
        <a
          href={MY_MAPS_PUBLIC_URL}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#18212B]/10 bg-[#18212B] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(24,33,43,0.24)] transition-transform duration-200 hover:-translate-y-0.5 sm:right-6 sm:px-5"
        >
          <span aria-hidden="true" className="text-base leading-none">
            🗺️
          </span>
          <span>View on Google Maps</span>
        </a>
      ) : null}
    </main>
  );
}
