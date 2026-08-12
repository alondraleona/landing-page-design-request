import { defineField, defineType, defineArrayMember } from 'sanity'

const statItem = defineArrayMember({
  type: 'object',
  name: 'statItem',
  fields: [
    defineField({ name: 'value', title: 'Valor', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
})

const textSection = defineArrayMember({
  type: 'object',
  name: 'textSection',
  title: 'Texto',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Texto', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Texto — ${title}` }) },
})

const statGrid = defineArrayMember({
  type: 'object',
  name: 'statGrid',
  title: 'Cuadrícula de estadísticas',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'items', title: 'Estadísticas', type: 'array', of: [statItem], validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Estadísticas — ${title}` }) },
})

const checklist = defineArrayMember({
  type: 'object',
  name: 'checklist',
  title: 'Lista de checks',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Texto introductorio (opcional)', type: 'string' }),
    defineField({
      name: 'style',
      title: 'Estilo',
      type: 'string',
      options: { list: [{ title: 'Positivo (✓)', value: 'positive' }, { title: 'Negativo (✕)', value: 'negative' }] },
      initialValue: 'positive',
    }),
    defineField({ name: 'items', title: 'Puntos', type: 'array', of: [{ type: 'string' }], validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Checklist — ${title}` }) },
})

const cardGrid = defineArrayMember({
  type: 'object',
  name: 'cardGrid',
  title: 'Tarjetas con ícono',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Texto introductorio (opcional)', type: 'string' }),
    defineField({
      name: 'cards',
      title: 'Tarjetas',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            defineField({ name: 'icon', title: 'Ícono (emoji)', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'desc', title: 'Descripción', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Tarjetas — ${title}` }) },
})

const numberedList = defineArrayMember({
  type: 'object',
  name: 'numberedList',
  title: 'Lista numerada',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Texto introductorio (opcional)', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Elementos',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          fields: [
            defineField({ name: 'title', title: 'Título (opcional)', type: 'string' }),
            defineField({ name: 'desc', title: 'Descripción', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Lista numerada — ${title}` }) },
})

const beforeAfter = defineArrayMember({
  type: 'object',
  name: 'beforeAfter',
  title: 'Antes / Después',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'before', title: 'Antes', type: 'array', of: [{ type: 'string' }], validation: (r) => r.min(1) }),
    defineField({ name: 'after', title: 'Después', type: 'array', of: [{ type: 'string' }], validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Antes/Después — ${title}` }) },
})

const imageGallery = defineArrayMember({
  type: 'object',
  name: 'imageGallery',
  title: 'Galería de imágenes',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string' }),
    defineField({ name: 'intro', title: 'Texto introductorio (opcional)', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'caption', title: 'Título de la imagen (opcional)', type: 'string' }),
            defineField({ name: 'note', title: 'Nota corta (opcional)', type: 'string' }),
            defineField({
              name: 'layout',
              title: 'Tamaño',
              type: 'string',
              options: { list: [{ title: 'Ancho completo', value: 'wide' }, { title: 'Un tercio (en fila de 3)', value: 'third' }] },
              initialValue: 'wide',
            }),
          ],
          preview: { select: { title: 'caption', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Galería — ${title || 'sin título'}` }) },
})

const tagGrid = defineArrayMember({
  type: 'object',
  name: 'tagGrid',
  title: 'Cuadrícula de etiquetas',
  fields: [
    defineField({ name: 'title', title: 'Título de sección', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }], validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Etiquetas — ${title}` }) },
})

export default defineType({
  name: 'project',
  title: 'Proyecto (Portafolio)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Orden (menor = primero)', type: 'number', validation: (r) => r.required(), initialValue: 100 }),
    defineField({ name: 'tag', title: 'Etiqueta de categoría', type: 'string', description: 'Ej. "Diseño y Desarrollo Web"', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Descripción corta', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'coverImage', title: 'Foto de portada', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'accentColor', title: 'Color de acento', type: 'string', description: 'Código hex, ej. #2563EB', validation: (r) => r.required().regex(/^#([0-9A-Fa-f]{6})$/, { name: 'hex color' }) }),
    defineField({ name: 'metricValue', title: 'Métrica destacada', type: 'string', description: 'Ej. "360°", "+200%"', validation: (r) => r.required() }),
    defineField({ name: 'metricLabel', title: 'Etiqueta de la métrica', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'impactPercent', title: 'Impacto del proyecto (%)', type: 'number', validation: (r) => r.required().min(0).max(100) }),
    defineField({ name: 'details', title: 'Detalles (chips)', type: 'array', of: [{ type: 'string' }], validation: (r) => r.max(4) }),
    defineField({ name: 'externalUrl', title: 'Link externo (opcional)', type: 'url' }),
    defineField({ name: 'externalUrlLabel', title: 'Texto del link externo', type: 'string' }),

    defineField({
      name: 'caseStudy',
      title: 'Caso de estudio completo (opcional)',
      type: 'object',
      description: 'Si se completa, la tarjeta abre este caso de estudio en vez de ir directo al link externo.',
      fields: [
        defineField({ name: 'eyebrow', title: 'Etiqueta superior', type: 'string', description: 'Ej. "Caso de Estudio UX/UI"', validation: (r) => r.required() }),
        defineField({ name: 'heroImage', title: 'Imagen de fondo del hero', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heroBadge', title: 'Badge del hero', type: 'string', description: 'Ej. "Lead UX/UI Designer · 2024"' }),
        defineField({ name: 'headingLine1', title: 'Título — línea 1', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'headingLine2', title: 'Título — línea 2 (color de acento)', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'heroDescription', title: 'Descripción del hero', type: 'text', rows: 3, validation: (r) => r.required() }),
        defineField({ name: 'heroStats', title: 'Estadísticas del hero (2-4)', type: 'array', of: [statItem] }),
        defineField({
          name: 'sections',
          title: 'Secciones (en orden, numeradas automáticamente)',
          type: 'array',
          of: [textSection, statGrid, checklist, cardGrid, numberedList, beforeAfter, imageGallery, tagGrid],
        }),
        defineField({ name: 'ctaPrimaryLabel', title: 'Botón principal — texto', type: 'string', initialValue: 'Quiero un proyecto así →' }),
        defineField({ name: 'ctaPrimaryHref', title: 'Botón principal — link', type: 'string', description: 'Usa "#contacto" o una URL externa', initialValue: '#contacto' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'tag' },
  },
  orderings: [
    { title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
