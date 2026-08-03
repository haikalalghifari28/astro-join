// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jointeknologi.com/",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "id",
        locales: {
          id: "id-ID",
          en: "en-US",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false, // "/" = id, "/en/" = english
    },
  },
});
