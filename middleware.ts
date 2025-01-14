import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for specific routes and public assets
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student-admin") ||
    pathname.startsWith("/my-route") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/)
  ) {
    return;
  }

  const defaultLocale = routing.defaultLocale;
  const locales = routing.locales;

  // Get locale from cookie or pathname
  let locale = request.cookies.get("NEXT_LOCALE")?.value;

  // Check if pathname has a locale
  const pathnameLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  if (pathnameLocale) {
    locale = pathnameLocale;
  }

  // If no locale is found, use default
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  // If pathname doesn't have locale, redirect
  if (!pathnameLocale) {
    const newUrl = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url
    );
    newUrl.search = request.nextUrl.search; // Preserve query parameters

    const response = NextResponse.redirect(newUrl);

    // Set locale cookie
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false, // Ensure it's accessible from the browser
      sameSite: "lax", // Lax to allow navigation links
      secure: process.env.node === "production" ? true : false,
    });

    return response;
  }

  // Use next-intl middleware with the determined locale
  const response = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always",
  })(request);

  // Ensure cookie is set/updated
  if (response) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Ensure it's accessible from the browser
      sameSite: "lax", // Lax to allow navigation links
      secure: process.env.node === "production" ? true : false,
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except those starting with specified prefixes
    "/((?!_next/static|_next/image|favicon.ico|public|images|api|admin|student-admin).*)",
  ],
};
