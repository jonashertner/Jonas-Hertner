// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select essential DOM elements
    const languageButtons = document.querySelectorAll('.lang-btn');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = []; // No navigation links, so this can be an empty array or removed
    // Removed toggleButton and navbarLinks since the menu is no longer present

    // Content Object (English and German translations)
    const content = {
        "en": {
            "nav": {
                "home": "Home",
                "about": "About",
                "services": "Services",
                "contact": "Contact"
            },
            "hero": {
                "title": "Jonas Hertner",
                "subtitle": "LEGAL COUNSEL"
            },
            "about": {
                "heading": "Jonas Hertner",
                "content": "Jonas Hertner is a lawyer based in Zurich and Basel. Jonas has extensive experience handling complex commercial disputes, with a focus on the financial services, commodities, technology, biotech and life sciences, data privacy, arts, and non-profit/ecology sectors. He frequently represents companies, foundations, families and individuals in multi-jurisdictional disputes as well as in criminal and regulatory investigations. Additionally, Jonas has been involved in several key corporate criminal liability investigations and proceedings in Switzerland both on the victims/private plaintiffs’ side as well as on the defendants’ side."
            },
            "services": {
                "heading": "Expertise",
                "service1": {
                    "title": "Complex disputes",
                    "description": "Advise and represent parties in complex disputes."
                },
                "service2": {
                    "title": "Family and private clients",
                    "description": "Advise private clients on legal issues."
                },
                "service3": {
                    "title": "Criminal law",
                    "description": "Advise and represent parties in criminal investigations and proceedings."
                },
                "service4": {
                    "title": "Impact litigation",
                    "description": "Advise and represent parties on strategic impact litigation in the areas of ecology and fundamental rights."
                }
            },
            "contact": {
                "heading": "Contact",
                "addressLabel": "Address",
                "addressPlaceholder": "4051 Basel. 8032 Zurich.",
                "emailLabel": "Email",
                "emailPlaceholder": "jh@jonashertner.com"
            },
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
                    "description": "Beratung und Vertretung in komplexen Streitigkeiten."
                },
                "service2": {
                    "title": "Familien und Privatkunden",
                    "description": "Beratung von Privatkunden in rechtlichen Fragen."
                },
                "service3": {
                    "title": "Strafrecht",
                    "description": "Beratung und Vertretung in Strafuntersuchungen und -verfahren."
                },
                "service4": {
                    "title": "Strategische Prozessführung",
                    "description": "Beratung und Vertretung bei strategischen Prozessen in den Bereichen Ökologie und Grundrechte."
                }
            },
            "contact": {
                "heading": "Kontakt",
                "addressLabel": "Postadresse",
                "addressPlaceholder": "4052 Basel. 8032 Zürich. Schweiz",
                "emailLabel": "E-Mail",
                "emailPlaceholder": "jh@jonashertner.com"
            },
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
                if (text && text[k]) {
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
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');

        // Store selected language in localStorage
        localStorage.setItem('language', lang);

        // Update the lang attribute on the html tag
        document.documentElement.lang = lang;
    }

    // Function to adjust navbar style based on current section
    function adjustNavbarStyle(currentSection = 'home') {
        if (currentSection === 'home') {
            navbar.classList.remove('dark'); // Light navbar for home
        } else {
            navbar.classList.add('dark'); // Dark navbar for other sections
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

    /* 
    * Removed all menu-related JavaScript since the navigation menu is no longer present.
    * This includes the toggleMenu and closeMenu functions, as well as any event listeners related to the menu.
    */

});
