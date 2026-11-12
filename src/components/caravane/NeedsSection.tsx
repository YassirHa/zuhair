'use client'

import { Reveal, Ridge, SectionHeading } from './Reveal'
import { IconCartable, IconEtageres, IconJeux, IconLivres, IconOutils, IconVetements } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'

// Icons in the same order as the translated items (needs.items).
const ICONS = [IconCartable, IconOutils, IconVetements, IconLivres, IconEtageres, IconJeux]

export default function NeedsSection() {
  const { t } = useLanguage()
  return (
    <section id="besoins" className="relative scroll-mt-16 bg-[#f3e6cf]">
      <Ridge from="#fbf5ea" to="#f3e6cf" />
      <div className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="cv-zellige pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading stop="02" eyebrow={t.needs.eyebrow} title={t.needs.title} />
          <Reveal>
            <p className="mt-4 max-w-2xl text-lg text-[#5c4636]">
              {t.needs.intro}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.needs.items.map((need, i) => {
              const Icon = ICONS[i]
              return (
              <li key={i}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group flex h-full items-start gap-5 rounded-3xl bg-[#fbf5ea] p-6 shadow-sm ring-1 ring-[#2b1d14]/5 transition-transform duration-300 hover:-translate-y-1">
                    <div className="h-20 w-20 shrink-0 rounded-2xl bg-[#f3e6cf] p-3 transition-transform duration-300 group-hover:rotate-[-4deg]">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#2b1d14]">{need.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-[#5c4636]">{need.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
