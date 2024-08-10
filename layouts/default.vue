<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
const routes = ref(routesConstants);
const router: any = useRoute();
const loader = useLoaderStore()

function routeLabel(route: string) {
  const routeLabels: any = {
    "store-id": "Stocks",
    default: "Ruta"
  }
  return routeLabels[route] || routeLabels.default
}

</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="sideMainContainer mainContainer">
      <header class="d-flex align-items-center p-3" style="background-color: #ced7dc">
        <h3 class="ms-3 mb-0 text-black" v-text="routes.filter((route: any) => route.route === router.path)[0]?.name
          || routeLabel(router.name)"></h3>
      </header>
      <main class="mainContent">
        <slot />
      </main>
      <SharedLoader v-if="loader.getLoader > 0" />
      <footer class="footerContent">Made by MODERATOREM</footer>
    </div>
  </div>
</template>
