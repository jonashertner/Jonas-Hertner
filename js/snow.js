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

  let snowCanvas = null;
  let snowCtx = null;
  let snowRaf = 0;
  let snowFlakes = [];
  let snowSprites = null; // offscreen sprites for speed
  let snowLastT = 0;
  let snowWind = 0.0;
  let snowWindTarget = 0.0;
  let snowStopping = false;

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

    // Restore persisted state
    const stored = safeGet(STORAGE_KEY);
    if (stored === '1') startSnow();
    snowBtn.setAttribute('aria-pressed', stored === '1' ? 'true' : 'false');

    snowBtn.addEventListener('click', () => {
      const isOn = !!snowCanvas;
      // If we are currently "draining" (stopping from top), clicking again resumes immediately.
      if (isOn && snowStopping) {
        snowStopping = false;
        snowBtn.setAttribute('aria-pressed', 'true');
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
        return;
      }

      if (isOn) requestStopSnow();
      else startSnow();

      const next = (!isOn).toString();
      snowBtn.setAttribute('aria-pressed', next);
      try { localStorage.setItem(STORAGE_KEY, !isOn ? '1' : '0'); } catch {}
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
    snowCanvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
    snowCanvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
    snowCanvas.style.width = '100%';
    snowCanvas.style.height = '100%';
    snowCtx = snowCanvas.getContext('2d');
    if (snowCtx) snowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function buildSnowFlakes() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Heavy snow: density scales with screen area, capped for perf.
    const target = Math.round(clamp((w * h) / 1400, 420, 980));
    snowFlakes = new Array(target).fill(0).map(() => {
      const depth = Math.random(); // 0..1
      const size = 0.6 + depth * 1.6;
      const speed = 55 + depth * 220;
      return {
        x: Math.random() * w,
        // Start from the top: spawn above viewport and let flakes naturally enter
        y: -40 - Math.random() * (h + 140),
        r: size,
        vy: speed,
        vx: (Math.random() * 16 - 8) * (0.3 + depth),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.6 + Math.random() * 1.2,
        alpha: 0.14 + depth * 0.38,
        dead: false
      };
    });
  }

  function snowTick(t) {
    if (!snowCanvas || !snowCtx) return;
    snowRaf = requestAnimationFrame(snowTick);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dt = Math.min(0.05, (t - (snowLastT || t)) / 1000);
    snowLastT = t;

    // Slow wind changes feel “natural”
    if (Math.random() < 0.01) snowWindTarget = (Math.random() * 2 - 1) * 55;
    snowWind += (snowWindTarget - snowWind) * 0.02;

    const ctx = snowCtx;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    const sprites = snowSprites || (snowSprites = makeSnowSprites());

    // Subtle overall haze
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    let alive = 0;
    for (let i = 0; i < snowFlakes.length; i++) {
      const f = snowFlakes[i];
      if (f.dead) continue;
      f.wobble += f.wobbleSpeed * dt;

      const drift = Math.sin(f.wobble) * (14 * f.r);
      f.x += (f.vx + snowWind * (0.18 + f.r * 0.22) + drift) * dt;
      f.y += f.vy * dt;

      // Wrap
      if (f.y > h + 40) {
        if (snowStopping) {
          // "End from top": do not respawn at the top; let flakes drain out.
          f.dead = true;
          continue;
        } else {
          f.y = -40 - Math.random() * 120;
          f.x = Math.random() * w;
        }
      }
      if (f.x < -80) f.x = w + 80;
      if (f.x > w + 80) f.x = -80;

      // pick sprite by size
      const sIdx = f.r < 1.0 ? 0 : (f.r < 1.6 ? 1 : 2);
      const spr = sprites[sIdx];
      const drawR = spr.r * (0.7 + f.r * 0.6);
      ctx.globalAlpha = f.alpha;
      ctx.drawImage(spr.canvas, f.x - drawR, f.y - drawR, drawR * 2, drawR * 2);
      alive++;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    if (snowStopping && alive === 0) {
      // Once all flakes have drained out, fade and tear down.
      finishStopSnow();
    }
  }

  function startSnow() {
    if (prefersReducedMotionSnow) return;
    if (snowCanvas) {
      // If we were draining, resume immediately.
      snowStopping = false;
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
    snowWind = 0;
    snowWindTarget = 0;
    snowStopping = false;
    snowRaf = requestAnimationFrame(snowTick);
    window.addEventListener('resize', onSnowResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onSnowResize, { passive: true });
  }

  function requestStopSnow() {
    if (!snowCanvas) return;
    // "End from top": stop respawning; let existing flakes continue down until gone.
    snowStopping = true;
    window.removeEventListener('resize', onSnowResize);
    window.visualViewport?.removeEventListener('resize', onSnowResize);
  }

  function finishStopSnow() {
    if (!snowCanvas) return;
    cancelAnimationFrame(snowRaf);
    snowRaf = 0;

    const c = snowCanvas;
    c.classList.remove('is-on');
    setTimeout(() => {
      if (snowCanvas !== c) return;
      c.remove();
    }, 750);

    snowCanvas = null;
    snowCtx = null;
    snowFlakes = [];
    snowSprites = null;
    snowLastT = 0;
    snowStopping = false;
  }

  function onSnowResize() {
    if (!snowCanvas) return;
    setSnowSize();
    buildSnowFlakes();
  }

  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }
})();


