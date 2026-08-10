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
| `assets/` | SVG graphics, favicon, and the Open Graph image |
| `robots.txt` | Allows all crawlers |

## Making changes

Content changes go by pull request — branch, edit, open a PR, review, merge. Nothing is committed to `main` directly. Because there is no build step, what is merged is exactly what is served.

## Publishing

Two steps remain for the repository owner:

1. **Enable Pages:** in the repository **Settings → Pages**, set the source to deploy from the `main` branch (root folder).
2. **Custom domain:** the custom-domain step (pointing `camiworks.com` DNS at GitHub Pages, confirming the domain in the Pages settings, and adding a `CNAME` file) follows separately. There is deliberately no `CNAME` file yet — adding one before the domain is pointed at GitHub would break the temporary `*.github.io` review address.
