import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // The locale determined for this request (from the URL or headers)
  const requested = await requestLocale;
  // Validate that the locale is one of our supported locales; otherwise fallback to default.
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Load the JSON message dictionary for this locale.
    messages: (await import(`../../src/messages/${locale}.json`)).default,
  };
});
