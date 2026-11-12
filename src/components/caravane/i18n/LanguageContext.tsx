'use client'

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'
import { translations, type Dictionary, type Locale } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'caravane-locale'
const listeners = new Set<() => void>()

function isLocale(value: string | null): value is Locale {
  return value !== null && value in translations
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// A ?lang=ar link wins over the remembered choice, so a shared link opens in its language.
function getSnapshot(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLocale(fromUrl)) return fromUrl
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {}
  return 'fr'
}

function getServerSnapshot(): Locale {
  return 'fr'
}

function setLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {}
  const url = new URL(window.location.href)
  url.searchParams.set('lang', next)
  window.history.replaceState(null, '', url)
  listeners.forEach((listener) => listener())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale], dir }}>
      <div lang={locale} dir={dir} className={`cv-lang-${locale}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
