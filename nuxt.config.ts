// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  // pinia: {
  //   autoImports: [
  //     'defineStore', // import { defineStore } from 'pinia'
  //   ],
  // },
  piniaPersistedstate: {
    storage: 'localStorage'
  }
    
})
