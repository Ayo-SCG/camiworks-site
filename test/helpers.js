'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

function readSiteFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function siteFileExists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

/* Loads index.html into jsdom. jsdom has no media playback, no
   matchMedia, and no IntersectionObserver, so the parts the tour
   script depends on are stood in for here:
   - HTMLMediaElement.play/pause/paused keep a real paused state and
     fire play/pause events, the way a browser does;
   - matchMedia answers the reduced motion query from the option;
   - IntersectionObserver records the observed element and exposes
     a trigger so a test can scroll the video in or out of view.
   With simulateAutoplay the video is already playing when the tour
   script runs, as it would be in a browser honouring autoplay. */
function loadHomepage(options = {}) {
  const {
    reducedMotion = false,
    runScript = true,
    simulateAutoplay = !reducedMotion,
  } = options;

  const dom = new JSDOM(readSiteFile('index.html'), {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  const { window } = dom;
  const { document } = window;

  const playing = new WeakSet();
  Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
    configurable: true,
    get() { return !playing.has(this); },
  });
  window.HTMLMediaElement.prototype.play = function play() {
    if (this.paused) {
      playing.add(this);
      this.dispatchEvent(new window.Event('play'));
    }
    return Promise.resolve();
  };
  window.HTMLMediaElement.prototype.pause = function pause() {
    if (!this.paused) {
      playing.delete(this);
      this.dispatchEvent(new window.Event('pause'));
    }
  };

  window.matchMedia = (query) => ({
    media: query,
    matches: reducedMotion && /prefers-reduced-motion:\s*reduce/.test(query),
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });

  const observer = { callback: null, observed: [], options: null };
  window.IntersectionObserver = class {
    constructor(callback, opts) {
      observer.callback = callback;
      observer.options = opts;
    }
    observe(el) { observer.observed.push(el); }
    unobserve() {}
    disconnect() {}
  };
  observer.trigger = (isIntersecting) => {
    const entries = observer.observed.map((target) => ({ target, isIntersecting }));
    observer.callback(entries);
  };

  const video = document.querySelector('.tour-video');
  if (simulateAutoplay && video && video.hasAttribute('autoplay')) {
    video.play();
  }

  if (runScript) {
    window.eval(readSiteFile('tour-video.js'));
  }

  return {
    dom,
    window,
    document,
    video,
    toggle: document.querySelector('.tour-toggle'),
    observer,
  };
}

function text(el) {
  return el.textContent.replace(/\s+/g, ' ').trim();
}

module.exports = { ROOT, readSiteFile, siteFileExists, loadHomepage, text };
