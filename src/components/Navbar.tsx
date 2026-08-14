import { useState, useEffect } from 'react'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', to: '/servicios' },
    { label: 'Proceso', to: '/proceso' },
    { label: 'Portafolio', to: '/portafolio' },
    { label: 'Eventos', to: '/eventos' },
    { label: 'Blog', to: '/blog' },
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
        <a href="/"><AloLogo size="md" /></a>

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
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {l.label}
              </a>
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
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
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
