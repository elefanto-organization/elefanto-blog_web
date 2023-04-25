// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  vite: {
    plugins: [
      svgLoader(),
    ],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.BASE_URL,
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
      head: {
          link: [{ rel: 'icon', type: 'image/png', href: '/image.png' }]
      }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@vueuse/nuxt",
    '@pinia/nuxt',
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  pages: true,
  // auto import components
  components: true,
  // server side rendering mode
  ssr: true,
})
