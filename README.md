# Job Search OS — BD/Partnerships Edition
**Version 4.1 · April 2026**

A personal job search operating system built on Claude. Not a prompt library. Not a chatbot. A persistent, connected workspace that knows who you are, reads your calendar and email, tracks your outreach, generates tailored resumes, maps your referral network, and runs structured interactive workflows on command.

---

## What's in the box

| File | What it is |
|---|---|
| `job-search-os-v5.html` | Full dashboard — all workflows + resume generator + 5 Tools panels |
| `jobos-chrome-extension-v2.zip` | Chrome extension v2 — fully fixed (MV3 compliant), nudge alerts, Gist sync |
| `CLAUDE.md` | Master context file — your brain, loaded into every Claude session |
| `DEV_CONTEXT.md` | Developer reference — full system architecture for LLMs and engineers |
| `bd-partnerships-os-v2.zip` | Claude Code OS — slash commands + sub-agents for terminal use |
| `BD_Partnerships_Job_Search_OS.docx` | All prompts as a Word doc for offline reference |

---

## Setup in 10 minutes

### 1. Open the dashboard
Download `job-search-os-v5.html`. Double-click. Opens in Chrome or Safari — no server, no install, no internet required. All data saves automatically between sessions. The resume generator and all five Tools panels are built in.

### 2. Install the Chrome extension v2
```
1. Remove any previous version: chrome://extensions → Job Search OS → Remove
2. Unzip jobos-chrome-extension-v2.zip
3. Chrome → chrome://extensions → Developer mode on
4. Load unpacked → select the jobos-extension-v2 folder
5. Pin it to your toolbar
```

> **Note**: The extension was fully rebuilt in this version to fix a Manifest V3 issue that silently broke every button. If buttons weren't working before, this version fixes it.

### 3. Set up your Claude Project
1. Go to claude.ai → create a Project called **Job Search OS**
2. Project settings → upload `CLAUDE.md` to the knowledge base
3. Connect Google Calendar, Gmail, and web search in the Project
4. Open a new chat in the Project and type: *What do you know about me?*

If Claude responds with your Huawei/Qualia/Pandora background, target roles, and gap bridges without you pasting anything — it's working.

### 4. (Optional) Deploy to GitHub Pages for live sync
Deploy `job-search-os-v5.html` as `index.html` in a GitHub repo with Pages enabled. Once deployed, use the `/sync` panel in the dashboard to configure the URL. This gives the Chrome extension and your Claude Project a stable URL to reference for live outreach data.

### 5. (Optional) Set up weekly Google Sheets export
Go to Tools → Weekly export → Configure tab → "Generate Apps Script →". Copy the script into script.google.com and run `createJobSearchSheet()` once. It builds a 5-tab Google Sheet and sets a Sunday 9am email reminder automatically.

### 6. (Optional) Configure Gist profile sync in the extension
1. Create a public GitHub Gist with a file called `profile.json`
2. Copy the raw URL (click Raw in GitHub Gist)
3. Open the extension → Nudges tab → paste raw URL → Save

---

## The daily workflow

| When | Action | Tool |
|---|---|---|
| Morning (2 min) | Run briefing — top 3 actions, follow-up alerts | Dashboard `/brief` → paste into Claude |
| Morning | Check nudge badge — amber number = overdue follow-ups | Chrome extension → Nudges tab |
| Morning | Run email digest — score all new LinkedIn alerts + recruiter replies | Dashboard `/digest` → paste into Claude |
| Before applying | Score any JD on LinkedIn | Chrome extension → auto-scores on open |
| After scoring | One-click → resume generator with role pre-filled | Extension `/score` → score→resume button |
| Before applying | Check your referral path to the company first | Dashboard `/network` → select company |
| Before applying | Build warm intro before submitting | Dashboard `/referral` → paste into Claude |
| When applying | Full application package — resume, gap bridge, cover note | Dashboard `/apply` or `/resume` panel |
| Night before interview | Full prep with live company research | Dashboard `/prep` → paste into Claude |
| Morning of interview | Interactive mock — one Q at a time, live scoring | Dashboard `/mock` → paste into Claude |
| Within 2 hrs after | Debrief — score answers, draft thank-you | Dashboard `/debrief` → paste into Claude |
| When offer arrives | Negotiation strategy + exact call script | Dashboard `/negotiate` → paste into Claude |
| Weekly (Sunday) | Export all data to Google Sheets | Dashboard `/export` → download CSVs or full JSON |
| Weekly | Pipeline review + sync extension → dashboard | Dashboard `/pipeline` + `/sync` panel |
| Monthly | Write a LinkedIn post on your AI partnership expertise | Dashboard `/post` → select pillar |
| After 3+ interviews | Pattern analysis — find weak spots | Dashboard `/pattern` → paste into Claude |

