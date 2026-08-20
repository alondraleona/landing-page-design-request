import { loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { rm, writeFile } from 'node:fs/promises'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'
import sitemap from '@astrojs/sitemap'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_EVENTS_HOME } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
)

const isEventsHome = PUBLIC_EVENTS_HOME === 'true'

// eventos.alostudio.pe (the evento-alostudio Vercel project) builds this
// same repo, but should only ever serve the events page — drop every other
// route's output so nothing else is reachable there.
function pruneNonEventsRoutes() {
  return {
    name: 'prune-non-events-routes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!isEventsHome) return
        const outDir = fileURLToPath(dir)
        await Promise.all(
          ['servicios', 'portafolio', 'blog'].map((route) =>
            rm(`${outDir}/${route}`, { recursive: true, force: true }),
          ),
        )
      },
    },
  }
}

// Cloudflare Pages equivalent of the old vercel.json host-based rewrite/redirect:
// the eventos build rewrites every path to the events page, the main build
// redirects /eventos out to the canonical eventos.alostudio.pe domain.
function writeCloudflareRedirects() {
  return {
    name: 'write-cloudflare-redirects',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir)
        const redirects = isEventsHome
          ? '/*  /eventos  200\n'
          : '/eventos  https://eventos.alostudio.pe/  301\n'
        await writeFile(`${outDir}/_redirects`, redirects)
      },
    },
  }
}

export default defineConfig({
  site: isEventsHome ? 'https://eventos.alostudio.pe' : 'https://alostudio.pe',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
    pruneNonEventsRoutes(),
    writeCloudflareRedirects(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: '2026-08-01',
      useCdn: false,
      // No studioBasePath: the Studio is deployed separately on Sanity's own
      // hosted domain (via `npx sanity deploy`), not embedded on this site —
      // alostudio.pe only reads published content, no admin route exists here.
    }),
  ],
  build: {
    // Inline all page CSS instead of emitting render-blocking <link> tags —
    // PageSpeed flagged Layout.css and VideoReelsMarquee.css as blocking the
    // first paint on mobile.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT || '8443'),
  },
})
