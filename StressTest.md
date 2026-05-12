  1. The "Storage Ceiling" (Capacity Limit)
   * The Scenario: You have a massive outreach tracker (500+ contacts) and a long-term job
     pipeline (200+ roles with full JD text saved).
   * The Failure: Browser localStorage is typically capped at 5MB per domain.
   * Result: The saveState() function will fail silently or throw a QuotaExceededError.
     New roles added via the extension will stop appearing in the dashboard, and manual
     edits won't persist.
   * Workaround: Periodically run /export to clear old "Not Interested" or "Passed" roles
     to free up space.

  2. DOM "Drift" (Extension Scraping)
   * The Scenario: LinkedIn, Greenhouse, or Lever pushes a major UI update that changes
     their HTML structure (CSS classes or data attributes).
   * The Failure: The extension's content.js relies on specific selector patterns to
     "grab" the Job Title, Company, and JD text.
   * Result: The extension will either fail to auto-score the role (returning 0%) or will
     import garbage text/empty fields into your pipeline.

  3. Token "Bloat" (LLM Context Limits)
   * The Scenario: You have a massive BULLET_LIBRARY.md (e.g., 50+ pages of raw text) and
     paste a 4,000-word job description into the /apply tool.
   * The Failure: Claude (and other LLMs) have context window limits. Even if it fits,
     "Lost in the Middle" syndrome occurs where the model ignores the instructions in the
     middle of the prompt.
   * Result: Claude might start hallucinating metrics, ignore your CLAUDE.md narratives,
     or produce generic "AI-sounding" resumes that don't actually use your best bullets.

  4. Cross-Profile Desync
   * The Scenario: You use multiple Chrome Profiles (e.g., "Work" and "Personal") or
     multiple devices without manual sync.
   * The Failure: The "Live Sync" and "Extension Backup" are bound to the specific Chrome
     Profile and Local Machine.
   * Result: If you score a job on your Work laptop, it will not appear on your Home
     desktop dashboard automatically. You will see a fragmented view of your job search
     across devices.
   * Prevention: You must use the /sync tool to export your JSON state from one device and
     import it to the other.

  5. Content Security Policy (CSP) Blockage
   * The Scenario: You host the dashboard on a domain that doesn't match the authorized
     list in manifest.json, or you use a corporate VPN that injects scripts.
   * The Failure: Chrome's security model blocks externally_connectable messages if the
     origin isn't explicitly whitelisted.
   * Result: Real-time sync will break. You will score roles in the extension, but they
     will stay "queued" forever and never jump into the dashboard, forcing you to rely on
     manual JSON copy-pasting.

  6. The "Hard Refresh" Race Condition
   * The Scenario: You have the dashboard open in three different tabs and the extension
     tries to sync a new role.
   * The Failure: Multiple instances of the dashboard might try to write to localStorage
     simultaneously.
   * Result: "Last Write Wins" behavior. If you edited a contact in Tab A and a role
     synced into Tab B at the same time, saving Tab B might overwrite the changes you just
     made in Tab A. 
   * Best Practice: Keep only one dashboard tab open at a time.
