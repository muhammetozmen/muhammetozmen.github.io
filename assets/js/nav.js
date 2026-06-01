// nav.js — SPA-like navigation + sticky nav + mobile hamburger

(function () {
  'use strict';

  // --- Loading bar ---
  function showLoadingBar() {
    let bar = document.getElementById('loading-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'loading-bar';
      document.body.prepend(bar);
    }
    bar.classList.remove('loading');
    void bar.offsetWidth; // reflow
    bar.classList.add('loading');
  }

  function hideLoadingBar() {
    const bar = document.getElementById('loading-bar');
    if (bar) bar.classList.remove('loading');
  }

  // --- SPA navigation ---
  function isSameOrigin(url) {
    try {
      const u = new URL(url, window.location.href);
      return u.origin === window.location.origin;
    } catch { return false; }
  }

  function isInternalLink(el) {
    const href = el.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (el.hasAttribute('target') && el.target !== '_self') return false;
    return isSameOrigin(href);
  }

  async function navigate(url, pushState) {
    showLoadingBar();
    try {
      const res = await fetch(url, { headers: { 'X-SPA': '1' } });
      if (!res.ok) throw new Error('Fetch failed');
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newMain = doc.querySelector('main');
      const curMain = document.querySelector('main');
      if (!newMain || !curMain) throw new Error('No main element');

      // Update title
      document.title = doc.title;

      // Swap content
      curMain.innerHTML = newMain.innerHTML;

      // Copy attributes from new main
      Array.from(newMain.attributes).forEach(attr => {
        curMain.setAttribute(attr.name, attr.value);
      });

      if (pushState) {
        history.pushState({ url }, '', url);
      }

      // Re-init scripts
      setTimeout(() => {
        if (window.ScrollRevealInit) window.ScrollRevealInit();
        if (window.LangInit) window.LangInit();
        if (window.ThemeInit) window.ThemeInit();
        if (window.SearchInit) window.SearchInit();
        initPageSpecific();
        setActiveNav(url);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 10);

      hideLoadingBar();

      // Update PAGE_MAP globals from new page's script tag
      const pageScript = doc.querySelector('script[data-page-vars]');
      if (pageScript) {
        try { eval(pageScript.textContent); } catch (e) { }
      }

    } catch (e) {
      // Fallback to normal navigation
      hideLoadingBar();
      window.location.href = url;
    }
  }

  function setActiveNav(url) {
    const rawPath = new URL(url, window.location.href).pathname;
    // Normalize: strip /en/ prefix for comparison with nav links (which use EN paths)
    const path = rawPath.replace(/^\/en(\/|$)/, '/').replace(/\/$/, '') || '/';
    const navLinks = document.querySelectorAll('.nav-inner a');

    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalize href (strip trailing slash for comparison)
      const normHref = href.replace(/\/$/, '') || '/';

      const isExact = (normHref === path);
      const isParent = (normHref !== '/' && path.startsWith(normHref + '/'));

      if (isExact || isParent) {
        link.classList.add('active');

        // If it's a dropdown item, also highlight the main parent link
        const dropdown = link.closest('.nav-dropdown');
        if (dropdown) {
          const mainLink = dropdown.closest('.nav-item').querySelector('.nav-link');
          if (mainLink) mainLink.classList.add('active');
        }
      }
    });
  }

  // --- Sticky nav on scroll ---
  function initStickyNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;

    function onScroll() {
      const currentScrollY = window.scrollY;
      nav.classList.toggle('scrolled', currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        nav.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY) {
        nav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile hamburger ---
  function initHamburger() {
    const btn = document.getElementById('nav-hamburger');
    const menu = document.getElementById('nav-mobile');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Intercept link clicks ---
  function getLocalizedUrl(url) {
    const lang = localStorage.getItem('lang') || 'tr';
    try {
      const u = new URL(url, window.location.href);
      const path = u.pathname;
      const map = window.PAGE_MAP;
      if (!map) return url;
      for (const key in map) {
        // Match both EN and TR versions of the page
        const enPath = map[key].en || '';
        const trPath = map[key].tr || '';
        // Normalize trailing slashes
        const normPath = path.replace(/\/$/, '') || '/';
        const normEn = enPath.replace(/\/$/, '') || '/';
        const normTr = trPath.replace(/\/$/, '') || '/';
        if (normEn === normPath || normTr === normPath) {
          return map[key][lang] || path;
        }
      }
    } catch (e) { }
    return url;
  }

  function initSPALinks() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      if (!isInternalLink(link)) return;
      e.preventDefault();
      let url = link.getAttribute('href');
      // Always map to the localized version to avoid wrong-language fetching
      url = getLocalizedUrl(url);

      if (url !== window.location.pathname + window.location.search) {
        navigate(url, true);
      }
    });

    window.addEventListener('popstate', function (e) {
      const url = e.state?.url || window.location.pathname;
      navigate(url, false);
    });
  }

  // --- Page-specific initializations ---
  function initPageSpecific() {
    // --- Hero Text Scramble and Birthday Logic (Home Page) ---
    const loopEl = document.getElementById('hero-loop');
    if (loopEl && window.TextScramble) {
      // Birthday Emoji Logic
      const today = new Date();
      if (today.getMonth() === 8 && today.getDate() === 19) {
        const nameEl = document.querySelector('.hero-name');
        if (nameEl && !nameEl.querySelector('.bday-emoji')) {
          const emoji = document.createElement('span');
          emoji.classList.add('bday-emoji');
          emoji.textContent = '🎂';
          emoji.style.marginLeft = '12px';
          emoji.style.fontSize = '0.85em';
          emoji.style.display = 'inline-block';
          emoji.style.verticalAlign = 'baseline';
          nameEl.appendChild(emoji);
        }
      }

      // Text Fade Loop (Minimal Paper Style)
      const isTr = loopEl.getAttribute('data-lang') === 'tr';
      const words = isTr ? [
        "Gömülü Sistemler ve Bilgisayar Mühendisi",
        "Yazılım Geliştiricisi",
        "Python Geliştiricisi",
        "C/C++ Geliştiricisi"
      ] : [
        "Embedded Systems & Computer Engineer",
        "Software Developer",
        "Python Developer",
        "C/C++ Developer"
      ];

      let wordIdx = 0;
      if (loopEl.animationTimeout) clearTimeout(loopEl.animationTimeout);

      // Apply initial style transitions
      loopEl.style.transition = 'opacity 0.4s ease-in-out';
      loopEl.style.opacity = '1';

      const cycleText = () => {
        if (!document.getElementById('hero-loop')) return;
        
        // 1. Fade out
        loopEl.style.opacity = '0';
        
        // 2. Change text after fade-out completes (400ms)
        setTimeout(() => {
          if (!document.getElementById('hero-loop')) return;
          wordIdx = (wordIdx + 1) % words.length;
          loopEl.textContent = words[wordIdx];
          
          // 3. Fade in
          loopEl.style.opacity = '1';
          
          // 4. Schedule next transition
          loopEl.animationTimeout = setTimeout(cycleText, 3000);
        }, 400);
      };

      loopEl.animationTimeout = setTimeout(cycleText, 3000);
    }

    // Year group toggles on resume page
    document.querySelectorAll('.year-group-header').forEach(header => {
      header.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const isOpen = content.classList.toggle('open');
        this.classList.toggle('open', isOpen);
      });
    });

    // Blog tabs
    const blogTabs = document.querySelectorAll('.blog-tab');
    const postPanels = document.querySelectorAll('.post-panel');
    const pageId = document.querySelector('main')?.getAttribute('data-page-id');

    if (blogTabs.length > 0) {
      // Auto-activate based on page context (SPA compatible)
      let defaultTab = 'blog';
      if (pageId === 'devlogs') defaultTab = 'devlogs';

      blogTabs.forEach(t => t.classList.remove('active'));
      postPanels.forEach(p => p.classList.remove('active'));

      const initialTab = document.querySelector(`.blog-tab[data-tab="${defaultTab}"]`);
      const initialPanel = document.getElementById('panel-' + defaultTab);
      if (initialTab) initialTab.classList.add('active');
      if (initialPanel) initialPanel.classList.add('active');

      blogTabs.forEach(tab => {
        tab.addEventListener('click', function () {
          const tabName = this.getAttribute('data-tab');
          blogTabs.forEach(t => t.classList.remove('active'));
          postPanels.forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          const panel = document.getElementById('panel-' + tabName);
          if (panel) panel.classList.add('active');
        });
      });
    }

    // TOC mobile toggle
    const tocToggle = document.querySelector('.toc-mobile-toggle');
    if (tocToggle) {
      tocToggle.addEventListener('click', function () {
        const content = document.querySelector('.toc-mobile-content');
        const isOpen = content.classList.toggle('open');
        this.classList.toggle('open', isOpen);
        const arrow = this.querySelector('span');
        if (arrow) arrow.textContent = isOpen ? '▲' : '▼';
      });
    }

    // Lightbox
    document.querySelectorAll('.gallery-scroll img, .gallery-grid img, .post-content img, .pt-image').forEach(img => {
      img.addEventListener('click', function () {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbCaption = document.getElementById('lightbox-caption');
        if (lb && lbImg) {
          lbImg.src = this.src;
          if (lbCaption) {
            lbCaption.textContent = this.alt || '';
          }
          lb.classList.add('open');
        }
      });
    });

    const lbClose = document.getElementById('lightbox-close');
    const lb = document.getElementById('lightbox');
    const lbCaption = document.getElementById('lightbox-caption');
    if (lbClose && lb) {
      const closeLb = () => {
        lb.classList.remove('open');
        if (lbCaption) lbCaption.textContent = '';
      };
      lbClose.addEventListener('click', closeLb);
      lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLb();
      });
      document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.code === 'Space') && lb.classList.contains('open')) {
          e.preventDefault();
          closeLb();
        }
      });
    }

    // Scroll FAB logic
    const fab = document.getElementById('scroll-fab');
    if (fab) {
      const updateFab = () => {
        const scrollY = window.scrollY;
        if (scrollY < 200) {
          fab.classList.add('at-top');
        } else {
          fab.classList.remove('at-top');
        }
        fab.classList.add('visible');
      };

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateFab();
            ticking = false;
          });
          ticking = true;
        }
      });

      fab.addEventListener('click', () => {
        if (fab.classList.contains('at-top')) {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      updateFab();
    }

    // Active Quick Nav Tabs logic
    const quickNavLinks = document.querySelectorAll('.resume-quick-nav a');
    const resumeSections = document.querySelectorAll('.resume-section');

    if (quickNavLinks.length > 0 && resumeSections.length > 0) {
      let isNavClickScrolling = false;
      let navScrollTimeout = null;

      // Smooth scroll on click
      quickNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            isNavClickScrolling = true;
            quickNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const offset = targetEl.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top: offset, behavior: 'smooth' });
            history.pushState(null, null, targetId);

            clearTimeout(navScrollTimeout);
            navScrollTimeout = setTimeout(() => {
              isNavClickScrolling = false;
            }, 800);
          }
        });
      });

      const updateActiveTab = () => {
        if (isNavClickScrolling) return;

        let currentId = '';
        const scrollPos = window.scrollY + 160; // Offset for nav height + padding

        resumeSections.forEach(section => {
          if (scrollPos >= section.offsetTop) {
            currentId = section.id;
          }
        });

        if (!currentId && resumeSections.length > 0) {
          currentId = resumeSections[0].id;
        }

        if (currentId) {
          quickNavLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      };

      let isTicking = false;
      window.addEventListener('scroll', () => {
        if (!isTicking) {
          window.requestAnimationFrame(() => {
            updateActiveTab();
            isTicking = false;
          });
          isTicking = true;
        }
      }, { passive: true });
      updateActiveTab(); // Initial check
    }

    // Gallery prev/next buttons
    document.querySelectorAll('.pt-gallery-wrap').forEach(wrap => {
      const gallery = wrap.querySelector('.pt-gallery');
      const btnPrev  = wrap.querySelector('.pt-gallery-btn-prev');
      const btnNext  = wrap.querySelector('.pt-gallery-btn-next');
      if (!gallery || !btnPrev || !btnNext) return;

      const isHomeProjects = wrap.classList.contains('home-projects-gallery-wrap');

      function updateButtons() {
        const atStart = gallery.scrollLeft <= 4;
        const atEnd   = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 8;
        btnPrev.classList.toggle('hidden', atStart);
        
        if (isHomeProjects) {
          btnNext.classList.remove('hidden');
          btnNext.classList.toggle('at-end', atEnd);
        } else {
          btnNext.classList.toggle('hidden', atEnd);
        }
      }

      btnPrev.addEventListener('click', () => {
        const step = gallery.clientWidth * 0.8;
        gallery.scrollBy({ left: -step, behavior: 'smooth' });
      });
      btnNext.addEventListener('click', () => {
        const atEnd = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 8;
        if (isHomeProjects && atEnd) {
          const targetUrl = btnNext.getAttribute('data-target-url');
          if (targetUrl) {
            const link = document.createElement('a');
            link.href = targetUrl;
            document.body.appendChild(link);
            link.click();
            link.remove();
          }
        } else {
          const step = gallery.clientWidth * 0.8;
          gallery.scrollBy({ left: step, behavior: 'smooth' });
        }
      });

      gallery.addEventListener('scroll', updateButtons, { passive: true });
      updateButtons();

      // Ensure buttons update when images finish loading and change the scrollWidth
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => updateButtons());
        ro.observe(gallery);
        Array.from(gallery.querySelectorAll('img')).forEach(img => {
           img.addEventListener('load', updateButtons);
        });
      }
    });

    // Certificate PDFs initialization
    const pdfCanvases = document.querySelectorAll('.certificate-pdf-preview[data-pdf]');
    if (pdfCanvases.length > 0 && typeof pdfjsLib !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      function renderCanvas(canvas) {
        if (canvas.dataset.rendered) return;
        canvas.dataset.rendered = 'true';
        const url = canvas.getAttribute('data-pdf');
        const container = canvas.parentElement;
        pdfjsLib.getDocument(url).promise
          .then(pdf => pdf.getPage(1))
          .then(page => {
            const w = container.clientWidth || 480;
            const scale = w / page.getViewport({ scale: 1 }).width;
            const vp = page.getViewport({ scale: scale });
            canvas.width  = vp.width;
            canvas.height = vp.height;
            page.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
          })
          .catch(e => console.warn('PDF render failed:', url, e));
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) renderCanvas(entry.target);
        });
      }, { rootMargin: '200px' });

      pdfCanvases.forEach(canvas => observer.observe(canvas));
    }

    // Copy-to-clipboard buttons for code blocks
    document.querySelectorAll('.post-content pre').forEach(pre => {
      if (pre.closest('.code-block-wrap')) return; // already wrapped

      // Wrap pre in a relative-positioned container
      const wrap = document.createElement('div');
      wrap.className = 'code-block-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>copy</span>`;

      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        const text = (code ? code : pre).innerText;
        navigator.clipboard.writeText(text).then(() => {
          btn.classList.add('copied');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>copied!</span>`;
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>copy</span>`;
          }, 1500);
        }).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0;';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          btn.classList.add('copied');
          setTimeout(() => btn.classList.remove('copied'), 1500);
        });
      });

      wrap.appendChild(btn);
    });
  }


  document.addEventListener('DOMContentLoaded', function () {
    initStickyNav();
    initHamburger();
    initSPALinks();
    initPageSpecific();
    setActiveNav(window.location.href);
  });
})();
