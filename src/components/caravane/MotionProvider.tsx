'use client'

import { MotionConfig } from 'framer-motion'

/** Honour the visitor's reduced-motion setting for every animation on the page. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
