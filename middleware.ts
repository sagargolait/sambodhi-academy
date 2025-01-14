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

  // Retrieve locale from the cookie
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  // Determine if the pathname contains a locale
  const pathnameLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  // Determine the locale to use
  let locale = pathnameLocale || localeFromCookie || defaultLocale;

  // If locale is invalid, fallback to defaultLocale
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  // Redirect to include the locale in the pathname if not already present
  if (!pathnameLocale) {
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = search; // Preserve query parameters

    const response = NextResponse.redirect(newUrl);

    // Set the locale cookie
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      httpOnly: false, // Accessible from the browser
      sameSite: "lax", // Avoid issues with navigation
      maxAge: 60 * 60 * 24 * 365, // 1 year
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

  // Ensure the locale cookie is consistent
  if (response) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      httpOnly: false, // Accessible from the browser
      sameSite: "lax",
      secure: process.env.node === "production" ? true : false,
      maxAge: 60 * 60 * 24 * 365, // 1 year
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
