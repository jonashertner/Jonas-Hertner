document.addEventListener('DOMContentLoaded', () => {
    // Disable text selection globally
    document.body.addEventListener('selectstart', (e) => e.preventDefault());

    // Typing Animation
    const dateElement = document.getElementById('current-date');
    const phraseElement = document.getElementById('phrase');

    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const lang = document.documentElement.lang || 'de';

    const dateString = lang === 'de'
        ? `Jonas Hertner – Zürich/Basel, ${today.toLocaleDateString('de-DE', options)}`
        : `Jonas Hertner – Zurich/Basel, ${today.toLocaleDateString('en-US', options)}`;

    const phrase = lang === 'de' ? 'Im Namen meines Mandanten' : 'On behalf of my client';

    function typeWriter(element, text, i, callback) {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            setTimeout(() => typeWriter(element, text, i + 1, callback), 50);
        } else if (callback) {
            callback();
        }
    }

    function addBlinkingCursor(element) {
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        element.appendChild(cursor);
    }

    typeWriter(dateElement, dateString, 0, () => {
        typeWriter(phraseElement, phrase, 0, () => {
            addBlinkingCursor(phraseElement);
        });
    });

    // Menu Toggle
    window.toggleMenu = function () {
        const menu = document.getElementById('menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };

    // Drawing Functionality
    const svg = document.querySelector('.drawing-canvas');
    let isDrawing = false;
    let currentPath;

    svg.addEventListener('pointerdown', (event) => {
        isDrawing = true;

        currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        currentPath.setAttribute('fill', 'none');
        currentPath.setAttribute('stroke', '#000'); // Pencil color
        currentPath.setAttribute('stroke-width', '2'); // Pencil thickness
        currentPath.setAttribute('stroke-linecap', 'round');
        svg.appendChild(currentPath);

        const { clientX, clientY } = event;
        currentPath.setAttribute('d', `M${clientX},${clientY}`);
    });

    svg.addEventListener('pointermove', (event) => {
        if (!isDrawing) return;

        const { clientX, clientY } = event;
        const d = currentPath.getAttribute('d');
        currentPath.setAttribute('d', `${d} L${clientX},${clientY}`);
    });

    svg.addEventListener('pointerup', () => {
        isDrawing = false;
    });

    svg.addEventListener('pointerleave', () => {
        isDrawing = false;
    });
});
