"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { BTN_GHOST, BTN_PRIMARY, Icon, SECTION, SectionHead } from "./ui";
import { beforeAfter, faqs, stages, team, tech, why } from "@/lib/content";

/* ───────── Why choose us ───────── */
export function WhyUs() {
  return (
    <section className="bg-white">
      <div className={SECTION}>
        <SectionHead eyebrow={why.eyebrow} title={why.title} intro={why.intro} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {why.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={(i % 3) * 70}
              className={`flex items-start gap-4 rounded-3xl border border-line bg-bg p-6 transition-transform duration-300 hover:-translate-y-1 lg:col-span-2 ${i === why.items.length - 1 && why.items.length % 3 === 1 ? "lg:col-start-3" : ""}`}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-brand-dark">
                <Icon name={it.icon} />
              </span>
              <span>
                <span className="block font-bold leading-snug">{it.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{it.text}</span>
              </span>
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
      <SectionHead eyebrow={stages.eyebrow} title={stages.title} />
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
export function Team() {
  return (
    <section id="team" className={SECTION}>
      <SectionHead eyebrow={team.eyebrow} title={team.title} intro={team.intro} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {team.people.map((p, i) => (
          <Reveal key={p.role} delay={i * 80} className="rounded-[32px] border border-line bg-white p-8">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold leading-none text-brand-dark">{p.years}</span>
              <span className="text-sm font-semibold text-muted">{p.years.includes("+") ? "years" : "years of experience"}</span>
            </div>
            <h3 className="mt-5 text-2xl font-extrabold">{p.role}</h3>
            <p className="text-sm font-semibold text-brand-dark">{p.relation}</p>
            <p className="mt-3 leading-relaxed text-muted">{p.note}</p>
          </Reveal>
        ))}
      </div>
      <Reveal as="p" className="mt-10 text-center text-lg font-semibold">{team.footer}</Reveal>
    </section>
  );
}

/* ───────── Before / after (renders only when real photos are supplied) ───────── */
function Slider({ before, after, caption }: { before: string; after: string; caption?: string }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        ref={box}
        className="relative aspect-[16/10] select-none overflow-hidden rounded-[32px] border border-line shadow-xl shadow-brand/10"
        style={{ "--v": "50%" } as React.CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="After treatment" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--v)) 0 0)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt="Before treatment" className="h-full w-full object-cover" />
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
      {caption && <p className="mt-3 text-center text-sm font-semibold text-muted">{caption}</p>}
    </div>
  );
}

export function BeforeAfter() {
  if (beforeAfter.pairs.length === 0) return null;
  return (
    <section className="bg-white">
      <div className={SECTION}>
        <SectionHead eyebrow={beforeAfter.eyebrow} title={beforeAfter.title} intro={beforeAfter.intro} />
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {beforeAfter.pairs.map((p) => (
            <Reveal key={p.before}><Slider {...p} /></Reveal>
          ))}
        </div>
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

