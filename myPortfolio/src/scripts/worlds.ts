// Full-screen backdrop: a different corner of space for every problem, like
// Guillaume Colombel's per-project environments. The balloon floats in front.
//
//  0 Mars           : rust-red horizon with craters, Phobos & Deimos      (Parabounce)
//  1 Spiral galaxy  : tilted spiral with dust lanes, a distant companion   (Readify)
//  2 Saturn         : banded planet inside its rings, Cassini division     (Cinema Paradiso)
//  3 Living world   : oceans, green continents, drifting clouds, a moon    (GreenLeaf)
//  4 Pulsar         : nebula with a pulsar sweeping twin beams             (SignOLight)
//  5 Jupiter        : turbulent bands, the Great Red Spot, Io & Europa     (WhatsApp Summarizer)
//  6 Neptune        : deep-blue horizon, methane streaks, dark spot        (SlideCommander)
//  7 Black hole     : accretion disk, photon ring, lensed starfield        (Murder in KUET)
//  8 Uranus         : sideways planet, vertical rings, moons parked in orbit (Smart Car Parking)

export const WORLD_COUNT = 9;

// The balloon takes its colour from the world behind it (same order as above):
// each is the dominant light of that scene.
export const WORLD_TINTS = [
  "#e2643a", // Mars: rust red
  "#8ea6ff", // spiral galaxy: arm blue
  "#e8c47e", // Saturn: pale gold
  "#52b8ff", // living world: ocean blue
  "#b98aff", // pulsar: nebula violet
  "#f0a868", // Jupiter: banded tan
  "#4a82ff", // Neptune: deep blue
  "#ffae55", // black hole: accretion amber
  "#7fe0e6", // Uranus: pale cyan
];

export const worldsVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

