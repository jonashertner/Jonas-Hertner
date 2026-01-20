/* Jonas Hertner — 2026 — No-Scroll Panel System */
(function() {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // === CONFIG ===
  const PANELS = $$('.panel');
  const DOTS = $$('.dot');
  const TOTAL = PANELS.length;
  let current = 0;

  // === TRANSLATIONS ===
  const T = {
    en: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Attorney',
      'hero.loc': 'Zurich · Basel',
      'about': 'Independent lawyer with over a decade guiding Swiss and international clients through high-stakes disputes. Trusted advisor committed to excellence.',
      'practice.title': 'Practice',
      'practice.1': 'Litigation & Mediation',
      'practice.2': 'Families & Foundations',
      'practice.3': 'Criminal Law',
      'practice.4': 'Constitutional Law',
      'practice.5': 'Artificial Intelligence',
      'quote': '"Curiosity, excellence, empathy."',
      'bio.title': 'Biography',
      'bio.text': 'Lucerne · Geneva · FDFA · Basel Court · Quinn Emanuel',
      'notes.title': 'Feldnotizen',
      'notes.1': 'LLM Tutors',
      'notes.2': 'AI Governance'
    },
    de: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Advokat',
      'hero.loc': 'Zürich · Basel',
      'about': 'Unabhängiger Rechtsanwalt mit über zehn Jahren Erfahrung bei komplexen Rechtsstreitigkeiten. Verlässlicher Berater für langfristige Interessen.',
      'practice.title': 'Expertise',
      'practice.1': 'Prozessführung & Mediation',
      'practice.2': 'Familien & Stiftungen',
      'practice.3': 'Strafrecht',
      'practice.4': 'Verfassungsrecht',
      'practice.5': 'Künstliche Intelligenz',
      'quote': '"Neugier, Exzellenz, Empathie."',
      'bio.title': 'Biographie',
      'bio.text': 'Luzern · Genf · EDA · Appellationsgericht Basel · Quinn Emanuel',
      'notes.title': 'Feldnotizen',
      'notes.1': 'LLM-Tutoren',
      'notes.2': 'KI-Governance'
    },
    fr: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Avocat',
      'hero.loc': 'Zurich · Bâle',
      'about': 'Avocat indépendant avec plus de dix ans d\'expérience dans les litiges complexes. Conseiller de confiance pour la protection des intérêts.',
      'practice.title': 'Expertise',
      'practice.1': 'Litiges & Médiation',
      'practice.2': 'Familles & Fondations',
      'practice.3': 'Droit pénal',
      'practice.4': 'Droit constitutionnel',
      'practice.5': 'Intelligence artificielle',
      'quote': '"Curiosité, excellence, empathie."',
      'bio.title': 'Biographie',
      'bio.text': 'Lucerne · Genève · DFAE · Cour d\'appel Bâle · Quinn Emanuel',
      'notes.title': 'Feldnotizen',
      'notes.1': 'Tuteurs LLM',
      'notes.2': 'Gouvernance IA'
    }
  };

  let lang = localStorage.getItem('lang') || 'en';

  // === PANEL NAVIGATION ===
  function goTo(index) {
    if (index < 0 || index >= TOTAL) return;
    PANELS[current].classList.remove('active');
    DOTS[current].classList.remove('active');
    current = index;
    PANELS[current].classList.add('active');
    DOTS[current].classList.add('active');
    updateArrows();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function updateArrows() {
    const l = $('.arrow--l');
    const r = $('.arrow--r');
    if (l) l.disabled = current === 0;
    if (r) r.disabled = current === TOTAL - 1;
  }

  // === TYPEWRITER ===
  let twQueue = [];

  function tw(el, text, speed, cb) {
    if (!el) return cb?.();
    el.innerHTML = '';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return cb?.();
    }
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    const node = document.createTextNode('');
    el.appendChild(node);
    el.appendChild(cursor);
    let i = 0;
    (function tick() {
      if (i < text.length) {
        node.textContent += text[i++];
        twQueue.push(setTimeout(tick, speed));
      } else cb?.();
    })();
  }

  function clearTw() {
    twQueue.forEach(clearTimeout);
    twQueue = [];
  }

  function runTw() {
    clearTw();
    tw($('.hero__name .tw'), T[lang]['hero.name'], 55, () => {
      setTimeout(() => tw($('.hero__role'), T[lang]['hero.role'], 35), 150);
    });
  }

  // === ASCII ART PORTRAIT ===
  function generateASCII() {
    const ascii = $('#ascii');
    if (!ascii) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Target size for ASCII
      const w = 60;
      const h = Math.floor(w * (img.height / img.width) * 0.55);

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      const data = ctx.getImageData(0, 0, w, h).data;
      const chars = ' .:-=+*#%@';

      let result = '';
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
          const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
          result += chars[chars.length - 1 - charIndex];
        }
        result += '\n';
      }

      ascii.textContent = result;
    };

    img.onerror = () => {
      // Fallback: decorative pattern
      const w = 50, h = 30;
      let pattern = '';
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dist = Math.sqrt(Math.pow(x - w/2, 2) + Math.pow(y - h/2, 2));
          const char = dist < 10 ? '@' : dist < 15 ? '#' : dist < 20 ? '+' : '.';
          pattern += char;
        }
        pattern += '\n';
      }
      ascii.textContent = pattern;
    };

    img.src = 'images/jh.webp';
  }

  // === LANGUAGE ===
  function setLang(l, animate) {
    if (!T[l]) return;
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;

    $$('.lang__btn').forEach(b => b.classList.toggle('active', b.id === 'lang-' + l));

    $$('[data-key]').forEach(el => {
      const k = el.dataset.key;
      if (T[l][k] !== undefined) {
        if (animate && (el.classList.contains('tw') || el.classList.contains('hero__role'))) return;
        el.textContent = T[l][k];
      }
    });

    if (animate) runTw();
  }

  // === THEME ===
  function getTheme() {
    return localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('theme', t);
  }

  // === SWIPE DETECTION ===
  let touchStartX = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }

  // === INIT ===
  document.addEventListener('DOMContentLoaded', () => {
    // Theme
    setTheme(getTheme());

    // Language
    setLang(lang, false);
    setTimeout(runTw, 200);

    // ASCII
    generateASCII();

    // Year
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    // Update arrows initial state
    updateArrows();

    // Event: Theme toggle
    $('#theme-toggle')?.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });

    // Event: Language buttons
    $$('.lang__btn').forEach(b => {
      b.addEventListener('click', () => setLang(b.id.replace('lang-', ''), true));
    });

    // Event: Dot navigation
    DOTS.forEach(d => {
      d.addEventListener('click', () => goTo(+d.dataset.panel));
    });

    // Event: Arrow navigation
    $$('.arrow').forEach(a => {
      a.addEventListener('click', () => {
        +a.dataset.dir > 0 ? next() : prev();
      });
    });

    // Event: Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (e.key >= '1' && e.key <= String(TOTAL)) {
        goTo(+e.key - 1);
      }
    });

    // Event: Touch/Swipe
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Event: Click on panels (except interactive elements)
    $$('.panel').forEach(p => {
      p.addEventListener('click', e => {
        if (e.target.closest('a, button, input, textarea')) return;
        const rect = p.getBoundingClientRect();
        const x = e.clientX - rect.left;
        x > rect.width / 2 ? next() : prev();
      });
    });

    // Event: System theme change
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    });
  });
})();