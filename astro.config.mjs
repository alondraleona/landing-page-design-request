import { loadEnv } from 'vite'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'
import sitemap from '@astrojs/sitemap'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
)

export default defineConfig({
  site: 'https://alostudio.pe',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
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
