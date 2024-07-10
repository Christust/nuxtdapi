// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // SPA
  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear()
    }
  },
  router: {
    options: {
      hashMode: true
    }
  },
  // End SPA
  plugins: [
    { src: "@/plugins/fontawesome.ts", mode: "client" },
    { src: "@/plugins/bootstrap.ts", mode: "client" },
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['@popperjs/core']
  },
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/scss/index.scss",
  ],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", '@vee-validate/nuxt',],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  // SPA
  ssr: false,
  vite: {
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  }
}
);
