# Job Search OS — Developer & LLM Context File
**Version 4.1 · April 2026 · BD/Partnerships Edition**

This file is the authoritative reference for any LLM or developer working on the Job Search OS. Read this before touching any file in the system.

---

## What this system is

A personal job search operating system built on Claude for a senior BD/Partnerships professional (Pranjal Mahna). It is not a prompt library. It is not a chatbot. It is a persistent, connected workspace that:

1. Knows the user's full professional context at session start (via CLAUDE.md)
2. Runs structured interactive workflows on command (/brief, /score, /apply, etc.)
3. Parses email for new job postings and scores them automatically via a morning digest
4. Tracks outreach across 59 target companies with daily velocity metrics
5. Generates tailored .docx resumes via an integrated 5-step builder with Claude API rewrite
6. Maps warm referral paths to 20+ priority companies with pre-loaded connection intelligence
7. Syncs scored roles from the Chrome extension to the outreach tracker
8. Alerts on overdue follow-ups via a numeric badge with one-click nudge prompt generation
9. Generates practitioner-grade LinkedIn posts across five content pillars
10. Exports weekly job search data to Google Sheets via CSV, JSON, and Apps Script automation
11. Compounds over time through a debrief → pattern log → drill cycle

**The target user** is Pranjal Mahna: 15+ years BD/Partnerships, Michigan-based (remote preferred), seeking Director or Senior Manager roles at AI-native companies. Currently consulting via PMSV while job searching. Key background: Huawei ISV ecosystem ($1M→$100M, 1,000+ ISVs, Kirin 9000 on-device AI), Qualia first BD hire ($9M at 120%), Pandora ($200M+ new channels, OEM: Sony/Samsung/Honda).

---

## File inventory

```
outputs/
├── job-search-os-v5.html               ← Main dashboard v4.1 (4,434 lines, 263KB)
├── jobos-chrome-extension-v2.zip       ← Chrome extension v2 (MV3 fixed, all buttons work)
├── CLAUDE.md                           ← Master context file (load into Claude Project)
├── README.md                           ← User-facing documentation
├── DEV_CONTEXT.md                      ← This file
├── BD_Partnerships_Job_Search_OS.docx  ← All prompts as Word doc (offline reference)
└── bd-partnerships-os-v2.zip          ← Claude Code OS (slash commands + sub-agents)

home/claude/ (build environment)
├── build_resume.js                     ← Node.js .docx builder
├── jobos-extension-v2/                 ← Chrome extension v2 source
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html                      ← Zero inline handlers (MV3 compliant)
│   └── popup.js                        ← wireButtons() via addEventListener
├── job-search-os-v5.html              ← v4 (previous)
└── job-search-os-v5-export.html       ← v4.1 working copy
```

---

## Architecture overview

### Four surfaces, one brain

**Surface 1 — Claude.ai Project (primary)**
CLAUDE.md is uploaded to Project knowledge and loads automatically on every conversation. Google Calendar, Gmail, web search, and Monday.com are live via MCP connectors.

**Surface 2 — HTML Dashboard (`job-search-os-v5.html`)**
Single-file web app, 4,434 lines, 263KB. Opens in any browser with no server. Contains all 10 workflows, resume generator, and 5 Tools panels. Version badge: v4.

**Surface 3 — Chrome Extension v2**
Activates on job board pages. All buttons wired via addEventListener (MV3 compliant). Auto-extracts JD, scores instantly, syncs scored roles to outreach tracker, shows numeric amber badge for overdue follow-ups.

**Surface 4 — Claude Code CLI**
For terminal users. CLAUDE.md auto-loads. Full slash command set in `.claude/commands/`. Sub-agents in `sub-agents/`. Pattern log in `context/pattern-log.md`.

---

## Sidebar structure (`job-search-os-v5.html`)

```
Overview
  ◈  Dashboard
  ⊞  Pipeline
  ◉  Outreach
  ◷  Usage history

Workflows
  /br  Brief
  /sc  Score
  /ap  Apply
  /rf  Referral
  /pr  Prep
  /mk  Mock
  /db  Debrief
  /ng  Negotiate
  /pt  Patterns
  /rv  Resume

Tools
  ⇄   Sync
  ◎   Network map
  ◈   Email digest
  ✦   LinkedIn post
  ↗   Weekly export     ← new in v4.1

Agents
  @   Sub-agents
```

