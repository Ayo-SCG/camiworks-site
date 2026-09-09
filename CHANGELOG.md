# Changelog

All notable changes to camiworks.com are recorded here. Newest first.

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
