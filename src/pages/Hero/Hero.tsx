import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import Navbar from '../../components/Navbar/Navbar';
import './Hero.css';

/* ── Services ticker data ───────────────────────────── */
const SERVICES = [
  'AI Workflow Automation', 'LLM Integration', 'Autonomous Agents',
  'Data Pipeline Engineering', 'Computer Vision Systems', 'NLP Infrastructure',
  'Predictive Analytics', 'Edge AI Deployment', 'MLOps & Model Ops',
  'Conversational AI', 'AI Audit & Strategy', 'Real-Time Intelligence'
];

/* ── Cloud shader ───────────────────────────────────── */
const cloudShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 fogColor;
    uniform float fogNear;
    uniform float fogFar;
    varying vec2 vUv;
    void main() {
      float depth = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = smoothstep( fogNear, fogFar, depth );
      gl_FragColor = texture2D( map, vUv );
      gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
      gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
    }
  `
};

/* ── Rise animation helper — text rises from below cloud floor ── */
function animateRise(el: HTMLElement, delay: number, riseDistance = 500) {
  // Start hidden below cloud floor
  el.style.transform = `translateY(${riseDistance}px)`;
  el.style.opacity = '0';

  setTimeout(() => {
    let start: number | null = null;
    const duration = 1200; // slow cinematic rise

    function frame(t: number) {
      if (!start) start = t;
      const raw = Math.min((t - start) / duration, 1);
      // Smooth ease-out quart for dramatic deceleration at the top
      const ease = 1 - Math.pow(1 - raw, 4);

      const currentY = (1 - ease) * riseDistance;
      el.style.transform = `translateY(${currentY}px)`;
      el.style.opacity = String(Math.min(ease * 2, 1)); // fade in during first half
      el.style.setProperty('--rise-progress', String(ease));

      if (raw < 1) {
        requestAnimationFrame(frame);
      } else {
        el.style.mask = 'none';
        el.style.webkitMask = 'none';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
        el.style.setProperty('--rise-progress', '1');
      }
    }

    requestAnimationFrame(frame);
  }, delay);
}

/* ═══════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  // Refs
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const contextLabelRef = useRef<HTMLDivElement>(null);
  const wordDareRef = useRef<HTMLDivElement>(null);
  const wordDeployRef = useRef<HTMLDivElement>(null);
  const wordDominateRef = useRef<HTMLDivElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const tickerBarRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── Stars (2D canvas) ────────────────────────────── */
  const initStars = useCallback(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Star { x: number; y: number; r: number; a: number; twinkle: number }
    let stars: Star[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function buildStars() {
      stars = [];
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height * 0.58,
          r: Math.random() * 1.1 + 0.2,
          a: Math.random() * 0.6 + 0.1,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    }

    function drawStars(t: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach(s => {
        const alpha = s.a * (0.7 + 0.3 * Math.sin(s.twinkle + t * 0.0004));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      });
      requestAnimationFrame(drawStars);
    }

    resize();
    buildStars();
    requestAnimationFrame(drawStars);
    const handleResize = () => { resize(); buildStars(); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Three.js volumetric clouds ───────────────────── */
  const initClouds = useCallback(() => {
    const container = cloudContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });

    let mouseX = 0;
    const startTime = Date.now();
    let windowHalfX = window.innerWidth / 2;

    const tLoader = new THREE.TextureLoader();
    tLoader.load(
      'https://mrdoob.com/lab/javascript/webgl/clouds/cloud10.png',
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        init(t);
      }
    );

    function init(t: THREE.Texture) {
      camera.position.z = 6000;

      const texture = t;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      // Teal-tinted fog to match DAREX color palette
      const fog = new THREE.Fog(0x06231D, -100, 3000);
      scene.fog = fog;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          fogColor: { value: fog.color },
          fogNear: { value: fog.near },
          fogFar: { value: fog.far }
        },
        vertexShader: cloudShader.vertexShader,
        fragmentShader: cloudShader.fragmentShader,
        depthWrite: false,
        depthTest: false,
        transparent: true
      });

      const planeGeo = new THREE.PlaneGeometry(64, 64);
      const planeObj = new THREE.Object3D();
      const geometries: THREE.BufferGeometry[] = [];

      // 16000 planes for dense cloud coverage
      for (let i = 0; i < 16000; i++) {
        planeObj.position.x = Math.random() * 1000 - 500;
        planeObj.position.y = -Math.random() * Math.random() * 200 - 15;
        planeObj.position.z = i % 8000;
        planeObj.rotation.z = Math.random() * Math.PI;
        planeObj.scale.x = planeObj.scale.y =
          Math.random() * Math.random() * 1.5 + 0.5;
        planeObj.updateMatrix();

        const clonedPlaneGeo = planeGeo.clone();
        clonedPlaneGeo.applyMatrix4(planeObj.matrix);
        geometries.push(clonedPlaneGeo);
      }

      const planeGeos = mergeGeometries(geometries.slice(0, 8000));
      const planeGeosB = mergeGeometries(geometries.slice(8000));

      if (planeGeos) {
        const planesMesh = new THREE.Mesh(planeGeos, material);
        planesMesh.renderOrder = 2;
        scene.add(planesMesh);
      }

      if (planeGeosB) {
        const planesMeshA = new THREE.Mesh(planeGeosB, material);
        planesMeshA.position.z = -8000;
        planesMeshA.renderOrder = 1;
        scene.add(planesMeshA);
      }

      renderer.setSize(window.innerWidth, window.innerHeight);
      container!.appendChild(renderer.domElement);

      // Settle cloud container
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container!.classList.add('settled');
        });
      });

      animate();
    }

    function onDocumentMouseMove(event: MouseEvent) {
      // Only X-axis — minimal, smooth horizontal parallax
      mouseX = (event.clientX - windowHalfX) * 0.15;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      windowHalfX = window.innerWidth / 2;
    }

    function animate() {
      requestAnimationFrame(animate);
      const position = ((Date.now() - startTime) * 0.03) % 8000;
      // Only X-axis mouse influence — Y stays locked
      camera.position.x += (mouseX - camera.position.x) * 0.01;
      camera.position.z = -position + 8000;
      renderer.render(scene, camera);
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* ── Entrance animation sequence ──────────────────── */
  /* Everything rises from below the cloud floor into the dark sky */
  const runAnimationSequence = useCallback(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Topbar rises from clouds (smaller distance)
    if (topbarRef.current) animateRise(topbarRef.current, 300, 300);
    // Context label
    if (contextLabelRef.current) animateRise(contextLabelRef.current, 500, 400);

    // Big wordmark — dramatic staggered rise from deep below cloud floor
    if (wordDareRef.current) animateRise(wordDareRef.current, 800, 550);
    if (wordDeployRef.current) animateRise(wordDeployRef.current, 1050, 550);
    if (wordDominateRef.current) animateRise(wordDominateRef.current, 1300, 550);

    // Descriptor and CTA rise last
    if (descriptorRef.current) animateRise(descriptorRef.current, 1650, 450);
    if (ctaWrapRef.current) animateRise(ctaWrapRef.current, 1900, 400);

    // Ticker shows after all text has risen
    timers.push(setTimeout(() => {
      tickerBarRef.current?.classList.add('show');
    }, 2800));

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Mount ────────────────────────────────────────── */
  useEffect(() => {
    const cleanupStars = initStars();
    const cleanupClouds = initClouds();
    const cleanupAnimation = runAnimationSequence();

    return () => {
      cleanupStars?.();
      cleanupClouds?.();
      cleanupAnimation?.();
    };
  }, [initStars, initClouds, runAnimationSequence]);

  /* ── Render ───────────────────────────────────────── */
  return (
    <section className="hero-section">
      {/* Grain & scanlines */}
      <div className="grain" />
      <div className="scanlines" />

      {/* Star field canvas */}
      <canvas className="stars-canvas" ref={starsCanvasRef} />

      {/* Three.js volumetric cloud container */}
      <div className="container" ref={cloudContainerRef} />

      {/* Horizon atmospheric glow */}
      <div className="cloud-horizon" />

      {/* Corner decorations */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      {/* ── HERO CONTENT ──────────────────────────────── */}
      <div className="hero-content">
        <h1 className="sr-only">Darex AI — AI Automation Infrastructure for Voice Agents, Conversational AI, and Custom LLMs</h1>

        {/* Navbar */}
        <Navbar ref={topbarRef} />

        {/* Context label */}

        <div className="context-label" ref={contextLabelRef}>
          {/* <div className="ctx-line" /> */}
          {/* <div className="ctx-text">AI Automation Infrastructure</div> */}
          {/* <div className="ctx-line" /> */}
        </div>

        {/* Wordmark */}
        <div className="wordmark">
          <div className="word-line rising-element" ref={wordDareRef}>
            <span className="word-text">Dare</span><span className="pixel-sq" />
          </div>
          <div className="word-line rising-element" ref={wordDeployRef}>
            <span className="word-text outline">Deploy</span><span className="pixel-sq" />
          </div>
          <div className="word-line rising-element" ref={wordDominateRef}>
            <span className="word-text">Dominate</span><span className="pixel-sq" />
          </div>
        </div>

        {/* Descriptor */}
        <div className="descriptor rising-element" ref={descriptorRef}>
          <p>We build AI-native automation systems that outthink, outpace, and outlast conventional operations. Infrastructure for the teams that refuse to settle.</p>
        </div>

        {/* CTA */}
        <div className="cta-wrap rising-element" ref={ctaWrapRef}>
          <button className="cta-btn primary" onClick={() => handleScrollTo('waitlist')}>
            Join AI Waitlist <span className="arrow">→</span>
          </button>
          <button className="cta-btn secondary" onClick={() => handleScrollTo('contact')}>
            Start a Project <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-bar" ref={tickerBarRef}>
        <div className="ticker-label">Services</div>
        <div className="ticker-track">
          <div className="ticker-inner">
            {/* Duplicate for infinite scroll effect */}
            {[...SERVICES, ...SERVICES].map((service, i) => (
              <div className="ticker-item" key={i}>
                {service}<span className="sep">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
