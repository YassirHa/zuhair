'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import { SECTIONS } from './sections'
import { VanGlyph } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'

// Contact details and social links are placeholders until the project's real channels are known.
const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M21.6 7.2c-.2-1-1-1.8-2-2C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.6.4c-1 .2-1.8 1-2 2C2 9 2 12 2 12s0 3 .4 4.8c.2 1 1 1.8 2 2 1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4c1-.2 1.8-1 2-2 .4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15.5v-7l6 3.5z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h3.8v1.7c.6-1 1.9-2 3.9-2 4 0 4.3 2.6 4.3 6V21h-4v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-4z',
  },
]

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer
  return (
    <footer className="bg-[#2b1d14] text-[#fbf5ea]">
      <div className="cv-border" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <VanGlyph className="h-9 w-auto" />
            <p className="font-display text-xl font-bold leading-tight">{f.name}</p>
          </div>
          <p className="mt-4 leading-relaxed text-[#fbf5ea]/70">
            {f.tagline}
          </p>
        </div>

        <nav aria-label={f.nav}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f6d27a]">{f.journey}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-[#fbf5ea]/75 transition-colors hover:text-[#fbf5ea]">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f6d27a]">{f.contact}</p>
          <ul className="mt-4 space-y-3 text-[#fbf5ea]/80">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-[#f6d27a]" aria-hidden="true" />
              <a href="mailto:contact@caravane-espoir.ma" dir="ltr" className="hover:text-[#fbf5ea]">
                contact@caravane-espoir.ma
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-[#f6d27a]" aria-hidden="true" />
              <a href="tel:+212600000000" dir="ltr" className="hover:text-[#fbf5ea]">
                +212 6 00 00 00 00
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-[#f6d27a]" aria-hidden="true" />
              {f.location}
            </li>
          </ul>
          <ul className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#fbf5ea]/10 transition-colors hover:bg-[#c0532d]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#fbf5ea]/10 py-5 text-center text-sm text-[#fbf5ea]/55">
        © {new Date().getFullYear()} {f.name} · {f.rights}
      </div>
      <div className="cv-border opacity-80" aria-hidden="true" />
    </footer>
  )
}
