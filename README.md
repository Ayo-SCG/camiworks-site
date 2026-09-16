# camiworks-site

The website for **CAMI** — Contract Administration and Management Interface, a product of [Ayo Strategic Consulting Group](https://www.ayoscg.com) — built to be served at [camiworks.com](https://camiworks.com).

This is a standalone static site: plain HTML, CSS, and a few lines of vanilla JavaScript. No frameworks, no build step, no server, no analytics, no cookies, no trackers. It is served by GitHub Pages directly from the repository root of `main`. All asset and navigation links are relative paths, so the site renders correctly from the filesystem, from a GitHub Pages project URL (`username.github.io/camiworks-site/`), and from the custom domain alike.

## Contents

| Path | Purpose |
| --- | --- |
| `index.html` | Home |
| `platform.html` | The Platform — the six capabilities |
| `discipline.html` | How It Holds Up — the three disciplines |
| `contact.html` | Contact |
| `styles.css` | All styling, shared by every page |
| `script.js` | Progressive touches (header shadow, mobile-menu close); the site works without it |
| `tour-video.js` | Home page product tour video: pause and play toggle, reduced motion, offscreen pausing, poster fallback; loaded by `index.html` only |
| `assets/` | SVG graphics, favicon, and the Open Graph image |
| `assets/tour/` | The product tour video (`CAMIWORKS_Website_Loop.mp4`) and its poster, self hosted |
| `robots.txt` | Allows all crawlers |
| `test/`, `package.json` | Test harness (Node's built-in test runner with jsdom, dev dependency only); nothing here is needed to serve the site |

## Making changes

Content changes go by pull request — branch, edit, open a PR, review, merge. Nothing is committed to `main` directly. Because there is no build step, what is merged is exactly what is served.

### Tests

The site needs no tooling to run, but its home page tour section has tests. With Node 22 or later:

```
npm install
npm test
```

The deployed server (GitHub Pages) is not configured in this repository, so the checks that the MP4 answers range requests with `206`, `Accept-Ranges: bytes`, and `video/mp4` are skipped unless pointed at a live site:

```
SITE_URL=https://camiworks.com npm test
```

The tests run on every pull request through `.github/workflows/test.yml`.

## Publishing

Two steps remain for the repository owner:

1. **Enable Pages:** in the repository **Settings → Pages**, set the source to deploy from the `main` branch (root folder).
2. **Custom domain:** the custom-domain step (pointing `camiworks.com` DNS at GitHub Pages, confirming the domain in the Pages settings, and adding a `CNAME` file) follows separately. There is deliberately no `CNAME` file yet — adding one before the domain is pointed at GitHub would break the temporary `*.github.io` review address.
