import * as THREE from "three";
import { WORLD_COUNT, WORLD_TINTS, worldsFragment, worldsVertex } from "./worlds";

// Theme tokens mirrored from global.css so the 3D scene never drifts from the page.
const INK = new THREE.Color("#0a0a0b");
const PAPER = new THREE.Color("#eeebe3");
const TINTS = WORLD_TINTS.map((hex) => new THREE.Color(hex));

const NOISE = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }
`;

/** Contest balloon silhouette: round top, tapering into a knot. */
function balloonGeometry() {
  const pts: THREE.Vector2[] = [];
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * Math.PI;
    let r = Math.sin(a) * (0.82 + 0.28 * t);
    r *= 1 - 0.6 * Math.pow(1 - t, 5);
    pts.push(new THREE.Vector2(Math.max(r, 0.0008), -Math.cos(a) * 1.28));
  }
  return new THREE.LatheGeometry(pts, 96);
}

export type BalloonScene = {
  setProblem(index: number, instant?: boolean): void;
  setScroll(position: number, velocity: number): void;
  setPointer(x: number, y: number): void;
  resize(): void;
  destroy(): void;
};

export function createBalloonScene(
  canvas: HTMLCanvasElement,
  imageUrls: string[],
  onProgress: (loaded: number, total: number) => void,
  reducedMotion: boolean,
): BalloonScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  // The backdrop is its own pass, drawn first, so its transparent wipe layer
  // can never paint over the balloon.
  const backdrop = new THREE.Scene();
  // Space is soft, so the backdrop renders into a smaller buffer and is scaled
  // up: roughly a quarter of the pixel work, with no visible loss.
  const BACKDROP_SCALE = Math.min(window.devicePixelRatio, 1.75) >= 1.5 ? 0.45 : 0.65;
  const backdropTarget = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
  const blitScene = new THREE.Scene();
  const blit = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { tMap: { value: backdropTarget.texture } },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`,
      fragmentShader: /* glsl */ `uniform sampler2D tMap; varying vec2 vUv; void main(){ gl_FragColor = texture2D(tMap, vUv); }`,
      depthWrite: false,
      depthTest: false,
    }),
  );
  blit.frustumCulled = false;
  blitScene.add(blit);
  renderer.autoClear = false;
  renderer.setClearColor(INK);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.35, 8);

  // ---- textures ------------------------------------------------------------
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, loaded, total) => onProgress(loaded, total);
  const loader = new THREE.TextureLoader(manager);
  const textures = imageUrls.map((url) => {
    const tex = loader.load(url);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  });
  if (!imageUrls.length) onProgress(1, 1);

  // ---- balloon ---------------------------------------------------------------
  const balloonUniforms = {
    uTexA: { value: textures[0] ?? null },
    uTexB: { value: textures[0] ?? null },
    uMix: { value: 0 },
    uTime: { value: 0 },
    uPulse: { value: 0 },
    uInk: { value: INK },
    uPaper: { value: PAPER },
    uTint: { value: TINTS[0].clone() }, // follows the current world
  };

  const balloonMat = new THREE.ShaderMaterial({
    uniforms: balloonUniforms,
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uPulse;
      varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      void main(){
        vUv = uv;
        vec3 p = position;
        float wob = sin(p.y * 3.1 + uTime * 1.2) * 0.012 + sin(atan(p.x, p.z) * 3.0 + uTime) * 0.01;
        p += normal * (wob + uPulse * 0.07 * sin(p.y * 6.0 - uTime * 8.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTexA; uniform sampler2D uTexB;
      uniform float uMix; uniform float uTime;
      uniform vec3 uInk; uniform vec3 uPaper; uniform vec3 uTint;
      varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      ${NOISE}
      // Tone-lift so dark UI screenshots still read on the balloon.
      float lum(vec3 c){ return pow(dot(c, vec3(0.299, 0.587, 0.114)), 0.6); }
      void main(){
        // Two copies of the image around the balloon, each centred on a face
        // (front at rest, back after a half turn), so one always faces you.
        vec2 uv = vec2(vUv.x * 2.0 + 0.5, clamp((vUv.y - 0.08) / 0.84, 0.0, 1.0));
        uv.x += (fbm(uv * 3.0 + uTime * 0.12) - 0.5) * 0.06;
        float a = lum(texture2D(uTexA, uv).rgb);
        float b = lum(texture2D(uTexB, uv).rgb);

        // Noise dissolve between the outgoing and incoming problem.
        float n = fbm(vUv * vec2(6.0, 3.0) + 1.7);
        float t = uMix * 1.3 - 0.15;
        float m = smoothstep(t - 0.06, t + 0.06, n);
        float l = mix(b, a, m);
        float burn = (1.0 - smoothstep(0.0, 0.07, abs(n - t))) * step(0.001, uMix) * step(uMix, 0.999);

        // Duotone into the site palette.
        vec3 col = mix(uInk * 1.6, uTint, smoothstep(0.0, 0.5, l));
        col = mix(col, uPaper, smoothstep(0.82, 1.0, l) * 0.5);

        vec3 N = normalize(vNormal), V = normalize(vView);
        vec3 L = normalize(vec3(-0.5, 0.8, 0.6));
        float diff = max(dot(N, L), 0.0);
        float rim = pow(1.0 - max(dot(N, V), 0.0), 2.6);
        float spec = pow(max(dot(reflect(-L, N), V), 0.0), 48.0);

        vec3 c = col * (0.32 + 0.78 * diff);
        c += uTint * rim * 0.35 + uPaper * spec * 0.5 + uTint * burn * 1.4;
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  });

  const balloon = new THREE.Group();
  const body = new THREE.Mesh(balloonGeometry(), balloonMat);
  balloon.add(body);
  const knot = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.12, 16),
    new THREE.MeshBasicMaterial({ color: TINTS[0].clone() }),
  );
  knot.position.y = -1.33;
  knot.rotation.x = Math.PI;
  balloon.add(knot);
  scene.add(balloon);

  // String: recomputed every frame so it sways behind the balloon.
  const STRING_PTS = 48;
  const stringGeo = new THREE.BufferGeometry();
  stringGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(STRING_PTS * 3), 3));
  const string = new THREE.Line(
    stringGeo,
    new THREE.LineBasicMaterial({ color: PAPER, transparent: true, opacity: 0.45 }),
  );
  scene.add(string);

  // ---- backdrop: a different procedural world per problem --------------------
  // Two layers share one shader: the current world, and the incoming world that
  // wipes in on top during a switch. Each program contains the worlds only once.
  const sharedWorld = {
    uTime: { value: 0 },
    uMix: { value: 0 },
    uAspect: { value: 1 },
    uPointer: { value: new THREE.Vector2() },
  };
  function worldLayer(layer: 0 | 1) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: { ...sharedWorld, uId: { value: 0 }, uLayer: { value: layer } },
        vertexShader: worldsVertex,
        fragmentShader: worldsFragment,
        transparent: layer === 1,
        depthWrite: false,
        depthTest: false,
      }),
    );
    mesh.frustumCulled = false;
    mesh.renderOrder = layer;
    backdrop.add(mesh);
    return mesh;
  }
  const worldBase = worldLayer(0);
  const worldNext = worldLayer(1);
  worldNext.visible = false;
  const idOf = (m: THREE.Mesh) => (m.material as THREE.ShaderMaterial).uniforms.uId;

  // ---- dust ------------------------------------------------------------------
  const DUST = reducedMotion ? 120 : 420;
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 16;
    dustPos[i * 3 + 1] = Math.random() * 7 - 2.5;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    dustSeed[i] = Math.random();
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute("seed", new THREE.BufferAttribute(dustSeed, 1));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPaper: { value: PAPER }, uSignal: balloonUniforms.uTint, uDpr: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute float seed; uniform float uTime; uniform float uDpr; varying float vSeed;
        void main(){
          vec3 p = position;
          p.y = mod(p.y + uTime * (0.05 + seed * 0.1) + 2.5, 7.0) - 2.5;
          p.x += sin(uTime * 0.3 + seed * 20.0) * 0.2;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.0 + seed * 2.2) * uDpr * (6.0 / -mv.z);
          vSeed = seed;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uPaper; uniform vec3 uSignal; varying float vSeed;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * (0.06 + vSeed * 0.12);
          gl_FragColor = vec4(mix(uPaper, uSignal, step(0.85, vSeed)), a);
        }`,
    }),
  );
  scene.add(dust);

  // ---- state -------------------------------------------------------------------
  let scroll = 0;
  let velocity = 0;
  let pointer = { x: 0, y: 0 };
  let smoothPointer = { x: 0, y: 0 };
  let current = 0;
  let mixTween = 0; // 0..1 progress of the dissolve
  let mixing = false;
  let worldTween = 0; // 0..1 progress of the backdrop wipe
  let worldMixing = false;
  let baseScale = 1;
  let baseY = 0.35;
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;

  function setWorld(index: number, instant: boolean) {
    const id = index % WORLD_COUNT;
    if (instant || reducedMotion) {
      idOf(worldBase).value = idOf(worldNext).value = id;
      worldNext.visible = worldMixing = false;
      return;
    }
    if (worldMixing && worldTween > 0.5) idOf(worldBase).value = idOf(worldNext).value;
    idOf(worldNext).value = id;
    sharedWorld.uMix.value = 0;
    worldTween = 0;
    worldNext.visible = worldMixing = true;
  }

  // The balloon's colour eases towards the tint of the current world.
  const targetTint = TINTS[0].clone();
  const knotColor = (knot.material as THREE.MeshBasicMaterial).color;

  function setProblem(index: number, instant = false) {
    if (index === current || !textures[index]) return;
    current = index;
    setWorld(index, instant);
    targetTint.copy(TINTS[index % TINTS.length]);
    if (instant || reducedMotion) balloonUniforms.uTint.value.copy(targetTint);
    if (instant || reducedMotion) {
      balloonUniforms.uTexA.value = textures[index];
      balloonUniforms.uTexB.value = textures[index];
      balloonUniforms.uMix.value = 0;
      mixing = false;
      return;
    }
    // Restart from whatever is currently most visible.
    balloonUniforms.uTexA.value = mixTween > 0.5 ? balloonUniforms.uTexB.value : balloonUniforms.uTexA.value;
    balloonUniforms.uTexB.value = textures[index];
    mixTween = 0;
    mixing = true;
    balloonUniforms.uPulse.value = 1;
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    const px = renderer.getPixelRatio() * BACKDROP_SCALE;
    backdropTarget.setSize(Math.max(1, Math.round(w * px)), Math.max(1, Math.round(h * px)));
    camera.aspect = w / h;
    sharedWorld.uAspect.value = camera.aspect;
    // Portrait screens: pull the balloon up and shrink it so titles stay clear.
    baseScale = camera.aspect < 0.8 ? 0.62 : camera.aspect < 1.2 ? 0.8 : 1;
    baseY = camera.aspect < 0.8 ? 0.95 : 0.45;
    camera.fov = camera.aspect < 0.8 ? 42 : 34;
    camera.updateProjectionMatrix();
  }

  const stringArr = stringGeo.attributes.position.array as Float32Array;

  function frame() {
    raf = requestAnimationFrame(frame);
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    const t = elapsed;
    const motion = reducedMotion ? 0 : 1;

    balloonUniforms.uTime.value = t;
    (dust.material as THREE.ShaderMaterial).uniforms.uTime.value = t * motion;

    if (mixing) {
      mixTween = Math.min(1, mixTween + dt / 1.1);
      const e = 1 - Math.pow(1 - mixTween, 3);
      balloonUniforms.uMix.value = e;
      if (mixTween >= 1) {
        balloonUniforms.uTexA.value = balloonUniforms.uTexB.value;
        balloonUniforms.uMix.value = 0;
        mixing = false;
      }
    }
    balloonUniforms.uPulse.value *= 0.94;
    balloonUniforms.uTint.value.lerp(targetTint, 1 - Math.exp(-dt * 3));
    knotColor.copy(balloonUniforms.uTint.value);

    sharedWorld.uTime.value = t * (reducedMotion ? 0.2 : 1);
    if (worldMixing) {
      worldTween = Math.min(1, worldTween + dt / 1.6);
      sharedWorld.uMix.value = 1 - Math.pow(1 - worldTween, 3);
      if (worldTween >= 1) {
        idOf(worldBase).value = idOf(worldNext).value;
        worldNext.visible = worldMixing = false;
      }
    }

    // Half a turn per problem, so it always settles facing the camera;
    // leans with velocity and sways gently at rest.
    const bob = Math.sin(t * 0.9) * 0.08 * motion;
    balloon.position.y = baseY + bob;
    balloon.rotation.y = scroll * Math.PI + Math.sin(t * 0.4) * 0.14 * motion;
    balloon.rotation.z = THREE.MathUtils.lerp(balloon.rotation.z, -velocity * 0.35 + Math.sin(t * 0.5) * 0.03 * motion, 0.08);
    const squash = 1 + Math.min(Math.abs(velocity), 1.5) * 0.06;
    balloon.scale.set(baseScale / Math.sqrt(squash), baseScale * squash, baseScale / Math.sqrt(squash));

    // String hangs from the knot and trails the lean.
    const knotWorld = new THREE.Vector3(0, -1.36, 0).applyMatrix4(balloon.matrixWorld);
    for (let i = 0; i < STRING_PTS; i++) {
      const s = i / (STRING_PTS - 1);
      stringArr[i * 3] = knotWorld.x + Math.sin(t * 1.3 + s * 4.0) * 0.09 * s * motion + velocity * 0.4 * s * s;
      stringArr[i * 3 + 1] = knotWorld.y - s * 2.6 * baseScale;
      stringArr[i * 3 + 2] = knotWorld.z + Math.cos(t + s * 3.0) * 0.05 * s * motion;
    }
    stringGeo.attributes.position.needsUpdate = true;

    // Mouse-driven camera and backdrop drift is skipped entirely for reduced motion.
    const follow = reducedMotion ? 0 : 0.05;
    smoothPointer.x += (pointer.x - smoothPointer.x) * follow;
    smoothPointer.y += (pointer.y - smoothPointer.y) * follow;
    sharedWorld.uPointer.value.set(smoothPointer.x, smoothPointer.y);
    camera.position.x = smoothPointer.x * 0.45;
    camera.position.y = 0.35 + smoothPointer.y * 0.25;
    camera.lookAt(0, baseY * 0.6, 0);

    renderer.setRenderTarget(backdropTarget);
    renderer.clear();
    renderer.render(backdrop, camera);
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(blitScene, camera);
    renderer.clearDepth();
    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener("resize", resize);
  // Compile shaders off the main thread where supported, so the page never freezes.
  Promise.all([
    renderer.compileAsync(backdrop, camera),
    renderer.compileAsync(blitScene, camera),
    renderer.compileAsync(scene, camera),
  ])
    .catch(() => {})
    .finally(frame);

  return {
    setProblem,
    setScroll(p, v) {
      scroll = p;
      velocity = v;
    },
    setPointer(x, y) {
      pointer = { x, y };
    },
    resize,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    },
  };
}
