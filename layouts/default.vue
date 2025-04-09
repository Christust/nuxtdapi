<script setup lang="ts">
import { routes, type Route } from "@/constants/routesConstants";
import branchService from "~/api/factories/branch";

// Stores
const branchStore = useBranchStore();

// Refs
const routesConstants = ref(routes);
const branches: any = ref([]);
const router: any = useRoute();
const loader = useLoaderStore();

// Functions
function listBranches() {
  branchService.list().then((res) => {
    branches.value = res.data.branches;
    if (branches.value.length > 0) {
      branch.value = branches.value[0].id;
    }
  });
}
function routeLabel(route: string) {
  const routeLabels: any = {
    "store-id": "Stocks",
    default: "Ruta",
  };
  return routeLabels[route] || routeLabels.default;
}

// Computed
const branch = computed({
  get: () => branchStore.branchValue,
  set: (val) => branchStore.updateBranch(val),
});

// Hooks
onMounted(() => {
  listBranches();
});
</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="main">
      <div class="card--custom">
        <header>
          <div class="d-flex align-items-center justify-content-between">
            <h3
              class="px-4 pt-3 mb-0 col"
              v-text="routesConstants.filter((route: any) => route.route === router.path)[0]?.name
              || routeLabel(router.name)"
            ></h3>
            <div class="pt-3 d-flex me-3 col-2 justify-content-end align-items-center">
              <label class="ps-0 mb-0 me-2">Sucursal</label>
              <select class="form-select form-select-sm" v-model="branch">
                <option :value="null" selected>Todas</option>
                <option
                  v-for="branchItem in branches"
                  :key="branchItem.id + branchItem.name + 'COUNTRYHEADER'"
                  :value="branchItem.id"
                  v-text="branchItem.name"
                ></option>
              </select>
            </div>
          </div>
          <hr />
        </header>
        <main class="main__content px-4">
          <slot />
        </main>
        <SharedLoader v-if="loader.getLoader > 0" />
        <footer class="main__footer px-4">Made by MODERATOREM</footer>
      </div>
    </div>
  </div>
</template>
