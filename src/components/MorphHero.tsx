"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clinic, hero } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const N = 320; // points per shape (all shapes share the same count so they can morph)
const STOPS = [0, 1, 1.4, 2.1, 2.7, 3.4, 4.2];
const TOTAL = STOPS[STOPS.length - 1];

const TOOTH =
  "M50 20 C58 12 72 8 82 14 C94 21 94 38 88 52 C84 62 82 72 80 84 C78 96 66 96 63 84 C60 74 57 66 50 66 C43 66 40 74 37 84 C34 96 22 96 20 84 C18 72 16 62 12 52 C6 38 6 21 18 14 C28 8 42 12 50 20 Z";

function sample(d: string): Float32Array {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  const len = p.getTotalLength();
  const out = new Float32Array(N * 2);
  for (let i = 0; i < N; i++) {
    const pt = p.getPointAtLength((i / N) * len);
    out[i * 2] = pt.x;
    out[i * 2 + 1] = pt.y;
  }
  return out;
}

// Rounded rect points (start top-centre, clockwise) with extra points on the corners so they stay round.
function rectPoints(x0: number, y0: number, x1: number, y1: number, r: number): Float32Array {
  const cx = (x0 + x1) / 2;
  const A = 16; // points per corner arc
  const lens = [cx - x0 - r, y1 - y0 - 2 * r, x1 - x0 - 2 * r, y1 - y0 - 2 * r, x1 - cx - r];
  const total = lens.reduce((a, b) => a + b, 0) || 1;
  const budget = N - 4 * A;
  const counts = lens.map((l) => Math.max(1, Math.round((l / total) * budget)));
  counts[4] += budget - counts.reduce((a, b) => a + b, 0);
  const pts: number[] = [];
  const edge = (ax: number, ay: number, bx: number, by: number, n: number) => {
    for (let i = 0; i < n; i++) pts.push(ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n);
  };
  const arc = (ccx: number, ccy: number, a0: number) => {
    for (let i = 0; i < A; i++) {
      const a = a0 + ((Math.PI / 2) * i) / A;
      pts.push(ccx + r * Math.cos(a), ccy + r * Math.sin(a));
    }
  };
  edge(cx, y0, x1 - r, y0, counts[0]);
  arc(x1 - r, y0 + r, -Math.PI / 2);
  edge(x1, y0 + r, x1, y1 - r, counts[1]);
  arc(x1 - r, y1 - r, 0);
  edge(x1 - r, y1, x0 + r, y1, counts[2]);
  arc(x0 + r, y1 - r, Math.PI / 2);
  edge(x0, y1 - r, x0, y0 + r, counts[3]);
  arc(x0 + r, y0 + r, Math.PI);
  edge(x0 + r, y0, cx, y0, counts[4]);
  return Float32Array.from(pts);
}
function circlePath(cx: number, cy: number, R: number) {
  return `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx} ${cy + R} A${R} ${R} 0 1 1 ${cx} ${cy - R} Z`;
}
function toothPoints(cx: number, cy: number, size: number): Float32Array {
  const base = sample(TOOTH);
  const s = size / 100;
  const out = new Float32Array(base.length);
  for (let i = 0; i < N; i++) {
    out[i * 2] = cx + (base[i * 2] - 50) * s;
    out[i * 2 + 1] = cy + (base[i * 2 + 1] - 52) * s;
  }
  return out;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const trap = (p: number, a: number, b: number, c: number, d: number) =>
  p <= a || p >= d ? 0 : p < b ? (p - a) / (b - a) : p <= c ? 1 : (d - p) / (d - c);

export default function MorphHero() {
  const section = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const caps = useRef<(HTMLParagraphElement | null)[]>([]);
  const hint = useRef<HTMLDivElement>(null);
  const decor = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sec = section.current!;
    const el = clip.current!;
    let ctx: gsap.Context | null = null;
    let lastW = 0;

    const build = () => {
      ctx?.revert();
      const w = window.innerWidth;
      const h = window.innerHeight;
      lastW = w;
      const mobile = w < 768;
      const cy = h * 0.42;
      const shapes = [
        rectPoints(w * (mobile ? 0.05 : 0.1), h * (mobile ? 0.76 : 0.72), w * (mobile ? 0.95 : 0.9), h * 1.1, 32),
        rectPoints(0, 0, w, h, 0.5),
        sample(circlePath(w / 2, cy, Math.min(w * 0.4, h * 0.3))),
        toothPoints(w / 2, cy, Math.min(w * 0.85, h * 0.64)),
      ];
      const shapeAt = [0, 1, 1, 2, 2, 3, 3];
      const buf = new Float32Array(N * 2);

      const render = (p: number) => {
        const io = intro.current;
        if (!io) return; // unmounted (e.g. StrictMode / revert) — nothing to draw
        let i = 0;
        while (i < STOPS.length - 2 && p > STOPS[i + 1]) i++;
        const t = ease(Math.min(1, Math.max(0, (p - STOPS[i]) / (STOPS[i + 1] - STOPS[i]))));
        const a = shapes[shapeAt[i]];
        const b = shapes[shapeAt[i + 1]];
        let s = "polygon(";
        for (let k = 0; k < N * 2; k += 2) {
          const x = a[k] + (b[k] - a[k]) * t;
          const y = a[k + 1] + (b[k + 1] - a[k + 1]) * t;
          s += (k ? "," : "") + x.toFixed(1) + "px " + y.toFixed(1) + "px";
        }
        el.style.clipPath = s + ")";
        void buf;

        const o = 1 - Math.min(1, Math.max(0, (p - 0.2) / 0.5));
        io.style.opacity = String(o);
        io.style.transform = `translate3d(0,${(1 - o) * -40}px,0)`;
        if (hint.current) hint.current.style.opacity = String(o);
        if (decor.current) decor.current.style.opacity = String(o);

        const sh = trap(p, 3.2, 3.8, 4.3, 4.4);
        if (shine.current) shine.current.style.opacity = String(sh);
        if (glow.current) glow.current.style.opacity = String(sh);

        const c = [trap(p, 0.7, 1.0, 1.3, 1.6), trap(p, 2.0, 2.3, 2.7, 2.95), trap(p, 3.3, 3.55, 4.0, 4.2)];
        c.forEach((v, n) => {
          const node = caps.current[n];
          if (!node) return;
          node.style.opacity = String(v);
          node.style.transform = `translate3d(0,${(1 - v) * 24}px,0)`;
        });
      };

      ctx = gsap.context(() => {
        const proxy = { p: 0 };
        render(0);
        gsap.to(proxy, {
          p: TOTAL,
          ease: "none",
          onUpdate: () => render(proxy.p),
          scrollTrigger: { trigger: sec, start: "top top", end: "bottom bottom", scrub: 0.5 },
        });
      }, sec);
    };

    build();
    let timer: number;
    const onResize = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.innerWidth !== lastW) build(); // ignore mobile address-bar height changes
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section id="home" ref={section} className="morph-section relative">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* soft backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#e6f5f3_0%,#fafaf8_70%)]" />

        <HeroDecor innerRef={decor} />

        <div
          ref={glow}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl"
          style={{ width: "calc(min(85vw,64svh) * 1.5)", height: "calc(min(85vw,64svh) * 1.5)", background: "radial-gradient(closest-side, rgba(43,183,176,.55), rgba(43,183,176,.18) 60%, transparent)" }}
        />

        {/* shape-clipped media */}
        <div
          ref={clip}
          className="morph-clip absolute inset-0"
          style={{ clipPath: "inset(72% 10% -10% 10% round 32px)" }}
        >
          {clinic.heroVideo ? (
            <video
              className="h-full w-full object-cover"
              src={clinic.heroVideo}
              poster={clinic.heroPoster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <PlaceholderArt />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        </div>

        <ToothShine innerRef={shine} />

        {/* intro text */}
        <div
          ref={intro}
          className="absolute inset-x-0 top-[max(6.5rem,14svh)] z-10 mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <h1 className="text-[clamp(2.4rem,min(9vw,10.5svh),6.5rem)] font-extrabold leading-[1.02] tracking-tight">
            {hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">{hero.sub}</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#contact" className="rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105">
              Book appointment
            </a>
            <a href="#services" className="rounded-full border border-ink/15 bg-white/70 px-6 py-3 font-semibold transition-transform hover:scale-105">
              Our services
            </a>
          </div>
        </div>

        {/* captions */}
        <p
          ref={(n) => { caps.current[0] = n; }}
          className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center text-4xl font-extrabold tracking-tight text-white opacity-0 sm:text-6xl"
        >
          {hero.captions[0]}
        </p>
        {[1, 2].map((n) => (
          <p
            key={n}
            ref={(node) => { caps.current[n] = node; }}
            className="absolute inset-x-0 bottom-[9svh] z-10 px-6 text-center text-3xl font-extrabold tracking-tight opacity-0 sm:text-5xl"
          >
            {hero.captions[n]}
          </p>
        ))}

        <div ref={hint} className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-xs font-medium tracking-widest text-white/90">
          SCROLL
        </div>
      </div>
    </section>
  );
}

function PlaceholderArt() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1a8f89] via-[#2bb7b0] to-[#8ee3d8]">
      <div className="blob absolute -left-[10%] top-[5%] h-[70%] w-[55%] rounded-full bg-white/25 blur-3xl" />
      <div className="blob absolute -right-[5%] bottom-[0%] h-[60%] w-[50%] rounded-full bg-[#0e2a33]/40 blur-3xl [animation-delay:-5s]" />
      <div className="blob absolute left-[35%] top-[30%] h-[40%] w-[35%] rounded-full bg-[#c9fff4]/40 blur-3xl [animation-delay:-9s]" />
    </div>
  );
}

function Tooth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={TOOTH} fill="currentColor" />
    </svg>
  );
}

