// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["@/plugins/fontawesome.ts", "@/plugins/bootstrap.ts"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/scss/index.scss",
  ],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
