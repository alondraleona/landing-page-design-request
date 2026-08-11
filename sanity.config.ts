import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Alo Studio Blog',
  // Not secrets — same trust level as the project ref already committed in
  // src/lib/supabase-info.ts. Hardcoded (rather than read from env) so this
  // resolves the same way whether it's built by Astro/Vite or by the
  // standalone `sanity deploy` CLI, which doesn't share Astro's env loading.
  projectId: 'ssr7fiv8',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
