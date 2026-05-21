const PLAUSIBLE_SRC = "https://plausible.io/js/script.js";

function getPlausibleDomain() {
  const metaDomain = document
    .querySelector('meta[name="plausible-domain"]')
    ?.content?.trim();

  if (metaDomain) return metaDomain;

  return window.location.hostname.trim();
}

function ensureQueue() {
  if (typeof window.plausible === "function" && window.plausible.q) return;

  const queue = window.plausible;
  window.plausible = function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  if (queue && queue.q) {
    window.plausible.q = queue.q;
  }
}

function loadPlausible() {
  const domain = getPlausibleDomain();
  if (!domain) return;

  ensureQueue();

  if (document.querySelector('script[data-plausible="true"]')) return;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.plausible = "true";
  script.setAttribute("data-domain", domain);
  script.src = PLAUSIBLE_SRC;
  document.head.appendChild(script);
}

loadPlausible();

export function trackEvent(name, props = {}) {
  if (typeof window.plausible !== "function") return;

  window.plausible(name, { props });
}
