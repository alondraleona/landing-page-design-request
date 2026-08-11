import { loadEnv } from 'vite'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'

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
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: '2026-08-01',
      useCdn: false,
      studioBasePath: '/studio',
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
