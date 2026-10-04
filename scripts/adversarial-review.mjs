#!/usr/bin/env node
/**
 * Adversarial review by outside models.
 *
 * Builds one packet (documents, source files, page tiles, extra images and, when
 * asked, a diff) and sends the same brief to every provider that is reachable:
 *
 *   id      key                transport                           model env         default
 *   gemini  GEMINI_API_KEY     Google Gemini API                   GEMINI_MODEL      gemini-3.1-pro-preview
 *   openai  OPENAI_API_KEY     OpenAI Responses API                OPENAI_MODEL      gpt-5.5
 *          (no key)            Codex CLI, installed and signed in  CODEX_MODEL       the CLI's default
 *   xai     XAI_API_KEY        xAI chat completions                XAI_MODEL         grok-4.6
 *   claude  ANTHROPIC_API_KEY  Anthropic Messages API (opt in)     ANTHROPIC_MODEL   claude-opus-5-5
 *
 * A provider with no automated path gets the manual packet instead of failing:
 * <out>/packet/ holds prompt.md, packet.md, images/ and INSTRUCTIONS.md with the
 * exact paste steps and the file to save the reply to.
 *
 * Replies: <out>/<provider>.md (round N: <out>/round-N/<provider>.md). Failures: <provider>.error.txt beside them.
 * Merge the replies with scripts/merge-reviews.mjs.
 *
 * Usage
 *   node scripts/adversarial-review.mjs --check        providers, models, hosts; sends nothing
 *   node scripts/adversarial-review.mjs --dry-run      builds the packet, reports sizes; sends nothing
 *   node scripts/adversarial-review.mjs                sends to every reachable provider
 *   node scripts/adversarial-review.mjs --emit         also writes the manual packet
 *   node scripts/adversarial-review.mjs --round 2 --log docs/design-review-<date>.md
 *
 * Packet options (the defaults describe this site)
 *   --root <dir>           tree to read from (default: the current directory)
 *   --brief <file>         the review brief (default docs/review-brief.md)
 *   --spec <file|none>     design spec (default docs/design-spec.md)
 *   --copy <file|none>     copy document (default docs/website-copy-2026-10.md)
 *   --doc <LABEL=file>     another document section, repeatable
 *   --source <glob>        source files, repeatable or comma separated; "!glob" excludes
 *   --screenshots <dir>    folder with a tiles/ subfolder (default screenshots)
 *   --tiles <dir>          the tiles folder itself (default <screenshots>/tiles)
 *   --exclude-tiles <p,q>  tile filename prefixes to skip (default intake-,style-)
 *   --max-images <n>       cap on images sent (default: all)
 *   --image <file>         extra image, repeatable (default public/og.png)
 *   --diff <range>         include `git diff <range>` as a section, e.g. main...HEAD
 *
 * Provider options
 *   --only <ids>           providers to run (default gemini,openai,xai; add claude to opt in)
 *   --via-codex            use the Codex CLI for openai even when OPENAI_API_KEY is set
 *   --out <dir>            output folder (default review-out); rounds after the first write to <out>/round-N
 *   --round <n>            review round (default 1); 2 and up need --log
 *   --log <file>           the merged findings log from the previous round
 *   --timeout <minutes>    per-provider timeout (default 15)
 *
 * Environment equivalents: OUT, SCREENSHOTS, ONLY, DRY_RUN=1, EMIT=1, ROUND, LOG,
 * REVIEW_TIMEOUT_MINUTES. <PROVIDER>_API_BASE points a provider at another base
 * URL (tests, gateways). When HTTPS_PROXY is set the script re-runs itself with
 * Node's --use-env-proxy so fetch honors the proxy; set NODE_USE_ENV_PROXY=0 to stop that.
 */
import { readFile, readdir, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOG_HEADERS, cell, formatTable, parseLogFindings } from './lib/review-log.mjs';

