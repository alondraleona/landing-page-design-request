// Sección "Cotizador Interactivo" — removida de la landing page, conservada aquí en el repositorio.
// No se importa desde App.tsx.
import { useState } from 'react'

const serviceOptions = [
  { id: 'ux', label: 'UI/UX Design', hours: 20 },
  { id: 'ecomm', label: 'E-commerce', hours: 40 },
  { id: 'api', label: 'Automatizaciones API', hours: 15 },
  { id: 'branding', label: 'Branding & Identidad', hours: 12 },
  { id: 'disenomarca', label: 'Diseño de Marca', hours: 16 },
  { id: 'seo', label: 'SEO Técnico', hours: 8 },
  { id: 'landing', label: 'Landing Page', hours: 10 },
]

const PEN_RATE = 50
const USD_RATE = 20

export function Quoter() {
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('USD')
  const [selected, setSelected] = useState<string[]>(['ecomm'])
  const [extraHours, setExtraHours] = useState(0)

  const rate = currency === 'PEN' ? PEN_RATE : USD_RATE
  const symbol = currency === 'PEN' ? 'S/' : '$'

  const totalHours =
    serviceOptions.filter((s) => selected.includes(s.id)).reduce((acc, s) => acc + s.hours, 0) +
    Number(extraHours)

  const totalCost = totalHours * rate

  const toggleService = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <section id="cotizador" className="py-28 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
            — Cotizador Interactivo
          </span>
          <h2 className="heading font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            ¿Cuánto cuesta tu <span style={{ color: '#2563EB' }}>próximo proyecto</span>?
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Selecciona los servicios que necesitas y obtén una estimación instantánea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: service selector */}
          <div className="lg:col-span-3 space-y-4">
            {/* Currency toggle */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>Moneda:</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                {(['USD', 'PEN'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className="px-5 py-2 text-sm font-semibold transition-all duration-200"
                    style={{
                      background: currency === c ? '#2563EB' : 'transparent',
                      color: currency === c ? '#fff' : 'rgba(255,255,255,0.45)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {c === 'USD' ? '$ USD' : 'S/ PEN'}
                  </button>
                ))}
              </div>
              <span className="text-xs text-white/30" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currency === 'USD' ? '$20/hr — Clientes internacionales' : 'S/ 50/hr — Mercado nacional'}
              </span>
            </div>

            {/* Services checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map((s) => {
                const isSelected = selected.includes(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className="flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: isSelected ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
                      border: isSelected ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.07)',
                      boxShadow: isSelected ? '0 0 16px rgba(37,99,235,0.15)' : 'none',
                    }}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.label}</div>
                      <div className="text-xs text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>{s.hours}h estimadas</div>
                    </div>
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: isSelected ? '#2563EB' : 'rgba(255,255,255,0.08)' }}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Extra hours */}
            <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <label className="block text-sm font-semibold text-white/70 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Horas adicionales (consultoría, revisiones)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={2}
                  value={extraHours}
                  onChange={(e) => setExtraHours(Number(e.target.value))}
                  className="flex-1 accent-blue-500 cursor-pointer"
                  style={{ accentColor: '#2563EB' }}
                />
                <span className="text-white font-bold w-12 text-right heading" style={{ fontSize: '1.1rem' }}>{extraHours}h</span>
              </div>
            </div>
          </div>

          {/* Right: cost summary */}
          <div className="lg:col-span-2 sticky top-28">
            <div
              className="rounded-2xl p-7"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(15,19,28,0.8) 100%)',
                border: '1px solid rgba(37,99,235,0.25)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 40px rgba(37,99,235,0.15)',
              }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Estimación del proyecto
              </div>

              <div className="space-y-3 mb-6">
                {serviceOptions
                  .filter((s) => selected.includes(s.id))
                  .map((s) => (
                    <div key={s.id} className="flex justify-between items-center">
                      <span className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</span>
                      <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {symbol} {(s.hours * rate).toLocaleString()}
                      </span>
                    </div>
                  ))}
                {extraHours > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>Horas extra ({extraHours}h)</span>
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {symbol} {(extraHours * rate).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {selected.length > 0 && (
                <div className="border-t border-white/10 pt-5 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-white/40 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Total estimado</div>
                      <div className="heading font-extrabold text-white" style={{ fontSize: '2.2rem', letterSpacing: '-0.03em' }}>
                        {symbol} {totalCost.toLocaleString()}
                      </div>
                      <div className="text-xs text-white/35 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {totalHours}h · {rate === 50 ? 'S/ 50/hr' : '$20/hr'}
                      </div>
                    </div>
                    <div className="text-3xl animate-float">
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <rect width="44" height="44" rx="12" fill="rgba(37,99,235,0.2)" />
                        <path d="M14 30L30 14M30 14H18M30 14V26" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {selected.length === 0 && (
                <div className="text-center py-4 text-white/30 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Selecciona al menos un servicio
                </div>
              )}

              <a
                href="#contacto"
                className="block w-full py-3.5 rounded-xl text-center font-bold text-white text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: selected.length > 0 ? '#2563EB' : 'rgba(255,255,255,0.1)',
                  boxShadow: selected.length > 0 ? '0 0 24px rgba(37,99,235,0.4)' : 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  pointerEvents: selected.length === 0 ? 'none' : 'auto',
                }}
              >
                Solicitar cotización formal →
              </a>

              <p className="text-xs text-center text-white/25 mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sin compromiso · Respuesta en 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
