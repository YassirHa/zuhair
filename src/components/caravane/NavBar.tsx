'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SECTIONS } from './sections'
import { VanGlyph } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'
import { LOCALES } from './i18n/translations'

function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const { locale, setLocale, t } = useLanguage()
  return (
    <div role="group" aria-label={t.nav.language} className={`flex rounded-full p-1 ${onDark ? 'bg-[#fbf5ea]/15' : 'bg-[#2b1d14]/8'}`} dir="ltr">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          title={l.name}
          className={`min-w-9 rounded-full px-2.5 py-1 text-sm font-bold transition-colors ${
            locale === l.code
              ? 'bg-[#1b3a63] text-[#fbf5ea]'
              : onDark
                ? 'text-[#fbf5ea]/80 hover:text-[#fbf5ea]'
                : 'text-[#5c4636] hover:text-[#2b1d14]'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function NavBar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('depart')
  const { scrollYProgress } = useScroll()
  const vanLeft = useTransform(scrollYProgress, (v) => `calc(${v * 100}% - ${v * 28}px)`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const links = SECTIONS.slice(1)
  // Over the hero photo the bar is transparent, so it needs light text.
  const onDark = !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-[#fbf5ea]/95 shadow-[0_1px_0_rgba(43,29,20,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20">
        <a href="#depart" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <VanGlyph className="h-7 w-auto shrink-0" />
          <span
            className={`font-display truncate text-base font-bold leading-none sm:text-lg ${
              onDark ? 'text-[#fbf5ea]' : 'text-[#2b1d14]'
            }`}
          >
            {t.nav.brand}
          </span>
        </a>

        <nav aria-label={t.nav.main} className="hidden items-center gap-1 lg:flex">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                onDark
                  ? 'text-[#fbf5ea]/85 hover:text-[#fbf5ea]'
                  : active === id
                    ? 'bg-[#c0532d]/10 text-[#9c3f1f]'
                    : 'text-[#5c4636] hover:text-[#2b1d14]'
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
          <span className="mx-2">
            <LanguageToggle onDark={onDark} />
          </span>
          <a
            href="#partenaire"
            className="rounded-full bg-[#c0532d] px-5 py-2.5 text-sm font-bold text-[#fbf5ea] transition-colors hover:bg-[#9c3f1f]"
          >
            {t.nav.cta}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle onDark={onDark} />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="cv-mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className={`grid h-11 w-11 place-items-center rounded-full ${onDark ? 'text-[#fbf5ea]' : 'text-[#2b1d14]'}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="cv-mobile-nav" aria-label={t.nav.mobile} className="border-t border-[#2b1d14]/10 px-4 pb-5 lg:hidden">
          <ul className="flex flex-col">
            {links.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#2b1d14]/5 py-3.5 text-base font-semibold text-[#2b1d14]"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#partenaire"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-[#c0532d] py-3 text-center font-bold text-[#fbf5ea]"
          >
            {t.nav.ctaLong}
          </a>
        </nav>
      )}

      {/* Scroll progress: the caravan rides along the top of the page */}
      <div className="relative h-[3px] bg-[#2b1d14]/5" aria-hidden="true" dir="ltr">
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-[#c0532d]" />
        <motion.div style={{ left: vanLeft }} className="absolute -top-[13px] w-7 xl:hidden">
          <VanGlyph className="h-auto w-7" />
        </motion.div>
      </div>
    </header>
  )
}