#7 - MCP Auth Expiry
  - Scenario: Google OAuth token used by the Gmail/Calendar MCP server expires
  mid-session.                                                                            
  - Failure: /brief runs but returns no calendar events and no Gmail data, with no error
  message - just empty sections.                                                          
  - Fix: Add a step-0 health check in the /brief instructions to verify MCP connectivity  
  and surface auth errors explicitly.
                                                                                          
  #8 - SOURCES.md Parse Ambiguity                           
  - Scenario: A malformed line in SOURCES.md (missing @, typo in domain, annotation text  
  that looks like an email) gets passed to a Gmail search.                                
  - Failure: Claude searches for a garbage query, Gmail returns noise or an error, the
  brief silently skips that section.                                                      
  - Fix: Add a parse validation rule in WORKFLOW_GUIDE.md - if a line doesn't match *@*.* 
  or @*.*, skip it and note it in the brief output.                                      
                                                                                          
  #9 - JD Preprocessor Over-Stripping                       
  - Scenario: A dense technical JD (e.g., a role at a chip company with specific NPU/SDK  
  requirements) gets trimmed to 700 words and the preprocessor removes the technical      
  requirements as "boilerplate."                                                          
  - Failure: /score and /apply produce analysis based on an incomplete JD - BD angle      
  scores high but the technical depth gap is missed.                                
  - Fix: Add a "stripped content preview" output so you can verify what was cut before    
  running /score.                                                                     
                                                                                          
  #10 - MV3 Service Worker Termination                      
  - Scenario: Chrome terminates the extension's background service worker after 30 seconds
   of inactivity. A sync operation that starts just before termination dies mid-write.    
  - Failure: jobos_outreach_sync gets written partially - some contacts imported, some    
  lost. No retry, no error.                                                               
  - Fix: Break sync into atomic per-item writes rather than one bulk write to             
  chrome.storage.local.                                                      
                                                                                          
  #11 - Stale lastBrief Memory                              
  - Scenario: Yesterday's brief saved STATE.lastBrief with company names from your        
  pipeline. You then withdrew from two of those roles. Today's brief shows the "yesterday 
  update" block referencing companies you're no longer pursuing.                          
  - Failure: Cognitive noise - you spend time thinking about roles that are closed.       
  - Fix: Filter lastBrief.actions through the current active pipeline before rendering the
   "what got done" block.                                                                 
                                                                                          
  #12 - Score Drift
  - Scenario: You score the same JD twice (e.g., after editing your pipeline note), and   
  get a 68% then a 74%.                                                                   
  - Failure: You don't know which score to trust for prioritization. The pipeline health  
  metric becomes unreliable.                                                              
  - Fix: Lock the score to the first run and require an explicit "re-score" action to     
  overwrite - don't silently re-calculate on re-open.                                
                                                                                          
  #13 - GitHub Pages Cache Lag                              
  - Scenario: You push a fix to index.html. GitHub Pages serves the stale cached version  
  for up to 10 minutes. You test in the same browser session and think the fix didn't     
  work.                                                                                   
  - Failure: You double-fix or revert a correct change.                                   
  - Fix: Add a version string (e.g., v4.9.1) visible in the dashboard footer that
  increments with each deploy - makes stale cache immediately obvious.                    
                                                                                          
  ---                                                                                     
  Suggested Fix Order                                                                     
                                                            
  ┌─────┬────────────────────┬────────────────────────────────────┐
  │  #  │      Scenario      │              Why Now               │                       
  ├─────┼────────────────────┼────────────────────────────────────┤
  │ 1   │ Storage Ceiling    │ Silent data loss, will hit         │                       
  ├─────┼────────────────────┼────────────────────────────────────┤
  │ 7   │ MCP Auth Expiry    │ Daily workflow, no error surfacing │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 6   │ Race Condition     │ v4.9 inline edit made this worse   │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 9   │ JD Over-stripping  │ v4.9 introduced it, unvalidated    │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 3   │ Token Bloat        │ Grows over time                    │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 10  │ MV3 Worker Death   │ Atomic writes are a quick fix      │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 2   │ DOM Drift          │ Needs alerting, not more fallbacks │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 11  │ Stale Brief Memory │ Quick filter, easy win             │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 8   │ SOURCES.md Parsing │ Just added, needs validation rule  │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 12  │ Score Drift        │ Data integrity                     │
  ├─────┼────────────────────┼────────────────────────────────────┤                       
  │ 13  │ Cache Lag          │ Cosmetic, low effort               │

  #14 - /score Sub-Threshold Truncation
  - Scenario: A JD scores exactly 64/100 — just below the 65 hard cutoff.
  - Failure: Full Role Card, WHY IT'S, WATCH OUTS, and a web research call are
    generated anyway, wasting tokens and implying more investigation is warranted
    for a role that should be a clean Pass.
  - Fix: /score must output ONLY score + "Pass" verdict + one-line reason for any
    role scoring <65. No Role Card, no WHY IT'S, no WATCH OUTS, no web search.

  #15 - WATCH OUTS Completeness Under Multiple Flags
  - Scenario: A JD carries 5 simultaneous red flags: comp not disclosed, role
    reports to Senior Manager (not VP), company has 14 employees, "business-level
    German preferred" buried in paragraph 4 of requirements, equity range not
    mentioned anywhere.
  - Failure: Claude surfaces only the 2 most obvious flags (comp + early stage) and
    silently drops the language requirement and reports-to issue — the ones most
    likely to cause a late-stage disqualification after significant time invested.
  - Fix: WATCH OUTS must enumerate ALL triggered flags from dream-job-criteria.md.
    Each flag gets its own bullet. Partial surfacing is a silent failure.

  #16 - Hard Pass Language Filter (Buried Requirement)
  - Scenario: A high-scoring BD Director role at a Series B AI company ($220K base,
    reports to VP, strong ecosystem motion) includes "business-level Japanese
    proficiency required" in bullet 7 of the qualifications section.
  - Failure: Role scores 84/100 and gets "Apply Now" because the language requirement
    is buried and the overall profile is strong. The hard filter never fires.
  - Fix: /score must scan the full JD for language requirements BEFORE running the
    scoring rubric. Hard pass output: "Pass — requires Japanese proficiency
    (hard filter: non-English language required)"

  #17 - Hard Pass AE Disguised as BD
  - Scenario: Title reads "Director of Business Development" but the JD body is
    a pure quota-carrying AE role: $120K base + commission, "manage named accounts,"
    "achieve quarterly revenue quota," no ecosystem or partnership language anywhere.
  - Failure: Title match overrides substance check. Ecosystem dimension scores 3/10
    ("some BD elements present") instead of triggering the hard pass filter.
  - Fix: /score must check whether the role is substantially quota-carrying AE
    (commission-first comp + no ecosystem/partnership language) before scoring.
    Hard pass output: "Pass — pure quota AE, no ecosystem/partnership component
    (hard filter)"

  #18 - /brief All Low-Fit Batch
  - Scenario: Every job alert in the inbox is clearly off-target: paralegal, FBI
    Special Agent, radiology scheduler, Glassdoor community discussion post — the
    exact Glassdoor noise observed in the real inbox this week.
  - Failure: All 8 alerts surface in the brief. Pranjal must manually scan and
    dismiss them, defeating the entire purpose of the 65% pre-filter.
  - Fix: Zero alerts shown. Section reads "No qualifying job alerts today."
    Footer line: "(8 roles below threshold — not shown)"

  #19 - /brief Target Domain Override
  - Scenario: An email arrives from careers@anthropic.com with subject "Head of
    Partnerships" but the role content is BD-ops/PM-adjacent and would score
    approximately 55/100 if evaluated against the rubric.
  - Failure: The 65% threshold filter suppresses the email. An inbound from a
    top-3 target company never reaches Pranjal's morning review.
  - Fix: Emails from target company domains (@openai.com, @anthropic.com, etc.)
    must ALWAYS surface as HIGH PRIORITY regardless of the 65% threshold.
    Domain override is a separate, higher-priority signal than job alert quality.
    Threshold filtering applies only to job board/aggregator emails.

  #20 - SOURCES.md Inline Annotation Parsing (Regression on #8)
  - Scenario: v4.14 added annotated lines to SOURCES.md using a dash separator,
    e.g.: "hello@getro.com    — True Ventures portfolio job board (daily,
    BD/partnerships signal)". The annotation text contains no @ symbol.
  - Failure: Claude extracts the full line including the annotation as the email
    address string and passes it to Gmail search, returning zero results or an
    error — silently skipping the True Ventures and Niceboard alerts.
  - Fix: The /brief parse rule from StressTest #8 must extract only the substring
    before the first whitespace or — character on each line. Annotation text after
    — is always ignored. Must be verified against the new v4.14 annotated lines.

  #21 - Score Consistency With Rubric Loaded (Regression on #12)
  - Scenario: The same mid-range JD (expected ~72/100) is scored in two separate
    Claude sessions, both with dream-job-criteria.md loaded in context.
  - Failure: Scores differ by more than 5 points (e.g., 70 in session 1 vs. 82
    in session 2) because one session interprets a dimension differently.
  - Fix: The explicit weights (25/25/20/20/10%) and score conversion table in
    dream-job-criteria.md should anchor scores within +-3 points across sessions.
    Drift greater than 5 points on the same JD signals the rubric language for that
    dimension needs tightening, not that scoring is working correctly.

  #22 - Hard Pass Battery (All 6 Filters)
  - Scenario: Run /score against 6 purpose-built JDs, each failing exactly ONE of
    the 6 hard pass filters in dream-job-criteria.md: (1) requires Japanese,
    (2) pure AE quota, (3) stated OTE $140K, (4) relocation to Denver required,
    (5) insurance company with no tech product, (6) reports to a Senior Manager.
  - Failure: Any of the 6 roles produces a scored output rather than an immediate
    hard Pass. A hard-filter role must never generate a Role Card or WATCH OUTS.
  - Fix: Each filter is checked before the rubric runs. Output for any hard pass:
    "Pass — [specific filter triggered] (hard filter)" — no score, no card.

  #23 - /hunt Search Coverage Completeness
  - Scenario: /hunt is invoked cold with no additional context.
  - Failure: Claude runs only 1-2 of the 4 required search queries and skips
    target company career pages, presenting partial results as a complete run.
  - Fix: /hunt footer must explicitly state: "(4 queries run + 9 career pages
    checked — X roles found, Y shown)". If any source was skipped, the footer
    names it. Incomplete coverage must be traceable, not silent.

  #24 - /hunt Deduplication
  - Scenario: "Director of Partnerships at Cohere" appears in both the
    Lever/Greenhouse query results AND the Cohere direct career page check.
  - Failure: Role appears twice in the ranked table with slightly different scores
    (e.g., 78 and 81) because it was scored in two separate search contexts.
  - Fix: /hunt deduplicates by (company + role title) before building the ranked
    table. Score used = from the more authoritative source (career page > aggregator).
    Subsequent duplicates are silently discarded.

  #25 - /hunt Pre-Filter Before Scoring
  - Scenario: Search surfaces 12 roles: 3 fail hard pass (2 require non-English,
    1 is pure AE), 4 score below 65, 5 score 65+.
  - Failure: Hard pass roles get scored and appear in ranked table at low scores
    (45, 52, 58). Footer reads "(12 found, 12 scored, 7 below threshold)" — implying
    12 valid candidates when 3 should never have been evaluated.
  - Fix: Hard pass filters applied BEFORE scoring. Correct footer: "(12 found —
    3 hard pass discard, 4 below 65 — 5 shown)"

  #26 - Global No-Em-Dash Compliance in v4.15 Output Blocks
  - Scenario: Run /score on a 65+ role, /brief on a mixed alert batch, and /hunt.
    Inspect all v4.15 output blocks: Role Card, WHY IT'S, WATCH OUTS, ranked table,
    and deep-dive cards.
  - Failure: An em-dash appears in any new output block — e.g., "WATCH OUTS —
    comp not disclosed" using an em-dash as a visual separator.
  - Fix: Global no-em-dash constraint (WORKFLOW_GUIDE.md Global Constraints) applies
    to all new output formats. WATCH OUTS and WHY IT'S bullets use hyphens (-) or
    colons (:). /hunt ranked table uses pipes (|) or colons. Zero tolerance.

  ---
  Suggested Fix Order (v4.15 additions)

  ┌─────┬─────────────────────────────┬────────────────────────────────────────────┐
  │  #  │          Scenario           │                  Why Now                   │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 16  │ Hard Pass Language Filter   │ Silent false positive — high score slips   │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 17  │ Hard Pass AE as BD          │ Title-substance mismatch is common         │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 22  │ Hard Pass Battery           │ Validates all 6 filters at once            │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 19  │ Brief Domain Override       │ Target company email must never be dropped │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 15  │ WATCH OUTS Completeness     │ Partial flags = silent miss at offer stage │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 25  │ /hunt Pre-Filter            │ Hard pass roles must not pollute output    │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 14  │ /score Sub-Threshold        │ Token waste + false signal on Pass roles   │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 18  │ Brief All Low-Fit Batch     │ Real Glassdoor noise — validates threshold │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 20  │ SOURCES.md Annotation Parse │ v4.14 new lines may break #8 parse rule    │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 23  │ /hunt Coverage              │ Partial search = missed roles, untraceable │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 24  │ /hunt Deduplication         │ Duplicate cards inflate table              │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 21  │ Score Consistency Regression│ Regression guard on StressTest #12         │
  ├─────┼─────────────────────────────┼────────────────────────────────────────────┤
  │ 26  │ No-Em-Dash Compliance       │ New output blocks untested against rule     │
  └─────┴─────────────────────────────┴────────────────────────────────────────────┘


  #27 - /calibrate Question Batching Prevention
  - Scenario: User invokes /calibrate. Claude pre-lists all 12 questions in a
    numbered block in the first response.
  - Failure: All questions appear at once. User answers are influenced by seeing
    future questions, undermining the reflective intent of the interview. The
    one-at-a-time constraint stated in WORKFLOW_GUIDE.md is violated on the
    first turn.
  - Fix: /calibrate must send exactly ONE question per turn and wait for a full
    answer before proceeding. First message = intro + Q1 only. No pre-listing,
    no "here's what we'll cover today."

  #28 - /calibrate Premature Synthesis
  - Scenario: Pranjal answers Q1-Q8 and then says "that's enough, update the
    file."
  - Failure: Claude synthesizes and writes dream-job-criteria.md based on 8/12
    answers, silently omitting reports-to preference (Q9), what to filter harder
    (Q10), instinctively right companies (Q11), and long-game thinking (Q12).
    Criteria are partially updated with no indication of what was skipped.
  - Fix: /calibrate must not synthesize until all 12 answers are received, OR the
    user explicitly requests a partial update. On partial update, Claude must flag
    which questions were skipped and which criteria dimensions remain unchanged
    from the current file.

  #29 - /calibrate No-Confirmation Write
  - Scenario: After receiving all 12 answers, Claude immediately overwrites
    dream-job-criteria.md without showing the change summary first.
  - Failure: Pranjal cannot review what changed before the file is committed.
    A misunderstood answer (e.g., "I'd consider Series A" logged as lowering the
    stage threshold) silently corrupts the scoring rubric used by every future
    /score and /hunt run.
  - Fix: /calibrate must always show "Updated X fields: [list each field +
    from/to values]" and ask for explicit confirmation before any file write.
    No write without confirmation. Required by steps 4-5 of /calibrate
    instructions in WORKFLOW_GUIDE.md.

  #30 - /calibrate Rewrites Unchanged Fields
  - Scenario: Q4 answer is "same floor, $180K base still feels right." Current
    dream-job-criteria.md already says "$180K+". Claude lists this as a changed
    field in the summary and rewords the sentence.
  - Failure: Unchanged fields get rewritten with different phrasing, breaking
    exact-match references in /score and /hunt prompts that load this file.
    Change summary becomes noise — Pranjal cannot identify what actually shifted.
  - Fix: Fields where the answer confirms the current value must be left exactly
    as-is (no rewording). Only fields with a genuine change appear in the summary.
    "No change" answers produce zero edits to that field.

  #31 - Focus Field Generic Placeholder
  - Scenario: A BD Director role at a company that broadly does "AI platform."
    The JD does not explicitly name what product/market this BD role serves —
    it just says "drive strategic partnerships."
  - Failure: Claude writes Focus as "AI platform partnerships" — a generic
    restatement of the company description. Two roles at similar companies will
    have identical Focus fields, making the card useless for comparison.
  - Fix: /score must derive Focus from specific signals in the JD: which product
    lines, markets, customer segments, or internal teams the BD hire will partner
    with. If genuinely unclear, mark as "Focus: Not specified in JD — confirm in
    screen." Generic company-description placeholders are a failure.

  #32 - Focus Field Bleeds Into Sub-Threshold Output
  - Scenario: A role scores 64/100. Output should be score + Pass + one-line
    reason only (per the <65 truncation rule established in #14).
  - Failure: Claude generates Focus, Revenue/Growth, and a partial Role Card
    before the truncation rule applies, producing a half-formed output that
    implies more investigation than warranted.
  - Fix: The <65 truncation rule applies to ALL Role Card fields including Focus
    and Revenue/Growth. Sub-threshold output = score + "Pass" + one-line reason.
    Nothing else. No new v4.16 fields exempt this constraint.

  #33 - Revenue Field Public Company — Unverified Assertion
  - Scenario: BD Director role at a public company. JD doesn't mention revenue.
    Claude states a revenue figure as fact with no source attribution.
  - Failure: Revenue stated as "~$800M FY25" with no sourcing. If the figure is
    wrong (stale, quarterly not annual, wrong ticker), it will be used in
    /negotiate and /prep without scrutiny.
  - Fix: Revenue/Growth for public companies must be web-searched and flagged:
    "unverified — sourced from [source name]" if not from an official filing.
    Format = annual revenue + YoY growth rate, not quarterly. Example:
    "$290M FY25 - 29% YoY (Crunchbase)". Never state as fact without a source.

  #34 - Revenue Field Private Company — Invented Estimate
  - Scenario: BD role at a Series B AI startup that has announced funding but
    never disclosed revenue. Claude estimates ARR based on employee count or
    stage heuristics and presents it as data.
  - Failure: Claude writes "~$15-20M ARR (estimated)" in the role card. This
    figure propagates into /negotiate and /prep, anchoring decisions on invented
    data.
  - Fix: For private companies, Revenue/Growth must show ONLY total raised + last
    round date (e.g., "$46M raised, Series C Jan '26"). Never estimate ARR or
    revenue for private companies. If no funding announcement is findable, mark
    as "Funding: Not publicly disclosed." No estimates, no heuristics, no
    employee-count extrapolation.

  #35 - /hunt Card Field Consistency Across Mixed Company Types
  - Scenario: /hunt surfaces 5 qualifying roles: 2 public companies, 2 Series B
    startups, 1 stealth Series A with no public funding info.
  - Failure: Revenue/Growth and Focus are inconsistently present — some cards
    have them, others skip them silently. Card-to-card comparison breaks when
    fields appear on some cards but not others.
  - Fix: Every deep-dive card must include ALL fields regardless of data
    availability. Use explicit placeholders for unknown data: "Revenue: Not
    publicly disclosed", "Focus: Not specified in JD — confirm in screen."
    No silent omissions. Consistent structure across all cards is non-negotiable.

  #36 - /calibrate + /score Criteria Sync (Stale Read)
  - Scenario: /calibrate completes and updates dream-job-criteria.md (comp floor
    raised from $180K to $200K, Series A now flagged as pass unless founding hire).
    User immediately runs /score on a new JD in the same session.
  - Failure: /score uses the old criteria loaded at session start, before
    /calibrate ran. The comp floor and stage filter are still at the old values.
    A Series A role that should now be a Pass surfaces as "Apply with Bridge."
  - Fix: /score must always read dream-job-criteria.md fresh at scoring time —
    not from a cached in-session copy. If the file was updated by /calibrate
    during the session, /score picks up the new version automatically.

  ---
  Suggested Fix Order (v4.16 additions)

  ┌─────┬──────────────────────────────────┬──────────────────────────────────────────┐
  │  #  │           Scenario               │               Why Now                    │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 29  │ Calibrate No-Confirmation Write  │ Silent overwrite = corrupted criteria    │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 36  │ Calibrate + Score Stale Read     │ Calibrate update invisible to /score     │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 27  │ Question Batching Prevention     │ Violates core /calibrate constraint      │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 28  │ Premature Synthesis              │ Partial update = silent rubric gaps      │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 33  │ Revenue Public Unverified Assert │ Unsourced figures propagate downstream   │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 34  │ Revenue Private Invented Estimate│ Fabricated ARR corrupts /negotiate       │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 31  │ Focus Generic Placeholder        │ Generic field = no role differentiation  │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 35  │ /hunt Card Field Consistency     │ Inconsistent cards break comparison      │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 30  │ Calibrate Unchanged Field Rewrite│ Phrasing drift breaks exact-match refs   │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 32  │ Focus Bleeds Into Sub-Threshold  │ Truncation rule must cover new fields    │
  └─────┴──────────────────────────────────┴──────────────────────────────────────────┘


---

## v4.17 Stress Tests (#37–#49)

  #37 - /score Ignores Updated dream-job-criteria.md Weights
  - Scenario: /calibrate has updated dream-job-criteria.md, changing AI-native weight from 20% to
    25% and Ecosystem weight from 25% to 20%. User immediately runs /score on a new JD.
  - Failure: /score applies the old weights from WORKFLOW_GUIDE.md session context (25/25/20/20/10%),
    not the updated file values. The recalibrated weights have no effect — /calibrate's purpose
    is nullified.
  - Fix: /score must read dream-job-criteria.md fresh at scoring time, never from hardcoded values
    or cached session copy. Weights come from the file only. This is the single source of truth
    established in v4.17.

  #38 - Midpoint Calibration Ignored in Scoring
  - Scenario: A role has a well-established partner program (not 0-to-1) and moderate API integration
    requirements. Per the midpoint calibration in dream-job-criteria.md, both "0-to-1 builder" and
    "Technical BD depth" are approximately 5/10 for this evidence level. Claude scores both 8/10
    with no explanation.
  - Failure: Scores are inflated above what the calibration specifies. The midpoint column has no
    behavioral effect — it is documentation theater. An 8 where a 5 is correct inflates the total
    score by 6-9 points, potentially converting a Pass into an Apply with Bridge.
  - Fix: Scores must be anchored to the midpoint calibration descriptions in dream-job-criteria.md.
    A score above 5 requires explicit evidence that exceeds the "5/10 looks like" bar. Deviating
    from calibration requires reasoning stated in the score output.

  #39 - Alignment Signal Boost Applied But Not Noted in Role Card
  - Scenario: A JD includes "build our partner ecosystem from scratch" and mentions MCP integration
    protocols. Both should trigger Strongest Alignment Signal boosts. The score card shows a final
    number with no mention of which signals fired.
  - Failure: +0.5 boosts are applied invisibly. Pranjal cannot verify whether the elevated score
    reflects genuine signal detection or arbitrary inflation. The signals-fired list required by
    WORKFLOW_GUIDE.md /score instruction 3 is absent.
  - Fix: /score must explicitly note which Alignment Signals fired in the role card output, e.g.,
    "Signals fired: 'first BD hire' -> +0.5 to 0-to-1 dimension; MCP -> +0.5 to Technical BD depth
    + AI-native dimensions." No silent boosts — every +0.5 is attributed and visible.

  #40 - Alignment Signal Boosts Exceed Dimension Cap
  - Scenario: A role has 3 separate signals that all map to the Ecosystem / partner motion dimension
    (+0.5 each). Base score on that dimension is 9.5/10. Applying all three would push it to 11/10.
  - Failure: Dimension score reported above 10, corrupting the weighted multiplication and producing
    a total score above 100. Or Claude silently truncates without noting the cap was hit.
  - Fix: Each dimension is capped at 10 regardless of how many signals fire. Multiple signals on the
    same dimension do not stack beyond 10. Cap applied before weighted multiplication and noted:
    "Ecosystem: 9.5 + 1.5 from 3 signals -> capped at 10."

  #41 - /apply Assigns Wrong Template Type
  - Scenario: A role is "Director of Partnerships, Edge AI Platform" at a company building NPU-powered
    inference hardware. JD mentions "device OEM integrations", "NPU silicon partners", and
    "on-device AI." Claude classifies this as enterprise (large company, ecosystem language) and
    uses enterprise bullet IDs (p1, p2, h1-h6).
  - Failure: edgeai and hardware bullet IDs (h7-h10, pa2-pa3, q5-q7) — specifically tailored for
    edge computing and device ecosystem narratives — are skipped. The resume uses enterprise-framed
    bullets that miss the on-device AI angle entirely.
  - Fix: Template type detection must prioritize technical product signals (NPU, SoC, on-device AI,
    edge) over company size signals. edgeai or hardware takes precedence over enterprise when the
    JD core product is edge/device technology. Signal hierarchy matters.

  #42 - /apply Template Type Not Stated in Output
  - Scenario: Claude generates a resume restructure using the correct bullet IDs internally, but
    doesn't name the template type anywhere in the output.
  - Failure: Pranjal cannot verify which template was used or whether the bullet selection was
    correct. If the type was wrong, there is no way to catch it without manually cross-referencing
    BULLET_LIBRARY.md against every bullet in the output.
  - Fix: /apply must state the detected template type at the start of the Resume Restructure section:
    e.g., "Template type: edgeai — using bullet IDs h7, h8, q5, q6, pa2, pa3." Visible and
    verifiable, not implicit.

  #43 - /apply Apply-with-Bridge Buries the Gap Narrative
  - Scenario: /score returned 69/100 (Apply with Bridge). User runs /apply with <score>69</score>.
    Claude generates output in standard order: JD Analysis -> CORE COMPETENCIES -> Resume
    Restructure -> Gap & Bridge Analysis at the end.
  - Failure: Gap & Bridge Analysis appears after the full resume build. For an Apply with Bridge
    submission, the bridge narrative is the most important framing element — but it is buried where
    neither Pranjal nor a hiring manager will encounter it first. WORKFLOW_GUIDE.md /apply
    instruction 2b requiring it to appear before Resume Restructure is violated.
  - Fix: For any score in the 65-74 range (Apply with Bridge), Gap & Bridge Analysis must appear
    immediately after JD Analysis, before CORE COMPETENCIES and Resume Restructure. Output order:
    JD Analysis -> Gap & Bridge -> CORE COMPETENCIES -> Resume Restructure.

  #44 - /apply Score Verdict Wiring Ignores Plain-Text Score
  - Scenario: User types "/apply — this scored 78" as plain text. No <score> XML tag present.
    Claude generates standard apply output with no Apply Now framing, no alignment-first lead,
    no referral gate triggered.
  - Failure: Score verdict wiring only fires on XML tag presence. Plain-text score references are
    silently ignored. Pranjal must remember XML syntax to get structured output — the system
    penalizes natural input.
  - Fix: /apply must recognize score mentions in plain text as well as XML tags (e.g., "scored 78",
    "score: 78", "78/100", "scored an 80"). If a score is identifiable anywhere in the user's
    message, apply the corresponding verdict framing. XML is preferred but not required.

  #45 - /apply Referral Gate Misses Target Company Domain
  - Scenario: User runs /apply for a role at Scale AI (@scale.ai). The domain is in SOURCES.md
    Target Company Domains. No <score> is provided. Claude generates the full application package
    with no Referral Strategy section.
  - Failure: The referral-first gate only checks for explicit score >=75, silently skipping the
    SOURCES.md domain check. A Scale AI role — a target company — gets no referral strategy,
    losing the highest-value action in the workflow.
  - Fix: /apply must check SOURCES.md target domains as an independent trigger (OR condition
    alongside score >=75). The domain check requires no score — just the company name/domain in
    the JD. When triggered, Referral Strategy appears first regardless of score presence.

  #46 - /brief Hardcodes 72h Window After a 4-Day Gap
  - Scenario: It is Monday morning. The last /brief was Thursday. User runs /brief. Claude scans
    exactly 72 hours back (Friday morning), missing all Thursday emails — including a recruiter
    reply from a target company domain.
  - Failure: A hard 72h cap silently drops Thursday content. The WORKFLOW_GUIDE.md instruction to
    use "whichever captures more, max 5 days" is ignored. A high-priority email is invisible with
    no indication it was missed.
  - Fix: /brief must extend the scan window when the gap since the last brief is longer than 72h.
    If the gap is mentioned in the user's message or determinable from context (e.g., "back from
    weekend"), use that gap duration as the window floor. Unknown gap -> default to 96h. Cap is
    5 days regardless.

  #47 - Competing Offer Present But Not Integrated Into Negotiation Script
  - Scenario: User provides <competing_offer>$310K total comp from Cohere</competing_offer>.
    Claude generates a negotiation script referencing "market rate" generically. The Cohere offer
    appears in a separate "Multi-offer bridge" bullet but is never spoken in the script.
  - Failure: The competing offer — the strongest leverage available — is acknowledged in the Deliver
    section but absent from the word-for-word script. Pranjal has no scripted line to use. The
    <competing_offer> tag adds no value to the call preparation.
  - Fix: When <competing_offer> is provided, it must appear by name in the negotiation script
    itself: e.g., "I do have another offer on the table — it is at $310K total comp from Cohere —
    but I'd prefer to make this work with you." The multi-offer reference is not optional and
    not a footnote.

  #48 - /mock Default Mode Runs as Single-Question Session
  - Scenario: User types "/mock" with no mode specified. Claude asks one question, scores the
    answer, and stops — never indicating it will continue to 8 questions or that Full mode is
    running.
  - Failure: The default mode (Full = 8 questions) collapses to a single-question exchange.
    Pranjal does not know whether the session is ongoing or complete. The session generates
    insufficient data for /pattern to detect weaknesses.
  - Fix: When no mode is specified, /mock must run Full mode (8 questions). Opening message must
    state: "Running Full mode — 8 questions covering ecosystem/GTM, deal structure, behavioral,
    leadership, and tell-me-about-yourself. Question 1 of 8:" Session scope declared upfront.

  #49 - /prep Maps All Behavioral Questions to Stories A-D, Ignores Story F
  - Scenario: /prep is run for an interview at an AI startup. Behavioral questions include "Tell
    me about a time you had to change course on a major initiative" and "Describe when external
    factors derailed your plan." Claude maps both to Story A (Huawei Ecosystem) or Story B
    (Qualia founding GTM).
  - Failure: Story F (Huawei 2021 geopolitical pivot — constraint hit mid-motion, re-routed to
    EMEA/APAC, preserved relationships) is the designated story for adversity and
    decision-under-uncertainty questions. It is never surfaced. /prep story mapping was not
    updated when Story F was added in v4.17.
  - Fix: /prep must evaluate Story F alongside A-E for every behavioral question. For questions
    involving adversity, failure, change of course, or external constraint, Story F must appear
    as the recommended or top-ranked story. Its designation in CLAUDE.md as the conflict/setback
    story is binding.

---

## Suggested Fix Order (v4.17 additions)

  ┌─────┬──────────────────────────────────┬──────────────────────────────────────────┐
  │  #  │           Scenario               │               Why Now                    │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 41  │ Wrong Template Type Assigned     │ Wrong template = wrong resume bullets    │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 45  │ Referral Gate Misses Domain      │ Target company loses highest-value action│
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 43  │ Apply-with-Bridge Buries Gap     │ Bridge submission structurally broken    │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 37  │ Score Ignores dream-job-criteria │ /calibrate updates have zero effect      │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 47  │ Competing Offer Not in Script    │ <competing_offer> tag adds no call value │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 39  │ Signal Boost Not Noted           │ Invisible boosts break scoring trust     │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 40  │ Signal Boosts Exceed Cap         │ Scores above 100 corrupt calculation     │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 48  │ Mock Default Single Question     │ /mock unusable; no data for /pattern     │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 44  │ Score Verdict Ignores Plain Text │ Informal input bypasses all wiring       │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 49  │ Story F Not Used in /prep        │ Conflict questions get wrong story       │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 46  │ Brief Hardcodes 72h After Gap    │ Monday briefs silently miss Thursday     │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 42  │ Template Type Not Stated         │ Can't verify bullet selection            │
  ├─────┼──────────────────────────────────┼──────────────────────────────────────────┤
  │ 38  │ Midpoint Calibration Ignored     │ Inflated scores; calibration decorative  │
  └─────┴──────────────────────────────────┴──────────────────────────────────────────┘
