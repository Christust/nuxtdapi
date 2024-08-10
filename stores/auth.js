import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: ref(false),
    refresh_token: ref(false),
    current_user: ref({}),
    refresh_flag: ref(true),
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
    refresh(response) {
      if (response.data?.access) {
        console.log('Refresh store');
        this.token = response.data.access;
        this.refresh_token = response.data.refresh;
      }
    },
    activateRefresh() {
      this.refresh_flag = true
    },
    deactivateRefresh() {
      this.refresh_flag = false
    }
  },
  persist: true,
});
