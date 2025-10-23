// @ts-check
import { defineConfig, envField  } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  env: {
      schema: {
          LASTFM_API_KEY: envField.string({ context: "server", access: "secret"}),
          LASTFM_SECRET: envField.string({ context: "server", access: "secret"}),
          LASTFM_USERNAME: envField.string({ context: "server", access: "secret"}),
      }
  },

  vite: {
      plugins: [
          tailwindcss()
      ],
  },

  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [svelte({ extensions: ['.svelte'] })]
});