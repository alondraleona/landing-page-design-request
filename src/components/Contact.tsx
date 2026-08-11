import { useState, type FormEvent } from 'react'
import ScheduleButton from './ScheduleButton'
import { projectId, publicAnonKey } from '@/lib/supabase-info'

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/server/make-server-150c1629`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${SERVER_URL}/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch {
      setError('No pudimos enviar tu mensaje. Intenta de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-200"
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'Inter, sans-serif',
    color: 'white',
  }

  return (
    <section id="contacto" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(229,169,60,0.06) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
              — Hablemos
            </span>
            <h2 className="heading font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Listo para llevar tu<br />
              negocio al <span style={{ color: '#E5A93C' }}>siguiente nivel</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem' }}>
              Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas con una propuesta inicial sin costo.
            </p>

            <div className="space-y-5">
              {[
                { icon: '✉', label: 'Email', value: 'hola@alostudio.pe' },
                { icon: '📍', label: 'Ubicación', value: 'Perú · Clientes globales' },
                { icon: '⚡', label: 'Respuesta', value: 'Menos de 24 horas' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-white/35 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{c.label}</div>
                    <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-sm text-white/40 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Prefieres agendar una llamada directamente?
              </p>
              <ScheduleButton />
            </div>
          </div>

          {/* Right form */}
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(37,99,235,0.2)', border: '2px solid #2563EB' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6L23 8" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="heading font-bold text-white text-xl mb-2">¡Mensaje recibido!</h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Nombre</label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className={inputClass}
                      style={inputStyle}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Email</label>
                    <input
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className={inputClass}
                      style={inputStyle}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Empresa (opcional)</label>
                  <input
                    type="text"
                    placeholder="Nombre de tu empresa"
                    className={inputClass}
                    style={inputStyle}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Servicio de interés</label>
                  <select
                    className={inputClass}
                    style={{ ...inputStyle, appearance: 'none' }}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="" style={{ background: '#0F131C' }}>Selecciona un servicio</option>
                    <option value="ux" style={{ background: '#0F131C' }}>UI/UX Design</option>
                    <option value="ecomm" style={{ background: '#0F131C' }}>E-commerce</option>
                    <option value="api" style={{ background: '#0F131C' }}>Automatizaciones API</option>
                    <option value="branding" style={{ background: '#0F131C' }}>Branding & Identidad</option>
                    <option value="otro" style={{ background: '#0F131C' }}>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Tu proyecto</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y plazos..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {sending ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
