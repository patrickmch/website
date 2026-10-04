---
name: external-review
description: Run an external adversarial review of a design or code change by outside models (Google Gemini, OpenAI through the API or the signed-in Codex CLI, xAI Grok, optionally an independent Claude), merge every reply into one findings log with a disposition per finding, and run the confirmation round after the fixes. Use this whenever the user asks for an "external review", "adversarial review", "outside review" or "red team" of the site, the spec or a branch, asks to "get Gemini / Codex / ChatGPT / Grok to review" something, to "send the review packet", to merge or log review findings, or for "round two" of a review, even when they do not name the scripts. Also use it when they ask which keys, hosts or models the external review needs.
---

# External review

One packet, the same brief, several outside reviewers, one log. The scripts live in this repository and run from its root with `node`; `--help` on either prints every option.

- `scripts/adversarial-review.mjs` builds the packet and sends it, or writes it for pasting.
- `scripts/merge-reviews.mjs` turns the replies into `docs/design-review-<date>.md`.
- `scripts/screenshots.mjs` makes the page tiles the reviewers look at.
- `docs/review-brief.md` is the brief for this site; `references/brief-template.md` is the shape for anything else.

## Inputs

| Input | Default | Pass it with |
| --- | --- | --- |
| Target | the working tree | a branch or PR: check it out in a worktree (step 1); a folder: `--root <dir>` |
| Brief | `docs/review-brief.md` | `--brief <file>` |
| Packet | the spec, the copy doc, the site source globs, `screenshots/tiles`, `public/og.png` | `--spec`, `--copy`, `--doc LABEL=file`, `--source <glob>` (repeatable; `!glob` excludes), `--screenshots <dir>` or `--tiles <dir>`, `--image <file>`, `--diff <range>` |
| Providers | gemini, openai, xai | `--only gemini,openai,xai,claude` |
| Output folder | `review-out/`; later rounds in `review-out/round-N/` | `--out <dir>` |
| Log | `docs/design-review-<today>.md` | `--log <file>` on the merge, and on round 2 of the review |

## Procedure

Each step has a command and a check. Say what the check showed before moving on.

### 0. Preflight

```bash
node scripts/adversarial-review.mjs --check
```

It prints, per provider, the transport it would use (api, codex, manual), whether the host answers from this machine, and whether the model is one the key can use. Act on it before sending:

- No key: that provider becomes a manual packet. Tell the user now (Setup below says where keys go) and carry on with the others.
- Host blocked: the same, and name the host.
- Model not listed: set the `*_MODEL` variable to one of the candidates it printed.

When every provider is manual, the run still produces the packet and the instructions; that is the deliverable in that case, not a failure.

### 1. Put the target in a tree

- The current branch: nothing to do.
- Another branch: `git fetch origin <branch> && git worktree add ../review-<branch> origin/<branch>`, then `cd` there and `npm ci`. Run the rest from that folder.
- A pull request: `git fetch origin pull/<n>/head:pr-<n>`, then treat it as a branch, and add `--diff origin/<base>...HEAD` to the send so the reviewers see the change itself.
- A folder: `--root <dir>` on the review script. The screenshots have to come from that tree as well.

### 2. Make the tiles

```bash
TILES=1 npm run screenshots                 # dev server; MODE=preview after npm run build for the production bundle
```

Needs Playwright with Chromium: `PLAYWRIGHT_PATH=/path/to/node_modules/playwright` for a global install, `CHROMIUM_PATH` for a browser binary outside Playwright's cache. Read the Problems list it prints: font-host failures from a sandbox are not site defects; horizontal overflow is a finding in its own right. A target without a UI skips this step, and the packet has no images, which the script says out loud.

### 3. Confirm the brief

`docs/review-brief.md` describes this site and the questions to put to the reviewers. For another target, write a brief from `references/brief-template.md` into the output folder and pass `--brief`. Keep the OUTPUT FORMAT section word for word: the merge step parses that shape.

### 4. Dry run

```bash
node scripts/adversarial-review.mjs --dry-run
```

Sizes and sections. Over about 250K tokens of text: narrow `--source`. Over 15 MB of images: `--max-images` or `--exclude-tiles`. The dry run also writes `review-out/packet/`, which is the manual packet.

### 5. Send

```bash
node scripts/adversarial-review.mjs            # --only xai to repeat one provider
```

Run it in the background with a generous timeout; each provider takes minutes. It writes `review-out/<provider>.md` per reply, `review-out/<provider>.error.txt` per failure (with the reason and what to change), and `review-out/packet/INSTRUCTIONS.md` when any provider is manual. Read every error file and act on it: 401 is the key, 403 or unreachable is the network policy, 404 is the model name, 413 is the packet size.

### 6. Hand over the manual packet

When a provider is manual, relay its section of `review-out/packet/INSTRUCTIONS.md` to the user verbatim: the chat app, the model to pick, the files to attach, the file to save the reply to and its first line. Then stop; the user pastes, and the review continues at step 7 when the reply file exists. Do not paraphrase the save path or the header line, the merge depends on them.

