# Job Search OS - BD/Partnerships Edition
**Version 4.2 · April 2026**

A personal job search operating system built on Claude. Not a prompt library. Not a chatbot. A persistent, connected workspace that knows who you are, reads your calendar and email, tracks your outreach, generates tailored resumes, maps your referral network, and runs structured interactive workflows on command.

---

## What's in the box

| File | What it is |
|---|---|
| `job-search-os-v5.html` | Full dashboard - all workflows + resume generator + 5 Tools panels |
| `jobos-chrome-extension-v2.zip` | Chrome extension v2 - fully fixed (MV3 compliant), nudge alerts, Gist sync |
| `CLAUDE.md` | Master context file - your brain, loaded into every Claude session |
| `DEV_CONTEXT.md` | Developer reference - full system architecture for LLMs and engineers |
| `bd-partnerships-os-v2.zip` | Claude Code OS - slash commands + sub-agents for terminal use |
| `BD_Partnerships_Job_Search_OS.docx` | All prompts as a Word doc for offline reference |

---

## Setup in 10 minutes

### 1. Open the dashboard
Download `job-search-os-v5.html`. Double-click. Opens in Chrome or Safari - no server, no install, no internet required. All data saves automatically between sessions.

### 2. Install the Chrome extension v2
```
1. Remove any previous version: chrome://extensions → Job Search OS → Remove
2. Unzip jobos-chrome-extension-v2.zip
3. Chrome → chrome://extensions → Developer mode on
4. Load unpacked → select the jobos-extension-v2 folder
5. Pin it to your toolbar
```

### 3. Set up your Claude Project
1. Go to claude.ai → create a Project called **Job Search OS**
2. Project settings → upload `CLAUDE.md` to the knowledge base
3. Connect **Google Calendar**, **Gmail**, and **web search** in the Project settings
4. Open a new chat in the Project and type: *What do you know about me?*

If Claude responds with your Huawei/Qualia/Pandora background, target roles, and gap bridges without you pasting anything - it's working.

> **Important**: Google Calendar and Gmail only work inside the Claude Project, not in the local HTML dashboard. The dashboard generates prompts; Claude reads your live data when you paste those prompts into the Project.

### 4. (Optional) Set up weekly Google Sheets export
Go to Tools → Weekly export → Configure tab → "Generate Apps Script →". Copy the script into script.google.com and run `createJobSearchSheet()` once. It builds a 5-tab Google Sheet and sets a Sunday 9am email reminder automatically.

### 5. (Optional) Deploy to GitHub Pages for live sync
Deploy `job-search-os-v5.html` as `index.html` in a GitHub repo with Pages enabled. Paste the URL into the `/sync` panel. This gives your Claude Project a stable URL to reference your live outreach data.

### 6. (Optional) Configure Gist profile sync in the extension
Create a public GitHub Gist with `profile.json`, copy the raw URL, open the extension → Nudges tab → paste URL → Save. The extension fetches your latest profile on every open.

---

## How to use this system

This section covers exactly what to do, when, and what to expect - from the first time you open the dashboard through a full job search week.

---

### Understanding what lives where

There are two places you work:

**The HTML dashboard** (`job-search-os-v5.html`) - your command center. It tracks your pipeline, outreach, scores, and activity. Every workflow panel generates a complete Claude prompt. You copy that prompt and paste it into Claude. The dashboard itself does not talk to Claude - it builds the instructions for Claude.

**Your Claude Project** (claude.ai/projects) - where the intelligence lives. You paste the prompts here. Claude reads your Google Calendar and Gmail via the connected MCP tools. It knows your background from CLAUDE.md. This is where your briefings, interview prep, and analysis actually happen.

Think of it like this: the **dashboard is your cockpit**, the **Claude Project is your co-pilot**. The cockpit doesn't fly the plane - it gives you the controls. The co-pilot reads the instruments and responds.

---

### Your morning routine (15 minutes)

**Step 1 - Check the nudge badge (1 min)**

Open the Chrome extension. If the badge shows an amber number, you have follow-ups overdue. Click the extension → Nudges tab to see who. For each overdue contact, click "Copy nudge →" and paste into your Claude Project to get a specific, value-add follow-up message. Not "just checking in" - Claude writes something worth reading.

**Step 2 - Run your morning briefing (5 min)**

In the dashboard, click `/brief` in the sidebar. Click "Generate briefing prompt →". Copy it. Paste it into your Claude Project.

