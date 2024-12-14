import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const defaultLocale = "en"; // Set your default locale here
  const supportedLocales = ["hi", "en", "mr"]; // List your supported locales

  // Check if the pathname starts with a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale is present, redirect to the default locale
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return Response.redirect(newUrl);
  }

  // Use next-intl middleware for internationalization
  return createMiddleware({
    locales: supportedLocales,
    defaultLocale,
  })(request);
}

export const config = {
  // Match all routes except those with file extensions and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
