import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

// Real reader journeys against the production server and the approved first post.
// BASE_URL also permits read-only verification after publication.
const base = process.env.BASE_URL || 'http://127.0.0.1:2145';
const slug = 'start-with-the-question-your-team-keeps-asking';
const route = `/blog/${slug}/`;
const title = 'Start with the question your team keeps asking';
const server = process.env.BASE_URL ? null : spawn(process.execPath, ['scripts/serve.mjs'], {
  env: { ...process.env, PORT: '2145', HOST: '127.0.0.1' }, stdio: 'ignore',
});
let browser;
try {
  if (server) {
    for (let attempt = 0; attempt < 100; attempt++) {
      try { await fetch(base); break; } catch {
        if (attempt === 99) throw new Error('Blog check server did not start');
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, 'article must load at its direct URL');
  const html = await response.text();
  assert.ok(html.includes(`<title>${title} | Patrick McHeyser</title>`), 'article title must be in the initial HTML');
  assert.ok(html.includes('Each question is reasonable.'), 'article text must be available before JavaScript');
  const missing = await fetch(`${base}/blog/this-post-does-not-exist/`);
  assert.equal(missing.status, 404, 'unknown posts must return HTTP 404');
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes(`https://mcheyser.com${route}`), 'sitemap must include the article');

  browser = await chromium.launch();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(`${base}${route}`);
  assert.equal(await staticPage.locator('h1').textContent(), title);
  assert.equal(await staticPage.locator('link[rel="canonical"]').getAttribute('href'), `https://mcheyser.com${route}`);
  assert.equal(await staticPage.locator('meta[property="og:type"]').getAttribute('content'), 'article');
  assert.equal(await staticPage.locator('meta[property="og:title"]').count(), 1);
  const structured = JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent());
  assert.equal(structured.headline, title);
  assert.equal(structured.author.name, 'Patrick McHeyser');
  const posts = JSON.parse(await readFile('content/blogPosts.json', 'utf8'));
  assert.deepEqual(await staticPage.locator('.blog-article__body > p').allTextContents(), posts.find(post => post.slug === slug).paragraphs);
  await staticPage.goto(`${base}/blog/`);
  await staticPage.getByRole('link', { name: title, exact: true }).click();
  assert.equal(new URL(staticPage.url()).pathname, route);
  await noJs.close();

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await page.locator('.site-nav').getByRole('link', { name: 'Blog', exact: true }).click();
  await page.getByRole('link', { name: title, exact: true }).click();
  await page.waitForFunction(expected => document.title === `${expected} | Patrick McHeyser`, title);
  assert.equal(await page.locator('h1').textContent(), title);
  assert.equal(await page.locator('meta[property="og:type"]').getAttribute('content'), 'article');
  assert.equal(await page.locator('script[type="application/ld+json"]').count(), 1);
  await page.reload();
  await page.locator('.blog-article__body').waitFor();
  await page.locator('.site-footer').getByRole('link', { name: 'About', exact: true }).click();
  await page.waitForFunction(() => document.title === 'About Patrick McHeyser');
  assert.equal(await page.locator('meta[property="og:type"]').getAttribute('content'), 'website', 'article metadata must not leak to other pages');
  assert.equal(await page.locator('script[type="application/ld+json"]').count(), 0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('#site-menu').getByRole('link', { name: 'Blog', exact: true }).click();
  await page.getByRole('link', { name: title, exact: true }).click();
  await page.locator('.blog-article__body').waitFor();
  assert.equal(await page.locator('#site-menu').isVisible(), false);
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/blog/', route]) {
      await page.goto(`${base}${path}`);
      await page.locator('main h1').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${path} overflows at ${width}px`);
      assert.equal(await page.locator('h1').count(), 1);
    }
  }
  if (process.env.OUT) {
    await mkdir(process.env.OUT, { recursive: true });
    for (const [label, width] of [['desktop', 1440], ['mobile', 390]]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const [name, path] of [['blog', '/blog/'], ['article', route]]) {
        await page.goto(`${base}${path}`);
        await page.locator('main h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `${process.env.OUT}/${name}-${label}.png`, fullPage: true });
      }
    }
  }
  await page.goto(`${base}/blog/missing/`);
  await page.getByRole('link', { name: 'Back to the blog', exact: true }).click();
  await page.getByRole('link', { name: title, exact: true }).waitFor();
  assert.equal(await page.locator('meta[name="robots"]').count(), 0, 'noindex must clear after leaving a missing post');
  assert.deepEqual(errors, [], 'blog journeys must not throw browser errors');
  console.log('Blog check passed: direct HTML, exact article, metadata, sitemap, 404, no-JS reading, desktop/mobile navigation and five widths.');
} finally {
  await browser?.close();
  server?.kill();
}
