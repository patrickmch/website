/**
 * Full-page screenshots of every route at desktop and mobile widths, with
 * review mode on, plus the social preview image. Also reports horizontal
 * overflow and console errors.
 *
 * Usage:
 *   node scripts/screenshots.mjs                 # starts a dev server, includes /style, writes public/og.png
 *   MODE=preview node scripts/screenshots.mjs    # starts vite preview on the production build
 *   BASE_URL=http://127.0.0.1:2000 node scripts/screenshots.mjs   # uses a server that is already running
 *
 * Env: OUT (output dir, default ./screenshots), PORT (default 2000),
 *      PLAYWRIGHT_PATH (path to a playwright install if not in node_modules),
 *      OG=0 to skip the social preview image, TILES=1 to also write 1400px-tall
 *      page tiles under OUT/tiles (for reviewers that downscale tall images),
 *      REVIEW=0 to screenshot the public composition (proof slots hidden), for
 *      example `OUT=screenshots/public REVIEW=0 npm run screenshots`,
 *      OVERFLOW_WIDTHS (default 360,768,1024): extra widths that get the
 *      horizontal-overflow check without a screenshot.
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const PORT = Number(process.env.PORT || 2000);
const OUT = process.env.OUT || 'screenshots';
const MODE = process.env.MODE || 'dev';
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;
const WRITE_OG = MODE === 'dev' && process.env.OG !== '0';
const TILES = process.env.TILES === '1';
const REVIEW = process.env.REVIEW === '0' ? '0' : '1';
const OVERFLOW_WIDTHS = (process.env.OVERFLOW_WIDTHS || '360,768,1024')
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => value > 0);

/** The URL for a route with the review flag set. One place to change if the router changes. */
function pageUrl(route, review = REVIEW) {
  return `${BASE}${route}?review=${review}`;
}

const routes = [
  ['home', '/'],
  ['working-together', '/working-together'],
  ['work', '/work'],
  ['mtro-pro', '/work/mtro-pro'],
  ['manufacturing', '/work/manufacturing-systems'],
  ['healthcare', '/work/shared-context'],
  ['psyche', '/work/psyche-digital'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['intake', '/intake/denver-zen-den'],
  ...(MODE === 'dev' ? [['style', '/style']] : []),
];

const widths = [
  [1440, 'desktop'],
  [390, 'mobile'],
];

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

async function settle(page) {
  await Promise.race([
    page.evaluate(() => document.fonts.ready),
    new Promise((resolve) => setTimeout(resolve, 8000)),
  ]);
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

let server = null;
if (!process.env.BASE_URL) {
  const viteArgs =
    MODE === 'dev'
      ? ['vite', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1']
      : ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'];
  server = spawn('npx', viteArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', () => undefined);
  server.stderr.on('data', (chunk) => process.stderr.write(chunk));
}

const problems = [];

try {
  await waitForServer(`${BASE}/`);
  await mkdir(path.join(OUT, 'tiles'), { recursive: true });
  const browser = await chromium.launch();

  for (const [width, label] of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') {
        problems.push(`${label} console ${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => problems.push(`${label} pageerror: ${error.message}`));
    page.on('requestfailed', (request) => {
      problems.push(`${label} request failed: ${request.url()} (${request.failure()?.errorText})`);
    });

    for (const [name, route] of routes) {
      await page.goto(pageUrl(route), { waitUntil: 'load', timeout: 30000 });
      await settle(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      if (overflow > 0) problems.push(`${name} at ${width}px: horizontal overflow of ${overflow}px`);
      const file = path.join(OUT, `${name}-${label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`wrote ${file}`);

      if (TILES) {
        const total = await page.evaluate(() => document.documentElement.scrollHeight);
        const tileHeight = 1400;
        let index = 0;
        for (let y = 0; y < total; y += tileHeight) {
          index += 1;
          const height = Math.min(tileHeight, total - y);
          const tile = path.join(OUT, 'tiles', `${name}-${label}-${String(index).padStart(2, '0')}.png`);
          await page.screenshot({ path: tile, fullPage: true, clip: { x: 0, y, width, height } });
        }
        console.log(`  ${index} tiles`);
      }
    }
    await context.close();
  }

  // Overflow-only pass at the spec's other breakpoints (section 9), no screenshots.
  for (const width of OVERFLOW_WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();
    for (const [name, route] of routes) {
      await page.goto(pageUrl(route), { waitUntil: 'load', timeout: 30000 });
      await settle(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      if (overflow > 0) problems.push(`${name} at ${width}px: horizontal overflow of ${overflow}px`);
    }
    await context.close();
    console.log(`overflow check at ${width}px done`);
  }

  if (WRITE_OG) {
    const context = await browser.newContext({
      viewport: { width: 1300, height: 800 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();
    await page.goto(`${BASE}/og`, { waitUntil: 'load', timeout: 30000 });
    await Promise.race([
      page.evaluate(() => document.fonts.ready),
      new Promise((resolve) => setTimeout(resolve, 8000)),
    ]);
    await page.waitForTimeout(300);
    await page.locator('#og').screenshot({ path: 'public/og.png' });
    console.log('wrote public/og.png');
    await context.close();
  }

  await browser.close();
} finally {
  server?.kill();
}

if (problems.length) {
  console.log('\nProblems:');
  for (const problem of problems) console.log(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(
    `\nNo horizontal overflow at ${[...widths.map(([w]) => w), ...OVERFLOW_WIDTHS].join(', ')}px, no failed requests, and no console errors or warnings.`
  );
}
