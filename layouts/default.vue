<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
const routes = ref(routesConstants);
const router = useRoute();
const counter = useCounterStore()

</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="sideMainContainer mainContainer">
      <header>
        <h3 v-text="routes.filter((route: any) => route.route === router.path)[0]?.name
          "></h3>
        <hr />
      </header>
      <main class="mainContent">
        <slot />
      </main>
      <SharedLoader v-if="counter.getCounter > 0" />
      <footer class="footerContent">Made by MODERATOREM</footer>
    </div>
  </div>
</template>

<style scoped></style>