---

## All localStorage keys

| Key | Contents | Set by |
|---|---|---|
| `jobos_v3` | Main OS state: `{ pipeline[], history[], scores[], stats, calendar_cache }` | All workflow panels |
| `jobos_outreach_v1` | Outreach tracker: `{ contacts[], dailyLog{} }` | Outreach panel, sync import |
| `jobos_sync_url` | Deployed GitHub Pages URL string | `/sync` panel |
| `jobos_digest_config` | `{ minScore, alwaysInclude, sources, nudgeDays }` | `/digest` Configure tab |
| `jobos_post_history` | Array of last 20 posts: `[{ text, pillar, date, ts }]` | `/post` panel |

No new keys in v4.1 — the export panel reads from existing keys.

---

## CLAUDE.md — the brain

`CLAUDE.md` is the single most important file. It contains:

- **Identity & positioning**: Job search status, PMSV consulting entity, target roles
- **Key metrics**: Every career metric across all roles (real — never modify)
- **Bullet library**: Every resume bullet across 8 resume versions, tagged by theme
- **Bullet relevance mapping**: Which bullets for which role types (6 types)
- **5 core interview stories (A–E)**: Full STAR format
- **Active target roles**: 4 current roles with gap bridges
- **Behavioral instructions**: Language to use, what to avoid

---

## The full workflow table

| Command | Panel type | Purpose | Key outputs |
|---|---|---|---|
| `/brief` | Workflow | Morning game plan | Top 3 actions, cold role flags, referral suggestions |
| `/score` | Workflow | JD fit analysis | 5-dimension bars, weighted total, verdict + → /resume button |
| `/apply` | Workflow | Full application package | Resume restructure, gap bridge, referral strategy, cover note |
| `/referral` | Workflow | Warm intro strategy | Network angles, LinkedIn DM, timing |
| `/prep` | Workflow | Interview prep | Company research, question bank, gap bridges, tailored pitch |
| `/mock` | Workflow | Interactive mock interview | One Q at a time, live scoring |
| `/debrief` | Workflow | Post-interview analysis | Answer scoring, value left on table, thank-you email |
| `/negotiate` | Workflow | Offer strategy | Market benchmarks, counter offer, call script |
| `/pipeline` | Workflow | Weekly review | Health flags, priority actions |
| `/pattern` | Workflow | Cross-interview analysis | Weak question types, over-used stories, drill targets |
| `/resume` | Workflow | Resume generator | 5-step builder → Node.js script → .docx |
| `/sync` | Tool | Outreach data sync | GitHub Pages setup, JSON export/import, Claude Project prompt |
| `/network` | Tool | Referral network map | Warm paths to 20+ companies, connection + angle + nudge + prompt |
| `/digest` | Tool | Morning email digest | Scored job alerts + recruiter replies + nudges + top 3 actions |
| `/post` | Tool | LinkedIn post generator | 5 pillars, Claude API streaming, 150–250 words, practitioner voice |
| `/export` | Tool | Weekly Google Sheets export | CSV/JSON download, paste-to-Sheets, Apps Script, weekly summary |

---

## New in v4.1 — full architecture details

### `/export` — Weekly export panel

**Purpose**: Export all job search data to Google Sheets on a weekly cadence.

**State**: No new localStorage keys. Reads from `STATE` (pipeline, history, scores) and `OT_STATE` (contacts, dailyLog).

**Key functions**:
```javascript
renderExportPanel()        // wires buttons, calculates metrics, renders weekly summary
buildPipelineCSV()         // headers + STATE.pipeline rows → comma-separated
buildOutreachCSV()         // headers + OT_STATE.contacts rows → comma-separated
buildScoresCSV()           // headers + STATE.scores → with verdict calculated
buildActivityCSV()         // last 7 days of STATE.history → comma-separated
buildPipelineTSV()         // tab-separated for direct Sheets paste
buildOutreachTSV()         // tab-separated for direct Sheets paste
exportAllJSON()            // full export: pipeline + outreach + scores + activityThisWeek + stats
downloadCSV(csv, name)     // creates Blob, triggers download with date-stamped filename
pasteToSheets(tsv, label)  // navigator.clipboard.writeText for Sheets paste workflow
generateSheetsScript()     // produces full Apps Script with createJobSearchSheet(), importFullExport(), sendWeeklyReminder()
renderWeeklySummary()      // calculates week metrics live from STATE + OT_STATE
copyWeeklySummary()        // formats full structured briefing string for Claude review
```

