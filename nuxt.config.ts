// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/scss/index.scss"],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

});
