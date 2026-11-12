'use client'

import { useState, type FormEvent } from 'react'
import { BookOpen, Check, Route } from 'lucide-react'
import { Reveal, Ridge, SectionHeading } from './Reveal'
import { useLanguage } from './i18n/LanguageContext'

type Support = 'financement' | 'parrainage' | 'autre'

// Text for each option lives in the translations (partner.options), in the same order.
const OPTIONS = [
  { id: 'financement' as const, Icon: BookOpen, bg: '#c0532d' },
  { id: 'parrainage' as const, Icon: Route, bg: '#1b3a63' },
]

const inputClass =
  'mt-1.5 w-full rounded-xl border border-[#2b1d14]/20 bg-white px-4 py-3 text-base text-[#2b1d14] placeholder:text-[#5c4636]/60 focus:border-[#2c5f9e] focus:outline-none focus:ring-2 focus:ring-[#2c5f9e]/25'

export default function PartnerSection() {
  const { t } = useLanguage()
  const p = t.partner
  const [support, setSupport] = useState<Support>('financement')
  const [sent, setSent] = useState(false)

  function choose(id: Support) {
    setSupport(id)
    document.getElementById('cv-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: connect to an email service or API route before going live.
    setSent(true)
  }

  return (
    <section id="partenaire" className="relative scroll-mt-16 bg-[#f3e6cf]">
      <Ridge from="#fbf5ea" to="#f3e6cf" />
      <div className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading stop="05" eyebrow={p.eyebrow} title={p.title} />
          <Reveal>
            <p className="mt-4 max-w-2xl text-lg text-[#5c4636]">
              {p.intro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {OPTIONS.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.1} className="h-full">
                <article
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl p-7 text-[#fbf5ea] md:p-9"
                  style={{ backgroundColor: o.bg }}
                >
                  <div className="cv-zellige-light pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
                  <div className="relative flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fbf5ea]/15">
                      <o.Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#fbf5ea]/70">{p.optionLabel} {p.options[i].letter}</p>
                      <h3 className="font-display text-2xl font-bold md:text-3xl">{p.options[i].title}</h3>
                    </div>
                  </div>
                  <p className="relative mt-5 font-bold text-[#fbf5ea]">{p.options[i].subtitle}</p>
                  <ul className="relative mt-3 flex-1 space-y-2.5">
                    {p.options[i].items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-lg">
                        <Check className="h-5 w-5 shrink-0 text-[#f6d27a]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => choose(o.id)}
                    className="relative mt-8 rounded-full bg-[#fbf5ea] px-6 py-3.5 text-center font-bold text-[#2b1d14] transition-transform hover:-translate-y-0.5"
                  >
                    {p.options[i].cta}
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div id="cv-contact" className="scroll-mt-24 rounded-3xl bg-[#fbf5ea] p-6 shadow-sm ring-1 ring-[#2b1d14]/5 md:p-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2b1d14] md:text-3xl">{p.contactTitle}</h3>
                  <p className="mt-3 leading-relaxed text-[#5c4636]">
                    {p.contactText}
                  </p>
                </div>

                {sent ? (
                  <div role="status" className="grid place-items-center rounded-2xl bg-[#3e8a4a]/10 p-8 text-center">
                    <div>
                      <Check className="mx-auto h-10 w-10 text-[#2f6b39]" aria-hidden="true" />
                      <p className="font-display mt-3 text-2xl font-bold text-[#2b1d14]">{p.thanks}</p>
                      <p className="mt-2 text-[#5c4636]">{p.thanksText}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-[#2b1d14]">
                      {p.name}
                      <input name="nom" required autoComplete="name" placeholder={p.namePh} className={inputClass} />
                    </label>
                    <label className="block text-sm font-semibold text-[#2b1d14]">
                      {p.org}
                      <input name="organisation" autoComplete="organization" placeholder={p.orgPh} className={inputClass} />
                    </label>
                    <label className="block text-sm font-semibold text-[#2b1d14] sm:col-span-2">
                      {p.email}
                      <input name="email" type="email" required autoComplete="email" dir="ltr" placeholder={p.emailPh} className={inputClass} />
                    </label>
                    <fieldset className="sm:col-span-2">
                      <legend className="text-sm font-semibold text-[#2b1d14]">{p.supportType}</legend>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        {(['financement', 'parrainage', 'autre'] as const).map((value) => (
                          <label
                            key={value}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                              support === value
                                ? 'border-[#c0532d] bg-[#c0532d]/8 text-[#9c3f1f]'
                                : 'border-[#2b1d14]/20 bg-white text-[#2b1d14]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="soutien"
                              value={value}
                              checked={support === value}
                              onChange={() => setSupport(value)}
                              className="accent-[#c0532d]"
                            />
                            {p.supportOptions[value]}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="block text-sm font-semibold text-[#2b1d14] sm:col-span-2">
                      {p.message}
                      <textarea name="message" rows={4} required placeholder={p.messagePh} className={inputClass} />
                    </label>
                    <button
                      type="submit"
                      className="rounded-full bg-[#c0532d] px-7 py-3.5 font-bold text-[#fbf5ea] transition-colors hover:bg-[#9c3f1f] sm:col-span-2 sm:justify-self-start"
                    >
                      {p.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
