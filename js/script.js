/**
 * Jonas Hertner — 2026
 * Theme, language, typewriter, scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Elements ---
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.theme-toggle__sun');
  const moonIcon = document.querySelector('.theme-toggle__moon');
  const langBtns = document.querySelectorAll('.lang-switcher__btn');
  const reveals = document.querySelectorAll('.reveal');
  const yearEl = document.getElementById('year');

  // --- Content ---
  const content = {
    en: {
      hero: { title: 'Jonas Hertner', subtitle: 'ATTORNEY', location: 'Zurich · Basel' },
      about: {
        content: 'Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes, often across multiple jurisdictions. He advises individuals, families, foundations, and companies in navigating complex situations as they work toward achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests.'
      },
      practice: {
        heading: 'Areas of Expertise',
        litigation: {
          title: 'Litigation and mediation',
          description: 'Not every legal dispute is worth taking to court. Often, parties can find a reasonable settlement out of court. To reach a favourable outcome in or out of court, or through mediation, in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon.'
        },
        families: {
          title: 'Families, foundations, and individuals',
          description: 'Jonas has extensive experience advising Switzerland-based and international families and individual clients at the highest level on complex legal situations–including high-stakes shareholder disputes, important financial litigation, and investigations of criminal acts.'
        },
        criminal: {
          title: 'Criminal law',
          description: 'Jonas has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights.'
        },
        constitutional: {
          title: 'Constitutional law and impact litigation',
          description: 'Jonas is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies.'
        },
        ai: {
          title: 'Artificial intelligence',
          description: 'Experienced in the application of AI tools across various modalities—including large language models, multimodal systems, and agentic AI—Jonas regularly advises on emerging legal issues in this rapidly evolving field.'
        }
      },
      philosophy: {
        quote: 'At the heart of my practice is an unwavering dedication to my clients\' long-term interests. I question assumptions and consider every angle to identify the most effective approach. Guided by curiosity, excellence, empathy, and a pursuit of fair outcomes, I remain focused on what truly matters.'
      },
      bio: {
        label: 'Biography',
        content: 'Jonas Hertner graduated with honors from the Universities of Lucerne and Geneva. His career has included roles at non-profit organizations, at the Directorate of International Law of the Federal Department of Foreign Affairs, and at the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the law firm Quinn Emanuel Urquhart & Sullivan. In addition to his legal practice, Jonas engages in ventures involving children\'s education, ecology, and the arts.'
      },
      notes: {
        heading: 'Feldnotizen',
        note1: { title: 'Personalized LLM Tutors' },
        note2: { title: 'Modern Governance Requires AI' }
      },
      contact: {
        zurich: 'Zurich',
        zurichAddress: 'Asylstrasse 41, 8032 Zurich',
        basel: 'Basel',
        baselAddress: 'PO Box, 4001 Basel',
        emailLabel: 'Email',
        email: 'team@jonashertner.com'
      }
    },
    de: {
      hero: { title: 'Jonas Hertner', subtitle: 'ADVOKAT', location: 'Zürich · Basel' },
      about: {
        content: 'Jonas Hertner ist unabhängiger Rechtsanwalt in Zürich und Basel mit über einem Jahrzehnt Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der grössten Rechtsstreitigkeiten in der Schweiz. Er berät Privatpersonen, Familien, Stiftungen und Unternehmen und unterstützt sie dabei, in anspruchsvollen Situationen ihre Ziele zu verwirklichen. Seine Mandanten schätzen ihn als verlässlichen Berater und entschlossenen Anwalt, der ihre langfristigen Interessen mit höchstem Anspruch schützt und fördert.'
      },
      practice: {
        heading: 'Tätigkeitsbereiche',
        litigation: {
          title: 'Rechtsstreitigkeiten und Mediation',
          description: 'Nicht jeder Streit muss vor Gericht gebracht werden. Oft gelangen die Parteien einvernehmlich oder durch Mediation zu einer vernünftigen Einigung. Um in einem Rechtsstreit ein gutes Ergebnis zu erzielen, sind die möglichen Folgen eines jeden Schrittes früh zu antizipieren.'
        },
        families: {
          title: 'Familien, Stiftungen und Einzelpersonen',
          description: 'Jonas verfügt über umfassende Erfahrung in der Beratung von Familien und Privatpersonen in der Schweiz und international auf höchstem Niveau – bei gesellschaftsrechtlichen Streitigkeiten, Finanzstreitigkeiten und strafrechtlichen Untersuchungen.'
        },
        criminal: {
          title: 'Strafrecht',
          description: 'Jonas hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte.'
        },
        constitutional: {
          title: 'Verfassungsrecht und strategische Prozessführung',
          description: 'Jonas arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie und neue Technologien.'
        },
        ai: {
          title: 'Künstliche Intelligenz',
          description: 'Mit Erfahrung im Einsatz von KI-Werkzeugen verschiedener Modalitäten berät Jonas regelmässig zu aufkommenden Rechtsfragen in diesem sich rasch entwickelnden Bereich.'
        }
      },
      philosophy: {
        quote: 'Im Mittelpunkt meiner Tätigkeit steht das unerschütterliche Engagement für die langfristigen Interessen meiner Mandanten. Geleitet von Neugier, Empathie und höchstem Anspruch an Qualität fokussiere ich mich auf das, was wirklich zählt.'
      },
      bio: {
        label: 'Biographie',
        content: 'Jonas Hertner schloss sein Studium der Rechtswissenschaften an den Universitäten Luzern und Genf mit Auszeichnung ab. Sein beruflicher Weg führte ihn zu gemeinnützigen Organisationen, zur Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten und an das Appellationsgericht Basel-Stadt. Später war er massgeblich am Aufbau des Schweizer Büros der internationalen Anwaltskanzlei Quinn Emanuel Urquhart & Sullivan beteiligt. Neben seiner anwaltlichen Tätigkeit engagiert sich Jonas Hertner in den Bereichen Bildung, Ökologie und Kunst.'
      },
      notes: {
        heading: 'Feldnotizen',
        note1: { title: 'Personalisierte LLM-Tutoren' },
        note2: { title: 'Moderne Governance erfordert KI' }
      },
      contact: {
        zurich: 'Zürich',
        zurichAddress: 'Asylstrasse 41, 8032 Zürich',
        basel: 'Basel',
        baselAddress: 'Postfach, 4001 Basel',
        emailLabel: 'E-Mail',
        email: 'team@jonashertner.com'
      }
    },
    fr: {
      hero: { title: 'Jonas Hertner', subtitle: 'AVOCAT', location: 'Zurich · Bâle' },
      about: {
        content: 'Jonas Hertner est avocat indépendant établi à Zurich et à Bâle. Fort de plus de dix ans d\'expérience, il accompagne une clientèle suisse et internationale dans des litiges complexes à forts enjeux, souvent portés devant plusieurs juridictions. Il conseille des particuliers, des familles, des fondations et des entreprises confrontés à des situations délicates, les aidant à atteindre leurs objectifs stratégiques. Ses clients trouvent en lui un conseiller de confiance et un défenseur déterminé.'
      },
      practice: {
        heading: 'Domaines d\'expertise',
        litigation: {
          title: 'Litiges et médiation',
          description: 'Tous les litiges ne doivent pas nécessairement finir devant les tribunaux. Une solution avantageuse peut souvent être trouvée à l\'amiable ou par médiation. Il est essentiel d\'anticiper les conséquences de chaque décision dès les premiers signes d\'un différend.'
        },
        families: {
          title: 'Familles, fondations et particuliers',
          description: 'Jonas possède une vaste expérience du conseil au plus haut niveau auprès de familles et de particuliers établis en Suisse et à l\'international – litiges entre actionnaires, contentieux financiers et enquêtes pénales.'
        },
        criminal: {
          title: 'Droit pénal',
          description: 'Jonas possède une expérience approfondie dans la conduite de procédures pénales à tous les niveaux judiciaires, en particulier dans les domaines de la criminalité économique et de la protection des droits fondamentaux.'
        },
        constitutional: {
          title: 'Droit constitutionnel et litiges stratégiques',
          description: 'Jonas collabore avec des acteurs en Suisse et à l\'international afin de mener des procédures judiciaires visant à protéger les droits et libertés fondamentaux, notamment en matière d\'environnement et de nouvelles technologies.'
        },
        ai: {
          title: 'Intelligence artificielle',
          description: 'Fort d\'une expérience dans l\'application d\'outils d\'IA de diverses modalités, Jonas conseille régulièrement sur les questions juridiques émergentes dans ce domaine en rapide évolution.'
        }
      },
      philosophy: {
        quote: 'Au cœur de ma pratique se trouve un engagement indéfectible envers les intérêts à long terme de mes clients. Je questionne les idées reçues et examine chaque perspective afin d\'élaborer l\'approche la plus pertinente. Animé par la curiosité, l\'excellence et l\'empathie, je me concentre sur l\'essentiel.'
      },
      bio: {
        label: 'Biographie',
        content: 'Jonas Hertner est titulaire d\'un diplôme en droit obtenu avec mention aux universités de Lucerne et de Genève. Son parcours professionnel l\'a mené auprès d\'organisations à but non lucratif, à la Direction du droit international du Département fédéral des affaires étrangères ainsi qu\'à la Cour d\'appel de Bâle-Ville. Il a par la suite contribué à l\'établissement du bureau suisse du cabinet international Quinn Emanuel Urquhart & Sullivan. En parallèle à sa pratique juridique, Jonas s\'investit dans des projets consacrés à l\'éducation des enfants, à l\'écologie et aux arts.'
      },
      notes: {
        heading: 'Feldnotizen',
        note1: { title: 'Tuteurs LLM personnalisés' },
        note2: { title: 'La gouvernance moderne nécessite l\'IA' }
      },
      contact: {
        zurich: 'Zurich',
        zurichAddress: 'Asylstrasse 41, 8032 Zurich',
        basel: 'Bâle',
        baselAddress: 'Case postale, 4001 Bâle',
        emailLabel: 'Email',
        email: 'team@jonashertner.com'
      }
    }
  };

  // --- Typewriter ---
  let twActive = false;
  let twTimeouts = [];

  function clearTw() {
    twTimeouts.forEach(t => clearTimeout(t));
    twTimeouts = [];
    twActive = false;
  }

  function typewrite(el, text, speed = 60, cb) {
    if (!el) return;
    el.innerHTML = '';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      if (cb) cb();
      return;
    }

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    let i = 0;
    const node = document.createTextNode('');
    el.appendChild(node);
    el.appendChild(cursor);

    function tick() {
      if (i < text.length) {
        node.textContent += text.charAt(i++);
        twTimeouts.push(setTimeout(tick, speed));
      } else if (cb) cb();
    }
    tick();
  }

  function startTw(lang) {
    if (twActive) return;
    twActive = true;

    const titleEl = document.querySelector('.hero__title .typewriter');
    const subEl = document.querySelector('.hero__subtitle');

    typewrite(titleEl, content[lang].hero.title, 65, () => {
      twTimeouts.push(setTimeout(() => {
        typewrite(subEl, content[lang].hero.subtitle, 45, () => { twActive = false; });
      }, 250));
    });
  }

  // --- Theme ---
  function getSysTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    if (sunIcon) sunIcon.style.display = t === 'dark' ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = t === 'dark' ? 'block' : 'none';
  }

  function toggleTheme() {
    const cur = localStorage.getItem('theme') || getSysTheme();
    const next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  applyTheme(localStorage.getItem('theme') || getSysTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  });

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // --- Language ---
  function getNested(obj, path) {
    return path.split('.').reduce((o, k) => o && o[k], obj);
  }

  function setLang(lang, animate = false) {
    if (!content[lang]) return;
    clearTw();

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const val = getNested(content[lang], key);
      if (val === undefined) return;
      if (animate && (el.classList.contains('typewriter') || el.classList.contains('hero__subtitle'))) return;
      el.textContent = val;
    });

    langBtns.forEach(b => {
      b.classList.toggle('active', b.id === 'lang-' + lang);
      b.setAttribute('aria-pressed', b.id === 'lang-' + lang);
    });

    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    if (animate) startTw(lang);
  }

  const initLang = localStorage.getItem('language') || 'en';
  setLang(initLang, false);
  setTimeout(() => startTw(initLang), 400);

  langBtns.forEach(b => b.addEventListener('click', () => setLang(b.id.replace('lang-', ''), true)));

  // --- Reveal ---
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  // --- Year ---
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
