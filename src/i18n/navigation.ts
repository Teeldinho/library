import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

// Create localized navigation wrappers.
// These will use our routing config to handle locale prefixes under the hood.
export const { Link, usePathname, useRouter, redirect, getPathname } = createNavigation(routing);
