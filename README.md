# camiworks-site

The launch website for **CAMI** — Contract Administration and Management Interface, a product of [Ayo Strategic Consulting Group](https://www.ayoscg.com) — served at [camiworks.com](https://camiworks.com).

This is a standalone static site: plain HTML, CSS, and a few lines of vanilla JavaScript. No frameworks, no build step, no server, no analytics, no cookies, no trackers. It is served by GitHub Pages directly from the repository root of `main`.

## Contents

| Path | Purpose |
| --- | --- |
| `index.html` | The single-page site |
| `styles.css` | All styling |
| `script.js` | One progressive touch (header shadow on scroll); the site works without it |
| `assets/` | SVG graphics, favicon, and the Open Graph image |
| `CNAME` | Custom domain for GitHub Pages (`camiworks.com`) |
| `robots.txt` | Allows all crawlers |

## Making changes

Content changes go by pull request — branch, edit, open a PR, review, merge. Nothing is committed to `main` directly. Because there is no build step, what is merged is exactly what is served.

## Publishing

Two steps remain for the repository owner:

1. **Enable Pages:** in the repository **Settings → Pages**, set the source to deploy from the `main` branch (root folder).
2. **Custom domain:** the custom-domain step (pointing `camiworks.com` DNS at GitHub Pages and confirming the domain in the Pages settings) follows separately. The `CNAME` file is already in place.
