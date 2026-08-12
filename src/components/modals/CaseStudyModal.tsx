import AnimatedModal from './AnimatedModal'
import type { ProjectCaseStudy, ProjectSection } from '@/sanity/lib/projects'

function SectionHeader({ index, accentColor, title }: { index: number; accentColor: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {index}
      </span>
      <h3 className="heading font-bold text-white">{title}</h3>
    </div>
  )
}

function Intro({ text }: { text?: string }) {
  if (!text) return null
  return (
    <p className="text-white/40 text-xs mb-4 -mt-2 ml-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      {text}
    </p>
  )
}

function CaseStudySection({ index, accentColor, section }: { index: number; accentColor: string; section: ProjectSection }) {
  switch (section._type) {
    case 'textSection':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <div
            className="rounded-xl p-5 text-white/60 text-sm leading-relaxed"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif' }}
          >
            {section.body}
          </div>
        </div>
      )

    case 'statGrid':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.items.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-5 text-center"
                style={{ background: `linear-gradient(135deg, ${accentColor}15 0%, rgba(15,19,28,0.8) 100%)`, border: `1px solid ${accentColor}25` }}
              >
                <div className="heading font-extrabold mb-1" style={{ color: accentColor, fontSize: '1.4rem' }}>{m.value}</div>
                <div className="text-white/45 text-xs leading-tight whitespace-pre-line" style={{ fontFamily: 'Inter, sans-serif' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'checklist': {
      const positive = section.style !== 'negative'
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <Intro text={section.intro} />
          <div
            className="rounded-xl p-5"
            style={{
              background: positive ? 'rgba(255,255,255,0.04)' : 'rgba(255,80,80,0.05)',
              border: positive ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,80,80,0.12)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className={positive ? '' : 'text-red-400'} style={positive ? { color: accentColor } : undefined}>
                    {positive ? '✓' : '✕'}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    case 'cardGrid':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <Intro text={section.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.cards.map((c) => (
              <div
                key={c.title}
                className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25` }}
              >
                {c.icon && <div className="text-xl mb-3">{c.icon}</div>}
                <h4 className="heading font-bold text-white text-sm mb-1.5">{c.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'numberedList':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <Intro text={section.intro} />
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="heading font-extrabold flex-shrink-0 opacity-50" style={{ color: accentColor, fontSize: '1.5rem', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  {item.title && <h4 className="heading font-bold text-white text-sm mb-1">{item.title}</h4>}
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'beforeAfter':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-2 text-center">
              <div className="py-2.5 text-xs font-bold uppercase tracking-wider text-red-400" style={{ background: 'rgba(255,80,80,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Antes
              </div>
              <div className="py-2.5 text-xs font-bold uppercase tracking-wider" style={{ background: `${accentColor}18`, color: accentColor, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Después
              </div>
            </div>
            {section.before.map((b, i) => (
              <div key={i} className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="px-4 py-3 text-xs text-white/50 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="text-red-400 flex-shrink-0">✕</span>{b}
                </div>
                <div className="px-4 py-3 text-xs text-white/70 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: accentColor }} className="flex-shrink-0">✓</span>{section.after[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'imageGallery': {
      type GalleryImage = (typeof section.images)[number]
      const rows: { type: 'wide' | 'row'; images: GalleryImage[] }[] = []
      let pending: GalleryImage[] = []
      section.images.forEach((img) => {
        if (img.layout === 'third') {
          pending.push(img)
        } else {
          if (pending.length) { rows.push({ type: 'row', images: pending }); pending = [] }
          rows.push({ type: 'wide', images: [img] })
        }
      })
      if (pending.length) rows.push({ type: 'row', images: pending })

      return (
        <div>
          {section.title && <SectionHeader index={index} accentColor={accentColor} title={section.title} />}
          <Intro text={section.intro} />
          <div className="space-y-4">
            {rows.map((row, ri) =>
              row.type === 'wide' ? (
                <div key={ri} className="relative overflow-hidden rounded-2xl" style={{ border: `1px solid ${accentColor}33` }}>
                  <img src={row.images[0].url} alt={row.images[0].caption || ''} className="w-full h-auto object-cover" loading="lazy" />
                  {(row.images[0].caption || row.images[0].note) && (
                    <div className="p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {row.images[0].caption && <div className="heading font-bold text-white text-sm">{row.images[0].caption}</div>}
                      {row.images[0].note && (
                        <div className="text-white/40 text-xs mt-1 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{row.images[0].note}</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={ri}
                  className="grid gap-px overflow-hidden rounded-2xl bg-white"
                  style={{ gridTemplateColumns: `repeat(${row.images.length}, 1fr)`, border: `1px solid ${accentColor}33` }}
                >
                  {row.images.map((img, ii) => (
                    <img key={ii} src={img.url} alt={img.caption || ''} className="w-full h-full object-cover" loading="lazy" />
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      )
    }

    case 'tagGrid':
      return (
        <div>
          <SectionHeader index={index} accentColor={accentColor} title={section.title} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {section.tags.map((t) => (
              <div
                key={t}
                className="rounded-xl px-4 py-4 text-center text-xs font-semibold text-white/75"
                style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}33`, fontFamily: 'Inter, sans-serif' }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function CaseStudyModal({
  title,
  accentColor,
  caseStudy,
  onClose,
}: {
  title: string
  accentColor: string
  caseStudy: ProjectCaseStudy
  onClose: () => void
}) {
  const isExternalCta = /^https?:\/\//.test(caseStudy.ctaPrimaryHref)

  return (
    <AnimatedModal onClose={onClose} borderColor={`${accentColor}33`}>
      {(handleClose) => (
        <>
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
            style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: accentColor }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2M14 2H6M14 2V10" stroke="#0F131C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor, fontFamily: 'Inter, sans-serif' }}>{caseStudy.eyebrow}</div>
                <div className="heading font-bold text-white text-sm">{title}</div>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Cerrar caso de estudio"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="px-6 pb-10 space-y-10 pt-6">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${accentColor}22 0%, rgba(15,19,28,0.92) 100%)`, border: `1px solid ${accentColor}33` }}
            >
              {caseStudy.heroImageUrl && (
                <img src={caseStudy.heroImageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
              )}
              <div className="relative z-10 p-8">
                {caseStudy.heroBadge && (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: accentColor, color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {caseStudy.heroBadge}
                  </span>
                )}
                <h2 className="heading font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                  {caseStudy.headingLine1}<br /><span style={{ color: accentColor }}>{caseStudy.headingLine2}</span>
                </h2>
                <p className="text-white/60 text-sm max-w-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>{caseStudy.heroDescription}</p>
                {caseStudy.heroStats && caseStudy.heroStats.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {caseStudy.heroStats.map((m) => (
                      <div key={m.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="text-white/35 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{m.label}</div>
                        <div className="heading font-bold text-white text-xs leading-snug">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {caseStudy.sections.map((section, i) => (
              <CaseStudySection key={i} index={i + 1} accentColor={accentColor} section={section} />
            ))}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={caseStudy.ctaPrimaryHref}
                {...(isExternalCta ? { target: '_blank', rel: 'noreferrer' } : { onClick: handleClose })}
                className="flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: accentColor, color: '#0F131C', boxShadow: `0 0 24px ${accentColor}44`, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {caseStudy.ctaPrimaryLabel}
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
