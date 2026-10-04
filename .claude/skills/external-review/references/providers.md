# Providers: how each one is reached

`scripts/adversarial-review.mjs` sends one user turn per provider: the brief, the packet text (documents, source, image index), then each image preceded by its name. Replies are written as `# Adversarial review: <provider> (<model>)` plus an HTML comment with JSON metadata (`provider`, `model`, `transport`, `round`, `packetHash`), which the merge step reads. Hand-pasted replies carry only the header line; the merge step accepts both.

Every provider has a `<PROVIDER>_API_BASE` override for the base URL (tests, gateways): `GEMINI_API_BASE`, `OPENAI_API_BASE`, `XAI_API_BASE`, `ANTHROPIC_API_BASE`.

## Google Gemini (`gemini`)

- Endpoint: `POST {base}/models/{model}:generateContent?key=GEMINI_API_KEY`, base `https://generativelanguage.googleapis.com/v1beta`.
- Payload: `contents[0].parts` of `{text}` and `{inline_data: {mime_type: "image/png", data: <base64>}}`; `generationConfig.maxOutputTokens` 16384, temperature 0.7.
- Reply: `candidates[0].content.parts[].text`; parts flagged `thought: true` are dropped. `promptFeedback.blockReason` is reported as a failure; a `finishReason` other than `STOP` is noted in the reply header.
- Models: `GET {base}/models?key=...` lists `models/<id>`; `--check` uses it to confirm `GEMINI_MODEL`. Default `gemini-3.1-pro-preview`. `gemini-2.5-pro` is retired in mid-October 2026 and was already closed to new users from September 2026.
- Limits: inline requests are capped at 20 MB in total, so the tiles plus the social image have to stay under that (`--max-images`, `--exclude-tiles`). The context window is 1M tokens.
- Errors: 400 with `API_KEY_INVALID` is the key; 403 without a key is the API's own answer (so a 403 in `--check` means the host was reached); 404 is the model name; 429 is quota; 503 is overload, rerun with `--only gemini`.

## OpenAI (`openai`)

### Through the API

- Endpoint: `POST {base}/responses`, base `https://api.openai.com/v1`, header `Authorization: Bearer OPENAI_API_KEY`.
- Payload: `input[0].content` of `{type: "input_text"}` and `{type: "input_image", image_url: "data:image/png;base64,...", detail: "high"}`; `max_output_tokens` 16384. For `gpt-5*` and `o*` models (not the `*chat*` variants) the request sets `reasoning.effort` to `high`; `OPENAI_REASONING` overrides it (`none` to omit).
- Reply: `output_text` when present, else the text of the `message` items in `output` (reasoning items are skipped). A `status` other than `completed` is noted in the header.
- Models: `GET {base}/models`. Default `gpt-5.5` (1M context, image input). `gpt-5` still works with a 400K window.
- Errors: 401 is the key; 403 from the machine is the network policy; 404 or a 400 naming the model is the model; 413 or "too large" is the packet.

### Through the Codex CLI (fallback when there is no key, or `--via-codex`)

- Detection: `codex --version` succeeds and `codex login status` exits 0 (it prints the sign-in mode; "Not logged in" counts as absent). `CODEX=0` skips the CLI entirely.
- Sign-in: `npm i -g @openai/codex`, then `codex login` (browser flow with a ChatGPT subscription) or `codex login --api-key`. ChatGPT sign-in talks to `chatgpt.com` and `auth.openai.com`; API-key sign-in talks to `api.openai.com`.
- Run: the script writes the manual packet first, then runs
  `codex exec --skip-git-repo-check --sandbox read-only -C review-out/packet --output-last-message <out>/openai.codex-last-message.md [-m CODEX_MODEL] -i images/<tile>.png ... -`
  with the brief and the packet text on stdin (`-` means read the prompt from stdin). `-i` is repeatable. The transcript goes to `<out>/openai.codex.log`; the final message becomes `<out>/openai.md` with transport `codex`.
