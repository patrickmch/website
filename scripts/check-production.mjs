/**
 * Checks the production build the way a visitor would see it: titles and
 * per-route metadata at real paths, old #/ links still landing, proof slots
 * hidden without the review flag, the dev-only routes absent, validation,
 * focus management, the contact form's success and failure paths (the mail
 * provider is mocked, nothing is sent), diagram geometry, hit areas, contrast
 * tokens, transfer size, and no console errors.
 *
 * Usage: npm run check (builds with placeholder EmailJS keys so the form's
 * network paths can be exercised against a mocked provider), or
 * npm run build && node scripts/check-production.mjs on a build without keys,
 * which skips the provider-call assertions and says so.
 * Env: PORT (default 2001), PLAYWRIGHT_PATH, BASE_URL (use a preview server that is already running).
 */
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const PORT = Number(process.env.PORT || 2001);
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;
const SITE = 'https://mcheyser.com';
const EMAILJS = '**/api.emailjs.com/**';

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
const notes = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};
const url = (path) => `${BASE}${path}`;
/** Text of the first match, or null. Never waits. */
const text = (page, selector) => page.evaluate((sel) => document.querySelector(sel)?.textContent?.trim() ?? null, selector);
const settle = async (page) => {
  await Promise.race([page.evaluate(() => document.fonts.ready), new Promise((r) => setTimeout(r, 8000))]);
  await page.waitForTimeout(250);
};
const fillValid = async (page) => {
  await page.locator('#contact-name').fill('Production check');
  await page.locator('#contact-email').fill('check@example.com');
  await page.locator('#contact-company').fill('Example Co');
  await page.locator('#contact-challenge').fill('A test note from scripts/check-production.mjs. Nothing is sent.');
};

