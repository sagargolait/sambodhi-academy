import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student-admin") ||
    pathname.startsWith("/my-route") ||
    pathname.startsWith("/keep-alive") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const { locales, defaultLocale } = routing;

  // Detect locale in current pathname
  const pathnameLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  // If no locale in path, redirect preserving cookie-based locale
  if (!pathnameLocale) {
    const locale =
      localeFromCookie && locales.includes(localeFromCookie as any)
        ? localeFromCookie
        : defaultLocale;

    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(newUrl);

    if (!localeFromCookie || localeFromCookie !== locale) {
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  }

  const response = intlMiddleware(request);

  // Sync cookie when locale changes via URL
  if (response && pathnameLocale !== localeFromCookie) {
    response.cookies.set("NEXT_LOCALE", pathnameLocale, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images|api|admin|student-admin|keep-alive|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)).*)",
  ],
};
