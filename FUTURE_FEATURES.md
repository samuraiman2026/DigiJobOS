# Job Search OS - Future Roadmap & Feature Ideas

This document tracks proposed enhancements for future versions of the Job Search OS.

---

## Shipped in v4.17

- **Single source of truth for scoring weights** ✓ — /score now loads all weights, calibrations, hard pass filters, WATCH OUTs, and Alignment Signals exclusively from `dream-job-criteria.md`. Inline weights removed from WORKFLOW_GUIDE.md.
- **Midpoint calibration in scoring rubric** ✓ — `dream-job-criteria.md` now includes a "5/10" column for each of the 5 scoring dimensions, making partial-score judgment consistent.
- **Strongest Alignment Signals wired as score modifiers** ✓ — each signal maps to a specific +0.5 dimension boost (capped at 10) and fires are noted in role card output.
- **Template type detection in /apply** ✓ — JD is classified into one of 6 types (enterprise/edgeai/hardware/startup/alliances/supply), then only the corresponding bullet IDs from BULLET_LIBRARY.md are used in Resume Restructure.
- **Score verdict wiring in /apply** ✓ — Apply Now leads with alignment framing; Apply with Bridge promotes Gap & Bridge Analysis before Resume Restructure.
- **Referral-first gate in /apply** ✓ — target company domains and 75+ scored roles trigger Referral Strategy as the first section of /apply output.
- **Dynamic /brief scan window** ✓ — uses max(72h, time since last /brief) instead of hardcoded 48-72h.
- **/mock modes defined** ✓ — Hardest, Weak, Full, Specific [topic], and Default (=Full) are explicitly specified with question counts and composition.
- **/pattern data source defined** ✓ — reads from `<mock_history>` tag; prompts user if missing.
- **/referral JD context injection** ✓ — must use company's product news and /score Focus field; generic templates disallowed.
- **/hunt title variants expanded** ✓ — added "Head of BD", "Head of Business Development", "VP Partnerships", "GM Partnerships", "Managing Director Business Development" to search queries.
- **/negotiate multi-offer framework** ✓ — `<competing_offer>` tag triggers multi-offer leverage section + walk-away line.
- **Story D strengthened + Story F added** ✓ — CLAUDE.md Story D now includes specific advisory companies and metrics; Story F added for conflict/setback/failure behavioral questions.

## Shipped in v4.16

- **Focus field in role cards** ✓ — /score and /hunt deep-dive cards now include Focus: the specific product, market, or team this BD role serves (e.g. "Retail media APIs", "GenAI platform partnerships"). Derived from JD signals, not company description. Falls back to "Not specified in JD — confirm in screen" if unclear.
- **Revenue/Growth field in role cards** ✓ — public companies: annual revenue + YoY growth rate, sourced and flagged if unverified; private companies: total raised + last round date only. Never estimates ARR for private companies.
- **/calibrate command** ✓ — 12-question interactive interview (one question at a time) to update dream-job-criteria.md as search priorities evolve. Shows change diff and requires confirmation before writing. Skips unchanged fields to preserve exact phrasing.
- **StressTests #27-36** ✓ — 10 new stress tests: /calibrate batching prevention, premature synthesis, no-confirmation write, unchanged field rewrite; Focus generic placeholder and sub-threshold bleed; Revenue/Growth public unverified assertion and private invented estimate; /hunt card field consistency; /calibrate + /score stale read regression.

## Shipped in v4.15

