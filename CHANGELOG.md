# Changelog

All notable changes to camiworks.com are recorded here. Newest first.

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
