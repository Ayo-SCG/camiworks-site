'use strict';

/* Checks the server that actually serves the site. camiworks.com is
   GitHub Pages, which has no configuration in this repository, so the
   only way to verify range support, content types, and cache headers
   is to ask the deployed site. Set SITE_URL to run these, for example:

     SITE_URL=https://camiworks.com npm test

   Without SITE_URL they are skipped, not passed. */

const test = require('node:test');
const assert = require('node:assert/strict');

const base = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/+$/, '') : null;
const skip = base ? false : 'set SITE_URL (for example https://camiworks.com) to check the deployed server';

const VIDEO = '/assets/tour/CAMIWORKS_Website_Loop.mp4';
const POSTER = '/assets/tour/CAMIWORKS_Website_Loop_poster.jpg';
const EXISTING_ASSET = '/assets/og-image.png';

async function getRange(url) {
  const response = await fetch(url, { headers: { Range: 'bytes=0-1' } });
  const body = await response.arrayBuffer();
  return { response, body };
}

test('the MP4 answers a range request with 206, Accept-Ranges: bytes, and video/mp4', { skip }, async () => {
  const { response, body } = await getRange(base + VIDEO);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get('accept-ranges'), 'bytes');
  assert.match(response.headers.get('content-type') || '', /^video\/mp4\b/);
  assert.match(response.headers.get('content-range') || '', /^bytes 0-1\//);
  assert.equal(body.byteLength, 2);
});

test('the poster is served as image/jpeg', { skip }, async () => {
  const response = await fetch(base + POSTER, { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /^image\/jpeg\b/);
});

test('both files carry the same cache header as the site\'s other static assets', { skip }, async () => {
  const reference = await fetch(base + EXISTING_ASSET, { method: 'HEAD' });
  const referenceCache = reference.headers.get('cache-control');
  assert.ok(referenceCache, 'the existing asset has a cache-control header');
  for (const file of [VIDEO, POSTER]) {
    const response = await fetch(base + file, { method: 'HEAD' });
    assert.equal(response.headers.get('cache-control'), referenceCache, `${file} is cached like ${EXISTING_ASSET}`);
  }
});
