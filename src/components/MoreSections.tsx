"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { BTN_GHOST, BTN_PRIMARY, Icon, SECTION, SectionHead } from "./ui";
import { awards, beforeAfter, faqs, offices, stages, team, tech, why } from "@/lib/content";

/* ───────── Why choose us ───────── */
export function WhyUs() {
  return (
    <section className="bg-white">
      <div className={SECTION}>
        <SectionHead eyebrow={why.eyebrow} title={why.title} intro={why.intro} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={(i % 4) * 70}
              className="flex items-center gap-4 rounded-3xl border border-line bg-bg p-5 transition-transform duration-300 hover:-translate-y-1">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-brand-dark">
                <Icon name={it.icon} />
              </span>
              <span className="font-semibold leading-snug">{it.title}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={100} className="mt-12 flex flex-wrap justify-center gap-3">
          <a href="#contact" className={BTN_PRIMARY}>Book a visit</a>
          <a href="#about" className={BTN_GHOST}>Learn about us</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Every life stage ───────── */
export function LifeStages() {
  return (
    <section className={SECTION}>
      <SectionHead eyebrow={stages.eyebrow} title={stages.title} intro={stages.intro} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {stages.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}
            className="group relative flex flex-col overflow-hidden rounded-[32px] border border-line bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
            <span className="text-7xl font-extrabold leading-none text-mint transition-colors duration-300 group-hover:text-brand/30">
              0{i + 1}
            </span>
            <span className="mt-6 w-fit rounded-full bg-mint px-3 py-1 text-xs font-semibold text-brand-dark">{s.tag}</span>
            <h3 className="mt-4 text-2xl font-extrabold">{s.label}</h3>
            <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── Technology ───────── */
export function Technology() {
  return (
    <section className="bg-ink text-white">
      <div className={`${SECTION} grid items-center gap-14 lg:grid-cols-2`}>
        <div>
          <Reveal><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand">{tech.eyebrow}</p></Reveal>
          <Reveal as="h2" delay={60} className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{tech.title}</Reveal>
          <Reveal as="p" delay={120} className="mt-5 text-lg leading-relaxed text-white/70">{tech.intro}</Reveal>
          <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={BTN_PRIMARY}>Book a visit</a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 font-semibold transition-transform duration-300 hover:scale-[1.03]">Our services</a>
          </Reveal>
        </div>
        <ul className="grid gap-3">
          {tech.points.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 70} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-white"><Icon name="check" size={16} /></span>
              <span>
                <span className="block font-bold">{t}</span>
                <span className="mt-1 block text-sm leading-relaxed text-white/65">{d}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Team ───────── */
function Portrait({ skin, hair, top }: { skin: string; hair: string; top: string }) {
  return (
    <svg viewBox="0 0 400 440" className="h-full w-full" role="img" aria-label="Dummy dentist portrait">
      <rect width="400" height="440" fill="#e6f5f3" />
      <circle cx="330" cy="80" r="64" fill="#fff" opacity=".4" />
      <path d="M40 440 C40 350 90 305 200 296 C310 305 360 350 360 440Z" fill="#fff" />
      <path d="M150 300 L200 380 L250 300 C230 290 170 290 150 300Z" fill={top} />
      <rect x="175" y="245" width="50" height="62" rx="20" fill={skin} />
      <ellipse cx="200" cy="185" rx="68" ry="80" fill={skin} />
      <path d="M130 178 C124 100 170 72 204 74 C246 74 280 104 270 178 C264 138 238 118 200 118 C166 118 138 138 130 178Z" fill={hair} />
      <ellipse cx="173" cy="184" rx="6" ry="7" fill="#0e2a33" />
      <ellipse cx="227" cy="184" rx="6" ry="7" fill="#0e2a33" />
      <path d="M200 192 Q195 212 202 216" fill="none" stroke="#0003" strokeWidth="4" strokeLinecap="round" />
      <path d="M170 230 Q200 258 230 230 Q200 242 170 230Z" fill="#fff" stroke="#c97b6a" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function Team() {
  return (
    <section id="team" className={SECTION}>
      <SectionHead eyebrow={team.eyebrow} title={team.title} intro={team.intro} />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {team.people.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="group">
            <div className="aspect-[10/11] overflow-hidden rounded-[32px] border border-line">
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                <Portrait skin={p.skin} hair={p.hair} top={p.top} />
              </div>
            </div>
            <h3 className="mt-5 text-xl font-extrabold">{p.name}</h3>
            <p className="mt-1 text-sm font-semibold text-brand-dark">{p.role}</p>
            <p className="mt-1 text-muted">{p.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── Awards marquee ───────── */
export function Awards() {
  const row = [...awards, ...awards];
  return (
    <section aria-label="Awards and memberships" className="overflow-hidden border-y border-line bg-white py-8">
      <div className="award-track flex w-max gap-4">
        {row.map((a, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink/80">
            <span className="text-brand"><Icon name="star" size={16} /></span>
            {a}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───────── Before / after ───────── */
function Teeth({ tone, stain }: { tone: string; stain: boolean }) {
  const xs = [58, 104, 150, 196, 242, 288];
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="400" height="250" fill="#f6b9b0" />
      <rect y="150" width="400" height="100" fill="#e58d86" />
      <path d="M0 0 H400 V82 Q200 150 0 82Z" fill="#e58d86" />
      <ellipse cx="200" cy="150" rx="168" ry="62" fill="#7a2f33" />
      {xs.map((x, i) => {
        const h = 78 - Math.abs(i - 2.5) * 5;
        return (
          <g key={x}>
            <rect x={x} y={86 + Math.abs(i - 2.5) * 6} width="42" height={h} rx="16" fill={tone} />
            {stain && <rect x={x + 4} y={96 + Math.abs(i - 2.5) * 6} width="34" height={h - 22} rx="12" fill="#b58a2b" opacity=".22" />}
            <rect x={x + 8} y={92 + Math.abs(i - 2.5) * 6} width="8" height="26" rx="4" fill="#fff" opacity={stain ? 0.25 : 0.65} />
          </g>
        );
      })}
    </svg>
  );
}

export function BeforeAfter() {
  const box = useRef<HTMLDivElement>(null);
  return (
    <section className="bg-white">
      <div className={SECTION}>
        <SectionHead eyebrow={beforeAfter.eyebrow} title={beforeAfter.title} intro={beforeAfter.intro} />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <div
            ref={box}
            className="relative aspect-[16/10] select-none overflow-hidden rounded-[32px] border border-line shadow-xl shadow-brand/10"
            style={{ "--v": "50%" } as React.CSSProperties}
          >
            <div className="absolute inset-0"><Teeth tone="#ffffff" stain={false} /></div>
            <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--v)) 0 0)" }}>
              <Teeth tone="#e8d28f" stain />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">Before</span>
            <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">After</span>
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: "var(--v)" }}>
              <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm font-bold text-brand-dark shadow-lg">↔</span>
            </div>
            <input
              type="range" min={0} max={100} defaultValue={50} aria-label="Compare before and after"
              onInput={(e) => box.current?.style.setProperty("--v", `${e.currentTarget.value}%`)}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={SECTION}>
      <SectionHead eyebrow={faqs.eyebrow} title={faqs.title} />
      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {faqs.items.map(([q, a], i) => {
          const on = open === i;
          return (
            <Reveal key={q} delay={i * 50} className="rounded-3xl border border-line bg-white">
              <button
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold"
              >
                {q}
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-brand-dark transition-transform duration-300 ${on ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-muted">{a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ───────── Offices ───────── */
export function Offices() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {offices.map((o, i) => (
        <Reveal key={o.city} delay={i * 70} className="rounded-[28px] border border-line bg-white p-6">
          <h3 className="text-lg font-extrabold">{o.city}</h3>
          <p className="mt-2 text-muted">{o.address}</p>
          <p className="mt-1 font-semibold text-brand-dark">{o.phone}</p>
        </Reveal>
      ))}
    </div>
  );
}
