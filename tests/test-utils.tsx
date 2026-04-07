import React from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n/context";
import en from "@/messages/en.json";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="en" initialMessages={en as Record<string, string>}>
      {children}
    </LocaleProvider>
  );
}

export function renderWithI18n(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Wrapper, ...options });
}
