import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import type { Project } from '@/sanity/lib/projects'
import CaseStudyModal from './modals/CaseStudyModal'

type TiltSetters = { rx: (v: number) => void; ry: (v: number) => void; y: (v: number) => void }

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null)
  const [openCaseStudy, setOpenCaseStudy] = useState<number | null>(null)

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

  const activeProject = openCaseStudy !== null ? projects[openCaseStudy] : null

  return (
    <section id="portafolio" className="py-28 px-6 relative">
      {activeProject?.caseStudy && (
        <CaseStudyModal
          title={activeProject.title}
          accentColor={activeProject.accentColor}
          caseStudy={activeProject.caseStudy}
          onClose={() => setOpenCaseStudy(null)}
        />
      )}
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
          {projects.map((p, i) => {
            const isActive = active === i
            return (
              <div
                key={p._id}
                data-reveal
                className="opacity-0 translate-y-8 relative rounded-2xl overflow-hidden cursor-pointer group hover:z-10"
                style={{
                  border: isActive ? `1px solid ${p.accentColor}44` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive ? `0 12px 40px ${p.accentColor}22` : 'none',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseMove={(e) => handleTilt(e, i)}
                onMouseLeave={() => { setActive(null); resetTilt(i) }}
                onClick={() => {
                  if (p.caseStudy) setOpenCaseStudy(i)
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
                    src={p.coverImageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,19,28,0.1) 0%, rgba(15,19,28,0.75) 100%)' }} />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: p.accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Metric pill — always visible on image */}
                  <div className="absolute bottom-3 right-3">
                    <div
                      className="px-3 py-1.5 rounded-xl text-right"
                      style={{ background: 'rgba(15,19,28,0.82)', backdropFilter: 'blur(8px)', border: `1px solid ${p.accentColor}55` }}
                    >
                      <div className="heading font-extrabold leading-none" style={{ color: p.accentColor, fontSize: '1.2rem' }}>{p.metricValue}</div>
                      <div className="text-white/50 leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem' }}>{p.metricLabel}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-5"
                  style={{ background: isActive ? `linear-gradient(135deg, ${p.accentColor}10 0%, rgba(15,19,28,0.95) 60%)` : 'rgba(255,255,255,0.04)', transition: 'background 0.35s ease' }}
                >
                  <h3 className="heading font-bold text-white mb-1.5" style={{ fontSize: '1rem' }}>{p.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{p.description}</p>

                  {/* Result bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/35 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Impacto del proyecto</span>
                      <span className="text-xs font-bold" style={{ color: p.accentColor, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{p.impactPercent}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isActive ? `${p.impactPercent}%` : '0%',
                          background: `linear-gradient(90deg, ${p.accentColor}99, ${p.accentColor})`,
                          boxShadow: `0 0 8px ${p.accentColor}66`,
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
                      {p.details.map((d) => (
                        <div key={d} className="flex items-center gap-1.5 text-xs text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.accentColor }} />
                          {d}
                        </div>
                      ))}
                    </div>

                    {p.caseStudy ? (
                      <button
                        onClick={() => setOpenCaseStudy(i)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Ver caso completo →
                      </button>
                    ) : p.externalUrl ? (
                      <a
                        href={p.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {p.externalUrlLabel} ↗
                      </a>
                    ) : (
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ background: p.accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Quiero algo así →
                      </a>
                    )}
                  </div>

                  {/* Static CTA when not hovered */}
                  {p.caseStudy ? (
                    <div
                      className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
                      style={{
                        color: p.accentColor,
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
                        color: p.accentColor,
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
