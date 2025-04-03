import type { NextConfig } from "next";

const createNextIntlPlugin = require("next-intl/plugin");

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin();
module.exports = withNextIntl(nextConfig);
