import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// When deployed to GitHub Pages, the site is served from /scriptbase/.
// Locally and on Actions PR previews we want the root.
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/scriptbase/' : '/',
  plugins: [svelte()],
  server: {
    port: 5173,
    open: true,
  },
});
