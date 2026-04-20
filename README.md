# Job Search OS - BD/Partnerships Edition
**Version 4.6 · April 2026**

A personal job search operating system built on Claude. Not a prompt library. Not a chatbot. A persistent, connected workspace that knows who you are, reads your calendar and email, tracks your outreach, generates tailored resumes, maps your referral network, and runs structured interactive workflows on command.

---

## What's in the box

| File | What it is |
|---|---|
| `index.html` | Full dashboard v4.7 - all workflows + resume generator + 5 Tools panels + Inbox triage. |
| `jobos-extension-v2/` | Chrome extension v2 source - MV3 compliant, nudge alerts, state backup, inbox queuing, resume fill. |
| `CLAUDE.md` | Master context file (The Brain) - your identity and non-negotiable metrics. |
| `BULLET_LIBRARY.md` | Complete bullet library - raw text for all resume bullets (token-optimized). |
| `WORKFLOW_GUIDE.md` | Workflow instructions - houses the logic for all slash commands (token-optimized). |
| `DEV_CONTEXT.md` | Developer reference - full system architecture for LLMs and engineers. |
| `PERSISTENCE_FIX.md` | Explains the localStorage-clearing bug and the chrome.storage.local backup fix (v4.5 pipeline, v4.7 outreach tracker). |

---

## Setup in 10 minutes

### 1. Deploy the dashboard
1. Upload `index.html` to a GitHub repository.
2. Enable **GitHub Pages** in the repository settings.
3. Access your dashboard at `https://username.github.io/repo-name`.
4. (Optional) Set an access key via the integrated password gate (current: `Satchitanand`).

### 2. Install the Chrome extension v2
1. Remove any previous version: `chrome://extensions` → Job Search OS → Remove.
2. Download or clone the `jobos-extension-v2` folder.
3. Chrome → `chrome://extensions` → Developer mode on.
4. Load unpacked → select the `jobos-extension-v2` folder.
5. Pin it to your toolbar.
6. Open the extension → **Nudges tab** → paste your dashboard URL (e.g. `https://samuraiman2026.github.io/DigiJobOS/`) → **Save dashboard URL**.

### 3. Set up your Claude Project
1. Go to [claude.ai/projects](https://claude.ai/projects) → create a Project called **Job Search OS**.
2. **Project settings** → upload `CLAUDE.md`, `BULLET_LIBRARY.md`, and `WORKFLOW_GUIDE.md` to the knowledge base.
3. Connect **Google Calendar**, **Gmail**, and **web search** in the Project settings.
4. Open a new chat in the Project and type: *What do you know about me?*

Claude should respond with your Huawei/Qualia/Pandora background and core metrics.

---

## Token Optimization (Updated v4.3)

The system is engineered for **extreme token efficiency** through architectural partitioning and XML-tagged structural prompting.

- **`CLAUDE.md` (The Brain)**: Loaded every turn. Contains only essential identity, metrics, and behavioral instructions - **38% smaller in v4.3** after moving the Resume Relevance Mapping to `BULLET_LIBRARY.md`.
- **`BULLET_LIBRARY.md` (The Data)**: Contains all resume bullets plus the Resume Relevance Mapping. Only accessed when building or refining resumes.
- **`WORKFLOW_GUIDE.md` (The Logic)**: All slash command instructions. Prompts reference this file instead of repeating logic inline.

**After each update to these files, re-upload them to your Claude Project knowledge base.**

---

## How to use this system

### Your morning routine (15 minutes)

1. **Check Nudges**: Open the Chrome extension. If the badge is amber, copy the nudge prompt for overdue follow-ups.
2. **Run Briefing**: Dashboard sidebar → `/brief`. Copy the XML-tagged prompt and paste into Claude. Claude reads your calendar and email live.
3. **Score Alerts**: Open new job postings in Chrome. The extension auto-scores them. If 75%+, click **Add to pipeline** or **Add to outreach tracker**. Items sync to the dashboard automatically the next time you open it - no copy/paste required.

### Before you apply

1. **Score the JD**: Use the extension or `/score` in the dashboard.
2. **Network Map**: Dashboard → `/network`. Check for warm referral paths before submitting cold.
3. **Build Application**: Dashboard → `/apply`. Get a tailored resume restructure, gap bridge, and cover note.
4. **Generate Resume**: Dashboard → `/resume`. Walk through the 5-step builder. Download the Node.js script to get a perfectly formatted `.docx`.

---

## Version history

| Version | Date | What changed |
|---|---|---|
| v4.7 | April 20, 2026 | **Outreach backup**: clearing browser cookies no longer wipes the outreach tracker. `saveOutreach()` mirrors to `chrome.storage.local['jobos_outreach_backup']`; `checkExtensionSync()` restores it in parallel with the pipeline backup on next load. |
| v4.6 | April 20, 2026 | **Role inbox**: new triage stage "To Review" and dedicated Inbox panel with per-role Apply/Resume/Pass actions. Extension "Queue for review" button routes scored roles to inbox (not directly to Applied) and passes JD text through. **Daily affirmation**: rotating quote at the top of the dashboard, stable all day, changes each morning. **Resume fill from extension**: "→ Fill /resume" button pre-populates all Step 1 fields from a job page. |
| v4.5 | April 16, 2026 | **Persistence fix**: pipeline state now backed up to `chrome.storage.local` on every save and auto-restored on load if `localStorage` was cleared by browser privacy settings. Silent fallback to `defaultState()` replaced with a toast-notified restore. See `PERSISTENCE_FIX.md` for full details. |
| v4.4 | April 13, 2026 | **Auto-sync**: extension items now appear in the dashboard automatically on every page load - no JSON export/paste required. Uses `externally_connectable` + `dashboard_bridge.js` content script so the dashboard can pull queued items from the extension on open. |
| v4.3 | April 13, 2026 | **Sync bug fix**: imported contacts and pipeline roles now appear immediately in the dashboard without re-navigating. **Extension fix**: pipeline sync button now displays correctly (flex layout). **Token optimization**: CLAUDE.md reduced 38% - Resume Relevance Mapping moved to BULLET_LIBRARY.md, redundant Slash Commands section removed. |
| v4.2 | April 13, 2026 | **Renamed dashboard to `index.html`** for GitHub Pages. Added **password gate**. **Full Token Optimization**: Split knowledge base into 3 files. Implemented **XML structural prompting**. Removed all JD/email truncation limits. Standardized punctuation (no em-dashes). **Direct pipeline sync from extension.** |
| v4.1 | April 12, 2026 | MV3 Extension fix. Pipeline strike-through. Outreach "Not Interested" logic. `/export` weekly Sheets panel. |
| v4.0 | April 11, 2026 | New Tools: `/sync`, `/network`, `/digest`, `/post`. |

---

*Built with Claude. Powered by your own context. Gets smarter every week.*
*pranjal.mahna@gmail.com · linkedin.com/in/pranjalmahna*