try {
  await waitForServer(`${BASE}/`);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    // A resource the script made fail on purpose (the mocked provider, or an unreachable font host) is not a defect.
    const from = message.location()?.url || '';
    if (message.text().startsWith('Failed to load resource') && /fonts\.(googleapis|gstatic)\.com|api\.emailjs\.com/.test(from)) return;
    consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const failedRequests = [];
  page.on('requestfailed', (request) => failedRequests.push(request.url()));

  /* ---------- Routes, titles, per-route metadata (real paths) ---------- */
  const expectedTitles = {
    '/': 'Patrick McHeyser | Operations and technology consulting',
    '/working-together': 'Working Together | Patrick McHeyser',
    '/work': 'Client Work | Patrick McHeyser',
    '/work/mtro-pro': 'MTRO PRO: Customer Support, Engineering and QA | Patrick McHeyser',
    '/work/manufacturing-systems': 'Manufacturing: Technical Leadership and Delivery | Patrick McHeyser',
    '/work/shared-context': 'Healthcare: Shared Context and AI Workflows | Patrick McHeyser',
    '/work/psyche-digital': 'Psyche Digital: AI in Client Delivery | Patrick McHeyser',
    '/about': 'About Patrick McHeyser',
    '/contact': "Let's Talk | Patrick McHeyser",
  };

  for (const [route, title] of Object.entries(expectedTitles)) {
    await page.goto(url(route), { waitUntil: 'load' });
    await page.locator('main h1').first().waitFor(); // the Client Work pages load in their own chunk
    await page.waitForFunction((t) => document.title === t, title, { timeout: 3000 }).catch(() => {});
    expect(new URL(page.url()).pathname === route, `${route}: landed on ${page.url()}, expected the real path`);
    expect((await page.title()) === title, `${route}: title is "${await page.title()}", expected "${title}"`);
    const meta = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    }));
    expect(meta.canonical === `${SITE}${route}`, `${route}: canonical is ${meta.canonical}`);
    expect(meta.ogUrl === `${SITE}${route}`, `${route}: og:url is ${meta.ogUrl}`);
    expect(meta.ogTitle === title, `${route}: og:title is ${meta.ogTitle}`);
    expect(meta.ogDescription === meta.description, `${route}: og:description differs from the description`);
    const slots = await page.locator('.proof-slot').count();
    expect(slots === 0, `${route}: ${slots} proof slot(s) visible without the review flag`);
    const h1s = await page.locator('h1').count();
    expect(h1s === 1, `${route}: ${h1s} h1 elements`);
    const skipped = await page.evaluate(() => {
      let previous = 0;
      const bad = [];
      for (const h of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
        const level = Number(h.tagName[1]);
        if (level > previous + 1) bad.push(`${h.tagName} "${h.textContent?.trim().slice(0, 40)}" after h${previous}`);
        previous = level;
      }
      return bad;
    });
    expect(skipped.length === 0, `${route}: heading levels skip: ${skipped.join('; ')}`);
  }

  await page.goto(url('/?review=1'), { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect((await page.locator('.proof-slot').count()) > 0, 'review flag does not show proof slots');
  // The testimonial slot under "You'll work directly with me" sits below the whole row, full width.
  const personSlot = await page.evaluate(() => ({
    insideText: !!document.querySelector('.person__text .proof-slot'),
    belowRow: !!document.querySelector('.person + .proof-slot'),
  }));
  expect(!personSlot.insideText && personSlot.belowRow, 'person testimonial slot should sit below the row, not inside the text column');

  // The review flag survives following a link, and ?review=0 switches it off.
  await page.locator('.site-nav__link', { hasText: 'About' }).click();
  await page.waitForTimeout(400);
  expect((await page.locator('.proof-slot').count()) > 0, 'review mode should stay on after following a link');
  await page.goto(url('/about?review=0'), { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect((await page.locator('.proof-slot').count()) === 0, '?review=0 should switch review mode off');

  await page.goto(url('/apply'), { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect(new URL(page.url()).pathname === '/contact', `/apply did not redirect to /contact (got ${page.url()})`);
  expect((await page.evaluate(() => document.activeElement?.tagName)) === 'BODY', 'a fresh load of a redirect route must not move focus');

  await page.goto(url('/style'), { waitUntil: 'load' });
  await page.waitForTimeout(300);
  expect(new URL(page.url()).pathname === '/', `/style should not exist in production (got ${page.url()})`);

  /* ---------- Old hash links keep working: on a fresh load, and as an in-page hash change ---------- */
  await page.goto('about:blank');
  await page.goto(url('/#/apply'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect(
    new URL(page.url()).pathname === '/contact' && !page.url().includes('#'),
    `old link /#/apply (fresh load) should land on /contact without a hash (got ${page.url()})`
  );
  await page.goto(url('/'), { waitUntil: 'load' });
  await page.goto(url('/#/apply'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect(
    new URL(page.url()).pathname === '/contact' && !page.url().includes('#'),
    `old link /#/apply (in-page hash change) should land on /contact without a hash (got ${page.url()})`
  );
  await page.goto(url('/#/intake/denver-zen-den'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect((await text(page, 'h1'))?.includes('Denver Zen Den'), 'old link /#/intake/denver-zen-den should open the intake page');
  await page.goto(url('/#/?review=1'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect((await page.locator('.proof-slot').count()) > 0, 'old link /#/?review=1 should keep the review flag');
  await page.goto(url('/#/working-together'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect((await page.title()) === expectedTitles['/working-together'], 'old link /#/working-together should open Working Together');
  await page.goto('about:blank');
  await page.goto(url('/?review=1#/about'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect(new URL(page.url()).pathname === '/about' && (await page.locator('.proof-slot').count()) > 0, 'a query before an old hash should be kept');
  await page.goto(url('/about?review=0'), { waitUntil: 'load' });
  // M3: the intake page carries its own metadata
  await page.goto(url('/intake/denver-zen-den'), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  expect((await page.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute('href'))) === `${SITE}/intake/denver-zen-den`, 'intake page should carry its own canonical');

  /* ---------- Copy fidelity and content fixes ---------- */
  await page.goto(url('/'), { waitUntil: 'load' });
  await settle(page);
  expect((await page.locator('.cards--2 .card__n').count()) === 0, 'the four problem cards should not carry 01-04 numbers');
  expect((await text(page, '.site-footer__brand'))?.includes('Patrick McHeyser'), 'footer brand column should carry the copy doc line "Patrick McHeyser"');
  const fig1 = await text(page, '.hero__figure .figure__caption');
  expect(fig1?.includes('In this example'), `Fig. 1 caption should say what this example shows, got: ${fig1}`);
  const fig2 = await text(page, '.approach__figure .figure__caption');
  expect(fig2?.includes('first three steps'), `Fig. 2 caption should say which steps the Sprint covers, got: ${fig2}`);
  expect((await page.locator('.work-feature a').evaluateAll(links => links.map(link => link.getAttribute('href')))).join(' ') === '/work/manufacturing-systems /work/shared-context', 'Home should feature manufacturing then healthcare');
  expect(await page.locator('main a[href="/work/mtro-pro"]').count() === 0, 'MTRO should be accessible through Client Work, not the Home feature');
  expect(
    (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)) === 'auto',
    'html should not use smooth scrolling (one motion idea)'
  );
  const mark = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--mark').trim().toUpperCase());
  expect(mark === '#D9632B', `--mark should be #D9632B (4.5:1 under ink), got ${mark}`);
  await page.goto(url('/working-together'), { waitUntil: 'load' });
  await settle(page);
  expect((await page.locator('.cards--3 .card__n').count()) === 3, 'the three stages keep their 01-03 numbers');
  const invented = await page.evaluate(() => Array.from(document.querySelectorAll('h2')).some((h) => h.textContent?.trim() === 'How we work together'));
  expect(!invented, 'the invented hidden heading "How we work together" should not render');

  /* ---------- Diagram geometry ---------- */
  await page.goto(url('/'), { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const geometry = await page.evaluate(() => {
    const out = {};
    // Fig. 1: equal-height boxes, one-line "where" text at this width, no overflow.
    const boxes = Array.from(document.querySelectorAll('.hero__figure .node__box'));
    const heights = boxes.map((b) => Math.round(b.getBoundingClientRect().height));
    out.fig1Heights = heights;
    // Text runs, not boxes: the pen circle is positioned outside its box on purpose.
    out.fig1Overflow = Array.from(document.querySelectorAll('.hero__figure .node__label, .hero__figure .node__where')).some(
      (t) => t.scrollWidth > t.clientWidth + 1
    );
    out.fig1WhereLines = Array.from(document.querySelectorAll('.hero__figure .node__where')).map((w) => Math.round(w.getBoundingClientRect().height));
    // Annotation leader is an elbow (two segments) at desktop widths.
    const leader = document.querySelector('.hero__figure .annotation--above .annotation__leader-d');
    out.leaderD = leader?.getAttribute('d') || '';
    // Fig. 2 sits in grid columns 8 to 12.
    const approachFigure = document.querySelector('.approach__figure');
    out.approachStart = approachFigure ? getComputedStyle(approachFigure).gridColumnStart : '';
    return out;
  });
  expect(new Set(geometry.fig1Heights).size === 1, `Fig. 1 node boxes should be equal height, got ${geometry.fig1Heights.join(',')}`);
  expect(!geometry.fig1Overflow, 'Fig. 1 node text overflows its box');
  expect(geometry.fig1WhereLines.every((h) => h < 22), `Fig. 1 "where" lines should fit on one line at 1280px, heights ${geometry.fig1WhereLines.join(',')}`);
  expect(/H[^A-Z]*V|V[^A-Z]*H/.test(geometry.leaderD), `annotation leader should be an elbow, got d="${geometry.leaderD}"`);
  expect(geometry.approachStart === '8', `Fig. 2 should start at grid column 8, got ${geometry.approachStart}`);

  /* ---------- The three example figures, now on Working Together ---------- */
  await page.goto(url('/working-together'), { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const examples = await page.evaluate(() => {
    const out = {};
    const docs = Array.from(document.querySelectorAll('.stack--docs .node__box')).map((n) => {
      const r = n.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    const fan = document.querySelector('.stack--docs')?.closest('.flow')?.querySelector('.fan--out');
    const heads = fan ? Array.from(fan.querySelectorAll('.arrowhead')).map((a) => { const r = a.getBoundingClientRect(); return r.top + r.height / 2; }) : [];
    out.fanMiss = docs.map((d, i) => Math.round(Math.abs(d - (heads[i] ?? -999))));
    out.gapCircle = !!document.querySelector('.record__key .pen-circle');
    const who = document.querySelector('.board tbody tr:nth-child(3) td:nth-child(3)');
    out.whoNowrap = who ? getComputedStyle(who).whiteSpace === 'nowrap' : false;
    out.boardCaption = document.querySelector('.board caption')?.textContent?.trim();
    out.captions = Array.from(document.querySelectorAll('.figure__n')).map((n) => n.textContent?.trim());
    return out;
  });
  expect(examples.fanMiss.length === 3 && examples.fanMiss.every((m) => m <= 3), `Paperwork fan arrowheads miss the document nodes by ${examples.fanMiss.join(',')}px`);
  expect(examples.gapCircle, 'Paperwork pen circle should be on the PO number field name');
  expect(examples.whoNowrap, 'job board who/next columns should not wrap');
  expect(examples.boardCaption === 'Example job board', 'the job board should carry its "Example job board" caption');
  expect(examples.captions.join(' ') === 'Fig. 1 Fig. 2 Fig. 3 Fig. 4', `Working Together figures should be numbered 1 to 4, got ${examples.captions.join(' ')}`);

  /* ---------- Calls to action: the path to the work beside every standalone "Let's talk" ---------- */
  for (const route of ['/', '/working-together', '/about']) {
    await page.goto(url(route), { waitUntil: 'load' });
    await settle(page);
    const rows = await page.evaluate(() =>
      [...document.querySelectorAll('main .hero__cta, main .closing .cta-row')].map((row) => {
        const btn = row.querySelector('a.btn');
        const link = row.querySelector('a.link-secondary');
        const b = btn?.getBoundingClientRect();
        const l = link?.getBoundingClientRect();
        return {
          btn: btn?.getAttribute('href') ?? null,
          link: link?.getAttribute('href') ?? null,
          text: link?.textContent?.trim() ?? null,
          apart: b && l ? Math.abs((b.top + b.bottom) / 2 - (l.top + l.bottom) / 2) : null,
          sameLine: b && l ? l.left > b.right : null,
        };
      })
    );
    const want = route === '/about' ? 1 : 2;
    expect(rows.length === want, `${route}: expected ${want} call-to-action row(s), found ${rows.length}`);
    for (const row of rows) {
      expect(row.btn === '/contact' && row.link === '/work', `${route}: a call to action pairs Let's talk with the client work, got ${row.btn} and ${row.link}`);
      expect(row.text === "See how I've worked with others", `${route}: the secondary call to action should read "See how I've worked with others", got ${row.text}`);
      expect(row.sameLine && row.apart !== null && row.apart <= 2, `${route}: the button and the link should sit on one line, centred (${row.apart}px apart, same line: ${row.sameLine})`);
    }
  }
  await page.goto(url('/'), { waitUntil: 'load' });
  await settle(page);
  await page.locator('.hero__cta a[href="/work"]').click();
  await page.getByRole('heading', { name: 'Client work', exact: true }).waitFor();
  expect(new URL(page.url()).pathname === '/work', 'the hero call to action should open the client work');
  expect((await page.locator('main .closing a[href="/work"]').count()) === 0, 'the Client Work closing pairs the button with "How we work together", not a link to itself');

  /* ---------- Index links say a sample, never all ---------- */
  for (const route of ['/', '/work/mtro-pro', '/work/shared-context']) {
    await page.goto(url(route), { waitUntil: 'load' });
    await settle(page);
    await page.locator('main h1').first().waitFor(); // story pages load in their own chunk
    const links = await page.evaluate(() => [...document.querySelectorAll('main a')].map((a) => a.textContent?.trim() ?? ''));
    const claimsAll = links.filter((t) => /\ball\b.*\bwork\b/i.test(t));
    expect(claimsAll.length === 0, `${route}: no link may claim to show all the work, got ${claimsAll.join(' | ')}`);
    const index = await page.evaluate(
      () => document.querySelector('main .work-all a, main .work-story-hero > .section__inner > a.link-secondary')?.textContent?.trim() ?? null
    );
    expect(index === 'See a sample of client work', `${route}: the index link should read "See a sample of client work", got ${index}`);
  }

  /* ---------- Published client-work journeys ---------- */
  await page.goto(url('/work'), { waitUntil: 'load' });
  await page.getByRole('heading', { name: 'More client work', exact: true }).waitFor();
  expect((await page.locator('main article a').evaluateAll(links => links.map(link => link.getAttribute('href')))).join(' ') === '/work/manufacturing-systems /work/shared-context /work/mtro-pro /work/psyche-digital', 'Client Work should lead with manufacturing and healthcare, then show MTRO and Psyche');
  await page.locator('.work-story-card a[href="/work/mtro-pro"]').click();
  await page.getByRole('heading', { name: 'Helping customers get started and the product keep improving.', exact: true }).waitFor();
  await page.locator('.story-figure').first().waitFor();
  expect(new URL(page.url()).pathname === '/work/mtro-pro', 'Client work overview must open the MTRO story');
  expect(await page.locator('main figure').count() === 2, 'Story should show customer-success and QA diagrams');
  expect(await page.locator('main figure .pen-circle').count() === 2, 'each MTRO figure circles the step where a person decides');
  expect(await page.locator('.work-node--human, .story-diagram__image, .work-client').count() === 0, 'no orange box borders, image diagrams or ad-hoc client labels on the work pages');
  expect(await page.locator('a[href="https://mtropro.com/"]').count() === 1, 'Story must link to the client site');
  expect((await page.locator('main').innerText()).includes('Hours saved have not been measured yet'), 'Story must distinguish implemented work from unmeasured outcomes');
  await page.locator('main').getByRole('link', { name: "Let's talk", exact: true }).click();
  expect(new URL(page.url()).pathname === '/contact', 'Story CTA must lead to the contact form');
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/work', '/work/mtro-pro', '/work/manufacturing-systems', '/work/shared-context', '/work/psyche-digital']) {
      await page.goto(url(route), { waitUntil: 'load' });
      await settle(page);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        clipped: [...document.querySelectorAll('.story-figure .node__label, .story-figure .node__where')].some(n => n.scrollWidth > n.clientWidth + 1),
      }));
      expect(!layout.overflow && !layout.clipped, `${route} at ${width}px: diagram text or page overflows`);
    }
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const route of ['/work/manufacturing-systems', '/work/shared-context', '/work/psyche-digital']) {
    await page.goto(url('/work'), { waitUntil: 'load' });
    await page.locator(`main a[href="${route}"]`).click();
    await page.locator('h1').filter({ hasText: route.includes('manufacturing') ? 'Technical leadership' : route.includes('shared-context') ? 'An AI assistant' : 'Taking AI further' }).waitFor();
    expect(new URL(page.url()).pathname === route, 'Client Work must open each published story');
    const copy = await page.locator('main').innerText();
    expect(!/prior-year|overstated|consequential calculation errors|cannot be trusted|Internal evidence|clearance|Hi \[Name\]/i.test(copy), `${route}: private details or superseded reporting wording appeared`);
    if (route.includes('manufacturing')) {
      expect(copy.includes('traced management figures back to source transactions'), 'Manufacturing should describe the reporting method');
      expect(copy.includes('operator testing'), 'Manufacturing must retain implementation status');
    }
    if (route.includes('shared-context')) expect(copy.includes('rollout continues') && copy.includes('Time saved has not been measured yet'), 'Healthcare must retain ongoing rollout and unmeasured outcomes');
    expect(!copy.includes(' · ') && !/\+ /.test(copy.replace(/\d\+/g, '')), `${route}: no middle-dot labels or plus signs in the words`);
    if (route.includes('psyche')) expect(copy.includes('The new workflows have not yet been installed'), 'Psyche must not imply completed adoption');
    const figures = await page.evaluate(() => ({
      figures: document.querySelectorAll('main figure.story-figure').length,
      circles: document.querySelectorAll('main figure .pen-circle').length,
      images: document.querySelectorAll('main figure img, .story-diagram__image').length,
      tables: document.querySelectorAll('main table.board').length,
      leadIns: document.querySelectorAll('.story-body h2.story-body__lead').length,
      boldSpans: [...document.querySelectorAll('.story-body p > strong')].length,
    }));
    const wantFigures = route.includes('manufacturing') ? 2 : route.includes('shared-context') ? 1 : 0;
    expect(figures.figures === wantFigures, `${route}: expected ${wantFigures} drawn figure(s), got ${figures.figures}`);
    expect(figures.images === 0, `${route}: diagrams must be drawn, not images`);
    if (wantFigures) expect(figures.circles >= 1, `${route}: the pen should mark where a person decides`);
    if (!route.includes('psyche')) expect(figures.tables === 1, `${route}: the workflow table should use the board style`);
    expect(figures.boldSpans === 0 && (route.includes('psyche') || figures.leadIns >= 2), `${route}: bold lead-ins should be headings, not bold spans`);
    await page.locator('main').getByRole('link', { name: "Let's talk", exact: true }).click();
    await page.locator('#contact-name').waitFor();
    expect(new URL(page.url()).pathname === '/contact', 'Every story should reach the contact form');
  }

  /* ---------- Focus and keyboard ---------- */
  await page.goto(url('/'), { waitUntil: 'load' });
  await settle(page);
  await page.locator('.ink-block .link-secondary').focus();
  const inkOutline = await page.evaluate(() => (document.activeElement ? getComputedStyle(document.activeElement).outlineColor : 'none'));
  expect(inkOutline === 'rgb(244, 242, 237)', `focus ring inside the ink block should be paper, got ${inkOutline}`);
  await page.locator('.site-nav__link', { hasText: 'About' }).click();
  await page.waitForTimeout(400);
  expect((await page.evaluate(() => document.activeElement?.tagName)) === 'H1', 'focus should move to the page heading after navigating');
  expect(new URL(page.url()).pathname === '/about', 'nav click should reach /about');

  // The wordmark stroke is a thin pen line, so its rendered pixels should carry the pen colour (antialiased pixels count).
  const strokeShot = await page.locator('.site-header .wordmark__stroke').screenshot({ scale: 'css' });
  const { PNG } = require('pngjs');
  const png = PNG.sync.read(strokeShot);
  let orange = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    const [r, g, b] = [png.data[i], png.data[i + 1], png.data[i + 2]];
    if (r > 200 && g < 200 && b < 170 && r - b > 60) orange += 1;
  }
  expect(orange >= 8, `header wordmark stroke should render in the pen colour (found ${orange} orange pixels)`);

  /* ---------- Hit areas, input borders, scroll margins, table semantics ---------- */
  const targets = await page.evaluate(() => {
    const h = (sel) => Math.round(document.querySelector(sel)?.getBoundingClientRect().height ?? 0);
    return {
      nav: h('.site-nav__link'),
      small: h('.btn--small'),
      wordmark: h('.site-header .wordmark-link'),
      footerLink: h('.site-footer__nav a'),
      footerMail: h('.site-footer__contact a'),
    };
  });
  for (const [name, height] of Object.entries(targets)) {
    expect(height >= 44, `${name} hit area is ${height}px tall, needs 44`);
  }
  await page.goto(url('/contact'), { waitUntil: 'load' });
  await settle(page);
  const hasForm = (await page.locator('#contact-name').count()) === 1;
  expect(hasForm, '/contact at the real path should show the contact form');
  if (hasForm) {
    const field = await page.evaluate(() => {
      const el = document.getElementById('contact-name');
      if (!el) return { border: 'missing', scrollMargin: '0px' };
      const cs = getComputedStyle(el);
      return { border: cs.borderColor, scrollMargin: cs.scrollMarginTop };
    });
    expect(field.border === 'rgb(107, 118, 130)', `idle input border should be --stroke, got ${field.border}`);
    expect(parseInt(field.scrollMargin, 10) >= 72, `inputs need scroll-margin-top under the sticky header, got ${field.scrollMargin}`);

    /* ---------- Contact form: validation, failure path, honeypot, success path ---------- */
    await page.locator('#contact-email').fill('not-an-email');
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(200);
    const errors = await page.locator('.field__error').allTextContents();
    expect(errors.includes('Please enter your name.'), 'missing name validation message');
    expect(errors.includes('Please enter a valid email address.'), 'missing email validation message');
    expect(errors.includes('Please enter your company name.'), 'missing company validation message');
    expect(errors.includes("Please tell me a little about what you'd like to improve."), 'missing challenge validation message');
    const focused = await page.evaluate(() => document.activeElement?.id);
    expect(focused === 'contact-name', `focus should move to the first invalid field, got ${focused}`);

    // Failure path: the provider is unreachable (blocked), the error is announced with a mailto link, the button recovers.
    let providerCalls = 0;
    await page.route(EMAILJS, (route) => {
      providerCalls += 1;
      route.abort();
    });
    await page.goto(url('/contact'), { waitUntil: 'load' });
    await settle(page);
    await fillValid(page);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(1500);
    const alertText = await text(page, '[role="alert"]');
    expect(alertText?.includes('Something went wrong while sending your note.'), `failure path should show the error copy in an alert, got: ${alertText}`);
    expect((await page.locator('[role="alert"] a[href^="mailto:patrick@mcheyser.com"]').count()) === 1, 'error sentence should carry a mailto link');
    expect(await page.locator('button[type="submit"]').isEnabled(), 'submit button should be enabled again after a failure');
    expect(providerCalls === 1, `provider should have been called once on the failure path, got ${providerCalls}`);
    await page.unroute(EMAILJS);

    // Honeypot: a filled hidden field never reaches the provider and quietly shows the confirmation.
    providerCalls = 0;
    await page.route(EMAILJS, (route) => {
      providerCalls += 1;
      route.fulfill({ status: 200, body: 'OK' });
    });
    await page.goto(url('/contact'), { waitUntil: 'load' });
    await settle(page);
    const hp = page.locator('input[name="reference"]');
    const hasHoneypot = (await hp.count()) === 1;
    expect(hasHoneypot, 'honeypot field should exist');
    if (hasHoneypot) {
      expect((await hp.getAttribute('tabindex')) === '-1', 'honeypot must be out of the tab order');
      await fillValid(page);
      await hp.evaluate((el) => {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(el, 'http://spam.example');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(800);
      expect(providerCalls === 0, `honeypot submission should not call the provider, got ${providerCalls} call(s)`);
      expect((await page.locator('.form__success').count()) === 1, 'honeypot submission should still show the confirmation');
    }

    // Success path with the provider mocked: the confirmation receives focus; "Sending" is announced but not shown twice.
    providerCalls = 0;
    await page.unroute(EMAILJS);
    await page.route(EMAILJS, async (route) => {
      providerCalls += 1;
      await new Promise((r) => setTimeout(r, 900));
      route.fulfill({ status: 200, body: 'OK' });
    });
    await page.goto(url('/contact'), { waitUntil: 'load' });
    await settle(page);
    await fillValid(page);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(300);
    const midFlight = await page.evaluate(() => ({
      button: document.querySelector('button[type="submit"]')?.textContent?.trim(),
      status: document.querySelector('.form__status')?.textContent?.trim(),
      statusHidden: document.querySelector('.form__status')?.classList.contains('visually-hidden'),
      readOnly: Array.from(document.querySelectorAll('.field__input')).every((el) => el.readOnly),
    }));
    expect(midFlight.readOnly === true, 'fields should be read-only while a note is sending');
    expect(midFlight.button === 'Sending your note...', `button should read "Sending your note..." while sending, got ${midFlight.button}`);
    expect(midFlight.status === 'Sending your note...' && midFlight.statusHidden === true, 'live region should announce sending without showing it twice');
    await page.waitForTimeout(1200);
    expect(providerCalls === 1, `success path should call the provider once, got ${providerCalls}`);
    const success = await page.evaluate(() => ({
      text: document.querySelector('.form__success')?.textContent?.trim(),
      focused: document.activeElement?.classList.contains('form__success'),
    }));
    expect(success.text?.startsWith("Thanks for getting in touch. I've received your note and will follow up by email."), `success copy wrong: ${success.text}`);
    expect(success.focused === true, 'confirmation should receive focus after a successful send');
    await page.unroute(EMAILJS);

  }

  /* ---------- Mobile: menu keyboard behaviour, table headers, branch labels, Fig. 5 annotation ---------- */
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, ignoreHTTPSErrors: true });
  const mpage = await mobile.newPage();
  mpage.on('pageerror', (error) => consoleErrors.push(error.message));
  await mpage.goto(url('/'), { waitUntil: 'load' });
  await settle(mpage);
  await mpage.locator('.menu-toggle').focus();
  await mpage.keyboard.press('Enter');
  await mpage.waitForTimeout(150);
  expect((await mpage.locator('.menu-toggle').getAttribute('aria-expanded')) === 'true', 'Enter on Menu should open the panel');
  await mpage.keyboard.press('Tab');
  await mpage.waitForTimeout(100);
  expect(await mpage.evaluate(() => document.activeElement?.classList.contains('site-menu__link')), 'Tab from Menu should reach the first panel link');
  await mpage.keyboard.press('Escape');
  await mpage.waitForTimeout(150);
  expect((await mpage.locator('.menu-toggle').getAttribute('aria-expanded')) === 'false', 'Escape should close the panel');
  expect(await mpage.evaluate(() => document.activeElement?.classList.contains('menu-toggle')), 'Escape should return focus to the Menu toggle');
  await mpage.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await mpage.waitForTimeout(300);
  expect((await mpage.locator('.work-feature a').evaluateAll(links => links.map(link => link.getAttribute('href')))).join(' ') === '/work/manufacturing-systems /work/shared-context', 'Home should show both lead engagements on mobile');
  await mpage.goto(url('/working-together'), { waitUntil: 'load' });
  await settle(mpage);
  await mpage.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await mpage.waitForTimeout(300);
  const mobileFacts = await mpage.evaluate(() => {
    const thead = document.querySelector('.board thead');
    const ths = Array.from(document.querySelectorAll('.board th'));
    const labels = Array.from(document.querySelectorAll('.fan__label')).map((l) => l.textContent?.trim()).filter(Boolean);
    const value = document.querySelector('.board__mark')?.getBoundingClientRect();
    const note = document.querySelector('.board__cell--marked .annotation')?.getBoundingClientRect();
    return {
      theadDisplay: thead ? getComputedStyle(thead).display : 'missing',
      headers: ths.length,
      headerRoles: ths.every((th) => th.getAttribute('role') === 'columnheader'),
      tableRole: document.querySelector('.board')?.getAttribute('role'),
      labels,
      annotationBelow: value && note ? note.top >= value.bottom - 2 && Math.abs(note.left - value.left) <= 6 : false,
    };
  });
  expect(mobileFacts.theadDisplay !== 'none', 'job board header row must stay in the accessibility tree on phones (not display:none)');
  expect(mobileFacts.headers === 4 && mobileFacts.headerRoles && mobileFacts.tableRole === 'table', 'job board should keep explicit table semantics');
  expect(mobileFacts.labels.length === 4, `Working Together phone diagrams should label their branches (fan labels), got ${JSON.stringify(mobileFacts.labels)}`);
  expect(mobileFacts.annotationBelow, 'job board phone annotation should sit below the circled value, left-aligned with it');
  const wtEdge = await mpage.evaluate(() => {
    const over = [];
    for (const svg of document.querySelectorAll('.pen-circle')) {
      const r = svg.getBoundingClientRect();
      if (r.right > window.innerWidth - 6 || r.left < 6) over.push(`${Math.round(r.left)}..${Math.round(r.right)}`);
    }
    return over;
  });
  expect(wtEdge.length === 0, `Working Together pen circles should stay clear of the phone's edges, got ${wtEdge.join(', ')}`);
  await mpage.goto(url('/'), { waitUntil: 'load' });
  await settle(mpage);
  await mpage.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await mpage.waitForTimeout(300);
  const edge = await mpage.evaluate(() => {
    const over = [];
    for (const svg of document.querySelectorAll('.pen-circle')) {
      const r = svg.getBoundingClientRect();
      if (r.right > window.innerWidth - 6 || r.left < 6) over.push(`${Math.round(r.left)}..${Math.round(r.right)}`);
    }
    return over;
  });
  expect(edge.length === 0, `pen circles should stay clear of the phone's edges, got ${edge.join(', ')}`);
  await mpage.goto(url('/working-together'), { waitUntil: 'load' });
  await settle(mpage);
  expect((await mpage.locator('.fan__label').count()) === 4, 'Working Together phone figures should carry four branch labels (two on the quoting tool, one on the paperwork, one on the Sprint timeline)');
  await mpage.goto(url('/'), { waitUntil: 'load' });
  await settle(mpage);
  const phoneCta = await mpage.evaluate(() => {
    const row = document.querySelector('.hero__cta');
    const b = row?.querySelector('a.btn')?.getBoundingClientRect();
    const l = row?.querySelector('a.link-secondary')?.getBoundingClientRect();
    if (!b || !l) return null;
    return {
      inside: b.left >= 0 && l.left >= 0 && b.right <= window.innerWidth && l.right <= window.innerWidth,
      clear: l.top >= b.bottom - 1 || l.left >= b.right,
    };
  });
  expect(phoneCta?.inside && phoneCta?.clear, `the phone hero call to action should fit the screen with the link clear of the button, got ${JSON.stringify(phoneCta)}`);
  await mobile.close();

  /* ---------- Transfer size of Home, cold cache ---------- */
  const cold = await browser.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
  const cpage = await cold.newPage();
  let bytes = 0;
  const fontFailures = [];
  const jsBodies = [];
  cpage.on('requestfailed', (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) fontFailures.push(request.url());
  });
  cpage.on('response', async (response) => {
    try {
      const body = await response.body();
      bytes += body.length;
      if (/\.js(\?|$)/.test(response.url())) jsBodies.push({ url: response.url(), text: body.toString('utf8') });
    } catch {
      // redirects and aborted responses have no body
    }
  });
  await cpage.goto(url('/'), { waitUntil: 'networkidle' });
  await cpage.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await cpage.waitForLoadState('networkidle');
  await cpage.waitForTimeout(500);
  notes.push(`Home cold load: ${(bytes / 1024).toFixed(0)} KB of decoded bytes (vite preview sends no compression, so this is an upper bound on transfer)${fontFailures.length ? ', font host unreachable so fonts not counted' : ', including fonts'}`);
  if (!fontFailures.length) expect(bytes < 600 * 1024, `Home transfers ${(bytes / 1024).toFixed(0)} KB, budget is 600 KB`);
  expect(!jsBodies.some((js) => js.text.includes('api.emailjs.com')), 'Home should not download the mail provider library');
  await cold.close();

  const unexpectedFailures = failedRequests.filter((u) => !/fonts\.(googleapis|gstatic)\.com|api\.emailjs\.com/.test(u));
  expect(unexpectedFailures.length === 0, `failed requests: ${unexpectedFailures.join(', ')}`);
  expect(consoleErrors.length === 0, `console errors: ${consoleErrors.join(' | ')}`);

  await browser.close();
} finally {
  server?.kill();
}

for (const note of notes) console.log(note);
if (failures.length) {
  console.log(`Production check failed (${failures.length}):`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Production check passed: routes and metadata, old links, hidden proof slots, no dev routes, validation, form paths, focus, diagrams, hit areas, tokens, transfer size, no console errors.');
}
