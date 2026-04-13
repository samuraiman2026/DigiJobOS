// Job Search OS - Dashboard Bridge
// Injected into the dashboard page to expose the extension ID so the dashboard
// can message the extension directly via chrome.runtime.sendMessage.
(function () {
  const script = document.createElement('script');
  script.textContent = `window.JOBOS_EXT_ID = "${chrome.runtime.id}";`;
  document.documentElement.appendChild(script);
  script.remove();
})();