---

## Component 1 — Dashboard (`job-search-os-v5.html`)

### What's new in v4.1

Three additions on top of the v4 Tools panels:

**Weekly export panel (`/export`)** — Export all your data to Google Sheets every Sunday. Five CSV download buttons, a direct paste-to-Sheets clipboard copy, a full JSON export, a generated Apps Script for automated setup, and a weekly summary copier for Claude review. See Tools — `/export` below.

**Pipeline tracker — stage editing + strike-through** — Each pipeline role now has an inline **Move** dropdown in the table to change stage without deleting and re-adding. New stages: Withdrawn, Rejected, Closed. Roles with any of these stages appear at 45% opacity with the company name struck through.

**Outreach tracker — Not Interested strike-through** — Changing a company's status to "Not Interested" now visually strikes through that row and dims it to 45% opacity. Data is preserved, but the row is visually removed from your active list.

### All sidebar sections

**Overview**: Dashboard, Pipeline, Outreach, Usage history

**Workflows**: /brief, /score, /apply, /referral, /prep, /mock, /debrief, /negotiate, /pattern, /resume

**Tools**: /sync, /network, /digest, /post, /export *(new in v4.1)*

**Agents**: Sub-agents

---

### Tools — `/sync` (Outreach sync)

Connects the dashboard to the Chrome extension and your Claude Project via a shared URL.

- GitHub Pages deployment steps, URL input saved to `jobos_sync_url`
- Export outreach tracker as JSON (download or copy)
- Import from Chrome extension: paste JSON, companies are added with auto-tier from score
- Claude Project sync prompt: pre-written, tells Claude to fetch your live data at session start
- Live tracker snapshot: companies tracked, reached out, with named contact, overdue

---

### Tools — `/network` (Network map)

Maps every warm referral path to 20+ priority target companies.

- Color-coded strength dots: 🟢 direct (3) · 🟡 warm/2nd degree (2) · 🔵 community (1) · grey = cold
- Filterable by: All / Warm path only / Tier 1 only / No contact yet
- Company detail: connection + angle + nudge strategy + "Generate referral strategy →" Claude prompt
- Pre-mapped: Meta, Adobe, Microsoft, Airbnb, Salesforce, Tenstorrent, Nothing.tech, Apple, Google, Amazon, Anthropic, Notion, OpenAI, Figma, Typeface, NVIDIA, Databricks, Snowflake, Zoom, Emissary

---

### Tools — `/digest` (Email digest)

Turns your Gmail inbox into a scored, prioritized morning digest.

- **Generate tab**: Date range + section toggles. Builds a Claude prompt that reads Gmail via MCP, scores every new role, injects overdue follow-ups live from your tracker, asks for top 3 actions.
- **Configure tab**: Min score (65%), always-include companies, sources, nudge threshold (days). Generates a Gmail Apps Script for 7am daily automation.
- **History tab**: Logs of digest runs.

---

### Tools — `/post` (LinkedIn post generator)

Practitioner-grade LinkedIn posts via Claude API streaming.

| Pillar | What it produces |
|---|---|
| AI Partnership Stack | Posts on your 6-layer framework — layer focus + hook style |
| Hard-won lesson | Specific lesson from Huawei/Qualia/Pandora with story + principle |
| AI ecosystem observation | What you're seeing in AI partnerships right now |
| Myth vs reality | Myth disproven with a real story, restated as actionable principle |
| Builder's take | 0-to-1 program design specifics — intake, first 90 days, co-sell, metrics |

Enforces: 150–250 words, no "Excited to share" openers, ends with a practitioner question. Regenerate, Refine in Claude, Copy post. Post history saves last 20.

---

### Tools — `/export` (Weekly export to Google Sheets) *(new in v4.1)*

Exports your full job search data to Google Sheets every Sunday.

