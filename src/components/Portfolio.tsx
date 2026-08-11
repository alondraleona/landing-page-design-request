import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import AnilloVialModal from './modals/AnilloVialModal'
import EventosModal from './modals/EventosModal'
import VidanaModal from './modals/VidanaModal'
import WebProjectModal from './modals/WebProjectModal'

const portfolio = [
  {
    title: 'Aventura Motors — Web',
    tag: 'Diseño y Desarrollo Web',
    desc: 'Diseño y desarrollo de una plataforma automotriz que organiza la oferta de vehículos y convierte la exploración en una consulta directa.',
    color: '#E5A93C',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&auto=format',
    metric: '360°',
    metricLabel: 'experiencia automotriz',
    detail: ['Arquitectura UX/UI', 'Catálogo de vehículos', 'Navegación mobile-first', 'Contacto y consultas'],
    url: 'https://aventuramotors.com.pe',
    urlLabel: 'Visitar Aventura Motors',
    caseStudyAventura: true,
    bar: 86,
  },
  {
    title: 'Anillo Vial',
    tag: 'Diseño y Desarrollo',
    desc: 'Transformación de portal estático y burocrático en plataforma ciudadana moderna, accesible e interactiva.',
    color: '#2563EB',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&auto=format',
    metric: '+200%',
    metricLabel: 'claridad en métricas',
    detail: ['Diseño y Desarrollo', 'Mobile-first responsive', 'IA reestructurada', '<3 clics acceso clave'],
    bar: 88,
    caseStudy: true,
  },
  {
    title: 'Kuyak Perú — Landing Page',
    tag: 'Diseño y Desarrollo Web',
    desc: 'Landing B2B para equipos de bombeo e industria que comunica soluciones de alta eficiencia, catálogo y acompañamiento comercial.',
    color: '#7BAAF7',
    img: 'https://kuyak.pe/wp-content/uploads/2023/11/image-10.png',
    metric: 'B2B',
    metricLabel: 'experiencia industrial',
    detail: ['Landing corporativa', 'Catálogo de bombeo', 'Soluciones por industria', 'Cotización y postventa'],
    url: 'https://kuyak.pe',
    urlLabel: 'Visitar Kuyak Perú',
    caseStudyKuyak: true,
    bar: 89,
  },
  {
    title: 'eventos.anillovial.com',
    tag: 'UX/UI · Producto Web',
    desc: 'Rediseño de landing de convocatoria ciudadana para Talleres Participativos y Audiencias Públicas del EIA-d.',
    color: '#E5A93C',
    img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop&auto=format',
    metric: '+4',
    metricLabel: 'mejoras críticas UX',
    detail: ['Arquitectura de información', 'RSVP + WhatsApp/Email', 'Filtro por distritos', 'Acceso digital EIA-d'],
    bar: 83,
    caseStudyEventos: true,
  },
  {
    title: 'Workline Partners — Web & Gráfica',
    tag: 'Diseño Web · Piezas Gráficas',
    desc: 'Rediseño web y sistema de piezas gráficas para comunicar servicios de staffing con claridad, confianza y respuesta ágil.',
    color: '#E5A93C',
    img: 'https://static.wixstatic.com/media/5719bd_6dd82373204144a4afe22ce419eed901~mv2.jpeg/v1/fill/w_1280,h_720,al_c/5719bd_6dd82373204144a4afe22ce419eed901~mv2.jpeg',
    metric: '360°',
    metricLabel: 'presencia de marca',
    detail: ['Rediseño UX/UI', 'Piezas para campañas', 'Comunicación B2B', 'CTAs de contratación'],
    url: 'https://www.worklinepartners.com/',
    urlLabel: 'Visitar Workline Partners',
    caseStudyWorkline: true,
    bar: 90,
  },
  {
    title: 'VIDANA — Diseño de Marca',
    tag: 'Branding & Identidad',
    desc: 'Una identidad vital y cercana para una propuesta saludable, alta en proteína e inclusiva.',
    color: '#7BAAF7',
    img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop&auto=format',
    metric: '360°',
    metricLabel: 'identidad adaptable',
    detail: ['Naming estratégico', 'Logo + sistema visual', 'Packaging y uniformes', 'Manual de identidad'],
    bar: 91,
    caseStudyVidana: true,
  },
]

type TiltSetters = { rx: (v: number) => void; ry: (v: number) => void; y: (v: number) => void }

