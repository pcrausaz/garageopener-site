// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export const SITE = "https://garageopener.app";

/**
 * Static output only, and nothing host-specific (ADR-0018). The site is served from GitHub Pages today;
 * it must be able to move to a Worker or Cloudflare Pages without a rebuild of anything but the origin.
 */
export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en-US", fr: "fr-FR" } },
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
