import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Sound } from "./sound";

gsap.registerPlugin(ScrambleTextPlugin);

type StageProblem = {
  letter: string;
  name: string;
  slug: string;
  short: string;
  tech: string;
  verdict: string;
  image: string;
};

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  [...root.querySelectorAll(sel)] as T[];

const stage = $("[data-stage]");
const problems: StageProblem[] = JSON.parse($("#problems-data").textContent || "[]");
const n = problems.length;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const mod = (a: number, m: number) => ((a % m) + m) % m;

// ---- carousel state --------------------------------------------------------
// `pos` is continuous: 2.4 means 40% of the way from problem C to D.
let pos = 0;
let target = 0;
let velocity = 0;
let active = 0;
let snapTimer = 0;
const solved = new Set<number>();

// Deep-link: /#C opens on problem C.
const hashLetter = location.hash.slice(1).toUpperCase();
const hashIndex = problems.findIndex((p) => p.letter === hashLetter);
if (hashIndex > 0) pos = target = hashIndex;

const ringItems = $$("[data-ring-item]");
const boardCells = $$("[data-board-cell]");
const info = {
  letter: $("[data-info-letter]"),
  name: $("[data-info-name]"),
  short: $("[data-info-short]"),
  tech: $("[data-info-tech]"),
  verdict: $("[data-info-verdict]"),
  link: $<HTMLAnchorElement>("[data-info-link]"),
  solved: $("[data-solved]"),
  fallback: $<HTMLImageElement>("[data-fallback]"),
};
const announce = $("[data-announce]");

// ---- WebGL scene (lazy, with a plain-image fallback) ------------------------
type SceneApi = import("./balloon").BalloonScene;
let scene: SceneApi | null = null;

async function bootScene() {
  const canvas = $<HTMLCanvasElement>("[data-gl]");
  try {
    const test = document.createElement("canvas").getContext("webgl2");
    if (!test) throw new Error("no webgl2");
    const { createBalloonScene } = await import("./balloon");
    scene = createBalloonScene(
      canvas,
      problems.map((p) => p.image),
      (loaded, total) => {
        loader.progress(loaded / total);
      },
      reducedMotion,
    );
    scene.setProblem(mod(Math.round(pos), n), true);
  } catch (err) {
    console.error("3D scene unavailable, showing the flat fallback:", err);
    stage.classList.add("no-gl");
    loader.progress(1);
  }
}

// ---- loader: the portfolio is "judged" before you see it ---------------------
const loader = (() => {
  const el = $("[data-loader]");
  const test = $("[data-loader-test]");
  const verdict = $("[data-loader-verdict]");
  const TESTS = 42;
  let shown = 0;
  let wanted = 0;
  let done = false;
  let seen = false;
  try {
    seen = sessionStorage.getItem("judged") === "1";
  } catch {}

  const start = performance.now();
  const tick = () => {
    if (done) return;
    // Counts at a steady pace, but never ahead of real texture loading,
    // and never stalls: after 4s it passes regardless.
    const elapsed = performance.now() - start;
    const paced = Math.min(1, elapsed / (seen || reducedMotion ? 500 : 2400));
    const real = elapsed > 4000 ? 1 : wanted;
    shown = Math.max(shown, Math.floor(Math.min(paced, real) * TESTS));
    test.textContent = String(Math.max(1, shown));
    if (shown >= TESTS) finish();
    else requestAnimationFrame(tick);
  };

  function finish() {
    done = true;
    try {
      sessionStorage.setItem("judged", "1");
    } catch {}
    verdict.hidden = false;
    Sound.accepted();
    const tl = gsap.timeline({ delay: seen ? 0.1 : 0.45 });
    tl.to(el, {
      clipPath: "inset(0 0 100% 0)",
      duration: reducedMotion ? 0.01 : 1,
      ease: "expo.inOut",
    })
      .set(el, { display: "none" })
      .add(intro, reducedMotion ? 0 : "-=0.45");
  }

  if (!el) return { progress() {} };
  requestAnimationFrame(tick);
  return {
    progress(p: number) {
      wanted = Math.max(wanted, p);
    },
  };
})();

