<script setup lang="ts">
import { routes, type Route } from "@/constants/routesConstants";
import authService from "~/api/factories/auth";
const authStore = useAuthStore();
const location = useRoute();

const routesConstants = ref(routes);
const clientOnlyContent = ref(null);
const showPlaceholder = ref(true);

// Functions
function logOut() {
  const payload = {
    refresh_token: authStore.refresh_token,
  };
  authService.logout(payload).then(() => {
    authStore.logout();
  });
}

onMounted(async () => {
  await nextTick();
  if (process.client && clientOnlyContent.value) {
    showPlaceholder.value = false;
  }
});
</script>

<template>
  <ClientOnly>
    <nav ref="clientOnlyContent" class="sidebar">
      <div class="pt-3">
        <div class="sidebar__section">
          <div @click="navigateTo('/')" class="sidebar__section__route">
            <font-awesome-icon
              icon="fa-solid fa-microchip"
              class="fs-3 me-3 text--primary"
            />
            <h3 class="m-0 text--primary">DAPI</h3>
          </div>
          <hr />
        </div>
        <div class="d-flex flex-column">
          <div
            v-for="(route, index) in routesConstants"
            :key="route.name + `${index}`"
            class="sidebar__section"
          >
            <div
              :class="`sidebar__section__route sidebar__section__route--button ${
                location.fullPath == route.route
                  ? 'sidebar__section__route--button--active'
                  : ''
              }`"
              @click="navigateTo(route.route)"
            >
              <font-awesome-icon :icon="route.icon" class="me-3" />
              <span v-text="route.name"></span>
            </div>
          </div>
          <div class="sidebar__section">
            <div
              @click="logOut"
              class="sidebar__section__route sidebar__section__route--button"
            >
              <font-awesome-icon icon="fa-solid fa-door-open" class="me-3" />
              <span>Salir</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </ClientOnly>
  <nav v-if="showPlaceholder" class="sidebar placeholder-glow">
    <div class="sidebar__section">
      <div class="sidebar__section__route placeholder rounded-3 p-4 my-2"></div>
      <hr />
    </div>
    <div class="d-flex flex-column">
      <div
        v-for="(route, index) in routesConstants"
        :key="route.name + `${index}` + 'PLACEHOLDER'"
        class="sidebar__section"
      >
        <div
          class="sidebar__section__route p-3 placeholder rounded-3 mb-2"
        ></div>
      </div>
      <div class="sidebar__section">
        <div
          class="sidebar__section__route p-3 placeholder rounded-3 mb-2"
        ></div>
      </div>
    </div>
  </nav> -->
</template>
