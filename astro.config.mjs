import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  base: '/',
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  // Allow REDIRECT_URL (and any REDIRECT_* vars) to be accessed via import.meta.env
  envPrefix: ['REDIRECT_'],
});
