"use client";
import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { iconFor } from "@/lib/serviceIcons";
import { BTN_GHOST, BTN_PRIMARY, Icon, SECTION, SectionHead } from "./ui";
import { about, clinic, services, waLink, servicesIntro, stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-8 pt-4 md:pb-16">
      <div className="grid grid-cols-3 gap-3 rounded-[32px] border border-line bg-white p-6 text-center shadow-sm sm:p-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="text-3xl font-extrabold text-brand-dark sm:text-5xl">{s.value}</div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className={SECTION}>
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dr-shalu.png" alt={about.doctor.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="font-bold">{about.doctor.name}</div>
              <div className="text-sm text-muted">{about.doctor.role}</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">About us</p></Reveal>
          <Reveal as="h2" delay={60} className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{about.title}</Reveal>
          {about.body.map((t, i) => (
            <Reveal as="p" key={i} className="mt-5 text-pretty text-lg leading-relaxed text-muted" delay={120 + i * 60}>{t}</Reveal>
          ))}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={240 + i * 80} className="rounded-2xl bg-mint p-4">
                <div className="font-bold">{v.title}</div>
                <div className="mt-1 text-sm leading-relaxed text-muted">{v.text}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white">
      <div className={SECTION}>
        <SectionHead eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} intro={servicesIntro.intro} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 80}>
              <Link href={`/services/${s.id}`} className="group flex h-full flex-col rounded-[32px] border border-line bg-bg p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10 sm:p-8">
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mint text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={iconFor(s.id)} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold leading-tight">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.short}</p>
                  </div>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand-dark">
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow" size={16} /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-2xl border border-line bg-white px-4 py-3.5 outline-none transition-shadow focus:ring-2 focus:ring-brand";
  return (
    <section id="contact" className={SECTION}>
      <SectionHead eyebrow="Contact us" title="Schedule your complimentary consultation." intro="Send us your details and we will confirm your appointment on WhatsApp." />
      <Reveal delay={150} className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#contact-form" className={BTN_PRIMARY}>Request appointment</a>
        <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className={BTN_GHOST}>Call {clinic.phone}</a>
      </Reveal>

      <div id="contact-form" className="mt-14 grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const v = (k: string) => String(f.get(k) ?? "").trim();
            const lines = [`Name: ${v("name")}`, `Phone: ${v("phone")}`];
            if (v("email")) lines.push(`Email: ${v("email")}`);
            if (v("service")) lines.push(`Service: ${v("service")}`);
            if (v("message")) lines.push(`Message: ${v("message")}`);
            window.open(waLink(lines), "_blank", "noopener");
            setSent(true);
          }} className="h-full rounded-[32px] border border-line bg-white p-6 shadow-sm sm:p-8">
            {sent ? (
              <div className="grid h-full place-items-center py-16 text-center">
                <div>
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-mint text-brand-dark"><Icon name="check" /></div>
                  <h3 className="text-2xl font-extrabold">Thank you!</h3>
                  <p className="mt-2 text-muted">WhatsApp has opened with your details. Just press send and we will confirm your appointment.</p>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-brand-dark">WhatsApp did not open? Tap here</a>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" placeholder="Full name" className={input} />
                <input required type="tel" name="phone" placeholder="Phone number" className={input} />
                <input type="email" name="email" placeholder="Email (optional)" className={`${input} sm:col-span-2`} />
                <select name="service" defaultValue="" className={`${input} sm:col-span-2`}>
                  <option value="" disabled>Choose a service</option>
                  {services.map((s) => <option key={s.id}>{s.title}</option>)}
                </select>
                <textarea name="message" rows={4} placeholder="Anything we should know?" className={`${input} sm:col-span-2`} />
                <button className={`${BTN_PRIMARY} sm:col-span-2`}>Request appointment</button>
              </div>
            )}
          </form>
        </Reveal>

        <div className="grid gap-6 lg:col-span-2">
          <Reveal delay={80} className="rounded-[32px] bg-ink p-7 text-white">
            <h3 className="text-lg font-bold">Opening hours</h3>
            <ul className="mt-4 space-y-2.5 text-white/80">
              {clinic.hours.map(([d, t]) => (
                <li key={d} className="flex justify-between gap-4"><span>{d}</span><span>{t}</span></li>
              ))}
            </ul>
            <a href={waLink()} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-white transition-transform hover:scale-105">
              Chat on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={160} className="min-h-60 overflow-hidden rounded-[32px] border border-line bg-mint">
            <iframe
              title="Clinic location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-60 w-full border-0"
            />
            <a href={clinic.mapLink} target="_blank" rel="noreferrer" className="block bg-white px-5 py-3 text-center text-sm font-bold text-brand-dark">Open in Google Maps ↗</a>
          </Reveal>
        </div>
      </div>

    </section>
  );
}

export function Footer() {
  const col = "space-y-3 text-sm text-white/65";
  const head = "mb-4 text-sm font-bold uppercase tracking-wider text-white";
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-lg font-bold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full bg-white" />
            {clinic.name}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/65">Gentle, modern dentistry for the whole family.</p>
        </div>
        <div>
          <h4 className={head}>Explore</h4>
          <ul className={col}>
            {[["Home", "/#home"], ["About", "/#about"], ["Services", "/#services"], ["FAQ", "/#faq"], ["Contact", "/#contact"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="transition-colors hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={head}>Services</h4>
          <ul className={col}>
            {services.map((s) => <li key={s.id}><Link href={`/services/${s.id}`} className="transition-colors hover:text-white">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className={head}>Visit us</h4>
          <ul className={col}>
            <li>{clinic.address}</li>
            <li>{clinic.phone}</li>
            <li>{clinic.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2026 {clinic.name}. All rights reserved. · Privacy Policy · Terms of Use
      </div>
    </footer>
  );
}
