export const defaultLocale = "en" as const;
export const locales = ["en", "es", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ja: "日本語",
  zh: "中文",
};
