'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { SECTIONS } from './sections'
import { VanGlyph } from './illustrations'
import { useLanguage } from './i18n/LanguageContext'

// A winding mountain path drawn down the left edge of the page (wide screens only).
// The caravan follows it as you scroll, and each section is a stop along the way.
const W = 56
const H = 600
const PATH = `M28 0 C 50 50, 6 100, 28 150 S 50 250, 28 300 S 6 400, 28 450 S 50 550, 28 600`

export default function JourneyTrail() {
  const { t } = useLanguage()
  const pathRef = useRef<SVGPathElement>(null)
  const { scrollYProgress } = useScroll()
  const [van, setVan] = useState({ x: 28, y: 0 })
  const [stops, setStops] = useState<{ id: (typeof SECTIONS)[number]; t: number; x: number; y: number }[]>([])
  const [progress, setProgress] = useState(0)

  const pointAt = (t: number) => {
    const path = pathRef.current
    if (!path) return { x: 28, y: t * H }
    const p = path.getPointAtLength(path.getTotalLength() * Math.min(1, Math.max(0, t)))
    return { x: p.x, y: p.y }
  }

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v)
    setVan(pointAt(v))
  })

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      setStops(
        SECTIONS.map((id) => {
          const el = document.getElementById(id)
          const t = el ? Math.min(1, el.offsetTop / max) : 0
          return { id, t, ...pointAt(t) }
        }),
      )
      setVan(pointAt(window.scrollY / max))
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      dir="ltr"
      className="pointer-events-none fixed left-3 top-1/2 z-40 hidden h-[64vh] -translate-y-1/2 xl:block"
      style={{ width: W }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible" aria-hidden="true">
        <path ref={pathRef} d={PATH} fill="none" stroke="#2b1d14" strokeOpacity="0.15" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <motion.path d={PATH} fill="none" stroke="#c0532d" strokeWidth="3" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
      </svg>

      {stops.map((s) => {
        const reached = progress >= s.t - 0.005
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
            style={{ left: `${(s.x / W) * 100}%`, top: `${(s.y / H) * 100}%` }}
            aria-label={`${t.nav.goTo} ${t.nav[s.id]}`}
          >
            <span
              className={`block h-3 w-3 rounded-full border-2 transition-colors ${
                reached ? 'border-[#c0532d] bg-[#c0532d]' : 'border-[#2b1d14]/30 bg-[#fbf5ea]'
              }`}
            />
            <span className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#2b1d14] px-2.5 py-1 text-xs font-semibold text-[#fbf5ea] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {t.nav[s.id]}
            </span>
          </a>
        )
      })}

      <div
        className="absolute -translate-x-1/2 -translate-y-[85%] drop-shadow-sm"
        style={{ left: `${(van.x / W) * 100}%`, top: `${(van.y / H) * 100}%` }}
      >
        <VanGlyph className="h-auto w-10" />
      </div>
    </div>
  )
}
