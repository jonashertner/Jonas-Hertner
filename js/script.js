// script.js

document.addEventListener('DOMContentLoaded', () => {
    const password = prompt("Please enter the password:");
    if (password !== "tryanderror137") {
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
                "subtitle": "LEGAL COUNSEL"
            },
            "about": {
                "heading": "Jonas Hertner",
                "content": "Jonas Hertner is an independent lawyer based in Zurich and Basel, with more than a decade of experience guiding Swiss and international clients through high-stakes legal disputes. He advises individuals, families, foundations, and companies in navigating complex situations on the way to achieving their goals. To his clients, he is a trusted advisor and unwavering advocate, committed to excellence in protecting and advancing their long-term interests."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Disputes",
                    "description": "Not every legal dispute is worth taking to court. Often, parties can find reasonable settlements out of court. To reach a favourable outcome in or out of court in any legal dispute, it is important to anticipate possible consequences of any step taken as early as possible when a dispute is on the horizon. With more than a decade of experience in litigation at the highest level, Jonas will help you think through your own perspective, through the perspective of the opposing side, and through the perspective of an eventual arbitral tribunal or court asked to decide the dispute, allowing you to take the most effective action at each turn on the way to securing your interest."
                },
                "service2": {
                    "title": "Family and private clients",
                    "description": "Jonas Hertner has extensive experience advising Switzerland based and international families and private clients at the very highest level on complex legal situations–including on high-stakes shareholder disputes, important financial litigation, investigations of criminal acts as well as non-litigious situations such as assisting with the building of business ventures."
                },
                "service3": {
                    "title": "Arts and media",
                    "description": "Jonas Hertner advises and represents artists, collectors, galleries and art fairs in legal matters. In addition, Jonas has extensive experience in dealing with the press and has good contacts with national and international media."
                },
                "service4": {
                    "title": "Impact litigation",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Criminal law",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service6": {
                    "title": "Philosophy",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },
            "bio": {
                "heading": "Biography",
                "content": "Jonas Hertner graduated from the Universities of Lucerne and Geneva with a law degree with honours. His career took him from non-profit organisations in the development sector to the Directorate of International Law in the Federal Department of Foreign Affairs and to the Court of Appeal of Basel-Stadt. He later helped to establish the Swiss office of the world's largest law firm specialising in litigation. Outside of his legal career, Jonas has worked as a freelance contributor for a non-commercial radio station and a major daily newspaper, and as a teacher of ethics and philosophy at the university-track secondary school level."
            },
            "contact": {
                "heading": "Contact",
                "addressLabel": "Address",
                "addressPlaceholder": "4051 Basel. 8032 Zurich.",
                "emailLabel": "Email",
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
                    "title": "Kunst und Medien",
                    "description": "Jonas Hertner berät und vertritt Künstler, Sammler, Galerien und Kunstmessen in rechtlichen Angelegenheiten. Darüber hinaus hat Jonas weitreichende Erfahrungen im Umgang mit der Presse und verfügt über gute Kontakte zu nationalen und internationalen Medien."
                },
                "service4": {
                    "title": "Strategische Prozessführung",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Strafrecht",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service6": {
                    "title": "Philosophie",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },
            "bio": {
                "heading": "Biographie",
                "content": "Jonas Hertner hat an den Universitäten Luzern und Genf das Studium der Rechtswissenschaften mit Auszeichnung abgeschlossen. Seine Laufbahn führte ihn von Nonprofit-Unternehmungen im Entwicklungsbereich zunächst zur Direktion für Völkerrecht im Eidgenössischen Departement für auswärtige Angelegenheiten und an das Appellationsgericht Basel-Stadt. Später hat er das Schweizer Büro der weltweit grössten, auf Rechtsstreitigkeiten spezialisierten Anwaltskanzlei mitaufgebaut. Ausserhalb seiner juristischen Karriere war Jonas u.a. als freischaffender Mitarbeiter eines nonkommerziellen Radios und einer grossen Tageszeitung sowie als Lehrer für Ethik und Philosophie auf Gymnasialstufe tätig."
            },
            "contact": {
                "heading": "Kontakt",
                "addressLabel": "Postadresse",
                "addressPlaceholder": "4052 Basel. 8032 Zürich. Schweiz",
                "emailLabel": "E-Mail",
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
                "subtitle": "CONSEIL JURIDIQUE"
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
                    "title": "Arts et média",
                },
                "service4": {
                    "title": "Contentieux d'impact",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Droit pénal",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service6": {
                    "title": "Philosophie",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },

            "bio": {
                "heading": "Biographie",
                "content": "Jonas Hertner a obtenu son diplôme de droit avec mention aux universités de Lucerne et de Genève. Sa carrière l'a d'abord conduit d'entreprises à but non lucratif dans le domaine du développement à la Direction du droit international public du Département fédéral des affaires étrangères et à la Cour d'appel de Bâle-Ville. Il a ensuite contribué à la création du bureau suisse du plus grand cabinet d'avocats au monde spécialisé dans le contentieux. En dehors de sa carrière juridique, Jonas a notamment travaillé comme collaborateur indépendant pour une radio non commerciale et un grand quotidien ainsi que comme enseignant d'éthique et de philosophie au niveau du lycée."
            },

            "contact": {
                "heading": "Contact",
                "addressLabel": "",
                "addressPlaceholder": "4051 Bâle. 8032 Zurich.",
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
