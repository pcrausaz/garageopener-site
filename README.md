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
```

**Adding a page** means adding it to `ROUTES` in `src/i18n/ui.ts` and creating it in *both* locales. The
`hreflang` pairs, the language switcher and the sitemap all derive from that map, so a page that exists in
only one locale will link to a 404 in the other.

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

### DNS (Cloudflare — not done from this repo)

1. Apex `A`/`AAAA` records to GitHub Pages' addresses, `www` `CNAME` to `<user>.github.io`.
2. **Grey-cloud** (DNS only) until GitHub has issued the certificate, then proxy.
3. `www` → apex as a Cloudflare **redirect rule**, not a Pages setting, so it survives an origin change.
4. Enable "Enforce HTTPS" in the repository's Pages settings once the certificate is live.

`support@garageopener.app` needs a Cloudflare Email Routing alias before the support page is truthful.
