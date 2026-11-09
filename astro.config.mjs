import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://snow.pronine.ru',
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
