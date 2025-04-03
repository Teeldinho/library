"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

// Define the locale options and their display names
const localeNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname(); // Current path (e.g. "/jobs/abc"), without locale prefix
  const router = useRouter(); // Locale-aware router from next-intl

  // Handler for when the user selects a different language
  const onSelectLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    // Replace the current route with the same path under the new locale
    router.replace(pathname, { locale: newLocale });
    // The router from next-intl will navigate to `/{newLocale}${pathname}`
  };

  return (
    <div>
      {/* <div style={{ textAlign: "right", margin: "1rem 0" }}> */}
      <select value={currentLocale} onChange={onSelectLocale} title="Language">
        {Object.entries(localeNames).map(([locale, name]) => (
          <option key={locale} value={locale}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
