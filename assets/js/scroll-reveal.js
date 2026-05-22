// scroll-reveal.js — Intersection Observer scroll animations

(function () {
  'use strict';

  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Stagger children inside reveal-group containers
    document.querySelectorAll('.reveal-group').forEach(group => {
      group.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', initScrollReveal);
  window.ScrollRevealInit = initScrollReveal;
})();
