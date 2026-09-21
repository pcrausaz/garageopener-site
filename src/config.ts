/**
 * Set APP_STORE_URL once the app is live and the badge appears everywhere it is referenced. Until then the
 * hero shows an honest "not on the App Store yet" line rather than a badge that 404s.
 */
export const APP_STORE_URL: string | null = null;

export const SUPPORT_EMAIL = "support@garageopener.app";

/** The shared cloud-alerts service. Hostname is deliberately not on the brand domain — see ADR-0016. */
export const CLOUD_HOST = "garage-alerts.liqpil.com";

export const BRIDGE_IMAGE = "ghcr.io/pcrausaz/garage-opener-bridge";

/**
 * ADR-0017: the bridge and Worker become public under Apache-2.0 once the split checklist has been run.
 * Until this is a URL, no page may claim the source is available.
 */
export const SOURCE_REPO_URL: string | null = null;

export const UPDATED = "2026-09-21";
