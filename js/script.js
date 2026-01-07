document.addEventListener('DOMContentLoaded', () => {
  // --- DOM refs ---
  const languageButtons = document.querySelectorAll('.lang-btn[id^="lang-"]');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('.section');
  const languageSwitcher = document.querySelector('.language-switcher');
  const mainContent = document.getElementById('main-content');
  const heroHeading = document.getElementById('home-heading');
  const heroSubtitle = document.querySelector('[data-key="hero.subtitle"]');
  const backToTopBtn = document.getElementById('back-to-top');
  const lastSection = document.getElementById('jh');

  // --- Lazy load background images ---
  const lazyBgSections = document.querySelectorAll('#services1, #services3, #services5, #bio, #jh');
  if ('IntersectionObserver' in window && lazyBgSections.length) {
    const bgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bg-loaded');
            bgObserver.unobserve(entry.target);
          }
        });
      },
      { root: mainContent, rootMargin: '200px 0px', threshold: 0 }
    );
    lazyBgSections.forEach((section) => bgObserver.observe(section));
  } else {
    // Fallback: load all backgrounds immediately
    lazyBgSections.forEach((section) => section.classList.add('bg-loaded'));
  }

  // --- Translations (fixed FR bio stray </a>) ---
  const content = {
    en: {
      hero: { title: "Jonas Hertner", subtitle: "ATTORNEY" },
      snow: { on: "Let it snow", off: "Stop snow" },
      about: {
        heading: "Jonas Hertner",
        content:
          "Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests."
      },
      services: {
        service1: {
          title: "Litigation and mediation",
          description:
            "Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest."
        },
        service2: {
          title: "Families, foundations, and individuals",
          description:
            "Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value assets, due diligence, good governance, and generational transitions."
        },
        service3: {
          title: "Criminal law",
          description:
            "Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights."
        },
        service4: {
          title: "Constitutional law, civil rights and impact litigation",
          description:
            "Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies."
        },
        service5: {
          title: "Artificial intelligence",
          description:
            "Experienced in the application of AI tools across various modalities—including large language models, multimodal systems, and agentic AI—Jonas regularly advises on emerging legal issues in this rapidly evolving field. His practice covers technical capabilities and limitations, privacy and data security, intellectual property rights, liability frameworks, and ethical considerations, as well as the strategic use of AI in corporate governance and decision-making."
        },
        service6: {
          title: "Philosophy",
          description:
            "«At the heart of my practice is an unwavering dedication to my clients’ long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»"
        }
      },
      bio: {
        heading: "Biography",
        content:
          "Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children’s education, ecology, and the arts."
      },
      contact: {
        heading: "Contact",
        addressLabel1: "",
        addressPlaceholder1: "Asylstrasse 41, 8032 Zurich",
        addressLabel2: "",
        addressPlaceholder2: "PO Box, 4001 Basel", // Use 4001 to match DE/FR; change here if 4010 is correct
        emailLabel: "",
        emailPlaceholder: "jh@jonashertner.com"
      }
    },
    de: {
      nav: { home: "Home", about: "Über", services: "Dienstleistungen", contact: "Kontakt" },
      hero: { title: "Jonas Hertner", subtitle: "ADVOKAT" },
      snow: { on: "Lass es schneien", off: "Schnee aus" },
      about: {
        heading: "Jonas Hertner",
        content:
          "Jonas Hertner ist unabhängiger Rechtsanwalt in Zürich und Basel mit über einem Jahrzehnt Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der grössten Rechtsstreitigkeiten in der Schweiz. Er berät Privatpersonen, Familien, Stiftungen und Unternehmen und unterstützt sie dabei, in anspruchsvollen Situationen ihre Ziele zu verwirklichen. Seine Mandanten schätzen ihn als verlässlichen Berater und entschlossenen Anwalt, der ihre langfristigen Interessen mit höchstem Anspruch schützt und fördert."
      },
      services: {
        heading: "Expertise",
        service1: {
          title: "Rechtsstreitigkeiten und Mediation",
          description:
            "Nicht jeder Streit muss vor Gericht gebracht werden. Oft gelangen die Parteien einvernehmlich oder durch Mediation zu einer vernünftigen Einigung. Um in einem Rechtsstreit ein gutes Ergebnis zu erzielen, sind die möglichen Folgen eines jeden Schrittes früh zu antizipieren, wenn sich ein Streit abzeichnet. Jonas verfügt über ein Jahrzehnt an Erfahrung in Rechtsstreitigkeiten auf höchster Ebene und hilft Ihnen, die eigene Perspektive und die Perspektiven der gegnerischen Seite und eines eventuellen Gerichts, das über den Streit entscheidet, zu durchdenken, um bei jedem Schritt die effektivste Massnahme ergreifen zu können."
        },
        service2: {
          title: "Familien, Stiftungen und Einzelpersonen",
          description:
            "Jonas verfügt über umfassende Erfahrung in der Beratung von Familien und Privatpersonen in der Schweiz und international auf höchstem Niveau. Er begleitet sie in komplexen rechtlichen Angelegenheiten, insbesondere bei gesellschaftsrechtlichen Streitigkeiten und Aktionärskonflikten, Finanzstreitigkeiten und strafrechtlichen Untersuchungen. Zudem berät er bei Themen wie Gründungen, dem Erwerb hochwertiger Vermögenswerte, Due-Diligence-Prüfungen, der Einführung wirksamer Corporate-Governance-Strukturen und bei Generationenwechseln."
        },
        service3: {
          title: "Strafrecht",
          description:
            "Jonas hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte."
        },
        service4: {
          title: "Verfassungsrecht, Grundrechte und strategische Prozessführung",
          description:
            "Jonas arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie (Schutz von Lebensräumen) und neue Technologien."
        },
        service5: {
          title: "Künstliche Intelligenz",
          description:
            "Mit Erfahrung im Einsatz von KI-Werkzeugen verschiedener Modalitäten—darunter grosse Sprachmodelle, multimodale Systeme und agentische KI—berät Jonas regelmässig zu aufkommenden Rechtsfragen in diesem sich rasch entwickelnden Bereich. Seine Praxis umfasst technische Möglichkeiten und Grenzen, Datenschutz und Datensicherheit, Rechte des geistigen Eigentums, Haftungsfragen und ethische Überlegungen sowie den strategischen Einsatz von KI in der Unternehmensführung und Entscheidungsfindung."
        },
        service6: {
          title: "Philosophie",
          description:
            "«Im Mittelpunkt meiner Tätigkeit steht das unerschütterliche Engagement für die langfristigen Interessen meiner Mandanten, geprägt von fundierter Erfahrung auf höchster Ebene der anwaltlichen Beratung. Geleitet von Neugier, Empathie, höchstem Anspruch an Qualität und Integrität sowie dem Streben nach fairen und gerechten Ergebnissen fokussiere ich mich auf das, was wirklich zählt. So begleite ich meine Mandanten durch anspruchsvolle Situationen, schütze ihre Rechte und unterstütze sie dabei, ihre Ziele zu verwirklichen.»"
        }
      },
      bio: {
        heading: "Biographie",
        content:
          "Jonas Hertner schloss sein Studium der Rechtswissenschaften an den Universitäten Luzern und Genf mit Auszeichnung ab. Sein beruflicher Weg führte ihn zu gemeinnützigen Organisationen, zur Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten und an das Appellationsgericht Basel-Stadt. Später war er massgeblich am Aufbau des Schweizer Büros der internationalen Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan beteiligt. Neben seiner anwaltlichen Tätigkeit engagiert sich Jonas Hertner in den Bereichen Bildung, Ökologie und Kunst."
      },
      contact: {
        heading: "Kontakt",
        addressLabel1: "",
        addressPlaceholder1: "Asylstrasse 41, 8032 Zürich",
        addressLabel2: "",
        addressPlaceholder2: "Postfach, 4001 Basel",
        emailLabel: "",
        emailPlaceholder: "jh@jonashertner.com"
      }
    },
    fr: {
      nav: { home: "Accueil", about: "À propos", services: "Services", contact: "Contact" },
      hero: { title: "Jonas Hertner", subtitle: "AVOCAT" },
      snow: { on: "Qu’il neige", off: "Arrêter la neige" },
      about: {
        heading: "Jonas Hertner",
        content:
          "Jonas Hertner est avocat indépendant établi à Zurich et à Bâle. Fort de plus de dix ans d’expérience, il accompagne une clientèle suisse et internationale dans des litiges complexes à forts enjeux, souvent portés devant plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises confrontés à des situations délicates, les aidant à atteindre leurs objectifs stratégiques. Ses clients trouvent en lui un conseiller de confiance et un défenseur déterminé, engagé à protéger et à promouvoir leurs intérêts avec rigueur et excellence sur le long terme."
      },
      services: {
        heading: "Expertise",
        service1: {
          title: "Litiges et médiation",
          description:
            "Tous les litiges ne doivent pas nécessairement finir devant les tribunaux. Une solution avantageuse peut souvent être trouvée à l’amiable ou par médiation. Afin d'obtenir le meilleur résultat, que ce soit en justice ou en dehors, il est essentiel d’anticiper les conséquences de chaque décision dès les premiers signes d’un différend. Avec plus de dix ans d’expérience dans les litiges complexes, Jonas vous aide à évaluer votre position ainsi que celles de la partie adverse et de tout juge ou arbitre susceptible de trancher l’affaire, afin de vous permettre, à chaque étape, de prendre la mesure la plus efficace pour défendre vos intérêts."
        },
        service2: {
          title: "Familles, fondations et particuliers",
          description:
            "Jonas possède une vaste expérience du conseil au plus haut niveau auprès de familles et de particuliers établis en Suisse et à l’international, dans des situations juridiques complexes, notamment dans le cadre de litiges entre actionnaires à fort enjeu, de contentieux financiers importants et d’enquêtes sur des infractions pénales, ainsi que dans des contextes non litigieux tels que la création d’entreprises, l’acquisition d’actifs de grande valeur, les procédures de due diligence, la mise en place de bonnes pratiques de gouvernance et les transitions générationnelles."
        },
        service3: {
          title: "Droit pénal",
          description:
            "Jonas possède une expérience approfondie dans la conduite de procédures pénales à tous les niveaux judiciaires, en particulier dans les domaines de la responsabilité pénale des entreprises, de la criminalité économique et financière, ainsi que de la protection des droits fondamentaux."
        },
        service4: {
          title: "Droit constitutionnel, droits civils et litiges stratégiques",
          description:
            "Jonas collabore avec des acteurs en Suisse et à l’international afin de mener des procédures judiciaires visant à protéger les droits et libertés fondamentaux, en particulier dans les domaines de la protection de l’environnement (préservation des habitats) et des nouvelles technologies."
        },
        service5: {
          title: "Intelligence artificielle",
          description:
            "Fort d'une expérience dans l'application d'outils d'IA de diverses modalités—notamment les grands modèles de langage, les systèmes multimodaux et l'IA agentique—Jonas conseille régulièrement sur les questions juridiques émergentes dans ce domaine en rapide évolution. Sa pratique couvre les capacités et limitations techniques, la confidentialité et la sécurité des données, les droits de propriété intellectuelle, les cadres de responsabilité et les considérations éthiques, ainsi que l'utilisation stratégique de l'IA dans la gouvernance d'entreprise et la prise de décision."
        },
        service6: {
          title: "Philosophie",
          description:
            "« Au cœur de ma pratique se trouve un engagement indéfectible envers les intérêts à long terme de mes clients, fort d’une expérience approfondie au plus haut niveau de la profession. Je questionne les idées reçues et examine chaque perspective afin d’élaborer l’approche la plus pertinente, en transformant une situation complexe en conseils précis et efficaces. Animé par la curiosité, l’excellence, l’empathie et la recherche de solutions justes et équitables, je me concentre sur l’essentiel. Ainsi, j’accompagne mes clients face à la complexité, protège leurs droits et favorise la réalisation de leurs objectifs. »"
        }
      },
      bio: {
        heading: "Biographie",
        content:
          "Jonas Hertner est titulaire d’un diplôme en droit obtenu avec mention aux universités de Lucerne et de Genève. Son parcours professionnel l’a mené auprès d’organisations à but non lucratif, à la Direction du droit international du Département fédéral des affaires étrangères ainsi qu’à la Cour d’appel de Bâle-Ville. Il a par la suite contribué à l’établissement du bureau suisse du cabinet international Quinn Emanuel Urquhart & Sullivan. En parallèle à sa pratique juridique, Jonas s’investit dans des projets consacrés à l’éducation des enfants, à l’écologie et aux arts."
      },
      contact: {
        heading: "Contact",
        addressLabel1: "",
        addressPlaceholder1: "Asylstrasse 41, 8032 Zurich",
        addressLabel2: "",
        addressPlaceholder2: "Case postale, 4001 Bâle",
        emailLabel: "",
        emailPlaceholder: "jh@jonashertner.com"
      }
    }
  };

  // --- helpers/state for typewriter ---
  let nameInterval = null;
  let titleInterval = null;
  let startSubtitleTimeout = null;
  let cursorSpan = null;
  let hasTyped = false;

  function updateAriaLabel(lang) {
    if (!heroHeading) return;
    const t = content[lang].hero.title;
    const s = content[lang].hero.subtitle;
    heroHeading.setAttribute('aria-label', `${t}, ${s}`);
  }

  function clearTyping() {
    if (nameInterval) clearInterval(nameInterval);
    if (titleInterval) clearInterval(titleInterval);
    if (startSubtitleTimeout) clearTimeout(startSubtitleTimeout);
    if (cursorSpan && cursorSpan.parentNode) cursorSpan.parentNode.removeChild(cursorSpan);
    if (heroSubtitle) heroSubtitle.style.visibility = 'visible';
  }

  function startTypewriter(lang) {
    if (!heroHeading || !heroSubtitle) return;
    if (hasTyped) return; // run once
    hasTyped = true;

    const nameText = `${content[lang].hero.title},`;
    const titleText = content[lang].hero.subtitle;

    updateAriaLabel(lang);

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      heroHeading.textContent = content[lang].hero.title;
      heroSubtitle.textContent = titleText;
      return;
    }

    // Prepare
    heroHeading.textContent = '';
    heroSubtitle.style.visibility = 'hidden';

    // Name line + cursor
    const nameNode = document.createTextNode('');
    cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '|';
    cursorSpan.setAttribute('aria-hidden', 'true');

    heroHeading.appendChild(nameNode);
    heroHeading.appendChild(cursorSpan);

    let nameIndex = 0;
    nameInterval = setInterval(() => {
      if (nameIndex < nameText.length) {
        nameNode.data += nameText.charAt(nameIndex++);
      } else {
        clearInterval(nameInterval);

        startSubtitleTimeout = setTimeout(() => {
          // move cursor to subtitle
          if (cursorSpan.parentNode === heroHeading) heroHeading.removeChild(cursorSpan);
          heroSubtitle.style.visibility = 'visible';
          heroSubtitle.textContent = '';

          const titleNode = document.createTextNode('');
          heroSubtitle.appendChild(titleNode);
          heroSubtitle.appendChild(cursorSpan);

          let titleIndex = 0;
          titleInterval = setInterval(() => {
            if (titleIndex < titleText.length) {
              titleNode.data += titleText.charAt(titleIndex++);
            } else {
              clearInterval(titleInterval);
              // leave blinking cursor at end
            }
          }, 100);
        }, 300);
      }
    }, 100);
  }

  // --- i18n + UI ---
  function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const keys = key.split('.');
      let text = content[lang];
      keys.forEach(k => { text = text && text[k] !== undefined ? text[k] : ''; });

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'IMG') {
        el.alt = text;
      } else {
        el.getAttribute('data-html') === 'true' ? (el.innerHTML = text) : (el.textContent = text);
      }
    });

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
    updateAriaLabel(lang);
  }

  function adjustNavbarStyle(currentSection = 'home') {
    if (!navbar || !languageSwitcher) return;
    if (['home', 'jh', 'services1', 'services3', 'services5', 'bio'].includes(currentSection)) {
      navbar.classList.remove('dark');
      languageSwitcher.style.color = 'white';
    } else {
      navbar.classList.add('dark');
      languageSwitcher.style.color = '';
    }
  }

  function onScroll() {
    let closestSection = null;
    let minDistance = Infinity;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });
    if (closestSection) adjustNavbarStyle(closestSection.id);
  }

  // language switch clicks (also stop typing if user switches mid-animation)
  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.split('-')[1];
      clearTyping();
      changeLanguage(lang);
      // Do not restart typewriter on language change; requirement is "once on load"
    });
  });

  // --- init ---
  const rawStoredLang = localStorage.getItem('language');
  const storedLang = content[rawStoredLang] ? rawStoredLang : 'en';
  changeLanguage(storedLang);       // set all text for chosen language first
  adjustNavbarStyle('home');
  if (mainContent) {
    mainContent.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Finally start the one-time typewriter for landing title
  startTypewriter(storedLang);

  // Back-to-top (works with scroll container #main-content)
  if (backToTopBtn && mainContent) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        mainContent.scrollTop = 0;
      }
    });
  }

  // Only show the button when the last section is in view (prevents it floating everywhere).
  if (backToTopBtn && mainContent && lastSection) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          const on = !!e && (e.isIntersecting || e.intersectionRatio > 0.4);
          backToTopBtn.classList.toggle('is-visible', on);
        },
        { root: mainContent, threshold: [0, 0.25, 0.4, 0.6] }
      );
      io.observe(lastSection);
    } else {
      // Fallback: keep it visible.
      backToTopBtn.classList.add('is-visible');
    }
  }
});
