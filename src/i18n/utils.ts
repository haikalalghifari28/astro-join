import { ui, defaultLang } from "./ui";
import { routes, type RouteKey } from "./routes";
import { getRelativeLocaleUrl } from "astro:i18n";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// untuk teks umum (navbar, footer, dll) dari ui.ts
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// untuk dictionary per-halaman (home.ts, about.ts, dll)
export function usePageTranslations<T extends Record<string, any>>(
  dictionary: T,
  lang: keyof T
) {
  return dictionary[lang] ?? dictionary[defaultLang as keyof T];
}
// BARU: ambil path yang sudah sesuai bahasa (belum termasuk prefix /en/)
export function getLocalizedPath(lang: keyof typeof ui, key: RouteKey) {
  return routes[key][lang];
}

export function getRouteKeyFromPath(pathWithoutLang: string): RouteKey | null {
  // normalisasi: hapus trailing slash, kecuali kalau memang cuma "/"
  const normalize = (p: string) =>
    p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalized = normalize(pathWithoutLang);

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (
      normalize(routes[key].id) === normalized ||
      normalize(routes[key].en) === normalized
    ) {
      return key;
    }
  }
  return null;
}

export function getHreflangAlternates(url: URL, routeKey: RouteKey | null) {
  const origin = url.origin;

  // Kalau routeKey tidak ketemu (halaman belum terdaftar di routes.ts),
  // aman untuk tidak menampilkan hreflang sama sekali daripada salah arah.
  if (!routeKey) return [];

  const idPath = getLocalizedPath("id", routeKey);
  const enPath = getLocalizedPath("en", routeKey);

  const idUrl = origin + getRelativeLocaleUrl("id", idPath);
  const enUrl = origin + getRelativeLocaleUrl("en", enPath);

  return [
    { hreflang: "id", href: idUrl },
    { hreflang: "en", href: enUrl },
    { hreflang: "x-default", href: idUrl },
  ];
}
