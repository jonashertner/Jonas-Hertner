/* ========================================
   JONAS HERTNER — Interactive Navigation
   Fast Typewriter · Section Switching
   ======================================== */

(function() {
  'use strict';

  // === DOM ELEMENTS ===
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');
  const cursor = document.querySelector('.col-content .cursor');

  // === STATE ===
  let currentSection = 'about';
  let isTyping = false;
  let typewriterTimeout = null;

  // === TYPEWRITER CONFIG ===
  const TYPING_SPEED = 8;  // ms per character (very fast!)
  const INITIAL_DELAY = 50;

  // === NAVIGATION ===
  function switchSection(sectionId) {
    if (sectionId === currentSection) return;

    // Clear any ongoing typewriter
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
    isTyping = false;

    // Update nav active state
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });

    // Switch sections
    sections.forEach(section => {
      const isActive = section.id === sectionId;
      section.classList.toggle('active', isActive);

      if (isActive) {
        // Reset and start typewriter for new section
        const textEl = section.querySelector('.typewriter');
        if (textEl) {
          startTypewriter(textEl);
        }
      }
    });

    currentSection = sectionId;
  }

  // === TYPEWRITER EFFECT ===
  function startTypewriter(element) {
    const fullText = element.dataset.fullText || element.textContent;

    // Store original text if not already stored
    if (!element.dataset.fullText) {
      element.dataset.fullText = fullText;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = fullText;
      return;
    }

    // Clear and prepare
    element.textContent = '';
    isTyping = true;

    // Move cursor to element
    if (cursor) {
      element.appendChild(cursor);
      cursor.style.display = 'inline-block';
    }

    let index = 0;

    function typeChar() {
      if (index < fullText.length) {
        // Insert character before cursor
        const textNode = document.createTextNode(fullText[index]);
        if (cursor && cursor.parentNode === element) {
          element.insertBefore(textNode, cursor);
        } else {
          element.appendChild(textNode);
        }
        index++;
        typewriterTimeout = setTimeout(typeChar, TYPING_SPEED);
      } else {
        isTyping = false;
        typewriterTimeout = null;
      }
    }

    // Start after small delay
    typewriterTimeout = setTimeout(typeChar, INITIAL_DELAY);
  }

  // === EVENT LISTENERS ===
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchSection(item.dataset.section);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const navArray = Array.from(navItems);
    const currentIndex = navArray.findIndex(item => item.dataset.section === currentSection);

    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % navArray.length;
      switchSection(navArray[nextIndex].dataset.section);
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + navArray.length) % navArray.length;
      switchSection(navArray[prevIndex].dataset.section);
    } else if (e.key >= '1' && e.key <= '9') {
      const idx = parseInt(e.key) - 1;
      if (idx < navArray.length) {
        e.preventDefault();
        switchSection(navArray[idx].dataset.section);
      }
    }
  });

  // === TRANSLATIONS ===
  const translations = {
    en: {
      'about.heading': 'Jonas Hertner',
      'about.content': 'Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests.',
      'services.service1.title': 'Litigation and Mediation',
      'services.service1.description': 'Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest.',
      'services.service2.title': 'Families, Foundations, and Individuals',
      'services.service2.description': 'Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value assets, due diligence, good governance, and generational transitions.',
      'services.service3.title': 'Criminal Law',
      'services.service3.description': 'Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights.',
      'services.service4.title': 'Constitutional Law, Civil Rights and Impact Litigation',
      'services.service4.description': 'Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies.',
      'services.service5.title': 'Artificial Intelligence and Large Language Models',
      'services.service5.description': 'Experienced in the application of AI tools and LLMs in governance and education, Jonas regularly advises on emerging legal issues in this area, including related to technical limitations, privacy and data security, intellectual property rights, and ethical and psychological considerations as well as on their use in corporate governance and decision-making.',
      'services.service6.title': 'Philosophy',
      'services.service6.description': '«At the heart of my practice is an unwavering dedication to my clients\' long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»',
      'bio.heading': 'Biography',
      'bio.content': 'Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children\'s education, ecology, and the arts.',
      'contact.heading': 'Contact'
    },
    de: {
      'about.heading': 'Jonas Hertner',
      'about.content': 'Jonas Hertner ist ein unabhängiger Anwalt mit Sitz in Zürich und Basel. Er verfügt über mehr als ein Jahrzehnt Erfahrung in der Begleitung von Schweizer und internationalen Mandanten durch komplexe Rechtsstreitigkeiten, oft über mehrere Jurisdiktionen hinweg. Er berät Privatpersonen, Familien, Stiftungen und Unternehmen bei der Bewältigung komplexer Situationen auf dem Weg zu ihren Zielen. Für seine Mandanten ist er ein vertrauenswürdiger Berater und beharrlicher Anwalt, der sich mit Exzellenz für den Schutz und die Förderung ihrer langfristigen Interessen einsetzt.',
      'services.service1.title': 'Prozessführung und Mediation',
      'services.service1.description': 'Nicht jeder Rechtsstreit sollte vor Gericht ausgetragen werden. Oft können die Parteien eine vernünftige aussergerichtliche Einigung erzielen. Um in einem Rechtsstreit ein günstiges Ergebnis zu erzielen – sei es vor Gericht, aussergerichtlich oder durch Mediation – ist es wichtig, mögliche Konsequenzen jedes Schrittes so früh wie möglich zu antizipieren. Mit mehr als einem Jahrzehnt Erfahrung in der Prozessführung auf höchstem Niveau hilft Ihnen Jonas, nicht nur Ihre eigene Perspektive zu berücksichtigen, sondern auch die der Gegenseite und jedes Schiedsrichters, der letztlich über den Streit entscheiden könnte.',
      'services.service2.title': 'Familien, Stiftungen und Privatpersonen',
      'services.service2.description': 'Jonas verfügt über umfangreiche Erfahrung in der Beratung von in der Schweiz ansässigen und internationalen Familien und Privatkunden auf höchstem Niveau in komplexen Rechtssituationen – darunter Aktionärsstreitigkeiten, bedeutende Finanzprozesse, Untersuchungen von Straftaten sowie nicht-streitige Situationen wie der Aufbau von Geschäftsvorhaben, Erwerb hochwertiger Vermögenswerte, Due Diligence, Good Governance und Generationenübergänge.',
      'services.service3.title': 'Strafrecht',
      'services.service3.description': 'Jonas verfügt über umfangreiche Erfahrung in der Führung von Strafverfahren durch alle Instanzen, insbesondere in den Bereichen Unternehmensstrafrecht, Wirtschaftskriminalität und Bürgerrechte.',
      'services.service4.title': 'Verfassungsrecht, Bürgerrechte und Impact Litigation',
      'services.service4.description': 'Jonas arbeitet mit Parteien in der Schweiz und international zusammen, um Prozesse zum Schutz von Grundrechten und Freiheiten zu führen, insbesondere in den Bereichen Ökologie und neue Technologien.',
      'services.service5.title': 'Künstliche Intelligenz und grosse Sprachmodelle',
      'services.service5.description': 'Mit Erfahrung in der Anwendung von KI-Tools und LLMs in Governance und Bildung berät Jonas regelmässig zu aufkommenden Rechtsfragen in diesem Bereich, einschliesslich technischer Einschränkungen, Datenschutz und Datensicherheit, geistiges Eigentum sowie ethischer und psychologischer Überlegungen.',
      'services.service6.title': 'Philosophie',
      'services.service6.description': '«Im Zentrum meiner Praxis steht ein unerschütterliches Engagement für die langfristigen Interessen meiner Mandanten, geprägt von meiner umfassenden Erfahrung auf höchstem Niveau des Berufsstands. Ich hinterfrage Annahmen und betrachte jeden Blickwinkel, um den effektivsten Ansatz zu identifizieren und eine komplexe Vielfalt von Faktoren in umsetzbare Ratschläge zu destillieren. Geleitet von Neugier, Exzellenz, Empathie und dem Streben nach fairen und gerechten Ergebnissen bleibe ich auf das Wesentliche fokussiert.»',
      'bio.heading': 'Biografie',
      'bio.content': 'Jonas Hertner schloss sein Studium mit Auszeichnung an den Universitäten Luzern und Genf ab. Seine Karriere umfasste Positionen bei Non-Profit-Organisationen, bei der Direktion für Völkerrecht des Eidgenössischen Departements für auswärtige Angelegenheiten und am Appellationsgericht Basel-Stadt. Später half er beim Aufbau des Schweizer Büros der Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan. Neben seiner anwaltlichen Tätigkeit engagiert sich Jonas in Projekten für Kinderbildung, Ökologie und Kunst.',
      'contact.heading': 'Kontakt'
    },
    fr: {
      'about.heading': 'Jonas Hertner',
      'about.content': 'Jonas Hertner est un avocat indépendant basé à Zurich et Bâle, avec plus d\'une décennie d\'expérience dans l\'accompagnement de clients suisses et internationaux à travers des litiges juridiques complexes, souvent dans plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises dans la navigation de situations complexes alors qu\'ils travaillent à atteindre leurs objectifs. Pour ses clients, il est un conseiller de confiance et un défenseur inébranlable, engagé dans l\'excellence pour protéger et faire avancer leurs intérêts à long terme.',
      'services.service1.title': 'Contentieux et médiation',
      'services.service1.description': 'Tous les litiges ne méritent pas d\'être portés devant les tribunaux. Souvent, les parties peuvent trouver un règlement raisonnable à l\'amiable. Pour obtenir un résultat favorable, que ce soit devant les tribunaux, à l\'amiable ou par la médiation, il est important d\'anticiper les conséquences possibles de chaque étape dès qu\'un litige se profile. Avec plus d\'une décennie d\'expérience en contentieux au plus haut niveau, Jonas vous aidera à considérer non seulement votre propre perspective, mais aussi celle de la partie adverse et de tout arbitre qui pourrait finalement trancher le litige.',
      'services.service2.title': 'Familles, fondations et particuliers',
      'services.service2.description': 'Jonas possède une vaste expérience dans le conseil aux familles et clients particuliers basés en Suisse et à l\'international au plus haut niveau sur des situations juridiques complexes – y compris les litiges entre actionnaires, les contentieux financiers importants, les enquêtes sur des actes criminels ainsi que des situations non contentieuses telles que l\'aide à la construction d\'entreprises, l\'acquisition d\'actifs de grande valeur, la due diligence, la bonne gouvernance et les transitions générationnelles.',
      'services.service3.title': 'Droit pénal',
      'services.service3.description': 'Jonas possède une vaste expérience dans la conduite de procédures pénales à travers toutes les instances, en particulier dans les domaines de la responsabilité pénale des entreprises, de la criminalité en col blanc et des droits civils.',
      'services.service4.title': 'Droit constitutionnel, droits civils et contentieux d\'impact',
      'services.service4.description': 'Jonas collabore avec des parties en Suisse et à l\'international pour mener des contentieux visant à protéger les droits et libertés fondamentaux, notamment dans les domaines de l\'écologie et des nouvelles technologies.',
      'services.service5.title': 'Intelligence artificielle et grands modèles de langage',
      'services.service5.description': 'Expérimenté dans l\'application des outils d\'IA et des LLM en gouvernance et éducation, Jonas conseille régulièrement sur les questions juridiques émergentes dans ce domaine, y compris les limitations techniques, la confidentialité et la sécurité des données, les droits de propriété intellectuelle et les considérations éthiques et psychologiques.',
      'services.service6.title': 'Philosophie',
      'services.service6.description': '«Au cœur de ma pratique se trouve un dévouement inébranlable aux intérêts à long terme de mes clients, éclairé par ma vaste expérience au plus haut niveau de la profession. Je remets en question les hypothèses et considère chaque angle pour identifier l\'approche la plus efficace, distillant un ensemble complexe de facteurs en conseils actionnables. Guidé par la curiosité, l\'excellence, l\'empathie et la poursuite de résultats justes et équitables, je reste concentré sur ce qui compte vraiment.»',
      'bio.heading': 'Biographie',
      'bio.content': 'Jonas Hertner a obtenu son diplôme avec mention des Universités de Lucerne et Genève. Sa carrière a inclus des rôles dans des organisations à but non lucratif, à la Direction du droit international public du Département fédéral des affaires étrangères et à la Cour d\'appel de Bâle-Ville. Plus tard, il a aidé à établir le bureau suisse du cabinet d\'avocats Quinn Emanuel Urquhart & Sullivan. En plus de sa pratique juridique, Jonas s\'engage dans des projets impliquant l\'éducation des enfants, l\'écologie et les arts.',
      'contact.heading': 'Contact'
    }
  };

  // === LANGUAGE SWITCHING ===
  const langButtons = document.querySelectorAll('.lang');

  function setLanguage(lang) {
    const trans = translations[lang];
    if (!trans) return;

    // Update all translatable elements
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.dataset.key;
      if (trans[key]) {
        if (el.classList.contains('typewriter')) {
          el.dataset.fullText = trans[key];
          // If this is the active section, restart typewriter
          const section = el.closest('.content-section');
          if (section && section.classList.contains('active')) {
            startTypewriter(el);
          }
        } else {
          el.textContent = trans[key];
        }
      }
    });

    // Update active state
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Store preference
    localStorage.setItem('lang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // === INITIALIZATION ===
  function init() {
    // Load saved language
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // Start typewriter on initial section
    const initialSection = document.querySelector('.content-section.active .typewriter');
    if (initialSection) {
      // Small delay to ensure DOM is ready
      setTimeout(() => startTypewriter(initialSection), 100);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
