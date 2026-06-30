import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const target = request.nextUrl.clone();
  target.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\..*).*)"],
};

export const supportedLocales = locales;
