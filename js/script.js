// script.js

document.addEventListener('DOMContentLoaded', () => {
    const password = prompt("Please enter the password:");
    if (password !== "ff") {
        document.body.innerHTML = "<h1>Access Denied</h1>";
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
                "content": "Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes. He advises individuals, families, foundations, and companies in navigating complex situations on the way to achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests."
            },
            "services": {
                // "heading": "Expertise",
                "service1": {
                    "title": "Advocacy",
                    "description": "Not every legal dispute is worth taking to court. Often, parties can find reasonable settlements out of court. To reach a favourable outcome in or out of court in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of experience in litigation at the highest level, Jonas will help you think through your own perspective, through the perspective of the opposing side, and through the perspective of an eventual arbitral tribunal or court asked to decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest."
                },
                "service2": {
                    "title": "Family and individual clients",
                    "description": "Jonas Hertner has extensive experience advising Switzerland based and international families and individual clients at the very highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures, review of governance structures and due diligence."
                },
                "service3": {
                    "title": "Arts",
                    "description": "Jonas Hertner advises and represents artists, collectors, galleries and art fairs in legal matters."
                },
                // "service4": {
                //     "title": "Impact litigation",
                //     "description": "Jonas Hertner is collaborating with parties in Switzerland and internationally to pursue strategic litigation to effect policy change in the areas of ecology and fundamental justice. Jonas is experienced in working with litigation funders and collectives of affected claimants."
                // },
                                "service4": {
                    "title": "Constitutional law",
                    "description": "Jonas Hertner is collaborating with parties in Switzerland and internationally to pursue litigation to protect fundamental rights and freedoms, notably in the areas of ecology and new technologies."
                },
                "service5": {
                    "title": "Criminal law",
                    "description": "Jonas Hertner has extensive experience in conducting criminal proceedings through all instances, in particular in the areas of corporate criminal liability, white collar/economic crime, and civil rights."
                },
                "service6": {
                    "title": "Philosophy",
                    "description": "«At the heart of my practice is an unwavering dedication to my clients’ long-term interests, informed by my extensive experience at the highest level of the profession. I question assumptions and consider every angle to identify the most effective approach, distilling a complex array of factors into actionable advice. Guided by curiosity, excellence, empathy, and a pursuit of fair and just outcomes, I remain focused on what truly matters. In doing so, I help clients navigate complexity, protect their rights, and achieve their goals.»"
                }
            },
            "bio": {
                "heading": "Biography",
                "content": "Jonas Hertner graduated from the Universities of Lucerne and Geneva with a law degree with honours. His career took him from non-profit organisations to the Directorate of International Law in the Federal Department of Foreign Affairs and to the Court of Appeal of Basel-Stadt. Later, he helped establish the Swiss office of the world's largest law firm specialising in litigation. Aside from his legal practice, Jonas is engaged in ventures in the areas of children's education, ecology, and the arts."
            },
            "contact": {
                "heading": "Contact",
                "addressLabel": "",
                "addressPlaceholder": "",
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
                "content": "Jonas Hertner ist ein unabhängiger Anwalt in Zürich und Basel mit über einem Jahrzehnt an Erfahrung als Berater für Schweizer und internationale Mandanten in einigen der wichtigsten Rechtsstreitigkeiten in der Schweiz. Jonas berät Privatpersonen, Familien, Stiftungen und Unternehmen auf dem Weg zur Erreichung ihrer Ziele. Für seine Mandanten ist Jonas ein verlässlicher Berater und unerschütterlicher Advokat, der sich mit dem Anspruch an höchste Qualität für die langfristigen Interessen seiner Mandanten einsetzt."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Rechtsstreitigkeiten",
                    "description": "Nicht jeder Rechtsstreit ist es wert, vor Gericht gebracht zu werden. In vielen Fällen können die Parteien eine vernünftige aussergerichtliche Einigung erzielen. Um in einem Rechtsstreit ein günstiges Ergebnis zu erzielen, ist es wichtig, die möglichen Folgen eines jeden Schrittes so früh wie möglich zu antizipieren, wenn sich ein Streit abzeichnet. Mit seiner Erfahrung aus über zehn Jahren Prozessführung auf höchstem Level wird Jonas Ihnen dabei helfen, Ihre eigene Perspektive, die Perspektive der Gegenseite und die Perspektive eines eventuellen Schiedsgerichts oder Gerichts, das über den Streit entscheiden soll, zu durchdenken, damit Sie auf dem Weg zur Sicherung Ihrer Interessen in jeder Situation die bestmögliche Entscheidung treffen können."
                },
                "service2": {
                    "title": "Familien und Einzelpersonen",
                    "description": "Jonas Hertner verfügt über weitreichende Erfahrung in der Beratung von in der Schweiz ansässigen und internationalen Familien und Einzelpersonen auf höchstem Niveau in komplexen Rechtssituationen – einschliesslich wichtiger Aktionärsstreitigkeiten, großer Finanzprozesse, strafrechtlicher Untersuchungen sowie nichtstreitiger Situationen wie der Unterstützung beim Aufbau von Unternehmen oder in der Durchführung von Due Diligence-Prüfungen vor Transaktionen."
                },
                "service3": {
                    "title": "Kunst",
                    "description": "Jonas Hertner berät und vertritt Jonas Künstler, Sammler, Galerien und Kunstmessen in rechtlichen Angelegenheiten."
                },
                // "service4": {
                //     "title": "Strategische Prozessführung",
                //     "description": "Jonas Hertner arbeitet mit Parteien in der Schweiz und international zusammen, um strategische Prozesse zu führen, die politische Veränderungen in den Bereichen Ökologie und Grundrechte bewirken sollen. Jonas hat Erfahrung in der Zusammenarbeit mit Prozessfinanzierern und Kollektiven betroffener Kläger."
                // },
                "service4": {
                    "title": "Verfassungsrecht",
                    "description": "Jonas Hertner arbeitet mit Partnern in der Schweiz und auf internationaler Ebene zusammen, um Prozesse zum Schutz der Grundrechte und -freiheiten zu führen, insbesondere in den Bereichen Ökologie und neue Technologien."
                },
                "service5": {
                    "title": "Strafrecht",
                    "description": "Jonas Hertner hat eine grosse Erfahrung im Führen strafrechtlicher Verfahren durch alle Instanzen, insbesondere in den Bereichen Wirtschaftskriminalität und Grundrechte."
                },
                "service6": {
                    "title": "Philosophie",
                    "description": "«Der Kern meiner Tätigkeit ist das konsequente Engagement für die langfristigen Interessen meiner Mandanten, das auf meiner weitreichenden Erfahrung auf höchster Ebene unseres Berufsstandes beruht. Ich hinterfrage Annahmen und betrachte jeden Aspekt, um für jeden Fall die wirkungsvollste Herangehensweise zu finden. Geleitet von Neugier, Empathie, Exzellenz und dem Streben nach fairen und gerechten Ergebnissen konzentriere ich mich auf das Wesentliche. Auf diese Weise helfe ich meinen Mandanten, sich in komplexen Situationen zurechtzufinden, ihre Rechte zu schützen und ihre Ziele zu erreichen.»"
                }
            },
            "bio": {
                "heading": "Biographie",
                "content": "Jonas Hertner schloss sein Jurastudium an den Universitäten Luzern und Genf mit Auszeichnung ab. Seine Karriere führte ihn von Non-Profit-Organisationen über die Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten bis hin zum Appellationsgericht Basel-Stadt. Später half er beim Aufbau des Schweizer Büros der weltweit größten auf Prozessführung spezialisierten Anwaltskanzlei. Neben seiner Tätigkeit als Anwalt engagiert sich Jonas Hertner in Projekten in den Bereichen Bildung, Ökologie und Kunst."
            },
            "contact": {
                "heading": "Kontakt",
                "addressLabel": "",
                "addressPlaceholder": "",
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
                    "description": "Tous les litiges juridiques ne méritent pas d'être portés devant les tribunaux. Souvent, les parties peuvent trouver des solutions raisonnables à l'amiable. Pour parvenir à une issue favorable, que ce soit en justice ou à l'amiable, il est important d'anticiper les conséquences possibles de toute mesure prise le plus tôt possible lorsqu'un litige se profile à l'horizon. Avec son expérience de plus de dix ans de contentieux au plus haut niveau, Jonas Hertner vous aidera à réfléchir à votre propre perspective, à celle de la partie adverse et à celle d'un éventuel tribunal arbitral ou judiciaire appelé à trancher le litige, ce qui vous permettra de prendre les mesures les plus efficaces à chaque étape afin de garantir vos intérêts. "
                },
                "service2": {
                    "title": "Clients familiaux et privés",
                    "description": "Jonas Hertner a une grande expérience du conseil aux familles et aux particuliers basés en Suisse ou à l'étranger, au plus haut niveau, dans des situations juridiques complexes, notamment dans le cadre de litiges entre actionnaires, de litiges financiers importants, d'enquêtes sur des actes criminels, ainsi que dans des situations non litigieuses telles que l'aide à la création d'entreprises."
                },
                "service3": {
                    "title": "Arts",
                    "description": "Jonas Hertner conseille et représente des artistes, des collectionneurs, des galeries et des foires d'art dans des affaires juridiques."
                },
                // "service4": {
                //     "title": "Contentieux d'impact",
                //     "description": "Jonas Hertner collabore avec des parties en Suisse et sur le plan international afin de poursuivre des litiges stratégiques visant à provoquer des changements politiques dans les domaines de l'écologie et de la justice fondamentale. Jonas a l'habitude de travailler avec des financeurs de litiges et des collectifs des plaignants."
                // },
                "service4": {
                    "title": "Droit constitutionnel",
                    "description": "Jonas Hertner collabore avec des parties en Suisse et au niveau international afin de poursuivre des litiges visant à protéger les droits et libertés fondamentaux, notamment dans les domaines de l'écologie et des nouvelles technologies."
                },
                "service5": {
                    "title": "Droit pénal",
                    "description": "Jonas Hertner a une grande expérience dans la conduite de procédures pénales à travers toutes les instances, en particulier dans les domaines de la criminalité économique et des droits fondamentaux."
                },
                "service6": {
                    "title": "Philosophie",
                    "description": "«Au cœur de ma pratique se trouve un dévouement inébranlable aux intérêts à long terme de mes clients, nourri par ma vaste expérience au plus haut niveau de la profession. Je remets en question les hypothèses et j'envisage tous les angles d'attaque afin d'identifier l'approche la plus efficace. Guidé par la curiosité, l'empathie, l'excellence et la recherche de résultats justes et équitables, je reste concentré sur ce qui compte. Ce faisant, j'aide mes clients à naviguer dans la complexité, à protéger leurs droits et à atteindre leurs objectifs.»"
                }
            },

            "bio": {
                "heading": "Biographie",
                "content": "Jonas Hertner a obtenu son diplôme de droit avec mention aux universités de Lucerne et de Genève. Sa carrière l'a mené d'organisations à but non lucratif à la Direction du droit international du Département fédéral des affaires étrangères et à la Cour d'appel de Bâle-Ville. Il a ensuite participé à la création du bureau suisse du plus grand cabinet d'avocats au monde spécialisé dans les litiges. Outre sa pratique juridique, Jonas est engagé dans des projets dans les domaines de l'éducation des enfants, de l'écologie et des arts."
            },

            "contact": {
                "heading": "Contact",
                "addressLabel": "",
                "addressPlaceholder": "",
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

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'IMG') {
                element.alt = text;
            } else {
                element.textContent = text;
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
        navbar.classList.remove('dark'); // Light navbar for home and services1,3
        languageSwitcher.style.color = 'white'; // Ensure font color is white
    } else {
        navbar.classList.add('dark'); // Dark navbar for other sections
        languageSwitcher.style.color = ''; // Revert to default or inherit styling
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
