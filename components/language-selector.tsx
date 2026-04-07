"use client";

import React, { useState, useRef, useEffect } from "react";
import { useT } from "@/lib/i18n/context";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSelector() {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50 transition-colors hover:bg-white"
      >
        <span className="text-sm leading-none">🌐</span>
        <span>{localeNames[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocale(loc as Locale);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-black/5 ${
                loc === locale ? "font-semibold text-black" : "text-black/60"
              }`}
            >
              {localeNames[loc as Locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
