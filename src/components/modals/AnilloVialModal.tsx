import AnimatedModal from './AnimatedModal'

export default function AnilloVialModal({ onClose }: { onClose: () => void }) {
  const metrics = [
    { value: '100%', label: 'Responsive\nmobile-first' },
    { value: '<3', label: 'Clics para\nacceso clave' },
    { value: '+200%', label: 'Claridad en\nmétric. de impacto' },
    { value: '34.8km', label: 'Tramo vial\ndocumentado' },
  ]

  const before = ['Densidad textual sin jerarquía', 'Navegación fragmentada y rota', 'Sin métricas de impacto visibles', 'Interfaz no responsiva', 'Acceso ciudadano en +7 clics']
  const after = ['Arquitectura de información por pilares', 'Menú unificado con saltos rápidos', 'Dashboard de impacto en hero', '100% mobile-first', 'Servicios clave en <3 clics']

  const pillars = [
    { icon: '🗺️', title: 'Desglose por Tramos', desc: 'Sección interactiva con mapa y estado de avance por tramo del anillo vial.' },
    { icon: '❓', title: 'FAQs Ciudadanas', desc: 'Preguntas frecuentes organizadas por tema, con búsqueda y respuesta expandible.' },
    { icon: '📋', title: 'Servicios Centralizados', desc: 'Portal unificado para trámites, concesiones e información de peajes.' },
    { icon: '📊', title: 'Métricas de Impacto', desc: 'Hero con cifras en tiempo real: km habilitados, inversión, zonas conectadas.' },
  ]

  return (
    <AnimatedModal onClose={onClose} borderColor="rgba(37,99,235,0.25)">
      {(handleClose) => (
        <>
        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2M14 2H6M14 2V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'Inter, sans-serif' }}>Caso de Estudio UX/UI</div>
              <div className="heading font-bold text-white text-sm">Anillo Vial</div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-6 pb-10 space-y-10 pt-6">

          {/* Hero */}
          <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(15,19,28,0.9) 100%)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=400&fit=crop&auto=format" alt="Anillo Vial" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10 p-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Lead UX/UI Designer · 2024</span>
              <h2 className="heading font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                De portal burocrático<br />a <span style={{ color: '#2563EB' }}>plataforma ciudadana moderna</span>
              </h2>
              <p className="text-white/60 text-sm max-w-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Rediseño completo del portal web de la Sociedad Concesionaria Anillo Vial, transformando una web estática en una experiencia digital accesible, clara y orientada al ciudadano.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Proyecto', value: 'anillovial.com' },
                  { label: 'Plataforma', value: 'Web Corporativa' },
                  { label: 'Enfoque', value: 'Diseño y Desarrollo' },
                  { label: 'Tramo', value: '47 km de vía' },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-white/35 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{m.label}</div>
                    <div className="heading font-bold text-white text-sm">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contexto */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>1</span>
              <h3 className="heading font-bold text-white">Contexto y Alcance</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  El portal existente de Anillo Vial presentaba una arquitectura de información fragmentada, textos densos sin jerarquía y una experiencia que frustraba al ciudadano en su búsqueda de información de trámites, peajes y avance de obra.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '47 km', lbl: 'de tramo vial' },
                  { val: '3 zonas', lbl: 'metropolitanas' },
                  { val: '+2M', lbl: 'usuarios beneficiados' },
                  { val: '1 portal', lbl: 'unificado' },
                ].map((s) => (
                  <div key={s.lbl} className="rounded-xl p-4 text-center" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <div className="heading font-extrabold" style={{ color: '#2563EB', fontSize: '1.3rem' }}>{s.val}</div>
                    <div className="text-white/45 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnóstico */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>2</span>
              <h3 className="heading font-bold text-white">Diagnóstico — Estado Previo</h3>
            </div>

            {/* Image placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Pantalla principal — antes', sub: 'Captura del portal original' },
                { label: 'Flujo de navegación — antes', sub: 'Mapa de arquitectura existente' },
              ].map((img) => (
                <div
                  key={img.label}
                  className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center"
                  style={{ height: 180, background: 'rgba(255,255,255,0.03)', border: '1.5px dashed rgba(255,255,255,0.15)' }}
                >
                  <div className="flex flex-col items-center gap-2 text-center px-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="4" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                        <circle cx="7" cy="8.5" r="1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                        <path d="M2 14l4-3 3 2.5 3-4 4 4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-white/40" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{img.label}</span>
                    <span className="text-xs text-white/25" style={{ fontFamily: 'Inter, sans-serif' }}>{img.sub}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
                      Agregar imagen
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-white/50 text-xs mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Análisis heurístico — deficiencias identificadas:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['Densidad textual sin jerarquía visual', 'Navegación fragmentada (7+ niveles)', 'Cero visibilidad de métricas de impacto', 'Sin accesibilidad WCAG', 'Redundancia de contenido entre secciones', 'No responsivo en mobile'].map((d) => (
                  <div key={d} className="flex items-start gap-2 text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Antes vs Después */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>3</span>
              <h3 className="heading font-bold text-white">Antes vs. Después</h3>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-2 text-center">
                <div className="py-2.5 text-xs font-bold uppercase tracking-wider text-red-400" style={{ background: 'rgba(255,80,80,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Antes</div>
                <div className="py-2.5 text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(37,99,235,0.1)', color: '#7BAAF7', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Después</div>
              </div>
              {before.map((b, idx) => (
                <div key={b} className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="px-4 py-3 text-xs text-white/50 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-red-400 flex-shrink-0">✕</span>{b}
                  </div>
                  <div className="px-4 py-3 text-xs text-white/70 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#2563EB' }} className="flex-shrink-0">✓</span>{after[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solución */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>4</span>
              <h3 className="heading font-bold text-white">Solución Implementada</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}>
                  <div className="text-xl mb-3">{p.icon}</div>
                  <h4 className="heading font-bold text-white text-sm mb-1.5">{p.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impacto */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#2563EB', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>5</span>
              <h3 className="heading font-bold text-white">Impacto y Métricas</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl p-5 text-center" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(15,19,28,0.8) 100%)', border: '1px solid rgba(37,99,235,0.25)' }}>
                  <div className="heading font-extrabold mb-1" style={{ color: '#2563EB', fontSize: '1.7rem' }}>{m.value}</div>
                  <div className="text-white/45 text-xs leading-tight whitespace-pre-line" style={{ fontFamily: 'Inter, sans-serif' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#contacto"
              onClick={handleClose}
              className="flex-1 py-3.5 rounded-xl text-center font-bold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.35)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Quiero un proyecto así →
            </a>
            <button
              onClick={handleClose}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Cerrar
            </button>
          </div>
        </div>
        </>
      )}
    </AnimatedModal>
  )
}
