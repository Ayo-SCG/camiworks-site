# Changelog

All notable changes to camiworks.com are recorded here. Newest first.

## 2026-09-16 (corrected tour video)

### What changed

- The tour video at assets/tour/CAMIWORKS_Website_Loop.mp4 was replaced in place with a corrected render (pull request #8). The corrected render changes only the closing slide, which now shows camiworks.com instead of ayoscg.com. The file name, the poster, and the page markup are unchanged, and the file is still served as delivered with no re-encoding.
- The hidden text alternative for the video in index.html now ends "schedule a live demo at camiworks.com" to match the closing slide. The test that checks the exact description text is updated to match. Nothing else on the site changed; the footer's link to Ayo Strategic Consulting Group at ayoscg.com stays as it is.

### Why

The tour should send visitors to the product's own domain, and the text alternative has to describe what the video actually shows.

## 2026-09-16 (product tour video)

### What changed

- The home page gains a See It In Action section directly below the hero: a silent, looping product tour video under the heading A quick tour of CAMIWORKS™, one supporting sentence, and a Schedule your live demo button that goes to the existing contact page (contact.html), the same target as the hero's Start a conversation button.
- The video is a native HTML video element, self hosted from assets/tour/ (CAMIWORKS_Website_Loop.mp4 and CAMIWORKS_Website_Loop_poster.jpg, committed as delivered, with no re-encoding). It autoplays muted, loops, plays inline on iOS, shows no browser controls, preloads metadata only, and keeps its poster visible before it loads and if it fails to load. Both sources are relative paths on the site's own origin. No third party player, script, font, or origin was added, and the site still sets no Content Security Policy.
- A pause and play toggle sits in the corner of the video. It is a native button, so it works by mouse, touch, and keyboard, and its accessible name changes with state (Pause tour video, Play tour video). It is hidden in the markup and revealed by the script, so it never appears without the behaviour behind it. Visitors whose system asks for reduced motion get the poster and the toggle in the play state instead of autoplay. The video pauses when scrolled fully out of view and resumes when it returns, unless the visitor paused it. A visually hidden paragraph, linked by aria-describedby, describes the tour screen by screen for people who cannot see it. All of this lives in a new tour-video.js, loaded by the home page only.
- Supporting styles in styles.css: the section layout (text centered above the video, stacked and full width on phones), a 16 by 9 frame capped at the video's natural 1920 pixel width that reserves its space before the video loads and carries the poster as a background, rounded corners and a shadow matching the site's cards, the toggle, and a visually hidden utility class.
- A test suite (Node's built in test runner with jsdom as the only dev dependency) covers the section's placement and exact copy, the absence of dashes, the video attributes and text alternative, the demo button's use of an existing link, the toggle and its accessible name, reduced motion, offscreen pausing, the poster fallback, the absence of any new external origin, and the presence of the two media files. When SITE_URL is set it also checks that the deployed server answers a range request for the MP4 with 206, Accept-Ranges: bytes, and video/mp4, and caches both files like the site's other assets. A GitHub Actions workflow runs the suite on every pull request. Nothing in the harness is needed to serve the site.

### Why

Visitors should see the product working near the top of the home page without leaving the site and without anything loading from a third party, and be able to schedule a demo from the same place. The pause control, reduced motion handling, and text alternative keep the moving content within WCAG 2.2, and the tests make the section's promises checkable on every change.

## 2026-09-09 (form redirect)

### What changed

- The Zoho CRM webform block in early-access.html was replaced in whole with a regenerated form from Zoho. Its hidden account values differ from the previous block, and its returnURL is now https://camiworks.com/thank-you.html, so submitting the form lands on the thank-you page.
- The same treatments as the first placement were applied to the new block: Reset button removed, duplicate viewport and content-type meta tags removed, and the Email input set to type email with Zoho's ftype attribute untouched. The hidden inputs, honeypot, Zoho's style block, validation script, and analytics script are all kept.
- The override CSS at the end of the page's style block is unchanged and applies to the new block as before.

### Why

The first Zoho embed had no return URL, so a submission left the visitor on a Zoho page. With the thank-you page live, the form was regenerated in Zoho with the redirect set, and the regenerated block carries new account values that had to be placed whole.

## 2026-09-09 (thank-you page)

### What changed

- A new standalone page, thank-you.html, joins the site at the root. Like early-access.html it carries its own header band, wordmark, confirmation message, "What happens next" card, a button to camiworks.com, and footer, with its own CSS. It is not built on the shared site template and is not linked from the navigation.
- The page carries a noindex robots tag, since visitors only reach it by redirect after submitting the early access form.

### Why

Submitting the early access form navigates away from the page, so the confirmation has to live on a page of its own. This is the page the Zoho webform's return URL will send people to.

## 2026-09-09

### What changed

- early-access.html now carries the live Zoho CRM webform (First Name, Last Name, Email, Company) between the START and END markers, replacing the coming-soon placeholder line. The Zoho block is kept whole: the hidden account inputs, the honeypot field, Zoho's own style block, the mandatory-field script, and the analytics script at the end are all in place.
- Three edits to the Zoho block as delivered: the Reset button was removed so a stray tap cannot wipe what someone typed; the duplicate viewport and content-type meta tags inside the form div were removed, since the page head already carries both and a second viewport tag can cause zoom problems on phones; and the Email input is now type email (Zoho's ftype attribute is untouched) so phones show the keyboard with the @ key.
- The hidden confirmation block ("You're on the list.") and its CSS were removed. The Zoho form navigates away on submit, so that message could never display.
- Override CSS was added at the end of the page's style block so the embed matches the page: full-width stacked fields, labels above inputs in the page font, page input styling and focus colour, the deep green full-width Claim My Spot button, and Zoho's form title and help columns hidden. Zoho's own wrapper padding, margin, and inline Arial label font are overridden explicitly, since Zoho's style block sits later in the document and would otherwise win.

### Why

The Zoho embed code is the approved submission path for early access sign-ups. Placing it with these adjustments keeps Zoho's required plumbing intact while making the form read as part of the page on phones, where the QR code traffic lands.

## 2026-09-02 (correction)

### What changed

- early-access.html was replaced with the approved standalone design. It is intentionally not built on the shared site template: it carries its own header band, wordmark, form card, value list, and footer, and its own CSS, so it stands alone as the QR code landing page.
- As the file was placed: the title tag reads "Early Access: CAMIWORKS Contract Administration Software" with a matching og:title; the wordmark carries the trademark symbol; the Zapier submission script and its webhook constant were removed; and the form element was replaced by the Zoho CRM webform placeholder (START and END markers) holding a single coming-soon line.
- The early-access page rules added to styles.css earlier today were removed, since the standalone page does not load styles.css.

### Why

The standalone design is the approved layout for the early access page. Submissions will go through a Zoho CRM webform, not a Zapier webhook, so the script came out and the placeholder stays until the Zoho embed code is supplied.

## 2026-09-02

### What changed

- The product name reads CAMIWORKS everywhere a visitor can see it: header wordmark, page titles, meta and Open Graph tags, body copy, and footer. The wordmark now carries the trademark symbol.
- Em dashes were removed from all page copy and replaced with sentence breaks or commas. Arrow characters were removed from link text.
- The footer copyright line uses the copyright symbol.
- A new Early Access page (early-access.html) joins the site, built on the shared site template. It carries the headline, supporting line, a clearly marked placeholder for the Zoho CRM webform (name, email, company), and three supporting points. The form embed code follows separately.
- The navigation gains an Early Access item on every page, between How It Holds Up and Contact.
- The home page hero has a primary button, Join the early access list, ahead of the existing Start a conversation button.
- The contact page email moved from info@ayoscg.com to notifications@camiworks.com, and the line under the email link now points visitors to the early access list.
- Supporting styles: a secondary button style, trademark sizing on the wordmark, hero button layout, early access page layout, and the mobile menu breakpoint raised from 780px to 900px so five navigation items fit on desktop.

### Why

The product is marketed as CAMIWORKS, and the site needed to say so consistently, in visible text and in what search engines and social previews read. The Early Access page gives QR code and campaign traffic a single place to land and leave their details ahead of launch, and the contact email moves to the product domain so replies come from CAMIWORKS.
