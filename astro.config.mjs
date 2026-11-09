import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Dmitry-420.github.io',
  base: '/snow',
  site: 'https://pronine-tactic-930-9qf5hnmu.bobr0.site',
  output: 'static',

  integrations: [
    vue(),
    icon({
      include: {
        lucide: ['*'],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});