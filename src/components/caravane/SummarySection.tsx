'use client'

import { Reveal, Ridge, SectionHeading } from './Reveal'
import { Person, VanShape } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'
import Photo from './Photo'

/** Arrival scene: the caravan parked at a village school with its new reading corner. */
function ArrivalScene({ label, school, vanLabel }: { label: string; school: string; vanLabel: string }) {
  return (
    <svg
      viewBox="0 80 800 300"
      className="h-auto w-full"
      role="img"
      aria-label={label}
    >
      <rect width="800" height="400" fill="#f8dcb0" />
      <path d="M0 230 L120 150 L230 200 L360 110 L480 190 L600 120 L720 180 L800 150 V400 H0Z" fill="#a9b4ca" />
      <path d="M360 110 340 128 350 124 360 132 370 124 384 127z" fill="#f7f4ee" />
      <path d="M600 120 580 136 590 132 600 140 610 132 622 135z" fill="#f7f4ee" />
      <path d="M0 290 Q200 230 400 262 T800 250 V400 H0Z" fill="#d9a174" />
      <path d="M0 330 H800 V400 H0Z" fill="#c77d52" />

      {/* School */}
      <rect x="300" y="190" width="300" height="140" fill="#fbf5ea" />
      <rect x="292" y="182" width="316" height="12" fill="#c0532d" />
      <rect x="300" y="194" width="300" height="6" fill="#d39b2a" opacity="0.6" />
      <rect x="425" y="248" width="50" height="82" rx="25" fill="#2c5f9e" />
      <circle cx="465" cy="292" r="2.5" fill="#d39b2a" />
      <rect x="400" y="206" width="100" height="26" rx="4" fill="#2c5f9e" />
      <text x="450" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fbf5ea" fontFamily="var(--font-ar-body), system-ui, sans-serif">
        {school}
      </text>
      {[325, 520].map((x) => (
        <g key={x}>
          <rect x={x} y="226" width="56" height="50" rx="28" fill="#2c5f9e" />
          <path d={`M${x + 28} 226v50M${x} 254h56`} stroke="#fbf5ea" strokeWidth="2.5" />
        </g>
      ))}

      {/* Reading-corner shelf next to the school */}
      <g transform="translate(620 236)">
        <rect width="70" height="94" rx="3" fill="#8f5634" />
        <rect x="5" y="6" width="60" height="38" fill="#f3e6cf" />
        <rect x="5" y="50" width="60" height="38" fill="#f3e6cf" />
        {[
          [8, '#c0532d', 12],
          [15, '#2c5f9e', 16],
          [22, '#d39b2a', 10],
          [29, '#3e8a4a', 14],
          [44, '#c0532d', 12],
          [51, '#2c5f9e', 10],
        ].map(([x, c, top], i) => (
          <rect key={i} x={x as number} y={top as number} width="6" height={44 - (top as number)} fill={c as string} />
        ))}
        {[
          [8, '#3e8a4a', 56],
          [15, '#d39b2a', 60],
          [22, '#c0532d', 58],
          [40, '#2c5f9e', 56],
          [47, '#3e8a4a', 60],
          [54, '#d39b2a', 58],
        ].map(([x, c, top], i) => (
          <rect key={i} x={x as number} y={top as number} width="6" height={88 - (top as number)} fill={c as string} />
        ))}
      </g>

      {/* Caravan parked */}
      <g transform="translate(40 262) scale(0.95)">
        <VanShape label={vanLabel} />
      </g>

      {/* Pupils and a volunteer, all modestly dressed */}
      <Person x={215} y={352} scale={1.05} hijab="#2c5f9e" garment="#8a4f7d" bag="#c0532d" />
      <Person x={265} y={354} scale={0.95} garment="#3e8a4a" bag="#d39b2a" beanie="#c0532d" skin="#b67a4f" />
      <Person x={560} y={356} scale={1.4} hijab="#1b3a63" garment="#a0522d" book="#3e8a4a" skin="#d0976a" />
      <Person x={612} y={360} scale={0.95} hijab="#d39b2a" garment="#2c5f9e" bag="#3e8a4a" skin="#b67a4f" />
      <Person x={720} y={360} scale={1} garment="#c0532d" bag="#2c5f9e" />
      <path d="M0 360 H800" stroke="#a9653d" strokeWidth="2" opacity="0.4" />
    </svg>
  )
}

export default function SummarySection() {
  const { t } = useLanguage()
  const s = t.summary
  return (
    <section id="resume" className="relative scroll-mt-16 bg-[#fbf5ea]">
      <Ridge from="#f3e6cf" to="#fbf5ea" />
      <div className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading stop="06" eyebrow={s.eyebrow} title={s.title} center />

          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-[#2b1d14]/10">
              <ArrivalScene label={s.sceneLabel} school={s.school} vanLabel={t.van} />
            </div>
          </Reveal>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Reveal className="mx-auto w-full max-w-[480px]">
              <Photo
                src="/images/eleves-ecole.jpg"
                alt={t.photos.pupilsAlt}
                caption={t.photos.pupilsCaption}
                width={468}
                height={313}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="relative h-full rounded-3xl bg-[#1b3a63] p-8 text-[#fbf5ea] md:p-10">
                <div className="cv-zellige-light pointer-events-none absolute inset-0 rounded-3xl opacity-[0.07]" aria-hidden="true" />
                <p className="relative font-display text-xl leading-relaxed md:text-2xl">{s.text}</p>
              </blockquote>
            </Reveal>
          </div>

          <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#partenaire"
              className="w-full rounded-full bg-[#c0532d] px-7 py-3.5 text-center font-bold text-[#fbf5ea] transition-colors hover:bg-[#9c3f1f] sm:w-auto"
            >
              {t.hero.ctaSupport}
            </a>
            <a
              href="#depart"
              className="w-full rounded-full border-2 border-[#2b1d14]/20 px-7 py-3 text-center font-bold text-[#2b1d14] transition-colors hover:border-[#2b1d14] sm:w-auto"
            >
              {s.back}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