function intro() {
  stage.classList.add("is-ready");
  if (reducedMotion) return;
  gsap.from("[data-ring]", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out" });
  gsap.from("[data-board-cell]", { y: -12, opacity: 0, stagger: 0.04, duration: 0.8, ease: "expo.out" });
  gsap.from("[data-hud]", { opacity: 0, duration: 1, delay: 0.3 });
}

// ---- rendering the ring -------------------------------------------------------
function layoutRing() {
  const step = window.innerWidth < 700 ? 44 : 36; // degrees between titles
  for (let i = 0; i < n; i++) {
    let d = i - mod(pos, n);
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    const abs = Math.abs(d);
    const item = ringItems[i];
    item.style.transform = `translate(-50%, 0) rotateY(${d * step}deg) translateZ(var(--ring-r))`;
    item.style.opacity = String(Math.max(0, 1 - abs * 0.5));
    item.style.setProperty("--fill", String(Math.max(0, 1 - abs * 1.6)));
    item.style.visibility = abs > 1.9 ? "hidden" : "visible";
    item.style.zIndex = String(100 - Math.round(abs * 10));
  }
}

function setActive(i: number) {
  if (i === active && solved.has(i)) return;
  active = i;
  solved.add(i);
  const p = problems[i];
  scene?.setProblem(i);
  Sound.tick();

  ringItems.forEach((el, k) => {
    const link = $<HTMLAnchorElement>("a", el);
    link.tabIndex = k === i ? 0 : -1;
    link.setAttribute("aria-current", k === i ? "true" : "false");
  });
  boardCells.forEach((el, k) => {
    el.classList.toggle("is-active", k === i);
    el.classList.toggle("is-solved", solved.has(k));
    el.setAttribute("aria-current", k === i ? "true" : "false");
  });

  const scramble = (el: HTMLElement, text: string, duration = 0.6) =>
    reducedMotion
      ? (el.textContent = text)
      : gsap.to(el, {
          duration,
          scrambleText: { text, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_", speed: 0.9, revealDelay: 0.1 },
          ease: "none",
          overwrite: true,
        });

  info.letter.textContent = p.letter;
  scramble(info.name, p.name, 0.7);
  scramble(info.tech, p.tech, 0.8);
  scramble(info.verdict, p.verdict, 0.5);
  info.short.textContent = p.short;
  info.link.href = `/work/${p.slug}`;
  info.link.setAttribute("aria-label", `Open problem ${p.letter}: ${p.name}`);
  info.solved.textContent = `${solved.size}/${n}`;
  announce.textContent = `Problem ${p.letter}: ${p.name}. ${p.short}`;
  info.fallback.src = p.image;
  history.replaceState(null, "", `#${p.letter}`);

  if (solved.size === n) stage.classList.add("all-solved");
}

// ---- input --------------------------------------------------------------------
function go(delta: number) {
  target = Math.round(target) + delta;
}
function goTo(i: number) {
  // Shortest way around the ring.
  const cur = mod(Math.round(target), n);
  let d = i - cur;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  target = Math.round(target) + d;
}
function scheduleSnap() {
  clearTimeout(snapTimer);
  snapTimer = window.setTimeout(() => (target = Math.round(target)), 140);
}

stage.addEventListener(
  "wheel",
  (e) => {
    if ((e.target as HTMLElement).closest("[data-index-panel]")) return; // let the overlay scroll natively
    e.preventDefault();
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const dx = e.deltaMode === 1 ? e.deltaX * 16 : e.deltaX;
    const main = Math.abs(dx) > Math.abs(delta) ? dx : delta;
    target += Math.max(-0.6, Math.min(0.6, main * 0.0028));
    scheduleSnap();
  },
  { passive: false },
);

let drag: { x: number; y: number; start: number; moved: boolean } | null = null;
stage.addEventListener("pointerdown", (e) => {
  if ((e.target as HTMLElement).closest("button, [data-index-panel], [data-hud-link]")) return;
  drag = { x: e.clientX, y: e.clientY, start: target, moved: false };
});
window.addEventListener("pointermove", (e) => {
  const nx = (e.clientX / window.innerWidth) * 2 - 1;
  const ny = -((e.clientY / window.innerHeight) * 2 - 1);
  scene?.setPointer(nx, ny);
  moveCursor(e);
  if (!drag) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  const main = Math.abs(dx) > Math.abs(dy) ? -dx : dy * -1;
  if (Math.abs(main) > 6) drag.moved = true;
  target = drag.start + main / Math.min(420, window.innerWidth * 0.45);
  stage.classList.add("is-dragging");
});
const endDrag = () => {
  if (drag) target = Math.round(target);
  stage.classList.remove("is-dragging");
  setTimeout(() => (drag = null));
};
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);

// Clicking a neighbour title rotates to it; clicking the active one opens it.
ringItems.forEach((el, i) => {
  $("a", el).addEventListener("click", (e) => {
    if (drag?.moved) return e.preventDefault();
    if (i !== active) {
      e.preventDefault();
      goTo(i);
    }
  });
});
boardCells.forEach((el, i) => el.addEventListener("click", () => goTo(i)));

// Editing the URL hash (e.g. to #F) rotates to that problem.
window.addEventListener("hashchange", () => {
  const i = problems.findIndex((p) => p.letter === location.hash.slice(1).toUpperCase());
  if (i >= 0) goTo(i);
});

window.addEventListener("keydown", (e) => {
  if (indexOpen) {
    if (e.key === "Escape") toggleIndex(false);
    if (e.key === "Tab") {
      const items = $$<HTMLElement>("a[href], button:not([tabindex='-1'])", indexPanel);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      else if (!indexPanel.contains(document.activeElement)) (e.preventDefault(), first.focus());
    }
    return;
  }
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  if (["ArrowRight", "ArrowDown", "PageDown", "j"].includes(e.key)) (e.preventDefault(), go(1));
  if (["ArrowLeft", "ArrowUp", "PageUp", "k"].includes(e.key)) (e.preventDefault(), go(-1));
  if (e.key === "Enter" && document.activeElement === document.body)
    location.href = `/work/${problems[active].slug}`;
});

// ---- problemset index overlay ---------------------------------------------------
const indexPanel = $("[data-index-panel]");
const indexBtn = $("[data-index-toggle]");
let indexOpen = false;
// The list is plain visible markup (so it works without JS); with JS it becomes an overlay.
indexPanel.hidden = true;
function toggleIndex(open = !indexOpen) {
  indexOpen = open;
  indexPanel.hidden = !open;
  indexBtn.setAttribute("aria-expanded", String(open));
  if (open) {
    if (!reducedMotion)
      gsap.from($$("[data-index-row]", indexPanel), { y: 24, opacity: 0, stagger: 0.035, duration: 0.7, ease: "expo.out" });
    $<HTMLElement>("a", indexPanel)?.focus();
  } else indexBtn.focus();
}
indexBtn.addEventListener("click", () => toggleIndex());
$$("[data-index-close]").forEach((b) => b.addEventListener("click", () => toggleIndex(false)));

// ---- sound -------------------------------------------------------------------------
const soundBtn = $("[data-sound]");
soundBtn.addEventListener("click", () => {
  const on = Sound.toggle();
  soundBtn.setAttribute("aria-pressed", String(on));
  stage.classList.toggle("sound-on", on);
});

// ---- cursor label (desktop only) ------------------------------------------------------
const cursor = $("[data-cursor]");
const cx = finePointer && !reducedMotion ? gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" }) : null;
const cy = finePointer && !reducedMotion ? gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" }) : null;
function moveCursor(e: PointerEvent) {
  if (!cx || !cy) return;
  cx(e.clientX);
  cy(e.clientY);
  const overActive = (e.target as HTMLElement).closest?.("[data-ring-item]") === ringItems[active];
  const overUi = (e.target as HTMLElement).closest?.("a, button");
  cursor.dataset.state = overActive ? "open" : overUi ? "hidden" : drag ? "drag" : "idle";
}

// ---- main loop ------------------------------------------------------------------------
function loop() {
  const prev = pos;
  pos += (target - pos) * (reducedMotion ? 1 : 0.085);
  if (Math.abs(target - pos) < 0.0005) pos = target;
  velocity = pos - prev;
  layoutRing();
  scene?.setScroll(pos, velocity * 12);
  const i = mod(Math.round(pos), n);
  if (i !== active || !solved.size) setActive(i);
  requestAnimationFrame(loop);
}

bootScene();
loop();
