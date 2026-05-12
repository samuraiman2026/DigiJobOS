# Job Search OS - Workflow Guide (v4.2)
# Reference this file for all slash command instructions.

## Global Constraints (Non-Negotiable)
- **NO EM-DASHES:** Never use em-dashes (-) in any generated text, especially resume bullets, cover notes, or scripts. Use standard hyphens (-) or colons (:) instead.
- **Data Integrity:** Preserve all metrics ($20M, 120%, etc.) exactly as found in CLAUDE.md.

## /brief - Morning Briefing
**Purpose:** Generate a high-impact daily game plan.
**Instructions:**
0. **MCP Health Check (run first):** Attempt a minimal call to both Gmail MCP and Google Calendar MCP. If either fails or returns an auth error, surface it immediately at the top of the brief output in this format: `[MCP ERROR] Gmail: AUTH EXPIRED — reconnect Google account in MCP settings` or `[MCP ERROR] Calendar: UNAVAILABLE`. Never silently skip a section — always state explicitly if data is missing and why.
1. Search Google Calendar for today's events.
2. Read `SOURCES.md` from the project directory. Parse all non-commented lines (lines not starting with `#`) to extract: sender emails, target company domains, and named networking contacts. Skip section headers and blank lines.
3. Search Gmail using those sources:
   - **Job alerts / recruiters:** last 48-72 hours. Summarize subject + role/location.
   - **Target company domains:** any email from `@company.com` pattern is HIGH PRIORITY regardless of sender — flag it prominently.
   - **Networking contacts:** last 5 days. Flag any reply from a person listed in the "Warm Intro Threads" section.
   - **Newsletters:** last 48 hours. Extract market signals or company news relevant to BD/AI partnerships.
4. Review the provided `<pipeline>` and `<overdue_followups>`.
5. **Pre-filter job alerts before surfacing:** For each new role found in job alert emails, do a fast fit check based on title, seniority level, and company type. Only surface roles that appear to be a 65%+ fit for a senior BD/Partnerships exec at an AI-native company. At the bottom of the job alerts section, add a single line: `(X roles below threshold — not shown)` with the count of skipped roles.
**Deliver:**
- Top 3 actions for today, ranked by impact.
- Any pipeline roles going cold.
- New job alerts worth scoring (65%+ fit only — pre-filtered per step 5 above).
- HIGH PRIORITY: any email from a target company domain.
- Referral outreach to send today.
- One-line status on each active pipeline role.
**Constraint:** 90-second read. Game plan, not a report.
**Seniority rule:** Do not flag Senior Manager or Manager roles as "below target" unless the stated or estimated salary is below $150K. A strong skill match overrides title level.

## /score - JD Fit Analysis
**Purpose:** Analyze JD fit against profile dimensions and produce a structured role card.
**Reference:** Load `dream-job-criteria.md` for scoring weights, hard pass filters, and WATCH OUT triggers.
**Instructions:**
1. Score 1-10 on each (show visual bars):
   - Ecosystem/partner motion match (25%)
   - 0-to-1 builder requirement (25%)
   - Technical BD depth needed (20%)
   - AI-native / Edge AI angle (20%)
   - Seniority and scope match (10%)
2. Calculate overall weighted score (0-100) + verdict: **Apply Now** (75+) / **Apply with Bridge** (65-74) / **Pass** (<65).
3. **Seniority rule:** Do NOT penalize Senior Manager or Manager titles. Score seniority on scope, ownership, and team size - not title alone. Only flag a seniority gap if the role is clearly IC-only (no team, no budget ownership) or if stated compensation is below $150K.
4. If score is below 65, output only the score, verdict (Pass), and one-line reason. Do not generate the full card.
5. For roles scoring 65+, do a brief web search to surface: funding stage, approximate comp range (from JD, Levels.fyi, or Glassdoor), and reports-to level if not stated in JD.
**Deliver:**
- Weighted score + Verdict.
- **Role Card** (65+ only):
  - Funding stage (Seed / Series A-C / Public / PE-backed / Unknown)
  - Approx comp range (from JD or web — flag if unverified)
  - Reports to (title level)
  - Location / remote policy
