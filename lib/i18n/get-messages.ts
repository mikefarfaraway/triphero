import type { Locale } from "./config";
import en from "@/messages/en.json";

type Messages = Record<string, string>;

const messageImports: Record<string, () => Promise<Messages>> = {
  es: () => import("@/messages/es.json").then((m) => m.default as Messages),
  ja: () => import("@/messages/ja.json").then((m) => m.default as Messages),
  zh: () => import("@/messages/zh.json").then((m) => m.default as Messages),
};

export function getMessagesSync(locale: Locale): Messages {
  if (locale === "en") return en as Messages;
  return en as Messages;
}

export async function getMessages(locale: Locale): Promise<Messages> {
  if (locale === "en") return en as Messages;
  const localeMessages = await messageImports[locale]?.();
  if (!localeMessages) return en as Messages;
  return { ...(en as Messages), ...localeMessages };
}
