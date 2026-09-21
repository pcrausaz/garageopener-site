export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const HTML_LANG: Record<Locale, string> = { en: "en-US", fr: "fr-FR" };

/** Page keys → path segment. The same key exists in both locales, which is what makes hreflang trivial. */
export const ROUTES = {
  home: "",
  privacy: "privacy",
  terms: "terms",
  support: "support",
  faq: "faq",
  selfHosting: "self-hosting",
} as const;
export type RouteKey = keyof typeof ROUTES;

/** English lives at the root, French under /fr. Both are real pages; nothing depends on a redirect. */
export function path(locale: Locale, key: RouteKey): string {
  const seg = ROUTES[key];
  const base = locale === "en" ? "" : "/fr";
  return seg ? `${base}/${seg}` : base || "/";
}

export const ui = {
  en: {
    "site.name": "Garage Opener",
    "site.tagline": "A real smart garage door for UniFi Protect",
    "nav.home": "Home",
    "nav.faq": "FAQ",
    "nav.selfHosting": "Self-hosting",
    "nav.support": "Support",
    "nav.privacy": "Privacy",
    "nav.terms": "Terms",
    "nav.skip": "Skip to content",
    "lang.switch": "Français",
    "lang.label": "Language",
    "footer.note": "Works with UniFi Protect. Not affiliated with, endorsed by or sponsored by Ubiquiti Inc.",
    "footer.trademark": "“UniFi” and “UniFi Protect” are trademarks of Ubiquiti Inc.",
    "appstore.alt": "Download on the App Store",
    "toc": "On this page",
    "updated": "Last updated",
  },
  fr: {
    "site.name": "Garage Opener",
    "site.tagline": "Une vraie porte de garage connectée pour UniFi Protect",
    "nav.home": "Accueil",
    "nav.faq": "FAQ",
    "nav.selfHosting": "Auto-hébergement",
    "nav.support": "Assistance",
    "nav.privacy": "Confidentialité",
    "nav.terms": "Conditions",
    "nav.skip": "Aller au contenu",
    "lang.switch": "English",
    "lang.label": "Langue",
    "footer.note": "Compatible UniFi Protect. Sans affiliation, approbation ni parrainage d’Ubiquiti Inc.",
    "footer.trademark": "« UniFi » et « UniFi Protect » sont des marques d’Ubiquiti Inc.",
    "appstore.alt": "Télécharger dans l’App Store",
    "toc": "Sur cette page",
    "updated": "Dernière mise à jour",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function t(locale: Locale) {
  return (key: keyof (typeof ui)["en"]): string => ui[locale][key];
}

export const NAV: RouteKey[] = ["faq", "selfHosting", "support"];

/**
 * Absolute URL for a page. The root keeps its trailing slash so that canonical, hreflang and the generated
 * sitemap all name byte-identical URLs; every other path has none (astro `trailingSlash: "never"`).
 */
export function absolute(site: URL | string, locale: Locale, key: RouteKey): string {
  const origin = typeof site === "string" ? site : site.origin;
  const p = path(locale, key);
  return p === "/" ? `${origin}/` : `${origin}${p}`;
}
