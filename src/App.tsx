import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
import { projectId, publicAnonKey } from '../utils/supabase/info'

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/server/make-server-150c1629`

// ── Logo ─────────────────────────────────────────────────────────────────────
function AloLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scales = { sm: 'scale-75', md: 'scale-100', lg: 'scale-125' }
  return (
    <div className={`flex items-center gap-2 ${scales[size]}`} style={{ transformOrigin: 'left center' }}>
      <div className="flex items-center gap-1.5">
        <span className="heading font-bold text-white" style={{ fontSize: size === 'lg' ? '2rem' : size === 'sm' ? '1.1rem' : '1.4rem', letterSpacing: '-0.02em' }}>
          aló
        </span>
        <div
          className="flex items-center justify-center rounded"
          style={{
            width: size === 'lg' ? 28 : size === 'sm' ? 18 : 22,
            height: size === 'lg' ? 28 : size === 'sm' ? 18 : 22,
            background: '#2563EB',
            boxShadow: '0 0 12px rgba(37,99,235,0.5)',
          }}
        >
          <svg
            viewBox="0 0 14 14"
            fill="none"
            style={{ width: size === 'lg' ? 16 : size === 'sm' ? 10 : 13, height: size === 'lg' ? 16 : size === 'sm' ? 10 : 13 }}
          >
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <span className="heading font-semibold" style={{ color: '#E5A93C', fontSize: size === 'lg' ? '1rem' : size === 'sm' ? '0.65rem' : '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Studio
      </span>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', to: '/servicios' },
    { label: 'Portafolio', to: '/portafolio' },
    { label: 'Contacto', to: '#contacto' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15,19,28,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/"><AloLogo size="md" /></Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.to.startsWith('#') ? (
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {l.label}
              </Link>
            ),
          )}
          <a
            href="#contacto"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{ background: '#2563EB', boxShadow: '0 0 16px rgba(37,99,235,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Trabajemos juntos →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            {menuOpen
              ? <><path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
              : <><path d="M3 7h16M3 11h16M3 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass mx-4 mb-4 rounded-xl p-4 flex flex-col gap-4">
          {links.map((l) =>
            l.to.startsWith('#') ? (
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ),
          )}
          <a
            href="#contacto"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white text-center"
            style={{ background: '#2563EB' }}
            onClick={() => setMenuOpen(false)}
          >
            Trabajemos juntos →
          </a>
        </div>
      )}
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(229,169,60,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wider uppercase"
          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', color: '#7BAAF7', fontFamily: 'Inter, sans-serif' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Agencia digital · Lima, Perú
        </div>

        {/* Headline */}
        <h1 className="heading font-extrabold leading-none mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}>
          Tu marca, tu{' '}
          <span style={{ color: '#2563EB' }}>presencia</span>
          <br />
          tu próximo nivel de{' '}
          <span style={{ color: '#E5A93C' }}>ventas</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontFamily: 'Inter, sans-serif' }}>
          Construimos marcas que dominan mercados. Desde el diseño hasta la automatización —
          llevamos tu negocio del punto A al punto donde la competencia ya no alcanza.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contacto"
            className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.45)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Cotiza tu proyecto →
          </a>
          <Link
            to="/portafolio"
            className="px-8 py-4 rounded-xl font-semibold text-white/80 text-base transition-all duration-200 hover:text-white glass"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Ver portafolio
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto">
          {[
            { value: '40+', label: 'Proyectos entregados' },
            { value: '3×', label: 'ROI promedio cliente' },
            { value: '98%', label: 'Satisfacción' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="heading font-extrabold mb-1" style={{ fontSize: '2rem', color: '#E5A93C' }}>{s.value}</div>
              <div className="text-white/40 text-xs leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: '✦',
    title: 'UI / UX Design',
    tagline: 'Interfaces que convierten',
    desc: 'Diseñamos experiencias centradas en el usuario que reducen la fricción y maximizan la conversión. Desde wireframes hasta prototipos interactivos con Figma.',
    features: ['Auditoría UX / Heurística', 'Design System completo', 'Prototipo navegable', 'Handoff a desarrollo'],
    accent: '#2563EB',
  },
  {
    icon: '◈',
    title: 'E-commerce',
    tagline: 'Tiendas que venden solas',
    desc: 'Construimos plataformas de e-commerce de alto rendimiento: Shopify, WooCommerce o custom. Optimizadas para checkout rápido y máxima tasa de conversión.',
    features: ['Shopify / WooCommerce', 'Pasarela de pagos local', 'SEO técnico incluido', 'Analytics avanzado'],
    accent: '#E5A93C',
    featured: true,
  },
  {
    icon: '⬡',
    title: 'Automatizaciones API',
    tagline: 'Tu negocio en piloto automático',
    desc: 'Conectamos tus herramientas, automatizamos procesos repetitivos e integramos IA para que tu equipo enfoque su energía en lo que realmente importa.',
    features: ['Zapier / Make / n8n', 'Integraciones CRM', 'Bots de atención IA', 'Dashboards en tiempo real'],
    accent: '#7BAAF7',
  },
  {
    icon: '◎',
    title: 'Branding & Identidad',
    tagline: 'Marcas que se recuerdan',
    desc: 'Construimos identidades visuales sólidas y coherentes: desde el naming y la estrategia de marca hasta el manual completo que tu equipo puede usar de forma autónoma.',
    features: ['Naming & estrategia de marca', 'Logo + sistema visual', 'Manual de identidad', 'Aplicaciones en piezas reales'],
    accent: '#E5A93C',
  },
]

function Services() {
  return (
    <section id="servicios" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#E5A93C', fontFamily: 'Inter, sans-serif' }}>
            — Nuestros Servicios
          </span>
          <h2 className="heading font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}>
            Todo lo que necesitas para<br />
            <span style={{ color: '#2563EB' }}>escalar en digital</span>
          </h2>
          <p className="text-white/50 max-w-lg" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem' }}>
            Tres áreas de especialización, una sola visión: hacer crecer tu negocio de forma sostenida y medible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 cursor-default group"
              style={{
                background: s.featured
                  ? 'linear-gradient(135deg, rgba(229,169,60,0.12) 0%, rgba(37,99,235,0.08) 100%)'
                  : 'rgba(255,255,255,0.04)',
                border: s.featured ? '1px solid rgba(229,169,60,0.3)' : '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {s.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-5 text-2xl" style={{ color: s.accent }}>{s.icon}</div>
              <h3 className="heading font-bold text-lg text-white mb-1">{s.title}</h3>
              <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: s.accent, fontFamily: 'Inter, sans-serif' }}>{s.tagline}</p>
              <p className="text-white/55 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>

              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 text-sm font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: s.accent, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Saber más <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Portfolio ─────────────────────────────────────────────────────────────────
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

function AnilloVialModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

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
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl"
        style={{ background: '#0F131C', border: '1px solid rgba(37,99,235,0.25)' }}
      >
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
            onClick={onClose}
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
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-center font-bold text-white text-sm transition-all duration-200 hover:scale-105"
              style={{ background: '#2563EB', boxShadow: '0 0 24px rgba(37,99,235,0.35)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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

function EventosModal({ onClose }: { onClose: () => void }) {
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


function VidanaModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const applications = [
    { num: '01', title: 'Packaging que abre el apetito', desc: 'Sistema listo para empaques, etiquetas y formatos de producto sin perder reconocimiento.' },
    { num: '02', title: 'Presencia que acompaña', desc: 'Aplicaciones coherentes para uniformes, punto de venta y comunicación cotidiana.' },
    { num: '03', title: 'Marca flexible, esencia intacta', desc: 'Un lenguaje visual claro para crecer hacia nuevas líneas, campañas y canales digitales.' },
  ]

  const PhotoPlaceholder = ({ label, sub, className = '' }: { label: string; sub: string; className?: string }) => (
    <div className={`relative overflow-hidden rounded-xl flex flex-col items-center justify-center text-center p-5 ${className}`} style={{ minHeight: 170, background: 'linear-gradient(135deg, rgba(123,170,247,0.11), rgba(229,169,60,0.06))', border: '1.5px dashed rgba(123,170,247,0.36)' }}>
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full" style={{ background: 'rgba(229,169,60,0.11)', filter: 'blur(12px)' }} />
      <svg className="relative mb-3" width="27" height="27" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="3" y="5" width="22" height="18" rx="3" stroke="#7BAAF7" strokeWidth="1.6"/><circle cx="10" cy="11" r="2" stroke="#E5A93C" strokeWidth="1.6"/><path d="M4 20l6-5 4 3 4-5 6 7" stroke="#7BAAF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <div className="relative heading font-bold text-white text-sm">{label}</div>
      <div className="relative text-white/40 text-xs mt-1 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{sub}</div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl" style={{ background: '#0F131C', border: '1px solid rgba(123,170,247,0.28)' }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#7BAAF7' }}><span className="text-lg">✦</span></div><div><div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7BAAF7', fontFamily: 'Inter, sans-serif' }}>Caso de Estudio · Branding</div><div className="heading font-bold text-white text-sm">VIDANA</div></div></div>
          <button onClick={onClose} aria-label="Cerrar caso de estudio" className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        </div>

        <div className="px-6 pb-10 space-y-10 pt-6">
          <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(123,170,247,0.17), rgba(15,19,28,0.92) 62%)', border: '1px solid rgba(123,170,247,0.22)' }}>
            <div className="absolute right-0 top-0 w-52 h-52 rounded-full" style={{ background: 'rgba(229,169,60,0.10)', filter: 'blur(24px)' }} />
            <div className="relative"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Naming · Identidad visual · Aplicaciones</span><h2 className="heading font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.55rem, 3vw, 2.15rem)', letterSpacing: '-0.02em' }}>Un concepto hecho marca:<br /><span style={{ color: '#7BAAF7' }}>nace VIDANA</span></h2><p className="text-white/65 text-sm max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>Desde el insight inicial hasta la última curva del logo, acompañamos la creación de una marca que respira energía, bienestar y equilibrio: comer rico y cuidarse pueden ir de la mano.</p></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#7BAAF7', color: '#0F131C' }}>1</span><h3 className="heading font-bold text-white">El insight</h3></div><div className="rounded-xl p-5 text-white/60 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif' }}>Una propuesta saludable, inclusiva y alta en proteína para deportistas, personas celíacas o intolerantes y quienes eligen cuidarse todos los días.</div></div><div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C' }}>2</span><h3 className="heading font-bold text-white">El nombre</h3></div><div className="rounded-xl p-5 text-white/60 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif' }}><strong className="text-white">VIDANA</strong> nace de la fusión de <span style={{ color: '#E5A93C' }}>Vida Sana</span> y Silvana, su fundadora: una palabra propia, cálida y memorable.</div></div></div>

          <div><div className="flex items-center gap-2 mb-2"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#7BAAF7', color: '#0F131C' }}>3</span><h3 className="heading font-bold text-white">Fotografía de marca</h3></div><p className="text-white/40 text-xs mb-5 ml-8" style={{ fontFamily: 'Inter, sans-serif' }}>Espacios listos para sumar una narrativa visual apetecible, natural y cercana.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><PhotoPlaceholder label="Producto y textura" sub="Pancakes, ingredientes y alto valor nutricional" /><PhotoPlaceholder label="Momentos VIDANA" sub="Lifestyle, comunidad y bienestar cotidiano" /><PhotoPlaceholder label="Packaging en contexto" sub="Empaques, etiquetas y detalles de marca" className="sm:col-span-2" /></div></div>

          <div><div className="flex items-center gap-2 mb-5"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C' }}>4</span><h3 className="heading font-bold text-white">Una identidad preparada para crecer</h3></div><div className="space-y-3">{applications.map((item) => <div key={item.num} className="flex gap-4 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><span className="heading font-extrabold text-xl opacity-55" style={{ color: item.num === '02' ? '#E5A93C' : '#7BAAF7' }}>{item.num}</span><div><h4 className="heading font-bold text-white text-sm mb-1">{item.title}</h4><p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item.desc}</p></div></div>)}</div></div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2"><a href="https://www.instagram.com/p/DLMBKN-NtNO/?img_index=13" target="_blank" rel="noreferrer" className="flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all duration-200 hover:scale-105" style={{ background: '#7BAAF7', color: '#0F131C', boxShadow: '0 0 24px rgba(123,170,247,0.28)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ver proyecto en Instagram ↗</a><a href="#contacto" onClick={onClose} className="px-5 py-3.5 rounded-xl text-center text-sm font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quiero una marca así →</a><button onClick={onClose} aria-label="Cerrar" className="px-4 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cerrar</button></div>
        </div>
      </div>
    </div>
  )
}


function WebProjectModal({ project, onClose }: { project: 'aventura' | 'kuyak' | 'workline'; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const data = project === 'workline' ? {
    name: 'Workline Partners',
    eyebrow: 'Caso de estudio · Rediseño web y piezas gráficas',
    color: '#E5A93C',
    url: 'https://www.worklinepartners.com/',
    intro: 'Una presencia digital más clara para una empresa de staffing que necesita generar confianza tanto en empleadores como en candidatos.',
    objective: 'Reordenar la comunicación de servicios, industrias y cobertura operativa mientras se construye una línea gráfica reconocible para campañas.',
    flow: ['Jerarquía web centrada en servicios de staffing, equipos de trabajo y solicitud de personal.', 'Rutas claras para empleadores, candidatos, ubicaciones y preguntas frecuentes.', 'Piezas gráficas consistentes para comunicar vacantes, capacidades operativas y contenido de marca.'],
    modules: ['Rediseño UX/UI', 'Piezas de campaña', 'Flujos de contratación', 'Comunicación B2B'],
    photo: 'https://static.wixstatic.com/media/5719bd_6dd82373204144a4afe22ce419eed901~mv2.jpeg/v1/fill/w_1280,h_720,al_c/5719bd_6dd82373204144a4afe22ce419eed901~mv2.jpeg',
  } : project === 'aventura' ? {
    name: 'Aventura Motors',
    eyebrow: 'Caso de estudio · Diseño y desarrollo web',
    color: '#E5A93C',
    url: 'https://aventuramotors.com.pe',
    intro: 'Una experiencia web pensada para que la exploración de vehículos sea clara, ágil y orientada a la conversación comercial.',
    objective: 'Ordenar la oferta automotriz en una experiencia fácil de recorrer, desde el primer vistazo hasta la consulta.',
    flow: ['Arquitectura de información para organizar el catálogo de vehículos.', 'Diseño responsive para una consulta fluida desde celular, tablet o escritorio.', 'Puntos de contacto visibles para transformar interés en una consulta directa.'],
    modules: ['Catálogo de vehículos', 'Fichas de exploración', 'Navegación mobile-first', 'CTAs de contacto'],
    photo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=520&fit=crop&auto=format',
  } : {
    name: 'Kuyak Perú',
    eyebrow: 'Caso de estudio · Landing B2B',
    color: '#7BAAF7',
    url: 'https://kuyak.pe',
    intro: 'Una landing industrial diseñada para convertir la complejidad técnica de los equipos de bombeo en rutas claras de exploración y cotización.',
    objective: 'Comunicar soluciones de alta eficiencia para el movimiento de fluidos, reforzar la confianza técnica y acompañar la solicitud comercial.',
    flow: ['Jerarquía de contenidos para productos, aplicaciones y soluciones industriales.', 'Recorridos por industria: minería, petróleo, química y tratamiento de aguas.', 'CTAs de cotización y contacto como siguiente paso después de revisar el catálogo.'],
    modules: ['Catálogo de equipos', 'Soluciones por industria', 'Productos destacados', 'Cotización y postventa'],
    photo: 'https://kuyak.pe/wp-content/uploads/2023/11/image-10.png',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl" style={{ background: '#0F131C', border: `1px solid ${data.color}44` }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div><div className="text-xs font-bold uppercase tracking-widest" style={{ color: data.color, fontFamily: 'Inter, sans-serif' }}>{data.eyebrow}</div><div className="heading font-bold text-white text-sm mt-0.5">{data.name}</div></div>
          <button onClick={onClose} aria-label="Cerrar caso de estudio" className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        </div>
        <div className="px-6 pb-10 pt-6 space-y-8">
          <div className="relative min-h-64 overflow-hidden rounded-2xl flex items-end" style={{ background: `linear-gradient(135deg, ${data.color}22, #0F131C)` }}>
            <img src={data.photo} alt={data.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(15,19,28,0.98) 0%, rgba(15,19,28,0.36) 100%)' }} />
            <div className="relative p-7"><span className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-4" style={{ background: data.color, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Diseño · Desarrollo · Conversión</span><h2 className="heading font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(1.55rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>{data.name}<br /><span style={{ color: data.color }}>una plataforma con recorrido claro</span></h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: data.color, fontFamily: 'Inter, sans-serif' }}>Propósito</div><p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{data.objective}</p></div><div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: data.color, fontFamily: 'Inter, sans-serif' }}>Enfoque</div><p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{data.intro}</p></div></div>
          <div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: data.color, color: '#0F131C' }}>1</span><h3 className="heading font-bold text-white">Experiencia diseñada</h3></div><div className="space-y-3">{data.flow.map((item, i) => <div key={item} className="flex gap-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><span className="heading font-extrabold text-lg opacity-60" style={{ color: data.color }}>0{i + 1}</span><p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</p></div>)}</div></div>
          <div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: data.color, color: '#0F131C' }}>2</span><h3 className="heading font-bold text-white">Componentes clave</h3></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{data.modules.map((item) => <div key={item} className="rounded-xl px-4 py-4 text-center text-xs font-semibold text-white/75" style={{ background: `${data.color}10`, border: `1px solid ${data.color}33`, fontFamily: 'Inter, sans-serif' }}>{item}</div>)}</div></div>
          <div className="flex flex-col sm:flex-row gap-3 pt-1"><a href={data.url} target="_blank" rel="noreferrer" className="flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all duration-200 hover:scale-105" style={{ background: data.color, color: '#0F131C', boxShadow: `0 0 24px ${data.color}44`, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Visitar plataforma ↗</a><a href="#contacto" onClick={onClose} className="px-5 py-3.5 rounded-xl text-center text-sm font-semibold text-white/70 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quiero algo así →</a></div>
        </div>
      </div>
    </div>
  )
}