**CSV structure per export**:
- Pipeline: Company, Role, Stage, Health, Last Action, Next Step
- Outreach: Company, Tier, Role, Contact, Status, Follow-ups, Last Outreach, POV / Angle
- Scored Roles: Company, Score, Verdict (Apply/Consider/Skip), Date
- Activity Log: Command, Detail, Date, Time (filtered to last 7 days)

**Apps Script — `createJobSearchSheet()`**:
- Creates Google Sheet named "Job Search OS" with 5 tabs
- Headers frozen row 1, dark background with accent-green headers per tab
- Sets `ScriptApp` trigger: weekly Sunday 9am → `sendWeeklyReminder()`
- `sendWeeklyReminder()` emails Pranjal a reminder with Sheet URL and export instructions
- `importFullExport(jsonString)` — paste the full JSON export string, writes all tabs with week tag

**Button wiring** (called on every `renderExportPanel()` call — uses `replaceWith(cloneNode(true))` to avoid duplicate listeners):
```javascript
const wire = (id, fn) => {
  const el = document.getElementById(id);
  if (el) { el.replaceWith(el.cloneNode(true)); document.getElementById(id).addEventListener('click', fn); }
};
```

---

### Pipeline tracker — strike-through (v4.1)

**New stages**: Withdrawn, Rejected, Closed (added to modal select and `stageCls` map).

**`_pDone` variable** in `renderPipeline()`:
```javascript
const _pDone = r.stage === 'Withdrawn' || r.stage === 'Closed' || r.stage === 'Rejected';
// Applied to row: style="${_pDone?'opacity:0.45;':''}"
// Applied to company td: text-decoration:line-through when _pDone
```

**`updatePipelineStage(id, stage)`** — new function:
```javascript
function updatePipelineStage(id, stage) {
  const r = STATE.pipeline.find(x => x.id === id);
  if (!r) return;
  r.stage = stage;
  r.lastAction = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
  saveState(); renderPipeline(); renderPipelineMini();
  logUsage('/pipeline', `${r.company} → ${stage}`);
}
```

**Move dropdown** added as a new table column between Next Step and Remove (×):
```javascript
`<select onchange="updatePipelineStage(${r.id},this.value)" style="...">
  ${['Monitoring','Applied','Recruiter screen','HM round','Panel','Offer','Withdrawn','Rejected','Closed']
    .map(s=>`<option value="${s}" ${r.stage===s?'selected':''}>${s}</option>`).join('')}
</select>`
```

---

### Outreach tracker — strike-through (v4.1)

**`_done` variable** in `renderOutreachTable()`:
```javascript
const _done = c.status === 'Not Interested';
// Row: opacity:0.45 when _done
// Company td: text-decoration:line-through;text-decoration-color:var(--text3) when _done
```

"Not Interested" was already in the status dropdown — it now has visual meaning. Data is fully preserved; no delete occurs. The strike-through makes the row visually inactive without removing the company from history or metrics.

---

## Chrome Extension v2 — MV3 fix (v4.1)

### Root cause

Manifest V3 enforces a strict Content Security Policy that **silently blocks all inline `onclick="..."` attribute handlers** in extension popup HTML. Every button in the previous popup.html was wired with `onclick="functionName()"` — so every button was silently broken with no console error visible to the user.

### Fix

`popup.html` rebuilt with **zero inline handlers**. Every interactive element has a unique `id`. `popup.js` has a single `wireButtons()` function called on `DOMContentLoaded` that wires all interactions via `addEventListener`:

```javascript
function wireButtons() {
  // Tabs
  on('tab-score',  () => switchTab('score'));
  on('tab-apply',  () => switchTab('apply'));
  // ... all 6 tabs

  // Score tab
  on('btn-score-manual',     scoreManual);
  on('btn-sync-tracker',     syncToTracker);
  on('btn-open-claude-score',() => openClaude('score'));
  on('btn-copy-score',       () => copyP('score'));

  // Apply, Brief, Nudges, Shortcuts tabs
  // ... all buttons wired here
}

function on(id, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', fn);
}
```

