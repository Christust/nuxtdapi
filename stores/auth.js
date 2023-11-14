import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ref(false),
    refresh_token: ref(false)
  }),
  getters: {
    isLoggedIn() {
      return !!this.token
    }
  },
  actions: {
    login(response) {
      this.token = response.data.access_token
      this.refresh_token = response.data.refresh_token
    },
    logout() {
      // reset store to original state
      this.$reset()
      navigateTo('/login')
    }
  },
  persist: true
})

