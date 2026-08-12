import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { portfolio } from '@/data/portfolio'

export default function ProjectsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        })
        window.addEventListener('load', () => ScrollTrigger.refresh())
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const updateArrows = () => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4)
  }

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = (card?.offsetWidth ?? 320) + 24
    track.scrollBy({ left: amount * dir, behavior: 'smooth' })
  }

  return (
    <section id="proyectos" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div data-reveal className="opacity-0 translate-y-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
              — Proyectos
            </span>
            <h2 className="heading font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Proyectos que hablan<br />
              <span style={{ color: '#2563EB' }}>por sí solos</span>
            </h2>
          </div>

          {/* Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Anterior"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:enabled:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              aria-label="Siguiente"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:enabled:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div
          data-reveal
          ref={trackRef}
          onScroll={updateArrows}
          className="opacity-0 translate-y-6 flex gap-6 overflow-x-auto pb-4 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {portfolio.map((p) => (
            <a
              key={p.title}
              data-card
              href={p.url ?? '/portafolio'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noreferrer' : undefined}
              className="group flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: 'min(80vw, 320px)',
                scrollSnapAlign: 'start',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div className="relative h-44 overflow-hidden" style={{ background: '#1a2030' }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,19,28,0.1) 0%, rgba(15,19,28,0.75) 100%)' }} />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: p.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-right" style={{ background: 'rgba(15,19,28,0.82)', backdropFilter: 'blur(8px)', border: `1px solid ${p.color}55` }}>
                  <div className="heading font-extrabold leading-none" style={{ color: p.color, fontSize: '1.1rem' }}>{p.metric}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="heading font-bold text-white mb-1.5" style={{ fontSize: '1rem' }}>{p.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div data-reveal className="opacity-0 translate-y-6 mt-10 text-center md:text-left">
          <a
            href="/portafolio"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 glass"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Ver portafolio completo →
          </a>
        </div>
      </div>
    </section>
  )
}
