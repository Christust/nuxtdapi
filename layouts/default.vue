<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
const routes = ref(routesConstants);
const router = useRoute();
</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="sideMainContainer mainContainer">
      <header>
        <h3
          v-text="
            routes.filter((route) => route.route === router.path)[0]?.name
          "
        ></h3>
        <hr />
      </header>
      <main class="mainContent"><slot /></main>
      <footer class="footerContent">Made by MODERATOREM</footer>
    </div>
  </div>
</template>

<style scoped></style>