// --- Proxy guard -------------------------------------------------------------
// Node's fetch ignores HTTPS_PROXY unless started with --use-env-proxy (Node 22.21+).
// Cloud sessions route everything through such a proxy, so re-run with the flag.
if (
  process.env.HTTPS_PROXY &&
  !process.env.NODE_USE_ENV_PROXY &&
  !process.execArgv.includes('--use-env-proxy') &&
  process.allowedNodeEnvironmentFlags.has('--use-env-proxy')
) {
  const flags = ['--use-env-proxy'];
  // The proxy agent prints an "experimental" warning on every run; it is not actionable here.
  if (process.allowedNodeEnvironmentFlags.has('--disable-warning')) flags.push('--disable-warning=UNDICI-EHPA');
  const child = spawnSync(process.execPath, [...flags, ...process.execArgv, ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(child.status ?? 1);
}

// --- Arguments ---------------------------------------------------------------
const REPEATABLE = new Set(['doc', 'source', 'image']);
const FLAGS = new Set(['check', 'dry-run', 'emit', 'via-codex', 'help']);

function parseArgs(argv) {
  const args = { doc: [], source: [], image: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    let [name, value] = arg.slice(2).split(/=(.*)/s);
    if (FLAGS.has(name)) {
      args[name] = value === undefined ? true : value !== '0' && value !== 'false';
      continue;
    }
    if (value === undefined) {
      value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) throw new Error(`--${name} needs a value`);
      i += 1;
    }
    if (REPEATABLE.has(name)) {
      args[name].push(...(name === 'doc' ? [value] : value.split(',').map((s) => s.trim()).filter(Boolean)));
    } else {
      args[name] = value;
    }
  }
  return args;
}

let args;
try {
  args = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exit(2);
}
if (args.help) {
  const self = await readFile(fileURLToPath(import.meta.url), 'utf8');
  const header = self.slice(self.indexOf('/**') + 3, self.indexOf('*/'));
  console.log(header.replace(/^ \* ?/gm, '').trim());
  process.exit(0);
}

// --- Defaults: this site -----------------------------------------------------
const SITE = {
  brief: 'docs/review-brief.md',
  spec: 'docs/design-spec.md',
  copy: 'docs/website-copy-2026-10.md',
  sources: [
    'index.html',
    'App.tsx',
    'styles/*.css',
    'components/**/*.tsx',
    'hooks/*.ts',
    'lib/*.ts',
    'pages/*.tsx',
    '!pages/IntakePage.tsx',
    '!pages/StylePage.tsx',
    '!pages/OgPage.tsx',
  ],
  screenshots: 'screenshots',
  excludeTiles: ['intake-', 'style-'],
  images: ['public/og.png'],
};

const ROOT = path.resolve(args.root || process.env.REVIEW_ROOT || process.cwd());
const ROUND = Number(args.round || process.env.ROUND || 1);
const BASE_OUT = args.out || process.env.OUT || 'review-out';
const OUT = path.resolve(ROUND > 1 ? path.join(BASE_OUT, `round-${ROUND}`) : BASE_OUT);
const LOG = args.log || process.env.LOG || '';
const ONLY = (args.only || process.env.ONLY || 'gemini,openai,xai')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)
  .map((id) => (id === 'codex' ? 'openai' : id === 'anthropic' ? 'claude' : id === 'grok' ? 'xai' : id));
const DRY_RUN = args['dry-run'] || process.env.DRY_RUN === '1';
const EMIT = args.emit || process.env.EMIT === '1';
const CHECK = Boolean(args.check);
const VIA_CODEX = args['via-codex'] || process.env.OPENAI_VIA === 'codex';
const TIMEOUT_MS = Number(args.timeout || process.env.REVIEW_TIMEOUT_MINUTES || 15) * 60 * 1000;
const SCREENSHOTS = args.screenshots || process.env.SCREENSHOTS || SITE.screenshots;
const TILES_DIR = path.resolve(ROOT, args.tiles || path.join(SCREENSHOTS, 'tiles'));
const EXCLUDE_TILES = (args['exclude-tiles'] ?? SITE.excludeTiles.join(','))
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const MAX_IMAGES = args['max-images'] ? Number(args['max-images']) : Infinity;
const BRIEF_PATH = args.brief || SITE.brief;

const docs = [];
const specPath = args.spec ?? SITE.spec;
const copyPath = args.copy ?? SITE.copy;
if (specPath && specPath !== 'none') docs.push({ label: 'DESIGN SPEC', file: specPath });
if (copyPath && copyPath !== 'none') docs.push({ label: 'COPY DOCUMENT', file: copyPath });
for (const entry of args.doc) {
  const [label, file] = entry.includes('=') ? entry.split(/=(.*)/s) : [path.basename(entry), entry];
  docs.push({ label: label.toUpperCase(), file });
}
const sourcePatterns = args.source.length ? args.source : SITE.sources;
const extraImages = args.image.length ? args.image : SITE.images;

// --- Helpers -----------------------------------------------------------------
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
const tokens = (chars) => `${Math.round(chars / 4 / 1000)}K tokens`;
const exists = (file) => access(file).then(() => true, () => false);

async function readText(relative) {
  return readFile(path.resolve(ROOT, relative), 'utf8');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Minimal glob: ** (any depth), * (within a segment), ?, and {a,b}. */
function globToRegExp(glob) {
  let re = '^';
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        if (glob[i + 2] === '/') {
          re += '(?:.*/)?';
          i += 2;
        } else {
          re += '.*';
          i += 1;
        }
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else if (c === '{') {
      const end = glob.indexOf('}', i);
      if (end > i) {
        re += `(?:${glob.slice(i + 1, end).split(',').map(escapeRegExp).join('|')})`;
        i = end;
      } else {
        re += '\\{';
      }
    } else {
      re += escapeRegExp(c);
    }
  }
  return new RegExp(`${re}$`);
}

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'dist-ssr', 'review-out', 'screenshots']);
let fileListCache = null;

async function listFiles() {
  if (fileListCache) return fileListCache;
  const files = [];
  async function walk(relativeDir) {
    const entries = await readdir(path.join(ROOT, relativeDir), { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const relative = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        const isOutput = path.resolve(ROOT, relative) === path.resolve(BASE_OUT);
        if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith('.') && !isOutput) await walk(relative);
      } else if (entry.isFile()) {
        files.push(relative);
      }
    }
  }
  await walk('');
  fileListCache = files;
  return files;
}

