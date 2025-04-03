import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // List all supported locales:
  locales: ["en", "es", "fr"],
  // Default locale used when no locale is specified:
  defaultLocale: "en",
});
