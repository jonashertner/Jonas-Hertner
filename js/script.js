// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select essential DOM elements
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar-links a');
    const languageButtons = document.querySelectorAll('.language-switcher .lang-btn');

    // Function to toggle the mobile menu
    function toggleMenu() {
        const isOpen = toggleButton.classList.toggle('open');
        navbarLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open', isOpen); // Prevent body scrolling
        toggleButton.setAttribute('aria-expanded', isOpen);
        console.log('Menu toggled:', isOpen ? 'Open' : 'Closed');
    }

    // Function to close the mobile menu
    function closeMenu() {
        if (toggleButton.classList.contains('open')) {
            toggleButton.classList.remove('open');
            navbarLinks.classList.remove('active');
            document.body.classList.remove('menu-open'); // Allow body scrolling
            toggleButton.setAttribute('aria-expanded', 'false');
            console.log('Menu closed');
        }
    }

    // Event listener for the toggle button
    toggleButton.addEventListener('click', toggleMenu);

    // Content Object (English and German translations)
    const content = {
        "en": {
            "nav": {
                "home": "Home",
                "about": "Jonas Hertner",
                "services": "Expertise",
                "contact": "Contact"
            },
            "hero": {
                "title": "Jonas Hertner",
                "subtitle": "LEGAL COUNSEL"
            },
            "about": {
                "heading": "About Jonas Hertner",
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
                "addressLabel": "Mail address",
                "addressPlaceholder": "4051 Basel. 8032 Zurich.",
                "emailLabel": "Email",
                "emailPlaceholder": "jh@jonashertner.com"
            },
        },
        "de": {
            "nav": {
                "home": "Home",
                "about": "Jonas Hertner",
                "services": "Expertise",
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

    // Function to close the mobile menu if it's open
    function closeMenuIfOpen() {
        if (navbarLinks.classList.contains('active')) {
            closeMenu();
        }
    }

    // Event listeners for language buttons
    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id === 'lang-en' ? 'en' : 'de';
            changeLanguage(lang);
            closeMenuIfOpen();
        });
    });

    // Load language on page load
    const storedLang = localStorage.getItem('language') || 'en';
    changeLanguage(storedLang);
    adjustNavbarStyle('home'); // Set initial navbar style

    // Ensure the menu is closed on page load
    closeMenu();

    // Intersection Observer for Active Navigation Link and Navbar Style
    const options = {
        root: null, // Observe relative to the viewport
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section is visible
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });

                // Adjust navbar style based on current section
                adjustNavbarStyle(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Function to adjust navbar style based on current section
    function adjustNavbarStyle(currentSection = 'home') {
        if (currentSection === 'home') {
            navbar.classList.remove('dark'); // White text and transparent background
        } else {
            navbar.classList.add('dark'); // Black text and white background
        }
    }

    // Add individual event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Add individual event listeners to each language button (optional)
    // (Already handled above)
});
