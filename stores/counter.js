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
    setCounter(value) {
      const newCount = this.counter + value;
      if (newCount >= 0) {
        this.counter = newCount;
      }
    },
    resetCounter() {
      this.counter = 0
    }
  },
  persist: true,
});
