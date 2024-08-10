<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
import authService from "~/api/factories/auth";

// Stores
const authStore = useAuthStore()
const router: any = useRoute();

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
      <div @click="navigateTo('/')" class="d-flex align-items-center sidebar__sidebarRoute p-3"
        style="background-color: #273238">
        <font-awesome-icon icon="fa-solid fa-microchip" class="me-3" />
        <div class="text-center">
          <h3 class="text-white m-0">DAPI</h3>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div v-for="(route, index) in routes" :key="route.name + index"
        class="sidebar__sidebarRouteContainer sidebar__sidebarRouteContainer--options">
        <div class="sidebar__sidebarRoute sidebar__sidebarRoute--button"
          :class="route.route === router.path ? 'sidebar__sidebarRoute--button__active' : ''"
          @click="navigateTo(route.route)">
          <font-awesome-icon :icon="route.icon" class="me-3" />
          <span v-text="route.name"></span>
        </div>
      </div>
      <div class="sidebar__sidebarRouteContainer sidebar__sidebarRouteContainer--options">
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
