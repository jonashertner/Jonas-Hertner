/* ========================================
   JONAS HERTNER
   Navigation · Typewriter · Theme
   ======================================== */

(function() {
  'use strict';

  // === CONFIG ===
  const TYPING_SPEED = 6; // ms per char (very fast)
  const TYPING_DELAY = 80; // delay before typing starts

  // === STATE ===
  let currentSection = 'about';
  let typingId = null;

  // === DOM ===
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // === THEME ===
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
    // Otherwise, let CSS media query handle it (auto mode)
  }

  function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let next;
    if (!current) {
      // Currently auto, switch to opposite of system
      next = prefersDark ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'dark';
    }

    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // === TYPEWRITER ===
  function typeText(element, text, callback) {
    const caret = $('.caret');

    // Clear element and move caret
    element.textContent = '';
    if (caret) element.appendChild(caret);

    let i = 0;

    function type() {
      if (i < text.length) {
        const char = document.createTextNode(text[i]);
        if (caret && caret.parentNode === element) {
          element.insertBefore(char, caret);
        } else {
          element.appendChild(char);
        }
        i++;
        typingId = setTimeout(type, TYPING_SPEED);
      } else {
        typingId = null;
        if (callback) callback();
      }
    }

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = text;
      if (caret) element.appendChild(caret);
      if (callback) callback();
      return;
    }

    typingId = setTimeout(type, TYPING_DELAY);
  }

  function stopTyping() {
    if (typingId) {
      clearTimeout(typingId);
      typingId = null;
    }
  }

  // === NAVIGATION ===
  function switchSection(id) {
    if (id === currentSection) return;

    stopTyping();

    // Update nav
    $$('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });

    // Switch panels
    $$('.panel').forEach(panel => {
      const isActive = panel.id === id;
      panel.classList.toggle('active', isActive);

      if (isActive) {
        const textEl = panel.querySelector('.text');
        if (textEl) {
          const fullText = textEl.dataset.fullText || textEl.textContent;
          if (!textEl.dataset.fullText) {
            textEl.dataset.fullText = fullText;
          }
          typeText(textEl, fullText);
        }
      }
    });

    currentSection = id;
  }

  // === TRANSLATIONS ===
  const translations = {
    en: {
      'about.heading': 'About',
      'about.content': 'Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests.',
      'services.service1.title': 'Litigation and Mediation',
      'services.service1.description': 'Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest.',
      'services.service2.title': 'Families, Foundations, and Individuals',
      'services.service2.description': 'Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value assets, due diligence, good governance, and generational transitions.',
      'services.service3.title': 'Criminal Law',
      'services.service3.description': 'Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights.',
      'services.service4.title': 'Constitutional Law, Civil Rights and Impact Litigation',
      'services.service4.description': 'Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies.',
      'services.service5.title': 'Artificial Intelligence and Technology',
      'services.service5.description': 'Experienced in the application of AI tools and LLMs in governance and education, Jonas regularly advises on emerging legal issues in this area, including related to technical limitations, privacy and data security, intellectual property rights, and ethical and psychological considerations as well as on their use in corporate governance and decision-making.',
      'services.service6.title': 'Philosophy',
      'services.service6.description': '«At the heart of my practice is an unwavering dedication to my clients\' long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»',
      'bio.heading': 'Biography',
      'bio.content': 'Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children\'s education, ecology, and the arts.',
      'contact.heading': 'Contact'
    },
    de: {
      'about.heading': 'Über',
      'about.content': 'Jonas Hertner ist ein unabhängiger Anwalt mit Sitz in Zürich und Basel. Er verfügt über mehr als ein Jahrzehnt Erfahrung in der Begleitung von Schweizer und internationalen Mandanten durch komplexe Rechtsstreitigkeiten, oft über mehrere Jurisdiktionen hinweg. Er berät Privatpersonen, Familien, Stiftungen und Unternehmen bei der Bewältigung komplexer Situationen auf dem Weg zu ihren Zielen. Für seine Mandanten ist er ein vertrauenswürdiger Berater und beharrlicher Anwalt, der sich mit Exzellenz für den Schutz und die Förderung ihrer langfristigen Interessen einsetzt.',
      'services.service1.title': 'Prozessführung und Mediation',
      'services.service1.description': 'Nicht jeder Rechtsstreit sollte vor Gericht ausgetragen werden. Oft können die Parteien eine vernünftige aussergerichtliche Einigung erzielen. Um in einem Rechtsstreit ein günstiges Ergebnis zu erzielen – sei es vor Gericht, aussergerichtlich oder durch Mediation – ist es wichtig, mögliche Konsequenzen jedes Schrittes so früh wie möglich zu antizipieren.',
      'services.service2.title': 'Familien, Stiftungen und Privatpersonen',
      'services.service2.description': 'Jonas verfügt über umfangreiche Erfahrung in der Beratung von in der Schweiz ansässigen und internationalen Familien und Privatkunden auf höchstem Niveau in komplexen Rechtssituationen.',
      'services.service3.title': 'Strafrecht',
      'services.service3.description': 'Jonas verfügt über umfangreiche Erfahrung in der Führung von Strafverfahren durch alle Instanzen, insbesondere in den Bereichen Unternehmensstrafrecht, Wirtschaftskriminalität und Bürgerrechte.',
      'services.service4.title': 'Verfassungsrecht und Bürgerrechte',
      'services.service4.description': 'Jonas arbeitet mit Parteien in der Schweiz und international zusammen, um Prozesse zum Schutz von Grundrechten und Freiheiten zu führen.',
      'services.service5.title': 'Künstliche Intelligenz und Technologie',
      'services.service5.description': 'Mit Erfahrung in der Anwendung von KI-Tools und LLMs in Governance und Bildung berät Jonas regelmässig zu aufkommenden Rechtsfragen in diesem Bereich.',
      'services.service6.title': 'Philosophie',
      'services.service6.description': '«Im Zentrum meiner Praxis steht ein unerschütterliches Engagement für die langfristigen Interessen meiner Mandanten, geprägt von meiner umfassenden Erfahrung auf höchstem Niveau des Berufsstands.»',
      'bio.heading': 'Biografie',
      'bio.content': 'Jonas Hertner schloss sein Studium mit Auszeichnung an den Universitäten Luzern und Genf ab. Seine Karriere umfasste Positionen bei Non-Profit-Organisationen, bei der Direktion für Völkerrecht und am Appellationsgericht Basel-Stadt.',
      'contact.heading': 'Kontakt'
    },
    fr: {
      'about.heading': 'À propos',
      'about.content': 'Jonas Hertner est un avocat indépendant basé à Zurich et Bâle, avec plus d\'une décennie d\'expérience dans l\'accompagnement de clients suisses et internationaux à travers des litiges juridiques complexes, souvent dans plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises.',
      'services.service1.title': 'Contentieux et médiation',
      'services.service1.description': 'Tous les litiges ne méritent pas d\'être portés devant les tribunaux. Souvent, les parties peuvent trouver un règlement raisonnable à l\'amiable.',
      'services.service2.title': 'Familles, fondations et particuliers',
      'services.service2.description': 'Jonas possède une vaste expérience dans le conseil aux familles et clients particuliers basés en Suisse et à l\'international.',
      'services.service3.title': 'Droit pénal',
      'services.service3.description': 'Jonas possède une vaste expérience dans la conduite de procédures pénales à travers toutes les instances.',
      'services.service4.title': 'Droit constitutionnel et droits civils',
      'services.service4.description': 'Jonas collabore avec des parties en Suisse et à l\'international pour mener des contentieux visant à protéger les droits fondamentaux.',
      'services.service5.title': 'Intelligence artificielle et technologie',
      'services.service5.description': 'Expérimenté dans l\'application des outils d\'IA et des LLM, Jonas conseille régulièrement sur les questions juridiques émergentes.',
      'services.service6.title': 'Philosophie',
      'services.service6.description': '«Au cœur de ma pratique se trouve un dévouement inébranlable aux intérêts à long terme de mes clients.»',
      'bio.heading': 'Biographie',
      'bio.content': 'Jonas Hertner a obtenu son diplôme avec mention des Universités de Lucerne et Genève.',
      'contact.heading': 'Contact'
    }
  };

  function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    $$('[data-key]').forEach(el => {
      const key = el.dataset.key;
      if (t[key]) {
        // Store and update text
        el.dataset.fullText = t[key];

        // If it's in the active panel and is .text, typewrite it
        const panel = el.closest('.panel');
        if (panel && panel.classList.contains('active') && el.classList.contains('text')) {
          stopTyping();
          typeText(el, t[key]);
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update button states
    $$('.lang-btn, .lang-btn-mobile').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('lang', lang);
  }

  // === INIT ===
  function init() {
    // Theme
    initTheme();

    // Theme toggle
    const themeBtn = $('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Navigation
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => switchSection(link.dataset.section));
    });

    // Keyboard nav
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const links = Array.from($$('.nav-link'));
      const idx = links.findIndex(l => l.dataset.section === currentSection);

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const next = (idx + 1) % links.length;
        switchSection(links[next].dataset.section);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const prev = (idx - 1 + links.length) % links.length;
        switchSection(links[prev].dataset.section);
      } else if (e.key >= '1' && e.key <= '9') {
        const i = parseInt(e.key) - 1;
        if (i < links.length) {
          e.preventDefault();
          switchSection(links[i].dataset.section);
        }
      }
    });

    // Language
    $$('.lang-btn, .lang-btn-mobile').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Load saved language or default
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // Start initial typewriter
    const activePanel = $('.panel.active .text');
    if (activePanel) {
      const text = activePanel.dataset.fullText || activePanel.textContent;
      activePanel.dataset.fullText = text;
      setTimeout(() => typeText(activePanel, text), 150);
    }
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
