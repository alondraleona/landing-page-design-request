import { useEffect } from 'react'

export default function WebProjectModal({ project, onClose }: { project: 'aventura' | 'kuyak' | 'workline'; onClose: () => void }) {
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
