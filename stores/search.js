import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    search: '',
  }),
  getters: {
    searchValue() {
      return this.search
    },
  },
  actions: {
    updateSearch(value) {
      this.search = value
    },
  },
  persist: true
})
