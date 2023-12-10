import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: ref(false),
    refresh_token: ref(false),
    current_user: ref({}),
  }),
  getters: {
    isLoggedIn() {
      return !!this.token;
    },
  },
  actions: {
    login(response) {
      if (response.data?.token) {
        this.token = response.data.token;
        this.refresh_token = response.data.refresh;
        this.current_user = response.data.user;
      }
      navigateTo("/");
    },
    logout() {
      // reset store to original state
      this.$reset();
      navigateTo("/login");
    },
  },
  persist: true,
});
