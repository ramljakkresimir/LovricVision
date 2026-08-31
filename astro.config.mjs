// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real production domain once it is registered/DNS'd.
  site: 'https://lovricvision.hr',
  output: 'static',
  integrations: [sitemap()]
});
