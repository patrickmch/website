/**
 * Adversarial design review by outside models.
 *
 * Builds one packet (the design spec, the copy doc, the site source, and page
 * screenshots) and sends the same brief to each provider whose key is present:
 *   GEMINI_API_KEY  -> Google Gemini   (GEMINI_MODEL, default gemini-2.5-pro)
 *   OPENAI_API_KEY  -> OpenAI          (OPENAI_MODEL, default gpt-5)
 *   XAI_API_KEY     -> xAI Grok        (XAI_MODEL, default grok-4)
 * Replies are written to OUT (default ./review-out) as <provider>.md.
 *
 * Usage:
 *   npm run screenshots -- (with TILES=1) first, then:
 *   GEMINI_API_KEY=... OPENAI_API_KEY=... XAI_API_KEY=... node scripts/adversarial-review.mjs
 *
 * Env: SCREENSHOTS (default ./screenshots), OUT, ONLY=gemini,openai,xai,
 *      DRY_RUN=1 (assemble and report sizes, send nothing),
 *      EMIT=1 (also write the prompt, the packet text, and the image list to OUT/packet
 *      so they can be pasted into a chat interface by hand).
 */
import { readFile, readdir, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SCREENSHOTS = process.env.SCREENSHOTS || 'screenshots';
const OUT = process.env.OUT || 'review-out';
const ONLY = (process.env.ONLY || 'gemini,openai,xai').split(',').map((s) => s.trim());
const DRY_RUN = process.env.DRY_RUN === '1';
const EMIT = process.env.EMIT === '1';

const sourceFiles = [
  'index.html',
  'App.tsx',
  'styles/tokens.css',
  'styles/base.css',
  'styles/components.css',
  'styles/pages.css',
  'components/Wordmark.tsx',
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/Button.tsx',
  'components/Section.tsx',
  'components/ProofSlot.tsx',
  'components/InkBlock.tsx',
  'components/Figure.tsx',
  'components/marks/PenCircle.tsx',
  'components/marks/PenUnderline.tsx',
  'components/marks/PenTick.tsx',
  'components/diagrams/QuoteFlow.tsx',
  'components/diagrams/SprintSteps.tsx',
  'components/diagrams/QuotingTool.tsx',
  'components/diagrams/Paperwork.tsx',
  'components/diagrams/SharedView.tsx',
  'components/diagrams/SprintTimeline.tsx',
  'components/form/Field.tsx',
  'hooks/usePageMeta.ts',
  'hooks/useReviewMode.ts',
  'hooks/useDrawOnView.ts',
  'hooks/useParentSize.ts',
  'pages/HomePage.tsx',
  'pages/WorkingTogetherPage.tsx',
  'pages/AboutPage.tsx',
  'pages/ContactPage.tsx',
];

export const BRIEF = `You are an adversarial design and engineering reviewer. You have no stake in this project and no loyalty to the people who made it. Your job is to find what is wrong, weak, generic, or dishonest, and to say so plainly with a concrete fix for each point.

THE PROJECT
A four-page marketing site for McHeyser (Patrick McHeyser), a solo operations-and-technology consultant for owners and operations leaders of businesses around $5M to $25M in annual revenue. The promoted first engagement is a paid "Discovery Sprint". The reader is a skeptical business owner who runs a real operation and distrusts slick agency sites and "AI transformation" talk.

WHAT YOU ARE GIVEN
1. The design spec (the concept, tokens, components, diagrams, page layouts, acceptance criteria).
2. The copy document (the words; treat them as fixed unless a design problem is really a copy problem, in which case say so).
3. The source of the built site.
4. Screenshots of every page at 1440px and 390px, with the "proof slot" placeholders visible (they are hidden on the published site until real testimonials exist). Tall pages are split into tiles; read them top to bottom.

REVIEW BOTH THE SPEC AND THE BUILD. Specifically:
A. Concept. Does "make the work visible" (paper, ink, one orange pen, drawn diagrams of work instead of photos) serve this reader, or is it designer-pleasing? What would a skeptical owner notice in the first five seconds, and would it make them trust or doubt?
B. The spec's own choices. Where is the palette, type (Source Serif 4, Source Sans 3, Source Code Pro), wordmark (McHeyser with a raised c and an orange pen stroke under it), diagram content, layout, or motion weak, generic, derivative, or wrong for the audience? Say what you would do instead.
C. The build against the spec. Where does the implementation fail the spec, or follow it badly?
D. Craft. Code quality, accessibility, performance, responsive behavior, form behavior, SEO, anything a careful front-end engineer would flag.
E. Copy-to-design fit. Does the copy land better or worse in this design than it would on a plain page? Where does the design fight the words?
F. The diagrams. Are they legible, honest, and useful, or decorative? Would an owner understand each one without the caption?

OUTPUT FORMAT (markdown):
1. "Verdict": three to six sentences. Would you ship this? What is the single biggest risk?
2. "Findings": a numbered list. Each finding has: severity (blocker / major / minor / taste), where (page, section, figure, file, or spec section), what is wrong, why it matters to this reader, and the concrete fix. Order by severity. Aim for completeness over politeness; thirty findings is fine if they are real.
3. "What works": the few things that should not be changed, in one line each.
4. "Alternative directions": the two or three strongest different directions the spec could have taken, in a paragraph each, so the author can judge the chosen concept against real alternatives rather than against nothing.

Be specific. Quote the exact text or name the exact element. Do not pad. Do not restate the brief.`;

async function readText(relative) {
  return readFile(path.join(ROOT, relative), 'utf8');
}

async function buildPacket() {
  const spec = await readText('docs/design-spec.md');
  const copy = await readText('docs/website-copy-2026-10.md');
  const sources = [];
  for (const file of sourceFiles) {
    try {
      sources.push(`\n\n===== ${file} =====\n${await readText(file)}`);
    } catch {
      sources.push(`\n\n===== ${file} =====\n(missing)`);
    }
  }
  const text = `# PACKET 1: DESIGN SPEC\n\n${spec}\n\n# PACKET 2: COPY DOCUMENT\n\n${copy}\n\n# PACKET 3: SITE SOURCE\n${sources.join('')}`;

  const tilesDir = path.resolve(ROOT, SCREENSHOTS, 'tiles');
  let files = [];
  try {
    files = (await readdir(tilesDir)).filter((f) => f.endsWith('.png')).sort();
  } catch {
    files = [];
  }
  const wanted = files.filter((f) => !f.startsWith('intake-') && !f.startsWith('style-'));
  const images = [];
  for (const file of wanted) {
    const data = await readFile(path.join(tilesDir, file));
    images.push({ name: file, base64: data.toString('base64'), bytes: data.length });
  }
  try {
    const og = await readFile(path.join(ROOT, 'public/og.png'));
    images.push({ name: 'og.png (social preview image)', base64: og.toString('base64'), bytes: og.length });
  } catch {
    // no og image
  }
  return { text, images };
}

function imageIntro(images) {
  return `\n\n# PACKET 4: SCREENSHOTS\n${images.length} images follow, in this order:\n${images
    .map((image, index) => `${index + 1}. ${image.name}`)
    .join('\n')}\n`;
}

async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(packet) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-pro';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const parts = [
    { text: BRIEF },
    { text: packet.text + imageIntro(packet.images) },
    ...packet.images.flatMap((image) => [
      { text: `Image: ${image.name}` },
      { inline_data: { mime_type: 'image/png', data: image.base64 } },
    ]),
  ];
  const body = {
    contents: [{ role: 'user', parts }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 16384 },
  };
  const response = await withTimeout(
    fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
    15 * 60 * 1000,
    'gemini'
  );
  const json = await response.json();
  if (!response.ok) throw new Error(`gemini ${response.status}: ${JSON.stringify(json).slice(0, 500)}`);
  const text = (json.candidates?.[0]?.content?.parts || []).map((part) => part.text || '').join('');
  return { model, text };
}

