// Tiny synthesized sound kit: no audio files, off by default.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let drone: { stop(): void } | null = null;
let enabled = false;

function ensure() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  return ctx;
}

function startDrone() {
  const ac = ensure();
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 380;
  const gain = ac.createGain();
  gain.gain.value = 0;
  gain.gain.linearRampToValueAtTime(0.035, ac.currentTime + 2);
  const oscs = [55, 55.4, 82.4].map((f) => {
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    o.connect(filter);
    o.start();
    return o;
  });
  filter.connect(gain).connect(master!);
  drone = {
    stop() {
      gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.4);
      oscs.forEach((o) => o.stop(ac.currentTime + 0.45));
    },
  };
}

function blip(freq: number, delay = 0, len = 0.09, vol = 0.06) {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + len);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + len);
  o.connect(g).connect(master!);
  o.start(t);
  o.stop(t + len + 0.02);
}

export const Sound = {
  get enabled() {
    return enabled;
  },
  toggle() {
    enabled = !enabled;
    if (enabled) {
      ensure().resume();
      startDrone();
      this.accepted();
    } else {
      drone?.stop();
      drone = null;
    }
    return enabled;
  },
  tick() {
    blip(1320, 0, 0.05, 0.035);
  },
  accepted() {
    blip(880, 0, 0.12);
    blip(1318.5, 0.09, 0.22);
  },
};