Claude will:
- Read your Google Calendar for today's events
- Search your Gmail for new LinkedIn alerts and recruiter replies from the last 3 days
- Review your live pipeline (auto-included in the prompt from your tracker)
- Flag overdue follow-ups from your outreach tracker
- Give you your top 3 actions for today

Read the output. Act on the top 3. Takes 2 minutes to read.

**Step 3 - Score any new LinkedIn alerts (5 min)**

If LinkedIn sent you job alerts overnight, open each one in Chrome. The extension auto-scores them on page load - you'll see the 5 bars appear with a verdict (Apply now / Consider / Skip) within a second. For any role scoring 75%+, click "+ Add to outreach tracker" to queue it.

For roles you want to explore further, click "Open in Claude ↗" - the extension copies the full scoring prompt and opens claude.ai where Claude gives you a deeper analysis with your 2 strongest angles and biggest gap.

---

### Before you apply to any role

This is the full pre-application sequence. Don't skip steps - each one takes 3–5 minutes and the compounding effect is real.

**Step 1 - Score the JD**

Open the job page in Chrome. The extension scores it automatically. If you're on a page the extension doesn't detect, go to the extension popup → `/score` tab → paste the JD manually. Verdict: Apply now means proceed. Consider means review carefully. Skip means your time is better spent elsewhere.

**Step 2 - Check your referral path first**

Before you apply cold, open the dashboard → `/network`. Click the company. You'll see your connection, the exact angle, and the nudge strategy. If there's a green or amber dot, you have a warm path - use it before submitting. Click "Generate referral strategy →" for the full Claude prompt.

Applying before warming the intro is leaving your biggest advantage on the table.

**Step 3 - Build the full application package**

In the dashboard, click `/apply`. Select the role type (this controls which bullets Claude surfaces - Enterprise, Edge AI, Startup, etc.). Select your contact situation. Click "Generate application package →". Copy and paste into your Claude Project.

Claude will deliver:
- JD analysis - what they actually care about
- Resume restructure - 4–5 bullets per role, your strongest proof for this specific company
- Gap bridge - how to address the main thing that doesn't fit
- Referral strategy - who to reach out to and the exact message
- Cover note - one specific hook tied to something real about the company

**Step 4 - Build the resume**

In the dashboard, click `/resume` (or hit the → button that appears after scoring). This pre-fills the resume generator with the company and JD.

Work through the 5 steps:
1. Confirm the role details
2. Select template - Enterprise (4-column grid) for Microsoft/Apple/Salesforce, Edge AI for Tenstorrent/Qualcomm, Startup for Emissary/early-stage
3. Review bullets - toggle off anything that doesn't fit
4. Click "Rewrite with Claude →" - Claude rewrites every bullet to match this JD's language while preserving every metric
5. Download the Node.js script, run it: `npm install -g docx && node generate_CompanyName_resume.js`

You get a formatted .docx ready to send.

---

### Managing your pipeline

The pipeline tracker is your single source of truth for active roles. Keep it honest - it drives your briefings, your weekly exports, and your pattern analysis.

**Adding a role**

Pipeline → "+ Add role" button. Fill in company, role title, stage, and next step. Click Add. The role appears immediately and is saved to your browser.

**Updating a role**

Directly in the table - no need to open any modal:
- **Stage** - use the "Move" dropdown in the last column. Change it from Applied to Recruiter screen to HM round etc. The date updates automatically.
- **Health** - click the 🟢/🟡/🔴 dropdown to change. Green = progressing, amber = uncertain, red = stalling or cold.
- **Next step** - click the text in the Next step column, edit it, click away. Saves automatically with a toast confirmation.

**Closing a role**

Use the Move dropdown → select Withdrawn, Rejected, or Closed. The row dims and the company name strikes through. Your data is preserved - it shows in exports and history - but it's visually removed from your active view.

**Running a pipeline review**

Click `/pipeline` in the sidebar. The prompt builds automatically from your live data. Copy it, paste into your Claude Project. Claude reviews what's moving, what's stalling, what's at risk of going cold, and gives you your top 3 pipeline actions for the week.

---

### Managing your outreach

The outreach tracker has 59 pre-loaded companies from your Google Sheet. This is your networking CRM.

**Logging outreach**

