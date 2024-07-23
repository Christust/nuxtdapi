<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
import authService from "~/api/factories/auth";

// Stores
const authStore = useAuthStore()

// Refs
const routes = ref(routesConstants);

// Functions
function logOut() {
  const payload = {
    refresh_token: authStore.refresh_token
  }
  authService.logout(payload).then(() => {
    authStore.logout()
  })
}
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
      <div v-for="(route, index) in routes" :key="route.name + index" class="sidebar__sidebarRouteContainer">
        <div class="sidebar__sidebarRoute sidebar__sidebarRoute--button" @click="navigateTo(route.route)">
          <font-awesome-icon :icon="route.icon" class="me-3" />
          <span v-text="route.name"></span>
        </div>
      </div>
      <div class="sidebar__sidebarRouteContainer">
        <div @click="logOut" class="sidebar__sidebarRoute sidebar__sidebarRoute--button">
          <font-awesome-icon icon="fa-solid fa-door-open" class="me-3" />
          <span>Salir</span>
        </div>
      </div>
    </div>
  </nav>
  <!-- <nav v-if="showPlaceholder" class="sidebar placeholder-glow">
    <div class="sidebar__sidebarRouteContainer">
      <div class="sidebar__sidebarRoute placeholder rounded-3 p-4 my-2">
      </div>
      <hr />
    </div>
    <div class="d-flex flex-column">
      <div v-for="(route, index) in routes" :key="route.name + index + 'PLACEHOLDER'"
        class="sidebar__sidebarRouteContainer">
        <div class="sidebar__sidebarRoute p-3 placeholder rounded-3 mb-2">
        </div>
      </div>
      <div class="sidebar__sidebarRouteContainer">
        <div class="sidebar__sidebarRoute p-3 placeholder rounded-3 mb-2">
        </div>
      </div>
    </div>
  </nav> -->
</template>
