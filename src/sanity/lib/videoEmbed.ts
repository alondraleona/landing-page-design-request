export interface VideoEmbed {
  embedUrl: string
  aspectRatio: number
  isVertical: boolean
}

function youTubeId(url: URL): string | null {
  if (url.hostname.includes('youtu.be')) return url.pathname.slice(1) || null
  if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2] ?? null
  if (url.hostname.includes('youtube.com')) return url.searchParams.get('v')
  return null
}

/**
 * Resolves a YouTube/Vimeo URL into an embeddable iframe URL plus its real
 * aspect ratio (via the provider's oEmbed endpoint), so a vertical Short or
 * a normal horizontal video both render at the right shape without the
 * person writing the post having to flag which one it is.
 */
export async function resolveVideoEmbed(rawUrl: string): Promise<VideoEmbed | null> {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  let embedUrl: string | null = null
  let oembedUrl: string | null = null

  if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
    const id = youTubeId(url)
    if (!id) return null
    embedUrl = `https://www.youtube.com/embed/${id}`
    oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(rawUrl)}&format=json`
  } else if (url.hostname.includes('vimeo.com')) {
    const id = url.pathname.split('/').filter(Boolean).pop()
    if (!id) return null
    embedUrl = `https://player.vimeo.com/video/${id}`
    oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(rawUrl)}`
  }

  if (!embedUrl || !oembedUrl) return null

  try {
    const res = await fetch(oembedUrl)
    if (!res.ok) throw new Error(`oEmbed ${res.status}`)
    const data = await res.json()
    const width = Number(data.width) || 16
    const height = Number(data.height) || 9
    return { embedUrl, aspectRatio: width / height, isVertical: height > width }
  } catch {
    // oEmbed unreachable at build time — fall back to a normal horizontal frame.
    return { embedUrl, aspectRatio: 16 / 9, isVertical: false }
  }
}
