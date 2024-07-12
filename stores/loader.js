import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    loader: ref(0),
    loaderDisabled: false,
  }),
  getters: {
    getLoader() {
      return this.loader;
    },
  },
  actions: {
    setLoader(value) {
      if (!this.loaderDisabled) {
        const newLoader = this.loader + value;
        if (newLoader >= 0) {
          this.loader = newLoader;
        }
      }
    },
    resetLoader() {
      this.loader = 0
    },
    disableLoader() {
      this.loaderDisabled = true
      this.loader = 0
    },
    enableLoader() {
      this.loaderDisabled = false
      this.loader = 0
    }
  },
  persist: true,
});
