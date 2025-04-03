"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Select } from "@/components/ui/select/select";

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

  // Convert localeNames to options array
  const options = Object.entries(localeNames).map(([value, label]) => ({ value, label }));

  // Handler for when the user selects a different language
  const onSelectLocale = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return <Select value={currentLocale} onChange={(e) => onSelectLocale(e.target.value)} options={options} variant="default" />;
}
