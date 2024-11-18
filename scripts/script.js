// script.js

// Menu Functions
function openMenu() {
    document.getElementById('menu').style.display = 'block';
    document.body.classList.add('menu-opened'); // Add class to body
}

function closeMenu() {
    document.getElementById('menu').style.display = 'none';
    document.body.classList.remove('menu-opened'); // Remove class from body
}

// Typing Effect Function
function typeWriter(element, text, i, callback, showCursor) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + (showCursor ? '<span class="cursor"></span>' : '');
        setTimeout(function () {
            typeWriter(element, text, i + 1, callback, showCursor);
        }, 50); // Increased speed: 50ms per character
    } else {
        element.innerHTML = text + (showCursor ? '<span class="cursor"></span>' : '');
        if (typeof callback === 'function') {
            callback();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const dateElement = document.getElementById('current-date');
    const phraseElement = document.getElementById('phrase');
    const isLandingPage = document.querySelector('.index-page-content') !== null;

    if (isLandingPage && dateElement && phraseElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const lang = document.documentElement.lang || 'de';

        const dateString = (lang === 'de') ?
            'Zürich/Basel, ' + today.toLocaleDateString(lang + '-' + lang.toUpperCase(), options) :
            'Zurich/Basel, ' + today.toLocaleDateString(lang + '-' + lang.toUpperCase(), options);

        const phrase = (lang === 'de') ? 'Im Namen meines Mandanten' : 'On behalf of my client';

        // Type the date first
        typeWriter(dateElement, dateString, 0, function () {
            // Type the phrase with cursor blinking after completion
            typeWriter(phraseElement, phrase, 0, null, true);
        }, false);
    }
});
