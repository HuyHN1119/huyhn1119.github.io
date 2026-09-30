/*
 * Portfolio interactions: language toggle, project tabs, copy email.
 * Plain functions, no library. Each function does one job.
 */

const LANGUAGE_KEY = "hnh-portfolio-lang";
const DEFAULT_LANGUAGE = "vi";
const SUPPORTED_LANGUAGES = ["vi", "en"];

/* ---------- Language ---------- */

function readSavedLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY);
  } catch (error) {
    return null; // storage can be blocked, e.g. in a private window
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    // Not saved: the choice still works for this visit.
  }
}

function startingLanguage() {
  const saved = readSavedLanguage();
  return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
}

function applyLanguage(language) {
  const root = document.documentElement;
  root.dataset.lang = language;
  root.lang = language;

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    const isActive = button.dataset.setLang === language;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setupLanguageToggle() {
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.setLang;
      applyLanguage(language);
      saveLanguage(language);
    });
  });
}

/* ---------- Tabs ---------- */

function findTabFor(panelId) {
  const selector = '[role="tab"][aria-controls="' + CSS.escape(panelId) + '"]';
  return document.querySelector(selector);
}

function selectTab(tab, moveFocus) {
  const tablist = tab.closest('[role="tablist"]');

  tablist.querySelectorAll('[role="tab"]').forEach((other) => {
    const isSelected = other === tab;
    other.setAttribute("aria-selected", String(isSelected));
    other.tabIndex = isSelected ? 0 : -1;
    document.getElementById(other.getAttribute("aria-controls")).hidden = !isSelected;
  });

  if (moveFocus) {
    tab.focus();
  }
  tab.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function nextTabIndex(key, index, lastIndex) {
  if (key === "ArrowRight") return index === lastIndex ? 0 : index + 1;
  if (key === "ArrowLeft") return index === 0 ? lastIndex : index - 1;
  if (key === "Home") return 0;
  if (key === "End") return lastIndex;
  return null;
}

function handleTabKeys(event) {
  const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement);
  if (index === -1) return;

  const target = nextTabIndex(event.key, index, tabs.length - 1);
  if (target === null) return;

  event.preventDefault();
  selectTab(tabs[target], true);
}

function isTabbarStuck() {
  const tabbar = document.querySelector(".tabbar");
  return tabbar !== null && tabbar.getBoundingClientRect().top <= 1;
}

function scrollToPanels() {
  const panels = document.getElementById("panels");
  if (panels) panels.scrollIntoView();
}

// Open whatever the id points at: a whole panel, or a card inside a panel.
function openTarget(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return false;

  const panel = target.closest('[role="tabpanel"]');
  if (!panel) return false;

  selectTab(findTabFor(panel.id), false);
  if (target === panel) {
    scrollToPanels();
  } else {
    target.scrollIntoView();
  }
  return true;
}

function setupTabs() {
  document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener("click", () => {
        selectTab(tab, false);
        if (isTabbarStuck()) scrollToPanels();
      });
    });
    tablist.addEventListener("keydown", handleTabKeys);
  });
}

function setupTargetLinks() {
  document.querySelectorAll("[data-open]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (openTarget(link.dataset.open)) {
        event.preventDefault();
      }
    });
  });
}

function openTargetFromHash() {
  const targetId = window.location.hash.slice(1);
  if (targetId) openTarget(targetId);
}

/* ---------- Copy email ---------- */

function selectText(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function showCopied(button) {
  button.dataset.state = "copied";
  setTimeout(() => {
    delete button.dataset.state;
  }, 2000);
}

function setupCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.copyTarget);
      const text = target.textContent.trim();

      if (!navigator.clipboard) {
        selectText(target);
        return;
      }
      navigator.clipboard.writeText(text)
        .then(() => showCopied(button))
        .catch(() => selectText(target));
    });
  });
}

/* ---------- Start ---------- */

applyLanguage(startingLanguage());
setupLanguageToggle();
setupTabs();
setupTargetLinks();
setupCopyButtons();
openTargetFromHash();
window.addEventListener("hashchange", openTargetFromHash);