**Nudge buttons** are rendered dynamically via `innerHTML` and cannot be wired in `wireButtons()`. They use `data-` attributes and are wired after `list.innerHTML` is set:

```javascript
list.querySelectorAll('[data-nudge-idx]').forEach(btn => {
  btn.addEventListener('click', () => copyNudgePrompt(parseInt(btn.dataset.nudgeIdx)));
});
list.querySelectorAll('[data-done-idx]').forEach(btn => {
  btn.addEventListener('click', () => markNudgeDone(parseInt(btn.dataset.doneIdx), btn.dataset.doneCo));
});
```

**Rule**: Any button added dynamically to the DOM (via `innerHTML`) must be wired via `querySelectorAll` + `addEventListener` immediately after the DOM update, not in `wireButtons()`.

---

## Resume generator (unchanged from v3.1)

Lives as `panel-resume` in `job-search-os-v5.html`. All variables prefixed `RV_` or `rv`. Score→resume handoff via `scoreToResume()` → `rvLoadFromScore()`. Full documentation in previous versions unchanged.

---

## Chrome Extension v2 — full architecture summary

| File | What it does |
|---|---|
| `manifest.json` | MV3, permissions: activeTab, scripting, storage, contextMenus, alarms |
| `background.js` | Service worker: hourly alarm, nudge badge, syncOutreach/getOverdueContacts message handler |
| `content.js` | Page scraper: multi-selector extraction, 800ms retry for LinkedIn lazy loading |
| `popup.html` | 6-tab popup, zero inline onclick handlers |
| `popup.js` | All logic: wireButtons(), scoring, Gist sync, nudge rendering, outreach sync |

**Storage keys** (chrome.storage.local):
- `jobos_ext_v1`: `{ history[], scores[], stats: {total, streak, lastDate} }`
- `jobos_outreach_sync`: `{ contacts[], lastUpdated }` — roles synced from scoring
- `jobos_gist_url`: Raw GitHub Gist URL string

---

## Bullet library system

Exists in two places (keep in sync):
1. `job-search-os-v5.html` — `RV_LIB` / `RV_SEL` in resume generator section (bullet text field is `t`)
2. `build_resume.js` — `LIB` / `SELECTIONS`

Role type decision guide:
- `enterprise`: lead with `h1`/`h3`/`h5` (scale, C-suite, revenue)
- `edgeai`: lead with `h7`/`h8` (ISV ecosystem, Kirin 9000 on-device)
- `hardware`: lead with `pa3` (Pandora OEM) + `h8` (Kirin)
- `startup`: lead with `q1`/`p3` (Qualia first hire, Wove 90-day)
- `alliances`: lead with `h9` (licensing/co-dev Meta/Adobe/Airbnb)
- `supply`: lead with `m1` (Mobclix $16M) + `pa4` (Pandora remnant)

---

## Scoring system

Identical across `/score` panel, Chrome extension popup, resume generator live preview.

```javascript
s1 = kw(jd, ['ecosystem','partner','isv',...])  // 25%
s2 = kw(jd, ['build','create','launch',...])    // 25%
s3 = kw(jd, ['technical','engineering','api',...]) // 20%
s4 = kw(jd, ['ai','machine learning','llm',...]) // 20%
s5 = kw(jd, ['director','senior manager',...])  // 10%

function kw(text, words) {
  return Math.round(50 + Math.min(hits / Math.max(words.length * 0.35, 1), 1) * 50);
}
total = s1*.25 + s2*.25 + s3*.20 + s4*.20 + s5*.10
```

Verdicts: ≥75% Apply (green), 50–74% Consider (amber), <50% Skip (red).

**If you update keyword lists**: Search `kw(` in `job-search-os-v5.html` (two instances) and `scoreKw(` in extension `popup.js`. All three must stay in sync.

---

## Technical stack

