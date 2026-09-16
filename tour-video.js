/* camiworks.com: behaviour for the home page product tour video.
   The video plays on its own through its HTML attributes (autoplay,
   muted, loop, playsinline); this script adds what attributes cannot:
   a pause and play toggle, respect for the visitor's reduced motion
   setting, pausing while the video is scrolled out of view, and the
   poster fallback if the file fails to load. Nothing here talks to
   the network or to any third party. */

(function () {
  'use strict';

  var video = document.querySelector('.tour-video');
  var toggle = document.querySelector('.tour-toggle');
  if (!video || !toggle) { return; }

  var PAUSE_LABEL = 'Pause tour video';
  var PLAY_LABEL = 'Play tour video';

  var reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // True once the visitor has pressed pause. Scrolling the video back
  // into view must not override that choice.
  var pausedByVisitor = false;
  // True between the visitor pressing play and playback starting, so a
  // play they asked for is never treated as an offscreen autoplay.
  var playRequested = false;
  // Last word from the observer. Assumed visible until it reports.
  var inView = true;
  var failed = false;

  function reflectState() {
    var paused = video.paused;
    toggle.setAttribute('aria-label', paused ? PLAY_LABEL : PAUSE_LABEL);
    if (paused) {
      toggle.classList.add('is-paused');
    } else {
      toggle.classList.remove('is-paused');
    }
  }

  function tryPlay() {
    var result = video.play();
    if (result && typeof result.catch === 'function') {
      // Autoplay policies or a failed load can reject; the toggle
      // simply reflects the real state.
      result.catch(function () {
        playRequested = false;
        reflectState();
      });
    }
  }

  function markFailed() {
    failed = true;
    video.classList.add('is-failed');
    toggle.hidden = true;
  }

  // Reduced motion: never start the video on the visitor's behalf.
  // The poster stays up with the toggle in the play state.
  if (reduceMotion) {
    video.removeAttribute('autoplay');
    video.autoplay = false;
    video.pause();
  }

  // The toggle is hidden in the markup so it never appears without
  // the behaviour behind it.
  toggle.hidden = false;

  toggle.addEventListener('click', function () {
    if (video.paused) {
      pausedByVisitor = false;
      playRequested = true;
      tryPlay();
    } else {
      pausedByVisitor = true;
      video.pause();
    }
    // paused changes at once; the play and pause events follow later.
    reflectState();
  });

  video.addEventListener('play', function () {
    reflectState();
    // Autoplay can begin after the video has already been scrolled out
    // of view (the observer only reports crossings). Pause it then,
    // unless the visitor asked for it.
    if (!inView && !playRequested) {
      video.pause();
    }
    playRequested = false;
  });
  video.addEventListener('pause', reflectState);

  video.addEventListener('error', markFailed);
  // A missing file can fail before this script runs.
  if (video.error) {
    markFailed();
  }

  // Pause when fully out of view; resume when back, unless the visitor
  // paused it or has asked for reduced motion.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i += 1) {
        inView = entries[i].isIntersecting;
        if (inView) {
          if (!pausedByVisitor && !reduceMotion && !failed && video.paused) {
            tryPlay();
          }
        } else if (!video.paused) {
          video.pause();
        }
      }
    }, { threshold: 0 });
    observer.observe(video);
  }

  reflectState();
})();
