'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT } = require('./helpers');

const VIDEO = 'assets/tour/CAMIWORKS_Website_Loop.mp4';
const POSTER = 'assets/tour/CAMIWORKS_Website_Loop_poster.jpg';

function head(relativePath, bytes) {
  const fd = fs.openSync(path.join(ROOT, relativePath), 'r');
  try {
    const buffer = Buffer.alloc(bytes);
    const read = fs.readSync(fd, buffer, 0, bytes, 0);
    return buffer.subarray(0, read);
  } finally {
    fs.closeSync(fd);
  }
}

test('the tour video is present at the path the home page references', () => {
  assert.ok(fs.existsSync(path.join(ROOT, VIDEO)), `${VIDEO} is in the repository`);
  // An MP4 (ISO base media file) opens with an ftyp box.
  assert.equal(head(VIDEO, 8).subarray(4, 8).toString('ascii'), 'ftyp', `${VIDEO} is an MP4 container`);
});

test('the poster image is present at the path the home page references', () => {
  assert.ok(fs.existsSync(path.join(ROOT, POSTER)), `${POSTER} is in the repository`);
  assert.deepEqual([...head(POSTER, 3)], [0xff, 0xd8, 0xff], `${POSTER} is a JPEG`);
});
