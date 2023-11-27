import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const useAuth = useAuthStore();
  if (!useAuth.isLoggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }
  if (useAuth.isLoggedIn && to.path === "/login") {
    return navigateTo("/");
  }
});
