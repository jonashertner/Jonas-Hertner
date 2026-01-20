/**
 * Subtle Particle Field Effect
 * A minimalist, elegant particle animation using Three.js
 * Responds to scroll and mouse movement
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    particleCount: 80,
    particleSize: 1.5,
    fieldWidth: 35,
    fieldHeight: 25,
    fieldDepth: 15,
    moveSpeed: 0.0003,
    mouseInfluence: 0.00008,
    scrollInfluence: 0.0002,
    connectionDistance: 5,
    connectionOpacity: 0.08
  };

  // State
  let scene, camera, renderer, particles, lines;
  let mouseX = 0, mouseY = 0;
  let scrollY = 0;
  let animationId = null;
  let isReducedMotion = false;

  // Check for reduced motion preference
  function checkReducedMotion() {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Initialize Three.js scene
  function init() {
    checkReducedMotion();

    if (isReducedMotion) {
      return; // Don't initialize if user prefers reduced motion
    }

    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    camera.position.z = 20;

    // Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create particles
    createParticles();

    // Event listeners
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reduced motion media query listener
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkReducedMotion);

    // Start animation
    animate();
  }

  function createParticles() {
    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const velocities = [];

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * CONFIG.fieldWidth;
      positions[i3 + 1] = (Math.random() - 0.5) * CONFIG.fieldHeight;
      positions[i3 + 2] = (Math.random() - 0.5) * CONFIG.fieldDepth;

      velocities.push({
        x: (Math.random() - 0.5) * CONFIG.moveSpeed,
        y: (Math.random() - 0.5) * CONFIG.moveSpeed,
        z: (Math.random() - 0.5) * CONFIG.moveSpeed
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.velocities = velocities;

    // Get current theme
    const isDark = document.documentElement.dataset.theme === 'dark' ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches &&
       document.documentElement.dataset.theme !== 'light');

    // Particle material - monochrome dots
    const material = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x1a1a1a,
      size: CONFIG.particleSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create connection lines geometry
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(CONFIG.particleCount * CONFIG.particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0xffffff : 0x1a1a1a,
      transparent: true,
      opacity: CONFIG.connectionOpacity
    });

    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
  }

  function updateParticles() {
    if (!particles) return;

    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.velocities;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;

      // Apply velocity
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;

      // Mouse influence
      positions[i3] += mouseX * CONFIG.mouseInfluence;
      positions[i3 + 1] += mouseY * CONFIG.mouseInfluence;

      // Scroll influence - subtle vertical drift
      positions[i3 + 1] -= scrollY * CONFIG.scrollInfluence * 0.001;

      // Boundary check with soft wrapping
      const hw = CONFIG.fieldWidth / 2;
      const hh = CONFIG.fieldHeight / 2;
      const hd = CONFIG.fieldDepth / 2;

      if (positions[i3] > hw) positions[i3] = -hw;
      if (positions[i3] < -hw) positions[i3] = hw;
      if (positions[i3 + 1] > hh) positions[i3 + 1] = -hh;
      if (positions[i3 + 1] < -hh) positions[i3 + 1] = hh;
      if (positions[i3 + 2] > hd) positions[i3 + 2] = -hd;
      if (positions[i3 + 2] < -hd) positions[i3 + 2] = hd;
    }

    particles.geometry.attributes.position.needsUpdate = true;
  }

  function updateConnections() {
    if (!lines || !particles) return;

    const positions = particles.geometry.attributes.position.array;
    const linePositions = lines.geometry.attributes.position.array;
    let lineIndex = 0;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;

      for (let j = i + 1; j < CONFIG.particleCount; j++) {
        const j3 = j * 3;

        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < CONFIG.connectionDistance && lineIndex < linePositions.length - 6) {
          linePositions[lineIndex++] = positions[i3];
          linePositions[lineIndex++] = positions[i3 + 1];
          linePositions[lineIndex++] = positions[i3 + 2];
          linePositions[lineIndex++] = positions[j3];
          linePositions[lineIndex++] = positions[j3 + 1];
          linePositions[lineIndex++] = positions[j3 + 2];
        }
      }
    }

    // Clear remaining line positions
    for (let i = lineIndex; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    lines.geometry.attributes.position.needsUpdate = true;
  }

  function animate() {
    if (isReducedMotion) {
      return;
    }

    animationId = requestAnimationFrame(animate);

    updateParticles();
    updateConnections();

    // Subtle rotation based on scroll
    if (particles) {
      particles.rotation.y = scrollY * 0.0001;
      particles.rotation.x = scrollY * 0.00005;
    }
    if (lines) {
      lines.rotation.y = scrollY * 0.0001;
      lines.rotation.x = scrollY * 0.00005;
    }

    renderer.render(scene, camera);
  }

  function onResize() {
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX - window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2);
  }

  function onScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  }

  // Update colors when theme changes
  function updateThemeColors(isDark) {
    if (!particles || !lines) return;

    const color = isDark ? 0xffffff : 0x1a1a1a;
    particles.material.color.setHex(color);
    lines.material.color.setHex(color);
  }

  // Export for theme toggle
  window.updateParticleTheme = updateThemeColors;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