// Colours are written straight in sRGB (no colour-space include).
export const worldsFragment = /* glsl */ `
  uniform float uTime;
  uniform float uMix;
  uniform float uAspect;
  uniform int uId;     // which world this layer draws
  uniform int uLayer;  // 0 = current world, 1 = incoming world wiping in on top
  uniform vec2 uPointer;
  varying vec2 vUv;

  const vec3 INK = vec3(0.039, 0.039, 0.043);
  const vec3 SIG = vec3(0.831, 1.0, 0.227);
  const vec3 LIGHT = vec3(-0.5514, 0.4511, 0.7018); // sun from the upper left
  const float PI = 3.14159265;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
  float line(float d, float w){ return 1.0 - smoothstep(0.0, w, abs(d)); }
  mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
  vec3 rotX(vec3 n, float a){ float c = cos(a), s = sin(a); return vec3(n.x, c * n.y - s * n.z, s * n.y + c * n.z); }
  float wrapAngle(float a){ return mod(a + PI, 2.0 * PI) - PI; }

  // ---- building blocks ------------------------------------------------------
  vec3 stars(vec2 p, float t){
    vec3 c = vec3(0.0);
    for (int l = 0; l < 3; l++){
      float fl = float(l);
      vec2 q = (p + uPointer * 0.02 * fl) * (22.0 + fl * 26.0) + fl * 17.3;
      vec2 id = floor(q), f = fract(q) - 0.5;
      float h = hash(id);
      vec2 o = (vec2(hash(id + 1.3), hash(id + 4.7)) - 0.5) * 0.7;
      float tw = 0.65 + 0.35 * sin(t * (0.8 + h * 3.0) + h * 60.0);
      float s = step(0.88, h) * smoothstep(0.1 - fl * 0.02, 0.0, length(f - o)) * tw * (1.0 - fl * 0.3);
      c += mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.85, 0.7), hash(id + 9.1)) * s;
    }
    return c;
  }

  vec3 nebula(vec2 p, vec3 a, vec3 b, float t, float seed){
    vec2 q = p * 1.2 + seed;
    float w = fbm(q + fbm(q * 1.7 + t * 0.01) * 1.5);
    float n = pow(smoothstep(0.35, 0.95, w), 1.6);
    return mix(a, b, fbm(q * 2.3 + seed)) * n;
  }

  // Sphere of radius R at c: xyz = surface normal, w = coverage (soft at the
  // rim so edges stay smooth in the reduced-size backdrop buffer).
  vec4 sphere(vec2 p, vec2 c, float R){
    vec2 d = (p - c) / R;
    float r2 = dot(d, d);
    if (r2 >= 1.0) return vec4(0.0);
    float w = clamp((1.0 - sqrt(r2)) * R / 0.006, 0.0, 1.0);
    return vec4(d, sqrt(1.0 - r2), w);
  }
  vec2 lonlat(vec3 n, float spin){ return vec2(atan(n.x, n.z) + spin, asin(clamp(n.y, -1.0, 1.0))); }
  float lit(vec3 n){ return max(dot(n, LIGHT), 0.0); }

  vec3 planetShade(vec3 alb, vec3 n, vec3 atmo, float k){
    float d = lit(n);
    vec3 c = alb * (0.025 + 0.95 * d);
    c += atmo * pow(1.0 - n.z, 2.5) * (0.15 + d) * k * 0.6;
    return c;
  }
  vec3 glow(vec2 p, vec2 c, float R, vec3 col, float k){
    float d = length(p - c) - R;
    // Fades in across the soft rim so there is no dark seam at the edge.
    return col * exp(-max(d, 0.0) * k) * smoothstep(-0.008, 0.004, d);
  }
  vec3 moon(vec3 c, vec2 p, vec2 mc, float R, vec3 alb){
    vec4 s = sphere(p, mc, R);
    if (s.w > 0.0){
      float f = fbm(s.xy * 4.0 + mc * 10.0);
      return mix(c, alb * (0.7 + 0.5 * f) * (0.03 + lit(s.xyz)), s.w);
    }
    return c;
  }

  vec3 galaxy(vec2 p, vec2 gc, float ang, float incl, float scale, float t, vec3 armCol){
    vec2 q = rot(ang) * (p - gc);
    q.y /= incl;
    q /= scale;
    float r = length(q), a = atan(q.y, q.x);
    float spiral = sin(a * 2.0 - log(r + 0.02) * 4.5 + t * 0.03);
    float arms = pow(0.5 + 0.5 * spiral, 4.0);
    float dust = fbm(vec2(a * 3.0 + log(r + 0.02) * 4.5, r * 8.0));
    float disk = exp(-r * 2.2);
    vec3 c = armCol * arms * disk * (0.4 + dust) * 1.2;
    c += vec3(1.0, 0.85, 0.6) * (exp(-r * r * 60.0) * 1.3 + exp(-r * 5.0) * 0.35);
    c *= 1.0 - smoothstep(0.55, 0.8, dust) * arms * 0.6;
    vec2 k = q * 14.0;
    float kh = hash(floor(k));
    c += vec3(1.0, 0.4, 0.6) * step(0.97, kh) * arms * disk * smoothstep(0.3, 0.0, length(fract(k) - 0.5)) * 2.0;
    return c;
  }

  // ---- the worlds -------------------------------------------------------------

  // 0 — Mars
  vec3 w0(vec2 p, float t){
    vec3 c = stars(p, t) + nebula(p, vec3(0.25, 0.07, 0.04), vec3(0.1, 0.04, 0.06), t, 1.0) * 0.35;
    c = moon(c, p, vec2(-uAspect * 0.55, 0.62), 0.045, vec3(0.5, 0.45, 0.4));
    c = moon(c, p, vec2(uAspect * 0.7, 0.78), 0.028, vec3(0.45, 0.42, 0.38));
    vec2 pc = vec2(0.2, -3.05);
    float R = 2.5;
    c += glow(p, pc, R, vec3(0.9, 0.42, 0.22), 9.0) * 0.45;
    vec4 s = sphere(p, pc, R);
    if (s.w > 0.0){
      vec2 ll = lonlat(rotX(s.xyz, 1.3), t * 0.012) * 3.0;
      float f = fbm(ll * 2.0);
      float m = fbm(ll * 0.9 + 4.0);
      vec3 alb = mix(vec3(0.62, 0.27, 0.12), vec3(0.85, 0.5, 0.28), f);
      alb = mix(alb, vec3(0.32, 0.12, 0.06), smoothstep(0.5, 0.7, m));
      vec2 cq = ll * 6.0;
      float ch = hash(floor(cq));
      alb *= 1.0 - step(0.8, ch) * smoothstep(0.3 * ch, 0.0, length(fract(cq) - 0.5)) * 0.25;
      c = mix(c, planetShade(alb, s.xyz, vec3(1.0, 0.55, 0.35), 0.8), s.w);
    }
    return c;
  }

  // 1 — Spiral galaxy
  vec3 w1(vec2 p, float t){
    vec3 c = stars(p, t) * 0.8 + nebula(p, vec3(0.08, 0.1, 0.3), vec3(0.2, 0.08, 0.25), t, 2.0) * 0.25;
    c += galaxy(p, vec2(uAspect * 0.42, 0.3), 0.5, 0.42, 1.0, t, vec3(0.45, 0.6, 1.0));
    c += galaxy(p, vec2(-uAspect * 0.72, -0.6), -0.3, 0.6, 0.22, t, vec3(0.7, 0.6, 1.0)) * 0.8;
    return c;
  }

  // 2 — Saturn
  vec3 w2(vec2 p, float t){
    vec3 c = stars(p, t) * 0.9 + nebula(p, vec3(0.3, 0.22, 0.1), vec3(0.1, 0.08, 0.2), t, 3.0) * 0.25;
    vec2 sc = vec2(uAspect * 0.58, 0.18);
    float R = 0.3, tilt = -0.38;
    vec2 q = rot(-tilt) * (p - sc);
    float rr = length(vec2(q.x, q.y / 0.3)) / R;
    float band = step(1.35, rr) * step(rr, 2.35);
    float dens = (0.55 + 0.45 * noise(vec2(rr * 40.0, 0.0))) * (1.0 - line(rr - 1.95, 0.04) * 0.9) * (1.0 - line(rr - 2.2, 0.02) * 0.6);
    vec3 ringC = mix(vec3(0.75, 0.65, 0.48), vec3(0.55, 0.47, 0.36), noise(vec2(rr * 12.0, 1.0))) * dens * 0.85;
    float front = step(q.y, 0.0);
    c = mix(c, ringC, band * dens * (1.0 - front) * 0.9);
    vec4 s = sphere(p, sc, R);
    if (s.w > 0.0){
      vec2 nr = rot(-tilt) * s.xy;
      float lat = asin(clamp(nr.y, -1.0, 1.0));
      float b = fbm(vec2(lat * 9.0, t * 0.02 + nr.x * 0.5));
      vec3 alb = mix(vec3(0.86, 0.74, 0.5), vec3(0.66, 0.52, 0.33), b);
      c = mix(c, planetShade(alb, s.xyz, vec3(0.9, 0.8, 0.6), 0.4), s.w);
    }
    c += glow(p, sc, R, vec3(0.9, 0.8, 0.55), 14.0) * 0.2;
    c = mix(c, ringC, band * dens * front * 0.95);
    return c;
  }

  // 3 — Living world
  vec3 w3(vec2 p, float t){
    vec3 c = stars(p, t) + nebula(p, vec3(0.05, 0.15, 0.12), vec3(0.05, 0.08, 0.2), t, 7.0) * 0.25;
    c = moon(c, p, vec2(-uAspect * 0.62, -0.62), 0.08, vec3(0.6, 0.6, 0.58));
    vec2 pc = vec2(uAspect * 0.78, 0.78);
    float R = 0.62;
    c += glow(p, pc, R, vec3(0.35, 0.7, 1.0), 10.0) * 0.5;
    vec4 s = sphere(p, pc, R);
    if (s.w > 0.0){
      vec2 ll = lonlat(s.xyz, t * 0.03);
      float land = fbm(ll * vec2(2.2, 2.8) + 2.0);
      vec3 alb = land > 0.52
        ? mix(vec3(0.2, 0.42, 0.14), vec3(0.5, 0.45, 0.25), smoothstep(0.6, 0.75, land))
        : mix(vec3(0.02, 0.1, 0.25), vec3(0.05, 0.22, 0.35), land);
      float cl = smoothstep(0.5, 0.75, fbm(ll * vec2(3.0, 5.0) + vec2(t * 0.05, 0.0) + fbm(ll * 4.0)));
      alb = mix(alb, vec3(0.95), cl * 0.85);
      alb = mix(alb, vec3(0.9, 0.95, 1.0), smoothstep(1.2, 1.35, abs(ll.y)));
      float d = lit(s.xyz);
      vec3 pc3 = alb * (0.02 + d);
      pc3 += vec3(0.4, 0.7, 1.0) * pow(1.0 - s.z, 2.5) * (0.2 + d) * 0.9;
      pc3 += vec3(1.0, 0.75, 0.35) * (1.0 - smoothstep(0.0, 0.15, d)) * step(0.55, land) * step(0.8, hash(floor(ll * 60.0))) * 0.5 * (1.0 - cl);
      c = mix(c, pc3, s.w);
    }
    return c;
  }

  // 4 — Pulsar
  vec3 w4(vec2 p, float t){
    vec3 c = stars(p, t) * 0.8 + nebula(p * 0.9, vec3(0.55, 0.12, 0.45), vec3(0.1, 0.45, 0.6), t, 11.0) * 0.9;
    vec2 d = p - vec2(-uAspect * 0.55, 0.62);
    float r = length(d), a = atan(d.y, d.x);
    float beam = pow(abs(cos(a - t * 1.4)), 60.0) * exp(-r * 1.1);
    c += vec3(0.75, 0.9, 1.0) * beam * 1.2;
    float pulse = pow(0.5 + 0.5 * sin(t * 6.0), 8.0);
    c += vec3(0.85, 0.95, 1.0) * (exp(-r * 60.0) * 2.0 + exp(-r * 12.0) * (0.3 + 0.5 * pulse));
    c += vec3(0.5, 0.8, 1.0) * line(fract(r * 1.2 - t * 0.25) - 0.5, 0.02) * exp(-r * 1.5) * 0.35;
    return c;
  }

  // 5 — Jupiter
  vec3 w5(vec2 p, float t){
    vec3 c = stars(p, t) + nebula(p, vec3(0.25, 0.15, 0.08), vec3(0.08, 0.06, 0.12), t, 5.0) * 0.2;
    c = moon(c, p, vec2(-uAspect * 0.2, 0.78), 0.03, vec3(0.85, 0.75, 0.35));
    c = moon(c, p, vec2(-uAspect * 0.72, -0.72), 0.04, vec3(0.75, 0.7, 0.62));
    vec2 pc = vec2(uAspect * 1.02, -0.05);
    float R = 0.85;
    c += glow(p, pc, R, vec3(0.9, 0.7, 0.5), 12.0) * 0.25;
    vec4 s = sphere(p, pc, R);
    if (s.w > 0.0){
      vec3 n = vec3(rot(-0.08) * s.xy, s.z);
      vec2 ll = lonlat(n, t * 0.04);
      vec2 w = ll + vec2(fbm(ll * vec2(2.0, 8.0) + t * 0.02) * 0.35, 0.0);
      float b = sin(w.y * 16.0 + fbm(w * vec2(3.0, 10.0)) * 2.5);
      vec3 alb = mix(vec3(0.85, 0.75, 0.6), vec3(0.62, 0.4, 0.25), 0.5 + 0.5 * b);
      alb = mix(alb, vec3(0.95, 0.9, 0.8), smoothstep(0.7, 0.95, fbm(w * vec2(4.0, 14.0))));
      vec2 gd = vec2(wrapAngle(ll.x - 0.3) / 0.28, (ll.y + 0.38) / 0.13);
      alb = mix(alb, vec3(0.75, 0.3, 0.18), smoothstep(1.0, 0.3, length(gd)));
      c = mix(c, planetShade(alb, s.xyz, vec3(0.9, 0.8, 0.6), 0.3), s.w);
    }
    return c;
  }

  // 6 — Neptune
  vec3 w6(vec2 p, float t){
    vec3 c = stars(p, t) + nebula(p, vec3(0.05, 0.1, 0.3), vec3(0.1, 0.2, 0.4), t, 9.0) * 0.3;
    c = moon(c, p, vec2(-uAspect * 0.35, 0.72), 0.035, vec3(0.75, 0.7, 0.7));
    vec2 pc = vec2(uAspect * 0.5, -2.35);
    float R = 1.85;
    c += glow(p, pc, R, vec3(0.35, 0.6, 1.0), 7.0) * 0.55;
    vec4 s = sphere(p, pc, R);
    if (s.w > 0.0){
      vec2 ll = lonlat(rotX(s.xyz, 1.3), t * 0.03);
      float b = fbm(vec2(ll.x * 1.5, ll.y * 12.0));
      vec3 alb = mix(vec3(0.1, 0.22, 0.62), vec3(0.25, 0.45, 0.85), b);
      alb = mix(alb, vec3(0.9, 0.95, 1.0), smoothstep(0.72, 0.9, fbm(vec2(ll.x * 4.0 + t * 0.05, ll.y * 30.0))) * 0.8);
      vec2 dd = vec2(wrapAngle(ll.x - 0.2) / 0.25, (ll.y + 0.1) / 0.1);
      alb = mix(alb, vec3(0.03, 0.08, 0.3), smoothstep(1.0, 0.4, length(dd)));
      c = mix(c, planetShade(alb, s.xyz, vec3(0.45, 0.7, 1.0), 1.0), s.w);
    }
    return c;
  }

  // 7 — Black hole
  vec3 w7(vec2 p, float t){
    vec2 hc = vec2(uAspect * 0.55, 0.32);
    float Rs = 0.11;
    vec2 d = p - hc;
    float r = length(d);
    // Gravitational lensing bends the stars and gas behind it.
    vec2 lp = p - d * (Rs * Rs * 1.8) / max(r * r, 1e-4);
    vec3 c = stars(lp, t) + nebula(lp, vec3(0.25, 0.1, 0.3), vec3(0.08, 0.05, 0.15), t, 13.0) * 0.4;
    vec2 q = rot(0.25) * d;
    vec2 qd = vec2(q.x, q.y / 0.22);
    float rd = length(qd) / Rs;
    float ang = atan(qd.y, qd.x);
    float diskMask = smoothstep(1.6, 1.9, rd) * (1.0 - smoothstep(4.2, 6.0, rd));
    float streak = fbm(vec2(ang * 3.0 - t * 1.2 + rd * 0.6, rd * 2.5));
    float dopp = 0.55 + 0.45 * cos(ang); // the side spinning towards us is brighter
    vec3 disk = mix(vec3(1.0, 0.45, 0.15), vec3(1.0, 0.9, 0.7), streak) * diskMask * (0.4 + streak) * dopp * 1.4;
    float front = step(q.y, 0.0);
    c += disk * (1.0 - front);
    c += vec3(1.0, 0.7, 0.4) * line(r / Rs - 1.55, 0.35) * (0.6 + 0.4 * streak) * 0.9;
    c *= smoothstep(1.0, 1.08, r / Rs);
    c += vec3(1.0, 0.85, 0.6) * line(r / Rs - 1.12, 0.06) * 1.2;
    c += disk * front;
    return c;
  }

  // 8 — Uranus
  vec3 w8(vec2 p, float t){
    vec3 c = stars(p, t) + nebula(p, vec3(0.05, 0.2, 0.22), vec3(0.1, 0.1, 0.25), t, 17.0) * 0.25;
    vec2 pc = vec2(uAspect * 0.62, -0.02);
    float R = 0.3;
    vec2 q = rot(1.35) * (p - pc); // tipped on its side
    // Moons parked in their orbits.
    for (int i = 0; i < 4; i++){
      float fi = float(i);
      float a = R * (1.9 + fi * 0.75);
      float rr = length(vec2(q.x, q.y / 0.32));
      float dash = step(0.5, fract(atan(q.y / 0.32, q.x) * 6.0 / PI));
      c += vec3(0.55, 0.85, 0.9) * line(rr - a, 0.004) * dash * 0.25;
      float ma = t * (0.25 / (1.0 + fi)) + fi * 1.7;
      vec2 mp = pc + rot(-1.35) * vec2(cos(ma) * a, sin(ma) * a * 0.32);
      float md = length(p - mp);
      c += vec3(0.8, 0.95, 1.0) * smoothstep(0.018, 0.0, md) * 0.9 + vec3(0.5, 0.9, 1.0) * exp(-md * 40.0) * 0.3;
    }
    float rr = length(vec2(q.x, q.y / 0.12)) / R;
    float ring = line(rr - 1.55, 0.03) + line(rr - 1.7, 0.02) * 0.6;
    float front = step(q.y, 0.0);
    c += vec3(0.7, 0.85, 0.9) * ring * 0.5 * (1.0 - front);
    vec4 s = sphere(p, pc, R);
    if (s.w > 0.0){
      float lat = asin(clamp((rot(1.35) * s.xy).y, -1.0, 1.0));
      vec3 alb = mix(vec3(0.55, 0.82, 0.86), vec3(0.45, 0.72, 0.8), 0.5 + 0.5 * sin(lat * 10.0));
      c = mix(c, planetShade(alb, s.xyz, vec3(0.6, 0.9, 1.0), 0.7), s.w);
    }
    c += glow(p, pc, R, vec3(0.5, 0.85, 0.95), 14.0) * 0.35;
    c += vec3(0.7, 0.85, 0.9) * ring * 0.6 * front;
    return c;
  }

  vec3 world(int id, vec2 p, float t){
    if (id == 0) return w0(p, t);
    if (id == 1) return w1(p, t);
    if (id == 2) return w2(p, t);
    if (id == 3) return w3(p, t);
    if (id == 4) return w4(p, t);
    if (id == 5) return w5(p, t);
    if (id == 6) return w6(p, t);
    if (id == 7) return w7(p, t);
    return w8(p, t);
  }

  void main(){
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0 + uPointer * 0.05;
    vec3 c = INK + world(uId, p, uTime);
    float alpha = 1.0;

    if (uLayer == 1){
      // The next world grows out from the balloon behind a glowing edge.
      float r = length(p - vec2(0.0, 0.1)) + (fbm(p * 3.0 + uTime * 0.2) - 0.5) * 0.35;
      float front = uMix * (uAspect + 1.6);
      float m = 1.0 - smoothstep(front - 0.06, front + 0.06, r);
      float edge = line(r - front, 0.05) * (1.0 - uMix);
      c = mix(c, SIG, edge * 0.8);
      alpha = max(m, edge * 0.8);
    }

    // Keep the balloon and titles readable: quiet centre, dark corners.
    float centre = smoothstep(0.0, 0.9, length(p - vec2(0.0, 0.1)));
    c = mix(c * 0.6 + INK * 0.4, c, centre);
    c *= 1.0 - 0.5 * pow(length(vUv - 0.5) * 1.35, 2.2);
    gl_FragColor = vec4(c, alpha);
  }
`;