- **WATCH OUTS in /score** ✓ — every role card now includes red flags (comp not disclosed, IC-only structure, equity uncertainty, language requirements, churn signals, reports-to level).
- **Deep-dive role card in /score** ✓ — funding stage, approx comp range, reports-to level, WHY IT'S bullets added to scoring output.
- **Min score threshold in /brief** ✓ — job alerts pre-filtered to 65%+ fit; suppressed count shown at bottom.
- **dream-job-criteria.md** ✓ — explicit scoring rubric with weights, hard pass filters, role preferences, and WATCH OUT triggers. Loaded by /score and /hunt.
- **/hunt command** ✓ — proactive nightly web search for BD/Partnerships roles at AI-native companies, bypassing email alert dependency. Schedulable via Claude Cowork.
- **Focus + Revenue/Growth fields in role cards** ✓ — /score and /hunt deep-dive cards now include Focus (what product/market the BD role serves) and Revenue/Growth (public: revenue + YoY; private: total raised + last round date).
- **/calibrate command** ✓ — 12-question interactive interview to update dream-job-criteria.md as search priorities evolve. One question at a time, confirmation before writing.
- **StressTests #14-26** ✓ — 13 new stress tests covering all v4.15 features: /score sub-threshold truncation, WATCH OUTS completeness, hard pass filters (language buried, AE disguised as BD, full battery of all 6), /brief threshold + domain override + annotation parsing regression, dream-job-criteria score consistency regression, /hunt coverage + dedup + pre-filter, global no-em-dash compliance.

## Shipped in v4.7

- **Outreach tracker backup** ✓ — Clearing browser cookies no longer wipes the outreach tracker. Backed up to `chrome.storage.local` on every save, auto-restored on next load.

## Shipped in v4.6

- **Role inbox / triage queue** ✓ — "To Review" stage, Inbox panel, Apply/Resume/Pass actions, extension routes to inbox by default.
- **Daily affirmation** ✓ — Rotating quote at top of dashboard, stable all day, changes each morning.
- **Resume fill from extension** ✓ — "→ Fill /resume" button sends company, role, and JD directly into Step 1 fields.

---

## 1. Intelligence & Automation

### Semantic Bullet Search
- **Feature**: Instead of static template mapping, use local embeddings to find the top 5 most relevant bullets from `BULLET_LIBRARY.md` based on the specific keywords in a JD.
- **Impact**: Higher precision in resume tailoring with zero manual effort.

### In-Page Extension AI
- **Feature**: Integrate the Anthropic API directly into the Chrome extension `popup.js`.
- **Impact**: Get instant JD scoring, gap analysis, and "skeptic mode" questions without leaving the job board page.

### Auto-Follow-up Agent
- **Feature**: A background worker that scans the outreach tracker every Sunday night and drafts personalized "nudge" emails for every overdue contact.
- **Impact**: Maintains networking momentum automatically.

---

## 2. Interview & Performance

### Audio Transcription & Scoring
- **Feature**: Add an upload field in `/debrief` for MP3/WAV files. Use a transcription service (or local model) to convert the interview to text.
- **Impact**: Claude scores your actual delivery, tonality, and confidence rather than just your memory of the answers.

### Real-time "Cheat Sheet" Generator
- **Feature**: A button in `/prep` that generates a one-page "Battle Card" for a specific interviewer, including their background, common questions they ask, and your mapped STAR stories.
- **Impact**: Instant, high-value reference for the 5 minutes before an interview starts.

---

## 3. Infrastructure & Sync

### Lightweight Backend (Cloud Sync)
- **Feature**: Replace `localStorage` with a Supabase or Firebase backend.
- **Impact**: Seamless syncing between laptop, desktop, and mobile without manual JSON export/import.
- **Status**: Partially addressed in v4.5 - `chrome.storage.local` now acts as a persistent backup that survives browser restarts. Full cross-device sync still requires a backend.

### Gmail/Calendar MCP Connector (Native)
- **Feature**: A dedicated Node.js helper that runs locally to provide Claude with direct, authenticated access to Gmail and Calendar.
- **Impact**: Removes the need for the manual copy-paste of briefing prompts.

---

## 4. Design & UX

### Advanced Activity Heatmap
- **Feature**: Expand the 26-week activity map to include specific event types (e.g., Green for Interview, Blue for Outreach, Purple for Application).
- **Impact**: Better visual feedback on "search velocity."

### Interactive Referral Network
- **Feature**: A visual graph (D3.js) showing the connections between your 59 target companies and your 20+ priority referral paths.
- **Impact**: Easier identification of cluster opportunities where one contact might unlock three companies.

---

*Last updated: April 20, 2026 · v4.7*
