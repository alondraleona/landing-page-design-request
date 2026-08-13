import { urlFor } from './urlFor'
import type { Image } from 'sanity'

export interface VideoReel {
  src: string
  poster: string
  alt: string
}

export function resolveVideoReel(raw: { title: string; videoUrl: string; poster: Image }): VideoReel {
  return {
    src: raw.videoUrl,
    poster: urlFor(raw.poster).width(460).height(680).fit('crop').auto('format').url(),
    alt: raw.title,
  }
}
