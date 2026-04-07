import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["en", "es", "ja", "zh"];

function parseAcceptLanguage(header: string): string | undefined {
  const entries = header
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart ? parseFloat(qPart.replace("q=", "")) : 1;
      return { lang: lang.trim().split("-")[0].toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const entry of entries) {
    if (SUPPORTED.includes(entry.lang)) {
      return entry.lang;
    }
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && SUPPORTED.includes(cookieLocale)) {
    return NextResponse.next();
  }

  const acceptLang = request.headers.get("accept-language") ?? "";
  const detected = parseAcceptLanguage(acceptLang) ?? "en";

  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", detected, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|images|favicon).*)"],
};
