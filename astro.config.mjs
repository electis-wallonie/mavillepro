import { defineConfig } from 'astro/config';

// PREVIEW=1 : aperçu GitHub Pages (sous-dossier /mavillepro/, non indexable)
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site: preview ? 'https://electis-wallonie.github.io' : 'https://mavillepro.com',
  base: preview ? '/mavillepro' : '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
});