### 7. Merge

```bash
node scripts/merge-reviews.mjs --log docs/design-review-<date>.md
```

Writes the Reviewers, Findings and Verdicts blocks. Rerun it whenever a reply file changes: dispositions already in the table are kept, rows are never removed, and text outside the marked blocks stays as it is.

### 8. Disposition every finding

Open the log and work the Findings table top down, blockers first:

- The same problem from two reviewers: keep the best-described row and mark the others `duplicate of <ID>`.
- Blockers and majors: fix, commit, write `fixed (<short sha>)`.
- Minors and taste: fix when it is cheap and within the repository's rules (CLAUDE.md: copy changes go to the copy doc first, every color is a token, no gradients or shadows). Otherwise `declined: <reason>` or `deferred: <the decision the owner has to make>`.
- A finding that has its facts wrong: `declined: <what is actually the case>`.

No row is still `open` when you report. Each disposition is a sentence the owner can read without opening the reply.

### 9. Round 2, the confirmation

After the fixes are committed, redo step 2, then:

```bash
node scripts/adversarial-review.mjs --round 2 --log docs/design-review-<date>.md
node scripts/merge-reviews.mjs --round 2 --log docs/design-review-<date>.md
```

The reviewers get the packet rebuilt from the fixed tree plus the findings table with its dispositions, and answer with a Confirmations table (confirmed, not fixed, partial, reason holds, reason disputed) and any new findings. The merge adds a Round 2 block and the new findings (IDs containing `r2`). Work the "not fixed" and "partial" rows and the new findings exactly as in step 8.

### 10. Report

Counts by severity; how many were fixed, declined and deferred; the deferred items as the questions the owner has to answer; which providers were manual and are still outstanding; the path of the log. Numbers go in a short table, not in prose.

## Provider paths

| Provider | Automated when | Otherwise | Reply file | Model |
| --- | --- | --- | --- | --- |
| gemini | `GEMINI_API_KEY` is set | manual packet, gemini.google.com | `review-out/gemini.md` | `GEMINI_MODEL`, default `gemini-3.1-pro-preview` |
| openai | `OPENAI_API_KEY` is set; else the Codex CLI is installed and signed in (`codex login status` exits 0) | manual packet, chatgpt.com | `review-out/openai.md` | `OPENAI_MODEL`, default `gpt-5.5`; `CODEX_MODEL` for the CLI, its own default otherwise |
| xai | `XAI_API_KEY` is set | manual packet, grok.com (Grok has no subscription API) | `review-out/xai.md` | `XAI_MODEL`, default `grok-4.6` |
| claude (opt in) | `ANTHROPIC_API_KEY` is set | manual packet, a fresh claude.ai chat | `review-out/claude.md` | `ANTHROPIC_MODEL`, default `claude-opus-5-5` |

`--via-codex` forces the CLI for openai even when the key is set; `CODEX=0` ignores the CLI. Details, payload shapes, limits and error meanings: `references/providers.md`.

## Setup, once per environment

- **Keys.** `GEMINI_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY`, optionally `ANTHROPIC_API_KEY`. In a Claude Code cloud session they have to be in the environment before the session starts (environment settings, then a new session); a running session never sees a key added later. A ChatGPT or Grok subscription is not an API key.
- **Network hosts.** `generativelanguage.googleapis.com` (Gemini), `api.openai.com` (OpenAI), `api.x.ai` (xAI), `api.anthropic.com` (Claude). The Codex CLI signed in with ChatGPT talks to `chatgpt.com` and `auth.openai.com`. A cloud environment's network policy has to allow each; `--check` shows which answer and which are blocked. An outbound proxy (`HTTPS_PROXY`) is honored automatically; `NODE_USE_ENV_PROXY=0` turns that off.
- **Models.** The defaults above are current as of October 2026. `gemini-2.5-pro` retires in mid-October 2026; `grok-4-0709` was retired in May 2026 and its slug is served by a newer model. When a provider rejects a model, the error file lists the names the key can use.
- **Codex CLI.** `npm i -g @openai/codex && codex login` (browser sign-in with a ChatGPT subscription) or `codex login --api-key`. The review runs `codex exec` read-only in the packet folder with the tiles attached; its transcript lands in `review-out/openai.codex.log`.
- **Screenshots.** Playwright with Chromium. `PLAYWRIGHT_PATH` points at a global install; the cloud image has Chromium under `/opt/pw-browsers`.
- **Testing without keys.** `<PROVIDER>_API_BASE` points a provider at another base URL. `scripts/mock-providers.mjs` in this skill folder is a stand-in for all four APIs; `references/providers.md` shows the run.

## Files in this skill

- `references/brief-template.md`: the brief shape for a new target, with the output format the merge step parses.
- `references/providers.md`: endpoints, payloads, limits, error meanings, Codex CLI flags, the mock run.
- `scripts/mock-providers.mjs`: a local stand-in for the four provider APIs.
- `docs/design-spec.md` section 13 in the repository: the review plan and the disposition rules this skill implements.
