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