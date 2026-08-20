export type PolicyBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }

export type PolicySubsection = {
  heading: string
  blocks: PolicyBlock[]
}

export type PolicySection = {
  id: string
  navLabel: string
  title: string
  updated: string
  intro?: string
  subsections: PolicySubsection[]
}

export const policies: PolicySection[] = [
  {
    id: 'aviso-legal',
    navLabel: 'Aviso legal',
    title: 'Aviso legal',
    updated: '2026-08-20',
    subsections: [
      {
        heading: 'Titularidad del sitio',
        blocks: [
          {
            type: 'p',
            text: 'Este sitio web (alostudio.pe y subdominios asociados) es operado por Alo Studio ("nosotros", "el Studio"), con domicilio en Lima, Perú. Para cualquier consulta legal puedes escribirnos a hola@alostudio.pe.',
          },
          {
            type: 'p',
            text: 'Razón social: [Completar razón social] · RUC: [Completar RUC] · Domicilio fiscal: [Completar dirección].',
          },
        ],
      },
      {
        heading: 'Objeto',
        blocks: [
          {
            type: 'p',
            text: 'A través de este sitio, Alo Studio presenta sus servicios de diseño UI/UX, desarrollo web, e-commerce, automatizaciones y branding, y permite a los visitantes contactarnos, agendar una llamada y conocer nuestro portafolio, eventos y blog.',
          },
        ],
      },
      {
        heading: 'Propiedad intelectual',
        blocks: [
          {
            type: 'p',
            text: 'El diseño, textos, marca, logotipo, imágenes y demás contenidos de este sitio son propiedad de Alo Studio o de terceros que nos han autorizado su uso, y están protegidos por las normas de propiedad intelectual vigentes en Perú. Su reproducción, distribución o modificación sin autorización expresa está prohibida.',
          },
        ],
      },
    ],
  },
  {
    id: 'privacidad',
    navLabel: 'Privacidad',
    title: 'Política de privacidad',
    updated: '2026-08-20',
    intro:
      'En Alo Studio tratamos tus datos personales conforme a la Ley N° 29733, Ley de Protección de Datos Personales, y su reglamento. Esta política explica qué datos recopilamos, para qué los usamos y qué derechos tienes sobre ellos.',
    subsections: [
      {
        heading: 'Qué datos recopilamos',
        blocks: [
          {
            type: 'list',
            items: [
              'Datos que nos das voluntariamente al escribir en el formulario de contacto: nombre, correo electrónico, empresa (opcional), servicio de interés y el mensaje que envías.',
              'Datos que se generan al agendar una llamada a través de nuestro calendario (nombre, correo y horario elegido).',
              'Datos de navegación recogidos mediante cookies y herramientas de analítica (Google Analytics, Google Tag Manager), sujetos a tu consentimiento — ver nuestra Política de cookies.',
            ],
          },
        ],
      },
      {
        heading: 'Para qué usamos tus datos',
        blocks: [
          {
            type: 'list',
            items: [
              'Responder a tus consultas y elaborar propuestas comerciales.',
              'Coordinar reuniones o llamadas que agendes con nosotros.',
              'Medir el uso del sitio y mejorar su contenido y rendimiento (solo si aceptas cookies analíticas).',
              'Mostrar anuncios relevantes en otras plataformas (solo si aceptas cookies de marketing).',
            ],
          },
          {
            type: 'p',
            text: 'No vendemos tus datos personales a terceros. Solo los compartimos con proveedores que nos ayudan a operar el sitio (por ejemplo, Supabase para procesar el formulario de contacto, y Google para analítica y publicidad), quienes están obligados a proteger tu información.',
          },
        ],
      },
      {
        heading: 'Conservación de datos',
        blocks: [
          {
            type: 'p',
            text: 'Conservamos los datos del formulario de contacto mientras exista una relación comercial o potencial con Alo Studio, y los eliminamos cuando ya no son necesarios para dicho fin o cuando así lo solicites.',
          },
        ],
      },
      {
        heading: 'Tus derechos (ARCO)',
        blocks: [
          {
            type: 'p',
            text: 'Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) sobre tus datos personales escribiéndonos a hola@alostudio.pe, indicando tu solicitud y datos de contacto para poder identificarte.',
          },
        ],
      },
    ],
  },
  {
    id: 'terminos',
    navLabel: 'Términos y condiciones',
    title: 'Términos y condiciones de uso',
    updated: '2026-08-20',
    subsections: [
      {
        heading: 'Aceptación de los términos',
        blocks: [
          {
            type: 'p',
            text: 'Al navegar y usar este sitio aceptas estos términos y condiciones. Si no estás de acuerdo con ellos, te pedimos no continuar usando el sitio.',
          },
        ],
      },
      {
        heading: 'Uso del sitio',
        blocks: [
          {
            type: 'list',
            items: [
              'El contenido del sitio es informativo y comercial: presenta nuestros servicios, portafolio y blog.',
              'Te comprometes a usar el sitio y el formulario de contacto de forma lícita, sin enviar información falsa, spam o contenido ofensivo.',
              'Los presupuestos, plazos y condiciones de un proyecto solo son vinculantes cuando se formalizan en una propuesta o contrato firmado por ambas partes.',
            ],
          },
        ],
      },
      {
        heading: 'Enlaces a terceros',
        blocks: [
          {
            type: 'p',
            text: 'Este sitio puede enlazar a redes sociales o plataformas de terceros (Instagram, LinkedIn, Behance, calendario de reuniones, etc.). Alo Studio no se responsabiliza por el contenido o las políticas de privacidad de esos sitios externos.',
          },
        ],
      },
      {
        heading: 'Limitación de responsabilidad',
        blocks: [
          {
            type: 'p',
            text: 'Hacemos nuestro mejor esfuerzo para mantener el sitio disponible y con información actualizada, pero no garantizamos que esté libre de interrupciones o errores. El uso del sitio es bajo tu propia responsabilidad.',
          },
        ],
      },
      {
        heading: 'Cambios en estos términos',
        blocks: [
          {
            type: 'p',
            text: 'Podemos actualizar estos términos en cualquier momento para reflejar cambios legales o en nuestros servicios. La fecha de la última actualización aparece al inicio de cada sección de esta página.',
          },
        ],
      },
    ],
  },
  {
    id: 'cookies',
    navLabel: 'Cookies',
    title: 'Política de cookies',
    updated: '2026-08-20',
    intro:
      'Usamos cookies propias y de terceros para que el sitio funcione correctamente, entender cómo lo usas y, si lo permites, mostrarte publicidad relevante. Puedes cambiar tus preferencias cuando quieras desde el botón "Cookies" en el pie de página.',
    subsections: [
      {
        heading: 'Tipos de cookies que usamos',
        blocks: [
          {
            type: 'list',
            items: [
              'Necesarias: imprescindibles para el funcionamiento del sitio (por ejemplo, para recordar tus preferencias de cookies). Siempre están activas.',
              'Analíticas (Google Analytics): nos ayudan a entender cómo navegas el sitio para mejorarlo. Solo se activan si las aceptas.',
              'Marketing (Google Ads / Tag Manager): se usan para medir y personalizar anuncios relevantes para ti en otras plataformas. Solo se activan si las aceptas.',
            ],
          },
        ],
      },
      {
        heading: 'Consentimiento',
        blocks: [
          {
            type: 'p',
            text: 'Al entrar al sitio por primera vez te mostramos un aviso donde puedes aceptar todas las cookies, rechazarlas o personalizar tu elección por categoría. Mientras no des tu consentimiento, las cookies analíticas y de marketing permanecen desactivadas (Google Consent Mode).',
          },
        ],
      },
      {
        heading: 'Cómo cambiar tus preferencias',
        blocks: [
          {
            type: 'p',
            text: 'Puedes actualizar tu elección en cualquier momento haciendo clic en el botón "Cookies" del pie de página, o eliminando las cookies desde la configuración de tu navegador.',
          },
        ],
      },
    ],
  },
]
