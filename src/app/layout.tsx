import type { Metadata } from 'next'
import { El_Messiri, Fraunces, Source_Sans_3, Tajawal } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600', '700'],
})

const elMessiri = El_Messiri({
  subsets: ['arabic'],
  variable: '--font-ar-display',
  weight: ['500', '600', '700'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-ar-body',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: "Caravane de l'Espoir pour la Scolarisation | قافلة الأمل للتمدرس",
  description:
    "Une caravane solidaire dans le Moyen Atlas et le Haut Atlas : fournitures scolaires, semaines de soutien scolaire, activités éducatives et coins de lecture pour réduire le décrochage scolaire.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${sourceSans.variable} ${elMessiri.variable} ${tajawal.variable}`}>
      <body className="cv-root antialiased">{children}</body>
    </html>
  )
}
