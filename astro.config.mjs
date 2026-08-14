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

console.log('[debug2] PUBLIC_SANITY_PROJECT_ID len:', (process.env.PUBLIC_SANITY_PROJECT_ID || '').length, JSON.stringify(process.env.PUBLIC_SANITY_PROJECT_ID))
console.log('[debug2] PUBLIC_SANITY_DATASET len:', (process.env.PUBLIC_SANITY_DATASET || '').length, JSON.stringify(process.env.PUBLIC_SANITY_DATASET))
console.log('[debug2] VERCEL_ENV:', process.env.VERCEL_ENV, 'VERCEL_GIT_COMMIT_REF:', process.env.VERCEL_GIT_COMMIT_REF)

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
