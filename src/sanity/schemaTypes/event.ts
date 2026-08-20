import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: { list: [{ title: 'Curso', value: 'Curso' }, { title: 'Capacitación', value: 'Capacitación' }, { title: 'Evento', value: 'Evento' }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'photo',
      title: 'Fotografía (cuadrada)',
      type: 'image',
      options: { hotspot: true },
      description: 'Recomendado formato cuadrado (1:1), ej. 800x800px.',
    }),
    defineField({ name: 'tagline', title: 'Frase corta', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'desc', title: 'Descripción', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Fecha', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'modality', title: 'Modalidad', type: 'string', description: 'Ej. "Online en vivo", "Presencial · Lima"', validation: (r) => r.required() }),
    defineField({ name: 'duration', title: 'Duración', type: 'string', description: 'Ej. "4 semanas", "1 día · 4 horas"', validation: (r) => r.required() }),
    defineField({
      name: 'accent',
      title: 'Color de acento',
      type: 'string',
      description: 'Código hex, ej. #2563EB',
      validation: (r) => r.required().regex(/^#([0-9A-Fa-f]{6})$/, { name: 'hex color' }),
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Se muestra como "Próxima edición" y ocupa el ancho completo de la grilla.',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'Link de inscripción',
      type: 'url',
      description: 'A dónde lleva el botón "Reservar mi cupo". Si se deja vacío, apunta al formulario de contacto de la página.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'photo' },
  },
})
