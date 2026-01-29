/**
 * Misty forest shader effect using @paper-design/shaders
 * Replaces start.png (5.7MB) with a ~50KB generated effect
 */

const CDN = 'https://esm.sh/@paper-design/shaders@0.0.71';

let ShaderMount = null;
let neuroNoiseFragmentShader = null;
let neuroNoiseVertexShader = null;

async function loadShaderLibrary() {
  if (ShaderMount) return true;

  try {
    const module = await import(CDN);
    ShaderMount = module.ShaderMount;
    neuroNoiseFragmentShader = module.neuroNoiseFragmentShader;
    neuroNoiseVertexShader = module.neuroNoiseVertexShader;
    return true;
  } catch (err) {
    console.error('Failed to load shader library:', err);
    return false;
  }
}

/**
 * Mount the misty forest shader to a container element
 * @param {HTMLElement} container - Element to mount shader into
 * @param {Object} options - Optional overrides for colors and params
 */
export async function mountMistyShader(container, options = {}) {
  const loaded = await loadShaderLibrary();
  if (!loaded) return null;

  // Grayscale palette mimicking misty forest
  const defaults = {
    colorFront: '#ffffff',  // Bright mist/light
    colorMid: '#888888',    // Mid fog
    colorBack: '#1a1a1a',   // Dark forest
    brightness: 0.6,
    contrast: 0.5,
    speed: 0.15,            // Slow, ethereal movement
    scale: 1.2,
  };

  const config = { ...defaults, ...options };

  const mount = new ShaderMount(
    container,
    neuroNoiseFragmentShader,
    {
      u_colorFront: config.colorFront,
      u_colorMid: config.colorMid,
      u_colorBack: config.colorBack,
      u_brightness: config.brightness,
      u_contrast: config.contrast,
      u_scale: config.scale,
    },
    {
      speed: config.speed,
    }
  );

  return mount;
}

/**
 * Replace an img element with a shader canvas
 * @param {string} selector - CSS selector for the image to replace
 * @param {Object} options - Shader options
 */
export async function replaceImageWithShader(selector, options = {}) {
  const img = document.querySelector(selector);
  if (!img) {
    console.warn(`Image not found: ${selector}`);
    return null;
  }

  // Create container with same dimensions
  const container = document.createElement('div');
  container.className = 'shader-container';
  container.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;

  // Insert before image and hide image
  img.parentNode.insertBefore(container, img);
  img.style.display = 'none';

  return mountMistyShader(container, options);
}

// Auto-init if data attribute present
document.addEventListener('DOMContentLoaded', () => {
  const autoContainers = document.querySelectorAll('[data-shader="misty"]');
  autoContainers.forEach(el => mountMistyShader(el));
});
