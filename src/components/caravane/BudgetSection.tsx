'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { Reveal, Ridge, SectionHeading } from './Reveal'
import { useLanguage } from './i18n/LanguageContext'

type Funding = 'financement' | 'parrainage' | null

// Categorical order validated for colour-vision deficiency against the sand surface.
// Labels and descriptions live in the translations (budget.postes), in the same order.
const POSTES: { pct: number; color: string; funding: Funding }[] = [
  { pct: 40, color: '#c0532d', funding: 'financement' },
  { pct: 20, color: '#2c5f9e', funding: null },
  { pct: 15, color: '#d39b2a', funding: 'financement' },
  { pct: 15, color: '#3e8a4a', funding: 'parrainage' },
  { pct: 10, color: '#8a4f7d', funding: 'parrainage' },
]

const R = 80
const C = 2 * Math.PI * R
const GAP = 3
const ARCS = POSTES.map((p, i) => ({
  len: (p.pct / 100) * C,
  start: (POSTES.slice(0, i).reduce((sum, q) => sum + q.pct, 0) / 100) * C,
}))

export default function BudgetSection() {
  const { t } = useLanguage()
  const b = t.budget
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="budget" className="relative scroll-mt-16 bg-[#fbf5ea]">
      <Ridge from="#1b3a63" to="#fbf5ea" />
      <div className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading stop="04" eyebrow={b.eyebrow} title={b.title} />
          <Reveal>
            <p className="mt-4 max-w-2xl text-lg text-[#5c4636]">{b.intro}</p>
          </Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
              <figure>
                <svg viewBox="0 0 200 200" className="w-full" role="img" aria-labelledby="cv-budget-title">
                  <title id="cv-budget-title">{b.chartTitle}</title>
                  <g transform="rotate(-90 100 100)">
                    {POSTES.map((p, i) => (
                      <circle
                        key={i}
                        cx="100"
                        cy="100"
                        r={R}
                        fill="none"
                        stroke={p.color}
                        strokeWidth={active === i ? 30 : 24}
                        strokeDasharray={`${ARCS[i].len - GAP} ${C - ARCS[i].len + GAP}`}
                        strokeDashoffset={-ARCS[i].start}
                        opacity={active === null || active === i ? 1 : 0.35}
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                      />
                    ))}
                  </g>
                  <text x="100" y={active !== null ? 98 : 100} textAnchor="middle" className="font-display" fontSize="34" fontWeight="700" fill="#2b1d14">
                    {t.pct(active !== null ? POSTES[active].pct : 100)}
                  </text>
                  <text x="100" y="120" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5c4636">
                    {active !== null ? b.postes[active].short : b.centerDefault}
                  </text>
                </svg>
                <figcaption className="mt-3 text-center text-sm text-[#5c4636]">
                  {b.hint}
                </figcaption>
              </figure>
            </Reveal>

            <ul className="space-y-3">
              {POSTES.map((p, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.06}>
                    <div
                      tabIndex={0}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      className={`rounded-2xl border bg-white/70 p-5 transition-all duration-300 ${
                        active === i ? 'border-[#2b1d14]/25 shadow-md' : 'border-[#2b1d14]/10'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="flex items-center gap-3 font-bold text-[#2b1d14]">
                          <span className="h-3.5 w-3.5 shrink-0 rounded-sm" style={{ backgroundColor: p.color }} aria-hidden="true" />
                          {b.postes[i].label}
                        </h3>
                        <span className="font-display shrink-0 text-2xl font-bold text-[#2b1d14]">{t.pct(p.pct)}</span>
                      </div>
                      <div className="mt-2.5 h-1.5 rounded-full bg-[#2b1d14]/5" aria-hidden="true">
                        <div className="h-full rounded-full" style={{ width: `${p.pct * 2.5}%`, backgroundColor: p.color }} />
                      </div>
                      <p className="mt-3 leading-relaxed text-[#5c4636]">
                        <span className="font-semibold text-[#2b1d14]">
                          {b.postes[i].label} – {t.pct(p.pct)}
                        </span>
                        {t.colon}
                        {b.postes[i].text}
                      </p>
                      {p.funding && (
                        <p
                          className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                            p.funding === 'financement' ? 'bg-[#3e8a4a]/12 text-[#2f6b39]' : 'bg-[#2c5f9e]/10 text-[#1b3a63]'
                          }`}
                        >
                          {p.funding === 'financement' ? b.tagFinancement : b.tagParrainage}
                        </p>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="mt-10">
            <aside className="flex gap-4 rounded-3xl border-2 border-[#d39b2a] bg-[#d39b2a]/10 p-6 md:p-8">
              <Info className="mt-0.5 h-6 w-6 shrink-0 text-[#8a6212]" aria-hidden="true" />
              <div>
                <p className="font-bold uppercase tracking-[0.18em] text-[#8a6212] text-xs">{b.noteLabel}</p>
                <p className="mt-2 text-lg leading-relaxed text-[#2b1d14]">
                  {b.note}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
