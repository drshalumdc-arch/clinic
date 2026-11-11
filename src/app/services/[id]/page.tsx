import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { BTN_GHOST, BTN_PRIMARY } from "@/components/ui";
import { clinic, serviceMore, services, waLink } from "@/lib/content";
import { iconFor } from "@/lib/serviceIcons";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = services.find((x) => x.id === id);
  return s ? { title: `${s.title} — ${clinic.name}`, description: s.short } : {};
}

// Looks for /public/services/<id>.(jpg|jpeg|png|webp) — drop a photo there to use it.
function findPhoto(id: string) {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "services", `${id}.${ext}`))) return `/services/${id}.${ext}`;
  }
  return null;
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = services.find((x) => x.id === id);
  if (!s) notFound();
  const photo = findPhoto(id);

  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:pt-36">
        <Link href="/#services" className="text-sm font-semibold text-brand-dark">← All services</Link>
        <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">{s.title}</h1>
        <p className="mt-4 text-lg text-muted">{s.short}</p>

        <div className="mt-8 aspect-[16/10] overflow-hidden rounded-[32px] border border-line bg-mint">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={s.title} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-mint to-white text-brand-dark">
              <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={iconFor(id)} />
              </svg>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-5 text-lg leading-relaxed">
          <p>{s.detail}</p>
          <p className="text-muted">{serviceMore[id]}</p>
        </div>

        <div className="mt-12 rounded-[32px] border border-line bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-extrabold">Ready to book {s.title}?</h2>
          <p className="mt-2 text-muted">Send us a message and we will confirm your appointment.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={waLink([`Service: ${s.title}`])} target="_blank" rel="noreferrer" className={BTN_PRIMARY}>Book on WhatsApp</a>
            <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className={BTN_GHOST}>Call {clinic.phone}</a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