Find the company row. Click "↑ Today" - this logs today as the last outreach date and advances the status (Not Started → Reached Out, Reached Out → Follow-up Sent). The 14-day velocity chart updates instantly.

**Tracking follow-ups**

Each row has + and − buttons for follow-up count. Every time you send a follow-up, hit +. The extension's nudge badge reads these dates and alerts you when you're overdue (default: 10 days).

**Striking off companies**

Change the status dropdown to "Not Interested" - the row dims and strikes through. Company is preserved in your data and exports but visually cleared from your active list.

**Bulk outreach**

Select multiple companies using the checkboxes. Click "Generate outreach prompts →". Claude writes a personalized outreach prompt for each selected company using your specific angle and POV from the tracker.

**Adding a company**

Click "+ Add company". Fill in company name, tier, role, contact name, your angle (POV). Click Add. Appears in the table immediately, saved to your browser.

---

### The full interview lifecycle

**Night before - Prep**

Dashboard → `/prep`. Enter company, role, and interviewer name if you have it. Click "Generate prep →". Paste into Claude Project. Claude will:
- Search the web for recent news about this company
- Build a question bank of 10 BD-specific questions
- Map each question to your best story (A=Huawei, B=Qualia, C=Pandora, D=PMSV, E=Sony/Mobclix)
- Write 3 gap bridge narratives
- Write a "tell me about yourself" specifically for this company

**Morning of - Mock**

Dashboard → `/mock`. Select mode (hardest questions / weakest areas / full round). Paste into Claude Project. Claude asks one question at a time, waits for your answer, then scores each on Relevance, Specificity, and Impact Clarity (1–5 each), tells you what landed and what to fix, then moves to the next question.

This is the single most valuable thing in the system if you use it consistently.

**Within 2 hours after - Debrief**

Dashboard → `/debrief`. Enter the questions asked, what you noticed, your gut read. Paste into Claude Project. Claude scores each answer, finds the 2–3 moments you left value on the table, rewrites those answers, and drafts a thank-you email that references what you actually discussed - not a generic template.

After 3 debriefs, run `/pattern` to see what's emerging across interviews.

---

### When you get an offer

Dashboard → `/negotiate`. Enter the full offer details (base, bonus, equity, signing). Enter any competing offers and how much you want this role (1–10). Paste into Claude Project.

Claude will:
- Search for current comp benchmarks for this role in this market
- Identify your 3 specific leverage points (not generic - tied to your Huawei/Qualia/Pandora proof)
- Build a counter-offer with specific numbers
- Write the exact call script including what to say when they push back
- Prepare the "what if they say it's their best offer" response

---

### Building your thought leadership (monthly)

Dashboard → `/post`. Select a content pillar:

- **AI Partnership Stack** - your 6-layer framework. Pick a layer (MCP, motion design, ISV ecosystem, intelligence core) and a hook style (contrarian, framework reveal, story-first).
- **Hard-won lesson** - one specific thing you learned at Huawei, Qualia, or Pandora. The system pulls in your real credentials for that role.
- **AI ecosystem observation** - what you're seeing right now in how AI companies structure partnerships.
- **Myth vs reality** - a common misconception you've seen disproven in the field.
- **Builder's take** - what 0-to-1 program design actually looks like (intake, first 90 days, co-sell playbook, what makes them fail).

Fill in the config fields, click "Generate with Claude →". The post streams in real time - 150–250 words, practitioner-grade, no AI-slop openers, ends with a question to practitioners. Regenerate for a different angle. "Refine in Claude →" opens claude.ai with an editing prompt. Post history saves the last 20.

---

### Your weekly rhythm (Sunday, 20 minutes)

**Export your data**

Dashboard → `/export`. Click "↓ Full export (all tabs as JSON)". This downloads one file with everything - pipeline, outreach, scores, activity, stats. Open Google Apps Script → paste the JSON into `importFullExport()` → run it. Your Sheet updates with a week tag.

Or for a quick update: click "Copy outreach → paste into Sheets", open your Sheet, click A1, paste. Done in 30 seconds.

**Weekly review with Claude**

In the same `/export` panel, click "Copy weekly summary → paste into Claude". Paste into your Claude Project. Claude reviews your full week - what moved, what stalled, overdue follow-ups, and your top 3 priorities for next week.

---

### Understanding the sub-agents

The sub-agents are the most underused feature. Use them before you submit anything important.

Dashboard → Agents → pick one → Copy → paste into Claude Project along with your material.

