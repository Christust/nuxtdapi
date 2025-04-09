<script setup lang="ts">
import { routes, type Route } from "@/constants/routesConstants";
const routesList = ref<Route[]>(routes);
const router = useRoute();
const counter = useCounterStore();

function routeLabel(route: string) {
  const routeLabels: any = {
    "store-id": "Stocks",
    default: "Ruta",
  };
  return routeLabels[route] || routeLabels.default;
}
</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="main">
      <div class="card--custom">
        <header>
          <h3
            class="px-4 pt-3"
            v-text="routesList.filter((route: Route) => route.route === router.path)[0]?.name
            || routeLabel(router.name as string)"
          ></h3>
          <hr />
        </header>
        <main class="main__content px-4">
          <slot />
        </main>
        <SharedLoader v-if="counter.getCounter > 0" />
        <footer class="main__footer px-4">Made by MODERATOREM</footer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
