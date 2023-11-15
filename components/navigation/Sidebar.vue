<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";

const routes = ref(routesConstants);
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar__sidebarRouteContainer">
      <div @click="navigateTo('/')" class="sidebar__sidebarRoute">
        <font-awesome-icon icon="fa-solid fa-microchip" class="me-3" />
        <h4 class="text-white m-0">DAPI</h4>
      </div>
      <hr />
    </div>
    <div class="d-flex flex-column">
      <div
        v-for="(route, index) in routes"
        :key="route.name + index"
        class="sidebar__sidebarRouteContainer"
      >
        <div
          class="sidebar__sidebarRoute sidebar__sidebarRoute--button"
          @click="navigateTo(route.route)"
        >
          <span v-text="route.name"></span>
        </div>
      </div>
      <div class="sidebar__sidebarRouteContainer">
        <div class="sidebar__sidebarRoute sidebar__sidebarRoute--button">
          <span>Logout</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
