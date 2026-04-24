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
