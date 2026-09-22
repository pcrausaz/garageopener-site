# garageopener.app

The product website for **Garage Opener** — a smart garage door for a UniFi Protect relay and door sensor.
Static Astro site, English and French, deployed to GitHub Pages.

The app, the bridge and the cloud-alerts Worker live in a different repository. This one is only the site.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # → dist/
pnpm preview   # serve dist/ the way Pages will
```

## Structure

```
src/pages/index.astro          /            English
src/pages/{privacy,terms,support,faq,self-hosting}.astro
src/pages/fr/…                 /fr/…        French, full parity
src/pages/404.astro
src/layouts/Base.astro         head, SEO, nav, footer
src/i18n/ui.ts                 routes, locale strings, absolute()
src/i18n/faq.ts                FAQ content for BOTH locales + the FAQPage JSON-LD
src/config.ts                  App Store URL, support address, source repo URL
public/                        CNAME, robots.txt, icons, og.png, _headers, _redirects
public/shots/                  app screenshots, dark, en + fr; generated, see below
```

**Adding a page** means adding it to `ROUTES` in `src/i18n/ui.ts` and creating it in *both* locales. The
`hreflang` pairs, the language switcher and the sitemap all derive from that map, so a page that exists in
only one locale will link to a 404 in the other.

## Screenshots

`public/shots/*.webp` come from the app's own screenshot test, never from a hand-made capture. The test pins
the door states and a stub home in downtown Austin, so nothing personal ends up on the site. From the app repo:

```bash
cd app && bundle exec fastlane snapshot --devices "iPhone 17 Pro Max" --dark_mode true \
  --launch_arguments "-SiteShots" --output_directory /tmp/siteshots
```

`-SiteShots` adds the Hold, Arriving-home and Stuck captures, which are not part of the App Store set. Resize
to 660px wide and convert to WebP (`cwebp -q 82`) as `<nn-name>.<en|fr>.webp`.

## Editing rules that are easy to get wrong

- **Privacy and terms are load-bearing.** The App Store listing links to `/privacy` and `/support`, and the
  in-app privacy screen carries the same text. Changing what `/privacy` claims about stored data means
  changing what the Worker actually does, not the other way round.
- **Never write "Protect Garage Opener" or put "UniFi"/"Ubiquiti" in a product name.** The name is
  **Garage Opener**; compatibility goes in the subtitle and body copy. The footer trademark line stays.
- **Don't claim the source is available** until `SOURCE_REPO_URL` in `src/config.ts` is a real URL. The pages
  already switch their wording on it.
- **No third-party scripts**, including analytics. The site has no cookies and no CSP is possible on GitHub
  Pages, so the answer is to load nothing from anywhere else.

## Hosting

GitHub Pages, built by `.github/workflows/deploy.yml` on every push to `main`. `public/CNAME` holds the
custom domain.

The build is deliberately host-neutral: static output, no server routes, real pages at both `/` and `/fr`
with self-referential canonicals, and nothing SEO-critical relying on a redirect. `_headers` and `_redirects`
are committed even though GitHub Pages ignores them, so moving to a Cloudflare Worker or Cloudflare Pages is
a DNS change and nothing else.

That move becomes necessary if universal links are ever wanted: Apple requires
`/.well-known/apple-app-site-association` served as `application/json`, and GitHub Pages cannot set headers.

### DNS (Cloudflare, not done from this repo)

1. Apex `A`/`AAAA` records to GitHub Pages' addresses (take them from `https://api.github.com/meta`, key
   `pages`, rather than from a blog post), and `www` `CNAME` to `<user>.github.io`.
2. **Grey-cloud both** (DNS only). GitHub has to see the records unproxied to issue the certificate, and it
   **refuses to accept the custom domain until DNS resolves** — setting it early returns
   `The certificate does not exist yet`. So: DNS first, then the custom domain, then the certificate, then
   Enforce HTTPS.
3. `www` → apex needs no rule while grey-clouded: GitHub Pages redirects it itself once the apex is the
   configured custom domain. A Cloudflare redirect rule would be dead config, because a dynamic redirect only
   fires on traffic that reaches the Cloudflare edge, which unproxied traffic never does.
4. Enable "Enforce HTTPS" in the repository's Pages settings once the certificate is live.

**The apex and `www` are grey-clouded, so Cloudflare enforces nothing on them.** `always_use_https`, minimum
TLS version and every other zone setting are no-ops on an unproxied hostname: for this site, TLS and the
HTTP→HTTPS redirect are entirely GitHub's, and GitHub does serve a real `301` on `http://` once Enforce HTTPS
is on. (It answered `404` for a short window right after that was enabled; that was transitional, not the
steady state — don't read a `301` as a regression.)

Note this is now a per-hostname statement, not a zone one: `demo.garageopener.app` is proxied, so the zone's
`always_use_https` and `min_tls_version` **are** live there. Proxying the apex would extend them to it, and is
also the point at which a Cloudflare `www` → apex redirect rule becomes worth adding (it survives a later
origin change, which the Pages redirect does not). A real `http` → `https` redirect is *not* a reason to
proxy — GitHub already provides one.

`support@garageopener.app` needs a Cloudflare Email Routing alias before the support page is truthful.