- **@hiring-manager** - A VP of Partnerships who has hired 20+ BD professionals. 6-second scan, skeptical lens. Tells you first impression, top 3 things working, top 3 things not working with fixes, and a verdict: HIRE / STRONG MAYBE / MAYBE / NOT YET.
- **@recruiter** - 30-second screen. Tells you whether you'd pass the screen-in filter, what would get you rejected, and what's missing.
- **@bd-peer** - A practitioner who has actually built ISV ecosystems. Stress-tests your interview answers for specificity and credibility.
- **@skeptic** - Makes the strongest possible case against hiring you. For every concern: what triggers it, how serious it is, and the exact bridge narrative. Also gives you the hardest question a skeptical interviewer would ask.
- **@coach** - Reviews your answers and tells you exactly where you left value on the table and how to rewrite.

Run @skeptic before every final-round interview. Run @hiring-manager before submitting any application.

---

### The pattern log - your long-term asset

Every time you run `/debrief`, a record is created in your usage history. After 3 debriefs, run `/pattern`. After 10, the system can identify:
- Which question types you consistently score below 3.5 on
- Which story you over-rely on
- Which story you underuse (usually the Pandora OEM story)
- What to drill before your next interview

This is where the system compounds. The first week it's useful. After 10 interviews it knows your habits better than you do.

---

## Component 1 - Dashboard (`job-search-os-v5.html`)

### What's new in v4.2

**Live dates and greetings** - The dashboard now shows today's actual date and a time-aware greeting (Good morning / Good afternoon / Good evening) every time you open it. The digest panel heading also updates to today's date.

**Calendar fixed** - Removed hardcoded April 10 appointments. The dashboard is a local HTML file - it cannot read Google Calendar directly. Both calendar areas now clearly explain this and direct you to the Claude Project where the live calendar MCP connection works.

**Pipeline fully editable inline** - Health is now a 🟢/🟡/🔴 dropdown per row. Next step is an editable inline text field that saves on blur. Stage has always had the Move dropdown. All three save immediately to localStorage.

**Pipeline prompt is live** - The `/pipeline` Claude prompt now builds dynamically from your actual pipeline data, not from the original hardcoded April 10 roles.

### All sidebar sections

**Overview**: Dashboard, Pipeline, Outreach, Usage history

**Workflows**: /brief, /score, /apply, /referral, /prep, /mock, /debrief, /negotiate, /pattern, /resume

**Tools**: /sync, /network, /digest, /post, /export

**Agents**: Sub-agents

### Data persistence - all localStorage keys

| Key | What it stores |
|---|---|
| `jobos_v3` | Pipeline, history, scores, stats, activity map |
| `jobos_outreach_v1` | Outreach tracker: all 59 companies + status/date/followup data |
| `jobos_sync_url` | Deployed GitHub Pages URL |
| `jobos_digest_config` | Digest settings: min score, always-include, sources, nudge days |
| `jobos_post_history` | Last 20 LinkedIn posts generated |

Data is stored in your browser only. To back up: Usage History → Export JSON, or `/export` → Full JSON. To reset: browser developer tools → Application → Local Storage → delete all `jobos_*` keys.

---

## Component 2 - Chrome Extension v2 (`jobos-chrome-extension-v2.zip`)

### Installation
```
1. Remove any previous version: chrome://extensions → Job Search OS → Remove
2. Unzip jobos-chrome-extension-v2.zip
3. Chrome → chrome://extensions → Developer mode on
4. Load unpacked → select jobos-extension-v2 folder
5. Pin to toolbar
```

### Badge states
- **Amber number** - overdue follow-ups waiting. Click to see who.
- **Green ▶** - you're on a recognized job page (LinkedIn, Greenhouse, Lever, Ashby, Indeed, Glassdoor, Wellfound, Built In).
- **Nothing** - not on a job page, no overdue nudges.

### 6 tabs
| Tab | What it does |
|---|---|
| `/score` | Auto-extracts JD on page load, scores instantly, shows fit analysis. Manual paste fallback. After scoring: "+ Add to outreach tracker" button. "Open in Claude ↗" copies prompt + opens claude.ai. |
| `/apply` | Select role type + contact situation → full application package prompt |
| `/brief` | Morning briefing prompt generator with pipeline pre-filled |
| `Nudges` | Overdue follow-up alerts. Copy nudge prompt per company. Mark sent. Export scored roles as JSON. Gist profile URL config. |
| `Log` | Commands run, today's count, roles scored, streak |
| `⚡` | One-click copy: /referral, /prep, /mock, /debrief, /negotiate, /pattern, @hiring-manager, @skeptic |