- **WHY IT'S:** 2-3 bullets on why this specific role fits Pranjal's profile and target motion.
- **BIGGEST GAP + BRIDGE:** One sentence each.
- **WATCH OUTS:** Red flags to investigate before committing time. Examples: comp not disclosed, IC-only structure, requires non-English language, equity uncertain (early stage), very small team (<20), role reports below VP, location mismatch, high churn signal, ATS-heavy company unlikely to move fast.

## /apply - Application Workflow
**Purpose:** Create a complete application package.
**Instructions:**
1. Use `<bullet_guidance>` and `<contact_context>` to tailor the output.
2. If `<jd_keywords>` is provided, treat it as a mandatory coverage checklist — every keyword must appear at least once in the resume bullets using the JD's exact phrasing (not synonyms). At the end of the Resume Restructure section, output a one-line coverage summary: "Keywords covered: X/Y" and list any that could not be authentically placed.
3. If `<jd_keywords>` is NOT provided, extract the top 15 keywords yourself from the JD before writing bullets: required skills, product terms, action verbs specific to this role, ecosystem/GTM language the company uses. Apply the same coverage mandate.
4. Perform JD analysis.
**ATS Rules (apply to every resume output):**
- **Acronym both-forms:** On first use of any acronym, write full form + abbreviation: "Business Development (BD)", "Go-To-Market (GTM)", "Artificial Intelligence (AI)", "Application Programming Interface (API)", "Software Development Kit (SDK)", "Independent Software Vendor (ISV)". ATS parsers tokenize these separately — using only one form loses half the matches.
- **Exact phrasing:** Use the JD's exact terms, not synonyms. If they write "partner ecosystem" do not substitute "alliance network." If they write "co-sell" do not substitute "joint selling."
- **Skills section:** Always include a CORE COMPETENCIES section with 9-12 noun-phrase skills drawn from the JD keywords, 3 per row separated by |. Place it above Work Experience. This is the highest-weight ATS signal.
- **Title alignment:** The resume header title should include or mirror the target role title (e.g., "DIRECTOR, BUSINESS DEVELOPMENT | PARTNER ECOSYSTEM LEADER").
- **No special characters:** No em-dashes, no smart quotes, no bullet symbols beyond standard hyphen (-) or dot (·). ATS parsers often strip or misread these.

**Deliver:**
- **JD Analysis:** What does this company actually care about? What 3 words describe their ideal hire?
- **CORE COMPETENCIES section:** 9-12 JD-sourced skills, formatted as 3-per-row with | separators.
- **Resume Restructure:** 4-5 bullets per role, impact-first (use BULLET_LIBRARY.md). Every JD keyword must appear. Acronym both-forms on first use.
- **Keyword Coverage:** `Keywords covered: X/Y — [any gaps + reason]`
- **Gap & Bridge Analysis:** Frame missing requirements using existing strengths.
- **Referral Strategy:** Who to reach and what angle to use.
- **Cover Note:** One specific hook, not a resume summary. Must include at least 2 JD keywords (exact phrasing) in the first sentence.