| Component | Stack |
|---|---|
| Dashboard | Vanilla HTML/CSS/JS, single file, 4,434 lines, 263KB, localStorage |
| Resume builder (CLI) | Node.js, `docx@9.6.1` |
| Chrome extension | MV3, `chrome.storage.local`, `chrome.alarms`, addEventListener-only |
| Claude API | `claude-sonnet-4-20250514`, streaming via `/v1/messages` with SSE |
| Google Sheets export | CSV/TSV download + Google Apps Script (`createJobSearchSheet`, `importFullExport`) |
| CricVantage (separate) | React + Vite + TypeScript + Tailwind (Vercel), FastAPI + Python (Railway) |

---

## Common operations for LLMs

### Adding a new workflow panel
1. Add sidebar nav item with `id="nav-newcmd"` and `onclick="nav('newcmd')"`
2. Add panel div with `id="panel-newcmd"`
3. Add to `nav()`: `if (id === 'newcmd') { renderNewCmd(); }`
4. Add `renderNewCmd()`: reads inputs, builds prompt, injects into `.prompt-block`, logs usage

### Adding a company to the network map
Add to `COMPANY_PATHS`: `warmPath`, `strength` (1–3), `connection`, `angle`, `nudge`. Company must also exist in `OT_STATE.contacts`.

### Adding a LinkedIn post pillar
Add to `PILLAR_CONFIGS`: `title`, `fields` (HTML string), `buildPrompt()` function. Add pillar card div with `id="pp-newpillar"` and `onclick="selectPillar('newpillar')"`.

### Adding a column to the weekly export
Update the relevant `build*CSV()` and `build*TSV()` functions, and update the `importFullExport()` in `generateSheetsScript()` to write the extra column. Also update the Apps Script `setupHeaders()` call for that tab.

### Updating the digest default companies
Change `alwaysInclude` in `loadDigestConfig()` defaults, or via the Configure tab UI.

### Changing the Claude API model
Search for `claude-sonnet-4-20250514` in `job-search-os-v5.html` — two instances (resume generator and post generator). Update both.

### Updating nudge threshold
Change `NUDGE_THRESHOLD_DAYS` in `background.js` AND `NUDGE_DAYS` in `popup.js`. Repack and reinstall extension. The digest prompt threshold is separate — controlled by `cfg.nudgeDays` from localStorage.

### Adding a new pipeline stage
Add the stage string to: the `ar-stage` select options in the add-role modal, the `stageCls` map in `renderPipeline()`, the `_pDone` condition if it should show as struck-through, and the inline Move select options in the pipeline table row template.

---

## Design principles (don't violate these)

**1. Context file first.** CLAUDE.md quality > command quality.

**2. Interactive before generative.** Every workflow asks questions before producing output.

**3. One best bullet, not all versions.** 4–5 bullets per role section max.

**4. Metrics are non-negotiable.** Never modify $20M, 120%, 1,000+ ISVs, $1M→$100M.

**5. The pattern log compounds.** After 10 debriefs it knows habits the user can't see.

**6. Sub-agents as adversarial pressure.** Never water down @skeptic or @hiring-manager.

**7. Namespace isolation in combined files.** Resume: `RV_`/`rv`. Outreach: `OT_`/`ot`. No collisions.

**8. Extension and dashboard are separate origins.** Sync path is always export → import, never live.

**9. Post generator prompts enforce voice.** Every `buildPrompt()` must include credentials, no-opener rules, word count, ending question. Generic AI text is a failure.

**10. Network map paths are grounded in real relationships.** Never invent a connection in `COMPANY_PATHS`.

**11. MV3 extension: no inline handlers.** All event handling via `addEventListener` in `wireButtons()`. Dynamically rendered buttons must be wired via `querySelectorAll` immediately after the DOM update.

**12. Strike-through, not delete.** Closed/withdrawn pipeline roles and Not Interested companies should dim and strike-through, not be removed. Data integrity matters for the pattern log and history.

---

## FAQ for LLMs

**Q: Extension buttons aren't working.**
A: Root cause is always MV3 CSP. Check `popup.html` has zero `onclick=` attributes. Check `wireButtons()` in `popup.js` covers the button. For dynamically rendered buttons (nudge cards), check they're wired via `querySelectorAll('[data-*]').forEach(btn => btn.addEventListener(...))` immediately after `innerHTML` is set.

