import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/sanity',
    'pinia-plugin-persistedstate/nuxt',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        'react-compiler-runtime': 'react-compiler-runtime',
        'react': 'react',
      },
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  sanity: {
    globalHelper: true,
    projectId: '440lpl2l',
    dataset: 'production',
    useCdn: true,
  },
  nitro: {
    preset: 'deno-deploy',
  },
  fonts: {
    provider: 'google',
  },
})
