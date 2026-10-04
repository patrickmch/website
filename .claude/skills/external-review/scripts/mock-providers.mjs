#!/usr/bin/env node
/**
 * A local stand-in for the four review providers, for testing the review
 * pipeline without keys. Serves on PORT (default 4321):
 *
 *   GET  /<provider>/models                  lists two model ids per provider
 *   POST /gemini/models/<model>:generateContent
 *   POST /openai/responses
 *   POST /xai/chat/completions
 *   POST /claude/messages
 *
 * Every POST needs some credential (bearer header, x-api-key header, or ?key=)
 * and a listed model; otherwise 401 or 404. Replies are in the brief's format.
 * On SIGTERM it prints the requests it saw (method, path, auth, bytes, images).
 *
 * Usage: see references/providers.md, "Testing without keys".
 */
import http from 'node:http';

const PORT = Number(process.env.PORT || 4321);
const MODELS = {
  gemini: ['gemini-3.1-pro-preview', 'gemini-3-flash-preview'],
  openai: ['gpt-5.5', 'gpt-5'],
  xai: ['grok-4.6', 'grok-4.5'],
  claude: ['claude-opus-5-5', 'claude-sonnet-5-5'],
};

const reply = (who) => `## Verdict
Mock verdict from ${who}. Nothing here is a real review.

## Findings

### 1. Mock finding from ${who}
- Severity: major
- Where: Home, hero
- What: Something is wrong.
- Why: It matters.
- Fix: Change it.

### 2. Second mock finding from ${who}
- Severity: minor
- Where: Footer
- What: A small thing.
- Why: Polish.
- Fix: Tweak it.

## What works
- The idea.

## Alternative directions
A different direction, in one paragraph.
`;

const seen = [];
const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    const url = new URL(req.url, 'http://localhost');
    const [, provider, ...rest] = url.pathname.split('/');
    const tail = decodeURIComponent(rest.join('/'));
    const json = (code, payload) => {
      res.writeHead(code, { 'content-type': 'application/json' });
      res.end(JSON.stringify(payload));
    };
    if (!MODELS[provider]) return json(404, { error: `unknown provider ${provider}` });
    let parsed = {};
    try {
      parsed = body ? JSON.parse(body) : {};
    } catch {
      parsed = {};
    }
    const auth = req.headers.authorization || req.headers['x-api-key'] || url.searchParams.get('key') || '';
    const model = parsed.model || tail.replace(/^models\//, '').split(':')[0];
    const images = (JSON.stringify(parsed).match(/base64/g) || []).length;
    seen.push(`${req.method} ${url.pathname} auth=${auth ? 'yes' : 'no'} bytes=${body.length} images=${images} model=${model}`);
    if (req.method === 'GET' && tail === 'models') {
      if (provider === 'gemini') return json(200, { models: MODELS.gemini.map((id) => ({ name: `models/${id}` })) });
      return json(200, { data: MODELS[provider].map((id) => ({ id })) });
    }
    if (!auth) return json(401, { error: { message: 'missing credentials' } });
    if (!MODELS[provider].includes(model)) return json(404, { error: { message: `model ${model} not found` } });
    if (provider === 'gemini') {
      return json(200, { candidates: [{ content: { parts: [{ text: 'thinking', thought: true }, { text: reply('gemini') }] }, finishReason: 'STOP' }] });
    }
    if (provider === 'openai') {
      return json(200, { status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: reply('openai') }] }] });
    }
    if (provider === 'xai') return json(200, { choices: [{ message: { content: reply('xai') }, finish_reason: 'stop' }] });
    return json(200, { content: [{ type: 'text', text: reply('claude') }], stop_reason: 'end_turn' });
  });
});

server.listen(PORT, '127.0.0.1', () => console.log(`mock providers on http://127.0.0.1:${PORT} (gemini, openai, xai, claude)`));
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(seen.join('\n') || '(no requests)');
    process.exit(0);
  });
}
