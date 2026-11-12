'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AtlasScene } from './illustrations'
import { EASE } from './Reveal'
import { useLanguage } from './i18n/LanguageContext'

export default function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="depart" className="relative flex min-h-[max(100svh,640px)] flex-col overflow-hidden">
      <AtlasScene animate={!reduce} label={t.hero.sceneLabel} vanLabel={t.van} />
      {/* Soft light behind the text keeps it readable over the illustration */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 30%, rgba(251,245,234,0.85), rgba(251,245,234,0) 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-28 text-center sm:px-6 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-[#c0532d]/30 bg-[#fbf5ea]/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#9c3f1f]"
        >
          {t.hero.badge}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="font-display mt-5 text-4xl font-black leading-[1.05] text-[#2b1d14] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t.hero.title1}
          <span className="block font-semibold italic text-[#c0532d]">{t.hero.title2}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#5c4636] md:text-xl"
        >
          {t.hero.slogan}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#partenaire"
            className="w-full rounded-full bg-[#c0532d] px-7 py-3.5 text-base font-bold text-[#fbf5ea] shadow-lg shadow-[#c0532d]/25 transition-colors hover:bg-[#9c3f1f] sm:w-auto"
          >
            {t.hero.ctaSupport}
          </a>
          <a
            href="#projet"
            className="w-full rounded-full border-2 border-[#1b3a63] bg-[#fbf5ea]/70 px-7 py-3 text-base font-bold text-[#1b3a63] transition-colors hover:bg-[#1b3a63] hover:text-[#fbf5ea] sm:w-auto"
          >
            {t.hero.ctaDiscover}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
