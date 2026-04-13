# Job Search OS - Developer & LLM Context File
**Version 4.2 · April 2026 · BD/Partnerships Edition**

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
/ (root)
├── index.html                          ← Main dashboard v4.2 (renamed for GitHub Pages)
├── DEV_CONTEXT.md                      ← This file
├── README.md                           ← User-facing documentation
└── jobos-extension-v2/                 ← Chrome extension v2 source
    ├── manifest.json
    ├── background.js
    ├── content.js
    ├── popup.html                      ← Zero inline handlers (MV3 compliant)
    └── popup.js                        ← wireButtons() via addEventListener
    └── icons/
        ├── icon16.png
        ├── icon48.png
        └── icon128.png

(External / Knowledge Base)
├── CLAUDE.md                           ← Master context file (load into Claude Project)
```

---

## Architecture overview

### Four surfaces, one brain

**Surface 1 - Claude.ai Project (primary)**
CLAUDE.md is uploaded to Project knowledge and loads automatically on every conversation. Google Calendar, Gmail, and web search are live via MCP connectors.

**Surface 2 - HTML Dashboard (`index.html`)**
Single-file web app, ~4,500 lines. Opens in any browser with no server. Renamed to `index.html` to support direct deployment to GitHub Pages. Contains all workflows, resume generator, and Tools panels. Version badge: v4.

**Surface 3 - Chrome Extension v2**
Activates on job board pages. All buttons wired via addEventListener (MV3 compliant). Auto-extracts JD, scores instantly, syncs scored roles to outreach tracker, shows numeric amber badge for overdue follow-ups.

**Surface 4 - Claude Code CLI (Optional)**
For terminal users. Full slash command set can be mirrored in `.claude/commands/`.

---

## Sidebar structure (`index.html`)

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
  ↗   Weekly export

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

---

## CLAUDE.md - the brain

`CLAUDE.md` is the single most important file. It contains:

- **Identity & positioning**: Job search status, PMSV consulting entity, target roles
- **Key metrics**: Every career metric across all roles (real - never modify)
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

## New in v4.2 - GitHub Pages Optimization

### `index.html` Renaming
The dashboard file has been renamed from `job-search-os-v5.html` to `index.html`. This allows for zero-config deployment to GitHub Pages. Once pushed to a repo, the dashboard is live at `https://username.github.io/repo-name`.

### `/sync` Panel
The Sync panel now encourages deployment to GitHub Pages to provide a stable URL for the Chrome Extension and the Claude Project to reference live outreach data.

---

## Chrome Extension v2 - MV3 fix

### Root cause
Manifest V3 enforces a strict Content Security Policy that blocks all inline `onclick="..."` attribute handlers.

### Fix
`popup.html` rebuilt with **zero inline handlers**. Every interactive element has a unique `id`. `popup.js` wires all interactions via `addEventListener` on `DOMContentLoaded`.

**Rule**: Any button added dynamically to the DOM (via `innerHTML`) must be wired via `querySelectorAll` + `addEventListener` immediately after the DOM update.

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

**11. MV3 extension: no inline handlers.** All event handling via `addEventListener` in `wireButtons()`.

**12. Strike-through, not delete.** Closed/withdrawn pipeline roles and Not Interested companies should dim and strike-through, not be removed.

---

## Pranjal's background - quick reference for LLMs

**Huawei** (Feb 2018–Jul 2021): Director BD / Director Strategic Partnerships. 1,000+ ISVs. SDK 300%. Revenue $1M→$100M. Users 2M→30M. Team 8. Kirin 9000: Pinterest, Porsche, Shazam, Vivino. Partners: Meta, Adobe, Match Group, Airbnb. 2× President's Award.

**Qualia** (Aug 2021–Oct 2022): Director BD. First BD hire. $20M pipeline. $9M at 120%.

**Pandora** (Oct 2012–Mar 2015): BD New Initiatives. Sponsored Listening ($155M), Retargeting ($40M), TV Ads ($10M). OEM: Sony, Microsoft, Honda. Total $200M+.

**Current**: PMSV Tech and Strategy (advisor). Adyogi (+16%), Wove (first 3 enterprise partners), MobiOffice (+7%), Zingerman's.

**Contact**: pranjal.mahna@gmail.com · 424.298.7516 · linkedin.com/in/pranjalmahna

---

*Last updated: April 13, 2026 · Job Search OS v4.2 · file: index.html*
