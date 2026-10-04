#!/usr/bin/env node
/**
 * Merges the external review replies into one findings log.
 *
 * Reads <out>/<provider>.md (round 1) or <out>/round-N/<provider>.md (round N),
 * parses the findings each reviewer listed, and writes or updates the log:
 *
 *   docs/design-review-<date>.md
 *     ## Reviewers      one row per reply: round, provider, model, transport, counts by severity
 *     ## Findings       | ID | Severity | Source | Where | What | Fix | Disposition |
 *     ## Verdicts       each reviewer's verdict, verbatim
 *     ## Round N        confirmations table from a later round, plus its new findings
 *
 * Dispositions live in the Findings table. Rerunning the merge keeps whatever is
 * in the Disposition column for an ID that already exists; new replies add rows;
 * rows are never removed. Everything outside the marked blocks is left alone, so
 * notes can be written anywhere else in the file.
 *
 * Usage
 *   node scripts/merge-reviews.mjs                          merges review-out/*.md into docs/design-review-<today>.md
 *   node scripts/merge-reviews.mjs --log docs/design-review-2026-10-04.md
 *   node scripts/merge-reviews.mjs --round 2 --log <same log>   adds the confirmations from review-out/round-2/
 *   node scripts/merge-reviews.mjs --out other-folder --title "PR 12 at abc123"
 *
 * Options: --out <dir> (default review-out; round N reads <out>/round-N), --round <n> (default 1), --log <file>,
 * --date <YYYY-MM-DD> (default today), --title <text> (default: branch and commit).
 * Exit code 1 when no reply file could be parsed.
 */
import { readFile, readdir, writeFile, mkdir, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import {
  LOG_HEADERS,
  SEVERITIES,
  cell,
  formatTable,
  parseReply,
  parseLogFindings,
  severityRank,
  upsertBlock,
  markedBlock,
  findTable,
} from './lib/review-log.mjs';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    let [name, value] = arg.slice(2).split(/=(.*)/s);
    if (value === undefined) {
      value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) throw new Error(`--${name} needs a value`);
      i += 1;
    }
    args[name] = value;
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

const ROUND = Number(args.round || process.env.ROUND || 1);
const BASE_OUT = args.out || process.env.OUT || 'review-out';
const OUT = path.resolve(ROUND > 1 ? path.join(BASE_OUT, `round-${ROUND}`) : BASE_OUT);
const DATE = args.date || new Date().toISOString().slice(0, 10);
const LOG = path.resolve(args.log || process.env.LOG || `docs/design-review-${DATE}.md`);
const exists = (file) => access(file).then(() => true, () => false);

function gitDescription() {
  try {
    const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim();
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
    return `${branch} at ${sha}`;
  } catch {
    return path.basename(process.cwd());
  }
}

const TITLE = args.title || gitDescription();

