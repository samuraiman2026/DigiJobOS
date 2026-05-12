# Email Sources — Morning Scan Config

Claude reads this file before each morning briefing to determine which inboxes and senders to scan via Gmail.

---

## Job Alerts & Recruiters

These senders are scanned for new job postings, recruiter outreach, and application status updates.

```
# LinkedIn (multiple sender variants active)
jobs-noreply@linkedin.com
jobalerts-noreply@linkedin.com
jobs-listings@linkedin.com

# Job boards & aggregators
no-reply@glassdoor.com
noreply@indeed.com
support@builtin.com
hello@trueup.io
no-reply@match.jobgether.com
team@hi.wellfound.com

# VC portfolio boards
hello@getro.com                    — True Ventures portfolio job board (daily, BD/partnerships signal)
noreply@niceboard.co               — Niceboard BD/Partnerships digest

# ATS direct
no-reply@lever.co
notifications@greenhouse.io
no-reply@ashbyhq.com
no-reply@smartrecruiters.com
careers-noreply@google.com

# Other company career alerts
donotreply@email.careers.microsoft.com
help@welcometothejungle.com

```

---

## Networking & Warm Intro Threads

Scan for replies from people in your outreach pipeline. Add specific contacts here as you engage them.

```
# Format: email@domain.com  — Name / Company / Context
# Example:
# john.doe@openai.com  — John Doe / OpenAI / referred by Sarah
```

---

## Target Company Domains

Any email from these domains is flagged as high-priority regardless of sender.

```
@openai.com
@anthropic.com
@scale.ai
@cohere.com
@mistral.ai
@perplexity.ai
@together.ai
@anyscale.com
@databricks.com
```

---

## Newsletters & Industry Intel

Scanned for market signals, company news, and partnership announcements relevant to BD/AI.

```
# digest@tldr.tech
# newsletter@thesequence.substack.com
# hello@bensbites.co
```

---

## How to Add New Sources

1. Paste the full email address or domain under the relevant section.
2. Add a short comment (after `—`) with name, company, and context if it's a person.
3. Save the file. Claude will pick up changes automatically on the next morning scan.
4. To temporarily disable a sender without deleting it, prefix the line with `#`.