**Q: A user wants to add a column to the weekly Sheets export.**
A: Update the relevant `build*CSV()` + `build*TSV()` functions in the dashboard. Update the `setupHeaders()` call in the `generateSheetsScript()` output for that tab. Update `importFullExport()` in the script to write the new column. The script is regenerated each time the user clicks "Generate Apps Script →" so they just re-paste the new version.

**Q: The strike-through isn't appearing on a closed pipeline role.**
A: Check `_pDone` in `renderPipeline()`. The condition is `r.stage === 'Withdrawn' || r.stage === 'Closed' || r.stage === 'Rejected'`. If a new stage was added, add it to this condition. Check the template literal uses `${_pDone?'opacity:0.45;':''}` on the `<tr>` and `${_pDone?'text-decoration:line-through;':''}` on the company `<td>`.

**Q: The weekly export CSV has incorrect data.**
A: Check the `build*CSV()` function for that tab. Each uses `csvCell()` to escape commas/quotes. Check `STATE` vs `OT_STATE` — pipeline data is in `STATE.pipeline`, outreach in `OT_STATE.contacts`, scores in `STATE.scores`, activity in `STATE.history`. The activity export filters to `h.ts >= weekAgo` — check the ISO string comparison is valid.

**Q: A user wants to add a new target company to the network map.**
A: Add to `COMPANY_PATHS` with `warmPath`, `strength` (1–3), `connection`, `angle`, `nudge`. Ensure the company is in `OUTREACH_SEED` or OT_STATE.

**Q: The digest prompt overdue section is showing the wrong contacts.**
A: `generateDigestPrompt()` calculates overdue live from `OT_STATE.contacts`. Check `c.lastOutreach` is in `"Apr 1"` format. Status `Replied` or `Interviewing` is intentionally excluded. Threshold is `cfg.nudgeDays` from `jobos_digest_config`.

**Q: How do I update the network map when Pranjal gets a new warm contact?**
A: Update `COMPANY_PATHS` entry: increase `strength`, update `connection` and `nudge` to reference the new contact. Update the `contact` field in `OT_STATE.contacts` for that company.

---

## Pranjal's background — quick reference for LLMs

**Current**: PMSV Tech and Strategy (advisor, December 2022–present). Adyogi (+16% via Meta/Shopify), Wove (first 3 enterprise partners, 90 days), MobiOffice (+7% conversion), Zingerman's (AI GTM system).

**Qualia** (Aug 2021–Oct 2022): Director BD. First BD hire. $20M pipeline. $9M at 120%. 60% win rate. 20% activation lift.

**Huawei** (Feb 2018–Jul 2021): Director BD / Director Strategic Partnerships. 1,000+ ISVs. SDK 300%. Revenue $1M→$100M. Users 2M→30M. Team 8. Kirin 9000: Pinterest, Porsche, Shazam, Vivino. Partners: Meta, Adobe, Match Group, Airbnb. Deal cycle −30%. 2× President's Award.

**Pandora** (Oct 2012–Mar 2015): BD New Initiatives. Sponsored Listening ($155M), Retargeting ($40M), TV Ads ($10M). OEM: Sony, Microsoft, Honda. Remnant +$35M. Total $200M+.

**Mobclix** (Jul 2011–Aug 2012): $16M revenue. 185% YoY revenue. 214% YoY volume. 30B impressions/year.

**Sony Mobile** (Feb 2008–Jun 2011): First Android monetization strategy. First $10M ad revenue. 16 global markets.

**Education**: MBA Marketing USC · BTech Computer Engineering Kurukshetra · AWS Generative AI with LLMs · Google Cloud Digital Leader · Pavilion GTM Leadership Accelerator.

**Early career**: Lead Software Engineer Bell Labs/Lucent · Program Manager Yahoo · Sr. Account Manager Singlepoint · Account Manager Motricity.

**AI projects**: FutureProof AI (AI Collective hackathon winner) · CricVantage (cricket analytics, 9.6M ball-by-ball, React+FastAPI) · FORMA (AI fitness trainer, React Native + Claude API) · EnhancePDF (Google Vision AI) · Hatched (founding member).

**Contact**: pranjal.mahna@gmail.com · 424.298.7516 · linkedin.com/in/pranjalmahna · Michigan (remote preferred)

---

*Last updated: April 12, 2026 · Job Search OS v4.1 · file: job-search-os-v5.html*
