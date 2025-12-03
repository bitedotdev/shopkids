import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sanity',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
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
  fonts: {
    provider: 'google',
  },
})
