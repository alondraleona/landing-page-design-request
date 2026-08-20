import { useEffect, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import AnimatedModal from './modals/AnimatedModal'

const STORAGE_KEY = 'cookie_consent'
const OPEN_EVENT = 'cookie-consent:open'

type Consent = {
  analytics: boolean
  marketing: boolean
  timestamp: string
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function applyConsent(consent: Pick<Consent, 'analytics' | 'marketing'>) {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments)
    }
  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  })
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}

function saveConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  applyConsent(consent)
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      applyConsent(existing)
    } else {
      setShowBanner(true)
    }

    const onOpen = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? true)
      setMarketing(current?.marketing ?? true)
      setShowPrefs(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true, timestamp: new Date().toISOString() })
    setShowBanner(false)
  }

  const rejectAll = () => {
    saveConsent({ analytics: false, marketing: false, timestamp: new Date().toISOString() })
    setShowBanner(false)
  }

  const saveCustom = () => {
    saveConsent({ analytics, marketing, timestamp: new Date().toISOString() })
    setShowBanner(false)
    setShowPrefs(false)
  }

  return (
    <>
      {showBanner && <ConsentBanner onAcceptAll={acceptAll} onRejectAll={rejectAll} onCustomize={() => setShowPrefs(true)} />}
      {showPrefs && (
        <AnimatedModal onClose={() => setShowPrefs(false)} borderColor="rgba(229,169,60,0.25)">
          {(handleClose) => (
            <PreferencesPanel
              analytics={analytics}
              marketing={marketing}
              onChangeAnalytics={setAnalytics}
              onChangeMarketing={setMarketing}
              onSave={() => {
                saveCustom()
                handleClose()
              }}
              onAcceptAll={() => {
                acceptAll()
                handleClose()
              }}
              onClose={handleClose}
            />
          )}
        </AnimatedModal>
      )}
    </>
  )
}

function ConsentBanner({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void
  onRejectAll: () => void
  onCustomize: () => void
}) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo('#cookie-banner', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.3 })
  }, [])

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 rounded-2xl p-6"
      style={{ background: '#0F131C', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      <h3 className="heading font-bold text-white text-base mb-2">Usamos cookies 🍪</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
        Usamos cookies propias y de terceros para analizar el tráfico y mejorar tu experiencia. Puedes aceptar todas, rechazarlas o personalizar tus preferencias.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onAcceptAll}
          className="px-4 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105"
          style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Aceptar todas
        </button>
        <button
          onClick={onRejectAll}
          className="px-4 py-2.5 rounded-xl font-semibold text-white/70 text-sm transition-all duration-200 hover:text-white"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Rechazar
        </button>
        <button
          onClick={onCustomize}
          className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200"
          style={{ color: '#E5A93C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Personalizar
        </button>
      </div>
    </div>
  )
}

function PreferencesPanel({
  analytics,
  marketing,
  onChangeAnalytics,
  onChangeMarketing,
  onSave,
  onAcceptAll,
  onClose,
}: {
  analytics: boolean
  marketing: boolean
  onChangeAnalytics: (v: boolean) => void
  onChangeMarketing: (v: boolean) => void
  onSave: () => void
  onAcceptAll: () => void
  onClose: () => void
}) {
  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <h3 className="heading font-extrabold text-white text-xl">Preferencias de cookies</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
      </div>

      <div className="space-y-4 mb-8">
        <CookieCategory
          title="Necesarias"
          description="Imprescindibles para el funcionamiento del sitio. Siempre están activas."
          checked
          disabled
        />
        <CookieCategory
          title="Analíticas"
          description="Nos ayudan a entender cómo usas el sitio (Google Analytics) para mejorarlo."
          checked={analytics}
          onChange={onChangeAnalytics}
        />
        <CookieCategory
          title="Marketing"
          description="Se usan para medir y personalizar anuncios relevantes para ti."
          checked={marketing}
          onChange={onChangeMarketing}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onAcceptAll}
          className="px-5 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105"
          style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Aceptar todas
        </button>
        <button
          onClick={onSave}
          className="px-5 py-3 rounded-xl font-semibold text-white/80 text-sm transition-all duration-200 hover:text-white"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Guardar preferencias
        </button>
      </div>
    </div>
  )
}

function CookieCategory({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div>
        <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{title}</div>
        <p className="text-xs text-white/50 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
      </div>
      <label className="relative inline-flex items-center flex-shrink-0 cursor-pointer" style={{ opacity: disabled ? 0.5 : 1 }}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div
          className="w-10 h-6 rounded-full transition-colors duration-200 peer-checked:bg-blue-600"
          style={{ background: checked ? '#2563EB' : 'rgba(255,255,255,0.15)' }}
        />
        <div
          className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </label>
    </div>
  )
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}