const hasGlobChars = (pattern) => /[*?{]/.test(pattern);

/** Expands the source patterns in order; literal paths that are missing are kept and flagged. */
async function expandSources(patterns) {
  const selected = [];
  const missing = [];
  const seen = new Set();
  for (const pattern of patterns.filter((p) => !p.startsWith('!'))) {
    const normalized = pattern.replace(/^\.\//, '');
    if (!hasGlobChars(normalized)) {
      if (!seen.has(normalized)) {
        seen.add(normalized);
        selected.push(normalized);
        if (!(await exists(path.resolve(ROOT, normalized)))) missing.push(normalized);
      }
      continue;
    }
    const re = globToRegExp(normalized);
    const matches = (await listFiles()).filter((file) => re.test(file));
    if (!matches.length) missing.push(pattern);
    for (const file of matches) {
      if (!seen.has(file)) {
        seen.add(file);
        selected.push(file);
      }
    }
  }
  const excludes = patterns.filter((p) => p.startsWith('!')).map((p) => globToRegExp(p.slice(1).replace(/^\.\//, '')));
  return {
    files: selected.filter((file) => !excludes.some((re) => re.test(file))),
    missing,
  };
}

// --- Packet ------------------------------------------------------------------
async function buildPacket() {
  const sections = [];
  const notes = [];
  for (const doc of docs) {
    try {
      sections.push({ title: doc.label, body: await readText(doc.file), file: doc.file });
    } catch {
      notes.push(`document missing: ${doc.file}`);
      sections.push({ title: doc.label, body: `(missing: ${doc.file})`, file: doc.file });
    }
  }

  const { files, missing } = await expandSources(sourcePatterns);
  for (const item of missing) notes.push(`no source matched: ${item}`);
  const sourceParts = [];
  for (const file of files) {
    try {
      sourceParts.push(`\n\n===== ${file} =====\n${await readText(file)}`);
    } catch {
      sourceParts.push(`\n\n===== ${file} =====\n(missing)`);
    }
  }
  sections.push({ title: 'SITE SOURCE', body: `${files.length} files follow.${sourceParts.join('')}`, files });

  if (args.diff) {
    try {
      const diff = execFileSync('git', ['diff', '--stat', '-p', args.diff], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
      sections.push({ title: `DIFF (git diff ${args.diff})`, body: diff || '(empty diff)' });
    } catch (error) {
      notes.push(`git diff ${args.diff} failed: ${String(error.message).split('\n')[0]}`);
    }
  }

  const images = [];
  let tileNames = [];
  try {
    tileNames = (await readdir(TILES_DIR)).filter((f) => f.toLowerCase().endsWith('.png')).sort();
  } catch {
    notes.push(`no tiles folder at ${path.relative(ROOT, TILES_DIR) || '.'} (run the screenshot script with TILES=1, or pass --tiles)`);
  }
  for (const name of tileNames) {
    if (EXCLUDE_TILES.some((prefix) => name.startsWith(prefix))) continue;
    images.push({ name, file: name, source: path.join(TILES_DIR, name) });
  }
  for (const file of extraImages) {
    const source = path.resolve(ROOT, file);
    if (await exists(source)) {
      images.push({ name: `${path.basename(file)} (${file})`, file: path.basename(file), source });
    } else {
      notes.push(`image missing: ${file}`);
    }
  }
  const trimmed = images.slice(0, MAX_IMAGES);
  if (trimmed.length < images.length) notes.push(`images capped at ${MAX_IMAGES} of ${images.length}`);
  for (const image of trimmed) {
    const data = await readFile(image.source);
    image.base64 = data.toString('base64');
    image.bytes = data.length;
  }

  const text = sections.map((section, index) => `# PACKET ${index + 1}: ${section.title}\n\n${section.body}`).join('\n\n');
  const imageIntro = trimmed.length
    ? `\n\n# PACKET ${sections.length + 1}: SCREENSHOTS\n${trimmed.length} images follow, in this order:\n${trimmed
        .map((image, index) => `${index + 1}. ${image.name}`)
        .join('\n')}\n`
    : '\n\n(No screenshots are included in this packet.)\n';
  const hash = createHash('sha256');
  hash.update(text);
  for (const image of trimmed) hash.update(image.base64);
  return { sections, text, imageIntro, images: trimmed, notes, sourceFiles: files, hash: hash.digest('hex').slice(0, 12) };
}

async function loadBrief() {
  const briefFile = path.resolve(ROOT, BRIEF_PATH);
  if (!(await exists(briefFile))) {
    throw new Error(
      `Brief not found: ${BRIEF_PATH}. Write one (the skill's references/brief-template.md is a starting point) or pass --brief <file>.`
    );
  }
  let brief = (await readFile(briefFile, 'utf8')).trim();
  if (ROUND > 1) brief += `\n\n${await roundPreamble()}`;
  return brief;
}

/** Round 2 and later: the previous findings with their dispositions, and what to do with them. */
async function roundPreamble() {
  if (!LOG) throw new Error(`--round ${ROUND} needs --log <the merged findings log from the previous round>`);
  const logFile = path.resolve(ROOT, LOG);
  if (!(await exists(logFile))) throw new Error(`Log not found: ${LOG}`);
  const rows = [...parseLogFindings(await readFile(logFile, 'utf8')).values()];
  if (!rows.length) throw new Error(`No findings table (headers ${LOG_HEADERS.join(', ')}) in ${LOG}`);
  const table = formatTable(LOG_HEADERS, rows);
  return [
    `# ROUND ${ROUND}`,
    '',
    `This is review round ${ROUND}. The packet below is the current state of the project after the author worked through the previous round. The previous findings and the author's disposition for each follow. A disposition starting with "fixed" claims the problem is gone; "declined" gives a reason for not changing it; "deferred" means the owner decides later; "duplicate of" points at the finding that carries the disposition.`,
    '',
    table,
    '',
    `OUTPUT FORMAT FOR ROUND ${ROUND}`,
    'Markdown, in exactly this structure; a script merges it.',
    '',
    '## Verdict',
    'Two to four sentences: is it ready now, and what is the biggest remaining risk?',
    '',
    '## Confirmations',
    'One row per finding whose disposition starts with "fixed" or "declined" (skip deferred and duplicates). Verdict is one of: confirmed, not fixed, partial, reason holds, reason disputed. Evidence names what you saw in the packet.',
    '',
    '| ID | Verdict | Evidence |',
    '| --- | --- | --- |',
    '',
    '## New findings',
    'Only problems that are new since the previous round (regressions or side effects of the fixes), numbered from 1, in the same shape as before: a "### 1. Short title" heading, then Severity, Where, What, Why and Fix lines. Write "None." if there are none.',
  ].join('\n');
}

// --- Providers ---------------------------------------------------------------
const PROVIDERS = {
  gemini: {
    id: 'gemini',
    label: 'Google Gemini',
    keyVar: 'GEMINI_API_KEY',
    model: process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview',
    base: (process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/$/, ''),
    chatUrl: 'https://gemini.google.com',
    chatName: 'the Gemini app',
    chatModelHint: 'the most capable Pro model, with thinking on',
    family: 'gemini',
  },
  openai: {
    id: 'openai',
    label: 'OpenAI',
    keyVar: 'OPENAI_API_KEY',
    model: process.env.OPENAI_MODEL || 'gpt-5.5',
    base: (process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, ''),
    chatUrl: 'https://chatgpt.com',
    chatName: 'ChatGPT',
    chatModelHint: 'the most capable GPT-5 model with extended thinking (Thinking or Pro)',
    family: 'gpt',
  },
  xai: {
    id: 'xai',
    label: 'xAI Grok',
    keyVar: 'XAI_API_KEY',
    model: process.env.XAI_MODEL || 'grok-4.6',
    base: (process.env.XAI_API_BASE || 'https://api.x.ai/v1').replace(/\/$/, ''),
    chatUrl: 'https://grok.com',
    chatName: 'Grok',
    chatModelHint: 'the most capable Grok model, in Expert or Heavy mode',
    family: 'grok',
  },
  claude: {
    id: 'claude',
    label: 'Anthropic Claude (independent session)',
    keyVar: 'ANTHROPIC_API_KEY',
    model: process.env.ANTHROPIC_MODEL || 'claude-opus-5-5',
    base: (process.env.ANTHROPIC_API_BASE || 'https://api.anthropic.com/v1').replace(/\/$/, ''),
    chatUrl: 'https://claude.ai',
    chatName: 'Claude',
    chatModelHint: 'the most capable model, in a fresh chat with no project or memory attached',
    family: 'claude',
    optional: true,
  },
};

function hostOf(provider) {
  return new URL(provider.base).host;
}

let codexStatusCache;
function codexStatus() {
  if (codexStatusCache) return codexStatusCache;
  if (process.env.CODEX === '0') return (codexStatusCache = { installed: false, disabled: true });
  const version = spawnSync('codex', ['--version'], { encoding: 'utf8' });
  if (version.error || version.status !== 0) return (codexStatusCache = { installed: false });
  const login = spawnSync('codex', ['login', 'status'], { encoding: 'utf8' });
  const output = `${login.stdout || ''}${login.stderr || ''}`.trim().split('\n')[0] || '';
  codexStatusCache = {
    installed: true,
    version: version.stdout.trim(),
    signedIn: login.status === 0 && !/not logged in/i.test(output),
    status: output,
  };
  return codexStatusCache;
}

/** How each selected provider will be reached: api, codex, or manual. */
function plan() {
  const chosen = [];
  for (const id of ONLY) {
    const provider = PROVIDERS[id];
    if (!provider) {
      console.error(`Unknown provider "${id}". Known: ${Object.keys(PROVIDERS).join(', ')}.`);
      process.exit(2);
    }
    const hasKey = Boolean(process.env[provider.keyVar]);
    let transport = hasKey ? 'api' : 'manual';
    let codex;
    if (id === 'openai' && (!hasKey || VIA_CODEX)) {
      codex = codexStatus();
      if (codex.installed && codex.signedIn) transport = 'codex';
    }
    chosen.push({ provider, transport, codex });
  }
  return chosen;
}

async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function postJson(url, headers, body, label) {
  const response = await withTimeout(
    fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) }),
    TIMEOUT_MS,
    label
  );
  const raw = await response.text();
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    json = { raw: raw.slice(0, 2000) };
  }
  if (!response.ok) {
    const error = new Error(`${label} HTTP ${response.status}: ${raw.slice(0, 800)}`);
    error.status = response.status;
    throw error;
  }
  return json;
}

async function callGemini(provider, brief, packet) {
  const url = `${provider.base}/models/${provider.model}:generateContent?key=${process.env[provider.keyVar]}`;
  const parts = [
    { text: brief },
    { text: packet.text + packet.imageIntro },
    ...packet.images.flatMap((image) => [
      { text: `Image: ${image.name}` },
      { inline_data: { mime_type: 'image/png', data: image.base64 } },
    ]),
  ];
  const body = { contents: [{ role: 'user', parts }], generationConfig: { temperature: 0.7, maxOutputTokens: 16384 } };
  const json = await postJson(url, {}, body, 'gemini');
  if (json.promptFeedback?.blockReason) throw new Error(`gemini blocked the prompt: ${json.promptFeedback.blockReason}`);
  const candidate = json.candidates?.[0];
  const text = (candidate?.content?.parts || [])
    .filter((part) => !part.thought)
    .map((part) => part.text || '')
    .join('');
  if (!text) throw new Error(`gemini returned no text (finishReason ${candidate?.finishReason || 'unknown'}): ${JSON.stringify(json).slice(0, 800)}`);
  return { text, note: candidate?.finishReason && candidate.finishReason !== 'STOP' ? `finishReason ${candidate.finishReason}` : '' };
}

async function callOpenAI(provider, brief, packet) {
  const content = [
    { type: 'input_text', text: brief },
    { type: 'input_text', text: packet.text + packet.imageIntro },
    ...packet.images.flatMap((image) => [
      { type: 'input_text', text: `Image: ${image.name}` },
      { type: 'input_image', image_url: `data:image/png;base64,${image.base64}`, detail: 'high' },
    ]),
  ];
  const body = { model: provider.model, input: [{ role: 'user', content }], max_output_tokens: 16384 };
  const effort = process.env.OPENAI_REASONING || (/^(gpt-5|o\d)/.test(provider.model) && !/chat/.test(provider.model) ? 'high' : '');
  if (effort && effort !== 'none') body.reasoning = { effort };
  const json = await postJson(`${provider.base}/responses`, { authorization: `Bearer ${process.env[provider.keyVar]}` }, body, 'openai');
  const text =
    json.output_text ||
    (json.output || [])
      .filter((item) => item.type === 'message')
      .flatMap((item) => item.content || [])
      .map((part) => part.text || '')
      .join('');
  if (!text) throw new Error(`openai returned no text (status ${json.status || 'unknown'}): ${JSON.stringify(json).slice(0, 800)}`);
  return { text, note: json.status && json.status !== 'completed' ? `status ${json.status}` : '' };
}

async function callXai(provider, brief, packet) {
  const content = [
    { type: 'text', text: brief },
    { type: 'text', text: packet.text + packet.imageIntro },
    ...packet.images.flatMap((image) => [
      { type: 'text', text: `Image: ${image.name}` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${image.base64}`, detail: 'high' } },
    ]),
  ];
  const body = { model: provider.model, messages: [{ role: 'user', content }], max_tokens: 16384, temperature: 0.7 };
  const json = await postJson(`${provider.base}/chat/completions`, { authorization: `Bearer ${process.env[provider.keyVar]}` }, body, 'xai');
  const text = json.choices?.[0]?.message?.content || '';
  if (!text) throw new Error(`xai returned no text: ${JSON.stringify(json).slice(0, 800)}`);
  const finish = json.choices?.[0]?.finish_reason;
  return { text, note: finish && finish !== 'stop' ? `finish_reason ${finish}` : '' };
}

async function callClaude(provider, brief, packet) {
  const content = [
    { type: 'text', text: brief },
    { type: 'text', text: packet.text + packet.imageIntro },
    ...packet.images.flatMap((image) => [
      { type: 'text', text: `Image: ${image.name}` },
      { type: 'image', source: { type: 'base64', media_type: 'image/png', data: image.base64 } },
    ]),
  ];
  const body = { model: provider.model, max_tokens: 16384, messages: [{ role: 'user', content }] };
  const json = await postJson(
    `${provider.base}/messages`,
    { 'x-api-key': process.env[provider.keyVar], 'anthropic-version': '2023-06-01' },
    body,
    'claude'
  );
  const text = (json.content || []).map((part) => part.text || '').join('');
  if (!text) throw new Error(`claude returned no text: ${JSON.stringify(json).slice(0, 800)}`);
  return { text, note: json.stop_reason && json.stop_reason !== 'end_turn' ? `stop_reason ${json.stop_reason}` : '' };
}

const API_CALLS = { gemini: callGemini, openai: callOpenAI, xai: callXai, claude: callClaude };

/** OpenAI through the Codex CLI: the packet folder is the working directory, images are attached. */
async function callCodex(provider, brief, packet, packetDir) {
  const lastMessage = path.join(OUT, 'openai.codex-last-message.md');
  const log = path.join(OUT, 'openai.codex.log');
  const cliArgs = ['exec', '--skip-git-repo-check', '--sandbox', 'read-only', '-C', packetDir, '--output-last-message', path.resolve(lastMessage)];
  if (process.env.CODEX_MODEL) cliArgs.push('-m', process.env.CODEX_MODEL);
  for (const image of packet.images) cliArgs.push('-i', path.join('images', image.file));
  cliArgs.push('-');
  const prompt = `${brief}\n\n${packet.text}${packet.imageIntro}\nThe images are attached in that order. The same text is in packet.md in the working directory and the images are in images/, in case you need to look again.\n`;
  await new Promise((resolve, reject) => {
    const child = spawn('codex', cliArgs, { stdio: ['pipe', 'pipe', 'pipe'], env: process.env });
    const chunks = [];
    child.stdout.on('data', (chunk) => chunks.push(chunk));
    child.stderr.on('data', (chunk) => chunks.push(chunk));
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`codex exec timed out after ${Math.round(TIMEOUT_MS / 1000)}s`));
    }, TIMEOUT_MS);
    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('close', async (code) => {
      clearTimeout(timer);
      await writeFile(log, Buffer.concat(chunks));
      if (code === 0) resolve();
      else reject(new Error(`codex exec exited with ${code}; see ${log}`));
    });
    child.stdin.on('error', () => undefined);
    child.stdin.end(prompt);
  });
  const text = (await readFile(lastMessage, 'utf8').catch(() => '')).trim();
  if (!text) throw new Error(`codex exec wrote no final message; see ${log}`);
  return { text, model: process.env.CODEX_MODEL || `codex default (${codexStatus().version || 'codex'})` };
}

/** Lists the model ids a provider serves, for --check and for "model not found" hints. */
async function listModels(provider) {
  const key = process.env[provider.keyVar];
  const headers = provider.id === 'claude' ? { 'x-api-key': key, 'anthropic-version': '2023-06-01' } : { authorization: `Bearer ${key}` };
  const url = provider.id === 'gemini' ? `${provider.base}/models?key=${key}&pageSize=1000` : `${provider.base}/models`;
  const response = await withTimeout(fetch(url, { headers: provider.id === 'gemini' ? {} : headers }), 30 * 1000, `${provider.id} models`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json = await response.json();
  const ids = provider.id === 'gemini' ? (json.models || []).map((m) => String(m.name).replace(/^models\//, '')) : (json.data || []).map((m) => m.id);
  return ids.sort();
}

async function modelHint(provider) {
  try {
    const ids = await listModels(provider);
    if (ids.includes(provider.model)) return { found: true, ids };
    const family = ids.filter((id) => id.startsWith(provider.family)).sort().reverse().slice(0, 10);
    return { found: false, ids, candidates: family };
  } catch (error) {
    return { error: error.message };
  }
}

/** Expected answer to GET /models without credentials: proof that the host was reached. */
const NO_KEY_STATUS = { gemini: 403, openai: 401, xai: 401, claude: 401 };

async function probeHost(provider) {
  try {
    const response = await withTimeout(fetch(`${provider.base}/models`, { method: 'GET' }), 15 * 1000, 'probe');
    if (response.status === NO_KEY_STATUS[provider.id]) return `reachable (HTTP ${response.status} without a key, as expected)`;
    if (response.status === 403 || response.status === 407) {
      return `HTTP ${response.status}: a server answered, but this API answers ${NO_KEY_STATUS[provider.id]} without a key, so an egress policy probably blocked the host`;
    }
    return `reachable (HTTP ${response.status} without a key)`;
  } catch (error) {
    const cause = error.cause?.message || error.cause?.code || error.message;
    if (/40[37]/.test(cause)) return `blocked by the network policy (the proxy refused the tunnel: ${cause})`;
    if (process.env.HTTPS_PROXY) return `unreachable through the proxy (${cause}); in a cloud session this means the network policy does not allow the host`;
    return `unreachable (${cause})`;
  }
}

function explain(error, provider) {
  const status = error.status;
  if (status === 401) return `The ${provider.keyVar} value was rejected (HTTP 401). Check the key.`;
  if (status === 403) return 'HTTP 403. In a cloud session this usually means the environment network policy does not allow this host; allow it in the environment settings and start a new session.';
  if (status === 404 || (status === 400 && /model/i.test(error.message))) return `The model "${provider.model}" was not accepted. Set ${provider.id === 'claude' ? 'ANTHROPIC' : provider.id.toUpperCase()}_MODEL to one the account can use (see the candidates below, from the provider's model list).`;
  if (status === 413 || /too large|payload|exceeds/i.test(error.message)) return 'The request was too large. Cut the packet: --max-images, --exclude-tiles, fewer --source globs.';
  if (status === 429) return 'HTTP 429: rate limit or quota. Wait and rerun with --only <provider>.';
  return '';
}

// --- Manual packet -----------------------------------------------------------
function replyHeader(id, modelNote) {
  return `# Adversarial review: ${id} (${modelNote})`;
}

async function writeManualPacket(brief, packet, manualProviders, allPlans) {
  const dir = path.join(OUT, 'packet');
  await mkdir(path.join(dir, 'images'), { recursive: true });
  await writeFile(path.join(dir, 'prompt.md'), `${brief}\n`);
  await writeFile(path.join(dir, 'packet.md'), `${packet.text}${packet.imageIntro}`);
  for (const image of packet.images) await copyFile(image.source, path.join(dir, 'images', image.file));
  const imageBytes = packet.images.reduce((sum, image) => sum + image.bytes, 0);
  await writeFile(
    path.join(dir, 'manifest.json'),
    `${JSON.stringify(
      {
        written: new Date().toISOString(),
        round: ROUND,
        root: ROOT,
        brief: BRIEF_PATH,
        documents: docs,
        sourceFiles: packet.sourceFiles,
        images: packet.images.map((image) => image.file),
        packetHash: packet.hash,
        textBytes: Buffer.byteLength(packet.text + packet.imageIntro),
        imageBytes,
        providers: allPlans.map(({ provider, transport }) => ({ id: provider.id, transport, model: provider.model })),
      },
      null,
      2
    )}\n`
  );

  const outRel = path.relative(process.cwd(), OUT) || '.';
  const logArg = LOG ? ` --log ${LOG}` : '';
  const roundArg = ROUND > 1 ? ` --round ${ROUND}` : '';
  const lines = [
    `# Manual review packet (round ${ROUND})`,
    '',
    `Written ${new Date().toISOString()}. The providers below have no automated path from this machine, so the same packet goes through their chat apps by hand. Each reply is saved as a markdown file in \`${outRel}/\` and merged with the others.`,
    '',
    'What is in this folder',
    '',
    `- \`prompt.md\`: the brief (${kb(Buffer.byteLength(brief))}). This is the message text.`,
    `- \`packet.md\`: the documents, the source and the image index (${kb(Buffer.byteLength(packet.text + packet.imageIntro))}, about ${tokens(packet.text.length)}). Attach it as a file; if the app refuses \`.md\`, rename a copy to \`packet.txt\`.`,
    `- \`images/\`: ${packet.images.length} PNG files (${mb(imageBytes)}). Attach all of them in filename order; the index at the end of packet.md lists the order.`,
    '',
    'Same steps for every provider',
    '',
    '1. Start a new chat with no project, memory or custom instructions attached. Pick the model named below.',
    '2. Attach `packet.md` and every file in `images/`. If the app limits attachments per message, send the images over several messages that say only "Screenshots, part i of n; wait for the brief." and send the brief last.',
    '3. Paste the whole of `prompt.md` as the message text and send.',
    '4. If the reply stops early, send "Continue from where you stopped." and append the continuation to the same file.',
    '5. Save the complete reply as the file named below, with the given first line (the merge step reads the provider and model from it).',
    `6. Run \`node scripts/merge-reviews.mjs --out ${outRel}${roundArg}${logArg}\` to add the reply to the findings log.`,
    '',
  ];
  for (const { provider, codex } of manualProviders) {
    const file = path.join(outRel, `${provider.id}.md`);
    lines.push(`## ${provider.id}: ${provider.label}`, '');
    lines.push(`- Open ${provider.chatUrl} (${provider.chatName}) and choose ${provider.chatModelHint}.`);
    if (provider.id === 'openai') {
      lines.push(
        `- No \`${provider.keyVar}\` in this environment${codex?.installed ? ` and the Codex CLI is installed but ${codex.signedIn ? 'unusable' : 'not signed in'} (${codex.status || 'codex login status failed'})` : ' and the Codex CLI is not installed'}. A ChatGPT subscription is not an API key, but it can sign the Codex CLI in: \`npm i -g @openai/codex && codex login\`, then rerun this script and the review goes through Codex without pasting.`
      );
    } else if (provider.id === 'xai') {
      lines.push(`- No \`${provider.keyVar}\` in this environment. Grok has no subscription API, so without a key this is the only path.`);
    } else if (provider.id === 'claude') {
      lines.push(`- No \`${provider.keyVar}\` in this environment. Use a fresh chat so the reviewer has no memory of this work.`);
    } else {
      lines.push(`- No \`${provider.keyVar}\` in this environment.`);
    }
    lines.push(`- Save the reply to \`${file}\` with this first line, then a blank line, then the reply:`, '', '  ```', `  ${replyHeader(provider.id, 'manual, <model you used> via ' + new URL(provider.chatUrl).host)}`, '  ```', '');
  }
  const automated = allPlans.filter(({ transport }) => transport !== 'manual');
  if (automated.length) {
    lines.push('Handled automatically by this run: ' + automated.map(({ provider, transport }) => `${provider.id} (${transport})`).join(', ') + '.', '');
  }
  await writeFile(path.join(dir, 'INSTRUCTIONS.md'), `${lines.join('\n')}\n`);
  return dir;
}

// --- Check mode --------------------------------------------------------------
async function check(plans) {
  console.log(`External review check (round ${ROUND}, root ${ROOT})`);
  console.log('');
  for (const { provider, transport, codex } of plans) {
    const host = hostOf(provider);
    const reach = await probeHost(provider);
    const parts = [`${provider.id.padEnd(7)} ${transport.padEnd(7)} model ${provider.model}`, `host ${host}: ${reach}`];
    if (transport === 'api') {
      const hint = await modelHint(provider);
      if (hint.error) parts.push(`model list: could not read (${hint.error})`);
      else if (hint.found) parts.push('model: listed by the provider');
      else parts.push(`model: NOT listed by the provider; candidates: ${hint.candidates.join(', ') || hint.ids.slice(-10).join(', ')}`);
    } else if (transport === 'codex') {
      parts.push(`codex: ${codex.version}, ${codex.status}`);
    } else {
      const codexNote = codex?.disabled ? 'disabled (CODEX=0)' : codex?.installed ? `${codex.version}, ${codex.status || 'not signed in'}` : 'not installed';
      parts.push(`no ${provider.keyVar}` + (provider.id === 'openai' ? `; codex CLI ${codexNote}` : '') + ' -> manual packet');
    }
    console.log(parts.join('\n          '));
  }
  const skipped = Object.values(PROVIDERS).filter((provider) => !ONLY.includes(provider.id));
  if (skipped.length) console.log(`\nnot selected: ${skipped.map((p) => `${p.id}${p.optional ? ' (opt in with --only ...,claude)' : ''}`).join(', ')}`);
  console.log('');
  const packet = await buildPacket();
  await reportPacket(packet);
  const briefOk = await exists(path.resolve(ROOT, BRIEF_PATH));
  console.log(`brief: ${briefOk ? BRIEF_PATH : `MISSING ${BRIEF_PATH}`}`);
  if (ROUND > 1) console.log(`log: ${LOG ? (await exists(path.resolve(ROOT, LOG)) ? LOG : `MISSING ${LOG}`) : 'MISSING (--log is required for round 2+)'}`);
  if (process.env.HTTPS_PROXY) console.log(`proxy: HTTPS_PROXY is set; fetch ${process.env.NODE_USE_ENV_PROXY === '1' ? 'honors it (--use-env-proxy)' : 'may ignore it on this Node version'}`);
}

async function reportPacket(packet) {
  const imageBytes = packet.images.reduce((sum, image) => sum + image.bytes, 0);
  console.log(
    `packet: ${kb(packet.text.length)} of text (about ${tokens(packet.text.length)}), ${packet.sourceFiles.length} source files, ${packet.images.length} images (${mb(imageBytes)}), hash ${packet.hash}`
  );
  for (const section of packet.sections) console.log(`  section: ${section.title}${section.file ? ` (${section.file})` : ''}${section.files ? ` (${section.files.length} files)` : ''}`);
  for (const note of packet.notes) console.log(`  note: ${note}`);
  if (packet.text.length / 4 > 250000) console.log('  note: over 250K tokens; models with smaller windows will refuse. Trim --source or split the review.');
  if (imageBytes > 15 * 1024 * 1024) console.log('  note: over 15 MB of images; Gemini inline requests are capped at 20 MB in total. Use --max-images or --exclude-tiles.');
}

// --- Main --------------------------------------------------------------------
const plans = plan();
await mkdir(OUT, { recursive: true });

if (CHECK) {
  await check(plans);
  process.exit(0);
}

const packet = await buildPacket();
await reportPacket(packet);
if (ROUND > 1 && !LOG) {
  console.error(`--round ${ROUND} needs --log <findings log from the previous round>`);
  process.exit(2);
}
let brief;
try {
  brief = await loadBrief();
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const manual = plans.filter(({ transport }) => transport === 'manual');
const needsPacketDir = EMIT || DRY_RUN || manual.length > 0 || plans.some(({ transport }) => transport === 'codex');
let packetDir = null;
if (needsPacketDir) {
  packetDir = await writeManualPacket(brief, packet, manual, plans);
  console.log(`wrote the packet for manual use to ${path.relative(process.cwd(), packetDir)}${manual.length ? ` (INSTRUCTIONS.md covers ${manual.map(({ provider }) => provider.id).join(', ')})` : ''}`);
}

if (DRY_RUN) {
  for (const { provider, transport } of plans) console.log(`${provider.id}: would use ${transport}${transport === 'manual' ? '' : ` (${provider.model})`}`);
  console.log('dry run: nothing sent.');
  process.exit(0);
}

const results = await Promise.allSettled(
  plans
    .filter(({ transport }) => transport !== 'manual')
    .map(async ({ provider, transport }) => {
      const started = Date.now();
      const file = path.join(OUT, `${provider.id}.md`);
      try {
        const result = transport === 'codex' ? await callCodex(provider, brief, packet, packetDir) : await API_CALLS[provider.id](provider, brief, packet);
        const model = result.model || provider.model;
        const seconds = Math.round((Date.now() - started) / 1000);
        const meta = { provider: provider.id, model, transport, round: ROUND, packetHash: packet.hash, generated: new Date().toISOString(), seconds };
        await writeFile(
          file,
          `${replyHeader(provider.id, model)}\n<!-- external-review: ${JSON.stringify(meta)} -->\n\nGenerated ${meta.generated} in ${seconds}s via ${transport}${result.note ? ` (${result.note})` : ''}. Round ${ROUND}.\n\n${result.text.trim()}\n`
        );
        console.log(`${provider.id}: wrote ${path.relative(process.cwd(), file)} (${result.text.length} chars, ${seconds}s, ${transport})`);
        return { provider: provider.id, ok: true };
      } catch (error) {
        const errorFile = path.join(OUT, `${provider.id}.error.txt`);
        const hint = explain(error, provider);
        let candidates = '';
        if (transport === 'api' && (error.status === 404 || error.status === 400)) {
          const info = await modelHint(provider);
          if (info.candidates) candidates = `\nModels this key can use (${provider.family}*): ${info.candidates.join(', ')}\n`;
        }
        await writeFile(errorFile, `${provider.id} (${transport}, model ${provider.model}) failed at ${new Date().toISOString()}\n\n${hint}\n${candidates}\n${error.stack || error}\n`);
        console.log(`${provider.id}: FAILED (${String(error.message).split('\n')[0].slice(0, 160)}); see ${path.relative(process.cwd(), errorFile)}`);
        return { provider: provider.id, ok: false };
      }
    })
);

const sent = results.filter((r) => r.status === 'fulfilled' && r.value.ok).length;
const failed = results.length - sent;
if (manual.length) {
  console.log(
    `${manual.map(({ provider }) => provider.id).join(', ')}: no automated path; follow ${path.relative(process.cwd(), path.join(packetDir, 'INSTRUCTIONS.md'))}`
  );
}
console.log(`done: ${sent} automated repl${sent === 1 ? 'y' : 'ies'}, ${failed} failed, ${manual.length} manual.`);
if (!results.length && !manual.length) console.log('nothing selected; use --only with one of ' + Object.keys(PROVIDERS).join(', '));
process.exitCode = failed > 0 ? 1 : 0;
