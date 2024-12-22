import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for admin routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/my-route") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  const defaultLocale = routing.defaultLocale;
  const locales = routing.locales;

  // Check if pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale is present, redirect to default locale
  if (!pathnameHasLocale) {
    const newUrl = new URL(
      `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
      request.url
    );
    return Response.redirect(newUrl);
  }

  // Use next-intl middleware for internationalization
  return createMiddleware({
    locales,
    defaultLocale,
  })(request);
}

export const config = {
  matcher: [
    // Skip admin routes and other static assets
    "/((?!admin|_next/static|_next/image|favicon.ico|api).*)",
  ],
};
