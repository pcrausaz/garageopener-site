/**
 * Set APP_STORE_URL once the app is live and the badge appears everywhere it is referenced. Until then the
 * hero shows an honest "not on the App Store yet" line rather than a badge that 404s.
 */
export const APP_STORE_URL: string | null = null;

export const SUPPORT_EMAIL = "support@garageopener.app";

/** The shared cloud-alerts service, on the brand domain since ADR-0016's 2026-09-22 amendment. */
export const CLOUD_HOST = "alerts.garageopener.app";

export const BRIDGE_IMAGE = "ghcr.io/pcrausaz/garage-opener-bridge";

/**
 * ADR-0017: the bridge is public under Apache-2.0. The iOS app and the cloud-alerts Worker are not, and the
 * pages say so explicitly rather than staying quiet about it.
 */
export const SOURCE_REPO_URL: string | null = "https://github.com/pcrausaz/garage-opener-bridge";

/** Public uptime page for the shared services: the cloud-alerts Worker, this site, and the demo bridge. */
export const STATUS_PAGE_URL = "https://monitor.liqpil.com/status/garageopener";

export const UPDATED = "2026-09-22";
