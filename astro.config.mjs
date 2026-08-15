import { loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { rm } from 'node:fs/promises'
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
          ['servicios', 'portafolio', 'proceso', 'blog'].map((route) =>
            rm(`${outDir}/${route}`, { recursive: true, force: true }),
          ),
        )
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
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT || '8443'),
  },
})
