import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [60, 65, 70, 75, 80, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
