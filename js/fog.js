/**
 * Fog overlay for jonashertner.com
 * - Mounts on #home (NOT inside <picture>) to avoid <picture> child rules.
 * - No IntersectionObserver; runs while tab is visible.
 * - Caps DPR; Safari/iOS-friendly (mediump precision).
 */
(function () {
  const DPR_CAP = 1.5;
  const DEBUG = false;

  onReady(init);

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = document.getElementById('home');
    if (!hero) return;

    // Ensure stacking context and scoped blending
    hero.classList.add('has-fog');

    // Build/attach canvas directly under #home
    let canvas = document.getElementById('fog-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'fog-canvas';
      hero.appendChild(canvas);
    }

    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      opacity: '0.7', // Increased for visibility
      zIndex: '1'
    });

    // --- WebGL setup ---
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) { 
      console.error('WebGL unavailable'); 
      canvas.remove(); 
      return; 
    }

    // VERTEX SHADER - This was missing!
    const vertSrc = `
      attribute vec2 a_pos;
      void main(){ 
        gl_Position = vec4(a_pos, 0.0, 1.0); 
      }
    `;

    // FRAGMENT SHADER - Simplified for better visibility
    const fragSrc = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;

      float hash(vec2 p){ 
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); 
      }
      
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
        for (int i=0; i<5; i++){
          v += a * noise(p);
          p = m * p;
          a *= 0.5;
        }
        return v;
      }
      
      void main(){
        vec2 uv = gl_FragCoord.xy / u_res;
        vec2 asp = vec2(u_res.x / u_res.y, 1.0);

        float SCALE = 1.0; // Reduced scale for more visible effect
        float SPEED = 0.05; // Slightly faster
        vec2 p = (uv - 0.5) * asp * SCALE;

        float t = u_time * SPEED;
        vec2 q = vec2(fbm(p + vec2(t, 0.0)),
                      fbm(p + vec2(0.0, t)));
        vec2 r = vec2(fbm(p + 1.7*q + vec2(5.2, 1.3)),
                      fbm(p + 1.7*q + vec2(1.7, 9.2)));

        float fog = fbm(p + 2.0*r - vec2(t*0.6, t*0.25));
        
        // Adjusted for better visibility
        fog = smoothstep(0.2, 0.8, fog);
        float vfade = smoothstep(0.0, 1.0, uv.y);
        float alpha = fog * vfade;

        gl_FragColor = vec4(vec3(1.0), alpha);
      }
    `;

    function makeShader(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }

    const vs = makeShader(gl.VERTEX_SHADER, vertSrc);
    const fs = makeShader(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) { 
      console.error('Shader compilation failed');
      canvas.remove(); 
      return; 
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs); 
    gl.attachShader(prog, fs); 
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Shader link error:', gl.getProgramInfoLog(prog));
      canvas.remove();
      return;
    }
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Size & DPR
    let dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const r = hero.getBoundingClientRect();
      const w = Math.max(1, Math.floor((r.width || canvas.clientWidth || 1) * dpr));
      const h = Math.max(1, Math.floor((r.height || canvas.clientHeight || 1) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; 
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    }

    // Draw while tab visible
    let start = performance.now();
    let raf = 0;
    let frameCount = 0;
    
    function loop(now) {
      raf = 0;
      const time = (now - start) / 1000;
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      if (document.visibilityState === 'visible') {
        raf = requestAnimationFrame(loop);
      }
    }

    // Observe hero size
    const ro = ('ResizeObserver' in window) ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(hero);
    window.addEventListener('resize', resize, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !raf) {
        raf = requestAnimationFrame(loop);
      }
    });

    resize();
    raf = requestAnimationFrame(loop);
    
  }
})();