import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoReel',
  title: 'Video / Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (texto alternativo)',
      type: 'string',
      description: 'Descripción corta del video, ej. "Campaña automotriz — SUV en ruta"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden (menor = primero)',
      type: 'number',
      initialValue: 100,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Sube el clip ya comprimido para web (ideal: unos segundos, sin audio, menos de ~5MB).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Miniatura (poster)',
      type: 'image',
      options: { hotspot: true },
      description: 'Se muestra antes de que el video se reproduzca al pasar el cursor.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'poster' },
  },
  orderings: [
    { title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