export default function Portfolio() {
  const [active, setActive] = useState<number | null>(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [eventosOpen, setEventosOpen] = useState(false)
  const [vidanaOpen, setVidanaOpen] = useState(false)
  const [aventuraOpen, setAventuraOpen] = useState(false)
  const [kuyakOpen, setKuyakOpen] = useState(false)
  const [worklineOpen, setWorklineOpen] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const innerRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const tiltSetters = useRef<Map<number, TiltSetters>>(new Map())

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
      } else {
        gsap.to('[data-reveal]', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'transform',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        })
        window.addEventListener('load', () => ScrollTrigger.refresh())
      }
    }, gridRef)
    return () => ctx.revert()
  }, [])

  const getTiltSetters = (i: number): TiltSetters | undefined => {
    let setters = tiltSetters.current.get(i)
    if (!setters) {
      const el = innerRefs.current.get(i)
      if (!el) return undefined
      setters = {
        rx: gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' }),
      }
      tiltSetters.current.set(i, setters)
    }
    return setters
  }

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    if (prefersReducedMotion()) return
    const setters = getTiltSetters(i)
    if (!setters) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setters.ry(px * 10)
    setters.rx(-py * 10)
    setters.y(-8)
  }

  const resetTilt = (i: number) => {
    const setters = tiltSetters.current.get(i)
    if (!setters) return
    setters.rx(0)
    setters.ry(0)
    setters.y(0)
  }

  return (
    <section id="portafolio" className="py-28 px-6 relative">
      {caseStudyOpen && <AnilloVialModal onClose={() => setCaseStudyOpen(false)} />}
      {eventosOpen && <EventosModal onClose={() => setEventosOpen(false)} />}
      {vidanaOpen && <VidanaModal onClose={() => setVidanaOpen(false)} />}
      {aventuraOpen && <WebProjectModal project="aventura" onClose={() => setAventuraOpen(false)} />}
      {kuyakOpen && <WebProjectModal project="kuyak" onClose={() => setKuyakOpen(false)} />}
      {worklineOpen && <WebProjectModal project="workline" onClose={() => setWorklineOpen(false)} />}
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
              — Portafolio
            </span>
            <h2 className="heading font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Proyectos que hablan<br />
              <span style={{ color: '#2563EB' }}>por sí solos</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
            Pasa el cursor sobre cada proyecto para ver los resultados y el stack utilizado.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p, i) => {
            const isActive = active === i
            return (
              <div
                key={p.title}
                data-reveal
                className="opacity-0 translate-y-8 relative rounded-2xl overflow-hidden cursor-pointer group hover:z-10"
                style={{
                  border: isActive ? `1px solid ${p.color}44` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive ? `0 12px 40px ${p.color}22` : 'none',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseMove={(e) => handleTilt(e, i)}
                onMouseLeave={() => { setActive(null); resetTilt(i) }}
                onClick={() => {
                if ((p as any).caseStudy) setCaseStudyOpen(true)
                if ((p as any).caseStudyEventos) setEventosOpen(true)
                if ((p as any).caseStudyVidana) setVidanaOpen(true)
                if ((p as any).caseStudyAventura) setAventuraOpen(true)
                if ((p as any).caseStudyKuyak) setKuyakOpen(true)
                if ((p as any).caseStudyWorkline) setWorklineOpen(true)
              }}
              >
              <div
                ref={(el) => {
                  if (el) {
                    innerRefs.current.set(i, el)
                    gsap.set(el, { transformPerspective: 800 })
                  }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden" style={{ background: '#1a2030' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,19,28,0.1) 0%, rgba(15,19,28,0.75) 100%)' }} />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Metric pill — always visible on image */}
                  <div className="absolute bottom-3 right-3">
                    <div
                      className="px-3 py-1.5 rounded-xl text-right"
                      style={{ background: 'rgba(15,19,28,0.82)', backdropFilter: 'blur(8px)', border: `1px solid ${p.color}55` }}
                    >
                      <div className="heading font-extrabold leading-none" style={{ color: p.color, fontSize: '1.2rem' }}>{p.metric}</div>
                      <div className="text-white/50 leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem' }}>{p.metricLabel}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-5"
                  style={{ background: isActive ? `linear-gradient(135deg, ${p.color}10 0%, rgba(15,19,28,0.95) 60%)` : 'rgba(255,255,255,0.04)', transition: 'background 0.35s ease' }}
                >
                  <h3 className="heading font-bold text-white mb-1.5" style={{ fontSize: '1rem' }}>{p.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{p.desc}</p>

                  {/* Result bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/35 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Impacto del proyecto</span>
                      <span className="text-xs font-bold" style={{ color: p.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{p.bar}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isActive ? `${p.bar}%` : '0%',
                          background: `linear-gradient(90deg, ${p.color}99, ${p.color})`,
                          boxShadow: `0 0 8px ${p.color}66`,
                          transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Expandable detail — slides in on hover */}
                  <div
                    style={{
                      maxHeight: isActive ? '120px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 pt-1">
                      {p.detail.map((d) => (
                        <div key={d} className="flex items-center gap-1.5 text-xs text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          {d}
                        </div>
                      ))}
                    </div>

                    {(p as any).caseStudy ? (
                      <button
                        onClick={() => setCaseStudyOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Ver caso completo →
                      </button>
                    ) : (p as any).caseStudyEventos ? (
                      <button
                        onClick={() => setEventosOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Ver caso completo →
                      </button>
                    ) : (p as any).url ? (
                      <a
                        href={(p as any).url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {(p as any).urlLabel} ↗
                      </a>
                    ) : (
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Quiero algo así →
                      </a>
                    )}
                  </div>

                  {/* Static CTA when not hovered */}
                  {((p as any).caseStudy || (p as any).caseStudyEventos || (p as any).caseStudyAventura || (p as any).caseStudyKuyak || (p as any).caseStudyWorkline) ? (
                    <div
                      className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
                      style={{
                        color: p.color,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        opacity: isActive ? 0 : 0.7,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect width="12" height="12" rx="3" fill="currentColor" fillOpacity="0.2"/><path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Clic para ver caso de estudio
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
                      style={{
                        color: p.color,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        opacity: isActive ? 0 : 0.6,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      Hover para ver resultados ↑
                    </div>
                  )}
                </div>
              </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
