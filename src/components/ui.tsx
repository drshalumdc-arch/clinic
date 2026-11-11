import Reveal from "./Reveal";

// Shared type + spacing system so every section lines up.
export const SECTION = "mx-auto w-full max-w-6xl px-5 py-24 md:py-32";
export const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition-transform duration-300 hover:scale-[1.03]";
export const BTN_GHOST =
  "inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-6 py-3.5 font-semibold transition-transform duration-300 hover:scale-[1.03]";

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${a}`}>
      <Reveal>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">{eyebrow}</p>
      </Reveal>
      <Reveal as="h2" delay={60} className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={120} className="mt-5 text-pretty text-lg leading-relaxed text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}

const PATHS: Record<string, string> = {
  heart: "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
  clock: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  shield: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4",
  users: "M16 19v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1M10 11a3 3 0 100-6 3 3 0 000 6zM20 19v-1a3 3 0 00-2-2.8M16 5.2a3 3 0 010 5.6",
  card: "M3 7h18v10H3zM3 11h18M7 15h3",
  spark: "M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z",
  check: "M5 12l4 4 10-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name] ?? PATHS.check} />
    </svg>
  );
}
