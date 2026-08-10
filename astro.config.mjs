import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://alostudio.pe',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT || '8443'),
  },
})