- Model: `CODEX_MODEL` adds `-m`; otherwise the CLI's configured default is used and the reply header says `codex default (<cli version>)`.
- Known limits: the CLI attaches every image to the first turn, so very large tile sets may need `--max-images`. Repeated `codex exec` runs with ChatGPT sign-in can hit token refresh errors; rerun with `--only openai`.

## xAI Grok (`xai`)

- Endpoint: `POST {base}/chat/completions`, base `https://api.x.ai/v1`, header `Authorization: Bearer XAI_API_KEY` (OpenAI-compatible).
- Payload: `messages[0].content` of `{type: "text"}` and `{type: "image_url", image_url: {url: "data:image/png;base64,...", detail: "high"}}`; `max_tokens` 16384, temperature 0.7.
- Reply: `choices[0].message.content`; a `finish_reason` other than `stop` is noted.
- Models: `GET {base}/models`. Default `grok-4.6` (500K context, image input). `grok-4-0709` and the `grok-4-fast-*` names were retired on 15 May 2026; the slugs still resolve to newer models.
- No subscription path: a Grok or X Premium subscription gives no API access, so without `XAI_API_KEY` the manual packet (grok.com) is the only route.

## Anthropic Claude (`claude`, opt in with `--only ...,claude`)

- The spec's review plan names an independent Claude session as a fourth reviewer. It is off by default because the session running this skill is itself Claude; the API call has no memory of the work, which is the point.
- Endpoint: `POST {base}/messages`, base `https://api.anthropic.com/v1`, headers `x-api-key: ANTHROPIC_API_KEY` and `anthropic-version: 2023-06-01`.
- Payload: `messages[0].content` of `{type: "text"}` and `{type: "image", source: {type: "base64", media_type: "image/png", data}}`; `max_tokens` 16384. Default model `claude-opus-5-5`.
- Reply: the `text` blocks of `content`; a `stop_reason` other than `end_turn` is noted.

## The manual packet

Written to `<out>/packet/` whenever a selected provider has no automated path, on `--dry-run`, on `--emit`, and before a Codex run:

- `prompt.md`: the brief, with the round-2 preamble when `--round 2`.
- `packet.md`: the documents, the source and the image index.
- `images/`: the tiles and extra images, in the order the index lists them.
- `manifest.json`: sizes, file lists, the packet hash, and the transport chosen per provider.
- `INSTRUCTIONS.md`: the paste steps per manual provider, the file to save the reply to, and its required first line `# Adversarial review: <provider> (manual, <model> via <host>)`.

## Round 2

`--round 2 --log <log>` appends a preamble to the brief: the Findings table from the log (ID, severity, source, where, what, fix, disposition) and an output format with a `## Confirmations` table (`ID | Verdict | Evidence`, verdicts confirmed / not fixed / partial / reason holds / reason disputed) and a `## New findings` section. Replies land in `<out>/round-2/`. `merge-reviews.mjs --round 2 --log <log>` adds a `Round 2` block with the confirmations and appends the new findings to the table with IDs like `gemini-r2-1`.

## Testing without keys

`scripts/mock-providers.mjs` (in this skill folder) answers all four APIs on one port with a fixed reply in the brief's format, lists two models per provider, returns 404 for other model names and 401 for missing credentials, and prints what it received when stopped.

```bash
PORT=4321 node .claude/skills/external-review/scripts/mock-providers.mjs &
B=http://127.0.0.1:4321
GEMINI_API_KEY=x GEMINI_API_BASE=$B/gemini OPENAI_API_KEY=x OPENAI_API_BASE=$B/openai XAI_API_KEY=x XAI_API_BASE=$B/xai \
  node scripts/adversarial-review.mjs --out /tmp/review-test --max-images 2
node scripts/merge-reviews.mjs --out /tmp/review-test --log /tmp/review-test/log.md
kill %1
```

Expected: `gemini.md`, `openai.md` and `xai.md` in the output folder, and a log with six findings. A wrong model name (`XAI_MODEL=grok-9`) produces `xai.error.txt` listing the mock's candidates. The Codex path can be exercised the same way with a stub `codex` executable on `PATH` that answers `--version`, `login status` (exit 0) and `exec` (reads stdin, writes the `--output-last-message` file).
