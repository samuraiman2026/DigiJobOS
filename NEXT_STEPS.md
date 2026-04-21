# Job Search OS - Next Steps & Improvement Backlog
*Last updated: April 21, 2026 · v4.8*

## ✓ COMPLETED — Company Research in Resume Builder
Collapsible card at bottom of Step 1. Generates a structured Claude prompt covering recent news, strategic priorities, ecosystem signals, hiring signals, and competitive position — scoped to the JD. Paste summary back; injected as <company_research> into bullet rewrite at Step 4. Clears on new role load, persists through back-navigation.

## 1. JD Persistence in the Pipeline
Most roles in the pipeline have no saved JD. The Apply dropdown and Resume quick-load only work when a JD is attached. Roles scored via the extension save a JD automatically, but roles added manually through the dashboard do not. A "paste JD" field on the pipeline card would fix the dropdown gap for all roles.

## 2. Brief → Score Loop
The brief surfaces roles but requires manually finding and scoring them. A "Score this role" button inline in the brief output — or a paste-JD field in the brief panel — would close that loop without leaving the dashboard.

## 3. Apply Panel Disconnected from Pipeline ✓ DONE
"Mark as sent" button appears after generating an apply prompt. Stamps appliedAt date on the matching pipeline role, updates lastAction, and moves stage to Applied if still at To Review or Monitoring.

## 4. Scoring Rules Live in Two Places
WORKFLOW_GUIDE.md (Claude's rules) and the extension's calcPenalties() engine can drift. The seniority rule added to WORKFLOW_GUIDE.md is not reflected in the extension score. These should agree.

## 5. Brief Has No Memory ✓ DONE
STATE.lastBrief saves the session after each brief run. Next morning, loadBriefYesterday() shows a yellow card with yesterday's top actions and a "what got done?" textarea. The response is injected into the new prompt as <yesterday_update>.
