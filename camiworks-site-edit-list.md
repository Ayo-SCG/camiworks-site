# CAMIWORKS Website Edit List

Prepared for Ayo Strategic Consulting Group, LLC
Site: camiworks.com (static site hosted on GitHub Pages)
Files affected: index.html, platform.html, discipline.html, contact.html, plus one new file

## How to use this document

Every item below gives you the exact text to find and the exact text to replace it with. These are mechanical edits. No judgment calls are required.

Work on a feature branch and open a pull request. Do not push to main.

Four changes repeat on every page, so they are listed once here rather than four times below.

### Change A. Header logo wordmark, all four pages

Find: C CAMI
Replace with: C CAMIWORKS™

Note: on index.html the wordmark already reads CAMIWORKS. On that page only, add the trademark symbol so it reads CAMIWORKS™.

### Change B. Footer copyright line, all four pages

Find: Copyright 2026 Ayo Strategic Consulting Group, LLC. All rights reserved.
Replace with: © 2026 Ayo Strategic Consulting Group, LLC. All rights reserved.

If the file already contains the © symbol and the word Copyright was only a display artifact, leave it as is.

### Change C. Footer product line, all four pages

Find: CAMI is a product of
Replace with: CAMIWORKS is a product of

Note: index.html already reads CAMIWORKS here. No change needed on that page.

### Change D. Navigation menu, all four pages

The current menu reads: Home, The Platform, How It Holds Up, Contact

Change it to read: Home, The Platform, How It Holds Up, Early Access, Contact

The Early Access item links to /early-access.html

## Page 1. index.html

### 1.1 Page title and og:title

Find: CAMIWORKS — Contract Administration Software for Government Contractors
Replace with: CAMIWORKS: Contract Administration Software for Government Contractors

This string appears in the title tag and in the og:title meta tag. Change both.

### 1.2 Eyebrow line above the headline

Find: CAMIWORKS · Contract Administration and Management Interface
Replace with: CAMIWORKS, the Contract Administration and Management Interface

### 1.3 Opening body paragraph

Find: Government contracts run on deadlines, funded dollars, deliverables, and documentation — and missing any one of them is expensive.
Replace with: Government contracts run on deadlines, funded dollars, deliverables, and documentation. Missing any one of them is expensive.

### 1.4 Funding and burn paragraph

Find: Burn thresholds at seventy, eighty, and ninety percent — with exhaustion projections — mean no one runs out of funded room without knowing it was coming.
Replace with: Burn thresholds at seventy, eighty, and ninety percent, with exhaustion projections, mean no one runs out of funded room without knowing it was coming.

### 1.5 Platform link text

Find: See everything CAMIWORKS does →
Replace with: See everything CAMIWORKS does

Remove the arrow character entirely. Do not replace it with any other symbol.

### 1.6 Who it is for paragraph

Find: Small and midsize government contractors — primes and subcontractors alike — who need a contract office's discipline without building a contract office.
Replace with: Small and midsize government contractors, primes and subcontractors alike, who need a contract office's discipline without building a contract office.

Note: the apostrophe in office's in the live file is a curly apostrophe. Match the existing character when searching.

### 1.7 Hero call to action

The hero currently has one button reading Start a conversation.

Add a second button before it reading: Join the early access list
Link it to /early-access.html

Make Join the early access list the primary styled button and Start a conversation the secondary styled button.

## Page 2. platform.html

### 2.1 Page title and og:title

Find: The Platform — CAMI Contract Administration Software
Replace with: The Platform: CAMIWORKS Contract Administration Software

Change both the title tag and the og:title meta tag.

### 2.2 Meta description

Find: The six capabilities of CAMI:
Replace with: The six capabilities of CAMIWORKS:

Change both the meta description and the og:description.

### 2.3 Page headline

Find: Everything CAMI does.
Replace with: Everything CAMIWORKS does.

### 2.4 Introduction paragraph

Find: Each one exists because a contract office has to do this work anyway — CAMI makes sure it gets done, gets documented, and stays on the record.
Replace with: Each one exists because a contract office has to do this work anyway. CAMIWORKS makes sure it gets done, gets documented, and stays on the record.

### 2.5 Funding and burn paragraph

Find: Burn thresholds at seventy, eighty, and ninety percent — with exhaustion projections — mean no one runs out of funded room without knowing it was coming.
Replace with: Burn thresholds at seventy, eighty, and ninety percent, with exhaustion projections, mean no one runs out of funded room without knowing it was coming.