**Export buttons:**
- ↓ Pipeline tracker (CSV)
- ↓ Outreach tracker — all companies (CSV)
- ↓ Scored roles this week (CSV)
- ↓ Weekly activity log (CSV)
- ↓ Full export — all tabs as JSON

**Paste to Sheets (fastest):** Copies tab-separated data to clipboard — open any Sheet, click A1, paste.

**Apps Script setup (one time):**
1. Click "Generate Apps Script →" in the Configure tab
2. Copy → paste into script.google.com → New project
3. Run `createJobSearchSheet` once — creates 5-tab Sheet (Pipeline, Outreach, Scored Roles, Activity Log, Weekly Summaries)
4. Sets a Sunday 9am email reminder automatically
5. Use `importFullExport()` to write all data with a week tag each Sunday

**Weekly summary:** Formats your full week as a structured Claude briefing — pipeline, outreach, activity, active interviews — ready to paste for "what are my top 3 priorities next week" review.

---

### All other panels (unchanged from v3.1)

**Dashboard** — Live calendar, pipeline health snapshot, 26-week activity heatmap, 4 live metrics. Quick-launch: `/brief`, `/score`, `/resume`, `/network`, `/digest`, `/post`, `/export`.

**Pipeline tracker** — Stage pills, health dots, last action, next step. Inline stage editing (Move dropdown). Withdrawn/Rejected/Closed rows struck through.

**Outreach tracker** — 59 companies pre-loaded. 14-day velocity chart, daily goal bar, bulk outreach prompt generator. Not Interested rows struck through.

**Usage history** — Every command logged. Four views, export JSON, streak counter.

**10 workflow panels** — Each generates a complete pre-filled Claude prompt.

**`/resume` panel** — 5-step generator with score→resume handoff from `/score`.

**5 sub-agent panels** — @hiring-manager, @recruiter, @bd-peer, @skeptic, @coach.

### Data persistence — all localStorage keys

| Key | What it stores |
|---|---|
| `jobos_v3` | Main OS state: pipeline, history, scores, stats, activity map |
| `jobos_outreach_v1` | Outreach tracker: 59 companies + all status/date/followup data |
| `jobos_sync_url` | Deployed GitHub Pages URL for live outreach sync |
| `jobos_digest_config` | Digest configuration: min score, always-include, sources, nudge days |
| `jobos_post_history` | Last 20 LinkedIn posts generated (pillar, text, date) |

To reset: browser developer tools → Application → Local Storage → delete all `jobos_*` keys.

---

## Component 2 — Chrome Extension v2 (`jobos-chrome-extension-v2.zip`)

### What was fixed in this version

**All buttons were broken due to a Manifest V3 CSP issue.** MV3 Chrome extensions enforce a strict Content Security Policy that silently blocks all inline `onclick="..."` attribute handlers. Every button in the popup was wired this way, so nothing worked. The fix: `popup.html` rebuilt with zero inline handlers. A single `wireButtons()` function in `popup.js` wires everything via `addEventListener`.

**To install**: Remove any old version first → unzip → chrome://extensions → Load unpacked → select folder → pin.

### Features

**Badge**: Amber number = overdue follow-ups (priority); green `▶` = on job page; empty = neither.

**6 tabs**: /score (auto-extract + sync to tracker), /apply, /brief, Nudges (follow-up alerts + export + Gist config), Log, ⚡ (shortcuts).

**Nudges tab**: Overdue contacts with days-since, Copy nudge → (value-add follow-up prompt), Mark sent (updates date + status).

**Gist profile sync**: Host `profile.json` on public Gist, paste raw URL in Nudges tab. Fetches live on every popup open.

**Outreach sync**: Score a role → "+ Add to outreach tracker" → export JSON → import in dashboard `/sync` panel.

**Improved extraction**: Multi-selector LinkedIn extraction, 800ms retry for lazy-loaded content.

---

## Component 3 — CLAUDE.md (Master context file)

The most important file in the system. Everything else is scaffolding.

**How to update** (run monthly or when job search evolves):
```
My job search has evolved. Here is my current CLAUDE.md: [paste]

Update it to reflect:
- New target roles: [list]
- Dropped roles: [list]
- New proof points: [describe]
- Changed gap bridges: [describe]
- What I've learned resonates: [describe]

Keep the same structure. Flag anything outdated.
```

