export default defineNuxtRouteMiddleware((to, from) => {
  const authenticated = true;
  if (!authenticated && to.path !== "/login") {
    return navigateTo("/login");
  }
  if (authenticated && to.path === "/login") {
    return navigateTo("/");
  }
});
