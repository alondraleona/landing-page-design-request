import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'
import { sanityClient } from 'sanity:client'

const builder = createImageUrlBuilder(sanityClient)

export const urlFor = (source: Image) => builder.image(source)