## /referral - Referral Strategy
**Purpose:** Build a referral-first approach for a role.
**Deliver:**
- **Who to reach:** Ideal (BD/Partnerships/GTM), second (HM's chain), third (2nd-degree).
- **The Angle:** What earns a response (NOT "I'm applying").
- **LinkedIn DM:** Under 80 words, specific, not a template.
- **Timing:** Apply first or wait?
- **Follow-up Plan:** If no reply in 5 days.

## /prep - Interview Preparation
**Purpose:** Full research and question bank for an interview.
**Instructions:**
1. Search the web for: (a) recent news about the company, (b) interviewer background (if provided).
2. Map questions to best STAR stories (A-E) in CLAUDE.md.
**Deliver:**
- What the company cares about right now.
- 10 BD-specific questions (Partner motion, deal structure, ecosystem GTM, etc.).
- Best story to use for each question.
- 3 gap questions with exact bridge narratives.
- "Tell me about yourself" (90 seconds, tailored).

## /mock - Mock Interview
**Purpose:** Interactive practice with live scoring.
**Instructions:**
1. Ask questions based on `<mode>` (Hardest, Weak, Full, Specific).
2. Ask one question at a time. Wait for answer.
3. After each answer, score: Relevance (1-5), Specificity (1-5), Impact Clarity (1-5), Story Fit (1-5).
**Deliver:**
- Score + Feedback (what landed/what to fix).
- Suggested story to use instead.
- One rewrite of the answer.

## /debrief - Post-Interview Analysis
**Purpose:** Analyze performance and generate follow-ups.
**Deliver:**
- **Scoring:** Relevance (1-5), Specificity (1-5), Impact Clarity (1-5).
- **Value Optimization:** 2-3 moments I left value on the table + specific rewrites.
- **Insights:** What the interviewer seemed to care most about.
- **Follow-up:** Personalized thank-you email (under 150 words).
- **Next Steps:** What to prepare differently for the next round.

## /negotiate - Offer Strategy
**Purpose:** Market benchmarking and counter-offer script.
**Instructions:**
1. Search the web for current compensation benchmarks for the role/market.
2. Use `<offer>` and `<leverage>` to build the strategy.
**Deliver:**
- Market benchmarks with sources.
- 3 strongest leverage points for this specific offer.
- Counter offer recommendation (Base, Equity, Signing).
- Exact script for the negotiation call (word for word).
- "Best offer" pushback response.

## /pattern - Pattern Analysis
**Purpose:** Cross-interview weakness identification.
**Deliver:**
- Question types I score low on (visual bars).
- Question types I score high on (auto-pilot stories).
- 3 specific repeating weaknesses.
- Story over-reliance / underuse flags.
- **Drill Plan:** 3 question types to practice.
- "Stop doing" / "Do more" items.

## /hunt - Proactive Job Discovery
**Purpose:** Actively web-search for open BD/Partnerships roles at AI-native companies — bypassing email alert filters to find roles posted directly on company career pages. Designed to run as a nightly scheduled task.
**Reference:** Load `dream-job-criteria.md` for scoring weights, hard filters, and WATCH OUT triggers.
**Instructions:**
1. Search the web using these queries (run all, deduplicate results):
   - `"Director of Business Development" OR "Director of Partnerships" AI site:jobs.lever.co OR site:boards.greenhouse.io OR site:ashby.com`
   - `"Head of Partnerships" OR "VP Business Development" AI-native OR "AI platform" OR "LLM" -site:linkedin.com`
   - `"BD" OR "partnerships" "0 to 1" OR "founding" AI startup 2026`
   - Check career pages of target companies in `CLAUDE.md` (OpenAI, Anthropic, Scale AI, Cohere, Mistral, Perplexity, Together AI, Anyscale, Databricks) for any open BD/Partnerships roles.
2. Apply hard pass filters from `dream-job-criteria.md` immediately. Discard anything that fails a hard filter.
3. Score each remaining role 0-100 using the weighted rubric from `dream-job-criteria.md`.
4. Only include roles scoring 65+.
5. For each qualifying role, do a brief research pass: funding stage, comp range (JD or Levels.fyi/Glassdoor), reports-to level.
**Deliver:**
- **Ranked table:** Rank, Company, Role Title, Score/100, Verdict, Apply Link.
- **Deep-dive cards for top 3-5 roles** (same format as /score):
  - Funding stage, approx comp range, reports-to, location/remote
  - WHY IT'S: 2-3 bullets on fit
  - BIGGEST GAP + BRIDGE
  - WATCH OUTS
  - LINK TO APPLY
- Footer line: `(X roles found, Y below threshold — not shown)`
**Scheduling:** Can be set as a nightly scheduled task in Claude Cowork (desktop app). Set folder to this project directory so it reads `dream-job-criteria.md` and writes output to a dated file (e.g., `hunt-2026-05-13.md`).

## /post - LinkedIn Post Generation
**Purpose:** Practitioner-grade thought leadership.
**Constraints:**
- 150–250 words.
- Strong first line (no "I've been thinking about...").
- Practitioner-grade (no AI buzzword soup).
- One concrete example from experience.
- Ends with a question to invite engagement.
- Voice: Direct, specific, occasionally wry, no corporate-speak.
- NO emojis (except bullet dots).
