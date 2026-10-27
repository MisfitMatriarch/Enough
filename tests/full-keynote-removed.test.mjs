import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { internalDirectories } from '../scripts/build-expo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const retired = ['/speaking/from-support-to-sovereignty/', '/sovereignty/transcript/'];

test('owner-retired full keynote and transcript cannot return to public pages', () => {
  for (const route of retired) {
    assert.equal(existsSync(resolve(root, `.${route}index.html`)), false, route);
  }
  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || internalDirectories.includes(entry.name)) continue;
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(html|xml)$/.test(entry.name)) {
        const source = readFileSync(full, 'utf8');
        for (const route of retired) assert.ok(!source.includes(route), `${full}: retired reference ${route}`);
        assert.ok(!source.includes('1wy2gih7ndVrT17OjfPMiKM9MBaJPVPRr'), `${full}: retired Drive embed`);
      }
    }
  };
  walk(root);
  const redirects = readFileSync(resolve(root, '_redirects'), 'utf8');
  for (const route of retired) {
    assert.ok(redirects.split('\n').some(line => {
      const [from, to, status] = line.trim().split(/\s+/);
      return from === `${route}*` && to === '/speaking/' && status === '301!';
    }), `${route}: preserve old bookmarks without serving the keynote`);
  }
  for (const [page, clip] of [['index.html', 'all-of-this-is-me.mp4'], ['about/index.html', 'acceptance-story.mp4'], ['speaking/index.html', 'speaking-reel.mp4']]) {
    assert.ok(readFileSync(resolve(root, page), 'utf8').includes(`/assets/video/${clip}`), `${page}: keep the existing short film`);
  }
});
