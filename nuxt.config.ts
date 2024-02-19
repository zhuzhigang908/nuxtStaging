import { NuxtConfig } from 'nuxt/config';
import { createRuntimeConfig, createViteConfig } from './build';

export default defineNuxtConfig({
  runtimeConfig: createRuntimeConfig(),
  srcDir: 'src/',
  components: [
    {
      path: '@/components/public',
      extensions: ['.vue'],
    },
  ],
  // devServer: {
  //   host: 'develop.api.com',
  //   https: true,
  // },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  vite: createViteConfig(),
} as NuxtConfig);
