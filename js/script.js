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

  // Content Object (English, German, and French translations)
  const content = {
    "en": {
      "hero": {
        "title": "Jonas Hertner",
        "subtitle": "ATTORNEY"
      },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests."
      },
      "services": {
        "service1": {
          "title": "Advocacy and litigation",
          "description": "Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of top-level litigation experience, Jonas will help you consider not only your own perspective, but also those of the opposing side and any arbiter who may ultimately decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest."
        },
        "service2": {
          "title": "Family and individual clients",
          "description": "Jonas Hertner has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, acquisitions of high-value property, review of governance structures, good governance advice, and due diligence."
        },
        "service3": {
          "title": "Criminal law",
          "description": "Jonas Hertner has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights."
        },
        "service4": {
          "title": "Constitutional law, civil rights and impact litigation",
          "description": "Jonas Hertner is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies."
        },
        "service5": {
          "title": "Artificial intelligence and large language models",
          "description": "With in-depth experience in the application of AI tools and LLMs in governance and education, Jonas regularly advises on emerging legal issues in this area, including on corporate governance and good decision-making practices, data protection and regulatory compliance, intellectual property rights, and ethical considerations."
        },
        "service6": {
          "title": "Philosophy",
          "description": "«At the heart of my practice is an unwavering dedication to my clients’ long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»"
        }
      },
      "bio": {
        "heading": "Biography",
        "content": "Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children’s education, ecology, and the arts. <br><br><a href='notes.html'>Published notes <i>here</i></a>."
      },
      "contact": {
        "heading": "Contact",
        "addressLabel1": "ZURICH",
        "addressPlaceholder1": "Asylstrasse 41, PO Box, 8032 Zurich",
        "addressLabel2": "BASEL",
        "addressPlaceholder2": "4052 Basel",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    },
    "de": {
      "nav": {
        "home": "Home",
        "about": "Über",
        "services": "Dienstleistungen",
        "contact": "Kontakt"
      },
      "hero": {
        "title": "Jonas Hertner",
        "subtitle": "ADVOKAT"
      },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner ist ein unabhängiger Anwalt in Zürich und Basel mit über einem Jahrzehnt Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der wichtigsten Rechtsstreitigkeiten in der Schweiz. Jonas berät Privatpersonen, Familien, Stiftungen und Unternehmen auf dem Weg zur Erreichung ihrer Ziele. Für seine Mandanten ist Jonas ein verlässlicher Berater und unerschütterlicher Advokat, der sich mit dem Anspruch an höchste Qualität für die langfristigen Interessen seiner Mandanten einsetzt."
      },
      "services": {
        "heading": "Expertise",
        "service1": {
          "title": "Rechtsstreitigkeiten",
          "description": "Nicht jeder Streit muss vor Gericht gebracht werden. Oft können die Parteien einvernehmlich oder durch Mediation eine vernünftige Einigung erzielen. Um in einem Rechtsstreit ein gutes Ergebnis zu erzielen, sind die möglichen Folgen eines jeden Schrittes früh zu antizipieren, wenn sich ein Streit abzeichnet. Jonas verfügt über ein Jahrzehnt an Erfahrung in Rechtsstreitigkeiten auf höchster Ebene und hilft Ihnen, die eigene Perspektive und die Perspektiven der gegnerischen Seite und eines eventuellen Gerichts, das über den Streit entscheidet, zu durchdenken, um bei jedem Schritt die effektivste Massnahme ergreifen zu können."
        },
        "service2": {
          "title": "Familien und Einzelpersonen",
          "description": "Jonas Hertner verfügt über weitreichende Erfahrung in der Beratung von in der Schweiz ansässigen und internationalen Familien und Einzelpersonen auf höchstem Niveau in komplexen Rechtssituationen – einschliesslich wichtiger Aktionärsstreitigkeiten, grosser Finanzprozesse, strafrechtlicher Untersuchungen sowie nichtstreitiger Situationen wie der Unterstützung beim Aufbau von Unternehmen oder in der Durchführung von Due Diligence-Prüfungen vor Transaktionen."
        },
        "service3": {
          "title": "Strafrecht",
          "description": "Jonas Hertner hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte."
        },
        "service4": {
          "title": "Verfassungsrecht, Grundrechte und strategische Prozessführung",
          "description": "Jonas Hertner arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie und neue Technologien."
        },
        "service5": {
          "title": "Künstliche Intelligenz und Large Language Models",
          "description": "Mit eingehender Erfahrung in der Anwendung von KI-Tools und LLMs in den Bereichen Good Governance und Bildung kann Jonas in diesem Bereich zu neuartigen Rechtsfragen beraten, darunter zu guter Unternehmensführung und best practices in der Entscheidfindung, die Einhaltung von Datenschutzbestimmungen und aufsichtsrechtlichen Vorschriften, Rechte an geistigem Eigentum und ethische Überlegungen."
        },
        "service6": {
          "title": "Philosophie",
          "description": "«Der Kern meiner Tätigkeit ist das konsequente Engagement für die langfristigen Interessen meiner Mandanten, das auf meiner weitreichenden Erfahrung auf höchster Ebene der Anwaltstätigkeit beruht. Ich hinterfrage Annahmen und betrachte jeden Aspekt, um für jeden Fall die wirkungsvollste Herangehensweise zu finden. Geleitet von Neugier, Empathie, höchster Professionalität und dem Streben nach gerechten Ergebnissen fokussiere ich auf das Wesentliche. Auf diese Weise helfe ich meinen Mandanten, sich in komplexen Situationen zurechtzufinden, ihre Rechte zu schützen und ihre Ziele zu erreichen.»"
        }
      },
      "bio": {
        "heading": "Biographie",
        "content": "Jonas Hertner schloss sein Jurastudium an den Universitäten Luzern und Genf mit Auszeichnung ab. Seine Karriere führte ihn von Non-Profit-Organisationen über die Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten bis hin zum Appellationsgericht Basel-Stadt. Später half er beim Aufbau des Schweizer Büros der Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan. Neben seiner Tätigkeit als Anwalt engagiert sich Jonas Hertner in Projekten in den Bereichen Bildung, Ökologie und Kunst. <br><br><a href='notes.html'>Publizierte Artikel <i>hier</i></a>."
      },
      "contact": {
        "heading": "Kontakt",
        "addressLabel1": "ZÜRICH",
        "addressPlaceholder1": "Asylstrasse 41, Postfach, 8032 Zürich",
        "addressLabel2": "BASEL",
        "addressPlaceholder2": "4052 Basel",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    },
    "fr": {
      "nav": {
        "home": "Accueil",
        "about": "À propos",
        "services": "Services",
        "contact": "Contact"
      },
      "hero": {
        "title": "Jonas Hertner",
        "subtitle": "AVOCAT"
      },
      "about": {
        "heading": "Jonas Hertner",
        "content": "Jonas Hertner est un avocat indépendant basé à Zurich et à Bâle, avec plus d'une décennie d'expérience guidant des clients suisses et internationaux dans des litiges juridiques de grande importance. Il conseille des particuliers, des familles, des fondations et des entreprises dans des situations complexes afin qu'ils puissent atteindre leurs objectifs. Pour ses clients, il est un conseiller de confiance et un avocat inébranlable, voué à l'excellence dans la protection et la promotion de leurs intérêts à long terme."
      },
      "services": {
        "heading": "Expertise",
        "service1": {
          "title": "Litiges",
          "description": "Tous les litiges ne méritent pas d'être portés devant les tribunaux. Souvent, les parties peuvent parvenir à un accord raisonnable à l'amiable ou par la médiation. Pour obtenir un bon résultat dans un litige, il est important d'anticiper les conséquences possibles de chaque étape le plus tôt possible lorsqu'un différend se dessine. Jonas a plus de dix ans d'expérience dans les litiges de haut niveau et vous aidera à réfléchir à votre propre perspective ainsi qu'à celle de la partie adverse et d'un éventuel tribunal appelé à trancher le litige, afin que vous puissiez prendre les mesures les plus efficaces à chaque étape du processus de protection de vos intérêts."
        },
        "service2": {
          "title": "Clients familiaux et privés",
          "description": "Jonas Hertner a une grande expérience du conseil aux familles et aux particuliers basés en Suisse ou à l'étranger, au plus haut niveau, dans des situations juridiques complexes, notamment dans le cadre de litiges entre actionnaires, de litiges financiers importants, d'enquêtes sur des actes criminels, ainsi que dans des situations non litigieuses telles que l'aide à la création d'entreprises."
        },
        "service3": {
          "title": "Droit pénal",
          "description": "Jonas Hertner a une grande expérience dans la conduite de procédures pénales à travers toutes les instances, en particulier dans les domaines de la criminalité économique et des droits fondamentaux."
        },
        "service4": {
          "title": "Droit constitutionnel, droits civils et litiges stratégiques",
          "description": "Jonas Hertner collabore avec des parties en Suisse et au niveau international afin de poursuivre des litiges visant à protéger les droits et libertés fondamentaux, notamment dans les domaines de l'écologie et des nouvelles technologies."
        },
        "service5": {
          "title": "Le droit de l'intelligence artificielle et des Large Language Models",
          "description": "Avec une expérience approfondie dans l'application des outils d'IA et de LLM dans les domaines de la bonne gouvernance et de l'éducation, Jonas conseille régulièrement sur des questions juridiques nouvelles dans ce domaine, notamment sur la «good governance» et les bonnes pratiques de prise de décision, la conformité avec les règles de protection des données et les règles prudentielles, les droits de propriété intellectuelle et les considérations éthiques."
        },
        "service6": {
          "title": "Philosophie",
          "description": "«Au cœur de ma pratique se trouve un dévouement inébranlable aux intérêts à long terme de mes clients, nourri par ma vaste expérience au plus haut niveau de la profession. Je remets en question les hypothèses et j'envisage tous les angles d'attaque afin d'identifier l'approche la plus efficace. Guidé par la curiosité, l'empathie, l'excellence et la recherche de résultats justes et équitables, je reste concentré sur ce qui compte. Ce faisant, j'aide mes clients à naviguer dans la complexité, à protéger leurs droits et à atteindre leurs objectifs.»"
        }
      },
      "bio": {
        "heading": "Biographie",
        "content": "Jonas Hertner a obtenu son diplôme de droit avec mention aux universités de Lucerne et de Genève. Sa carrière l'a mené d'organisations à but non lucratif à la Direction du droit international du Département fédéral des affaires étrangères et à la Cour d'appel de Bâle-Ville. Il a ensuite participé à la création du bureau suisse du cabinet d'avocats Quinn Emanuel Urquhart & Sullivan. Outre sa pratique juridique, Jonas est engagé dans des projets dans les domaines de l'éducation des enfants, de l'écologie et des arts. <br><br><a href='notes.html'>Notes publiées <i>ici</i></a>."
      },
      "contact": {
        "heading": "Contact",
        "addressLabel1": "ZURICH",
        "addressPlaceholder1": "Asylstrasse 41, case postale, 8032 Zurich",
        "addressLabel2": "BASEL",
        "addressPlaceholder2": "4052 Basel",
        "emailLabel": "",
        "emailPlaceholder": "jh@jonashertner.com"
      }
    }
  };

  // Function to change language
  function changeLanguage(lang) {
    // Update all elements with data-key attributes
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      const keys = key.split('.');
      let text = content[lang];

      keys.forEach(k => {
        if (text && text[k] !== undefined) {
          text = text[k];
        } else {
          text = '';
        }
      });

      // Use innerHTML if element has data-html="true"
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else if (element.tagName === 'IMG') {
        element.alt = text;
      } else {
        if (element.getAttribute('data-html') === "true") {
          element.innerHTML = text;
        } else {
          element.textContent = text;
        }
      }
    });

    // Update active language button
    languageButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    const activeBtn = document.getElementById('lang-' + lang);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');
    }

    // Store selected language in localStorage
    localStorage.setItem('language', lang);

    // Update the lang attribute on the html tag
    document.documentElement.lang = lang;
  }

  // Function to adjust navbar style based on current section
  function adjustNavbarStyle(currentSection = 'home') {
    if (currentSection === 'home' || currentSection === 'jh' || currentSection === 'services1' || currentSection === 'services3' || currentSection === 'services5' || currentSection === 'bio') {
      navbar.classList.remove('dark'); // Light navbar for home and certain sections
      languageSwitcher.style.color = 'white'; // Ensure font color is white
    } else {
      navbar.classList.add('dark'); // Dark navbar for other sections
      languageSwitcher.style.color = ''; // Revert to default or inherited styling
    }
  }

  // Event listeners for language buttons
  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.split('-')[1];
      changeLanguage(lang);
    });
  });

  // Load language on page load
  const storedLang = localStorage.getItem('language') || 'en';
  changeLanguage(storedLang);
  adjustNavbarStyle('home'); // Set initial navbar style

  // Intersection Observer for Navbar Style based on visible section
  const options = {
    root: null, // Observe relative to the viewport
    rootMargin: '0px',
    threshold: 0.6 // 60% of the section is visible
  };

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adjust navbar style based on current section
        adjustNavbarStyle(entry.target.id);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});
