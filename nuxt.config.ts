// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages:true,
  components:[
    {
      path: '~/components',
    },
  ],
  modules:[
  '@pinia/nuxt',
  '@nuxt/ui',
],
  pinia: {
    storesDirs:[
      '~/stores/**',
    ]
  },


})