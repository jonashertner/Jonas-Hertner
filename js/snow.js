/**
 * Snow overlay (heavy + beautiful) — sprite-based animation per user request
 * - Full-viewport fixed canvas, pointer-events: none (CSS)
 * - Icon-only toggle button (#snow-toggle) controls on/off
 * - Persists state in localStorage
 * - Respects prefers-reduced-motion (disables toggle)
 */
(function () {
  const STORAGE_KEY = 'snowEnabled';

  const prefersReducedMotionSnow =
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  // --- Snow density ramp (dreamy constant motion; only density changes) ---
  // Tune these to taste.
  const SNOW_RAMP_UP_SECONDS = 26;   // how long until full density
  const SNOW_RAMP_DOWN_SECONDS = 7;  // how long to ramp density down after toggle-off (shorter = snappier stop)
  const SNOW_START_DENSITY = 0.09;   // 0..1 starting density (few flakes)
  const SNOW_RESUME_PRESERVE_MS = 1400; // quick off->on keeps current flakes for a smoother transition

  let snowCanvas = null;
  let snowCtx = null;
  let snowRaf = 0;
  let snowFlakes = [];
  let snowSprites = null; // offscreen sprites for speed
  let snowLastT = 0;
  let snowStartT = 0;
  let snowStopT = 0;
  let snowStartDensity = SNOW_START_DENSITY;
  let snowWind = 0.0;
  let snowWindTarget = 0.0;
  let snowStopping = false;
  let snowTearingDown = false;
  let snowTeardownTimer = 0;

  // --- Tilt-to-gravity (mobile): make snow fall "down" relative to real gravity ---
  let tiltEnabled = false;
  let tiltTargetX = 0;
  let tiltTargetY = 1;
  let tiltX = 0;
  let tiltY = 1;
  let tiltLastUpdateT = 0;

  // --- Snow pile (last section) ---
  let pileSection = null;
  let pileBins = null; // Float32Array heights in px
  let pileBinCount = 0;
  let pileMaxPx = 0;
  let pileShake = 0; // 0..1 animation intensity
  let pileClear = 0; // 0..1 clear animation progress
  let pileRO = null;

  onReady(init);

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function init() {
    const snowBtn = ensureToggleButton();
    if (!snowBtn) return;

    if (prefersReducedMotionSnow) {
      snowBtn.disabled = true;
      snowBtn.title = 'Disabled (Reduce Motion enabled)';
      return;
    }

    initPileIfPossible();

    // Do NOT auto-start snow on page load.
    // Snow should only start via an explicit user toggle.
    snowBtn.setAttribute('aria-pressed', 'false');
    try { localStorage.setItem(STORAGE_KEY, '0'); } catch {}

    snowBtn.addEventListener('click', () => {
      const isOn = !!snowCanvas;
      // If we are currently "draining" (stopping from top), clicking again must restore full intensity.
      // Otherwise we'd keep many flakes marked dead and the snow would look weaker.
      if (isOn && (snowStopping || snowTearingDown)) {
        // Smooth resume: cancel any pending teardown/fade-out and restart the ramp.
        resumeSnow();
        snowBtn.setAttribute('aria-pressed', 'true');
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
        return;
      }

      if (isOn) requestStopSnow();
      else startSnow();

      const next = (!isOn).toString();
      snowBtn.setAttribute('aria-pressed', next);
      try { localStorage.setItem(STORAGE_KEY, !isOn ? '1' : '0'); } catch {}

      // iOS motion permission is user-gesture gated; attempt once on first interaction.
      maybeEnableTiltControls();
      maybeEnableShakeControls();
    });
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function ensureToggleButton() {
    let btn = document.getElementById('snow-toggle');
    if (btn) return btn;

    btn = document.createElement('button');
    btn.id = 'snow-toggle';
    btn.className = 'lang-btn snow-toggle';
    btn.setAttribute('aria-label', 'Toggle snow');
    btn.setAttribute('aria-pressed', 'false');
    document.body.appendChild(btn);
    return btn;
  }

  function makeSnowSprites() {
    // Pre-render a few soft flakes for performance
    const sizes = [6, 10, 14];
    const sprites = sizes.map((s) => {
      const c = document.createElement('canvas');
      const dpr = 1;
      c.width = s * 2 * dpr;
      c.height = s * 2 * dpr;
      const ctx = c.getContext('2d');
      if (!ctx) return { canvas: c, r: s };

      const r = s;
      const g = ctx.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0, 'rgba(255,255,255,0.95)');
      g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);
      return { canvas: c, r };
    });
    return sprites;
  }

  function setSnowSize() {
    if (!snowCanvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const vw = window.visualViewport?.width || window.innerWidth;
    const vh = window.visualViewport?.height || window.innerHeight;
    snowCanvas.width = Math.max(1, Math.floor(vw * dpr));
    snowCanvas.height = Math.max(1, Math.floor(vh * dpr));
    snowCanvas.style.width = '100%';
    snowCanvas.style.height = '100%';
    snowCtx = snowCanvas.getContext('2d');
    if (snowCtx) snowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function buildSnowFlakes() {
    const w = window.visualViewport?.width || window.innerWidth;
    const h = window.visualViewport?.height || window.innerHeight;
    // Heavy snow: density scales with screen area, capped for perf.
    const target = Math.round(clamp((w * h) / 1400, 420, 980));
    snowFlakes = new Array(target).fill(0).map(() => {
      const depth = Math.random(); // 0..1
      const size = 0.6 + depth * 1.6;
      // Dreamy: slower fall + layered by depth (constant over time)
      const speed = 18 + depth * 120;
      return {
        x: Math.random() * w,
        // Start from the top: spawn above viewport and let flakes naturally enter
        y: -40 - Math.random() * (h + 140),
        r: size,
        baseVy: speed,
        baseVx: (Math.random() * 10 - 5) * (0.22 + depth * 0.75),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.26 + Math.random() * 0.75,
        baseAlpha: 0.10 + depth * 0.28,
        // Each flake gets a "when do I join" threshold along the ramp.
        // This lets the scene start sparse and grow denser naturally.
        birth: Math.random(),
        active: false,
        seen: false,
        dead: false,
      };
    });
  }

  function snowEase01(t) {
    // smoothstep (0..1)
    const x = clamp(t, 0, 1);
    return x * x * (3 - 2 * x);
  }

  function getSnowDensity(nowT) {
    // 0..1 density factor; only affects how many flakes are active/respawning
    if (!snowStartT) return 1;

    // While stopping: ramp density down smoothly toward 0.
    if (snowStopping) {
      if (!snowStopT) return 0;
      const elapsed = Math.max(0, (nowT - snowStopT) / 1000);
      const ramp = elapsed / SNOW_RAMP_DOWN_SECONDS;
      const eased = snowEase01(ramp);
      return clamp(1 - eased, 0, 1);
    }

    // While starting: ramp density up from a low initial density.
    const elapsed = Math.max(0, (nowT - snowStartT) / 1000);
    const ramp = elapsed / SNOW_RAMP_UP_SECONDS;
    const eased = snowEase01(ramp);
    return clamp(snowStartDensity + (1 - snowStartDensity) * eased, 0, 1);
  }

  function snowTick(t) {
    if (!snowCanvas || !snowCtx) return;
    snowRaf = requestAnimationFrame(snowTick);

    // Use the actual canvas box as our coordinate space (mobile visual viewport can differ from window.innerHeight)
    const canvasRect = snowCanvas.getBoundingClientRect();
    const w = snowCanvas.clientWidth || (window.visualViewport?.width || window.innerWidth);
    const h = snowCanvas.clientHeight || (window.visualViewport?.height || window.innerHeight);
    const dt = Math.min(0.05, (t - (snowLastT || t)) / 1000);
    snowLastT = t;

    const density = getSnowDensity(t); // 0..1

    // Smooth gravity direction (when tilt is enabled)
    const k = 1 - Math.exp(-dt * 7.5);
    tiltX += (tiltTargetX - tiltX) * k;
    tiltY += (tiltTargetY - tiltY) * k;
    const gMag = Math.hypot(tiltX, tiltY) || 1;
    const gdx = tiltX / gMag;
    const gdy = tiltY / gMag;
    // Perpendicular to gravity (used for wind + wobble so the snow "dances" around the fall direction)
    const pdx = -gdy;
    const pdy = gdx;

    // Constant dreamy wind (does NOT intensify over time)
    if (Math.random() < 0.006) snowWindTarget = (Math.random() * 2 - 1) * 22;
    snowWind += (snowWindTarget - snowWind) * 0.010;

    const ctx = snowCtx;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    const sprites = snowSprites || (snowSprites = makeSnowSprites());

    // Subtle overall haze
    ctx.save();
    ctx.globalAlpha = 0.045;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    let alive = 0;
    const margin = 90;
    for (let i = 0; i < snowFlakes.length; i++) {
      const f = snowFlakes[i];
      if (f.dead) continue;

       // Ramp in: keep flakes "inactive" until their birth threshold is reached.
      if (!f.active && !snowStopping) {
        if (density < f.birth) continue;
        // Activate and (re)spawn from above so they enter naturally.
        f.active = true;
        respawnFlakeAtEdge(f, w, h, gdx, gdy, margin);
      }
      // When stopping, we do NOT activate new flakes.
      // Only flakes that were already seen on-screen should be allowed to finish falling.

      f.wobble += f.wobbleSpeed * dt;

      // Constant dreamy motion (no acceleration over time)
      const vy = f.baseVy;
      const lateral = (f.baseVx + snowWind * (0.18 + f.r * 0.22));
      const wobble = Math.sin(f.wobble) * (8.5 * f.r);
      // Gravity-directed fall + dreamy lateral motion perpendicular to gravity
      f.x += (gdx * vy + pdx * (lateral + wobble)) * dt;
      f.y += (gdy * vy + pdy * (lateral + wobble)) * dt;

      // Pile-up behavior in last section: flakes that reach the "snow drift" get absorbed.
      if (pileSection && pileBins) {
        const rect = pileSection.getBoundingClientRect();
        // Convert rect into snow-canvas-local coordinates
        const rectTopInCanvas = rect.top - canvasRect.top;
        const rectLeftInCanvas = rect.left - canvasRect.left;
        const rectBottomInCanvas = rectTopInCanvas + rect.height;
        if (rectBottomInCanvas > 0 && rectTopInCanvas < h) {
          const localY = f.y - rectTopInCanvas;
          const localX = f.x - rectLeftInCanvas;
          if (localY >= 0 && localY <= rect.height && localX >= 0 && localX <= rect.width) {
            const bin = pileBinCount > 0 ? clamp(Math.floor((localX / rect.width) * pileBinCount), 0, pileBinCount - 1) : 0;
            const pileHere = pileBins[bin] || 0;
            const groundY = rect.height - pileHere - 10;
            if (localY >= groundY) {
              // absorb + add snow (spread a little to neighbors)
              const add = 0.25 + f.r * 0.85;
              addToPile(bin, add);
              // respawn at top unless we're draining/stopping
              if (snowStopping) {
                // During ramp-down, progressively stop respawning based on density.
                // Natural: flakes disappear only after falling out, not mid-air.
                if (density > f.birth) {
                  respawnFlakeAtEdge(f, w, h, gdx, gdy, margin);
                } else {
                  f.dead = true;
                }
              } else {
                respawnFlakeAtEdge(f, w, h, gdx, gdy, margin);
              }
              continue;
            }
          }
        }
      }

      // Wrap
      if (f.x < -margin || f.x > w + margin || f.y < -margin || f.y > h + margin) {
        if (snowStopping) {
          // Ramp down density: allow fewer flakes to respawn, until none do.
          if (density > f.birth) {
            respawnFlakeAtEdge(f, w, h, gdx, gdy, margin);
          } else {
            f.dead = true;
          }
          continue;
        } else {
          respawnFlakeAtEdge(f, w, h, gdx, gdy, margin);
        }
      }

      // pick sprite by size
      const sIdx = f.r < 1.0 ? 0 : (f.r < 1.6 ? 1 : 2);
      const spr = sprites[sIdx];
      const drawR = spr.r * (0.7 + f.r * 0.6);
      ctx.globalAlpha = f.baseAlpha;
      ctx.drawImage(spr.canvas, f.x - drawR, f.y - drawR, drawR * 2, drawR * 2);
      f.seen = true;
      alive++;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    if (snowStopping && alive === 0) {
      // Once the last visible flake has drained out, fade and tear down.
      finishStopSnow();
    }

    // Render pile (if present)
    tickAndRenderPile(dt, snowCtx, canvasRect);
  }

  function startSnow() {
    if (prefersReducedMotionSnow) return;
    if (snowCanvas) {
      // If we already have a canvas (including mid-fade), reuse it for smoother rapid toggles.
      resumeSnow();
      return;
    }
    snowCanvas = document.createElement('canvas');
    snowCanvas.id = 'snow-canvas';
    document.body.appendChild(snowCanvas);
    // hook into existing CSS fade-in
    requestAnimationFrame(() => snowCanvas && snowCanvas.classList.add('is-on'));
    setSnowSize();
    buildSnowFlakes();
    snowLastT = 0;
    snowStartT = performance.now();
    snowStopT = 0;
    snowStartDensity = SNOW_START_DENSITY;
    snowWind = 0;
    snowWindTarget = 0;
    snowStopping = false;
    snowRaf = requestAnimationFrame(snowTick);
    window.addEventListener('resize', onSnowResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onSnowResize, { passive: true });

    // Ensure pile visuals are ready when snow starts
    initPileIfPossible();
  }

  function resumeSnow() {
    if (!snowCanvas) return;
    const now = performance.now();

    if (snowTeardownTimer) {
      clearTimeout(snowTeardownTimer);
      snowTeardownTimer = 0;
    }
    snowCanvas.classList.add('is-on'); // if we were fading out, fade back in smoothly

    // If user toggles back on quickly while stopping, preserve current flakes
    // and just reverse the density curve from the current point (feels hyper-natural).
    const canPreserve =
      (snowStopping || snowTearingDown) &&
      snowStopT &&
      (now - snowStopT) < SNOW_RESUME_PRESERVE_MS &&
      snowFlakes &&
      snowFlakes.length > 0;

    const currentDensity = getSnowDensity(now);

    snowTearingDown = false;
    snowStopping = false;
    snowStopT = 0;
    snowStartDensity = clamp(currentDensity, SNOW_START_DENSITY, 1);
    snowStartT = now;

    setSnowSize();
    if (!canPreserve) {
      buildSnowFlakes();
    }
    snowLastT = 0;
    snowWind = 0;
    snowWindTarget = 0;

    // Ensure animation is running (rapid off->on can otherwise leave us with no RAF)
    if (!snowRaf) snowRaf = requestAnimationFrame(snowTick);
    window.addEventListener('resize', onSnowResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onSnowResize, { passive: true });
    initPileIfPossible();
  }

  function requestStopSnow() {
    if (!snowCanvas) return;
    // Ramp down density then drain: fewer and fewer flakes respawn until none do,
    // then wait until the last flake has fallen out.
    snowStopping = true;
    snowStopT = performance.now();
    snowStartDensity = 1;
    snowTearingDown = false;
    if (snowTeardownTimer) {
      clearTimeout(snowTeardownTimer);
      snowTeardownTimer = 0;
    }
    window.removeEventListener('resize', onSnowResize);
    window.visualViewport?.removeEventListener('resize', onSnowResize);
  }

  function finishStopSnow() {
    if (!snowCanvas) return;
    cancelAnimationFrame(snowRaf);
    snowRaf = 0;

    const c = snowCanvas;
    snowTearingDown = true;
    c.classList.remove('is-on');
    if (snowTeardownTimer) clearTimeout(snowTeardownTimer);
    snowTeardownTimer = setTimeout(() => {
      // If snow was re-enabled mid-fade, do nothing.
      if (snowCanvas !== c) return;
      if (!snowTearingDown) return;
      c.remove();

      // Full cleanup only after removal for smoother rapid toggles.
      snowCanvas = null;
      snowCtx = null;
      snowFlakes = [];
      snowSprites = null;
      snowLastT = 0;
      snowStartT = 0;
      snowStopT = 0;
      snowStopping = false;
      snowTearingDown = false;
      snowTeardownTimer = 0;
    }, 2800);
  }

  function onSnowResize() {
    if (!snowCanvas) return;
    setSnowSize();
    buildSnowFlakes();
    resizePileCanvas();
  }

  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  function respawnFlakeAtEdge(f, w, h, fallX, fallY, margin) {
    // Spawn just outside the viewport on the "upstream" edge of the fall direction.
    const ax = Math.abs(fallX);
    const ay = Math.abs(fallY);
    if (ax > ay) {
      // Mostly horizontal fall
      f.x = fallX > 0 ? -margin : w + margin;
      f.y = Math.random() * h;
    } else {
      // Mostly vertical fall
      f.y = fallY > 0 ? -margin : h + margin;
      f.x = Math.random() * w;
    }
  }

  // -------------------------------
  // Snow pile implementation
  // -------------------------------
  function initPileIfPossible() {
    // Only on the main one-page layout where #jh exists
    pileSection = document.getElementById('jh');
    if (!pileSection) return;

    pileSection.classList.add('has-snow-pile');

    if (!pileRO && 'ResizeObserver' in window) {
      pileRO = new ResizeObserver(() => resizePileCanvas());
      pileRO.observe(pileSection);
    }
    resizePileCanvas();
    if (!pileBins) resetPile();
  }

  function resizePileCanvas() {
    if (!pileSection) return;
    const r = pileSection.getBoundingClientRect();
    // choose bin count based on section width in CSS pixels
    const wCss = Math.max(1, r.width);
    pileBinCount = clamp(Math.round(wCss / 6), 80, 220);
    pileMaxPx = clamp(Math.round(r.height * 0.28), 90, 220);
    if (!pileBins || pileBins.length !== pileBinCount) {
      pileBins = new Float32Array(pileBinCount);
    }
  }

  function resetPile() {
    if (!pileBins) return;
    pileBins.fill(0);
    pileShake = 0;
    pileClear = 0;
  }

  function addToPile(bin, amountPx) {
    if (!pileBins) return;
    const spread = 3;
    for (let k = -spread; k <= spread; k++) {
      const idx = bin + k;
      if (idx < 0 || idx >= pileBins.length) continue;
      const w = 1 - Math.abs(k) / (spread + 0.01);
      pileBins[idx] = Math.min(pileMaxPx, pileBins[idx] + amountPx * w * 0.28);
    }

    // Gentle smoothing to keep it fluffy
    if (Math.random() < 0.35) smoothPileOnce();
  }

  function smoothPileOnce() {
    if (!pileBins || pileBins.length < 3) return;
    const tmp = new Float32Array(pileBins.length);
    tmp[0] = pileBins[0];
    tmp[tmp.length - 1] = pileBins[tmp.length - 1];
    for (let i = 1; i < pileBins.length - 1; i++) {
      tmp[i] = (pileBins[i - 1] + pileBins[i] * 2 + pileBins[i + 1]) / 4;
    }
    pileBins = tmp;
  }

  function tickAndRenderPile(dt) {
  }

  function tickAndRenderPile(dt, ctx, canvasRect) {
    if (!ctx || !pileSection || !pileBins) return;
    const r = pileSection.getBoundingClientRect();
    const vh = window.visualViewport?.height || window.innerHeight;
    if (r.bottom <= 0 || r.top >= vh) return; // only when near viewport

    // Clear animation after shake
    if (pileClear > 0) {
      pileClear = Math.min(1, pileClear + dt * 2.2);
      for (let i = 0; i < pileBins.length; i++) {
        pileBins[i] = pileBins[i] * (1 - 0.22 * dt * 60);
        if (pileBins[i] < 0.2) pileBins[i] = 0;
      }
      if (pileClear >= 1) pileClear = 0;
    }

    // Shake decay
    if (pileShake > 0) {
      pileShake = Math.max(0, pileShake - dt * 1.6);
    }

    // Convert section rect into snow-canvas-local coords and render there
    const w = r.width;
    const h = r.height;
    const x0 = r.left - canvasRect.left;
    const y0 = r.top - canvasRect.top;
    // If the section isn't actually intersecting the snow canvas box, do nothing
    if (x0 > (window.visualViewport?.width || window.innerWidth) || y0 > (window.visualViewport?.height || window.innerHeight)) return;

    // Determine max height for gradient
    let maxH = 0;
    for (let i = 0; i < pileBins.length; i++) maxH = Math.max(maxH, pileBins[i]);
    if (maxH < 1) return;

    const baseY = h;
    const step = w / (pileBins.length - 1);
    const jitter = pileShake * 6;

    // Fill drift shape
    ctx.save();
    // Clip to the section rect area on the snow canvas
    ctx.beginPath();
    ctx.rect(x0, y0, w, h);
    ctx.clip();
    ctx.translate(x0, y0);
    ctx.globalCompositeOperation = 'lighter';

    const grad = ctx.createLinearGradient(0, baseY - maxH - 40, 0, baseY);
    grad.addColorStop(0, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.55, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0.22)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i < pileBins.length; i++) {
      const x = i * step;
      const y = baseY - pileBins[i] + (Math.random() - 0.5) * jitter;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, baseY);
    ctx.closePath();
    ctx.fill();

    // Soft highlight ridge
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < pileBins.length; i++) {
      const x = i * step;
      const y = baseY - pileBins[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.restore();
  }

  // -------------------------------
  // Shake detection (mobile)
  // -------------------------------
  let shakeEnabled = false;
  let lastShakeT = 0;
  let lastMag = 0;
  let magLP = 0;
  // Centralized motion/orientation permission handling (iOS Safari requirement).
  let motionPermPromise = null;
  let motionPermState = 'unknown'; // 'unknown' | 'granted' | 'denied'

  function requestMotionPermissionOnce() {
    if (motionPermPromise) return motionPermPromise;

    motionPermPromise = new Promise(async (resolve) => {
      const DME = window.DeviceMotionEvent;
      const DOE = window.DeviceOrientationEvent;

      // If no permission API exists, assume allowed (non-iOS or older behavior).
      const needsPermission =
        (DME && typeof DME.requestPermission === 'function') ||
        (DOE && typeof DOE.requestPermission === 'function');

      if (!needsPermission) {
        motionPermState = 'granted';
        resolve(true);
        return;
      }

      let granted = false;
      try {
        if (DME && typeof DME.requestPermission === 'function') {
          const s = await DME.requestPermission();
          if (s === 'granted') granted = true;
        }
      } catch {}

      // Some iOS browsers expose only one of these, or require the other path.
      if (!granted) {
        try {
          if (DOE && typeof DOE.requestPermission === 'function') {
            const s2 = await DOE.requestPermission();
            if (s2 === 'granted') granted = true;
          }
        } catch {}
      }

      motionPermState = granted ? 'granted' : 'denied';
      resolve(granted);
    });

    return motionPermPromise;
  }

  function maybeEnableTiltControls() {
    if (tiltEnabled) return;
    requestMotionPermissionOnce().then((granted) => {
      if (granted) enableTiltListener();
    });
  }

  function enableTiltListener() {
    if (tiltEnabled) return;
    tiltEnabled = true;
    // Start with screen-down so the first frame is stable.
    tiltTargetX = 0;
    tiltTargetY = 1;
    tiltX = 0;
    tiltY = 1;
    tiltLastUpdateT = 0;
    // Use BOTH sources; some iOS browsers block devicemotion but allow deviceorientation.
    window.addEventListener('devicemotion', onTiltMotion, { passive: true });
    window.addEventListener('deviceorientation', onTiltOrientation, { passive: true });
  }

  function onTiltMotion(e) {
    const a = e.accelerationIncludingGravity || e.acceleration;
    if (!a) return;
    const ax = a.x || 0;
    const ay = a.y || 0;
    tiltLastUpdateT = performance.now();

    // Map device axes into screen axes based on current orientation angle.
    const angleRaw =
      (screen.orientation && typeof screen.orientation.angle === 'number')
        ? screen.orientation.angle
        : (typeof window.orientation === 'number' ? window.orientation : 0);
    const angle = ((angleRaw % 360) + 360) % 360;

    let x = ax;
    let y = ay;
    // Invert Y so "down" in screen coords tends toward positive Y.
    if (angle === 0) {
      x = ax;
      y = -ay;
    } else if (angle === 90) {
      x = ay;
      y = ax;
    } else if (angle === 180) {
      x = -ax;
      y = ay;
    } else if (angle === 270) {
      x = -ay;
      y = -ax;
    }

    // Normalize to a unit-ish vector.
    let gx = clamp(x / 9.8, -1, 1);
    let gy = clamp(y / 9.8, -1, 1);
    const m = Math.hypot(gx, gy);
    if (m < 0.12) {
      gx = 0;
      gy = 1;
    } else {
      gx /= m;
      gy /= m;
    }

    tiltTargetX = gx;
    tiltTargetY = gy;
  }

  function onTiltOrientation(e) {
    // Fallback when devicemotion is not available.
    // Use beta/gamma to approximate gravity projection in screen plane.
    // (Not physically perfect, but feels natural and keeps snow "downhill".)
    const now = performance.now();
    // If we recently received devicemotion, prefer it.
    if (tiltLastUpdateT && (now - tiltLastUpdateT) < 350) return;

    const beta = typeof e.beta === 'number' ? e.beta : 0; // front/back [-180..180]
    const gamma = typeof e.gamma === 'number' ? e.gamma : 0; // left/right [-90..90]

    const br = (beta * Math.PI) / 180;
    const gr = (gamma * Math.PI) / 180;

    // Approximate: gravity projection
    let x = Math.sin(gr);
    let y = Math.sin(br);

    // Rotate into screen coords based on orientation angle.
    const angleRaw =
      (screen.orientation && typeof screen.orientation.angle === 'number')
        ? screen.orientation.angle
        : (typeof window.orientation === 'number' ? window.orientation : 0);
    const angle = ((angleRaw % 360) + 360) % 360;

    let gx = x, gy = y;
    if (angle === 90) {
      gx = y;
      gy = -x;
    } else if (angle === 180) {
      gx = -x;
      gy = -y;
    } else if (angle === 270) {
      gx = -y;
      gy = x;
    }

    if (!Number.isFinite(gx) || !Number.isFinite(gy)) {
      gx = 0;
      gy = 1;
    }

    const m = Math.hypot(gx, gy);
    if (m < 0.12) {
      gx = 0;
      gy = 1;
    } else {
      gx /= m;
      gy /= m;
    }

    tiltTargetX = clamp(gx, -1, 1);
    tiltTargetY = clamp(gy, -1, 1);
  }

  function maybeEnableShakeControls() {
    if (shakeEnabled) return;
    if (!pileSection) initPileIfPossible();
    if (!pileSection) return;

    // iOS 13+ permission model
    const DME = window.DeviceMotionEvent;
    const DOE = window.DeviceOrientationEvent;
    if ((DME && typeof DME.requestPermission === 'function') || (DOE && typeof DOE.requestPermission === 'function')) {
      requestMotionPermissionOnce()
        .then((granted) => {
          if (granted) {
            enableShakeListener();
            const btn = document.getElementById('snow-toggle');
            if (btn) btn.title = 'Shake to clear snow pile';
          } else {
            const btn = document.getElementById('snow-toggle');
            if (btn) btn.title = 'Enable Motion Access in Safari to shake-clear the snow pile';
          }
        })
        .catch(() => {
          const btn = document.getElementById('snow-toggle');
          if (btn) btn.title = 'Enable Motion Access in Safari to shake-clear the snow pile';
        });
    } else {
      enableShakeListener();
    }
  }

  function enableShakeListener() {
    if (shakeEnabled) return;
    shakeEnabled = true;
    lastShakeT = 0;
    lastMag = 0;
    magLP = 0;
    window.addEventListener('devicemotion', onDeviceMotion, { passive: true });
  }

  function onDeviceMotion(e) {
    if (!pileBins) return;
    const a = e.accelerationIncludingGravity || e.acceleration;
    if (!a) return;
    const ax = a.x || 0, ay = a.y || 0, az = a.z || 0;
    const mag = Math.sqrt(ax * ax + ay * ay + az * az);

    // Shake detection (dreamy/robust):
    // Use a crude high-pass on magnitude ("jerk") so normal movement/gravity doesn't trigger.
    const now = performance.now();
    if (!magLP) magLP = mag;
    magLP = magLP * 0.85 + mag * 0.15; // low-pass estimate
    const jerk = Math.abs(mag - magLP) + Math.abs(mag - lastMag) * 0.6;
    lastMag = mag;

    // Typical resting mag ~ 9.8; shake produces spikes/jerk.
    if (jerk > 7.5 && (now - lastShakeT) > 500) {
      lastShakeT = now;
      triggerPileShakeClear();
    }
  }

  function triggerPileShakeClear() {
    if (!pileBins) return;
    pileShake = 1;
    pileClear = 0.001;
  }

  // Arm motion permission request on the first user gesture as well (mobile Safari requirement).
  // This fixes the common "doesn't work on mobile" case where motion events are blocked until a gesture.
  (function armMotionPermissionOnce() {
    const handler = () => {
      maybeEnableTiltControls();
      maybeEnableShakeControls();
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('touchstart', handler);
    };
    window.addEventListener('pointerdown', handler, { passive: true });
    window.addEventListener('touchstart', handler, { passive: true });
  })();
})();


