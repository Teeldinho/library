import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Search - Library",
  description: "Find jobs by location or industry",
};

export function generateStaticParams() {
  // Enable static generation for all locale routes by pre-generating paths for each locale&#8203;:contentReference[oaicite:8]{index=8}
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // If the locale from the URL is not supported, trigger a 404 page
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // For static rendering: inform next-intl of the current locale (since there's no request during build)
  setRequestLocale(locale);

  return (
    <html lang={locale} className="light">
      <body className={cn(openSans.variable)}>
        <NuqsAdapter>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
