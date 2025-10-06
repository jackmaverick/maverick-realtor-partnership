// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://realtors.maverickexteriors.com', // Update with actual domain
  output: 'static', // Static site generation
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});