function Portfolio() {
  const [active, setActive] = useState<number | null>(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [eventosOpen, setEventosOpen] = useState(false)
  const [vidanaOpen, setVidanaOpen] = useState(false)
  const [aventuraOpen, setAventuraOpen] = useState(false)
  const [kuyakOpen, setKuyakOpen] = useState(false)
  const [worklineOpen, setWorklineOpen] = useState(false)

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p, i) => {
            const isActive = active === i
            return (
              <div
                key={p.title}
                className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2"
                style={{
                  border: isActive ? `1px solid ${p.color}44` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive ? `0 12px 40px ${p.color}22` : 'none',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => {
                if ((p as any).caseStudy) setCaseStudyOpen(true)
                if ((p as any).caseStudyEventos) setEventosOpen(true)
                if ((p as any).caseStudyVidana) setVidanaOpen(true)
                if ((p as any).caseStudyAventura) setAventuraOpen(true)
                if ((p as any).caseStudyKuyak) setKuyakOpen(true)
                if ((p as any).caseStudyWorkline) setWorklineOpen(true)
              }}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ScheduleButton() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const CSS_HREF = 'https://calendar.google.com/calendar/scheduling-button-script.css'
    const JS_SRC = 'https://calendar.google.com/calendar/scheduling-button-script.js'
    const CALENDAR_URL =
      'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aDe7SdIBAS0aotMUTWEEFkoxvAWSwh2xNhVPzI3sIUZNOdGSF45s5dRedA-ED3RazsgLLFqNu?gv=true'

    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CSS_HREF
      document.head.appendChild(link)
    }

    const renderButton = () => {
      const calendar = (window as any).calendar
      if (ref.current && calendar?.schedulingButton) {
        ref.current.innerHTML = ''
        calendar.schedulingButton.load({
          url: CALENDAR_URL,
          color: '#2563EB',
          label: 'Agendar una cita',
          target: ref.current,
        })
      }
    }

    if ((window as any).calendar?.schedulingButton) {
      renderButton()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${JS_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = JS_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', renderButton)
    return () => script?.removeEventListener('load', renderButton)
  }, [])

  return <div ref={ref} className="w-full max-w-full overflow-hidden [&_iframe]:max-w-full" />
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
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
                { icon: '✉', label: 'Email', value: 'hola@alo.studio' },
                { icon: '📍', label: 'Ubicación', value: 'Lima, Perú · Clientes globales' },
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

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <AloLogo size="sm" />
        <p className="text-white/25 text-xs text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          © 2025 aló Studio · Lima, Perú · Todos los derechos reservados
        </p>
        <div className="flex gap-5">
          {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
            <a key={s} href="#" className="text-white/30 hover:text-white text-xs transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname])
  return null
}

function Layout() {
  return (
    <div style={{ background: '#0F131C', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Contact />
      <Footer />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <title>Alo Studio | Diseño y Desarrollo Web</title>
      <Hero />
    </>
  )
}

function ServiciosPage() {
  return (
    <>
      <title>Servicios de Diseño Web, UX y Desarrollo | Alo Studio</title>
      <Services />
    </>
  )
}

function PortafolioPage() {
  return (
    <>
      <title>Proyectos de Diseño Web en Perú | Portafolio Alo Studio</title>
      <Portfolio />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/portafolio" element={<PortafolioPage />} />
      </Route>
    </Routes>
  )
}
