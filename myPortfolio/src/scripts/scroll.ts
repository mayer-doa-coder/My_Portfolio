import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors go through Lenis so they glide too.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") ?? "";
      if (href.length < 2) return; // bare "#" is not a target
      const el = document.getElementById(decodeURIComponent(href.slice(1)));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -40 });
      }
    }),
  );

  document.fonts.ready.then(() => {
    // Headlines rise line by line from behind a mask.
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
    });

    // Rows and blocks slide in as they enter.
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    // Numbers count up to their final value, keeping any suffix like "+".
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const text = el.textContent || "";
      const num = parseFloat(text);
      if (Number.isNaN(num)) return;
      const decimals = (text.split(".")[1] || "").replace(/\D/g, "").length;
      const suffix = text.replace(/[\d.]/g, "");
      const obj = { v: 0 };
      gsap.to(obj, {
        v: num,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = obj.v.toFixed(decimals) + suffix),
      });
    });

    // Parallax on anything marked with a speed.
    document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
      gsap.to(el, {
        yPercent: parseFloat(el.dataset.speed || "0") * -20,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });
}
