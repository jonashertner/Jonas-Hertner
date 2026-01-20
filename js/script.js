/* Jonas Hertner — 2026 */
(function() {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // Content
  const T = {
    en: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Attorney',
      'hero.loc': 'Zurich · Basel',
      'about': 'Jonas Hertner is an independent lawyer with over a decade of experience guiding Swiss and international clients through high-stakes disputes. A trusted advisor committed to excellence in protecting long-term interests.',
      'practice.title': 'Practice',
      'practice.1': 'Litigation & Mediation',
      'practice.2': 'Families & Foundations',
      'practice.3': 'Criminal Law',
      'practice.4': 'Constitutional Law',
      'practice.5': 'Artificial Intelligence',
      'quote': 'Guided by curiosity, excellence, and empathy, I remain focused on what truly matters.',
      'bio.title': 'Biography',
      'bio.text': 'Universities of Lucerne and Geneva. Federal Department of Foreign Affairs. Court of Appeal Basel-Stadt. Quinn Emanuel Urquhart & Sullivan.',
      'notes.title': 'Feldnotizen',
      'notes.1': 'LLM Tutors',
      'notes.2': 'AI Governance'
    },
    de: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Advokat',
      'hero.loc': 'Zürich · Basel',
      'about': 'Jonas Hertner ist unabhängiger Rechtsanwalt mit über zehn Jahren Erfahrung in der Beratung schweizerischer und internationaler Mandanten bei komplexen Rechtsstreitigkeiten. Ein verlässlicher Berater für den Schutz langfristiger Interessen.',
      'practice.title': 'Expertise',
      'practice.1': 'Prozessführung & Mediation',
      'practice.2': 'Familien & Stiftungen',
      'practice.3': 'Strafrecht',
      'practice.4': 'Verfassungsrecht',
      'practice.5': 'Künstliche Intelligenz',
      'quote': 'Geleitet von Neugier, Exzellenz und Empathie fokussiere ich mich auf das Wesentliche.',
      'bio.title': 'Biographie',
      'bio.text': 'Universitäten Luzern und Genf. Eidgenössisches Departement für auswärtige Angelegenheiten. Appellationsgericht Basel-Stadt. Quinn Emanuel Urquhart & Sullivan.',
      'notes.title': 'Feldnotizen',
      'notes.1': 'LLM-Tutoren',
      'notes.2': 'KI-Governance'
    },
    fr: {
      'hero.name': 'Jonas Hertner',
      'hero.role': 'Avocat',
      'hero.loc': 'Zurich · Bâle',
      'about': 'Jonas Hertner est avocat indépendant avec plus de dix ans d\'expérience dans l\'accompagnement de clients suisses et internationaux dans des litiges complexes. Un conseiller de confiance engagé dans la protection des intérêts à long terme.',
      'practice.title': 'Expertise',
      'practice.1': 'Litiges & Médiation',
      'practice.2': 'Familles & Fondations',
      'practice.3': 'Droit pénal',
      'practice.4': 'Droit constitutionnel',
      'practice.5': 'Intelligence artificielle',
      'quote': 'Guidé par la curiosité, l\'excellence et l\'empathie, je reste concentré sur l\'essentiel.',
      'bio.title': 'Biographie',
      'bio.text': 'Universités de Lucerne et Genève. Département fédéral des affaires étrangères. Cour d\'appel de Bâle-Ville. Quinn Emanuel Urquhart & Sullivan.',
      'notes.title': 'Feldnotizen',
      'notes.1': 'Tuteurs LLM',
      'notes.2': 'Gouvernance IA'
    }
  };

  let lang = localStorage.getItem('lang') || 'en';
  let twQueue = [];

  // Typewriter
  function tw(el, text, speed, cb) {
    if (!el) return cb && cb();
    el.innerHTML = '';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return cb && cb();
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
      } else cb && cb();
    })();
  }

  function clearTw() {
    twQueue.forEach(clearTimeout);
    twQueue = [];
  }

  function runTw() {
    clearTw();
    const name = $('.hero__name .tw');
    const role = $('.hero__role');
    tw(name, T[lang]['hero.name'], 60, () => {
      setTimeout(() => tw(role, T[lang]['hero.role'], 40), 200);
    });
  }

  // Language
  function setLang(l, animate) {
    if (!T[l]) return;
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    $$('.lang__btn').forEach(b => b.classList.toggle('active', b.id === 'lang-' + l));
    $$('[data-key]').forEach(el => {
      const k = el.dataset.key;
      if (T[l][k] !== undefined) {
        if (animate && el.classList.contains('tw')) return;
        if (animate && el.classList.contains('hero__role')) return;
        el.textContent = T[l][k];
      }
    });
    if (animate) runTw();
  }

  // Theme
  function getTheme() {
    return localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('theme', t);
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    setTheme(getTheme());
    setLang(lang, false);
    setTimeout(runTw, 300);

    $('#theme-toggle')?.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });

    $$('.lang__btn').forEach(b => {
      b.addEventListener('click', () => setLang(b.id.replace('lang-', ''), true));
    });

    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    });
  });
})();