'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, SectionHeading } from './Reveal'
import { IconCartable, IconEtageres, IconJeux, IconLivres, VanGlyph } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'

// Text for each étape lives in the translations (presentation.stages), in the same order.
const ETAPES = [
  { Icon: IconCartable, color: '#c0532d' },
  { Icon: IconLivres, color: '#2c5f9e' },
  { Icon: IconJeux, color: '#3e8a4a' },
  { Icon: IconEtageres, color: '#8a6212' },
]

// The road the van follows: x in px inside a 64px-wide column, y as a fraction of the height.
const roadX = (t: number) => 32 + 16 * Math.sin(t * Math.PI * 4)
const ROAD_POINTS = Array.from({ length: 81 }, (_, i) => {
  const t = i / 80
  return `${roadX(t).toFixed(2)},${(t * 1000).toFixed(1)}`
}).join(' ')

export default function PresentationSection() {
  const { t, dir } = useLanguage()
  const p = t.presentation
  const routeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: routeRef, offset: ['start 65%', 'end 65%'] })
  const vanTop = useTransform(scrollYProgress, (t) => `${t * 100}%`)
  const vanLeft = useTransform(scrollYProgress, (t) => `${roadX(t)}px`)

  return (
    <section id="projet" className="relative scroll-mt-16 bg-[#fbf5ea] px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading stop="01" eyebrow={p.eyebrow} title={p.title} />

        <div className="mt-10 grid gap-8 text-lg leading-relaxed text-[#5c4636] md:grid-cols-2 md:gap-12">
          <Reveal>
            <p>
              {p.p1[0]}
              <strong className="text-[#2b1d14]">{p.p1[1]}</strong>
              {p.p1[2]}
              <strong className="text-[#2b1d14]">{p.p1[3]}</strong>
              {p.p1[4]}
            </p>
            <p className="mt-5">{p.p2}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-[#1b3a63] p-7 text-[#fbf5ea] md:p-9">
              <div className="cv-zellige-light absolute inset-0 opacity-[0.08]" aria-hidden="true" />
              <p className="relative">{p.p3}</p>
              <p className="relative mt-6 font-display text-xl italic text-[#f6d27a]">{p.tagline}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 text-center">
          <h3 className="font-display text-2xl font-bold text-[#2b1d14] md:text-3xl">{p.stagesTitle}</h3>
          <p className="mt-2 text-[#5c4636]">{p.stagesSub}</p>
        </Reveal>

        {/* The route is laid out left-to-right in both languages; the cards follow the reading direction. */}
        <div ref={routeRef} dir="ltr" className="relative mx-auto mt-12 max-w-4xl">
          {/* Road: a column at the left on mobile, centred on wider screens */}
          <div className="absolute inset-y-0 left-0 w-16 md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <svg viewBox="0 0 64 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <polyline points={ROAD_POINTS} fill="none" stroke="#ebd5ae" strokeWidth="16" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <polyline
                points={ROAD_POINTS}
                fill="none"
                stroke="#fbf5ea"
                strokeWidth="2"
                strokeDasharray="8 10"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <motion.div style={{ top: vanTop, left: vanLeft }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
              <VanGlyph className="h-auto w-14 drop-shadow" />
            </motion.div>
          </div>

          <ol className="relative space-y-10 md:space-y-16">
            {ETAPES.map((e, i) => (
              <li
                key={i}
                className={`relative pl-24 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-16' : 'md:pr-16'}`}
              >
                <Reveal>
                  <article dir={dir} className="rounded-3xl border border-[#2b1d14]/10 bg-white/70 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#f3e6cf] p-2.5">
                        <e.Icon />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: e.color }}>
                          {p.stageLabel} {i + 1}
                        </p>
                        <h4 className="font-display mt-1 text-xl font-bold leading-snug text-[#2b1d14]">{p.stages[i].title}</h4>
                        <p className="mt-1.5 text-[#5c4636]">{p.stages[i].detail}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
