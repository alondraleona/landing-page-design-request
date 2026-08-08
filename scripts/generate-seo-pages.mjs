// Runs after `vite build`. The app is a client-side SPA (react-router + a
// catch-all rewrite to index.html), so every route ships identical HTML by
// default — crawlers that don't execute JS (WhatsApp, LinkedIn, X, Facebook)
// only ever see the homepage's <title>/description/OG tags, regardless of
// which URL was shared. Vercel serves a matching static file before it
// applies rewrites, so writing a real index.html per route here is enough
// to give each page its own metadata without a JS-executing crawler.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const siteUrl = 'https://alostudio.pe'
const ogImage = `${siteUrl}/favicon/webclip-512x512.png`

const pages = [
  {
    route: '/',
    title: 'Alo Studio | Diseño y Desarrollo Web',
    description:
      'Agencia digital en Lima, Perú. Diseñamos y desarrollamos sitios web, tiendas online y automatizaciones que convierten. +40 proyectos entregados, 98% de satisfacción.',
  },
  {
    route: '/servicios',
    title: 'Servicios de Diseño Web, UX y Desarrollo | Alo Studio',
    description:
      'UI/UX, e-commerce, automatizaciones con IA y branding. Servicios de diseño y desarrollo web en Perú enfocados en conversión y resultados medibles.',
  },
  {
    route: '/portafolio',
    title: 'Proyectos de Diseño Web en Perú | Portafolio Alo Studio',
    description:
      'Explora los proyectos de diseño web, e-commerce y branding que hemos entregado para marcas en Perú. Casos reales, resultados medibles.',
  },
]

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderPage(baseHtml, { route, title, description }) {
  const url = `${siteUrl}${route}`
  const safeTitle = escapeAttr(title)
  const safeDescription = escapeAttr(description)

  let html = baseHtml
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${safeDescription}">`)
  html = html.replace(
    /<meta property="og:title" content="[^"]*">\s*\n\s*<meta property="og:description" content="[^"]*">/,
    [
      `<meta property="og:title" content="${safeTitle}">`,
      `    <meta property="og:description" content="${safeDescription}">`,
      `    <meta property="og:type" content="website">`,
      `    <meta property="og:site_name" content="Alo Studio">`,
      `    <meta property="og:locale" content="es_PE">`,
      `    <meta property="og:url" content="${url}">`,
      `    <meta property="og:image" content="${ogImage}">`,
      `    <link rel="canonical" href="${url}">`,
      `    <meta name="twitter:card" content="summary_large_image">`,
      `    <meta name="twitter:title" content="${safeTitle}">`,
      `    <meta name="twitter:description" content="${safeDescription}">`,
      `    <meta name="twitter:image" content="${ogImage}">`,
    ].join('\n'),
  )
  return html
}

async function main() {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

  for (const page of pages) {
    const html = renderPage(baseHtml, page)
    const outPath =
      page.route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, page.route.slice(1), 'index.html')

    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    console.log(`[seo] wrote ${path.relative(distDir, outPath)}`)
  }
}

main()
