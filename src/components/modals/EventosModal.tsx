import { useEffect } from 'react'

export default function EventosModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const issues = [
    { icon: '📅', title: 'Eventos desactualizados', desc: 'La sección "Próximos eventos" muestra eventos pasados. "Talleres pasados" contiene placeholders genéricos (Taller pasado 1, Taller pasado 2) sin contenido real.' },
    { icon: '📵', title: 'Pasividad funcional', desc: 'El sitio es unidireccional: informa pero no convierte. No existe mecanismo de RSVP, recordatorios por WhatsApp/email ni filtro por distritos en el cronograma.' },
    { icon: '👁️', title: 'Carga visual repetitiva', desc: 'El patrón "Infórmate | Participa | Opina" se repite en cabecera sin variación. No hay acceso directo para descargar o consultar el Resumen Ejecutivo del EIA-d.' },
    { icon: '♿', title: 'Accesibilidad e información', desc: 'Elementos redundantes que aumentan la carga cognitiva. Sin jerarquía clara entre eventos urgentes y pasados.' },
  ]

  const wins = [
    { icon: '✅', text: 'FAQs claras sobre Senace y consultora ambiental' },
    { icon: '✅', text: 'Accesos a Google Maps ("Ver mapa") funcionales' },
    { icon: '✅', text: 'Puntos de contacto de Oficinas de Atención Permanente' },
  ]

  const improvements = [
    { num: '01', title: 'Cronograma con filtro por distrito', desc: 'Vista de eventos próximos y pasados separadas, con filtro interactivo por distrito. Estado del evento visible (Próximo / En curso / Realizado).', color: '#E5A93C' },
    { num: '02', title: 'RSVP + Recordatorios automáticos', desc: 'Formulario de inscripción por evento con opción de recordatorio vía WhatsApp o email. Captura de contacto para comunicaciones futuras del EIA-d.', color: '#2563EB' },
    { num: '03', title: 'Acceso al Resumen Ejecutivo EIA-d', desc: 'Sección destacada con descarga del documento oficial + visor en línea sin necesidad de descarga. CTA visible desde el hero.', color: '#E5A93C' },
    { num: '04', title: 'Header simplificado', desc: 'Eliminar redundancia del patrón "Infórmate | Participa | Opina". Mantener jerarquía única con CTA primario hacia el cronograma de eventos.', color: '#2563EB' },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl"
        style={{ background: '#0F131C', border: '1px solid rgba(229,169,60,0.2)' }}
      >
        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E5A93C' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2M14 2H6M14 2V10" stroke="#0F131C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>Caso de Estudio UX/UI</div>
              <div className="heading font-bold text-white text-sm">eventos.anillovial.com</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-6 pb-10 space-y-10 pt-6">

          {/* Hero */}
          <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(229,169,60,0.15) 0%, rgba(15,19,28,0.9) 100%)', border: '1px solid rgba(229,169,60,0.2)' }}>
            <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&h=400&fit=crop&auto=format" alt="Eventos Anillo Vial" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative z-10 p-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>UX/UI · Arquitectura de Información · Producto Web</span>
              <h2 className="heading font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>
                De landing estática a<br /><span style={{ color: '#E5A93C' }}>plataforma de participación ciudadana activa</span>
              </h2>
              <p className="text-white/60 text-sm max-w-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Diagnóstico y estrategia de rediseño para la landing de convocatoria de Talleres Participativos y Audiencias Públicas del Estudio de Impacto Ambiental (EIA-d) de la concesión vial.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Plataforma', value: 'eventos.anillovial.com' },
                  { label: 'Enfoque', value: 'UX/UI · Producto Web' },
                  { label: 'Tipo', value: 'Infraestructura Pública' },
                  { label: 'Proceso', value: 'EIA-d Senace' },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-white/35 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{m.label}</div>
                    <div className="heading font-bold text-white text-xs leading-snug">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnóstico */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>1</span>
              <h3 className="heading font-bold text-white">Diagnóstico del sitio actual</h3>
            </div>
            <p className="text-white/40 text-xs mb-5 ml-8" style={{ fontFamily: 'Inter, sans-serif' }}>Problemas críticos identificados que frenan la participación ciudadana</p>

            {/* Image placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { label: 'Sección "Próximos eventos" — estado actual', sub: 'Captura del sitio con eventos desactualizados' },
                { label: 'Sección "Talleres pasados" — estado actual', sub: 'Captura con placeholders sin contenido real' },
              ].map((img) => (
                <div
                  key={img.label}
                  className="relative rounded-xl flex flex-col items-center justify-center"
                  style={{ height: 172, background: 'rgba(255,255,255,0.03)', border: '1.5px dashed rgba(229,169,60,0.25)' }}
                >
                  <div className="flex flex-col items-center gap-2 text-center px-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1" style={{ background: 'rgba(229,169,60,0.08)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="4" width="16" height="12" rx="2" stroke="rgba(229,169,60,0.4)" strokeWidth="1.5"/>
                        <circle cx="7" cy="8.5" r="1.5" stroke="rgba(229,169,60,0.4)" strokeWidth="1.5"/>
                        <path d="M2 14l4-3 3 2.5 3-4 4 4.5" stroke="rgba(229,169,60,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: 'rgba(229,169,60,0.5)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{img.label}</span>
                    <span className="text-xs text-white/25" style={{ fontFamily: 'Inter, sans-serif' }}>{img.sub}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(229,169,60,0.08)', color: 'rgba(229,169,60,0.4)', fontFamily: 'Inter, sans-serif' }}>
                      Agregar imagen
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issues.map((issue) => (
                <div key={issue.title} className="rounded-xl p-5" style={{ background: 'rgba(255,80,80,0.05)', border: '1px solid rgba(255,80,80,0.12)' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{issue.icon}</span>
                    <div>
                      <h4 className="heading font-bold text-white text-sm mb-1.5">{issue.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{issue.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aciertos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>2</span>
              <h3 className="heading font-bold text-white">Aciertos a conservar</h3>
            </div>
            <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {wins.map((w) => (
                <div key={w.text} className="flex items-center gap-3 text-sm text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>{w.icon}</span>
                  {w.text}
                </div>
              ))}
            </div>
          </div>

          {/* Mejoras propuestas */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>3</span>
              <h3 className="heading font-bold text-white">Mejoras Propuestas</h3>
            </div>
            <p className="text-white/40 text-xs mb-5 ml-8" style={{ fontFamily: 'Inter, sans-serif' }}>Estrategia de producto para convertir el sitio en un canal activo de participación</p>
            <div className="space-y-4">
              {improvements.map((imp) => (
                <div key={imp.num} className="flex gap-4 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="heading font-extrabold flex-shrink-0" style={{ color: imp.color, fontSize: '1.8rem', lineHeight: 1, opacity: 0.5 }}>{imp.num}</div>
                  <div>
                    <h4 className="heading font-bold text-white text-sm mb-1.5">{imp.title}</h4>
                    <p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{imp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#contacto"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-center font-bold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{ background: '#E5A93C', color: '#0F131C', boxShadow: '0 0 24px rgba(229,169,60,0.3)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Quiero un proyecto así →
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
