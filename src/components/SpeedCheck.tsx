import { useState, type FormEvent } from 'react'

// Free client-side call to Google's public PageSpeed Insights API (runs Lighthouse
// on Google's infrastructure, not ours — zero load on our own hosting).
// Optional key raises the quota; without one it still works on the small
// anonymous quota. Set PUBLIC_PAGESPEED_API_KEY in .env.local / Vercel env vars
// to get a key from https://developers.google.com/speed/docs/insights/v5/get-started
const API_KEY = import.meta.env.PUBLIC_PAGESPEED_API_KEY as string | undefined
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']

type Scores = Record<string, number | null>

const LABELS: Record<string, string> = {
  performance: 'Rendimiento',
  accessibility: 'Accesibilidad',
  'best-practices': 'Buenas prácticas',
  seo: 'SEO',
}

function scoreColor(score: number | null) {
  if (score === null) return '#6B7280'
  if (score >= 90) return '#22C55E'
  if (score >= 50) return '#E5A93C'
  return '#EF4444'
}

function normalizeUrl(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function ScoreCircle({ label, score }: { label: string; score: number | null }) {
  const color = scoreColor(score)
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const progress = score === null ? 0 : (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20">
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-extrabold heading" style={{ fontSize: '1.25rem', color }}>
          {score ?? '–'}
        </div>
      </div>
      <span className="text-xs text-white/50 text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </span>
    </div>
  )
}

export default function SpeedCheck() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [scores, setScores] = useState<Scores | null>(null)
  const [vitals, setVitals] = useState<{ fcp?: string; lcp?: string; cls?: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const target = normalizeUrl(url)
    if (!target || loading) return

    setLoading(true)
    setError('')
    setScores(null)
    setVitals(null)

    try {
      const params = new URLSearchParams({ url: target, strategy })
      CATEGORIES.forEach((c) => params.append('category', c))
      if (API_KEY) params.set('key', API_KEY)

      const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error?.message || 'No pudimos analizar esa URL.')
      }

      const categories = data?.lighthouseResult?.categories
      if (!categories) throw new Error('No pudimos analizar esa URL.')

      const nextScores: Scores = {}
      CATEGORIES.forEach((c) => {
        nextScores[c] = categories[c] ? Math.round(categories[c].score * 100) : null
      })
      setScores(nextScores)

      const audits = data?.lighthouseResult?.audits
      setVitals({
        fcp: audits?.['first-contentful-paint']?.displayValue,
        lcp: audits?.['largest-contentful-paint']?.displayValue,
        cls: audits?.['cumulative-layout-shift']?.displayValue,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al analizar la web. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="diagnostico" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
          — Diagnóstico gratis
        </span>
        <h2 className="heading font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          ¿Qué tan rápida es<br />
          <span style={{ color: '#2563EB' }}>tu página web?</span>
        </h2>
        <p className="text-white/50 leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem' }}>
          Analiza tu sitio en segundos con el mismo motor de Google (Lighthouse) y descubre qué está frenando tu rendimiento, SEO y accesibilidad.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
          <input
            required
            type="text"
            placeholder="tuweb.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3.5 rounded-xl text-white text-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {loading ? 'Analizando...' : 'Analizar mi web →'}
          </button>
        </form>

        <div className="flex justify-center gap-2 mb-10">
          {(['mobile', 'desktop'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStrategy(s)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                strategy === s
                  ? { background: 'rgba(37,99,235,0.2)', border: '1px solid #2563EB', color: 'white' }
                  : { background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
              }
            >
              {s === 'mobile' ? '📱 Móvil' : '🖥 Escritorio'}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
        )}

        {loading && !scores && (
          <p className="text-white/40 text-sm mb-8 animate-pulse" style={{ fontFamily: 'Inter, sans-serif' }}>
            Esto puede tardar 15–30 segundos, estamos analizando tu sitio completo...
          </p>
        )}

        {scores && (
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {CATEGORIES.map((c) => (
                <ScoreCircle key={c} label={LABELS[c]} score={scores[c]} />
              ))}
            </div>

            {vitals && (vitals.fcp || vitals.lcp || vitals.cls) && (
              <div className="grid grid-cols-3 gap-4 pt-6 mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { label: 'FCP', value: vitals.fcp },
                  { label: 'LCP', value: vitals.lcp },
                  { label: 'CLS', value: vitals.cls },
                ].map((v) => (
                  <div key={v.label}>
                    <div className="text-xs text-white/35 uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{v.label}</div>
                    <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{v.value || '–'}</div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-white/50 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              ¿Quieres mejorar estos números? Te ayudamos a optimizarlos.
            </p>
            <a
              href="#contacto"
              className="inline-block px-7 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Cotiza tu optimización →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