async function callOpenAI(packet) {
  const model = process.env.OPENAI_MODEL || 'gpt-5';
  const content = [
    { type: 'input_text', text: BRIEF },
    { type: 'input_text', text: packet.text + imageIntro(packet.images) },
    ...packet.images.flatMap((image) => [
      { type: 'input_text', text: `Image: ${image.name}` },
      { type: 'input_image', image_url: `data:image/png;base64,${image.base64}`, detail: 'high' },
    ]),
  ];
  const body = { model, input: [{ role: 'user', content }], max_output_tokens: 16384 };
  const response = await withTimeout(
    fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify(body),
    }),
    15 * 60 * 1000,
    'openai'
  );
  const json = await response.json();
  if (!response.ok) throw new Error(`openai ${response.status}: ${JSON.stringify(json).slice(0, 500)}`);
  const text =
    json.output_text ||
    (json.output || [])
      .flatMap((item) => item.content || [])
      .map((part) => part.text || '')
      .join('');
  return { model, text };
}

async function callXai(packet) {
  const model = process.env.XAI_MODEL || 'grok-4';
  const content = [
    { type: 'text', text: BRIEF },
    { type: 'text', text: packet.text + imageIntro(packet.images) },
    ...packet.images.flatMap((image) => [
      { type: 'text', text: `Image: ${image.name}` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${image.base64}`, detail: 'high' } },
    ]),
  ];
  const body = { model, messages: [{ role: 'user', content }], max_tokens: 16384, temperature: 0.7 };
  const response = await withTimeout(
    fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.XAI_API_KEY}` },
      body: JSON.stringify(body),
    }),
    15 * 60 * 1000,
    'xai'
  );
  const json = await response.json();
  if (!response.ok) throw new Error(`xai ${response.status}: ${JSON.stringify(json).slice(0, 500)}`);
  return { model, text: json.choices?.[0]?.message?.content || '' };
}

