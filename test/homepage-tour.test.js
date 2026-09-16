'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readSiteFile, siteFileExists, loadHomepage, text } = require('./helpers');

const COPY = {
  eyebrow: 'SEE IT IN ACTION',
  heading: 'A quick tour of CAMIWORKS™',
  supporting: 'See the contract file, clause inventory, funding, ethics registers, calendar review, and audit log in under ninety seconds.',
  button: 'Schedule your live demo',
  description: 'A silent product tour of CAMIWORKS, contract administration and management built for government contractors. Screens shown, in order: the contract file, where every award lives in one organized record; fifteen file sections from solicitation to closeout; an overview of compliance status, next dates, and funding; the clause inventory, where every FAR and DFARS clause is tracked with each flowdown decision recorded; cybersecurity clauses carried as compliance obligations; funding, showing funded, invoiced, paid, and burn for each contract; value and funding calculated from the CLINs; CLIN tracking for base and option years; ethics registers for disclosures, gifts, and acknowledgments; determination drift, showing where a contract departs from the knowledge base and why; calendar review, where past due items rise to the top; and a tamper resistant audit trail, filterable and ready to export. The tour closes with an invitation to schedule a live demo at camiworks.com.',
};

/* Origins index.html referenced before the tour section existed. The
   tour must not add to this set: the video is self hosted. */
const PRE_EXISTING_ORIGINS = new Set([
  'https://camiworks.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.ayoscg.com',
]);

test('the tour section sits directly below the hero', () => {
  const { document } = loadHomepage({ runScript: false });
  const hero = document.querySelector('main > section.hero');
  assert.ok(hero, 'hero section is present');
  const next = hero.nextElementSibling;
  assert.ok(next, 'something follows the hero');
  assert.ok(next.classList.contains('tour'), 'the section after the hero is the tour');
  assert.equal(next.getAttribute('aria-labelledby'), 'tour-heading');
});

test('the tour section carries the exact copy and nothing more', () => {
  const { document } = loadHomepage({ runScript: false });
  const section = document.querySelector('section.tour');
  assert.equal(text(section.querySelector('.eyebrow')), COPY.eyebrow);
  assert.equal(text(section.querySelector('#tour-heading')), COPY.heading);
  assert.equal(text(section.querySelector('.tour-sub')), COPY.supporting);

  // Everything visible in the section, in order, is exactly the four
  // pieces of copy; the description is the hidden text alternative.
  const visible = [...section.querySelectorAll('.eyebrow, h2, .tour-sub, a.button')].map(text);
  assert.deepEqual(visible, [COPY.eyebrow, COPY.heading, COPY.supporting, COPY.button]);
  const allText = text(section).replace(text(section.querySelector('#tour-video-description')), '').trim();
  assert.equal(allText, [COPY.eyebrow, COPY.heading, COPY.supporting, COPY.button].join(' '));
});

test('page copy contains no em dashes or en dashes', () => {
  const html = readSiteFile('index.html');
  const EM_DASH = String.fromCharCode(0x2014);
  const EN_DASH = String.fromCharCode(0x2013);
  assert.ok(!html.includes(EM_DASH), 'no em dash in index.html');
  assert.ok(!html.includes(EN_DASH), 'no en dash in index.html');
});

test('the video element has the required attributes and no controls', () => {
  const { video } = loadHomepage({ runScript: false });
  assert.ok(video, 'video.tour-video is present');
  for (const attr of ['autoplay', 'muted', 'loop', 'playsinline']) {
    assert.ok(video.hasAttribute(attr), `video has the ${attr} attribute`);
  }
  assert.equal(video.getAttribute('preload'), 'metadata');
  assert.ok(!video.hasAttribute('controls'), 'browser controls are not shown');
  assert.equal(video.getAttribute('src'), 'assets/tour/CAMIWORKS_Website_Loop.mp4');
  assert.equal(video.getAttribute('poster'), 'assets/tour/CAMIWORKS_Website_Loop_poster.jpg');
});

test('the video is described by a text alternative that exists and matches', () => {
  const { document, video } = loadHomepage({ runScript: false });
  const id = video.getAttribute('aria-describedby');
  assert.equal(id, 'tour-video-description');
  const description = document.getElementById(id);
  assert.ok(description, 'the described-by target exists');
  assert.equal(text(description), COPY.description);
  assert.ok(description.classList.contains('visually-hidden'));
});

test('the demo button uses an existing contact link, not an invented one', () => {
  const { document } = loadHomepage({ runScript: false });
  const buttons = document.querySelectorAll('section.tour a.button');
  assert.equal(buttons.length, 1, 'exactly one button in the tour section');
  const button = buttons[0];
  assert.equal(text(button), COPY.button);
  const href = button.getAttribute('href');
  assert.equal(href, 'contact.html');
  assert.ok(siteFileExists(href), `${href} exists in the site`);
  // The same target was already the hero's contact call to action.
  assert.ok(document.querySelector(`section.hero a[href="${href}"]`), 'the hero already links to this target');
});

test('the tour frame reserves a 16 by 9 space and the toggle is hidden without JavaScript', () => {
  const { document, toggle } = loadHomepage({ runScript: false });
  const css = readSiteFile('styles.css');
  assert.ok(document.querySelector('.tour-frame > video.tour-video'));
  assert.match(css, /\.tour-frame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /\.tour-frame\s*\{[^}]*max-width:\s*1920px/);
  assert.match(css, /\.tour-frame\s*\{[^}]*CAMIWORKS_Website_Loop_poster\.jpg/);
  assert.ok(toggle.hasAttribute('hidden'), 'toggle is hidden until the script enables it');
  assert.match(css, /\.tour-toggle\[hidden\]\s*\{\s*display:\s*none/);
  assert.match(css, /\.tour-toggle\s*\{[^}]*width:\s*44px/);
  assert.match(css, /\.tour-toggle\s*\{[^}]*height:\s*44px/);
});

test('no third party origin, player, or policy change was introduced', () => {
  const { document } = loadHomepage({ runScript: false });
  const html = readSiteFile('index.html');
  const js = readSiteFile('tour-video.js');

  assert.equal(document.querySelector('meta[http-equiv="Content-Security-Policy" i]'), null,
    'the site sets no Content Security Policy in markup; none was added');
  assert.equal(document.querySelectorAll('iframe, embed, object').length, 0, 'no embedded player');
  assert.equal(document.querySelectorAll('section.tour script').length, 0);

  const origins = new Set(
    [...html.matchAll(/https?:\/\/[^\s"'<>)]+/g)].map((m) => new URL(m[0]).origin),
  );
  assert.deepEqual(origins, PRE_EXISTING_ORIGINS, 'index.html references only its pre-existing origins');

  for (const el of document.querySelectorAll('section.tour [src], section.tour [poster], section.tour [href]')) {
    for (const attr of ['src', 'poster', 'href']) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        assert.ok(!/^(https?:)?\/\//i.test(value), `${attr}="${value}" is a same-origin relative path`);
      }
    }
  }

  assert.ok(!/https?:\/\//.test(js), 'tour-video.js references no URL');
  assert.ok(!/\b(fetch|XMLHttpRequest|sendBeacon|WebSocket)\b/.test(js), 'tour-video.js makes no network calls');
  assert.ok(html.includes('<script src="tour-video.js"></script>'), 'the home page loads tour-video.js');
});
