/**
 * Jonas Hertner — Website Script
 * Theme toggle, language switching, typewriter effect, scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- DOM Elements ---
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.theme-toggle__sun');
  const moonIcon = document.querySelector('.theme-toggle__moon');
  const languageButtons = document.querySelectorAll('.lang-switcher__btn');
  const revealElements = document.querySelectorAll('.reveal');
  const yearSpan = document.getElementById('year');

  // --- Translations ---
  const content = {
    en: {
      hero: {
        title: 'Jonas Hertner',
        subtitle: 'ATTORNEY',
        location: 'Zurich · Basel'
      },
      about: {
        label: 'About',
        content: 'Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests.'
      },
      practice: {
        label: 'Practice',
        heading: 'Areas of Expertise',
        litigation: {
          title: 'Litigation and mediation',
          description: 'Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest.'
        },
        families: {
          title: 'Families, foundations, and individuals',
          description: 'Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value assets, due diligence, good governance, and generational transitions.'
        },
        criminal: {
          title: 'Criminal law',
          description: 'Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights.'
        },
        constitutional: {
          title: 'Constitutional law, civil rights and impact litigation',
          description: 'Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies.'
        },
        ai: {
          title: 'Artificial intelligence',
          description: 'Experienced in the application of AI tools across various modalities—including large language models, multimodal systems, and agentic AI—Jonas regularly advises on emerging legal issues in this rapidly evolving field. His practice covers technical capabilities and limitations, privacy and data security, intellectual property rights, liability frameworks, and ethical considerations, as well as the strategic use of AI in corporate governance and decision-making.'
        }
      },
      philosophy: {
        label: 'Philosophy',
        quote: 'At the heart of my practice is an unwavering dedication to my clients\' long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.'
      },
      bio: {
        label: 'Biography',
        content: 'Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children\'s education, ecology, and the arts.'
      },
      notes: {
        label: 'Field Notes',
        heading: 'Feldnotizen',
        note1: { title: 'Personalized LLM Tutors' },
        note2: { title: 'Modern Governance Requires AI: Updating the Business Judgment Rule' }
      },
      contact: {
        label: 'Contact',
        heading: 'Get in Touch',
        zurich: 'Zurich',
        zurichAddress: 'Asylstrasse 41, 8032 Zurich',
        basel: 'Basel',
        baselAddress: 'PO Box, 4001 Basel',
        emailLabel: 'Email',
        email: 'team@jonashertner.com'
      }
    },
    de: {
      hero: {
        title: 'Jonas Hertner',
        subtitle: 'ADVOKAT',
        location: 'Zürich · Basel'
      },
      about: {
        label: 'Über',
        content: 'Jonas Hertner ist unabhängiger Rechtsanwalt in Zürich und Basel mit über einem Jahrzehnt Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der grössten Rechtsstreitigkeiten in der Schweiz. Er berät Privatpersonen, Familien, Stiftungen und Unternehmen und unterstützt sie dabei, in anspruchsvollen Situationen ihre Ziele zu verwirklichen. Seine Mandanten schätzen ihn als verlässlichen Berater und entschlossenen Anwalt, der ihre langfristigen Interessen mit höchstem Anspruch schützt und fördert.'
      },
      practice: {
        label: 'Expertise',
        heading: 'Tätigkeitsbereiche',
        litigation: {
          title: 'Rechtsstreitigkeiten und Mediation',
          description: 'Nicht jeder Streit muss vor Gericht gebracht werden. Oft gelangen die Parteien einvernehmlich oder durch Mediation zu einer vernünftigen Einigung. Um in einem Rechtsstreit ein gutes Ergebnis zu erzielen, sind die möglichen Folgen eines jeden Schrittes früh zu antizipieren, wenn sich ein Streit abzeichnet. Jonas verfügt über ein Jahrzehnt an Erfahrung in Rechtsstreitigkeiten auf höchster Ebene und hilft Ihnen, die eigene Perspektive und die Perspektiven der gegnerischen Seite und eines eventuellen Gerichts, das über den Streit entscheidet, zu durchdenken, um bei jedem Schritt die effektivste Massnahme ergreifen zu können.'
        },
        families: {
          title: 'Familien, Stiftungen und Einzelpersonen',
          description: 'Jonas verfügt über umfassende Erfahrung in der Beratung von Familien und Privatpersonen in der Schweiz und international auf höchstem Niveau. Er begleitet sie in komplexen rechtlichen Angelegenheiten, insbesondere bei gesellschaftsrechtlichen Streitigkeiten und Aktionärskonflikten, Finanzstreitigkeiten und strafrechtlichen Untersuchungen. Zudem berät er bei Themen wie Gründungen, dem Erwerb hochwertiger Vermögenswerte, Due-Diligence-Prüfungen, der Einführung wirksamer Corporate-Governance-Strukturen und bei Generationenwechseln.'
        },
        criminal: {
          title: 'Strafrecht',
          description: 'Jonas hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte.'
        },
        constitutional: {
          title: 'Verfassungsrecht, Grundrechte und strategische Prozessführung',
          description: 'Jonas arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie (Schutz von Lebensräumen) und neue Technologien.'
        },
        ai: {
          title: 'Künstliche Intelligenz',
          description: 'Mit Erfahrung im Einsatz von KI-Werkzeugen verschiedener Modalitäten—darunter grosse Sprachmodelle, multimodale Systeme und agentische KI—berät Jonas regelmässig zu aufkommenden Rechtsfragen in diesem sich rasch entwickelnden Bereich. Seine Praxis umfasst technische Möglichkeiten und Grenzen, Datenschutz und Datensicherheit, Rechte des geistigen Eigentums, Haftungsfragen und ethische Überlegungen sowie den strategischen Einsatz von KI in der Unternehmensführung und Entscheidungsfindung.'
        }
      },
      philosophy: {
        label: 'Philosophie',
        quote: 'Im Mittelpunkt meiner Tätigkeit steht das unerschütterliche Engagement für die langfristigen Interessen meiner Mandanten, geprägt von fundierter Erfahrung auf höchster Ebene der anwaltlichen Beratung. Geleitet von Neugier, Empathie, höchstem Anspruch an Qualität und Integrität sowie dem Streben nach fairen und gerechten Ergebnissen fokussiere ich mich auf das, was wirklich zählt. So begleite ich meine Mandanten durch anspruchsvolle Situationen, schütze ihre Rechte und unterstütze sie dabei, ihre Ziele zu verwirklichen.'
      },
      bio: {
        label: 'Biographie',
        content: 'Jonas Hertner schloss sein Studium der Rechtswissenschaften an den Universitäten Luzern und Genf mit Auszeichnung ab. Sein beruflicher Weg führte ihn zu gemeinnützigen Organisationen, zur Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten und an das Appellationsgericht Basel-Stadt. Später war er massgeblich am Aufbau des Schweizer Büros der internationalen Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan beteiligt. Neben seiner anwaltlichen Tätigkeit engagiert sich Jonas Hertner in den Bereichen Bildung, Ökologie und Kunst.'
      },
      notes: {
        label: 'Feldnotizen',
        heading: 'Feldnotizen',
        note1: { title: 'Personalisierte LLM-Tutoren' },
        note2: { title: 'Moderne Governance erfordert KI: Aktualisierung der Business Judgment Rule' }
      },
      contact: {
        label: 'Kontakt',
        heading: 'Kontakt aufnehmen',
        zurich: 'Zürich',
        zurichAddress: 'Asylstrasse 41, 8032 Zürich',
        basel: 'Basel',
        baselAddress: 'Postfach, 4001 Basel',
        emailLabel: 'E-Mail',
        email: 'team@jonashertner.com'
      }
    },
    fr: {
      hero: {
        title: 'Jonas Hertner',
        subtitle: 'AVOCAT',
        location: 'Zurich · Bâle'
      },
      about: {
        label: 'À propos',
        content: 'Jonas Hertner est avocat indépendant établi à Zurich et à Bâle. Fort de plus de dix ans d\'expérience, il accompagne une clientèle suisse et internationale dans des litiges complexes à forts enjeux, souvent portés devant plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises confrontés à des situations délicates, les aidant à atteindre leurs objectifs stratégiques. Ses clients trouvent en lui un conseiller de confiance et un défenseur déterminé, engagé à protéger et à promouvoir leurs intérêts avec rigueur et excellence sur le long terme.'
      },
      practice: {
        label: 'Expertise',
        heading: 'Domaines d\'expertise',
        litigation: {
          title: 'Litiges et médiation',
          description: 'Tous les litiges ne doivent pas nécessairement finir devant les tribunaux. Une solution avantageuse peut souvent être trouvée à l\'amiable ou par médiation. Afin d\'obtenir le meilleur résultat, que ce soit en justice ou en dehors, il est essentiel d\'anticiper les conséquences de chaque décision dès les premiers signes d\'un différend. Avec plus de dix ans d\'expérience dans les litiges complexes, Jonas vous aide à évaluer votre position ainsi que celles de la partie adverse et de tout juge ou arbitre susceptible de trancher l\'affaire, afin de vous permettre, à chaque étape, de prendre la mesure la plus efficace pour défendre vos intérêts.'
        },
        families: {
          title: 'Familles, fondations et particuliers',
          description: 'Jonas possède une vaste expérience du conseil au plus haut niveau auprès de familles et de particuliers établis en Suisse et à l\'international, dans des situations juridiques complexes, notamment dans le cadre de litiges entre actionnaires à fort enjeu, de contentieux financiers importants et d\'enquêtes sur des infractions pénales, ainsi que dans des contextes non litigieux tels que la création d\'entreprises, l\'acquisition d\'actifs de grande valeur, les procédures de due diligence, la mise en place de bonnes pratiques de gouvernance et les transitions générationnelles.'
        },
        criminal: {
          title: 'Droit pénal',
          description: 'Jonas possède une expérience approfondie dans la conduite de procédures pénales à tous les niveaux judiciaires, en particulier dans les domaines de la responsabilité pénale des entreprises, de la criminalité économique et financière, ainsi que de la protection des droits fondamentaux.'
        },
        constitutional: {
          title: 'Droit constitutionnel, droits civils et litiges stratégiques',
          description: 'Jonas collabore avec des acteurs en Suisse et à l\'international afin de mener des procédures judiciaires visant à protéger les droits et libertés fondamentaux, en particulier dans les domaines de la protection de l\'environnement (préservation des habitats) et des nouvelles technologies.'
        },
        ai: {
          title: 'Intelligence artificielle',
          description: 'Fort d\'une expérience dans l\'application d\'outils d\'IA de diverses modalités—notamment les grands modèles de langage, les systèmes multimodaux et l\'IA agentique—Jonas conseille régulièrement sur les questions juridiques émergentes dans ce domaine en rapide évolution. Sa pratique couvre les capacités et limitations techniques, la confidentialité et la sécurité des données, les droits de propriété intellectuelle, les cadres de responsabilité et les considérations éthiques, ainsi que l\'utilisation stratégique de l\'IA dans la gouvernance d\'entreprise et la prise de décision.'
        }
      },
      philosophy: {
        label: 'Philosophie',
        quote: 'Au cœur de ma pratique se trouve un engagement indéfectible envers les intérêts à long terme de mes clients, fort d\'une expérience approfondie au plus haut niveau de la profession. Je questionne les idées reçues et examine chaque perspective afin d\'élaborer l\'approche la plus pertinente, en transformant une situation complexe en conseils précis et efficaces. Animé par la curiosité, l\'excellence, l\'empathie et la recherche de solutions justes et équitables, je me concentre sur l\'essentiel. Ainsi, j\'accompagne mes clients face à la complexité, protège leurs droits et favorise la réalisation de leurs objectifs.'
      },
      bio: {
        label: 'Biographie',
        content: 'Jonas Hertner est titulaire d\'un diplôme en droit obtenu avec mention aux universités de Lucerne et de Genève. Son parcours professionnel l\'a mené auprès d\'organisations à but non lucratif, à la Direction du droit international du Département fédéral des affaires étrangères ainsi qu\'à la Cour d\'appel de Bâle-Ville. Il a par la suite contribué à l\'établissement du bureau suisse du cabinet international Quinn Emanuel Urquhart & Sullivan. En parallèle à sa pratique juridique, Jonas s\'investit dans des projets consacrés à l\'éducation des enfants, à l\'écologie et aux arts.'
      },
      notes: {
        label: 'Notes de terrain',
        heading: 'Feldnotizen',
        note1: { title: 'Tuteurs LLM personnalisés' },
        note2: { title: 'La gouvernance moderne nécessite l\'IA: mise à jour de la Business Judgment Rule' }
      },
      contact: {
        label: 'Contact',
        heading: 'Nous contacter',
        zurich: 'Zurich',
        zurichAddress: 'Asylstrasse 41, 8032 Zurich',
        basel: 'Bâle',
        baselAddress: 'Case postale, 4001 Bâle',
        emailLabel: 'Email',
        email: 'team@jonashertner.com'
      }
    }
  };

  // --- Typewriter Effect ---
  let typewriterActive = false;
  let typewriterTimeouts = [];

  function clearTypewriter() {
    typewriterTimeouts.forEach(t => clearTimeout(t));
    typewriterTimeouts = [];
    typewriterActive = false;
  }

  function typewrite(element, text, speed = 60, callback) {
    if (!element) return;

    // Clear existing content and cursor
    element.innerHTML = '';

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = text;
      if (callback) callback();
      return;
    }

    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    let i = 0;
    const textNode = document.createTextNode('');
    element.appendChild(textNode);
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        textNode.textContent += text.charAt(i);
        i++;
        const timeout = setTimeout(type, speed);
        typewriterTimeouts.push(timeout);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function startTypewriter(lang) {
    if (typewriterActive) return;
    typewriterActive = true;

    const titleSpan = document.querySelector('.hero__title .typewriter');
    const subtitleEl = document.querySelector('.hero__subtitle');

    const titleText = content[lang].hero.title;
    const subtitleText = content[lang].hero.subtitle;

    // First type the title
    typewrite(titleSpan, titleText, 70, () => {
      // Then type the subtitle after a pause
      const pauseTimeout = setTimeout(() => {
        typewrite(subtitleEl, subtitleText, 50, () => {
          typewriterActive = false;
        });
      }, 300);
      typewriterTimeouts.push(pauseTimeout);
    });
  }

  // --- Theme Toggle ---
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function getCurrentTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return getSystemTheme();
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      document.documentElement.dataset.theme = 'light';
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  // Initialize theme
  applyTheme(getCurrentTheme());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // --- Language Switching ---
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  function changeLanguage(lang, animate = false) {
    if (!content[lang]) return;

    // Clear typewriter if running
    clearTypewriter();

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const text = getNestedValue(content[lang], key);

      if (text !== undefined) {
        // Skip typewriter elements if animating
        if (animate && el.classList.contains('typewriter')) return;
        if (animate && el.classList.contains('hero__subtitle')) return;

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update active button state
    languageButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    const activeBtn = document.getElementById('lang-' + lang);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');
    }

    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Start typewriter if animating
    if (animate) {
      startTypewriter(lang);
    }
  }

  // Initialize language
  const storedLang = localStorage.getItem('language');
  const initialLang = storedLang && content[storedLang] ? storedLang : 'en';

  // Set initial content without animation
  changeLanguage(initialLang, false);

  // Start typewriter after a brief delay
  setTimeout(() => {
    startTypewriter(initialLang);
  }, 500);

  // Language button listeners
  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.replace('lang-', '');
      changeLanguage(lang, true);
    });
  });

  // --- Scroll Reveal Animation ---
  function setupScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  setupScrollReveal();

  // --- Footer Year ---
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
