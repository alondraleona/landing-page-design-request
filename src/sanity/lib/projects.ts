import { urlFor } from './urlFor'
import type { Image } from 'sanity'

export interface ProjectStat {
  value: string
  label: string
}

export type ProjectSection =
  | { _type: 'textSection'; title: string; body: string }
  | { _type: 'statGrid'; title: string; items: ProjectStat[] }
  | { _type: 'checklist'; title: string; intro?: string; style: 'positive' | 'negative'; items: string[] }
  | { _type: 'cardGrid'; title: string; intro?: string; cards: { icon?: string; title: string; desc: string }[] }
  | { _type: 'numberedList'; title: string; intro?: string; items: { title?: string; desc: string }[] }
  | { _type: 'beforeAfter'; title: string; before: string[]; after: string[] }
  | { _type: 'imageGallery'; title?: string; intro?: string; images: { url: string; caption?: string; note?: string; layout: 'wide' | 'third' }[] }
  | { _type: 'tagGrid'; title: string; tags: string[] }

export interface ProjectCaseStudy {
  eyebrow: string
  heroImageUrl?: string
  heroBadge?: string
  headingLine1: string
  headingLine2: string
  heroDescription: string
  heroStats?: ProjectStat[]
  sections: ProjectSection[]
  ctaPrimaryLabel: string
  ctaPrimaryHref: string
}

export interface Project {
  _id: string
  title: string
  tag: string
  description: string
  coverImageUrl: string
  accentColor: string
  metricValue: string
  metricLabel: string
  impactPercent: number
  details: string[]
  externalUrl?: string
  externalUrlLabel?: string
  caseStudy?: ProjectCaseStudy
}

function resolveImage(image: Image | undefined, width: number, height?: number) {
  if (!image) return undefined
  let b = urlFor(image).width(width).auto('format')
  if (height) b = b.height(height).fit('crop')
  return b.url()
}

function resolveSection(raw: any): ProjectSection {
  if (raw._type === 'imageGallery') {
    return {
      _type: 'imageGallery',
      title: raw.title,
      intro: raw.intro,
      images: (raw.images ?? []).map((img: any) => ({
        url: resolveImage(img.image, 900)!,
        caption: img.caption,
        note: img.note,
        layout: img.layout || 'wide',
      })),
    }
  }
  return raw as ProjectSection
}

function resolveCaseStudy(raw: any): ProjectCaseStudy {
  return {
    eyebrow: raw.eyebrow,
    heroImageUrl: resolveImage(raw.heroImage, 1200, 400),
    heroBadge: raw.heroBadge,
    headingLine1: raw.headingLine1,
    headingLine2: raw.headingLine2,
    heroDescription: raw.heroDescription,
    heroStats: raw.heroStats,
    sections: (raw.sections ?? []).map(resolveSection),
    ctaPrimaryLabel: raw.ctaPrimaryLabel || 'Quiero un proyecto así →',
    ctaPrimaryHref: raw.ctaPrimaryHref || '#contacto',
  }
}

export function resolveProject(raw: any): Project {
  return {
    _id: raw._id,
    title: raw.title,
    tag: raw.tag,
    description: raw.description,
    coverImageUrl: resolveImage(raw.coverImage, 600, 400)!,
    accentColor: raw.accentColor,
    metricValue: raw.metricValue,
    metricLabel: raw.metricLabel,
    impactPercent: raw.impactPercent,
    details: raw.details ?? [],
    externalUrl: raw.externalUrl,
    externalUrlLabel: raw.externalUrlLabel,
    caseStudy: raw.caseStudy ? resolveCaseStudy(raw.caseStudy) : undefined,
  }
}
