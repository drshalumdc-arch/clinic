"use client";
import { useState } from "react";
import Link from "next/link";
import { clinic } from "@/lib/content";

const links = [
  ["Home", "/#home"],
  ["About", "/#about"],
  ["Services", "/#services"],
  ["Contact", "/#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-white/85 px-5 py-2.5 shadow-sm backdrop-blur-md">
        <Link href="/#home" className="flex items-center gap-2 font-bold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full" />
          <span className="text-sm leading-tight sm:text-base">{clinic.name}</span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <Link href={h} className="transition-colors hover:text-ink">{l}</Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 md:block"
        >
          Book now
        </Link>
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="grid h-9 w-9 place-items-center rounded-full text-xl md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-white p-4 shadow-lg md:hidden">
          {links.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium hover:bg-mint">
              {l}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-brand px-4 py-3 text-center font-semibold text-white">
            Book appointment
          </Link>
        </div>
      )}
    </header>
  );
}
