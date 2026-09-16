'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { loadHomepage, readSiteFile } = require('./helpers');

const PAUSE = 'Pause tour video';
const PLAY = 'Play tour video';

test('the script reveals the toggle as a real, keyboard operable button', () => {
  const { toggle } = loadHomepage();
  assert.equal(toggle.tagName, 'BUTTON');
  assert.equal(toggle.getAttribute('type'), 'button');
  assert.ok(!toggle.hasAttribute('hidden'), 'toggle is visible once the script runs');
  assert.ok(!toggle.hasAttribute('tabindex'), 'native button keeps its place in the tab order');
  assert.equal(toggle.querySelectorAll('svg[aria-hidden="true"]').length, 2, 'icons are decorative');
});

test('the toggle pauses and plays the video and renames itself with the state', () => {
  const { video, toggle } = loadHomepage();
  assert.equal(video.paused, false, 'video is playing (autoplay)');
  assert.equal(toggle.getAttribute('aria-label'), PAUSE);
  assert.ok(!toggle.classList.contains('is-paused'));

  toggle.click();
  assert.equal(video.paused, true, 'first activation pauses');
  assert.equal(toggle.getAttribute('aria-label'), PLAY);
  assert.ok(toggle.classList.contains('is-paused'));

  toggle.click();
  assert.equal(video.paused, false, 'second activation plays');
  assert.equal(toggle.getAttribute('aria-label'), PAUSE);
  assert.ok(!toggle.classList.contains('is-paused'));
});

test('the toggle reflects state changes that come from the video itself', () => {
  const { video, toggle } = loadHomepage();
  video.pause();
  assert.equal(toggle.getAttribute('aria-label'), PLAY);
  video.play();
  assert.equal(toggle.getAttribute('aria-label'), PAUSE);
});

test('with reduced motion preferred the video does not autoplay', () => {
  // The browser may have started playback before the script ran.
  const { video, toggle } = loadHomepage({ reducedMotion: true, simulateAutoplay: true });
  assert.equal(video.paused, true, 'video is paused');
  assert.ok(!video.hasAttribute('autoplay'), 'autoplay attribute removed');
  assert.equal(video.autoplay, false);
  assert.equal(video.getAttribute('poster'), 'assets/tour/CAMIWORKS_Website_Loop_poster.jpg', 'poster stays');
  assert.ok(!toggle.hasAttribute('hidden'), 'toggle is offered');
  assert.equal(toggle.getAttribute('aria-label'), PLAY, 'toggle is in the play state');
});

test('with reduced motion preferred the visitor can still start the video, and scrolling never starts it', () => {
  const { video, toggle, observer } = loadHomepage({ reducedMotion: true });
  observer.trigger(true);
  assert.equal(video.paused, true, 'coming into view does not start it');
  toggle.click();
  assert.equal(video.paused, false, 'the visitor can play it');
  assert.equal(toggle.getAttribute('aria-label'), PAUSE);
  observer.trigger(false);
  assert.equal(video.paused, true, 'leaving view pauses it');
  observer.trigger(true);
  assert.equal(video.paused, true, 'returning to view does not restart it on the visitor\'s behalf');
});

test('the video pauses when scrolled out of view and resumes when it returns', () => {
  const { video, observer } = loadHomepage();
  assert.deepEqual(observer.observed, [video], 'the video is observed');
  assert.equal(observer.options.threshold, 0, 'fully out of view means not intersecting at all');
  assert.equal(video.paused, false);
  observer.trigger(false);
  assert.equal(video.paused, true, 'paused offscreen');
  observer.trigger(true);
  assert.equal(video.paused, false, 'resumed onscreen');
});

test('a video that starts playing while already out of view is paused, unless the visitor asked for it', () => {
  // Below the fold on load: the observer reports "not in view" before
  // the browser's autoplay gets going.
  const { video, toggle, observer } = loadHomepage({ simulateAutoplay: false });
  observer.trigger(false);
  assert.equal(video.paused, true);
  video.play(); // the browser's autoplay kicking in
  assert.equal(video.paused, true, 'offscreen autoplay is stopped');
  assert.equal(toggle.getAttribute('aria-label'), PLAY);
  observer.trigger(true);
  assert.equal(video.paused, false, 'it plays once scrolled into view');

  video.pause();
  observer.trigger(false);
  toggle.click(); // a keyboard user activating the control while it is out of view
  assert.equal(video.paused, false, 'the visitor\'s own play request is honoured');
});

test('a video the visitor paused stays paused when it scrolls back into view', () => {
  const { video, toggle, observer } = loadHomepage();
  toggle.click();
  assert.equal(video.paused, true);
  observer.trigger(false);
  observer.trigger(true);
  assert.equal(video.paused, true, 'manual pause is respected');
  assert.equal(toggle.getAttribute('aria-label'), PLAY);
  toggle.click();
  assert.equal(video.paused, false, 'the visitor can resume');
  observer.trigger(false);
  observer.trigger(true);
  assert.equal(video.paused, false, 'offscreen pausing resumes again after the visitor pressed play');
});

test('a load failure that happened before the script ran is still handled', () => {
  const { window, video, toggle } = loadHomepage({ runScript: false, simulateAutoplay: false });
  Object.defineProperty(video, 'error', { configurable: true, value: { code: 4 } });
  window.eval(readSiteFile('tour-video.js'));
  assert.ok(video.classList.contains('is-failed'));
  assert.ok(toggle.hasAttribute('hidden'));
});

test('if the video fails to load the poster remains and the toggle is withdrawn', () => {
  const { window, video, toggle, observer } = loadHomepage();
  video.dispatchEvent(new window.Event('error'));
  assert.ok(video.classList.contains('is-failed'));
  assert.equal(video.getAttribute('poster'), 'assets/tour/CAMIWORKS_Website_Loop_poster.jpg');
  assert.ok(toggle.hasAttribute('hidden'), 'no control for a video that cannot play');
  video.pause();
  observer.trigger(true);
  assert.equal(video.paused, true, 'no attempt to resume a failed video');
});
