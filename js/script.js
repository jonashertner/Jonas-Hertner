// script.js

// Toggle Navigation Menu (for mobile view)
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

// Function to toggle the mobile menu
function toggleMenu() {
    const isOpen = toggleButton.classList.toggle('open');
    navbarLinks.classList.toggle('active');
    toggleButton.setAttribute('aria-expanded', isOpen);
    console.log('Menu toggled:', isOpen ? 'Open' : 'Closed');
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
            "addressLabel": "Address",
            "addressPlaceholder": "",
            "emailLabel": "Email",
            "emailPlaceholder": "jh@jonashertner.com"
        },
        "footer": {
            "text": "© 2024 Jonas Hertner. All rights reserved."
        },
        "btn": {
            "learnMore": "Learn More"
        }
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
            "addressLabel": "Adresse",
            "addressPlaceholder": "",
            "emailLabel": "E-Mail:",
            "emailPlaceholder": "jh@jonashertner.com"
        },
        "footer": {
            "text": "© 2024 Jonas Hertner. Alle Rechte vorbehalten."
        },
        "btn": {
            "learnMore": "Mehr erfahren"
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
    document.querySelectorAll('.lang-btn').forEach(btn => {
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

// Event listeners for language buttons
document.getElementById('lang-en').addEventListener('click', () => {
    changeLanguage('en');
    // Close the mobile menu if it's open
    if (navbarLinks.classList.contains('active')) {
        toggleMenu();
    }
});

document.getElementById('lang-de').addEventListener('click', () => {
    changeLanguage('de');
    // Close the mobile menu if it's open
    if (navbarLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Load language on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('language') || 'en';
    changeLanguage(storedLang);
    adjustNavbarStyle('home'); // Set initial navbar style

    // Ensure the menu is closed on page load
    navbarLinks.classList.remove('active');
    toggleButton.classList.remove('open');
    toggleButton.setAttribute('aria-expanded', 'false');
});

// Intersection Observer for Active Navigation Link and Navbar Style
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar-links a');
const navbar = document.querySelector('.navbar');

// Options for the observer
const options = {
    root: null, // Observe relative to the viewport
    rootMargin: '0px',
    threshold: 0.6 // 60% of the section is visible
};

// Callback for the observer
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

// Create the observer
const observer = new IntersectionObserver(callback, options);

// Observe each section
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

// Automatically close the mobile menu when a menu item is clicked
document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Footer Visibility Based on Contact Section
const contactSection = document.querySelector('#contact');
const footer = document.querySelector('footer');

// Options for the observer
const contactOptions = {
    root: null, // Relative to the viewport
    rootMargin: '0px',
    threshold: 0.8 // 80% of the Contact section is visible
};

// Callback for the observer
const contactCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Show the footer
            footer.classList.add('active');
        } else {
            // Hide the footer
            footer.classList.remove('active');
        }
    });
};

// Create the observer
const contactObserver = new IntersectionObserver(contactCallback, contactOptions);

// Observe the Contact section
if (contactSection) {
    contactObserver.observe(contactSection);
}
