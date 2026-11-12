'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { RoadStrip } from './illustrations'
import { EASE } from './Reveal'
import { useLanguage } from './i18n/LanguageContext'

export default function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="depart" className="relative flex min-h-[max(100svh,640px)] flex-col overflow-hidden bg-[#1c130d]">
      <Image
        src="/images/bus-atlas-neige.jpg"
        alt={t.photos.heroAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] md:object-center"
      />
      {/* Darken the side where the text sits; on desktop the volunteers on the right stay visible */}
      <div
        className="absolute inset-0 bg-[#1c130d]/60 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(28,19,13,0.88)_0%,rgba(28,19,13,0.6)_38%,rgba(28,19,13,0.05)_70%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1c130d]/60 to-transparent" aria-hidden="true" />

      {/* The text block stays on the left in both languages so it never covers the volunteers */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-32 pt-28 sm:px-6 md:pb-40">
        <div className="mr-auto max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-[#f6d27a]/40 bg-[#1c130d]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#f6d27a] backdrop-blur-sm"
          >
            {t.hero.badge}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-display mt-5 text-4xl font-black leading-[1.05] text-[#fbf5ea] sm:text-5xl md:text-6xl"
          >
            {t.hero.title1}
            <span className="block font-semibold italic text-[#f6d27a]">{t.hero.title2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#fbf5ea]/90 md:text-xl"
          >
            {t.hero.slogan}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#partenaire"
              className="rounded-full bg-[#c0532d] px-7 py-3.5 text-center text-base font-bold text-[#fbf5ea] shadow-lg shadow-black/25 transition-colors hover:bg-[#9c3f1f]"
            >
              {t.hero.ctaSupport}
            </a>
            <a
              href="#projet"
              className="rounded-full border-2 border-[#fbf5ea]/80 px-7 py-3 text-center text-base font-bold text-[#fbf5ea] transition-colors hover:bg-[#fbf5ea] hover:text-[#2b1d14]"
            >
              {t.hero.ctaDiscover}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <RoadStrip animate={!reduce} vanLabel={t.van} />
      </div>
    </section>
  )
}
