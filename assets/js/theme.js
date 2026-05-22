// theme.js — Dark/Light theme toggle with localStorage persistence

(function () {
  'use strict';

  const THEME_KEY = 'theme';
  const ATTR = 'data-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  let transitionTimeout = null;

  function applyTheme(theme, animate) {
    const root = document.documentElement;
    if (animate) {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
      root.setAttribute('data-theme-transitioning', '');
      transitionTimeout = setTimeout(() => {
        root.removeAttribute('data-theme-transitioning');
        transitionTimeout = null;
      }, 500);
    }
    root.setAttribute(ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
    updateButtons(theme);
  }

  function updateButtons(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggle() {
    const current = document.documentElement.getAttribute(ATTR) || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  }

  // Apply on load immediately (before DOM ready to avoid flash)
  applyTheme(getPreferredTheme(), false);

  // --- Accent switching ---
  const ACCENT_KEY = 'accent';
  const ATTR_ACCENT = 'data-accent';
  const ACCENTS = ['yellow', 'blue', 'green', 'red'];

  function getPreferredAccent() {
    return localStorage.getItem(ACCENT_KEY) || 'yellow';
  }

  function applyAccent(accent) {
    const root = document.documentElement;
    root.setAttribute(ATTR_ACCENT, accent);
    localStorage.setItem(ACCENT_KEY, accent);
  }

  function cycleAccent() {
    const current = document.documentElement.getAttribute(ATTR_ACCENT) || 'yellow';
    const index = ACCENTS.indexOf(current);
    const next = ACCENTS[(index + 1) % ACCENTS.length];
    applyAccent(next);
  }

  // Apply immediately on load (before DOM ready to prevent flash)
  applyAccent(getPreferredAccent());

  function setupAccentListeners() {
    document.querySelectorAll('[data-accent-toggle]').forEach(btn => {
      btn.removeEventListener('click', cycleAccent);
      btn.addEventListener('click', cycleAccent);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    updateButtons(document.documentElement.getAttribute(ATTR) || 'dark');
    setupAccentListeners();
  });

  // Expose for nav.js re-init after SPA swap
  window.ThemeInit = function () {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.removeEventListener('click', toggle);
      btn.addEventListener('click', toggle);
    });
    updateButtons(document.documentElement.getAttribute(ATTR) || 'dark');
    setupAccentListeners();
  };
})();
