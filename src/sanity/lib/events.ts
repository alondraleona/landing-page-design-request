import { urlFor } from './urlFor'
import type { Image } from 'sanity'

export interface Event {
  type: string
  title: string
  tagline: string
  desc: string
  date: string
  modality: string
  duration: string
  accent: string
  featured: boolean
  link: string
  photoUrl?: string
}

interface RawEvent {
  type: string
  title: string
  tagline: string
  desc: string
  date: string
  modality: string
  duration: string
  accent: string
  featured?: boolean
  link?: string
  photo?: Image
}

export function resolveEvent(raw: RawEvent): Event {
  return {
    type: raw.type,
    title: raw.title,
    tagline: raw.tagline,
    desc: raw.desc,
    date: raw.date,
    modality: raw.modality,
    duration: raw.duration,
    accent: raw.accent,
    featured: raw.featured ?? false,
    link: raw.link || '#contacto',
    photoUrl: raw.photo ? urlFor(raw.photo).width(900).height(506).fit('crop').auto('format').url() : undefined,
  }
}
