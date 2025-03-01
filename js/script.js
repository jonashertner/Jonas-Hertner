// script.js

document.addEventListener('DOMContentLoaded', () => {
  const password = prompt("Please enter the password:");
  if (password !== "ff") {
    document.body.innerHTML = "<h1>Don't panic.</h1>";
    return;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Select essential DOM elements
  const languageButtons = document.querySelectorAll('.lang-btn');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('.section');
  const languageSwitcher = document.querySelector('.language-switcher');
  const mainContent = document.getElementById('main-content'); // scrolling container

  // Content Object (English, German, and French translations)
  const content = {
    "en": {
      "hero": { "title": "Jonas Hertner", "subtitle": "ATTORNEY" },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests."
      },
      "services": {
        "service1": {
          "title": "Advocacy and litigation",
          "description": "Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest."
        },
        "service2": {
          "title": "Families, foundations, and individuals",
          "description": "Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value assets, due diligence, and good governance advice."
        },
        "service3": {
          "title": "Criminal law",
          "description": "Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights."
        },
        "service4": {
          "title": "Constitutional law, civil rights and impact litigation",
          "description": "Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies."
        },
        "service5": {
          "title": "Artificial intelligence and large language models",
          "description": "Experienced in the application of AI tools and LLMs in governance and education, Jonas regularly advises on emerging legal issues in this area, including on corporate governance and good decision-making practices, data protection and regulatory compliance, intellectual property rights, and ethical considerations."
        },
        "service6": {
          "title": "Philosophy",
          "description": "«At the heart of my practice is an unwavering dedication to my clients’ long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»"
        }
      },
      "bio": {
        "heading": "Biography",
        "content": "Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children’s education, ecology, and the arts. <br><br><a href='notes.html'>Published notes <i>here</i></a>"
      },
      "contact": {
        "heading": "Contact",
        "addressLabel1": "",
        "addressPlaceholder1": "Asylstrasse 41, 8032 Zurich",
        "addressLabel2": "",
        "addressPlaceholder2": "PO Box, 4010 Basel",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    },
    "de": {
      "nav": { "home": "Home", "about": "Über", "services": "Dienstleistungen", "contact": "Kontakt" },
      "hero": { "title": "Jonas Hertner", "subtitle": "ADVOKAT" },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner ist ein unabhängiger Anwalt in Zürich und Basel mit über einem Jahrzehnt Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der wichtigsten Rechtsstreitigkeiten in der Schweiz. Jonas berät Privatpersonen, Familien, Stiftungen und Unternehmen auf dem Weg zur Erreichung ihrer Ziele. Für seine Mandanten ist Jonas ein verlässlicher Berater und unerschütterlicher Advokat, der sich mit dem Anspruch an höchste Qualität für die langfristigen Interessen seiner Mandanten einsetzt."
      },
      "services": {
        "heading": "Expertise",
        "service1": {
          "title": "Rechtsstreitigkeiten",
          "description": "Nicht jeder Streit muss vor Gericht gebracht werden. Oft gelangen die Parteien einvernehmlich oder durch Mediation zu einer vernünftigen Einigung. Um in einem Rechtsstreit ein gutes Ergebnis zu erzielen, sind die möglichen Folgen eines jeden Schrittes früh zu antizipieren, wenn sich ein Streit abzeichnet. Jonas verfügt über ein Jahrzehnt an Erfahrung in Rechtsstreitigkeiten auf höchster Ebene und hilft Ihnen, die eigene Perspektive und die Perspektiven der gegnerischen Seite und eines eventuellen Gerichts, das über den Streit entscheidet, zu durchdenken, um bei jedem Schritt die effektivste Massnahme ergreifen zu können."
        },
        "service2": {
          "title": "Familien, Stiftungen und Einzelpersonen",
          "description": "Jonas verfügt über umfassende Erfahrung in der Beratung von Familien und Privatpersonen in der Schweiz und international auf höchstem Niveau. Er begleitet sie in komplexen rechtlichen Angelegenheiten, insbesondere bei gesellschaftsrechtlichen Streitigkeiten und Aktionärsdisputen, Finanzstreitigkeiten und strafrechtlichen Untersuchungen. Zudem berät er bei Themen wie Gründungen, dem Erwerb hochwertiger Vermögenswerte, Due-Diligence-Prüfungen sowie der Einführung wirksamer Corporate-Governance-Strukturen."
        },
        "service3": {
          "title": "Strafrecht",
          "description": "Jonas hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte."
        },
        "service4": {
          "title": "Verfassungsrecht, Grundrechte und strategische Prozessführung",
          "description": "Jonas arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie (Schutz von Lebensräumen) und neue Technologien."
        },
        "service5": {
          "title": "Künstliche Intelligenz und Large Language Models",
          "description": "Mit seiner Erfahrung im Einsatz von KI-Tools und großen Sprachmodellen (LLMs) in den Bereichen Governance und Bildung berät Jonas regelmäßig zu neuartigen rechtlichen Fragestellungen in diesem Gebiet. Schwerpunkte seiner Beratung bilden gute Unternehmensführung und Entscheidungsprozesse, die Nutzung hochwertiger Trainingsdaten, Datenschutz und regulatorische Anforderungen, der Schutz geistigen Eigentums sowie ethische Aspekte."
        },
        "service6": {
          "title": "Philosophie",
          "description": "«Im Mittelpunkt meiner Tätigkeit steht das unerschütterliche Engagement für die langfristigen Interessen meiner Mandanten, geprägt von fundierter Erfahrung auf höchster Ebene der anwaltlichen Beratung. Ich hinterfrage vermeintliche Gewissheiten und betrachte jede Fragestellung aus unterschiedlichen Perspektiven, um aus komplexen Situationen praktikable und wirkungsvolle Lösungen abzuleiten. Geleitet von Neugier, Empathie, höchstem Anspruch an Qualität und Integrität sowie dem Streben nach fairen und gerechten Ergebnissen fokussiere ich mich auf das, was wirklich zählt. So begleite ich meine Mandanten durch anspruchsvolle Situationen, schütze ihre Rechte und unterstütze sie dabei, ihre Ziele zu verwirklichen.»"
        }
      },
      "bio": {
        "heading": "Biographie",
        "content": "  Jonas Hertner schloss sein Studium der Rechtswissenschaften an den Universitäten Luzern und Genf mit Auszeichnung ab. Sein beruflicher Weg führte ihn zu gemeinnützigen Organisationen, zur Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten und an das Appellationsgericht Basel-Stadt. Später war er maßgeblich am Aufbau des Schweizer Büros der internationalen Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan beteiligt. Neben seiner anwaltlichen Tätigkeit engagiert sich Jonas Hertner aktiv in den Bereichen Bildung, Ökologie und Kunst. <br><br><a href='notes.html'>Publizierte Artikel <i>hier</i></a>"
      },
      "contact": {
        "heading": "Kontakt",
        "addressLabel1": "",
        "addressPlaceholder1": "Asylstrasse 41, 8032 Zürich",
        "addressLabel2": "",
        "addressPlaceholder2": "Postfach, 4010 Basel",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    },
    "fr": {
      "nav": { "home": "Accueil", "about": "À propos", "services": "Services", "contact": "Contact" },
      "hero": { "title": "Jonas Hertner", "subtitle": "AVOCAT" },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner est avocat indépendant établi à Zurich et à Bâle. Fort de plus de dix ans d'expérience, il accompagne une clientèle suisse et internationale dans des litiges complexes à fort enjeu, souvent portés devant plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises confrontés à des situations délicates, les aidant à atteindre leurs objectifs stratégiques. Ses clients trouvent en lui un conseiller de confiance et un défenseur déterminé, engagé à protéger et à promouvoir durablement leurs intérêts avec rigueur et excellence."
      },
      "services": {
        "heading": "Expertise",
        "service1": {
          "title": "Litiges",
          "description": "Tous les litiges ne doivent pas nécessairement finir devant les tribunaux. Une solution avantageuse peut souvent être trouvée à l’amiable ou par médiation. Afin d'obtenir le meilleur résultat, que ce soit en justice ou en dehors, il est essentiel d’anticiper les conséquences de chaque décision dès les premiers signes d’un différend. Avec plus de dix ans d’expérience dans les litiges complexes, Jonas vous aide à évaluer votre position ainsi que celles de la partie adverse et des autorités concernées. Vous pourrez ainsi agir avec confiance et efficacité pour protéger au mieux vos intérêts."
        },
        "service2": {
          "title": "Familles, fondations et particuliers",
          "description": "Jonas possède une vaste expérience du conseil au plus haut niveau auprès de familles et de particuliers établis en Suisse et à l’international, dans des situations juridiques complexes, notamment dans le cadre de litiges entre actionnaires à fort enjeu, de contentieux financiers importants et d’enquêtes sur des infractions pénales, ainsi que dans des contextes non litigieux tels que la création d’entreprises, l’acquisition d’actifs de grande valeur, les procédures de due diligence et la mise en place de bonnes pratiques de gouvernance."
        },
        "service3": {
          "title": "Droit pénal",
          "description": "Jonas possède une vaste expérience dans la conduite de procédures pénales à tous les niveaux judiciaires, en particulier dans les domaines de la responsabilité pénale des entreprises, de la criminalité économique et financière, ainsi que de la protection des droits fondamentaux."
        },
        "service4": {
          "title": "Droit constitutionnel, droits civils et litiges stratégiques",
          "description": "Jonas collabore avec des acteurs en Suisse et à l’international afin de mener des procédures judiciaires visant à protéger les droits et libertés fondamentaux, notamment en matière de protection de l’environnement (préservation des habitats) et de nouvelles technologies."
        },
        "service5": {
          "title": "L'intelligence artificielle et des grands modèles de langage",
          "description": "Expérimenté dans l’utilisation des outils d’intelligence artificielle (IA) et des grands modèles de langage (LLM) appliqués à la gouvernance et à l’éducation, Jonas conseille régulièrement ses clients sur les questions juridiques émergentes dans ce secteur, notamment sur les bonnes pratiques de gouvernance et de prise de décision, l’utilisation de données d’entraînement de haute qualité, la protection des données et la conformité réglementaire, les droits de propriété intellectuelle ainsi que les enjeux éthiques."
        },
        "service6": {
          "title": "Philosophie",
          "description": "« Au cœur de ma pratique se trouve un engagement indéfectible envers les intérêts à long terme de mes clients, fort d’une expérience approfondie au plus haut niveau de la profession. Je questionne les idées reçues et examine chaque perspective afin d’élaborer l’approche la plus pertinente, en transformant une situation complexe en conseils précis et efficaces. Animé par la curiosité, l’excellence, l’empathie et la recherche de solutions justes et équitables, je me concentre sur l’essentiel. Ainsi, j’accompagne mes clients face à la complexité, protège leurs droits et favorise la réalisation de leurs objectifs. »"
        }
      },
      "bio": {
        "heading": "Biographie",
        "content": "Jonas Hertner est titulaire d’un diplôme en droit obtenu avec mention aux universités de Lucerne et de Genève. Son parcours professionnel l’a mené auprès d’organisations à but non lucratif, à la Direction du droit international du Département fédéral des affaires étrangères ainsi qu’à la Cour d’appel de Bâle-Ville. Il a par la suite contribué à l’établissement du bureau suisse du cabinet international Quinn Emanuel Urquhart & Sullivan. En parallèle à sa pratique juridique, Jonas s’investit dans des projets consacrés à l’éducation des enfants, à l’écologie et aux arts. <br><br><a href='notes.html'>Notes publiées <i>ici</i></a>"
      },
      "contact": {
        "heading": "Contact",
        "addressLabel1": "",
        "addressPlaceholder1": "Asylstrasse 41, 8032 Zurich",
        "addressLabel2": "",
        "addressPlaceholder2": "Case postale, 4010 Bâle",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    }
  };

  // Determine the active section based on which section's top is closest to the viewport top
  function onScroll() {
    let closestSection = null;
    let minDistance = Infinity;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Use the absolute distance of the top from 0
      const distance = Math.abs(rect.top);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });
    if (closestSection) {
      adjustNavbarStyle(closestSection.id);
    }
  }

  // Function to change language
  function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      const keys = key.split('.');
      let text = content[lang];
      keys.forEach(k => {
        text = text && text[k] !== undefined ? text[k] : '';
      });
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else if (element.tagName === 'IMG') {
        element.alt = text;
      } else {
        element.getAttribute('data-html') === "true" ? element.innerHTML = text : element.textContent = text;
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
  }

  // Function to adjust navbar style based on current section
  function adjustNavbarStyle(currentSection = 'home') {
    if (
      currentSection === 'home' ||
      currentSection === 'jh' ||
      currentSection === 'services1' ||
      currentSection === 'services3' ||
      currentSection === 'services5' ||
      currentSection === 'bio'
    ) {
      navbar.classList.remove('dark');
      languageSwitcher.style.color = 'white';
    } else {
      navbar.classList.add('dark');
      languageSwitcher.style.color = '';
    }
  }

  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.split('-')[1];
      changeLanguage(lang);
    });
  });

  const storedLang = localStorage.getItem('language') || 'en';
  changeLanguage(storedLang);
  adjustNavbarStyle('home');

  // Listen for scroll events on the scrolling container instead of window
  mainContent.addEventListener('scroll', onScroll);

  // Optionally, call onScroll on load to set initial navbar style
  onScroll();
});