function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
    </svg>
  );
}

function HeroDecor({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={innerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* twinkling stars across the top */}
      {STARS.map(([x, y, z, d], i) => (
        <Sparkle key={i} className="twinkle absolute text-brand" style={{ left: x + "%", top: y + "%", width: z, height: z, animationDelay: "-" + d + "s" }} />
      ))}

      {/* soft glow + concentric rings */}
      <div className="absolute left-1/2 top-[62%] h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#bfeee8_0%,#e6f5f3_45%,transparent_75%)] opacity-80" />
      {[38, 56, 76].map((d) => (
        <div
          key={d}
          className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/20"
          style={{ width: `${d}vmax`, height: `${d}vmax` }}
        />
      ))}

      {/* floating teeth */}
      <Tooth className="float-slow absolute left-[7%] top-[46%] h-20 w-20 -rotate-12 text-brand/25 sm:h-28 sm:w-28" />
      <Tooth className="float-slow absolute right-[8%] top-[40%] h-24 w-24 rotate-12 text-brand/20 [animation-delay:-3s] sm:h-36 sm:w-36" />
      <Tooth className="float-slow absolute left-[22%] top-[60%] hidden h-12 w-12 rotate-6 text-brand-dark/20 [animation-delay:-6s] sm:block" />
      <Tooth className="float-slow absolute right-[24%] top-[58%] hidden h-14 w-14 -rotate-6 text-brand-dark/15 [animation-delay:-8s] sm:block" />

      {/* sparkles */}
      <Sparkle className="twinkle absolute left-[16%] top-[36%] h-5 w-5 text-brand" />
      <Sparkle className="twinkle absolute right-[17%] top-[33%] h-7 w-7 text-brand [animation-delay:-1.2s]" />
      <Sparkle className="twinkle absolute left-[30%] top-[55%] h-4 w-4 text-brand-dark [animation-delay:-2.4s]" />
      <Sparkle className="twinkle absolute right-[30%] top-[52%] h-4 w-4 text-brand-dark [animation-delay:-3.1s]" />

      {/* trust chips */}
      <div className="float-slow absolute left-[5%] top-[62%] hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl shadow-brand/10 backdrop-blur md:flex lg:left-[12%]">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-mint text-lg text-brand-dark">★</span>
        <span className="leading-tight"><b className="block text-lg">4.9</b><span className="text-xs text-muted">Average rating</span></span>
      </div>
      <div className="float-slow absolute right-[5%] top-[60%] hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl shadow-brand/10 backdrop-blur [animation-delay:-4s] md:flex lg:right-[12%]">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-mint text-lg text-brand-dark">☺</span>
        <span className="leading-tight"><b className="block text-lg">12k+</b><span className="text-xs text-muted">Happy patients</span></span>
      </div>

      {/* wave at the bottom */}
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[30%] w-full">
        <path d="M0 120 C240 40 480 40 720 110 C960 180 1200 180 1440 90 L1440 200 L0 200 Z" fill="#2bb7b0" fillOpacity="0.10" />
        <path d="M0 150 C260 90 520 100 760 150 C1000 200 1220 190 1440 140 L1440 200 L0 200 Z" fill="#2bb7b0" fillOpacity="0.12" />
      </svg>
    </div>
  );
}

