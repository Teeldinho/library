import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Use next-intl's middleware with our routing configuration.
// This handles redirecting to the proper locale sub-path and setting locale cookies.
export default createMiddleware(routing);

export const config = {
  // Skip middleware for paths that shouldn't be localized:
  // e.g. API routes, static files, Next.js internal paths.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
