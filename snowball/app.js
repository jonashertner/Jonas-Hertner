// Robust Three.js loader: try jsDelivr first, then unpkg.
// This avoids the common "module failed to load" / transient CDN issues.
const THREE = await (async () => {
  try {
    return await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  } catch (e1) {
    try {
      return await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    } catch (e2) {
      console.error("Failed to load Three.js from both CDNs.", e1, e2);
      return null;
    }
  }
})();

if (!THREE) {
  // Try to show a visible hint if the DOM already has the hint element.
  const hint = document.querySelector(".snow-hint");
  if (hint) {
    hint.textContent = "Snowballs disabled: failed to load Three.js (check console / network).";
  }
} else if (!("WebGLRenderingContext" in window)) {
  const hint = document.querySelector(".snow-hint");
  if (hint) {
    hint.textContent = "Snowballs disabled: WebGL unavailable in this browser.";
  }
}

// Luma-keyed video plane pool. Removes black background in shader.
class ImpactVideoFX {
  constructor({ scene, camera, sources, poolSize = 8 }) {
    this.scene = scene;
    this.camera = camera;
    this.sources = sources;

    // All clips are 1024x576 in this pack.
    this.aspect = 576 / 1024;

    this.pool = [];
    this.frozen = [];
    // Keep splashes visible by freezing their last frame.
    // Cap to avoid unbounded GPU/DOM growth; older frozen splashes are recycled.
    this.maxFrozen = 18;

    this.geo = new THREE.PlaneGeometry(1, this.aspect);

    this.matTemplate = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      uniforms: {
        map: { value: null },
        // Smoother key: remove more near-black + soften the edge
        // Avoid dark fringe / haze: slightly higher threshold + softer transition
        threshold: { value: 0.10 },
        softness:  { value: 0.34 },
        opacity:   { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D map;
        uniform float threshold;
        uniform float softness;
        uniform float opacity;

        float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

        void main() {
          vec4 c = texture2D(map, vUv);
          float a = smoothstep(threshold, threshold + softness, luma(c.rgb)) * opacity;
          // Push splashes brighter/whiter to avoid any dark shade from the source footage.
          vec3 col = mix(c.rgb, vec3(1.0), 0.78);
          col *= 1.25;
          col = clamp(col, 0.0, 1.0);
          gl_FragColor = vec4(col * a, a);
        }
      `
    });

    for (let i = 0; i < poolSize; i++) this.pool.push(this.#makeInstance());
  }

  async unlock() {
    // iOS requires play() to be triggered by a user gesture at least once.
    await Promise.all(this.pool.map(async inst => {
      try {
        inst.video.muted = true;
        inst.video.playsInline = true;
        await inst.video.play();
        inst.video.pause();
        inst.video.currentTime = 0;
      } catch (_) {
        // Ignore. Some browsers will still allow later play().
      }
    }));
  }

  playAt(pos, sizePx, rotRad = 0) {
    const inst = this.pool.pop() || this.#makeInstance();

    // If this instance was previously frozen, reset it back to video playback mode.
    inst.frozen = false;
    inst.mat.uniforms.map.value = inst.videoTex;

    const src = this.sources[(Math.random() * this.sources.length) | 0];
    if (inst.video.src !== src) {
      inst.video.src = src;
      inst.video.load();
    }

    inst.mesh.visible = true;
    inst.mesh.position.copy(pos);

    const size = Math.max(120, sizePx);
    inst.mesh.scale.set(size, size * this.aspect, 1);

    inst.mesh.rotation.set(0, 0, rotRad);
    inst.mesh.quaternion.copy(this.camera.quaternion);

    try {
      inst.video.pause();
      inst.video.currentTime = 0;
    } catch (_) {}

    inst.video.play().catch(() => {});

    const onEnd = () => {
      this.#freezeLastFrame(inst);
    };

    inst.video.addEventListener("ended", onEnd, { once: true });
    return inst;
  }

  clear() {
    // Remove all frozen splashes (used for "double-tap to clear").
    while (this.frozen.length) {
      const inst = this.frozen.pop();
      inst.frozen = false;
      inst.mesh.visible = false;
      inst.mat.uniforms.map.value = inst.videoTex;
      this.pool.push(inst);
    }
  }

  #freezeLastFrame(inst) {
    try {
      inst.video.pause();
    } catch (_) {}

    // Draw the last frame into a canvas texture so it stays visible without keeping the video "active".
    try {
      inst.freezeCtx.drawImage(inst.video, 0, 0, inst.freezeCanvas.width, inst.freezeCanvas.height);
      inst.freezeTex.needsUpdate = true;
      inst.mat.uniforms.map.value = inst.freezeTex;
      inst.mesh.visible = true;
      inst.frozen = true;
      this.frozen.push(inst);
    } catch (_) {
      // If we can't snapshot (rare), fall back to hiding it.
      inst.mesh.visible = false;
      this.pool.push(inst);
      return;
    }

    // Recycle oldest if we exceed cap.
    if (this.frozen.length > this.maxFrozen) {
      const old = this.frozen.shift();
      old.frozen = false;
      old.mesh.visible = false;
      old.mat.uniforms.map.value = old.videoTex;
      this.pool.push(old);
    }
  }

  #makeInstance() {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.loop = false;
    video.crossOrigin = "anonymous";

    const videoTex = new THREE.VideoTexture(video);
    videoTex.colorSpace = THREE.SRGBColorSpace;
    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;

    // Snapshot canvas for "freeze last frame"
    const freezeCanvas = document.createElement("canvas");
    freezeCanvas.width = 1024;
    freezeCanvas.height = 576;
    const freezeCtx = freezeCanvas.getContext("2d");
    const freezeTex = new THREE.CanvasTexture(freezeCanvas);
    freezeTex.colorSpace = THREE.SRGBColorSpace;
    freezeTex.minFilter = THREE.LinearFilter;
    freezeTex.magFilter = THREE.LinearFilter;

    const mat = this.matTemplate.clone();
    mat.uniforms = THREE.UniformsUtils.clone(this.matTemplate.uniforms);
    mat.uniforms.map.value = videoTex;

    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.visible = false;
    mesh.renderOrder = 10;
    this.scene.add(mesh);

    return { video, videoTex, freezeCanvas, freezeCtx, freezeTex, mat, mesh, frozen: false };
  }
}

class SnowballThrowFX {
  constructor({ el, canvas3d, canvas2d, splashSources }) {
    this.el = el;
    this.canvas3d = canvas3d;
    this.canvas2d = canvas2d;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas3d, alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2500);

    this.clock = new THREE.Clock();

    this.viewW = 1;
    this.viewH = 1;
    this.cameraZ = 700;

    this._unlocked = false;

    // Lighting
    this.ambient = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(this.ambient);

    this.dir = new THREE.DirectionalLight(0xffffff, 1.1);
    this.dir.castShadow = true;
    this.dir.shadow.mapSize.set(1024, 1024);
    this.dir.shadow.camera.near = 10;
    this.dir.shadow.camera.far = 2000;
    this.scene.add(this.dir);

    // Target plane (for ray hit + shadows)
    this.targetPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShadowMaterial({ opacity: 0.30 })
    );
    this.targetPlane.receiveShadow = true;
    this.scene.add(this.targetPlane);

    // Impact video FX
    this.impactFx = new ImpactVideoFX({
      scene: this.scene,
      camera: this.camera,
      sources: splashSources,
      poolSize: 8
    });

    // Snowball geometry/material
    // Larger + smoother (more segments to reduce faceting)
    this.sphereGeo = new THREE.SphereGeometry(26, 40, 28);
    this.sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf7fbff,
      roughness: 0.95,
      metalness: 0.0
    });

    // Pool balls
    this.ballPool = [];
    this.active = [];

    // Raycasting against the plane
    this.ray = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();

    // 2D splat canvas
    this.ctx2d = this.canvas2d.getContext("2d");

    this.#bind();
    this.#resize();
    this.#loop();
  }

  clearSplats() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    this.ctx2d.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx2d.clearRect(0, 0, this.viewW * dpr, this.viewH * dpr);
    this.impactFx.clear();
  }

  #bind() {
    // Mouse/pen pointer interactions (touch handled separately to preserve 2-finger scrolling)
    this.onDown = (e) => {
      if (e.pointerType === "touch") return;
      if (e.target && e.target.closest && e.target.closest(".snow-back-top")) return;
      e.preventDefault();

      if (!this._unlocked) {
        this._unlocked = true;
        this.impactFx.unlock();
      }

      this.el.setPointerCapture?.(e.pointerId);
      const p = this.#localPoint(e);
      this.dragStart = p;
      this.dragLast = p;

      // Double tap support (simple)
      const now = performance.now();
      if (this._lastTap && (now - this._lastTap) < 260) {
        this.clearSplats();
        this._lastTap = 0;
      } else {
        this._lastTap = now;
      }
    };

    this.onMove = (e) => {
      if (!this.dragStart) return;
      this.dragLast = this.#localPoint(e);
    };

    this.onUp = (e) => {
      if (!this.dragStart) return;
      const p0 = this.dragStart;
      const p1 = this.dragLast || this.#localPoint(e);
      this.dragStart = null;

      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 8) return;

      this.#throw(p0, p1, dist);
    };

    this.el.addEventListener("pointerdown", this.onDown, { passive: false });
    window.addEventListener("pointermove", this.onMove, { passive: true });
    window.addEventListener("pointerup", this.onUp, { passive: true });

    // Touch interactions:
    // - 1 finger: throw (we preventDefault only once we detect a 1-finger drag)
    // - 2 fingers: allow page scroll (no preventDefault)
    this.touchStart = null;
    this.touchLast = null;
    this._touchActiveId = null;

    const getTouchPoint = (t) => {
      const r = this.el.getBoundingClientRect();
      return {
        x: Math.min(Math.max(0, t.clientX - r.left), r.width),
        y: Math.min(Math.max(0, t.clientY - r.top), r.height)
      };
    };

    this.onTouchStart = (e) => {
      if (e.target && e.target.closest && e.target.closest(".snow-back-top")) return;
      if (!this._unlocked) {
        this._unlocked = true;
        this.impactFx.unlock();
      }

      // If multi-touch, don't start a throw gesture.
      if (e.touches.length !== 1) {
        this.touchStart = null;
        this.touchLast = null;
        this._touchActiveId = null;
        return;
      }

      const t = e.touches[0];
      this._touchActiveId = t.identifier;
      const p = getTouchPoint(t);
      this.touchStart = p;
      this.touchLast = p;

      // Double tap support (simple) — do NOT preventDefault here, so 2-finger scroll remains possible.
      const now = performance.now();
      if (this._lastTap && (now - this._lastTap) < 260) {
        this.clearSplats();
        this._lastTap = 0;
      } else {
        this._lastTap = now;
      }
    };

    this.onTouchMove = (e) => {
      // If user adds a second finger, allow scroll and cancel throw.
      if (e.touches.length !== 1) {
        this.touchStart = null;
        this.touchLast = null;
        this._touchActiveId = null;
        return;
      }
      if (!this.touchStart) return;

      // Find the active touch
      let t = null;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === this._touchActiveId) {
          t = e.touches[i];
          break;
        }
      }
      t = t || e.touches[0];
      const p = getTouchPoint(t);
      this.touchLast = p;

      // Only block scrolling once the user is actually dragging with 1 finger.
      const dx = p.x - this.touchStart.x;
      const dy = p.y - this.touchStart.y;
      if (Math.hypot(dx, dy) > 4) {
        e.preventDefault();
      }
    };

    this.onTouchEnd = (e) => {
      if (!this.touchStart) return;
      // If no touches remain, finalize the throw.
      if (e.touches.length === 0) {
        const p0 = this.touchStart;
        const p1 = this.touchLast || p0;
        this.touchStart = null;
        this.touchLast = null;
        this._touchActiveId = null;

        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 8) return;
        this.#throw(p0, p1, dist);
      }
    };

    this.el.addEventListener("touchstart", this.onTouchStart, { passive: true });
    this.el.addEventListener("touchmove", this.onTouchMove, { passive: false });
    this.el.addEventListener("touchend", this.onTouchEnd, { passive: true });
    this.el.addEventListener("touchcancel", this.onTouchEnd, { passive: true });

    this.el.addEventListener("dblclick", (e) => {
      e.preventDefault();
      this.clearSplats();
    });

    window.addEventListener("resize", () => this.#resize());
  }

  #localPoint(e) {
    const r = this.el.getBoundingClientRect();
    return {
      x: Math.min(Math.max(0, e.clientX - r.left), r.width),
      y: Math.min(Math.max(0, e.clientY - r.top), r.height)
    };
  }

  #toWorld(p) {
    // Convert local pixel coords to world coords on the target plane.
    return {
      x: p.x - this.viewW / 2,
      y: -(p.y - this.viewH / 2)
    };
  }

  #getBall() {
    const ball = this.ballPool.pop() || new THREE.Mesh(this.sphereGeo, this.sphereMat);
    ball.castShadow = true;
    ball.visible = true;
    if (!ball.parent) this.scene.add(ball);
    return ball;
  }

  #releaseBall(ball) {
    ball.visible = false;
    this.ballPool.push(ball);
  }

  #throw(p0, p1, distPx) {
    const w0 = this.#toWorld(p0);
    const w1 = this.#toWorld(p1);

    // Longer swipe -> shorter flight -> more impact.
    const flight = Math.min(0.60, Math.max(0.24, 0.58 - distPx * 0.00055));

    const zStart = Math.min(420, Math.max(220, this.viewH * 0.55));

    const mx = (w0.x + w1.x) * 0.5;
    const my = (w0.y + w1.y) * 0.5;

    const side = (Math.random() - 0.5) * distPx * 0.08;
    const arc = Math.min(220, Math.max(80, distPx * 0.18));

    const P0 = new THREE.Vector3(w0.x, w0.y, zStart);
    const P2 = new THREE.Vector3(w1.x, w1.y, 0.45);
    const P1 = new THREE.Vector3(mx + side, my + arc, zStart * 0.72);

    const ball = this.#getBall();
    ball.position.copy(P0);
    ball.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    this.active.push({
      ball,
      t: 0,
      dur: flight,
      P0, P1, P2,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      impactPos: new THREE.Vector2(w1.x, w1.y),
      // Bigger impacts to match larger snowballs
      impactSize: Math.min(720, Math.max(280, 280 + distPx * 0.75))
    });
  }

  #bezier2(P0, P1, P2, t, out) {
    const it = 1 - t;
    out.set(
      it * it * P0.x + 2 * it * t * P1.x + t * t * P2.x,
      it * it * P0.y + 2 * it * t * P1.y + t * t * P2.y,
      it * it * P0.z + 2 * it * t * P1.z + t * t * P2.z
    );
  }

  #impactAt(wx, wy, sizePx) {
    // 1) Real footage splash (keyed)
    const rot = (Math.random() - 0.5) * 0.6;
    // Make the .mp4 splash much larger (at least 2x the previous scale).
    this.impactFx.playAt(new THREE.Vector3(wx, wy, 1.2), sizePx * 2.6, rot);

    // 2) Persistent wet snow splat (2D)
    this.#paintSplat(wx, wy, sizePx);
  }

  #paintSplat(wx, wy, sizePx) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const sx = (wx + this.viewW / 2) * dpr;
    const sy = (-wy + this.viewH / 2) * dpr;

    const r = (sizePx * 0.22) * dpr;

    this.ctx2d.save();
    this.ctx2d.globalCompositeOperation = "source-over";

    // Core
    const g = this.ctx2d.createRadialGradient(sx, sy, 0, sx, sy, r);
    g.addColorStop(0.0, "rgba(255,255,255,0.85)");
    g.addColorStop(0.35, "rgba(245,250,255,0.52)");
    g.addColorStop(1.0, "rgba(245,250,255,0.00)");

    this.ctx2d.fillStyle = g;
    this.ctx2d.beginPath();
    this.ctx2d.arc(sx, sy, r, 0, Math.PI * 2);
    this.ctx2d.fill();

    // Specks
    this.ctx2d.fillStyle = "rgba(255,255,255,0.42)";
    const specks = 10 + ((Math.random() * 10) | 0);
    for (let i = 0; i < specks; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rr = r * (0.55 + Math.random() * 0.75);
      const px = sx + Math.cos(ang) * rr;
      const py = sy + Math.sin(ang) * rr;
      const pr = (1.0 + Math.random() * 2.5) * dpr;
      this.ctx2d.beginPath();
      this.ctx2d.arc(px, py, pr, 0, Math.PI * 2);
      this.ctx2d.fill();
    }

    this.ctx2d.restore();
  }

  #resize() {
    const r = this.el.getBoundingClientRect();
    this.viewW = Math.max(1, r.width);
    this.viewH = Math.max(1, r.height);

    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));

    // Camera framing: make plane match pixels.
    this.camera.aspect = this.viewW / this.viewH;
    this.camera.fov = 45;
    this.cameraZ = (this.viewH / 2) / Math.tan((this.camera.fov * Math.PI / 180) / 2);
    this.camera.position.set(0, 0, this.cameraZ);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    // Target plane covers the section.
    this.targetPlane.geometry.dispose();
    this.targetPlane.geometry = new THREE.PlaneGeometry(this.viewW, this.viewH);
    this.targetPlane.position.set(0, 0, 0);

    // Directional light aiming from top-left-ish.
    this.dir.position.set(-this.viewW * 0.2, this.viewH * 0.55, this.cameraZ * 0.65);
    this.dir.target.position.set(0, 0, 0);
    this.scene.add(this.dir.target);

    const shCam = this.dir.shadow.camera;
    shCam.left = -this.viewW / 2;
    shCam.right = this.viewW / 2;
    shCam.top = this.viewH / 2;
    shCam.bottom = -this.viewH / 2;
    shCam.updateProjectionMatrix();

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.viewW, this.viewH, false);

    this.canvas2d.width = Math.round(this.viewW * dpr);
    this.canvas2d.height = Math.round(this.viewH * dpr);
    this.canvas2d.style.width = `${this.viewW}px`;
    this.canvas2d.style.height = `${this.viewH}px`;
  }

  #loop() {
    const dt = Math.min(0.033, this.clock.getDelta());

    // Update balls
    for (let i = this.active.length - 1; i >= 0; i--) {
      const o = this.active[i];
      o.t += dt;
      const u = Math.min(1, o.t / o.dur);

      const p = o.ball.position;
      this.#bezier2(o.P0, o.P1, o.P2, u, p);

      o.ball.rotation.x += o.spin.x * dt;
      o.ball.rotation.y += o.spin.y * dt;
      o.ball.rotation.z += o.spin.z * dt;

      if (u >= 1) {
        this.#impactAt(o.impactPos.x, o.impactPos.y, o.impactSize);
        this.#releaseBall(o.ball);
        this.active.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.#loop());
  }
}

// IMPORTANT: Use URLs relative to this module file so the code works
// no matter which page path it runs on (/, /de/, /fr/, etc.).
const splashFiles = [
  "splash_133_01.mp4",
  "splash_133_02.mp4",
  "splash_133_03.mp4",
  "splash_133_04.mp4",
  "splash_133_05.mp4",
  "splash_133_06.mp4",
  "splash_196_01.mp4",
  "splash_196_02.mp4",
  "splash_196_03.mp4",
  "splash_196_04.mp4",
  "splash_196_05.mp4",
  "splash_196_06.mp4",
  "splash_217_01.mp4",
  "splash_217_02.mp4",
  "splash_217_03.mp4",
  "splash_217_04.mp4",
  "splash_217_05.mp4",
  "splash_217_06.mp4"
];

const splashSources = splashFiles.map((f) =>
  new URL(`./assets/splashes/${f}`, import.meta.url).toString()
);

new SnowballThrowFX({
  el: document.getElementById("snowArea"),
  canvas3d: document.getElementById("fx3d"),
  canvas2d: document.getElementById("splat2d"),
  splashSources
});
