/**
 * Checks the production build the way a visitor would see it:
 * proof slots hidden without the review flag, the /apply redirect, page titles,
 * the dev-only routes absent, and no console errors.
 *
 * Usage: npm run build && node scripts/check-production.mjs
 * Env: PORT (default 2001), PLAYWRIGHT_PATH, BASE_URL (use a preview server that is already running).
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const PORT = Number(process.env.PORT || 2001);
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;

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
  throw new Error(`Server at ${url} did not start`);
}

let server = null;
if (!process.env.BASE_URL) {
  server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  server.stderr.on('data', (chunk) => process.stderr.write(chunk));
}

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

try {
  await waitForServer(`${BASE}/`);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const failedRequests = [];
  page.on('requestfailed', (request) => failedRequests.push(request.url()));

  const expectedTitles = {
    '/': 'Patrick McHeyser | Operations and technology consulting',
    '/working-together': 'Working Together | Patrick McHeyser',
    '/about': 'About Patrick McHeyser',
    '/contact': "Let's Talk | Patrick McHeyser",
  };

  for (const [route, title] of Object.entries(expectedTitles)) {
    await page.goto(`${BASE}/#${route}`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    expect((await page.title()) === title, `${route}: title is "${await page.title()}", expected "${title}"`);
    const slots = await page.locator('.proof-slot').count();
    expect(slots === 0, `${route}: ${slots} proof slot(s) visible without the review flag`);
    const h1s = await page.locator('h1').count();
    expect(h1s === 1, `${route}: ${h1s} h1 elements`);
  }

  await page.goto(`${BASE}/#/?review=1`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect((await page.locator('.proof-slot').count()) > 0, 'review flag does not show proof slots');

  await page.goto(`${BASE}/#/apply`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect(page.url().endsWith('#/contact'), `/apply did not redirect to /contact (got ${page.url()})`);

  await page.goto(`${BASE}/#/style`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect(page.url().endsWith('#/'), `/style should not exist in production (got ${page.url()})`);

  await page.goto(`${BASE}/#/contact`, { waitUntil: 'load' });
  await page.locator('#contact-email').fill('not-an-email');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(200);
  const errors = await page.locator('.field__error').allTextContents();
  expect(errors.includes('Please enter your name.'), 'missing name validation message');
  expect(errors.includes('Please enter a valid email address.'), 'missing email validation message');
  expect(errors.includes('Please enter your company name.'), 'missing company validation message');
  expect(
    errors.includes("Please tell me a little about what you'd like to improve."),
    'missing challenge validation message'
  );
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused === 'contact-name', `focus should move to the first invalid field, got ${focused}`);

  // A font host that is unreachable from the machine running the check is not a site defect.
  const fontHost = /fonts\.(googleapis|gstatic)\.com/;
  const onlyFontFailures = failedRequests.length > 0 && failedRequests.every((url) => fontHost.test(url));
  const bundleErrors = consoleErrors.filter(
    (text) => !(onlyFontFailures && text.startsWith('Failed to load resource'))
  );
  expect(bundleErrors.length === 0, `console errors: ${bundleErrors.join(' | ')}`);

  await browser.close();
} finally {
  server?.kill();
}

if (failures.length) {
  console.log('Production check failed:');
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Production check passed: titles, hidden proof slots, redirect, no dev routes, validation, no console errors.');
}
