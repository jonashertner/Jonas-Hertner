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
    trapFocus();
}

// Function to close the mobile menu
function closeMenu() {
    if (toggleButton.classList.contains('open')) {
        toggleButton.classList.remove('open');
        navbarLinks.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        console.log('Menu closed');
        trapFocus();
    }
}

// Function to trap focus within the menu for accessibility
function trapFocus() {
    const focusableElements = navbarLinks.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        } else if (e.key === 'Escape') {
            closeMenu();
            toggleButton.focus();
        }
    }

    if (navbarLinks.classList.contains('active')) {
        document.addEventListener('keydown', handleFocus);
    } else {
        document.removeEventListener('keydown', handleFocus);
    }
}

// Event listener for the toggle button
toggleButton.addEventListener('click', toggleMenu);

// Function to adjust font size to fit content within viewport
function adjustFontSizeToFit(sectionId, minFontSize = 10, maxFontSize = 18) {
    const section = document.getElementById(sectionId);
    const content = section.querySelector('.section-content');

    if (!content) return;

    // Reset font size
    content.style.fontSize = maxFontSize + 'px';

    // Get the available height
    const viewportHeight = window.innerHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
    const footerHeight = document.querySelector('footer').offsetHeight || 0;
    const sectionPaddingTop = parseFloat(window.getComputedStyle(section).paddingTop);
    const sectionPaddingBottom = parseFloat(window.getComputedStyle(section).paddingBottom);
    const availableHeight = viewportHeight - navbarHeight - footerHeight - sectionPaddingTop - sectionPaddingBottom;

    let contentHeight = content.scrollHeight;

    let fontSize = maxFontSize;

    // Decrease font size until content fits or reaches minimum font size
    while (contentHeight > availableHeight && fontSize > minFontSize) {
        fontSize -= 0.5;
        content.style.fontSize = fontSize + 'px';
        contentHeight = content.scrollHeight;
    }
}

// Function to adjust all sections
function adjustSectionsFontSize() {
    adjustFontSizeToFit('about', 10, 18);
    adjustFontSizeToFit('services', 10, 18);
    adjustFontSizeToFit('contact', 10, 18);
}

function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('resize', debounce(adjustSectionsFontSize));


// Content Object (English and German translations)
const content = {
    "en": { /* ... existing content ... */ },
    "de": { /* ... existing content ... */ }
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

    // Adjust font size after language change
    adjustSectionsFontSize();
}

// Event listeners for language buttons
document.getElementById('lang-en').addEventListener('click', () => {
    changeLanguage('en');
    // Close the mobile menu if it's open
    if (navbarLinks.classList.contains('active')) {
        closeMenu();
    }
});

document.getElementById('lang-de').addEventListener('click', () => {
    changeLanguage('de');
    // Close the mobile menu if it's open
    if (navbarLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Load language on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('language') || 'en';
    changeLanguage(storedLang);
    adjustNavbarStyle('home'); // Set initial navbar style

    // Ensure the menu is closed on page load
    closeMenu();
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
            closeMenu();
        }
    });
});

// Footer Visibility Based on Contact Section
const contactSection = document.querySelector('#contact');
const footer = document.querySelector('footer');

// Adjusted Intersection Observer Options
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
        // Adjust font size when footer visibility changes
        adjustSectionsFontSize();
    });
};


// Create the observer
const contactObserver = new IntersectionObserver(contactCallback, contactOptions);

// Observe the Contact section
if (contactSection) {
    contactObserver.observe(contactSection);
}

// Optional: Close the menu when scrolling
window.addEventListener('scroll', debounce(() => {
    if (navbarLinks.classList.contains('active')) {
        closeMenu();
    }
}, 200));
