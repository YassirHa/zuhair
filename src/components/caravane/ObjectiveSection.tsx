'use client'

import { GraduationCap, HeartHandshake, TrendingDown } from 'lucide-react'
import { Reveal, Ridge, SectionHeading } from './Reveal'
import { useLanguage } from './i18n/LanguageContext'

// Same order as the translated pillars (objective.pillars).
const PILLARS = [
  { Icon: TrendingDown, accent: '#c0532d' },
  { Icon: GraduationCap, accent: '#2c5f9e' },
  { Icon: HeartHandshake, accent: '#3e8a4a' },
]

export default function ObjectiveSection() {
  const { t } = useLanguage()
  return (
    <section id="objectif" className="relative scroll-mt-16 bg-[#1b3a63] text-[#fbf5ea]">
      <Ridge from="#f3e6cf" to="#1b3a63" />
      <div className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="cv-zellige-light pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading stop="03" eyebrow={t.objective.eyebrow} title={t.objective.title} light />

          <Reveal>
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-[#fbf5ea]/85 md:text-xl">{t.objective.text}</p>
          </Reveal>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <li key={i}>
                <Reveal delay={i * 0.1} className="h-full">
                  <article className="h-full rounded-3xl bg-[#fbf5ea] p-7 text-[#2b1d14]">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-[#fbf5ea]"
                      style={{ backgroundColor: p.accent }}
                    >
                      <p.Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-bold leading-snug">{t.objective.pillars[i].title}</h3>
                    <p className="mt-2 leading-relaxed text-[#5c4636]">{t.objective.pillars[i].text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
