import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: ref(0),
  }),
  getters: {
    getCounter() {
      return this.counter;
    },
  },
  actions: {
    addCounter() {
      this.counter++;
    },
    addCounterNav() {
      this.counter++;
      navigateTo("about");
    },
  },
  persist: true,
});
