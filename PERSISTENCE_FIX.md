# Pipeline Persistence Fix - v4.5
**April 16, 2026**

---

## The problem

The Command Center stores all pipeline and outreach state in the browser's `localStorage`. `localStorage` is tied to the browser's browsing data — it is cleared by:

- Chrome's **"Clear cookies and other site data when you close all windows"** setting
- Manually clearing browsing history / site data
- Any browser with aggressive privacy defaults

When this happens, `loadState()` finds nothing in `localStorage` and silently falls back to the hardcoded `defaultState()` — showing the four placeholder companies (Nothing.tech, Microsoft, Emissary, Turing.com) instead of your real pipeline.

---

## Why this is worse than it sounds

The fallback to `defaultState()` is silent. There is no warning, no prompt to restore. The pipeline just looks "wrong" with no obvious explanation.

---

## The fix (v4.5)

`chrome.storage.local` — the extension's own storage — is **never** cleared by browser privacy settings. It is only removed if you uninstall the extension.

The fix adds a two-way mirror between `localStorage` and `chrome.storage.local`:

### On every save
`saveState()` now calls `chrome.runtime.sendMessage(extId, { action: 'saveStateBackup', state: STATE })` after writing to `localStorage`. The extension's `onMessageExternal` handler saves a full copy of STATE to `chrome.storage.local['jobos_v3_backup']`. This is fire-and-forget — if the extension is unreachable, it fails silently.

### On every page load
`loadState()` sets `window._jobosLocalStorageWasEmpty = true` when `localStorage` is missing or unreadable (instead of silently calling `defaultState()`).

`checkExtensionSync()` (which already runs on every load) checks this flag first. If it is set, it calls `chrome.runtime.sendMessage(extId, { action: 'loadStateBackup' })`. If the backup has pipeline data, it:
1. Replaces STATE with the backup
2. Re-saves to `localStorage` (re-populating it for the session)
3. Re-renders the dashboard
4. Shows a toast: **"Pipeline restored from extension backup"**

Then proceeds with the normal `getPendingSync` check.

### Files changed

| File | What changed |
|---|---|
| `jobos-extension-v2/background.js` | Added `saveStateBackup` and `loadStateBackup` handlers in `onMessageExternal` |
| `index.html` | `loadState()` sets `_jobosLocalStorageWasEmpty` flag; `saveState()` mirrors to extension; `checkExtensionSync()` restores from backup if flag is set; `doPendingSync()` extracted as separate function |

---

## Limitations

- **Requires the dashboard to be open via HTTPS** (GitHub Pages). `chrome.runtime.sendMessage` is blocked on `file://` origins due to the `externally_connectable` restriction in `manifest.json`. If you open `index.html` directly as a local file, the backup/restore will not trigger.
- The backup is only as fresh as the last time you saved a change. If your browser cleared localStorage between saves, you recover to the last backup point, not the exact moment the browser closed.

---

## One-time setup

1. Reload the extension at `chrome://extensions` after pulling this update.
2. Open the dashboard on GitHub Pages.
3. Make any change (update a stage, add a role) to trigger the first backup write.
4. From then on: every save mirrors to the extension automatically.

---

## Diagnosing the issue

If you open the dashboard and see the four placeholder companies:

1. Check if the toast "Pipeline restored from extension backup" appeared — if it did, the restore worked and your real data is back.
2. If the placeholder companies appear with no toast, either: the extension is not connected (check the sync status indicator), or no backup exists yet (first-time setup).
3. Open Chrome DevTools → Application → Local Storage → check whether `jobos_v3` is present and contains your real data.
