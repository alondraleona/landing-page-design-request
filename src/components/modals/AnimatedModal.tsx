import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export default function AnimatedModal({
  onClose,
  borderColor = 'rgba(255,255,255,0.12)',
  children,
}: {
  onClose: () => void
  borderColor?: string
  children: (handleClose: () => void) => ReactNode
}) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef(false)

  const handleClose = () => {
    if (closingRef.current) return
    closingRef.current = true
    document.body.style.overflow = ''

    if (prefersReducedMotion()) {
      onClose()
      return
    }

    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, { opacity: 0, y: 24, duration: 0.25, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '<')
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([backdropRef.current, panelRef.current], { opacity: 1, y: 0 })
      } else {
        gsap.set(backdropRef.current, { opacity: 0 })
        gsap.set(panelRef.current, { opacity: 0, y: 24 })
        gsap
          .timeline()
          .to(backdropRef.current, { opacity: 1, duration: 0.25 })
          .to(panelRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '<0.05')
      }
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      ctx.revert()
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full md:max-w-4xl max-h-[94vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-2xl"
        style={{ background: '#0F131C', border: `1px solid ${borderColor}` }}
      >
        {children(handleClose)}
      </div>
    </div>
  )
}