// --- Read the replies --------------------------------------------------------
let files = [];
try {
  files = (await readdir(OUT, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.includes('.codex-last-message'))
    .map((entry) => entry.name)
    .sort();
} catch {
  console.error(`No reply folder at ${path.relative(process.cwd(), OUT)}. Run scripts/adversarial-review.mjs first.`);
  process.exit(1);
}

const replies = [];
for (const file of files) {
  const text = await readFile(path.join(OUT, file), 'utf8');
  const reply = parseReply(text, path.basename(file, '.md'));
  reply.file = path.relative(process.cwd(), path.join(OUT, file));
  reply.round = reply.round || ROUND;
  if (!reply.findings.length && !reply.confirmations.length && !reply.verdict) {
    console.log(`${reply.file}: no verdict, findings or confirmations found; skipped`);
    continue;
  }
  replies.push(reply);
}
if (!replies.length) {
  console.error(`Nothing to merge in ${path.relative(process.cwd(), OUT)}.`);
  process.exit(1);
}

// --- Existing log ------------------------------------------------------------
let log = (await exists(LOG)) ? await readFile(LOG, 'utf8') : '';
const existing = parseLogFindings(log);

if (!log.trim()) {
  log = [
    `# Design review: ${DATE}`,
    '',
    `Adversarial review of ${TITLE} by outside models. Written by \`scripts/merge-reviews.mjs\` from the replies in \`${path.relative(process.cwd(), path.resolve(BASE_OUT))}/\`; rerun it when a reply changes and the dispositions below are kept.`,
    '',
    'Disposition rules (design spec, section 13): every finding ends as **fixed** (name the commit), **declined** (give the reason), or **deferred** (name the decision the owner has to make). A repeat of another finding is **duplicate of \\<ID\\>**. Blockers and majors are fixed before the second round, which confirms the fixes.',
    '',
  ].join('\n');
}

// --- Reviewers block ---------------------------------------------------------
const REVIEWER_HEADERS = ['Round', 'Provider', 'Model', 'Transport', 'Findings', 'Blocker', 'Major', 'Minor', 'Taste'];
const reviewerRows = [];
const batchKeys = new Set(replies.map((reply) => `${reply.round}:${reply.provider}`));
const previousReviewers = markedBlock(log, 'reviewers');
if (previousReviewers) {
  // Keep rows from earlier merges unless this batch re-reads the same round and provider.
  const table = findTable(previousReviewers.inner, REVIEWER_HEADERS);
  for (const row of table?.rows || []) {
    if (!batchKeys.has(`${row.Round}:${row.Provider}`)) reviewerRows.push(row);
  }
}
for (const reply of replies) {
  const counts = Object.fromEntries(SEVERITIES.map((severity) => [severity, reply.findings.filter((f) => f.severity === severity).length]));
  reviewerRows.push({
    Round: String(reply.round),
    Provider: reply.provider,
    Model: reply.model,
    Transport: reply.transport,
    Findings: String(reply.findings.length),
    Blocker: String(counts.blocker),
    Major: String(counts.major),
    Minor: String(counts.minor),
    Taste: String(counts.taste),
  });
}
reviewerRows.sort((a, b) => Number(a.Round) - Number(b.Round) || a.Provider.localeCompare(b.Provider));
log = upsertBlock(
  log,
  'reviewers',
  `## Reviewers\n\n${formatTable(REVIEWER_HEADERS, reviewerRows)}`
);

// --- Findings block ----------------------------------------------------------
const rows = new Map(existing);
let added = 0;
for (const reply of replies) {
  for (const finding of reply.findings) {
    const id = reply.round > 1 ? `${reply.provider}-r${reply.round}-${finding.number}` : `${reply.provider}-${finding.number}`;
    const previous = rows.get(id);
    rows.set(id, {
      ID: id,
      Severity: finding.severity,
      Source: `${reply.provider} (${reply.model})`,
      Where: finding.where || '-',
      What: finding.title && finding.what && !finding.what.startsWith(finding.title) ? `${finding.title}: ${finding.what}` : finding.what || finding.title,
      Fix: finding.fix || '-',
      Disposition: previous?.Disposition && previous.Disposition !== '-' ? previous.Disposition : 'open',
    });
    if (!previous) added += 1;
  }
}
const ordered = [...rows.values()].sort((a, b) => {
  const bySeverity = severityRank(a.Severity) - severityRank(b.Severity);
  if (bySeverity) return bySeverity;
  const [aProvider, aRest] = [a.ID.split('-')[0], a.ID];
  const [bProvider, bRest] = [b.ID.split('-')[0], b.ID];
  return aProvider.localeCompare(bProvider) || aRest.localeCompare(bRest, undefined, { numeric: true });
});
const bySeverity = SEVERITIES.map((severity) => `${severity} ${ordered.filter((row) => row.Severity === severity).length}`).join(', ');
const open = ordered.filter((row) => /^open$/i.test(row.Disposition.trim())).length;
log = upsertBlock(
  log,
  'findings',
  `## Findings\n\n${ordered.length} findings (${bySeverity}); ${open} still open. Replace "open" in the Disposition column with fixed (commit), declined: reason, deferred: decision, or duplicate of ID.\n\n${formatTable(LOG_HEADERS, ordered)}`
);

// --- Verdicts block ----------------------------------------------------------
const previousVerdicts = markedBlock(log, 'verdicts');
const verdictParts = [];
if (previousVerdicts) {
  // Keep verdict sections from other rounds.
  const sections = previousVerdicts.inner.split(/\n(?=### )/);
  for (const section of sections) {
    const match = section.match(/^### Round (\d+): ([a-z0-9_-]+)/);
    if (match && !batchKeys.has(`${match[1]}:${match[2]}`)) verdictParts.push(section.trim());
  }
}
for (const reply of replies) {
  if (reply.verdict) verdictParts.push(`### Round ${reply.round}: ${reply.provider} (${reply.model})\n\n${reply.verdict.trim()}`);
}
verdictParts.sort((a, b) => Number(a.match(/Round (\d+)/)[1]) - Number(b.match(/Round (\d+)/)[1]) || a.localeCompare(b));
log = upsertBlock(log, 'verdicts', `## Verdicts\n\n${verdictParts.join('\n\n')}`);

// --- Round N block (confirmations) --------------------------------------------
if (ROUND > 1) {
  const confirmationRows = [];
  for (const reply of replies) {
    for (const confirmation of reply.confirmations) {
      const original = rows.get(confirmation.id);
      confirmationRows.push({
        ID: confirmation.id,
        Severity: original?.Severity || '-',
        Disposition: original?.Disposition || '(not in the log)',
        Reviewer: reply.provider,
        Verdict: confirmation.verdict,
        Evidence: confirmation.evidence,
      });
    }
  }
  confirmationRows.sort((a, b) => a.ID.localeCompare(b.ID, undefined, { numeric: true }) || a.Reviewer.localeCompare(b.Reviewer));
  const disputed = confirmationRows.filter((row) => /not fixed|partial|disputed/i.test(row.Verdict));
  const newFindings = ordered.filter((row) => row.ID.includes(`-r${ROUND}-`));
  const summary = `${confirmationRows.length} confirmations from ${replies.length} reviewer${replies.length === 1 ? '' : 's'}; ${disputed.length} not confirmed (not fixed, partial, or disputed); ${newFindings.length} new finding${newFindings.length === 1 ? '' : 's'} (IDs containing r${ROUND}, added to the Findings table above).`;
  log = upsertBlock(
    log,
    `round-${ROUND}`,
    `## Round ${ROUND}: ${DATE}\n\n${summary}\n\n${formatTable(['ID', 'Severity', 'Disposition', 'Reviewer', 'Verdict', 'Evidence'], confirmationRows)}`
  );
}

await mkdir(path.dirname(LOG), { recursive: true });
await writeFile(LOG, log.endsWith('\n') ? log : `${log}\n`);

const relativeLog = path.relative(process.cwd(), LOG);
console.log(`merged ${replies.length} repl${replies.length === 1 ? 'y' : 'ies'} (${replies.map((r) => `${r.provider}: ${r.findings.length} findings${r.confirmations.length ? `, ${r.confirmations.length} confirmations` : ''}`).join('; ')})`);
console.log(`${relativeLog}: ${ordered.length} findings (${bySeverity}), ${added} new, ${open} open`);
