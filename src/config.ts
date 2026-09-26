/** App Store id, approved 2026-09-26. Also drives the Smart App Banner in Base.astro. */
export const APP_STORE_ID = "6813968421";

/**
 * Storefront-neutral link: Apple redirects it to the visitor's own country store, which suits a bilingual
 * site better than the /us/ URL. Null would bring back the "Coming to the App Store" placeholder.
 */
export const APP_STORE_URL: string | null = `https://apps.apple.com/app/id${APP_STORE_ID}`;

export const SUPPORT_EMAIL = "support@garageopener.app";

/** The shared cloud-alerts service, on the brand domain since ADR-0016's 2026-09-22 amendment. */
export const CLOUD_HOST = "alerts.garageopener.app";

export const BRIDGE_IMAGE = "ghcr.io/pcrausaz/garage-opener-bridge";

/** Where the reference docker-compose.yml and .env.example are downloaded from (raw, main branch). */
export const SELFHOST_RAW_URL = "https://raw.githubusercontent.com/pcrausaz/garage-opener-bridge/main/selfhost";

/**
 * ADR-0017: the bridge is public under Apache-2.0. The iOS app and the cloud-alerts Worker are not, and the
 * pages say so explicitly rather than staying quiet about it.
 */
export const SOURCE_REPO_URL: string | null = "https://github.com/pcrausaz/garage-opener-bridge";

/** Public uptime page for the shared services: the cloud-alerts Worker, this site, and the demo bridge. */
export const STATUS_PAGE_URL = "https://monitor.liqpil.com/status/garageopener";

export const UPDATED = "2026-09-22";
