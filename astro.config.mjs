// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [preact()]
});