---

## Component 4 — Claude Code OS (`bd-partnerships-os-v2.zip`)

For terminal users. Full slash commands + sub-agents + local file automation.

```bash
unzip bd-partnerships-os-v2.zip -d ~/job-search-os
cd ~/job-search-os
claude  # CLAUDE.md auto-loads
```

Use the pattern log religiously — after 10 debriefs it finds habits you can't see yourself.

---

## FAQ

**Why weren't the extension buttons working?**
Manifest V3 Chrome extensions block all inline `onclick=` attributes via a strict Content Security Policy — this happened silently with no error message. Every button was wired that way. The v2 extension in this version is fully rebuilt with `addEventListener` and works correctly. Remove any old version and reinstall.

**What's new in v4.1?**
Weekly export panel (`/export`) — CSV/JSON download, direct paste to Sheets, Apps Script generator for automated Sunday export. Pipeline stage editing inline (Move dropdown) with Withdrawn/Rejected/Closed stages showing as struck-through. Outreach tracker Not Interested status now strikes through the row visually.

**How does the weekly Sheets export work?**
Tools → Weekly export → generate Apps Script → paste into script.google.com → run `createJobSearchSheet()` once. Then every Sunday: click Full JSON export, run `importFullExport()` in the script to write all data to your Sheet with a week tag. Or click "Copy outreach → paste into Sheets" for a quick manual update.

**Can I tick off companies I'm no longer pursuing?**
Yes — two ways. In the outreach tracker, change status to **Not Interested** — the row dims and strikes through but data is preserved. In the pipeline, use the **Move** dropdown to set a role to **Withdrawn**, **Rejected**, or **Closed** — same visual treatment.

**What's new in v4?**
Four Tools panels: `/sync` (export/import + GitHub Pages), `/network` (referral map, 20+ companies), `/digest` (morning email digest + Apps Script automation), `/post` (LinkedIn post generator, 5 pillars, Claude API streaming).

**How does the referral network map work?**
Every target company has a pre-mapped connection path from your actual network. Click any company in `/network` to see your specific connection, the angle to use, and the nudge strategy. Hit "Generate referral strategy →" for a full Claude prompt.

**How do I automate the morning digest?**
`/digest` → Configure tab → "Generate Apps Script →" → script.google.com → 7am daily trigger. Searches Gmail for LinkedIn alerts and recruiter replies, emails you a pre-formatted Claude prompt each morning.

**How do I sync extension-scored roles to the dashboard?**
Score a role → "+ Add to outreach tracker" → Nudges tab → "Export scored roles as JSON" → dashboard `/sync` → Import from extension → paste JSON.

**How long does setup take?**
About 20 minutes: 5 to open the dashboard and install the extension, 10 to verify CLAUDE.md loads in your Project, 5 to score your first role.

**What's the most important file to get right?**
CLAUDE.md. Everything else inherits from it.

---

## Version history

| Version | Date | What changed |
|---|---|---|
| v1 | March 2026 | Initial OS — 4 workflows, basic CLAUDE.md |
| v2 | Early April 2026 | Morning briefing, role scorer, referral-first, negotiation, pattern tracker |
| v3 | April 10, 2026 | Full HTML dashboard, outreach tracker (59 companies), Chrome extension v1, interactive resume generator (separate file), complete bullet library, usage tracking + heatmap, weighted visual scoring |
| v3.1 | April 11, 2026 | Resume generator integrated into dashboard, score→resume handoff, Chrome extension v2 (nudge badge, Gist sync, outreach tracker sync, improved extraction, Nudges tab) |
| v4 | April 11, 2026 | Four new Tools panels: `/sync`, `/network`, `/digest`, `/post`. New localStorage keys: `jobos_sync_url`, `jobos_digest_config`, `jobos_post_history`. File: `job-search-os-v5.html`. |
| v4.1 | April 12, 2026 | Chrome extension MV3 fix (all buttons now work). Pipeline inline stage editing + Withdrawn/Rejected/Closed strike-through. Outreach Not Interested strike-through. `/export` panel: weekly CSV/JSON export, Apps Script for Google Sheets automation, weekly summary for Claude review. |

---

*Built with Claude. Powered by your own context. Gets smarter every week.*
*pranjal.mahna@gmail.com · linkedin.com/in/pranjalmahna*
