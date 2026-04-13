// Job Search OS - Dashboard Bridge
// Injected into the dashboard page at document_start to expose the extension ID.
// Uses a DOM data attribute (shared across isolated + main worlds) - more reliable
// than script-tag injection which can fail if documentElement isn't ready.
(function () {
  const id = chrome.runtime.id;
  // Primary: data attribute on <html> - readable from main world via dataset
  document.documentElement.dataset.jobosExtId = id;
  // Secondary: script tag injection for window.JOBOS_EXT_ID compatibility
  try {
    const s = document.createElement('script');
    s.textContent = `window.JOBOS_EXT_ID = "${id}";`;
    document.documentElement.appendChild(s);
    s.remove();
  } catch(e) { /* fallback to dataset only */ }
})();