// [left %, top %, size px, animation delay s]
const STARS: [number, number, number, number][] = [
  [6, 12, 14, 0.2], [14, 5, 22, 1.4], [23, 16, 10, 2.6], [31, 4, 16, 0.8], [40, 12, 9, 3.1],
  [58, 5, 12, 1.9], [66, 15, 18, 0.5], [75, 4, 10, 2.2], [83, 13, 24, 1.1], [92, 6, 14, 2.9],
  [96, 22, 10, 0.3], [3, 28, 12, 1.7], [19, 30, 8, 2.4], [80, 30, 9, 3.4],
];

// Sparkles + gleam that appear around the tooth shape. Positions are in units of the tooth size.
const SHINE: [number, number, number, number][] = [
  [0.3, -0.36, 56, 0], [-0.4, -0.3, 30, 0.9], [0.5, -0.05, 22, 1.7], [-0.52, 0.12, 26, 2.3],
  [0.36, 0.4, 32, 1.2], [-0.3, 0.44, 20, 0.5], [0.02, -0.52, 24, 2.8], [0.55, 0.3, 14, 3.3], [-0.58, -0.08, 14, 0.2],
];

function ToothShine({ innerRef }: { innerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={innerRef} className="pointer-events-none absolute left-1/2 top-[42%] z-[6] h-0 w-0 opacity-0" style={{ ["--s" as string]: "min(85vw,64svh)" }} aria-hidden>
      {SHINE.map(([x, y, z, d], i) => (
        <Sparkle
          key={i}
          className="twinkle absolute -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,.95)]"
          style={{ left: "calc(var(--s) * " + x + ")", top: "calc(var(--s) * " + y + ")", width: z, height: z, animationDelay: "-" + d + "s" }}
        />
      ))}
    </div>
  );
}
