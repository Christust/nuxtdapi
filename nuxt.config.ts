// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["@/plugins/fontawesome.ts"],
  devtools: { enabled: true },
  css: [
    "~/node_modules/bootstrap/scss/bootstrap.scss",
    "~/assets/scss/index.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