---

## Component 3 - CLAUDE.md (Master context file)

The most important file in the system. Everything else inherits from it.

Upload to your Claude Project knowledge base. Update monthly or when your job search changes:

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

## Component 4 - Claude Code OS (`bd-partnerships-os-v2.zip`)

For terminal users. Full slash commands + sub-agents + local file automation.

```bash
unzip bd-partnerships-os-v2.zip -d ~/job-search-os
cd ~/job-search-os
claude  # CLAUDE.md auto-loads
```

Use the pattern log after every debrief - after 10 entries it finds habits you can't see yourself.

---

## FAQ

**Why does the calendar show a message instead of my events?**
The dashboard is a local HTML file - it has no API connection to Google Calendar. Your live calendar is only readable inside the Claude Project, where the Google Calendar MCP connector is active. Open your Claude Project and run `/brief` there, or just ask "What's on my calendar today?" - Claude reads it live.

**Why weren't the extension buttons working before?**
Manifest V3 Chrome extensions block all inline `onclick=` handlers via a Content Security Policy - silently, with no error. Every button was wired that way. The rebuilt extension uses `addEventListener` throughout. Remove any old version and reinstall the current zip.

**My pipeline changes aren't saving. What's wrong?**
They are saving - to `localStorage` in your browser. Changes persist across sessions as long as you use the same browser on the same computer. If you open the file in a different browser or clear browser data, you'll start fresh. Export your data regularly via Usage History → Export JSON or `/export` → Full JSON.

**Can I tick off companies I'm no longer pursuing?**
Yes - two ways. Outreach tracker: change status to **Not Interested** → row dims and strikes through, data preserved. Pipeline: Move dropdown → **Withdrawn**, **Rejected**, or **Closed** → same treatment.

**How do I edit a pipeline role's next step or health?**
Directly in the table - no modal needed. Click the next step text to edit inline. Click away to save. Use the health dropdown (🟢/🟡/🔴) to change health. Use the Move dropdown to change stage. All save immediately.

**The brief prompt doesn't include my calendar. Why?**
The brief prompt tells Claude to read your calendar when you paste it into the Claude Project. The dashboard can't read Gmail or Calendar directly - it's a local HTML file with no API access. Paste the prompt into your Claude Project (where Gmail and Google Calendar MCP are connected) and Claude reads both live.

**How do I get scored roles from the extension into the dashboard?**
Score a role on LinkedIn → "+ Add to outreach tracker" → Nudges tab → "Export scored roles as JSON" → dashboard `/sync` → Import from Chrome extension → paste → Import.

**What's the most important thing to do in the first week?**
Three things: (1) Make sure CLAUDE.md loads in your Claude Project - test it by asking "What do you know about me?". (2) Run `/brief` every morning in the Project. (3) Run `/mock` before your next interview. Everything else compounds from there.

---

## Version history

| Version | Date | What changed |
|---|---|---|
| v1 | March 2026 | Initial OS - 4 workflows, basic CLAUDE.md |
| v2 | Early April 2026 | Morning briefing, role scorer, referral-first, negotiation, pattern tracker |
| v3 | April 10, 2026 | Full HTML dashboard, outreach tracker (59 companies), Chrome extension v1, resume generator, bullet library, usage tracking, weighted scoring |
| v3.1 | April 11, 2026 | Resume generator integrated into dashboard, score→resume handoff, Chrome extension v2 (nudge badge, Gist sync, outreach sync, Nudges tab) |
| v4 | April 11, 2026 | Four Tools panels: `/sync`, `/network`, `/digest`, `/post` |
| v4.1 | April 12, 2026 | Chrome extension MV3 fix. Pipeline strike-through. Outreach Not Interested strike-through. `/export` weekly Sheets panel. |
| v4.2 | April 13, 2026 | Live date/greeting on open. Calendar hardcoded events removed - replaced with Claude Project MCP instructions. Pipeline health + next step editable inline. Pipeline prompt dynamic from live STATE. |

---

*Built with Claude. Powered by your own context. Gets smarter every week.*
*pranjal.mahna@gmail.com · linkedin.com/in/pranjalmahna*