### 2.6 Monthly status report paragraph

Find: Reviewed, signed, and delivered on schedule — the standing proof that the contract office is running.
Replace with: Reviewed, signed, and delivered on schedule. It is the standing proof that the contract office is running.

## Page 3. discipline.html

### 3.1 Page title and og:title

Find: How It Holds Up — CAMI Contract Administration Software
Replace with: How It Holds Up: CAMIWORKS Contract Administration Software

Change both the title tag and the og:title meta tag.

### 3.2 Meta description

Find: The disciplines behind CAMI:
Replace with: The disciplines behind CAMIWORKS:

Change both the meta description and the og:description.

### 3.3 Introduction paragraph

Find: Three principles run through everything CAMI does.
Replace with: Three principles run through everything CAMIWORKS does.

### 3.4 Archive, never delete paragraph, first sentence

Find: Records in CAMI are archived, never deleted.
Replace with: Records in CAMIWORKS are archived, never deleted.

### 3.5 Archive, never delete paragraph, second sentence

Find: but they do not disappear — the history of a contract stays whole.
Replace with: but they do not disappear. The history of a contract stays whole.

### 3.6 Judgment stays human paragraph, first sentence

Find: CAMI enforces that determinations, justifications, and sign-offs are made by people, on the record.
Replace with: CAMIWORKS enforces that determinations, justifications, and sign-offs are made by people, on the record.

### 3.7 Judgment stays human paragraph, second sentence

Find: The system assembles the file and will not let a required judgment be skipped — but it never makes the judgment itself.
Replace with: The system assembles the file and will not let a required judgment be skipped, but it never makes the judgment itself.

### 3.8 Judgment stays human paragraph, final sentence

Find: People make the calls; CAMI makes sure the calls are documented.
Replace with: People make the calls; CAMIWORKS makes sure the calls are documented.

## Page 4. contact.html

### 4.1 Page title and og:title

Find: Contact — CAMI Contract Administration Software
Replace with: Contact: CAMIWORKS Contract Administration Software

Change both the title tag and the og:title meta tag.

### 4.2 Meta description

Find: Reach Ayo Strategic Consulting Group at info@ayoscg.com.
Replace with: Reach Ayo Strategic Consulting Group at notifications@camiworks.com.

Change both the meta description and the og:description.

### 4.3 Email link text

Find: Email info@ayoscg.com
Replace with: Email notifications@camiworks.com

### 4.4 Email link destination

Find: mailto:info@ayoscg.com
Replace with: mailto:notifications@camiworks.com

### 4.5 Line below the email link

Find: No forms, no scheduling widgets — just email.
Replace with: Not ready for a conversation yet? Join the early access list and we will reach you as CAMIWORKS opens.

Link the words early access list to /early-access.html

## New file. early-access.html

Create a new file named early-access.html in the same folder as the other four pages. It will publish at camiworks.com/early-access.html

Build the page inside the existing site template so it carries the same header, navigation, footer, type, and color as the rest of the site. The standalone version supplied earlier is a reference for content and layout only. Do not paste it in as its own separate design.

Page content:

Headline: The early access list is open.

Supporting line: Leave your details and you will be first to know when CAMIWORKS opens, with priority scheduling for onboarding.

Form: name, email, company. The form code comes from Zoho CRM Webforms and will be supplied separately. Leave a clearly marked placeholder for it until then.

Three supporting points below the form:
First notice. You hear about CAMIWORKS access before it opens broadly.
Priority onboarding. Early access names move to the front of the onboarding schedule.
A voice in what gets built. Early access contractors help shape what CAMIWORKS builds next.

Do not use bullet characters, arrows, or icons anywhere on this page.

Page title and og:title: Early Access: CAMIWORKS Contract Administration Software

Meta description: Join the early access list for CAMIWORKS, contract administration software for government contractors.

## Verification before merge

Confirm no em dash character remains in any of the four existing pages or the new page.
Confirm the word CAMI does not appear anywhere in visible text, page titles, or meta tags. CAMI remains correct inside code, file names, and internal procedures.
Confirm the trademark symbol appears on the header wordmark of all five pages.
Confirm the copyright symbol appears in the footer of all five pages.
Confirm the Early Access navigation item appears on all five pages and resolves correctly.
Confirm camiworks.com/early-access.html loads on a phone, since most visitors will arrive by QR code.

## Changelog

Add a changelog entry when this pull request closes. Record the date, what changed, and why.

© 2026 Ayo Strategic Consulting Group, LLC. All rights reserved.
