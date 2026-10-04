/**
 * Shared pieces for the external review scripts: the reply format the brief
 * asks for, the findings log layout, and tolerant markdown parsing for both.
 */

export const SEVERITIES = ['blocker', 'major', 'minor', 'taste'];

const SEVERITY_ALIASES = {
  blocker: 'blocker',
  critical: 'blocker',
  p0: 'blocker',
  major: 'major',
  high: 'major',
  p1: 'major',
  minor: 'minor',
  medium: 'minor',
  low: 'minor',
  p2: 'minor',
  taste: 'taste',
  nit: 'taste',
  nitpick: 'taste',
  p3: 'taste',
};

export function normalizeSeverity(text) {
  const words = String(text || '')
    .toLowerCase()
    .match(/[a-z0-9]+/g) || [];
  for (const word of words) {
    if (SEVERITY_ALIASES[word]) return SEVERITY_ALIASES[word];
  }
  return 'unrated';
}

export function severityRank(severity) {
  const index = SEVERITIES.indexOf(severity);
  return index === -1 ? SEVERITIES.length : index;
}

/** One table cell: single line, pipes escaped, empty shown as a dash. */
export function cell(text) {
  const flat = String(text ?? '')
    .replace(/\r/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
  return flat || '-';
}

export function formatTable(headers, rows) {
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => cell(row[header])).join(' | ')} |`),
  ];
  return lines.join('\n');
}

function splitRow(line) {
  const placeholder = '\u0000';
  const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return inner
    .replace(/\\\|/g, placeholder)
    .split('|')
    .map((part) => part.replace(new RegExp(placeholder, 'g'), '|').trim());
}

const isRuleRow = (line) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);

/** Every pipe table in a markdown string, as { headers, rows, start, end } with line indexes. */
export function parseTables(markdown) {
  const lines = markdown.split('\n');
  const tables = [];
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (!lines[i].includes('|') || !isRuleRow(lines[i + 1])) continue;
    const headers = splitRow(lines[i]);
    const rows = [];
    let j = i + 2;
    while (j < lines.length && lines[j].includes('|') && !isRuleRow(lines[j])) {
      const cells = splitRow(lines[j]);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = cells[index] ?? '';
      });
      rows.push(row);
      j += 1;
    }
    tables.push({ headers, rows, start: i, end: j });
    i = j - 1;
  }
  return tables;
}

/** The first table whose headers include every required header (case-insensitive). */
export function findTable(markdown, required) {
  const wanted = required.map((header) => header.toLowerCase());
  for (const table of parseTables(markdown)) {
    const have = table.headers.map((header) => header.toLowerCase());
    if (wanted.every((header) => have.includes(header))) {
      // Normalize header keys to the canonical casing the caller asked for.
      const rows = table.rows.map((row) => {
        const normalized = {};
        for (const header of table.headers) {
          const canonical = required.find((name) => name.toLowerCase() === header.toLowerCase()) || header;
          normalized[canonical] = row[header];
        }
        return normalized;
      });
      return { ...table, rows };
    }
  }
  return null;
}

/** Splits markdown into sections by heading; each is { level, title, body, text }. */
export function splitSections(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const sections = [];
  let current = { level: 0, title: '', bodyLines: [], textLines: [] };
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    const heading = !inFence && line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (heading) {
      sections.push(current);
      current = { level: heading[1].length, title: heading[2].replace(/\*\*/g, '').trim(), bodyLines: [], textLines: [line] };
    } else {
      current.bodyLines.push(line);
      current.textLines.push(line);
    }
  }
  sections.push(current);
  return sections.map(({ level, title, bodyLines, textLines }) => ({
    level,
    title,
    body: bodyLines.join('\n').trim(),
    text: textLines.join('\n').trim(),
  }));
}

/**
 * Finds a named top-level section ("Findings", "Verdict", ...) and returns its
 * body together with every deeper section that follows it, until the next
 * section of the same or a higher level.
 */
export function sectionText(markdown, pattern) {
  const sections = splitSections(markdown);
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    if (!section.level || !pattern.test(section.title)) continue;
    const parts = [section.body];
    for (let j = i + 1; j < sections.length && sections[j].level > section.level; j += 1) {
      parts.push(sections[j].text);
    }
    return parts.join('\n').trim();
  }
  return '';
}

const LABEL = /^\s*(?:[-*+]\s*)?(?:\*\*|__)?\s*(severity|where|what(?: is wrong)?|why(?: it matters)?|fix|concrete fix|location|issue|problem|recommendation|suggested fix)\s*(?:\*\*|__)?\s*[:：]\s*(?:\*\*|__)?\s*(.*)$/i;

const LABEL_KEYS = {
  severity: 'severity',
  where: 'where',
  location: 'where',
  what: 'what',
  'what is wrong': 'what',
  issue: 'what',
  problem: 'what',
  why: 'why',
  'why it matters': 'why',
  fix: 'fix',
  'concrete fix': 'fix',
  recommendation: 'fix',
  'suggested fix': 'fix',
};

const ENTRY_HEADING = /^#{2,6}\s*(?:finding\s*)?[#f]?\s*(\d+)\s*[.):\-–—]?\s*(.*)$/i;
const ENTRY_BOLD = /^\s*\*\*\s*(?:finding\s*)?[#f]?\s*(\d+)\s*[.):]?\s*(.*?)\*\*\s*(.*)$/i;
const ENTRY_LIST = /^(\d+)[.)]\s+(.*)$/;

/**
 * Parses finding entries out of a findings section. Accepts the shape the brief
 * asks for ("### 1. Title" then "- Severity: ..." lines) and the common
 * deviations (bold numbers, plain numbered lists, "[major]" tags in titles).
 */
export function parseFindings(sectionMarkdown) {
  if (!sectionMarkdown) return [];
  const lines = sectionMarkdown.replace(/\r/g, '').split('\n');
  const hasHeadings = lines.some((line) => ENTRY_HEADING.test(line));
  const hasBold = !hasHeadings && lines.some((line) => ENTRY_BOLD.test(line));
  const entries = [];
  let current = null;
  let inFence = false;

  const start = (number, title) => {
    current = { number: Number(number), title: title.replace(/\*\*/g, '').trim(), fields: {}, lines: [] };
    entries.push(current);
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence) {
      let match;
      if (hasHeadings && (match = line.match(ENTRY_HEADING))) {
        start(match[1], match[2]);
        continue;
      }
      if (hasBold && (match = line.match(ENTRY_BOLD))) {
        start(match[1], `${match[2]} ${match[3]}`.trim());
        continue;
      }
      if (!hasHeadings && !hasBold && (match = line.match(ENTRY_LIST))) {
        start(match[1], match[2]);
        continue;
      }
    }
    if (current) current.lines.push(line);
  }

  return entries.map((entry) => {
    const fields = {};
    let key = null;
    for (const line of entry.lines) {
      const match = line.match(LABEL);
      if (match) {
        key = LABEL_KEYS[match[1].toLowerCase()] || match[1].toLowerCase();
        fields[key] = (fields[key] ? `${fields[key]} ` : '') + match[2].trim();
      } else if (key && line.trim()) {
        fields[key] += ` ${line.trim()}`;
      } else if (!key && line.trim()) {
        fields.lead = `${fields.lead ? `${fields.lead} ` : ''}${line.trim()}`;
      }
    }
    // Severity may sit in the title ("[Major] ...", "Major: ...") when the labels are missing.
    const severity = normalizeSeverity(fields.severity || entry.title.match(/\[(.*?)\]|^(\w+)\s*[:：]/)?.[0] || '');
    const what = fields.what || fields.lead || entry.title;
    return {
      number: entry.number,
      title: entry.title.replace(/^\[(.*?)\]\s*/, '').trim(),
      severity,
      where: fields.where || '',
      what,
      why: fields.why || '',
      fix: fields.fix || '',
    };
  });
}

const META = /<!--\s*external-review:\s*(\{.*?\})\s*-->/s;
const HEADER = /^#\s*Adversarial review:\s*([a-z0-9_-]+)\s*(?:\((.*?)\))?\s*$/im;

/** Parses one reply file: provider, model, round, verdict, findings, confirmations. */
export function parseReply(markdown, fallbackProvider) {
  let meta = {};
  const metaMatch = markdown.match(META);
  if (metaMatch) {
    try {
      meta = JSON.parse(metaMatch[1]);
    } catch {
      meta = {};
    }
  }
  const header = markdown.match(HEADER);
  const provider = meta.provider || header?.[1]?.toLowerCase() || fallbackProvider;
  const model = meta.model || header?.[2] || 'unknown model (pasted by hand)';
  const verdict = sectionText(markdown, /^verdict/i);
  const findings = parseFindings(sectionText(markdown, /^(?:\d+\.\s*)?(?:new\s+)?findings?\b/i));
  const confirmationsText = sectionText(markdown, /^(?:\d+\.\s*)?confirmations?\b/i);
  const confirmationsTable = findTable(confirmationsText || markdown, ['ID', 'Verdict']);
  const confirmations = (confirmationsTable?.rows || [])
    .filter((row) => row.ID && !/^-+$/.test(row.ID))
    .map((row) => ({
      id: row.ID.replace(/`/g, '').trim(),
      verdict: (row.Verdict || '').trim(),
      evidence: (row.Evidence || row.Notes || row.Note || '').trim(),
    }));
  return {
    provider,
    model,
    transport: meta.transport || (header ? 'manual' : 'unknown'),
    round: Number(meta.round) || undefined,
    verdict,
    findings,
    confirmations,
  };
}

