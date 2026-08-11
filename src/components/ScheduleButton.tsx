import { useRef, useEffect } from 'react'

export default function ScheduleButton() {
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
