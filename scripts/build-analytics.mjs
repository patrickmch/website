import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve('dist');
const websiteId = (process.env.UMAMI_WEBSITE_ID || '').trim();
if (!websiteId) {
  console.log('Analytics disabled: UMAMI_WEBSITE_ID is not configured.');
} else {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(websiteId)) {
    throw new Error('UMAMI_WEBSITE_ID must be the public website UUID from Umami.');
  }
  const tag = `<script defer src="/site-analytics.js" data-website-id="${websiteId}"></script>`;
  let count = 0;
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      const path = relative(root, file).split('\\').join('/');
      if (path === 'intake' || path === 'stoppromptingstartshipping') continue;
      if (entry.isDirectory()) await visit(file);
      else if (entry.name.endsWith('.html')) {
        const html = await readFile(file, 'utf8');
        if (html.includes('src="/site-analytics.js"')) continue;
        if (!/<\/head>/i.test(html)) throw new Error(`No head element in ${path}`);
        await writeFile(file, html.replace(/<\/head>/i, `${tag}\n</head>`));
        count++;
      }
    }
  }
  await visit(root);
  console.log(`Added Umami to ${count} public HTML pages.`);
}