export const LOG_HEADERS = ['ID', 'Severity', 'Source', 'Where', 'What', 'Fix', 'Disposition'];

/** Reads the findings rows out of an existing log, keyed by ID. */
export function parseLogFindings(markdown) {
  const table = findTable(markdown, LOG_HEADERS);
  const byId = new Map();
  for (const row of table?.rows || []) {
    const id = (row.ID || '').replace(/`/g, '').trim();
    if (id) byId.set(id, row);
  }
  return byId;
}

/** Text between two marker comments, or null when the block is absent. */
export function markedBlock(markdown, name) {
  const start = `<!-- review-log:${name}:start -->`;
  const end = `<!-- review-log:${name}:end -->`;
  const from = markdown.indexOf(start);
  const to = markdown.indexOf(end);
  if (from === -1 || to === -1 || to < from) return null;
  return { start: from, end: to + end.length, inner: markdown.slice(from + start.length, to) };
}

export function wrapBlock(name, content) {
  return `<!-- review-log:${name}:start -->\n${content.trim()}\n<!-- review-log:${name}:end -->`;
}

/** Replaces a marked block, or appends it when missing. */
export function upsertBlock(markdown, name, content) {
  const block = markedBlock(markdown, name);
  const wrapped = wrapBlock(name, content);
  if (!block) return `${markdown.trimEnd()}\n\n${wrapped}\n`;
  return `${markdown.slice(0, block.start)}${wrapped}${markdown.slice(block.end)}`;
}