const providers = [
  { id: 'gemini', key: 'GEMINI_API_KEY', call: callGemini },
  { id: 'openai', key: 'OPENAI_API_KEY', call: callOpenAI },
  { id: 'xai', key: 'XAI_API_KEY', call: callXai },
];

const packet = await buildPacket();
const imageBytes = packet.images.reduce((sum, image) => sum + image.bytes, 0);
console.log(
  `Packet: ${(packet.text.length / 1024).toFixed(0)} KB of text, ${packet.images.length} images (${(imageBytes / 1024 / 1024).toFixed(1)} MB)`
);
await mkdir(OUT, { recursive: true });

if (EMIT) {
  const dir = path.join(OUT, 'packet');
  await mkdir(path.join(dir, 'images'), { recursive: true });
  await writeFile(path.join(dir, 'prompt.md'), BRIEF);
  await writeFile(path.join(dir, 'packet.md'), packet.text + imageIntro(packet.images));
  const tilesDir = path.resolve(ROOT, SCREENSHOTS, 'tiles');
  for (const image of packet.images) {
    const source = image.name.startsWith('og.png') ? path.join(ROOT, 'public/og.png') : path.join(tilesDir, image.name);
    await copyFile(source, path.join(dir, 'images', image.name.split(' ')[0]));
  }
  console.log(`Wrote the packet for manual use to ${dir}`);
}

if (DRY_RUN) {
  console.log('Dry run: nothing sent.');
  process.exit(0);
}

let sent = 0;
for (const provider of providers) {
  if (!ONLY.includes(provider.id)) continue;
  if (!process.env[provider.key]) {
    console.log(`${provider.id}: skipped (${provider.key} not set)`);
    continue;
  }
  sent += 1;
  const started = Date.now();
  try {
    const { model, text } = await provider.call(packet);
    const file = path.join(OUT, `${provider.id}.md`);
    await writeFile(
      file,
      `# Adversarial review: ${provider.id} (${model})\n\nGenerated ${new Date().toISOString()} in ${Math.round((Date.now() - started) / 1000)}s.\n\n${text}\n`
    );
    console.log(`${provider.id}: wrote ${file} (${text.length} chars)`);
  } catch (error) {
    const file = path.join(OUT, `${provider.id}.error.txt`);
    await writeFile(file, String(error?.stack || error));
    console.log(`${provider.id}: FAILED, see ${file}`);
  }
}
if (!sent) {
  console.log('No provider keys found. Set GEMINI_API_KEY, OPENAI_API_KEY, or XAI_API_KEY, or use EMIT=1 for a manual packet.');
}
