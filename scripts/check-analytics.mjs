import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';

const source = await readFile('public/site-analytics.js', 'utf8');
const id = '11111111-1111-4111-8111-111111111111';
function load(href, websiteId = id) {
  const scripts = [];
  const window = {};
  const location = new URL(href);
  runInNewContext(source, {
    URL, URLSearchParams, window, location,
    document: {
      currentScript: { dataset: { websiteId } },
      createElement: () => ({ dataset: {} }),
      head: { appendChild: (script) => scripts.push(script) },
    },
  });
  return { scripts, window, location };
}
for (const href of ['http://localhost:2000/', 'https://preview.example/',
  'https://mcheyser.com/intake/denver-zen-den', 'https://mcheyser.com/?review=1']) {
  assert.equal(load(href).scripts.length, 0, href);
}
assert.equal(load('https://mcheyser.com/', '').scripts.length, 0);
const { scripts, window, location } = load('https://mcheyser.com/cases/connected-manufacturing/');
assert.equal(scripts.length, 1);
assert.equal(scripts[0].src, 'https://cloud.umami.is/script.js');
assert.equal(scripts[0].dataset.websiteId, id);
assert.equal(scripts[0].dataset.doNotTrack, 'true');
const filter = window.mcheyserBeforeAnalytics;
const clean = filter('event', {
  url: '/work?email=private@example.com&utm_source=card&utm_medium=qr#private',
  referrer: 'https://example.com/post?token=private#fragment',
});
assert.equal(clean.url, 'https://mcheyser.com/work?utm_source=card&utm_medium=qr');
assert.equal(clean.referrer, 'https://example.com/post');
assert.equal(filter('event', { url: '/intake/denver-zen-den' }), false);
assert.equal(filter('event', { url: '/?review=1' }), false);
assert.equal(filter('identify', { url: '/' }), false);
location.href = 'https://mcheyser.com/intake/denver-zen-den';
assert.equal(filter('event', { url: '/' }), false, 'Private SPA navigation stays excluded');

const directory = await mkdtemp(join(tmpdir(), 'mcheyser-analytics-'));
const builder = resolve('scripts/build-analytics.mjs');
try {
  const routes = ['index.html', 'blog/index.html', 'cases/connected-manufacturing/index.html',
    'intake/denver-zen-den/index.html', 'stoppromptingstartshipping/index.html'];
  const original = '<html><head></head><body>Page</body></html>';
  for (const path of routes) {
    const file = join(directory, 'dist', path);
    await mkdir(resolve(file, '..'), { recursive: true });
    await writeFile(file, original);
  }
  const build = (value) => spawnSync(process.execPath, [builder], {
    cwd: directory, env: { ...process.env, UMAMI_WEBSITE_ID: value }, encoding: 'utf8',
  });
  assert.equal(build('').status, 0);
  assert.equal(await readFile(join(directory, 'dist/index.html'), 'utf8'), original);
  assert.notEqual(build('not-a-website-id').status, 0);
  assert.equal(build(id).status, 0);
  assert.equal(build(id).status, 0, 'Repeated build does not add duplicate trackers');
  for (const path of routes) {
    const html = await readFile(join(directory, 'dist', path), 'utf8');
    const count = (html.match(/src="\/site-analytics.js"/g) || []).length;
    assert.equal(count, /^(intake|stoppromptingstartshipping)\//.test(path) ? 0 : 1, path);
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}
console.log('Analytics checks passed: public routes, campaign tags, private-page exclusions, and disabled setup.');
