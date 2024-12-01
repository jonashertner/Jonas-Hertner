// script.js

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
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Complex disputes",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service2": {
                    "title": "Family and private clients",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service3": {
                    "title": "Arts and media",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service4": {
                    "title": "Impact litigation",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Criminal law",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },
            "bio": {
                "heading": "Brief biography",
                "content": "Jonas Hertner is a lawyer based in Zurich and Basel. Jonas has extensive experience handling complex commercial disputes, with a focus on the financial services, commodities, technology, biotech and life sciences, data privacy, arts, and non-profit/ecology sectors. He frequently represents companies, foundations, families and individuals in multi-jurisdictional disputes as well as in criminal and regulatory investigations. Additionally, Jonas has been involved in several key corporate criminal liability investigations and proceedings in Switzerland both on the victims/private plaintiffs’ side as well as on the defendants’ side."
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
                "content": "Jonas Hertner ist ein Rechtsanwalt mit Büros in Zürich und Basel. Jonas verfügt über umfangreiche Erfahrungen in der Bearbeitung komplexer kommerzieller Streitigkeiten, mit Schwerpunkt auf den Bereichen Finanzdienstleistungen, Rohstoffe, Technologie, Biotechnologie und Life Sciences, Datenschutz, Kunst sowie Non-Profit-/Ökologie-Sektoren. Er vertritt regelmäßig Unternehmen, Stiftungen, Familien und Einzelpersonen in mehrgerichtlichen Streitigkeiten sowie in strafrechtlichen und regulatorischen Untersuchungen. Darüber hinaus war Jonas an mehreren wichtigen Untersuchungen und Verfahren zur strafrechtlichen Unternehmenshaftung in der Schweiz sowohl auf Seiten der Opfer/privaten Kläger als auch auf Seiten der Angeklagten beteiligt."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Komplexe Streitigkeiten",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service2": {
                    "title": "Familien und Privatkunden",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service3": {
                    "title": "Kunst und Medien",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service4": {
                    "title": "Strategische Prozessführung",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Strafrecht",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },
            "bio": {
                "heading": "Erfahrung",
                "content": "Jonas Hertner ist ein Rechtsanwalt mit Büros in Zürich und Basel. Jonas verfügt über umfangreiche Erfahrungen in der Bearbeitung komplexer kommerzieller Streitigkeiten, mit Schwerpunkt auf den Bereichen Finanzdienstleistungen, Rohstoffe, Technologie, Biotechnologie und Life Sciences, Datenschutz, Kunst sowie Non-Profit-/Ökologie-Sektoren. Er vertritt regelmäßig Unternehmen, Stiftungen, Familien und Einzelpersonen in mehrgerichtlichen Streitigkeiten sowie in strafrechtlichen und regulatorischen Untersuchungen. Darüber hinaus war Jonas an mehreren wichtigen Untersuchungen und Verfahren zur strafrechtlichen Unternehmenshaftung in der Schweiz sowohl auf Seiten der Opfer/privaten Kläger als auch auf Seiten der Angeklagten beteiligt."
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
                "content": "Jonas Hertner est un avocat basé à Zurich et Bâle. Jonas possède une vaste expérience dans la gestion de litiges commerciaux complexes, avec un accent sur les services financiers, les matières premières, la technologie, la biotechnologie et les sciences de la vie, la confidentialité des données, les arts et les secteurs à but non lucratif/écologie. Il représente fréquemment des entreprises, des fondations, des familles et des particuliers dans des litiges multi-juridictionnels ainsi que dans des enquêtes criminelles et réglementaires. De plus, Jonas a été impliqué dans plusieurs enquêtes et procédures clés sur la responsabilité pénale des entreprises en Suisse, tant du côté des victimes/plaintifs privés que du côté des défendeurs."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Litiges complexes",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service2": {
                    "title": "Clients familiaux et privés",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service3": {
                    "title": "Arts et média",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service4": {
                    "title": "Contentieux d'impact",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                },
                "service5": {
                    "title": "Droit pénal",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet venenatis nulla. Morbi consequat sapien sed lectus facilisis, eget tincidunt magna vulputate. Integer consequat turpis ac lacus luctus, id faucibus lorem blandit. Sed et ligula vel odio faucibus dictum. Proin convallis justo nec sapien finibus, sed ultricies ipsum tristique. Curabitur quis malesuada lorem. Mauris luctus dui nec diam dictum, vel elementum purus condimentum. Vivamus facilisis tortor nec augue mollis, nec sagittis ligula gravida. Donec efficitur nunc sit amet ex scelerisque, sed vulputate purus vestibulum. Aliquam porttitor, ligula sit amet tempor sagittis, magna lorem faucibus ligula, ac consequat metus libero non magna. Nulla facilisi."
                }
            },
            "bio": {
                "heading": "Expérience",
                "content": "Jonas Hertner est un avocat basé à Zurich et Bâle. Jonas possède une vaste expérience dans la gestion de litiges commerciaux complexes, avec un accent sur les services financiers, les matières premières, la technologie, la biotechnologie et les sciences de la vie, la confidentialité des données, les arts et les secteurs à but non lucratif/écologie. Il représente fréquemment des entreprises, des fondations, des familles et des particuliers dans des litiges multi-juridictionnels ainsi que dans des enquêtes criminelles et réglementaires. De plus, Jonas a été impliqué dans plusieurs enquêtes et procédures clés sur la responsabilité pénale des entreprises en Suisse, tant du côté des victimes/plaintifs privés que du côté des défendeurs."
            },
            "contact": {
                "heading": "Contact",
                "addressLabel": "Adresse",
                "addressPlaceholder": "4051 Bâle. 8032 Zurich.",
                "emailLabel": "Email",
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
    if (currentSection === 'home' || currentSection === 'contact' || currentSection === 'services1' || currentSection === 'services3' || currentSection === 'services5') {
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
