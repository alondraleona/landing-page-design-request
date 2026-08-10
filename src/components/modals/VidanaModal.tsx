import { useEffect } from 'react'

export default function VidanaModal({ onClose }: { onClose: () => void }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl" style={{ background: '#0F131C', border: '1px solid rgba(123,170,247,0.28)' }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(15,19,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden" style={{ background: '#7BAAF7' }}><img src="/images/vidana/isologo.png" alt="" className="w-6 h-6 object-contain" /></div><div><div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7BAAF7', fontFamily: 'Inter, sans-serif' }}>Caso de Estudio · Branding</div><div className="heading font-bold text-white text-sm">VIDANA</div></div></div>
          <button onClick={onClose} aria-label="Cerrar caso de estudio" className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        </div>

        <div className="px-6 pb-10 space-y-10 pt-6">
          <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(123,170,247,0.17), rgba(15,19,28,0.92) 62%)', border: '1px solid rgba(123,170,247,0.22)' }}>
            <div className="absolute right-0 top-0 w-52 h-52 rounded-full" style={{ background: 'rgba(229,169,60,0.10)', filter: 'blur(24px)' }} />
            <div className="relative"><span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: '#E5A93C', color: '#0F131C', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Naming · Identidad visual · Aplicaciones</span><h2 className="heading font-extrabold text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.55rem, 3vw, 2.15rem)', letterSpacing: '-0.02em' }}>Un concepto hecho marca:<br /><span style={{ color: '#7BAAF7' }}>nace VIDANA</span></h2><p className="text-white/65 text-sm max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>Desde el insight inicial hasta la última curva del logo, acompañamos la creación de una marca que respira energía, bienestar y equilibrio: comer rico y cuidarse pueden ir de la mano.</p></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#7BAAF7', color: '#0F131C' }}>1</span><h3 className="heading font-bold text-white">El insight</h3></div><div className="rounded-xl p-5 text-white/60 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif' }}>Una propuesta saludable, inclusiva y alta en proteína para deportistas, personas celíacas o intolerantes y quienes eligen cuidarse todos los días.</div></div><div><div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C' }}>2</span><h3 className="heading font-bold text-white">El nombre</h3></div><div className="rounded-xl p-5 text-white/60 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif' }}><strong className="text-white">VIDANA</strong> nace de la fusión de <span style={{ color: '#E5A93C' }}>Vida Sana</span> y Silvana, su fundadora: una palabra propia, cálida y memorable.</div></div></div>

          <div><div className="flex items-center gap-2 mb-2"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#7BAAF7', color: '#0F131C' }}>3</span><h3 className="heading font-bold text-white">Fotografía de marca</h3></div><p className="text-white/40 text-xs mb-5 ml-8" style={{ fontFamily: 'Inter, sans-serif' }}>Espacios listos para sumar una narrativa visual apetecible, natural y cercana.</p>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(123,170,247,0.22)' }}>
                <img src="/images/vidana/mockup-apparel.jpg" alt="Merchandising y packaging VIDANA: delantal, polo, bolsas, vasos y cajas de marca" className="w-full h-auto object-cover" loading="lazy" />
                <div className="p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="heading font-bold text-white text-sm">Producto y textura</div>
                  <div className="text-white/40 text-xs mt-1 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>Pancakes, ingredientes y alto valor nutricional</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid rgba(123,170,247,0.22)' }}>
                <img src="/images/vidana/brandbook-1.jpg" alt="Aplicación del isologo VIDANA sobre fotografía de producto" className="w-full h-full object-cover" loading="lazy" />
                <img src="/images/vidana/brandbook-2.jpg" alt="Slogan y variaciones del isologo VIDANA en el brandbook" className="w-full h-full object-cover" loading="lazy" />
                <img src="/images/vidana/brandbook-3.jpg" alt="Aplicación del isologo VIDANA en punto de venta" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(123,170,247,0.22)' }}>
                <img src="/images/vidana/mockup-drinks.jpg" alt="Vasos de bebidas VIDANA con el isologo aplicado en punto de venta" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div><div className="flex items-center gap-2 mb-5"><span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E5A93C', color: '#0F131C' }}>4</span><h3 className="heading font-bold text-white">Una identidad preparada para crecer</h3></div><div className="space-y-3">{applications.map((item) => <div key={item.num} className="flex gap-4 rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}><span className="heading font-extrabold text-xl opacity-55" style={{ color: item.num === '02' ? '#E5A93C' : '#7BAAF7' }}>{item.num}</span><div><h4 className="heading font-bold text-white text-sm mb-1">{item.title}</h4><p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item.desc}</p></div></div>)}</div></div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2"><a href="https://www.instagram.com/p/DLMBKN-NtNO/?img_index=13" target="_blank" rel="noreferrer" className="flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all duration-200 hover:scale-105" style={{ background: '#7BAAF7', color: '#0F131C', boxShadow: '0 0 24px rgba(123,170,247,0.28)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ver proyecto en Instagram ↗</a><a href="#contacto" onClick={onClose} className="px-5 py-3.5 rounded-xl text-center text-sm font-semibold text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quiero una marca así →</a><button onClick={onClose} aria-label="Cerrar" className="px-4 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cerrar</button></div>
        </div>
      </div>
    </div>
  )
}
