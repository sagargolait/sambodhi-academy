import { NextRequest } from "next/server";
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
    // Match all paths except those starting with specified prefixes
    "/((?!_next/static|_next/image|favicon.ico|public|images|api|admin|student-admin).*)",
  ],
};
