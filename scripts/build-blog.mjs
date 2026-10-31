import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

const site = 'https://mcheyser.com';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const posts = JSON.parse(await readFile('content/blogPosts.json', 'utf8'));
const slugs = new Set();
for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || slugs.has(post.slug)) throw new Error(`Invalid or duplicate blog slug: ${post.slug}`);
  if (!post.title || !post.description || !post.author || !post.paragraphs?.length || post.paragraphs.some(p => typeof p !== 'string' || !p.trim())) throw new Error(`Incomplete blog post: ${post.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.published) || !Number.isFinite(Date.parse(post.published))) throw new Error(`Invalid publication date: ${post.slug}`);
  slugs.add(post.slug);
}

const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Blog build could not find the app root');

// Load TSX for server rendering without a listening server or a browser install.
const vite = await createServer({
  server: { middlewareMode: true }, appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
  // Router 7's Node condition selects CommonJS; use its ESM exports in Vite's renderer.
  ssr: { noExternal: ['react-router-dom', 'react-router'], resolve: { conditions: ['import'] } },
});
try {
  const { renderBlogPages } = await vite.ssrLoadModule('/scripts/render-blog.tsx');
  const pages = renderBlogPages();
  for (const page of pages) {
    const canonical = `${site}${page.noIndex ? '/blog/' : page.path}`;
    let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
    const values = [
      ['name', 'description', page.description],
      ['property', 'og:title', page.title],
      ['property', 'og:description', page.description],
      ['property', 'og:url', canonical],
      ['property', 'og:type', page.published ? 'article' : 'website'],
    ];
    for (const [attribute, key, value] of values) {
      const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`);
      if (!pattern.test(html)) throw new Error(`Blog build could not find ${key}`);
      html = html.replace(pattern, () => `<meta ${attribute}="${key}" content="${escape(value)}" />`);
    }
    html = html.replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${escape(canonical)}" />`);
    let extra = '';
    if (page.noIndex) extra += '<meta name="robots" content="noindex" />\n';
    if (page.published) extra += `<meta property="article:published_time" content="${escape(page.published)}" />\n`;
    if (page.schema) extra += `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(page.schema).replace(/</g, '\\u003c')}</script>\n`;
    html = html.replace('</head>', () => `${extra}</head>`).replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>`);
    const file = join('dist', page.path.endsWith('/') ? `${page.path}index.html` : page.path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`Rendered ${page.path}`);
  }
  const marketing = ['/', '/working-together', '/work', '/work/mtro-pro', '/work/manufacturing-systems', '/work/shared-context', '/work/psyche-digital', '/about', '/contact'];
  const routes = [...marketing, ...pages.filter(p => !p.noIndex).map(p => p.path)];
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path => `  <url><loc>${site}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
} finally {
  await vite.close();
}
