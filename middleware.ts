import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { defaultLocale, locales } = routing;

  // Skip middleware for specific routes and public assets
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student-admin") ||
    pathname.startsWith("/my-route") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map|txt)$/)
  ) {
    return NextResponse.next();
  }

  // Get locale from cookie
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  console.log("localeFromCookie", localeFromCookie);

  // Check if the current pathname contains a locale
  const pathnameLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  console.log("pathnameLocale", pathnameLocale);

  // Determine which locale to use
  let locale: string;

  if (pathnameLocale) {
    // If pathname has a locale, use it and update cookie
    console.log("inside if pathnameLocale", pathnameLocale);
    locale = pathnameLocale;
  } else if (localeFromCookie && locales.includes(localeFromCookie as any)) {
    // If valid cookie exists, use it
    console.log(
      "localeFromCookie",
      localeFromCookie,
      locales.includes(localeFromCookie as any)
    );
    locale = localeFromCookie;
  } else {
    // Fallback to default locale
    console.log("Fallback", defaultLocale);
    locale = defaultLocale;
  }

  // If no locale in pathname, redirect to include locale
  if (!pathnameLocale) {
    console.log("!pathname", pathnameLocale);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = search;

    const response = NextResponse.redirect(newUrl);

    console.log("inside pathnameLocale check", locale);

    // Only set cookie if it's different from current cookie
    if (locale !== localeFromCookie) {
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  }

  // Use next-intl middleware
  const response = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always",
  })(request);

  // Only update cookie if locale has changed
  if (response && locale !== localeFromCookie) {
    console.log("response", locale);
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images|api|admin|student-admin).*)",
  ],
};
