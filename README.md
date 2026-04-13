# Job Search OS - BD/Partnerships Edition
**Version 4.2 · April 2026**

A personal job search operating system built on Claude. Not a prompt library. Not a chatbot. A persistent, connected workspace that knows who you are, reads your calendar and email, tracks your outreach, generates tailored resumes, maps your referral network, and runs structured interactive workflows on command.

---

## What's in the box

| File | What it is |
|---|---|
| `index.html` | Full dashboard v4.2 - all workflows + resume generator + 5 Tools panels. Renamed for GitHub Pages compatibility. |
| `jobos-extension-v2/` | Chrome extension v2 source - fully fixed (MV3 compliant), nudge alerts, token-optimized prompts. |
| `CLAUDE.md` | Master context file (The Brain) - your identity and non-negotiable metrics. |
| `BULLET_LIBRARY.md` | Complete bullet library - raw text for all resume bullets (token-optimized). |
| `WORKFLOW_GUIDE.md` | Workflow instructions - houses the logic for all slash commands (token-optimized). |
| `DEV_CONTEXT.md` | Developer reference - full system architecture for LLMs and engineers. |

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

### 3. Set up your Claude Project
1. Go to [claude.ai/projects](https://claude.ai/projects) → create a Project called **Job Search OS**.
2. **Project settings** → upload `CLAUDE.md`, `BULLET_LIBRARY.md`, and `WORKFLOW_GUIDE.md` to the knowledge base.
3. Connect **Google Calendar**, **Gmail**, and **web search** in the Project settings.
4. Open a new chat in the Project and type: *What do you know about me?*

Claude should respond with your Huawei/Qualia/Pandora background and core metrics.

---

## Token Optimization (New in v4.2)

Version 4.2 is engineered for **extreme token efficiency**. By splitting the knowledge base into three files (`CLAUDE.md`, `BULLET_LIBRARY.md`, `WORKFLOW_GUIDE.md`) and using **XML-tagged structural prompting**, the system now consumes ~75% fewer tokens per turn.

- **`CLAUDE.md` (The Brain)**: Loaded every turn. Contains only essential identity and metrics.
- **`BULLET_LIBRARY.md` (The Data)**: Only accessed when building or refining resumes.
- **`WORKFLOW_GUIDE.md` (The Logic)**: Instructions for slash commands are stored here, so they don't need to be sent in every prompt.

---

## How to use this system

### Your morning routine (15 minutes)

1. **Check Nudges**: Open the Chrome extension. If the badge is amber, copy the nudge prompt for overdue follow-ups.
2. **Run Briefing**: Dashboard sidebar → `/brief`. Copy the XML-tagged prompt and paste into Claude. Claude reads your calendar and email live.
3. **Score Alerts**: Open new job postings in Chrome. The extension auto-scores them. If 75%+, add to your outreach tracker **or directly to your active pipeline**.

### Before you apply

1. **Score the JD**: Use the extension or `/score` in the dashboard.
2. **Network Map**: Dashboard → `/network`. Check for warm referral paths before submitting cold.
3. **Build Application**: Dashboard → `/apply`. Get a tailored resume restructure, gap bridge, and cover note.
4. **Generate Resume**: Dashboard → `/resume`. Walk through the 5-step builder. Download the Node.js script to get a perfectly formatted `.docx`.

---

## Version history

| Version | Date | What changed |
|---|---|---|
| v4.2 | April 13, 2026 | **Renamed dashboard to `index.html`** for GitHub Pages. Added **password gate**. **Full Token Optimization**: Split knowledge base into 3 files. Implemented **XML structural prompting**. Removed all JD/email truncation limits. Standardized punctuation (no em-dashes). **Direct pipeline sync from extension.** |
| v4.1 | April 12, 2026 | MV3 Extension fix. Pipeline strike-through. Outreach "Not Interested" logic. `/export` weekly Sheets panel. |
| v4.0 | April 11, 2026 | New Tools: `/sync`, `/network`, `/digest`, `/post`. |

---

*Built with Claude. Powered by your own context. Gets smarter every week.*
*pranjal.mahna@gmail.com · linkedin.com/in/pranjalmahna*
