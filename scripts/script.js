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
    const pencilColor = '#b000'; // Pencil color
    const points = []; // Store recent pointer positions for smoothing

    svg.addEventListener('pointerdown', (event) => {
        isDrawing = true;
        points.length = 0; // Reset points for a new path

        currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        currentPath.setAttribute('fill', 'none');
        currentPath.setAttribute('stroke', pencilColor); // Explicitly set pencil color
        currentPath.setAttribute('stroke-width', '2'); // Pencil thickness
        currentPath.setAttribute('stroke-linecap', 'round');
        currentPath.setAttribute('stroke-linejoin', 'round'); // Smooth joins between path segments
        svg.appendChild(currentPath);

        const { clientX, clientY } = event;
        points.push({ x: clientX, y: clientY });
        currentPath.setAttribute('d', `M${clientX},${clientY}`);
    });

    svg.addEventListener('pointermove', (event) => {
        if (!isDrawing) return;

        const { clientX, clientY } = event;
        points.push({ x: clientX, y: clientY });

        // Apply a more refined smoothing using a weighted average of the last points
        if (points.length > 5) points.shift(); // Limit stored points to the last 5

        const smoothedPath = smoothPath(points);
        currentPath.setAttribute('d', smoothedPath);
    });

    svg.addEventListener('pointerup', () => {
        isDrawing = false;
    });

    svg.addEventListener('pointerleave', () => {
        isDrawing = false;
    });

    /**
     * Generates a smoothed SVG path string from points
     * @param {Array} points - Array of {x, y} objects
     * @returns {string} - Smoothed SVG path
     */
    function smoothPath(points) {
        if (points.length < 2) return ''; // Not enough points to form a path

        const path = [`M${points[0].x},${points[0].y}`]; // Move to the first point

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            path.push(`Q${points[i].x},${points[i].y} ${xc},${yc}`);
        }

        // Add the last line to the final point
        const last = points[points.length - 1];
        path.push(`L${last.x},${last.y}`);

        return path.join(' ');
    }
});
