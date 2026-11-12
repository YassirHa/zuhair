'use client'

import { motion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Section heading styled as a stop on the journey ("Étape du voyage · 02"). */
export function SectionHeading({
  stop,
  eyebrow,
  title,
  light = false,
  center = false,
}: {
  stop: string
  eyebrow: string
  title: React.ReactNode
  light?: boolean
  center?: boolean
}) {
  return (
    <Reveal className={center ? 'text-center' : undefined}>
      <p
        className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] ${
          light ? 'text-[#f6d27a]' : 'text-[#c0532d]'
        }`}
      >
        <span
          className={`grid h-7 w-7 place-items-center rounded-full border text-[11px] tracking-normal ${
            light ? 'border-[#f6d27a]/60' : 'border-[#c0532d]/50'
          }`}
        >
          {stop}
        </span>
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${
          light ? 'text-[#fbf5ea]' : 'text-[#2b1d14]'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  )
}

/** A mountain ridge rising from the previous section's colour into the next one. */
export function Ridge({ from, to }: { from: string; to: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block h-10 w-full md:h-16"
      style={{ backgroundColor: from }}
      aria-hidden="true"
    >
      <path
        d="M0 80 L0 52 L110 30 L210 48 L330 14 L450 44 L560 26 L690 56 L820 10 L940 46 L1060 24 L1180 50 L1300 20 L1440 42 L1440 80Z"
        fill={to}
      />
    </svg>
  )
}
