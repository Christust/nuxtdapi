import { defineStore } from 'pinia'

export const useBranchStore = defineStore('branch', {
  state: () => ({
    branch: null,
  }),
  getters: {
    branchValue() {
      return this.branch
    },
  },
  actions: {
    updateBranch(value) {
      this.branch = value
    },
  },
  persist: true
})
